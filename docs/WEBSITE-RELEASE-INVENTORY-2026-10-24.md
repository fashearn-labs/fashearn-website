# Website release source inventory — 24 October 2026
This is an internal evidence record, not website legal copy or release approval.

## Confirmed in the reviewed source
| Item | Source / status |
| --- | --- |
| Public brand/product | Website PROJECT-BASELINE: Fashearn Labs Route Operations Dashboard v1.1 |
| Planned offer | WEBSITE-ROADMAP and website baseline: 14 days, valid card required, £0 initially, £99/month afterwards unless cancelled, no minimum term |
| Approved guide | assets/Fashearn_Labs_Route_Operations_Dashboard_v1.1_Web_Square_Guide.pdf, 27 pages per approved baseline |
| Overview video | Existing privacy-enhanced YouTube embed 4FONAL7q9os, described as 44 seconds |
| Existing enquiry route | Current root index.html form01, section #trial, POST /api/trial |
| Enquiry fields | name, company, email, drivers, carriers |
| Enquiry security/forwarding | functions/api/trial.js blob 15790e097ffb92f97c4461cae412186ec4b85297 requires Turnstile verification then uses environment-configured Make webhook; no endpoint secret read or copied |
| Existing company channel | Root index.html links https://www.linkedin.com/company/fashearn-labs/ |
| Public trial activation | OFF; ten-page design preview contains no form, signup, payment action or activation code |

Source inspection confirms implementation text and existing public links, not fresh successful submissions or provider acceptance. No enquiry submitted; no email, social message, signup or payment sent.

## Evidence still needed before publication
- Owner has confirmed Harminder Singh Sekhon, sole trader trading as Fashearn Labs; privacy/enquiry inbox info@fashearn.io. Any further required business disclosure details still need verification. No address, registration number or ICO reference invented.
- Approved current privacy notice and terms. Reviewed website tree/root source did not provide policy pages; bounded two-repository searches returned no results, which alone is not proof no policy exists elsewhere.
- Owner confirmed Microsoft 365 stores enquiries in info@fashearn.io and adopted 12 months after last contact for enquiries that do not become customers. Implement the inbox/copy review/deletion practice; confirm actual forwarding/recipients, processor arrangements and automation history. This records a policy decision, not completed mailbox configuration.
- Owner screenshots now confirm Make Free, Keep data confidential = No, Store incomplete executions = No, and webhook -> Microsoft 365 Email flow. Official rendered Make pricing comparison confirms 7-day detailed execution logs on Free. This is not a complete provider-data erasure guarantee; queue/backup/transfer arrangements remain to verify.
- Review actual third-party resource/consent behavior: YouTube embed, external GitHub screenshots/favicon/guide and existing form's Turnstile/Make path. No assertion of compliance or “no cookies” made.
- Approved cancellation/support terms and working account/billing controls. Planned pricing copy is not acceptance of hosted billing/release.
- A migration decision for the existing enquiry form and anchor: staged Contact currently links to the OLD live https://fashearn.io/#trial. Replacing the root homepage without preserving/remapping that form/anchor would break that contact route. Resolve before any deployment.
- Preserve /verify, /api/trial, /trial/success.html and the existing form security. Staged /trial/ is an information-only page in a separate directory, not a replacement of the existing trial success route.
- Reviewed final metadata/canonical/schema/sitemap/robots and URL mapping; no changes to production SEO until release approval.
- Final browser/accessibility and hosted visitor-journey acceptance, deployment/rollback scope and explicit owner release approval.

## Staging rules
All ten staged pages deliberately retain noindex,nofollow,noarchive. No blank privacy/terms placeholder pages or invented policies are linked. Source work remains isolated under staging/company-site/ on design/company-site-foundation-20261024. Website production root/forms/functions/trial/SEO unchanged; app repos untouched; N2 FAIL_HOLD, G05–G12 HOLD and live paid Checkout/public CTA OFF.

