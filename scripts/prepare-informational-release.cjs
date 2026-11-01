// Reproducible informational release. Does not deploy or contact any provider.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const repo=path.resolve(__dirname,'..'),stage=path.join(repo,'staging/company-site'),out=path.join(repo,'dist-release');
const shot='https://raw.githubusercontent.com/fashearn-labs/fashearn-website/main/assets/routeops-dashboard-v1.1.png';
const baseline='066b14eed5001289cd9b4e56095f761811cebfd2';
const localBusiness=path.join(repo,'release/business-details.local.json');
const business=JSON.parse(fs.readFileSync(fs.existsSync(localBusiness)?localBusiness:path.join(repo,'release/business-details.json'),'utf8'));
const detailsReady=Boolean(business.businessAddress&&typeof business.vatRegistered==='boolean'&&(!business.vatRegistered||typeof business.priceIncludesVat==='boolean'));
if(process.argv.includes('--require-business-details')&&!detailsReady)throw new Error('Business address and VAT treatment must be confirmed before deployment.');
cp.execFileSync(process.execPath,[path.join(repo,'scripts/build-staged-site.cjs')],{cwd:repo,stdio:'inherit'});
fs.mkdirSync(out,{recursive:true});
const baselineFiles=JSON.parse(fs.readFileSync(path.join(repo,'release/baseline-manifest.json'),'utf8'));
const original=p=>{let bytes=fs.readFileSync(path.join(repo,p));if(hash(bytes)!==baselineFiles.files[p]&&/\.(js|html|css)$/.test(p))bytes=Buffer.from(bytes.toString('utf8').replaceAll('\r\n','\n'));if(hash(bytes)!==baselineFiles.files[p])throw new Error('Protected baseline file changed: '+p);return bytes;};
const write=(p,content)=>{const target=path.join(out,p);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,content);};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const originalFiles=Object.keys(baselineFiles.files);
const preserved={};
for(const p of originalFiles.filter(p=>p.startsWith('assets/')||p==='trial/success.html')){const b=original(p);write(p,b);preserved[p]=hash(b);}
// The homepage-only arrow mark is a new transparent asset, not a protected baseline replacement.
write('assets/images/fashearn-arrow.svg',fs.readFileSync(path.join(repo,'assets/images/fashearn-arrow.svg')));
for(const p of ['functions/api/trial.js','functions/verify.js']){const expected=original(p);if(!fs.readFileSync(path.join(repo,p)).equals(expected))throw new Error('Protected function differs from baseline: '+p);preserved[p]=hash(expected);}
for(const p of ['site.css','site.js'])write('assets/'+p,fs.readFileSync(path.join(stage,'assets',p)));
let formJS=original('assets/trial-form.js').toString('utf8');
formJS=formJS.replace('status.id = "trial-form-status";','status.id = "trial-form-status";\n  status.setAttribute("role", "status");\n  status.setAttribute("aria-live", "polite");');
formJS=formJS.replace("Thanks - your RouteOps trial request has been received. We'll contact you to arrange your private 14-day setup.","Thanks - your enquiry has been received. We will reply to the email address you provided.");
write('assets/trial-form.js',formJS);delete preserved['assets/trial-form.js'];
write('assets/website-enquiry-form.js',fs.readFileSync(path.join(repo,'assets/website-enquiry-form.js')));
write('assets/pilot-video.js',fs.readFileSync(path.join(repo,'assets/pilot-video.js')));
let siteJS=fs.readFileSync(path.join(out,'assets/site.js'),'utf8');
siteJS+='\n// Preserve existing public homepage anchors after the page split.\nif(location.pathname===\'/\'||location.pathname===\'/index.html\'){const old={\'#trial\':\'/contact/#enquiry\',\'#routeops\':\'/route-operations-dashboard/\',\'#routeops-proof\':\'/route-operations-dashboard/#overview\'};if(old[location.hash])location.replace(old[location.hash]);}\n';
write('assets/site.js',siteJS);
const extraCSS=`\n.legal-copy{max-width:900px}.legal-copy h2{font-size:1.6rem;margin-top:38px}.legal-copy h3{font-size:1.1rem}.legal-copy table{width:100%;border-collapse:collapse;margin:24px 0}.legal-copy th,.legal-copy td{text-align:left;padding:12px;border-bottom:1px solid var(--line);vertical-align:top}.legal-copy th{color:var(--text)}.legal-copy td{color:var(--muted)}.legal-copy a{color:var(--green);overflow-wrap:anywhere}.legal-copy li{color:var(--muted);margin:10px 0}.enquiry-form{margin-top:28px}.enquiry-form .inner{display:grid;gap:18px}.enquiry-form label{display:block;color:var(--text);font-weight:650;font-size:.9rem;margin-bottom:6px}.enquiry-form input:not([type=hidden]){width:100%;min-height:48px;padding:12px 14px;border:1px solid #ffffff30;border-radius:8px;background:#060d13;color:var(--text);font:inherit}.enquiry-form input:focus{outline:2px solid var(--green);outline-offset:2px}.form-privacy{font-size:.85rem;margin:18px 0;color:var(--muted)}.form-privacy a{color:var(--green)}.business-details{margin-top:18px;font-size:.8rem;color:var(--muted)}.business-details a{color:var(--green)}.business-details address{font-style:normal;margin-top:6px}.candidate-notice{border:1px solid #5bf0b44d;padding:18px;border-radius:10px}.legal-copy .review-date{font-size:.85rem}@media(max-width:700px){.legal-copy th,.legal-copy td{padding:9px 6px;font-size:.85rem}.cf-turnstile{max-width:100%;overflow:auto}}\n`;
const privacyCSS='\n.privacy-section{padding:40px 0 56px}.privacy-copy{max-width:760px;font-size:.9375rem;line-height:1.75}.privacy-copy h1{font-size:2rem;line-height:1.2;letter-spacing:-.025em;margin:0 0 8px}.privacy-copy .review-date{font-size:.78rem;color:var(--muted);padding-bottom:22px;margin-bottom:26px;border-bottom:1px solid var(--line)}.privacy-copy h2{font-size:1.125rem;line-height:1.4;letter-spacing:-.01em;margin:26px 0 10px}.privacy-copy p{margin-bottom:14px}.privacy-copy table{margin:16px 0;font-size:.875rem}.privacy-copy th,.privacy-copy td{padding:10px 12px}.privacy-copy a{color:#b5cfca;text-underline-offset:3px}.privacy-copy a:hover{color:var(--green)}.privacy-copy li{margin:6px 0}@media(max-width:700px){.privacy-section{padding:28px 0 40px}.privacy-copy h1{font-size:1.65rem}.privacy-copy th,.privacy-copy td{padding:8px 6px}}\n';
const websiteCSS='\n.enquiry-form select{width:100%;min-height:48px;padding:12px 14px;border:1px solid #ffffff30;border-radius:8px;background:#060d13;color:var(--text);font:inherit}.enquiry-form select:focus{outline:2px solid var(--green);outline-offset:2px}.enquiry-form textarea{width:100%;min-height:150px;padding:12px 14px;border:1px solid #ffffff30;border-radius:8px;background:#060d13;color:var(--text);font:inherit;resize:vertical}.enquiry-form textarea:focus{outline:2px solid var(--green);outline-offset:2px}\n';
write('assets/site.css',fs.readFileSync(path.join(out,'assets/site.css'),'utf8')+extraCSS+privacyCSS+websiteCSS);
const pageFiles=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory() && e.name==='approved-reference')continue;else if(e.isDirectory())walk(p);else if(e.name.endsWith('.html'))pageFiles.push(path.relative(stage,p).replaceAll('\\','/'));}}walk(stage);
const pages=Object.fromEntries(pageFiles.map(p=>['/'+p.replace(/index\.html$/,''),fs.readFileSync(path.join(stage,p),'utf8')]));
const home=pages['/'];
const rootLinks=s=>s.replace(/\b(href|src)="([^\"]+)"/g,(all,attr,value)=>/^(?:[a-z]+:|\/|#)/i.test(value)?all:attr+'="'+new URL(value,'https://fashearn.io/').pathname+'"');
const header=rootLinks(home.match(/<header>[\s\S]*?<\/header>/)[0]).replace('<nav aria-label="Main navigation">','<nav aria-label="Main navigation"><a href="/services/">Services</a>'),footer=rootLinks(home.match(/<footer[\s\S]*?<\/footer>/)[0]).replace('<p>Company</p>','<p>Company</p><a href="/services/">Website services</a>');
function page(title,description,body){return '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>'+title+' | Fashearn Labs</title><meta name="description" content="'+escape(description)+'"><link rel="icon" href="/assets/images/favicon.png"><link rel="stylesheet" href="/assets/site.css"><script src="/assets/site.js" defer></script></head><body><a class="skip" href="#main-content">Skip to content</a>'+header+'<main id="main-content" tabindex="-1">'+body+'</main>'+footer+'</body></html>';}
function md(text){let result='',para=[],table=false,list=false;const inline=s=>escape(s).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2">$1</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');const flush=()=>{if(para.length){result+='<p>'+inline(para.join(' '))+'</p>';para=[];}};for(const line of text.split('\n')){if(/^\|/.test(line)){flush();if(list){result+='</ul>';list=false;}if(/^\|\s*-/.test(line))continue;const cells=line.split('|').slice(1,-1);if(!table){result+='<table><thead><tr>'+cells.map(c=>'<th scope="col">'+inline(c.trim())+'</th>').join('')+'</tr></thead><tbody>';table=true;}else result+='<tr>'+cells.map(c=>'<td>'+inline(c.trim())+'</td>').join('')+'</tr>';continue;}if(table){result+='</tbody></table>';table=false;}if(line.startsWith('- ')){flush();if(!list){result+='<ul>';list=true;}result+='<li>'+inline(line.slice(2))+'</li>';continue;}if(list){result+='</ul>';list=false;}if(line.startsWith('### ')){flush();result+='<h2>'+inline(line.slice(4))+'</h2>';}else if(line.trim()==='')flush();else para.push(line.trim());}flush();if(table)result+='</tbody></table>';if(list)result+='</ul>';return result;}
const privacySource=fs.readFileSync(path.join(repo,'docs/PRIVACY-NOTICE-WORKING-DRAFT-2026-10-24.md'),'utf8');
let privacy=privacySource.split('## Draft notice — proposed wording for review')[1].split('## Internal assessment')[0].trim();
privacy=privacy.replace('Our proposed lawful basis','Our lawful basis').replace('The proposed basis','The basis').replace('The revised website','This website');
pages['/privacy/']=page('Privacy notice','How Harminder Singh Sekhon trading as Fashearn Labs handles website visits and enquiries.','<section class="privacy-section"><div class="shell legal-copy privacy-copy"><h1>Privacy notice</h1><p class="review-date">Last reviewed: 24 October 2026</p>'+md(privacy)+'</div></section>');
pages['/cookies/']=page('Cookies and video choices','Information about website security, cookies and optional YouTube video choices.','<section class="section"><div class="shell legal-copy"><p class="eyebrow">Fashearn Labs · Website information</p><h1>Cookies and video choices</h1><p>This website uses external services for hosting, form security and optional video content.</p><h2>Optional YouTube video</h2><p>The overview player stays unloaded until you choose Load YouTube video. Loading it connects your browser to YouTube, which may use cookies or similar technologies and receive device information. The page links to Google privacy information before you load it.</p><p>The choice is not saved in a site preference cookie or local storage. You can remove the player from the page. That stops the embedded player but does not erase information already received by YouTube. You may also watch directly on YouTube.</p><h2>Enquiry security</h2><p>Cloudflare Turnstile protects the enquiry form against automated misuse and can process technical signals such as IP address and browser information. <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Read Cloudflare’s Turnstile privacy information</a>.</p><h2>Other services and links</h2><p>Application images may be served through GitHub. Following links to LinkedIn, Google or another external website takes you to that provider’s privacy arrangements.</p><p>See our <a href="/privacy/">privacy notice</a> for the enquiry data flow, service providers, retention and contact details.</p><h2>Questions</h2><p>Email <a href="mailto:info@fashearn.io">info@fashearn.io</a> about this website’s handling of information.</p></div></section>');
pages['/terms/']=page('Website terms','Terms for using the Fashearn Labs informational website.','<section class="section"><div class="shell legal-copy"><p class="eyebrow">Fashearn Labs · Website information</p><h1>Website terms</h1><p>Last reviewed: 24 October 2026</p><h2>Website operator</h2><p>This website is operated by Harminder Singh Sekhon, a sole trader trading as Fashearn Labs. Contact <a href="mailto:info@fashearn.io">info@fashearn.io</a>.</p><h2>Information and enquiries</h2><p>This is an informational website about Fashearn Labs and Fashearn Labs Route Operations Dashboard v1.1. Sending an enquiry does not create an account, start a trial or enter you into a paid subscription.</p><p>Dashboard enrolment and paid Checkout are not currently open. The pricing page describes the intended offer; any future enrolment must present the applicable terms before you commit.</p><h2>Operational resources</h2><p>Our resource articles provide general operational guidance. Review your own records, contracts and agreed rates when making operational or pay-run decisions.</p><h2>Website content</h2><p>Fashearn Labs branding, guides and application images identify our work. Other names and embedded services belong to their respective owners. Please contact us if you would like permission to reuse our materials.</p><h2>External services</h2><p>External websites and the YouTube player are provided by their operators. Their own terms and privacy arrangements apply when you use them.</p><h2>Privacy</h2><p>Read our <a href="/privacy/">privacy notice</a> and <a href="/cookies/">cookies and video information</a> for how website information is handled.</p><h2>Changes</h2><p>We may update website information and these terms as the site and Dashboard develop. Changes to future subscription terms will be addressed in the relevant enrolment journey.</p></div></section>');
const sitekey=original('index.html').toString('utf8').match(/data-sitekey="([^"]+)"/)[1];
const fields=[['name','Name','text','256'],['company','Company','text','256'],['email','Email','email','128'],['drivers','Approximate number of drivers','number','128'],['carriers','Carriers used','text','256']];
const form='<form enctype="multipart/form-data" id="form01" method="post" action="/api/trial" class="enquiry-form"><div class="inner">'+fields.map(([name,label,type,max])=>'<div class="field"><label for="form01-'+name+'">'+label+'</label><input type="'+type+'" name="'+name+'" id="form01-'+name+'" maxlength="'+max+'" required'+(type==='email'?' autocomplete="email"':'')+'></div>').join('')+'<p class="form-privacy">We use these details to answer your enquiry and provide the follow-up you request. You are not added to a general marketing list. Read our <a href="/privacy/">privacy notice</a>.</p><div class="cf-turnstile" data-sitekey="'+sitekey+'" data-theme="dark"></div><div class="actions"><button class="button primary" type="submit">Send enquiry</button></div></div><input type="hidden" name="id" value="form01"></form>';

const websiteFields=[
  ['name','Your name','text',120,'autocomplete="name" required'],
  ['email','Email address','email',200,'autocomplete="email" required'],
  ['company','Business name','text',150,'autocomplete="organization" required']
];
const websiteForm='<form enctype="multipart/form-data" id="website-enquiry-form" method="post" action="/api/website-enquiry" class="enquiry-form"><div class="inner">'+
  websiteFields.map(([name,label,type,max,options])=>'<div class="field"><label for="website-'+name+'">'+label+'</label><input id="website-'+name+'" name="'+name+'" type="'+type+'" maxlength="'+max+'" '+options+'></div>').join('')+
  '<div class="field"><label for="website-type">What website do you need?</label>'+
  '<select id="website-type" name="project_type" required><option value="">Select an option</option>'+
  '<option value="one-page">One-page Starter Website — from £249</option>'+
  '<option value="multi-page">Multi-page business website</option>'+
  '<option value="existing-site">Update an existing website</option>'+
  '<option value="unsure">Not sure yet</option></select></div>'+
  '<div class="field"><label for="website-details">Tell us a little about your project</label>'+
  '<textarea id="website-details" name="project_details" maxlength="1800" rows="5" required></textarea></div>'+
  '<p class="form-privacy">We use your details to respond to your website enquiry, not to add you to a marketing list. See our <a href="/privacy/">privacy notice</a>.</p>'+
  '<div class="cf-turnstile" data-sitekey="'+sitekey+'" data-theme="dark"></div>'+
  '<div class="actions"><button class="button primary" type="submit">Send website enquiry</button></div></div></form>';
pages['/services/']=page('Small Business Website Design & Development',
  'Responsive small business websites from £249 by Fashearn Labs. Optional website care at £49/month; larger projects quoted separately.',
  [
    '<section class="hero"><div class="shell pricing-grid"><div>',
    '<p class="eyebrow">Fashearn Labs · Website services</p>',
    '<h1>Professional websites<br><span class="gradient">for small businesses.</span></h1>',
    '<p class="lead">Modern, mobile-friendly websites that help customers understand what you do and how to contact you.</p>',
    '<p>Clear scope, straightforward communication and a practical handover. This is separate from our Route Operations Dashboard product.</p>',
    '<div class="actions"><a class="button primary" href="#website-enquiry">Ask about a website →</a><a class="button" href="/client-stories/rsmcr-logistics/">See our client work →</a></div>',
    '</div><aside class="offer"><p class="eyebrow">Small Business Starter Website</p>',
    '<h2>£249 <span>one-off.</span></h2>',
    '<p>One responsive page with up to five sections, using your approved text and images.</p>',
    '<p>Additional pages and complex features are quoted separately.</p>',
    '<p>Optional Website Care: <strong>£49/month</strong>.</p></aside></div></section>',
    '<section class="section"><div class="shell grid">',
    '<div class="card"><p class="eyebrow">Included</p><h2>A clear place<br><span>to start.</span></h2>',
    '<p>One-page responsive design, up to five sections, supplied text and images, basic search metadata, contact links, one revision round and a basic handover.</p></div>',
    '<div class="card"><p class="eyebrow">Larger projects</p><h2>Quoted to<br><span>your requirements.</span></h2>',
    '<p>Extra pages, online shops, bookings, custom forms or backends and CMS features are not included. We confirm scope and price in writing.</p></div>',
    '<div class="card"><p class="eyebrow">Optional Website Care</p><h2>£49<br><span>per month.</span></h2>',
    '<p>Monthly checks and up to 30 minutes of minor updates to existing pages using materials you provide. No 24/7 coverage or guaranteed uptime.</p></div>',
    '</div></section>',
    '<section class="section alt"><div class="shell contact-grid">',
    '<div class="card" id="website-enquiry"><p class="eyebrow">Website Services enquiries</p>',
    '<h2>Tell us about<br><span>your website.</span></h2>',
    '<p>This form is for website projects, not Dashboard private pilot applications. No payment or checkout is required to enquire.</p>',
    websiteForm,
    '</div><div>',
    '<div class="contact-detail"><p class="eyebrow">How we work</p>',
    '<h2>Simple steps.<br><span>Clear expectations.</span></h2>',
    '<p>Tell us what you need, agree the written quote, supply approved text and images, review the preview, agree one revision and arrange handover.</p>',
    '<p>Target around seven working days after complete agreed inputs, subject to an agreed schedule.</p></div>',
    '<div class="contact-detail"><p class="eyebrow">Route Operations private pilot</p>',
    '<p>Want to enquire about Fashearn Labs Route Operations Dashboard v1.1 instead?</p>',
    '<a class="text-link" href="/contact/#enquiry">Use the separate private pilot enquiry form →</a></div>',
    '</div></div></section>'
  ].join(''));
pages['/services/']=pages['/services/'].replace('</head>','<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script><script src="/assets/website-enquiry-form.js" defer></script></head>');
pages['/contact/']=page('Contact Fashearn Labs','Enquire about Fashearn Labs Route Operations Dashboard v1.1 or contact info@fashearn.io.','<section class="hero"><div class="shell"><p class="eyebrow">Contact Fashearn Labs</p><h1>Tell us about<br><span class="gradient">your operation.</span></h1><p class="lead">For general Fashearn Labs questions, email <a class="text-link" href="mailto:info@fashearn.io">info@fashearn.io</a>.</p><p>Use the form below for enquiries about Fashearn Labs Route Operations Dashboard v1.1. It does not create an account or start a trial.</p></div></section><section class="section"><div class="shell contact-grid"><div class="card" id="enquiry"><p class="eyebrow">Dashboard enquiries</p><h2>Send your <span>enquiry.</span></h2>'+form+'</div><div><div class="contact-detail"><p class="eyebrow">Explore first</p><h2>See the <span>Dashboard.</span></h2><p>Watch the overview, view the application screens or open the approved 27-page User Guide.</p><div class="actions"><a class="button" href="/route-operations-dashboard/">Explore the Dashboard →</a><a class="text-link" href="/assets/Fashearn_Labs_Route_Operations_Dashboard_v1.1_Web_Square_Guide.pdf">Open the guide ↗</a></div></div><div class="contact-detail"><p class="eyebrow">Company channel</p><p><a class="text-link" href="https://www.linkedin.com/company/fashearn-labs/">Fashearn Labs on LinkedIn ↗</a></p></div></div></div></section>');
pages['/contact/']=pages['/contact/'].replace('</head>','<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script><script src="/assets/trial-form.js" defer></script></head>');
pages['/']=pages['/'].replace('</main>','<section class="section" id="website-services"><div class="shell split"><div><p class="eyebrow">Website Services · Small businesses</p><h2>Professional websites.<br><span>Clear, practical results.</span></h2></div><div><p>A modern, mobile-friendly website that helps customers understand what you do and get in touch. Small Business Starter Website from <strong>£249 one-off</strong>. Optional Website Care at <strong>£49/month</strong>. Extra pages quoted separately.</p><a class="button primary" href="/services/">Ask about a website →</a></div></div></section><section class="section" id="trial"><div class="shell"><p class="eyebrow">Dashboard enquiries</p><h2>Have a question about<br><span>your operation?</span></h2><p>Enrolment is not currently open. You can explore the Dashboard or send an enquiry.</p><a class="button primary" href="/contact/#enquiry">Contact Fashearn Labs →</a></div></section></main>');
const address=business.businessAddress?'<address>'+escape(business.businessAddress).replaceAll('\n','<br>')+'</address>':'';
const legal='<div class="business-details">'+escape(business.legalName)+' trading as '+escape(business.tradingName)+' · <a href="mailto:'+escape(business.email)+'">'+escape(business.email)+'</a>'+address+'</div>';

// Approved visual design is applied only to new commercial review pages.
// Preserve legacy company/product pages and the protected /contact/ pilot handler.
write('assets/approved-commercial.css',fs.readFileSync(path.join(stage,'assets/approved-commercial.css')));
const visualSource=path.join(stage,'approved-reference');
const approvedNav=fs.readFileSync(path.join(visualSource,'header.html'),'utf8')
  .replace(/<!--[\s\S]*?-->/,'').trim();
const approvedPaths={
  home:'/',services:'/services/',pilot:'/private-pilot/',
  pricing:'/pricing/',about:'/about/',contact:'/contact/',
  'website-enquiry':'/website-enquiry/','pilot-enquiry':'/contact/#enquiry'
};
function approvedVisualPage(title,description,name){
  let section=fs.readFileSync(path.join(visualSource,name+'.html'),'utf8')
    .replace(/<!--[\s\S]*?-->/,'').trim()
    .replace('<section class="screen"','<section class="screen active"');
  // Preview's data-go anchors become ordinary static, browser-accessible routes.
  const linkRoute=(html)=>html.replace(/data-go="([^"]+)"\s+href="#[^"]+"/g,(m,target)=>{
    if(!Object.hasOwn(approvedPaths,target))throw new Error('Unknown approved preview link '+target);
    return 'href="'+approvedPaths[target]+'"';
  });
  section=linkRoute(section);
  if(name==='website-enquiry'){
    section=section.replace('action="#" class="preview-enquiry" data-intended-endpoint="/api/website-enquiry"','action="/api/website-enquiry" enctype="multipart/form-data" class="preview-enquiry"');
    const button='<button class="button primary" type="submit">Send website enquiry →</button>';
    if(!section.includes(button))throw new Error('Approved Website Enquiry submit button missing');
    section=section.replace(button,'<div class="cf-turnstile" data-sitekey="'+sitekey+'" data-theme="dark"></div>'+button);
  }
  let nav=linkRoute(approvedNav).replace('Preview navigation','Main navigation');
  // Homepage-only logo: preserve the header text and use a transparent arrow,
  // with no square border, background, or CSS-drawn box.
  if(name==='home'){
    const textMark='<span class="mark">↗</span>';
    if(!nav.includes(textMark))throw new Error('Expected homepage header arrow missing');
    nav=nav.replace(textMark,'<img src="/assets/images/fashearn-arrow.svg" width="32" height="32" alt="" decoding="async" style="width:32px;height:32px;display:block;object-fit:contain">');
  }
  const footer='<footer><div class="shell footer"><a class="brand" href="/"><span class="mark">↗</span><span>FASHEARN LABS<small>INTELLIGENT SYSTEMS</small></span></a>'+
    '<div><a href="/privacy/">Privacy</a> · <a href="/cookies/">Cookies</a> · <a href="/terms/">Website terms</a> · '+
    '<a href="mailto:info@fashearn.io">info@fashearn.io</a></div></div>'+
    '</footer>';
  const scripts=name==='website-enquiry'
    ? '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script><script src="/assets/website-enquiry-form.js" defer></script>'
    : name==='pilot' ? '<script src="/assets/pilot-video.js" defer></script>' : '';
  return '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<meta name="color-scheme" content="dark"><title>'+escape(title)+' | Fashearn Labs</title>'+
    '<meta name="description" content="'+escape(description)+'">'+
    '<link rel="icon" href="/assets/images/favicon.png"><link rel="stylesheet" href="/assets/approved-commercial.css">'+
    scripts+'</head><body><a class="skip" href="#main-content">Skip to content</a>'+
    '<div class="topnote">Fashearn Labs · Websites and custom business systems · RouteOps is a separate product</div>'+
    nav+'<main id="main-content">'+section+'</main>'+footer+'</body></html>';
}
pages['/']=approvedVisualPage(
  'Fashearn Labs — Websites and custom business systems',
  'Fashearn Labs designs professional websites and builds bespoke dashboards, reporting tools and business systems. Route Operations Dashboard v1.1 is an example, with a separate private pilot.',
  'home'
);
// Keep existing homepage anchor journeys and approved resource routes working.
// Legacy trial/#routeops anchors redirect to their established destinations.
pages['/']=pages['/'].replace('</head>',
  '<script>if(location.hash==="#trial")location.replace("/contact/#enquiry");'+
  'else if(location.hash==="#routeops")location.replace("/route-operations-dashboard/");'+
  'else if(location.hash==="#routeops-proof")location.replace("/route-operations-dashboard/#overview");</script></head>');
