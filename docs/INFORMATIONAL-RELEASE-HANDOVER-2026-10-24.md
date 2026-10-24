# Published informational website — 24 October 2026

The owner explicitly approved publication of the reviewed website, including the displayed business address, with Dashboard enrolment and paid Checkout kept closed.

## Deployment

- Live site: https://fashearn.io/
- PR #5 merged: https://github.com/fashearn-labs/fashearn-website/pull/5
- Published source: `96d2ad77e6dd309bba7c5b1f8579a8f4c25b6abc`.
- Cloudflare deployment: `32bca902-6d59-4306-938f-3e2775f171d2`; GitHub Cloudflare Pages check completed successfully.
- Existing Pages project: `fashearn-website`, production branch `main`.
- Build command: `node scripts/prepare-informational-release.cjs --require-business-details`.
- Output directory: `dist-release`; project root unchanged.
- Existing encrypted Make/Turnstile variables and both protected Functions retained. No secret values viewed or changed.
- Previous production deployment retained by Cloudflare: `b7e359e0-afb5-4418-8228-b7e0f1c2be54`.

## Verified result

The 13-page company site includes the approved courier pay-run article, discreet Privacy notice, Cookies and video information, Website terms, and enquiry form. Public operator details are owner approved. The business is not VAT registered; pricing says no VAT is charged.

Local build and static checks passed: 13 pages, 364 local links/assets, 11 preserved baseline files. Fourteen offline checks exercised the unchanged enquiry and verification handlers with mocked upstreams and no external requests.

Post-deployment HTTP checks passed: all 13 public pages returned 200, nine preserved public files matched baseline SHA-256 checksums (including both PDF guide URLs and the original trial return page), robots and the 13-entry sitemap were correct. Missing-token verification returned 400 with no-store; an empty enquiry returned the expected 400 validation response and did not reach Make or send email.

Browser verification confirmed the new live Home, direct legacy `/#trial` redirect to `/contact/#enquiry`, visible field labels and privacy link, enquiry script, and an automatically successful Turnstile widget. No CAPTCHA was manually solved. Live email delivery has NOT been tested; no real enquiry was sent.

The owner approved the quieter Privacy layout: modest heading, narrower column, tighter spacing and no promotional eyebrow. Footer and enquiry privacy links remain.

## Scope and continuation

Dashboard enrolment and paid Checkout remain OFF. No app repository, app HOLD, DNS, paid infrastructure, customer record, provider secret or email-retention setting was changed.

The 12-month policy for unsuccessful enquiries is documented; mailbox deletion has not been automated. Historical staging/review files are not the public output. The local standalone review disables submission; the published Contact uses the original protected endpoint.

App debugging remains separate: N2 FAIL_HOLD / G05–G12 HOLD per the operating-plan authority reviewed during preparation. Website publication does not authorize app release or migration. The owner wants practical app finalization options if unresolved by the end of next week; no reminder automation was requested or created.

This handover supersedes the pre-publication status in earlier website preparation notes.
