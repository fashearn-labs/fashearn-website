# Website handover — 24 October 2026
## One meaningful step
Owner requested independent website development alongside the app chat: inspect authoritative sources, implement and verify safely on isolated work, no unapproved merge/publish/deploy. Chosen scope: mobile header and keyboard access of the already approved staging article. No wider restructure.

## Verified authority
- Website main: 066b14eed5001289cd9b4e56095f761811cebfd2.
- Approved article parent: 33d5b257be615ac3bc71d77b5e24d7ff03a023f2, branch content/courier-pay-run-article-20261021.
- Operating-plan WEBSITE-ROADMAP.md blob 3d7db3921444f3e820357715245b8106f34da1fc; AGENTS.md and active handover protocol reviewed. Article visual approval 79378fea1362c712247bed33e7c1625b410c7b93 inspected: positive owner design feedback only, not mobile/accessibility/publication acceptance.
- Website README and PROJECT-BASELINE reviewed. No app repositories modified.

## Changes
- At 320px, original header squeezed the brand and home link onto multiple text lines (observed screenshot); original page had no horizontal overflow in the five tested widths.
- Header items now wrap as whole items; brand text stays together and arrow mark cannot shrink. Home link has a 44px minimum height.
- Added first-focus Skip to article link and focusable main target. Existing dark teal theme, article cards, wording and product claims preserved.
- Article remains source-only staging with noindex,nofollow,noarchive. No canonical, sitemap, homepage/navigation integration, redirects, shared CSS/JS, forms, functions, guide/video, trial/Checkout or provider configuration changed.

## OBSERVED local verification
Executed locally on 24 October using bundled Node and Playwright with installed Microsoft Edge headless. HTML loaded with setContent; all browser network requests aborted. No hosted/provider/CI test.
- Baseline and revised layouts checked at viewport widths 320, 375, 620, 768, 1440 (height 900): document width equalled viewport and no visible element extended outside it, all five widths on both versions.
- Actual Tab: first focus is Skip to article; link rectangle visible inside viewport. Actual Enter: focus moves to main-content.
- 320px home target >=44px high; brand text remains one line.
- Exact article HTML and head metadata before style compared equal to approved source. Staging robots retained and canonical absent.
- Mobile 320px and desktop 1440px full-page screenshots inspected. Local harnesses check-article.cjs and verify-article.cjs executed successfully; retained in this session's work directory, not claimed as repository CI.

## Limits / next one
NOT RUN: Safari/Firefox, screen reader, full WCAG audit, hosted/Cloudflare preview, public SEO acceptance or deployment. Local setContent checks do not test real HTTP asset routing.
Next practical staged step: browser text enlargement/reflow and screen-reader/list semantics review of this same article; address only observed issues. Broader Resources index, homepage links, canonical/sitemap and release still require separate owner scope/release approval under roadmap.

## Protection
No merge, PR, publication, deployment, paid CI, purchases, external messages, app data/session/Audit/Pay Run/backup changes or app HOLD changes performed. Commit uses [CI Skip] to retain existing staging convention and suppress Pages builds; Cloudflare settings were not queried or changed, and no hosted deployment result is claimed. N2 FAIL_HOLD, G05–G12 HOLD and live paid Checkout/public paid CTA OFF remain the required boundaries.
