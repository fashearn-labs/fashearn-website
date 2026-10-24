# Staged company site — 24 October 2026
## Current checkpoint — agreed company and Dashboard wording applied (24 October 2026)
Owner approved the revised direction and corrected their earlier feedback: the concern was repeated CARD emphasis, not £0. The previous proposal to reduce £0 repetition is superseded; £0 copy was retained.

- Home/About and their metadata now position Fashearn Labs as building software to improve businesses' everyday workflows. Dashboard introductions identify Fashearn Labs Route Operations Dashboard v1.1 as the current courier-focused flagship. No additional service catalogue or invented company claims.
- Generic identifying “product” labels/CTAs now name Route Operations Dashboard; compact navigation/review selector says Dashboard.
- Card-required wording removed from general Home/Dashboard/About summaries and kept explicitly in Pricing and Trial information. Browsing screenshots, video, guide and resources remains unrestricted; no trial/Checkout activated.
- All £0 occurrences retained (source before/after count equal). Approved article body unchanged.
- OBSERVED node rebuild/review rebuild and python link/heading checker: ten pages, 194 internal links/anchors PASS, staging robots/no forms/no canonical preserved.
- OBSERVED CUA review checks: ten pages at 320/768/1440, 30 observations, zero document/element horizontal-overflow failures. Updated About screenshot visually inspected.
- Updated standalone outputs/Fashearn-Website-Review.html. Existing open copies need refresh/reopen. Only staged website/scripts/docs changed; production, app repos, provider/customer/Audit/Pay Run/session/backups unchanged. No merge/deploy/paid CI.
Next: consolidated owner review of updated draft. Legal/contact/enquiry migration and all release prerequisites in WEBSITE-RELEASE-INVENTORY remain outstanding. N2 FAIL_HOLD, G05–G12 HOLD and live paid Checkout/public CTA OFF remain.

## Earlier checkpoint — technical polish and feedback review
## Current checkpoint — technical polish and owner editorial feedback (24 October 2026)
Supersedes earlier next-step wording where applicable.
- OBSERVED before correction: standalone review Skip to content left keyboard focus on the link. Corrected review wrapper to focus the anchor target after scrolling. Actual Enter readback now MAIN#main-content.
- Resources previously had h1 -> h3 -> h2. Resource-card helper now allows h2 on Resources and keeps h3 under the homepage h2; typography preserved through resource-title class.
- python scripts/check-staged-site.py now also rejects skipped heading levels. Ten pages / 194 internal links and existing staging protections PASS.
- Actual local review checks for Home and Resources at 320/768/1440: six observations with no horizontal overflow. Card font sizes unchanged: 24px mobile, 27.2px tablet/desktop. Resources title h2; Home title h3.
- Approved article body retained exactly. No production/app/provider/merge/deployment changes.

### Owner clarification received during this pass
Owner noticed generic “product” wording, repeated “£0/pay nothing upfront” copy, and company-level About messaging restricted to couriers. Owner clarified that Fashearn Labs improves businesses' workflows generally; this particular Dashboard is courier-focused. They asked for review/thoughts before editorial changes.
These editorial changes have NOT been made in this technical checkpoint.
Recommended next editorial pass: company-level workflow/software positioning on Home/About; identify the current flagship as Fashearn Labs Route Operations Dashboard v1.1; use its name in identifying headings/cards/CTAs rather than vague “product”; retain concise navigation where needed; concentrate £0-at-start explanation in detailed pricing/trial terms rather than repeating throughout the site. Do not invent additional services, customer results or a generic agency offer.
Next: respond to owner's three observations and agree the editorial direction, then apply the wording as one coherent pass. Keep live Checkout/public paid CTA OFF, all app HOLD protections and publication approval requirements.

## Earlier checkpoint — core pages and review
## Current milestone — complete core page set (24 October 2026)
This section supersedes the earlier next-step paragraphs below. Owner requested continuing the complete build before a single consolidated review; their noticed design/editorial items are intentionally deferred for that review.

### Implemented
- Ten staged pages: Home, Product, Features, Pricing, Courier & Delivery, Resources, About, Contact, Trial information and approved checklist.
- Added Courier & Delivery with established operational review flow, real product imagery and links to features, video/guide and article. No invented case studies, customer outcomes or unimplemented service claims.
- Added Contact using only the existing current website enquiry route and company LinkedIn link, both verified in root source. New preview collects no enquiry information; no backend copied or modified.
- Added information-only Trial page explaining planned verified-email/card/activation flow and intended 14-day/£99 offer. No enrolment or Checkout action enabled.
- Added scripts/build-review-preview.cjs, producing outputs/Fashearn-Website-Review.html: all ten pages and shared CSS embedded in one review file, with a page selector and normal internal navigation. Public screenshots, video and guide still require internet.
- Home now links the courier use case. All pages share a grouped Product/Explore/Company footer including Contact and Trial information.
- Added docs/WEBSITE-RELEASE-INVENTORY-2026-10-24.md for confirmed contact/trial facts and the unresolved legal, privacy, consent, migration and release evidence. No fake policy pages.
- Root live #trial enquiry link is an interim staged contact route; it MUST be preserved/remapped before replacing root homepage. This is explicitly recorded as a release dependency.

