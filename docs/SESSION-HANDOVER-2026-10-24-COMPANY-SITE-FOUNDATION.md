# Staged company site foundation — 24 October 2026
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

