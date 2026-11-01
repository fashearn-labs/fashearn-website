# Fashearn Labs website — final owner-approved release handover

**Status: LIVE / OWNER APPROVED — 1 November 2026.**  
**Website source baseline:** `fashearn-labs/fashearn-website` `main` at `953602077968c56af03a228c748f75b54a23d826` (before this documentation-only commit).  
**Public website:** https://fashearn.io/ — Cloudflare Pages `fashearn-website`, production branch `main`, build output `dist-release`.  
**Verification:** Existing offline build/route/asset/handler checks passed and Cloudflare Pages reported **Deployed successfully** for that exact SHA on 1 November, 18:03 UTC. Owner visually reviewed and approved the finished website. These are not claims of independently replaying every live form submission.

## Mandatory start point / freeze

This file supersedes earlier *working-draft status* in the 24 October release notes and the early-1-November commercial/enquiry preparation notes. Read this, `README.md`, `PROJECT-BASELINE.md`, the current release builder/tests, and `fashearn-labs/fashearn-labs-operating-plan/WEBSITE-ROADMAP.md` before making website changes.

The owner approved **Home, Website Services, Custom Systems, Our Work, RouteOps Pilot**, the dedicated enquiry routes, header/footer branding, footer disclosure, navigation and removal of the top announcement strip. **Preserve the approved pages.** No new redesign, copy edits, asset replacement, form/routing changes, DNS, charges, or app release without a new owner instruction. Never modify RouteOps application repos or unlock N2/G05–G12 merely because the marketing site is live.

Final reviewed source sequence:
- `9c7591d`: Home two matching translucent work cards and complete RSMCR screenshot;
- `703c91c`: Custom Systems dashboard screenshot correct aspect ratio;
- `6af24e4`: Our Work RSMCR screenshot replaces broken private repository image;
- `039469e`: remove general Contact menu, separate pilot enquiry, 301 redirect from old Contact, compact legal footer;
- `9536020`: remove redundant announcement strip on all pages.

## Public visitor map (different offers; different enquiry paths)

| Place/page | Purpose and action | Form destination |
| --- | --- | --- |
| `/` Home | Overview; links to Websites, Custom Systems, Our Work, RouteOps Pilot; selected work cards | Sends users to the relevant offer/enquiry path; **no general-purpose form on Home** |
| `/services/` Websites | UK one-page Starter Website **£249**, optional care **£49/month**, written scope/exclusions | CTA leads to `/website-enquiry/` |
| `/website-enquiry/` | Dedicated website service enquiries, approved dark/mint design | **POST `/api/website-enquiry`** |
| `/custom-systems/` | Tailored dashboards, internal tools, reporting and automation | **Email link** to `info@fashearn.io` with custom-systems subject; no custom-system backend form |
| `/our-work/` | Delivered RSMCR website/branding and separate in-house Dashboard v1.1 | Client story `/client-stories/rsmcr-logistics/`; website enquiry `/website-enquiry/`; RouteOps to `/private-pilot/`; custom-systems by email |
| `/private-pilot/` | Route Operations Dashboard v1.1 preview, guide, video, screenshots, limited enquiry-only pilot | CTA leads to `/pilot-enquiry/#enquiry` |
| `/pilot-enquiry/` | Dedicated RouteOps pilot interest form; not a customer login or checkout | **POST `/api/trial`**, existing protected handler |
| `/contact/` | **Retired** old mixed-design page | 301 redirects to `/pilot-enquiry/`; do not restore the old Contact menu |
| Older content pages | `/route-operations-dashboard/`, `/features/`, `/pricing/`, `/resources/`, `/about/`, `/trial/`, `/courier-delivery-operations/`, factual RSMCR story, privacy/cookies/terms, article | Relevant links refer to the existing approved routes; preserve resources |
| General questions | Footer email | `mailto:info@fashearn.io` |

The navigation on approved commercial pages is **Home · Websites · Custom Systems · Our Work · RouteOps Pilot**. There is no Contact item and no top announcement bar. Older legacy page layouts are retained where intentionally separate; do not assume every page should be redesigned.

## Form details — source and protection

**Website enquiry**, `/website-enquiry/`:
- Approved form source: `staging/company-site/approved-reference/website-enquiry.html`; release-builder wiring in `scripts/prepare-informational-release.cjs`.
- Fields: `name`, `email`, `company`, `project_type` (one-page / multi-page / existing-site / unsure), `project_details`, Turnstile token. Website only; **no drivers/carriers fields**.
- Browser script: `assets/website-enquiry-form.js`; status message on success: “Thank you. Your website enquiry has been received. We will reply by email.” Failures direct users to retry or email.
- Cloudflare Function: `functions/api/website-enquiry.js` on `POST /api/website-enquiry`. Validates fields and project type/lengths, verifies Turnstile server-side and sends an approved payload to a **separate Make scenario** via HTTPS with server-side API-key header. Its server-side variables are named `TURNSTILE_SECRET_KEY`, `WEBSITE_ENQUIRY_MAKE_WEBHOOK_URL`, `WEBSITE_ENQUIRY_MAKE_API_KEY`. It transforms selected project category/details into a message for the Make/Outlook mapping. **Never put values of secrets in GitHub, docs, client JS, or chat.**