pages['/services/']=approvedVisualPage(
  'Professional websites for small businesses',
  'Fashearn Labs builds modern small business websites from £249. Optional care £49/month; extra pages quoted separately.',
  'services'
);
pages['/website-enquiry/']=approvedVisualPage(
  'Website Services enquiry',
  'Tell Fashearn Labs about your website requirements. Website enquiry only; no checkout or payment.',
  'website-enquiry'
);
pages['/private-pilot/']=approvedVisualPage(
  'Route Operations Dashboard v1.1 — Private Pilot',
  'Apply for a manually arranged Route Operations Dashboard v1.1 private pilot. No instant signup or payments.',
  'pilot'
);
const tax=business.vatRegistered===false?'No VAT is charged.':business.vatRegistered===true?(business.priceIncludesVat?'Prices include VAT.':'Prices are exclusive of VAT.'):'VAT treatment awaiting owner confirmation in this release candidate.';
const manifest={baseline,sourceBranch:'release/informational-website-20261024',prepared:'2026-10-24',businessDetailsComplete:detailsReady,trialEnrolment:false,paidCheckout:false,preserved,files:[],routes:Object.keys(pages),limits:['No provider submission or hosted deployment tested.','Mailbox retention policy recorded; no email deletion configured.']};
for(let [route,html]of Object.entries(pages)){
  // Include Services navigation on both generated pages and legacy staged pages.
  if (!html.includes('<nav aria-label="Main navigation"><a href="/services/">Services</a>')) html=html.replace('<nav aria-label="Main navigation">','<nav aria-label="Main navigation"><a href="/services/">Services</a>');
  if (!html.includes('<p>Company</p><a href="/services/">Website services</a>')) html=html.replace('<p>Company</p>','<p>Company</p><a href="/services/">Website services</a>');
  html=html.replace(/<meta name="robots" content="noindex,nofollow,noarchive">/g,'');
  html=html.replace(/<p class="review-state">[\s\S]*?<\/p>/g,'').replace(/<p class="note">This first resource[\s\S]*?<\/p>/,'');
  html=html.replace(/<p class="preview-note">[\s\S]*?<\/p>/,'<p class="preview-note">Dashboard enrolment is not currently open.</p>');
  html=html.replaceAll('Trial enrolment is not enabled in this preview.','Trial enrolment is not currently open.').replaceAll('Trial enrolment and Checkout are not enabled in this preview.','Trial enrolment and paid Checkout are not currently open.').replaceAll('This preview does not enable trial enrolment.','Trial enrolment is not currently open.').replaceAll('This preview does not accept signups or payments.','This website does not accept signups or payments.').replaceAll('This design preview does not create an account, collect card details or start a subscription.','This website does not create an account, collect card details or start a subscription.').replaceAll('Trial enrolment and Checkout are not enabled in this design preview.','Trial enrolment and Checkout are not currently open.');
  html=html.replace(/href="https:\/\/fashearn\.io\/#trial"/g,'href="/contact/#enquiry"').replaceAll('existing website enquiry route','website enquiry route').replaceAll('Enrolment is<br><span>not enabled here.</span>','Enrolment is<br><span>not currently open.</span>');
  // Legal links belong in the legacy footer's Company group, never the main navigation.
  if (html.includes('<div class="footer-links">')) html=html.replace(
    /(<div class="footer-group"><p>Company<\/p>[\s\S]*?<a href="[^"]*contact\/">Contact<\/a>)/,
    '$1<a href="/privacy/">Privacy</a><a href="/cookies/">Cookies &amp; video</a><a href="/terms/">Website terms</a>'
  );
  html=html.replace('</footer>','<div class="shell">'+legal+'</div></footer>');
  html=html.replace(/\b(href|src)="([^"]+)"/g,(all,attr,value)=>{if(/^(https?:)?\/\//.test(value)){if(value.startsWith('https://fashearn.io/assets/'))return attr+'="'+new URL(value).pathname+'"';if(value===shot)return attr+'="/assets/routeops-dashboard-v1.1.png"';return all;}if(value.startsWith('#')||/^[a-z]+:/i.test(value)||value.startsWith('/'))return all;return attr+'="'+new URL(value,'https://fashearn.io'+route).pathname+'"';});
  const canonical='https://fashearn.io'+route,title=html.match(/<title>([^<]+)<\/title>/)[1],description=html.match(/<meta name="description" content="([^"]*)"/)[1];
  const image='https://fashearn.io/assets/routeops-dashboard-v1.1.png';
  html=html.replace('</head>','<link rel="canonical" href="'+canonical+'"><meta property="og:type" content="'+(route.includes('checklist')?'article':'website')+'"><meta property="og:url" content="'+canonical+'"><meta property="og:title" content="'+title+'"><meta property="og:description" content="'+description+'"><meta property="og:image" content="'+image+'"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+title+'"><meta name="twitter:description" content="'+description+'"><meta name="twitter:image" content="'+image+'"></head>');
  if(['/', '/pricing/','/trial/','/route-operations-dashboard/'].includes(route))html=html.replace('</main>','<p class="shell caption">'+tax+'</p></main>');
  if(route==='/')html=html.replace('</head>','<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:business.tradingName,legalName:business.legalName,email:business.email,url:'https://fashearn.io/',...(business.businessAddress?{address:business.businessAddress}:{})})+'</script></head>');
  const file=route==='/'?'index.html':route.slice(1)+'index.html';write(file,html);manifest.files.push(file);
}
write('robots.txt','User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /verify\nDisallow: /trial/success\nSitemap: https://fashearn.io/sitemap.xml\n');
// Keep sitemap dates tied to meaningful page edits, never the build clock.
// Update these values when a changed page is approved for publication.
const pageLastModified={
  '/':'2026-10-28',
  '/route-operations-dashboard/':'2026-10-28',
  '/courier-delivery-operations/':'2026-10-28',
  '/client-stories/rsmcr-logistics/':'2026-10-28',
  '/about/':'2026-10-27',
};
const defaultPageLastModified='2026-10-24';
write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+Object.keys(pages).map(p=>'  <url><loc>https://fashearn.io'+p+'</loc><lastmod>'+(pageLastModified[p]||defaultPageLastModified)+'</lastmod></url>').join('\n')+'\n</urlset>\n');
write('_routes.json',JSON.stringify({version:1,include:['/api/trial','/verify','/api/website-enquiry'],exclude:[]},null,2)+'\n');
write('_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n/trial/success\n  X-Robots-Tag: noindex, nofollow\n/trial/success.html\n  X-Robots-Tag: noindex, nofollow\n');
fs.mkdirSync(path.join(repo,'work'),{recursive:true});fs.writeFileSync(path.join(repo,'work/release-manifest.json'),JSON.stringify(manifest,null,2));
console.log(JSON.stringify({releaseDirectory:out,pages:Object.keys(pages).length,businessDetailsComplete:detailsReady,protectedFunctions:'unchanged',paidCheckout:false},null,2));
