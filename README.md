# Fashearn Labs website

**CURRENT OWNER-APPROVED LIVE BASELINE — 1 November 2026**

- Production site: https://fashearn.io/
- GitHub source: `fashearn-labs/fashearn-website`, default branch `main`.
- Last owner-approved website functional/visual commit: **`953602077968c56af03a228c748f75b54a23d826`**. Cloudflare Pages reported **Deployed successfully** for that commit on 1 November 2026.
- **19 generated pages**. Home, Website Services, Custom Systems, Our Work, RouteOps Pilot, and both enquiry journeys were reviewed by the owner. No Contact menu item, no obsolete announcement strip, compact legal footer; header/footer share the transparent arrow-only brand mark.
- **Website enquiries:** `/website-enquiry/` → `POST /api/website-enquiry` (Turnstile + independent Make/Outlook path).
- **Dashboard pilot enquiries:** `/pilot-enquiry/` → `POST /api/trial` (original protected Turnstile + Make path). Old `/contact/` redirects here.
- **General enquiries and custom-system project discussions:** `info@fashearn.io` by email; do not use the Dashboard form for these.
- **Dashboard enrolment, paid Checkout and live billing remain OFF.** Website publication does not lift application safety/recovery/tenant HOLDs.

## Mandatory read-first references

1. **[Final owner-approved website handover, forms, assets and verification](docs/LIVE-WEBSITE-OWNER-APPROVAL-2026-11-01.md)** — authoritative current site state and asset-first policy.
2. [Project baseline / preservation rules](PROJECT-BASELINE.md).
3. Private `fashearn-labs/fashearn-labs-operating-plan/WEBSITE-ROADMAP.md` — cross-project priority and commercial follow-up.
4. Older [24 October published handover](docs/INFORMATIONAL-RELEASE-HANDOVER-2026-10-24.md), [commercial review](docs/COMMERCIAL-SERVICES-AND-PILOT-REVIEW-2026-11-01.md), and [early enquiry prep](docs/WEBSITE-ENQUIRIES-BACKEND-PRIVATE-2026-11-01.md) are **historical evidence**, not current release blockers or routes.

## Build / protections

Cloudflare Pages project `fashearn-website`: build command `node scripts/prepare-informational-release.cjs --require-business-details`; output directory **`dist-release`**. Keep project-root `functions/`, Cloudflare secrets, `release/baseline-manifest.json`, approved staging references and assets intact. Do not deploy root `index.html` or `staging/` directly.

Offline validation: `python scripts/check-informational-release.py` and `node scripts/check-protected-handlers.cjs` (plus website form checker when changing it). Existing validated screenshots are in `assets/` or `assets/images/` and must be reused/self-hosted. Upload owner-provided pictures to the repo, verify actual image paths and correct proportions; never rely on links to private image repositories. Preserve the 27-page guide, actual Route Operations Dashboard v1.1 images, and correct two-form routing.

**Preserve the fully approved website; new changes require a clear owner instruction.** Historical docs may describe the prior 13/14/15-page stage, but are superseded by the current handover.