**RouteOps private pilot enquiry**, `/pilot-enquiry/#enquiry`:
- Visual reference `staging/company-site/approved-reference/pilot-enquiry.html`, but the release builder **replaces the preview form with the established protected form**. Do not mistakenly publish the inert `action="#"` preview form.
- Actual released form ID `form01`; fields `name`, `company`, `email`, `drivers`, `carriers`, Turnstile token. No payment/card fields, no immediate application access.
- Browser script: `assets/trial-form.js`, **adapted by the release builder** to use accessible status feedback and a generic reply-by-email confirmation (rather than promising that a trial starts). The repository's baseline JS source alone is not the exact generated production copy.
- Existing Cloudflare Function: `functions/api/trial.js` on `POST /api/trial`, server-side Turnstile verification and `MAKE_WEBHOOK_URL` forwarding. Keep this original function/baseline protected. Pilot enquiries are reviewed manually; access and setup key only if separately approved and safe. The public website does not create a tenant, start a trial or charge a card.

**Runtime/forwarding:** `_routes.json` allows only `/api/trial`, `/verify`, `/api/website-enquiry`; Cloudflare Pages Functions are not generic page files. Make workflows deliver enquiries into the company Microsoft 365 / `info@fashearn.io` process. The owner reported a successful website-form message and a Make execution during setup; offline tests exercised mocked handlers. Do not claim a fresh end-to-end delivery/inbox audit without checking it. General contact and custom-system enquiries use email. Retention for unsuccessful enquiries follows the documented 12-month policy; automated mailbox deletion is **not confirmed**.

**Safety:** Never merge the website and RouteOps forms, publish webhook URLs, remove Turnstile, make live test submissions without specific approval, enable live Checkout, or infer guaranteed delivery from client success text alone. No driver records or customer operational data enter the public form in this release.

## Asset-first rule — mandatory for future page, client-portfolio, and marketplace edits

**Always inspect existing repository assets FIRST, upload/commit supplied pictures into a suitable self-hosted `assets/` or `assets/images/` path, reference that deployed asset from the page, and verify it renders.** Do not guess a file path, create a fake preview image, use a remote private GitHub `raw.githubusercontent.com` image as the public source, or replace an actual product screenshot with a blurry/generated approximation. Ask for the original image only if it truly is absent. Verify image dimensions, aspect ratio, file hash/source, alt text, desktop/mobile sizing, and actual public loading. Use `object-fit:contain` where the full screenshot is required, and avoid any stretched `height` overrides. Use scoped CSS; avoid global changes to approved pages. For any image supplied in chat, upload it into GitHub **before** referring to it from HTML, and ensure the release builder copies it to `dist-release`.

Known source assets:
- `assets/images/fashearn-arrow.svg`: transparent arrow-only company mark for **both header and footer on all generated pages**, retaining FASHEARN LABS / INTELLIGENT SYSTEMS text. `assets/images/favicon.png` and `apple-touch-icon.png` are **not** substitutes for the header arrow (apple-touch artwork has a square frame).
- `assets/images/rsmcr-homepage-full.avif`: **full original owner-supplied RSMCR homepage screenshot**, self-hosted for Home + Our Work cards; `assets/images/rsmcr-homepage-card.avif` is an older crop, retained only for historical compatibility, not the current approved display.
- `assets/routeops-dashboard-v1.1.png`: actual Route Operations Dashboard v1.1 screen, approved for Home / Custom Systems / Our Work / pilot; correct proportions, no stretching.
- `assets/Fashearn_Labs_Route_Operations_Dashboard_v1.1_Web_Square_Guide.pdf`: approved 27-page user guide. Keep legacy PDF route working.
- Pilot workflow screenshots `routeops-pay-run-v1.1.webp`, `routeops-exception-centre-v1.1.webp`, `routeops-reports-exports-v1.1.webp` are used by the release workflow, with actual asset references in approved pilot section. When changing them, first audit current source and where the build obtains the files, then upload and self-host any replacements; do not assume they're in the top-level `assets/` tree.
- Review authoritative references: `staging/company-site/approved-reference/{header,home,services,systems,work,pilot,website-enquiry,pilot-enquiry}.html` and `staging/company-site/assets/approved-commercial.css`. Some staged preview form controls are **not** direct deployment artifacts.

**Why this rule exists:** Public RSMCR panel previously displayed broken-alt text because it linked into a private repository. Another iteration cropped the screenshot and lacked matching translucent card styling. Both were fixed and explicitly owner-approved after live review. Likewise, stretched RouteOps imagery required scoped natural-proportions CSS. Avoid repeating those regressions.

## Build, validation, deployment and approval boundaries

- Source: GitHub `main`. Production Cloudflare command: `node scripts/prepare-informational-release.cjs --require-business-details`; output `dist-release` (**not** raw root `index.html` or the staging preview). The build starts from `scripts/build-staged-site.cjs` and protected baseline `release/baseline-manifest.json`.
- Existing checks: `python scripts/check-informational-release.py`, `node scripts/check-protected-handlers.cjs`, and website-enquiry-specific offline checker as applicable. Production check for `9536020`: **19 generated pages, offline workflow success, Cloudflare deployment success**.
- Website legal disclosure is one small responsive footer line (trading name, address, email); Privacy, Cookies and Terms links remain. Do not remove legal details merely for aesthetics.
- Previous `/contact/` URLs have an explicit `_redirects` 301 to `/pilot-enquiry/`; preserved homepage historical anchors route to the new pilot enquiry where appropriate.
- Website commercial pricing: direct **£249** one-page Starter Website + optional **£49/month** care. Marketplaces have their **own** package/currency/pricing and platform payment rules; do not casually conflate.
- **Important restriction:** RouteOps app Render hosting, provisioning, recovery and tenant/security gates remain distinct. N2 FAIL_HOLD / G05–G12 HOLD; LIVE Stripe Checkout OFF; enquiries are **not** active paid onboarding.
- User does **not code**. Assistant should inspect GitHub, supply the fix itself, verify/test then deploy only with owner authorisation, one meaningful step at a time. Avoid broken temporary HTML preview links, repeated tests or unnecessary prompts. Owner final sign-off is on the public live website, page-by-page.