### OBSERVED verification
- node scripts/build-staged-site.cjs generated ten staged pages.
- python scripts/check-staged-site.py: PASS, ten pages and 194 internal relative links/anchors; unique ids, one h1 each, staging robots, no forms/canonical.
- CUA local browser: all ten pages at 320x900, 768x900, 1440x900, 30 observations with no document/main/header/footer-element horizontal overflow and one h1 each. Source output retained locally as work/complete-layout-results.json.
- Desktop/mobile Courier, Contact and Trial screenshots and grouped mobile footer visually inspected. Actual footer Contact -> Trial information navigation verified.
- Existing approved article body preserved exactly against the earlier GitHub source. Product guide/video/screenshots retained.
- Standalone review tested via local HTTP: normal Home -> Features navigation updated the selected page; all ten page-selector options rendered the expected h1. A first overly broad heading selector was corrected to h1 before the successful complete ten-page check. Direct file-URL execution was not separately tested.
- No live form submission, provider test, paid CI, app change, merge or deployment performed.

### Current next step
Core design draft is ready for ONE consolidated owner review, including the items the owner already noticed. Resolve that list as a coherent polish pass. Before any public release, complete the source-based legal/contact/privacy and enquiry migration dependencies in the release inventory and separately approve release. No claim of complete WCAG/screen-reader/cross-browser, hosted signup/payment, legal, SEO migration or release acceptance.
N2 FAIL_HOLD, G05–G12 HOLD, live paid Checkout/public CTA OFF and all app/customer/session/Audit/Pay Run/backup protections unchanged.

## Earlier milestone — Features, Pricing and About
## Current milestone — Features, Pricing and About (24 October 2026)
This section supersedes the foundation's earlier next-step paragraph below. Owner accepted the foundation and replied “okay” to the proposed next three pages.

### Implemented
- Added features/, pricing/ and about/ within the isolated staging/company-site/ tree.
- Shared navigation/footer now links Product, Features, Pricing, Resources, About and the existing approved User Guide. Brand link returns Home.
- Features groups established workflows into daily records/imports, driver pay/exceptions/pay-run review, reports/carrier/contract visibility, and user access/Audit Trail.
- Pricing describes the intended £99/month subscription after a 14-day card-required trial, £0 initially, cancellation before the end to avoid recurrence, and no minimum term. It clearly says enrolment/Checkout are disabled. Six native HTML details/summary FAQs work without JavaScript.
- About uses verified company/product positioning only. No invented founder biography, team size, customers, measured outcomes, business address, certifications or new service claims.
- Narrow-screen navigation uses a two-row layout. Observed 320px Guide-arrow wrapping was corrected by shortening its visible label to “Guide ↗” while retaining accessible name “User Guide PDF”.
- Existing approved article body, product screenshots/video/guide, production root/form/functions/trial and SEO source remain preserved.

### OBSERVED verification
- Rebuilt seven HTML pages with node scripts/build-staged-site.cjs.
- python scripts/check-staged-site.py: PASS, seven pages, 113 internal relative links/anchors resolve, unique ids and one h1 per page, staging noindex/nofollow/noarchive, no forms/canonical.
- Actual CUA browser navigation from Features to Pricing and Pricing to About succeeded.
- Keyboard Enter opened each of the six pricing FAQ summaries; readback showed all six expanded.
- Seven pages at 320x900, 768x900 and 1440x900: 21 DOM layout observations, each one h1 with no document or main/header/footer-element horizontal overflow.
- Desktop Features/Pricing and mobile Pricing/About screenshots visually inspected. After the compact Guide correction, actual 320px readback showed “Guide ↗”, 83px wide and 44px high, one line.
- Browser output retained locally as work/expanded-layout-results.json; screenshots in local outputs/. No hosted deployment, paid CI or provider tests.

### Limits and next work
This remains a staged design review, not publication or full browser/accessibility acceptance. Full WCAG/screen-reader, text enlargement, Firefox/Safari, production SEO, legal, signup/payment and provider acceptance NOT RUN in this step.
Next meaningful work: Courier & Delivery use-case page and an evidence-based contact/trust content inventory before any release plan. Contact channels, legal entity/registration details, privacy/terms and cancellation controls must be verified rather than fabricated.
Same isolated design branch, no main merge/publication/deployment. N2 FAIL_HOLD, G05–G12 HOLD and live paid Checkout/public CTA OFF unchanged. App repos/data/backups/sessions untouched.

