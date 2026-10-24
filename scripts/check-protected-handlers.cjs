// Executes the actual unchanged handlers with fake requests and mocked upstreams.
// No network, credentials, real enquiries, email or customer records.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const repo=path.resolve(__dirname,'..');let checks=0;
function handler(file,name,fetch){const box={Request,Response,URL,URLSearchParams,FormData,fetch,console:{error(){}}};vm.createContext(box);vm.runInContext(fs.readFileSync(path.join(repo,file),'utf8').replace('export async function','async function')+'\nthis.handler='+name,box);return box.handler;}
const env={TURNSTILE_SECRET_KEY:'offline-test-secret',MAKE_WEBHOOK_URL:'https://offline.invalid/enquiry'};
function request(overrides={}){const f=new FormData();for(const [k,v]of Object.entries({name:'Test Person',company:'Fictional QA',email:'test@example.invalid',drivers:'3',carriers:'Test carrier','cf-turnstile-response':'offline-token',...overrides}))if(v!==null)f.set(k,v);return new Request('https://offline.invalid/api/trial',{method:'POST',body:f});}
async function trial(expected,options={}){let calls=[];const fn=handler('functions/api/trial.js','onRequestPost',async(url,init)=>{calls.push([url,init]);if(url.includes('siteverify'))return Response.json({success:options.verified!==false});assert.equal(url,env.MAKE_WEBHOOK_URL);return new Response('',{status:options.makeStatus||200});});const response=await fn({request:request(options.fields),env:options.env||env});assert.equal(response.status,expected);checks++;return calls;}
(async()=>{
assert.equal((await trial(400,{fields:{name:null}})).length,0);
assert.equal((await trial(500,{env:{}})).length,0);
assert.equal((await trial(400,{fields:{'cf-turnstile-response':null}})).length,0);
assert.equal((await trial(403,{verified:false})).length,1);
await trial(500,{env:{TURNSTILE_SECRET_KEY:'offline'}});
await trial(502,{makeStatus:503});
const calls=await trial(200);assert.deepEqual(JSON.parse(calls[1][1].body),{name:'Test Person',company:'Fictional QA',email:'test@example.invalid',drivers:'3',carriers:'Test carrier'});checks++;
for(const test of [
 {token:'',status:400},
 {token:'test',origin:'http://offline.invalid',status:500},
 {token:'test',upstream:400,status:400},
 {token:'test',data:{status:'email_verified',mode:'sandbox',next_step:'stripe_checkout',checkout_started:false},status:200},
 {token:'test',data:{status:'email_verified',mode:'live',next_step:'stripe_checkout',checkout_started:true},status:502},
 {token:'test',throw:true,status:502}
]){let calls=0;const fn=handler('functions/verify.js','onRequestGet',async(url,init)=>{calls++;assert.equal(new URL(url).searchParams.get('token'),'test');assert.equal(init.redirect,'manual');if(test.throw)throw Error('offline failure');return Response.json(test.data||{}, {status:test.upstream||200});});const res=await fn({request:new Request('https://offline.invalid/verify?token='+test.token),env:{FASHEARN_TRIAL_SANDBOX_ORIGIN:test.origin||'https://offline.invalid'}});assert.equal(res.status,test.status);assert.equal(res.headers.get('cache-control'),'no-store');assert.equal(res.headers.get('referrer-policy'),'no-referrer');if(test.status===200)assert.match(await res.text(),/trial has not started yet/);if(!test.token||test.origin)assert.equal(calls,0);checks++;}
console.log(JSON.stringify({result:'PASS',handler_checks:checks,external_requests:0}));
})().catch(error=>{console.error(error);process.exitCode=1;});
