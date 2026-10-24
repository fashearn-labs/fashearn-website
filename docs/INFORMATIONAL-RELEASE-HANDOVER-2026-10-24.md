# Informational website release candidate — 24 October 2026

## Concrete result

Prepared a reproducible 13-page release from the reviewed company-site staging branch. Added Privacy, Cookies and video, Website terms, and an accessible enquiry form using the existing protected `/api/trial` contract. Preserved the two Cloudflare Functions, trial return page, approved PDF and original image assets. Old homepage trial anchors lead to Contact. Dashboard enrolment and paid Checkout remain OFF. No app repository or provider setting changed; no merge, publish or deployment performed.

Source branch: `release/informational-website-20261024`, based on website `8befbdea72324ecef8cf241631bf180158a1bfc8`. Production baseline: `066b14eed5001289cd9b4e56095f761811cebfd2`. The approved courier article remains included.

## Verification

- Release build completed with the business-details gate enabled locally.
- Static checker: 13 pages, 364 local links/assets, 11 original files preserved by SHA-256; PASS.
- Actual unchanged enquiry and verification handlers: 14 offline checks covering validation, security rejection, upstream failure, successful enquiry payload and sandbox verification contract; PASS. Upstreams mocked; zero external requests or emails.
- Browser: new pages at 320px; remaining six content pages at 768px; Contact/Privacy at 1440px. No horizontal overflow observed. Legacy `/#trial` resolved to `/contact/#enquiry`; visible field labels and adjacent privacy link verified. No full live provider or hosted end-to-end test claimed.
- Updated standalone local review includes all 13 pages. Submission is deliberately disabled in the review file; release Contact retains the real protected endpoint.

## Build and deployment review

Build: `node scripts/prepare-informational-release.cjs --require-business-details`

Output directory: `dist-release`. Keep project-root `functions/` as existing Cloudflare Pages Functions. The build uses a pinned baseline checksum manifest and does not require Git history or provider credentials. Existing Turnstile/Make environment variables remain required for the existing enquiry handler. Do not upload the repository, staging, internal docs or review file as the public output.

Checks: `python scripts/check-informational-release.py` and `node scripts/check-protected-handlers.cjs`.

Owner explicitly approved publication on 24 October 2026, including the displayed business address, while keeping trial enrolment and payments closed. The approved business details are now in `release/business-details.json`; the business is not VAT registered. No app release approval is implied.

Publication is authorized. Next action is to confirm the existing Cloudflare Pages build settings, merge/deploy the informational website and perform a hosted smoke check of pages, PDF and privacy. Real enquiry delivery has not yet been tested. No subscriptions or trial enrolment are enabled by this candidate.

## Separate app position

Latest operating-plan main reviewed: `e7c5e731058377bc4f8192d7b831fc6abf9a7698`; current handover protocol and roadmap read. App remains N2 FAIL_HOLD / G05–G12 HOLD. G05 concerns storage-owner/all-writer isolation on the existing Render service, rather than website rendering. A written platform feasibility response or a separately approved alternative architecture is needed; another website checklist cannot resolve it. No app HOLD overridden, migration purchased, support message sent or customer data changed. Owner requests website completion first and a practical app decision by the end of next week; no reminder automation has been created.

Owner-requested visual adjustment: Privacy now uses a modest heading, narrower reading column and tighter spacing, with no promotional eyebrow. Footer and enquiry privacy links remain. Copy unchanged. Rebuilt review and release package; 13-page/364-link check passed; desktop and 320px browser check passed.
