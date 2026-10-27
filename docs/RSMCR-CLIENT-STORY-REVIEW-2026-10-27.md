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

## Verification — 27 October
- Retrieved the **exact committed branch builder**, compiled it successfully with the V8 JavaScript parser (no execution of user site service).
- Executed the builder in a disposable **in-memory mock FS**, permitting only fake `node:fs` and `node:path` calls, with NO filesystem/provider/network writes; produced exactly **11 staged pages**, including the new client-story route. No exception.
- New page checks PASSED: exactly one H1, existing staging `noindex,nofollow,noarchive`, expected depth-two CSS/JS paths, no form, no Sean quotation, explicit denial of implied Dashboard adoption.
- Generated homepage and About both link to `/client-stories/rsmcr-logistics/` using proper relative paths. Generated page bytes **exactly match** committed `staging/company-site/client-stories/rsmcr-logistics/index.html` (6,490 characters).
- GitHub compare: five website-only changed paths (builder, staged page, two page-count check scripts and this note), ahead of baseline main by six commits, behind zero; main remains untouched.
- **NOT RUN:** full production Node release builder, Python website-check scripts, local browser/mobile visual comparison, Cloudflare Preview/production deployment or public SEO checks. The staged source is ready for **owner review**, not accepted for publication.
- `[skip ci]` included on every branch commit to retain prior no-auto-release staging convention; no CI or provider deployment was initiated by the assistant. Do not infer a Cloudflare preview exists.

## Owner review — 27 October 2026
Owner opened and inspected a browser-rendered standalone review preview of the staged RSMCR client-story page (desktop and mobile screenshots were supplied). Owner's exact response: **"Im happy with that. Its honest and looks good"**. Record this as **OWNER COPY AND VISUAL REVIEW APPROVED** for the existing staging page, **NOT publication authorisation**, external RSMCR consent, permission to use RSMCR imagery, any direct testimonial quote, client signoff or a live-website change. Preserve present accurate wording and current multi-page design. **Next owner/client dependency:** request RSMCR's authorised approval to feature company by name (and separately any logo, screenshot or approved verbatim testimonial). Keep branch isolated until that consent plus express publication approval. No new tests/CI/deploy/production change were requested or run as part of recording approval.

## RSMCR permission — owner-reported, 27 October 2026
Following owner approval of the RSMCR client-story page, the assistant identified RSMCR's permission to be featured as the remaining client dependency. The owner replied **"They already have"**, confirming **RSMCR has already granted permission to feature the company publicly**. Record this as **OWNER-REPORTED CLIENT PERMISSION** for naming/featuring RSMCR in the truthful client story, not a separately obtained written client statement or authorisation for any direct testimonial quote, client photos or logo. Do not ask the owner to obtain the same name/feature permission again. The staged text/design was already owner-approved. **Actual merge to main/public Cloudflare publication has not yet been expressly instructed**, and remains a distinct step; keep live website unchanged pending owner release instruction. Any additional imagery or quotation needs appropriate specific consent.

## Next single action
Owner copy/design review PASSED; client permission to be named/featured OWNER-REPORTED as already granted. Owner release/publication decision remains; no automatic public merge. Any logo, screenshot, or verbatim quotation requires its own specific approval.

## Publication authorisation — 27 October 2026
The owner explicitly approved publishing the previously visually reviewed, accurate RSMCR page in the existing company website, in response to the direct question “Shall I publish the RSMCR client story on fashearn.io now?” with **“yes please”**. Prior owner-confirmed RSMCR permission to be featured remains applicable. Publication authorisation covers ONLY the described factual client story, related Home/About links, necessary release build checks and GitHub/Cloudflare website rollout. **It does not authorise a direct testimonial quotation, unreviewed logo/images, an additional blog post, a Dashboard endorsement, app/Render/Stripe changes or enabling trial enrolment.** Merge is deliberately through a named pull request and the pre-existing Pages builder with its protected baseline checks; confirm public HTTP and record the outcome after merge.

