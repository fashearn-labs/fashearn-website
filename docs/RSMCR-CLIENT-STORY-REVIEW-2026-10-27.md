# RSMCR Logistics client story — review-only website work
**27 October 2026 | NOT published | Awaiting owner/client approval**

## Source and preservation
- Current Fashearn informational company site is the published 13-page **multi-page** site. Actual Cloudflare Pages production build is `node scripts/prepare-informational-release.cjs --require-business-details`, output `dist-release`, production branch `main`. Root `index.html` is retained as protected legacy input, not today's public template.
- New isolated branch: `content/rsmcr-client-story-review-20261027` based on main `7176d82ded2d5ed7c7430f0cefbe763ea0aeb0c5`.
- New review page URL **if and only if separately approved and published**: `/client-stories/rsmcr-logistics/`.
- Adds a small client-story feature to generated Home and About pages, retaining the established dark teal/navy design, shared header/footers, routes, product guide, video and all existing billing/trial/Contact/verification safeguards.
- Site generation remains in `scripts/build-staged-site.cjs`; staged HTML for this route is committed for content/markup review and overwritten from the generator during a build. Existing public deployment is unchanged.

## Editorial decisions
The user supplied a four-page `Testimonial draft.docx`, containing a proof-page case study and a separate blog article. It proposed attributing a question to Sean and described the unreleased Dashboard as already used successfully by RSMCR. Those product adoption, efficiency, margin or measured-success claims are **not substantiated** and have been **omitted**.
The staged page instead describes completed/ongoing real client work: RSMCR Logistics' business website and visual branding, driver-payment spreadsheet improvements (agreed rate/drop bands), and continuing website maintenance. Sean's request is paraphrased without a quotation or individual attribution. No logo, person photo, client website screenshot, direct client's testimonial quotation, case-study metrics, or external client website link has been added. There is an explicit statement that the Dashboard is a **separate product undergoing launch testing**, not a delivered RSMCR system.
No duplicate blog article was created because a substantive courier pay-run checklist already exists on the published Resources site.

## Review gate before publication
The owner should obtain RSMCR's authorised contact's consent for naming/featuring the company and approve the exact text, then provide an approved logo and/or screenshots if desired. A genuine quotation may be added **only with exact approved wording and speaker attribution**. The existing RSMCR website domain/link should be checked before adding it, rather than guessing a public link.
The `noindex,nofollow,noarchive` staging markup and a draft review note remain until a separately approved release. The existing release builder automatically handles final canonical/SEO/sitemap if the branch is ever merged, but **NO merge or production deployment is authorised by this task**. New staging route count should be 11; public-output route count would become 14 only after a separate authorised build/release. Page-count-only assertions were updated without dropping privacy, forms, function hashes, link or sitemap checks.

## App/payment boundary
RSMCR **has not been shown to use Fashearn Labs Route Operations Dashboard v1.1**. No signup, paid Checkout, app source, Render disk, database, CI, Cloudflare project settings, Functions or provider content was changed. N2 FAIL_HOLD, G05–G12 HOLD and the disabled live paid CTA remain unaffected.

## Next single action
Owner visual/text review of the RSMCR client story and permission to use RSMCR name/images/quotation. Then separately decide whether to publish; no automatic public merge.