## Earlier milestone — initial four-page foundation
## Owner scope and boundary
Owner reviewed the previous article work, then explicitly instructed: “Yes, I've looked at the GitHub repo on what you said, and it's fine. Yeah, continue. Let's start building this site the way we want it.”
This authorizes the next isolated staged website build. The original instruction still prohibits unapproved merge, publication and deployment. It does not establish buyer demand or authorize new services, paid CTA, app changes or production migration. No Sites project or new hosting was provisioned.

## Authority inspected
- Fresh website main remained 066b14eed5001289cd9b4e56095f761811cebfd2.
- Parent for this branch: staged article work 0dd7e52a61d137442228d007a5bd1ca0d4981b41, itself based on approved article 33d5b257 and visual approval operating-plan 79378fea.
- WEBSITE-ROADMAP.md re-read, blob 3d7db3921444f3e820357715245b8106f34da1fc. Existing operating AGENTS/active handover and website baseline/README reviewed earlier in this chat.
- Live https://fashearn.io actually opened in the browser and visually inspected this step. Product screenshot, video URL, three workflow screenshots and guide source identified in current index.html. Live is still a single product landing page with manual trial enquiry, not the new staged structure.

## Implemented meaningful milestone
Four linked static pages under staging/company-site/, leaving root production files unchanged:
1. Home: company-level introduction, product positioning, operational workflow, planned subscription and first resource.
2. route-operations-dashboard/: detailed flagship product, ten established capability areas including Audit Trail, approved 44-second privacy-enhanced YouTube embed, three real workflow screenshots and approved square User Guide.
3. resources/: first resource entry and route back to the product.
4. resources/courier-driver-pay-run-checklist/: exact approved article body within shared site header/footer.
Shared dark teal/navy styling, green-to-blue headline accent, arrow mark, responsive navigation/footer and skip-to-main keyboard access. Product presentation evolves the existing theme.
Corrected staged guide references to 27 pages per approved baseline; live page's old 26-page wording is not edited.
Reusable source: scripts/build-staged-site.cjs. Build writes only staged HTML; CSS is staging/company-site/assets/site.css.
No placeholder/dead navigation for future Features/Pricing/About pages. These are next staged additions, not claimed complete.
Planned subscription remains £99/month after a 14-day card-required trial, £0 initially, unless cancelled. No working trial/Checkout CTA, form, provider integration or invented service claims.

## OBSERVED verification
- Local python static HTTP server returned HTTP 200 for homepage.
- Actual browser navigation Home -> Product, Resources -> checklist succeeded.
- CUA browser DOM layout checks: all four pages at 320x900, 768x900 and 1440x900 (12 page/viewport combinations); one h1 each, no horizontal document overflow or main/header/footer element overflow. Client widths 305/753/1425 reflect scrollbar. Output saved session-locally at work/layout-results.json.
- Mobile homepage and checklist, desktop homepage/product screenshots visually inspected.
- Keyboard Tab focused visible Skip to content; Return moved focus to main-content.
- Product hero and all three workflow images read complete with naturalWidth > 0. Existing YouTube player appeared with Play control; video playback was not tested.
- python scripts/check-staged-site.py: PASS, four pages, 40 relative links/anchors resolve, unique ids, one h1, noindex/nofollow/noarchive on every staged page, no forms or canonical.
- GitHub file readback and scope comparison must be checked after commit; do not infer deployment from a commit.

## NOT RUN / release limits
Full WCAG/screen-reader acceptance, Firefox/Safari, enlarged-text audit, real enquiry/verification/Checkout flow, production legal review, SEO migration, redirects and public release acceptance NOT RUN. Existing remote public screenshots and guide/video URLs are reused; assets were not rewritten or republished.
All new pages are deliberately noindex,nofollow,noarchive, without canonical/SEO schema or sitemap integration. Root homepage, shared production assets, sitemap/robots, functions, trial files, approved guide/video and existing staged article remain unchanged.
Commit retains [CI Skip] convention. No provider deployment or CI requested; provider configuration not queried or altered. No deployment result claimed.

## Next meaningful step
Owner review of the staged homepage/product/resource direction, then build dedicated Features, Pricing and About pages from established content. Keep manual enquiry/security migration and future launch/SEO release as separate protected work.
N2 FAIL_HOLD, G05–G12 HOLD, live £99 Checkout/public paid CTA OFF unchanged. No app repository, data, Audit, Pay Run, session, backup, provider or customer state touched.

