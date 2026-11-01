// Entirely offline: evaluates the actual handler with fake requests and mocked fetch.
// No Turnstile, Make, Cloudflare, email, customer data or other external request.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'functions/api/website-enquiry.js'), 'utf8');
const env = {
  TURNSTILE_SECRET_KEY: 'FAKE_OFFLINE_TURNSTILE',
  WEBSITE_ENQUIRY_MAKE_WEBHOOK_URL: 'https://hook.eu1.make.com/OFFLINE_FAKE_WEBHOOK',
  WEBSITE_ENQUIRY_MAKE_API_KEY: 'FAKE_OFFLINE_MAKE_API_KEY'
};
let checks = 0;

async function run(overrides = {}) {
  const values = {
    name: 'Sample Person', company: 'Sample Ltd', email: 'sample@example.invalid',
    project_type: 'one-page', project_details: 'Please quote for a simple website.',
    'cf-turnstile-response': 'offline-fake-turnstile-token',
    ...overrides.fields
  };
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (value !== null) data.set(key, value);
  }
  const request = overrides.request || new Request('https://fashearn.io/api/website-enquiry', {
    method: 'POST', body: data, headers: overrides.headers
  });
  const calls = [];
  const fetch = async (url, options) => {
    calls.push({ url, options });
    if (String(url).includes('siteverify')) {
      if (overrides.throwVerify) throw new Error('fake network failure');
      return Response.json({ success: overrides.verified !== false }, {
        status: overrides.verifyStatus || 200
      });
    }
    if (overrides.throwMake) throw new Error('fake network failure');
    return new Response('FAKE', { status: overrides.makeStatus || 200 });
  };
  const scope = { Request, Response, URL, URLSearchParams, FormData, fetch };
  vm.createContext(scope);
  vm.runInContext(source.replace('export async function onRequestPost',
    'async function onRequestPost') + '\nthis.handler = onRequestPost;', scope);
  const response = await scope.handler({ request, env: overrides.env ?? env });
  checks++;
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  return { response, calls };
}

async function expectStatus(code, overrides = {}, callsExpected) {
  const result = await run(overrides);
  assert.equal(result.response.status, code);
  if (callsExpected !== undefined) assert.equal(result.calls.length, callsExpected);
  return result;
}

(async () => {
  for (const field of ['name', 'company', 'email', 'project_type', 'project_details']) {
    await expectStatus(400, { fields: { [field]: null } }, 0);
  }
  await expectStatus(400, { fields: { email: 'invalid-address' } }, 0);
  await expectStatus(400, { fields: { name: 'X'.repeat(121) } }, 0);
  await expectStatus(400, { fields: { project_details: 'X'.repeat(1801) } }, 0);
  await expectStatus(400, { fields: { project_type: 'a-random-project' } }, 0);
  await expectStatus(400, { fields: { 'cf-turnstile-response': null } }, 0);
  await expectStatus(413, { headers: { 'content-length': '20000' } }, 0);
  await expectStatus(415, { request: new Request('https://fashearn.io/api/website-enquiry', {
    method: 'POST', body: JSON.stringify({ name: 'not a form' }),
    headers: { 'content-type': 'application/json' }
  }) }, 0);
  await expectStatus(503, { env: { ...env, TURNSTILE_SECRET_KEY: '' } }, 0);
  await expectStatus(503, { env: { ...env, WEBSITE_ENQUIRY_MAKE_API_KEY: '' } }, 0);
  await expectStatus(503, { env: { ...env, WEBSITE_ENQUIRY_MAKE_WEBHOOK_URL: '' } }, 0);
  for (const bad of [
    'http://hook.eu1.make.com/test', 'https://evil.example.invalid/test',
    'https://hook.eu1.make.com.evil.invalid/test', 'https://hook.eu1.make.com:9090/test',
    'https://user:pass@hook.eu1.make.com/test'
  ]) await expectStatus(503, { env: { ...env, WEBSITE_ENQUIRY_MAKE_WEBHOOK_URL: bad } }, 0);
  await expectStatus(403, { verified: false }, 1);
  await expectStatus(502, { verifyStatus: 503 }, 1);
  await expectStatus(500, { throwVerify: true }, 1);
  await expectStatus(502, { makeStatus: 403 }, 2);
  await expectStatus(500, { throwMake: true }, 2);
  const success = await expectStatus(200, { fields: { company: 'Test\nCompany', project_type: 'multi-page' } }, 2);
  assert.equal(success.calls[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
  assert.equal(success.calls[0].options.redirect, 'manual');
  assert.equal(success.calls[1].url, env.WEBSITE_ENQUIRY_MAKE_WEBHOOK_URL);
  assert.equal(success.calls[1].options.headers['x-make-apikey'], env.WEBSITE_ENQUIRY_MAKE_API_KEY);
  assert.equal(success.calls[1].options.redirect, 'manual');
  assert.deepEqual(JSON.parse(success.calls[1].options.body), {
    name: 'Sample Person', company: 'TestCompany', email: 'sample@example.invalid',
    phone: '', message: 'Website request: Multi-page business website\n\nProject details:\nPlease quote for a simple website.'
  });
  const body = success.calls[1].options.body;
  assert.ok(!body.includes(env.WEBSITE_ENQUIRY_MAKE_API_KEY));
  assert.ok(!body.includes('offline-fake-turnstile-token'));
  checks += 7;
  console.log(JSON.stringify({ result: 'PASS', offline_checks: checks, real_external_requests: 0 }));
})().catch(error => { console.error(error); process.exitCode = 1; });
