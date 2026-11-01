> **HISTORICAL PREPARATION ONLY:** The newer owner-approved site has published the two distinct enquiry journeys. The prior claims below about an inactive unpublished website handler, `/contact/#enquiry`, and a 15-page build have been superseded. See [final live website status, form contracts and route map](LIVE-WEBSITE-OWNER-APPROVAL-2026-11-01.md). Do not mistake these historical release gates for current deployment status.

# Website Services Enquiries — private backend preparation
**1 November 2026 · Review branch only · NOT AUTHORISED FOR PUBLICATION**

Owner approved preparation of a separate secure website-enquiries backend on
`content/services-routeops-pilot-review-20261101`. This narrow approval
supersedes the earlier review note's prohibition on **preparing** a separate
form handler; it does not authorise connecting or activating it publicly.

## Prepared, not activated

- New Cloudflare Pages Function: `POST /api/website-enquiry` in
  `functions/api/website-enquiry.js`.
- Independent of the protected Route Operations handler `/api/trial`;
  no changes to existing RouteOps code, Make webhook, Stripe, site design,
  live customer information or production deployment.
- **Crucial release gate:** `scripts/prepare-informational-release.cjs`
  currently generates `_routes.json` with only `/api/trial` and `/verify`
  included. **Do not change this allowlist without separate approval.**
  The website form has not been linked to the new handler.
- The new Make scenario `Fashearn Labs - Website Enquiries` is saved but
  inactive. Its Outlook subject is `NEW WEBSITE ENQUIRY — [mapped company]`
  and Reply-To is mapped to the sender email. This is setup reported by
  owner, not end-to-end delivery confirmation.

## Submission contract

Accept a same-origin HTML form POST (multipart or URL-encoded) with:

| Field | Required | Limit |
| --- | --- | --- |
| `name` | Yes | 120 characters |
| `company` | Yes | 160 characters |
| `email` | Yes | 254 characters |
| `phone` | No | 60 characters |
| `message` | Yes | 4,000 characters |
| `cf-turnstile-response` | Yes | 2,048 characters |

The server validates and normalises fields; only the five enquiry fields
are forwarded to Make as JSON. It verifies Turnstile server-side first.
The Turnstile token, secret, webhook URL and API key are never included
in that JSON. The handler has no client-facing webhook URL and no logging
of enquiry data. It validates Make's HTTPS webhook host and rejects failed
security checks and unconfigured secrets.

Required **server-side environment-variable names** (values must NOT be
committed, pasted in chat or embedded in page source):

- `TURNSTILE_SECRET_KEY` — existing Cloudflare Turnstile secret, reused.
- `WEBSITE_ENQUIRY_MAKE_WEBHOOK_URL` — new Make webhook URL.
- `WEBSITE_ENQUIRY_MAKE_API_KEY` — secret created for new Make webhook.

The Make request uses the official `x-make-apikey` header and disables
redirect following. The legacy `MAKE_WEBHOOK_URL` remains untouched.

## Repeatable offline verification

Run `node scripts/check-website-enquiry-handler.cjs`. The test evaluates
the actual handler with mocked verification and webhook responses, including
input errors, missing secrets, unsafe destinations, Turnstile failure,
Make failure and successful fictional-field mapping.

Result at preparation: **PASS, 31 offline checks, 0 real external requests**.
No live submission, webhook test or Outlook delivery test was performed.

## Private form integration — prepared, not live

The existing static release builder now includes a separate `/services/` route,
with Website Services copy, the £249 starter offer and optional £49/month
care package. The new page keeps the approved Fashearn Labs theme and
links to the existing RSMCR client story. It has its **own** five-field
HTML enquiry form and Cloudflare Turnstile widget, with form action
`POST /api/website-enquiry`; `assets/website-enquiry-form.js` provides
accessible submission feedback without exposing Make secrets.

The existing Route Operations form remains on `/contact/#enquiry`,
targeting `POST /api/trial`. Header/footer navigation links to
`/services/` were prepared; the original homepage layout and RouteOps
dashboard imagery are otherwise preserved. This is a source-level
integration, not an import of the separate approved visual preview.

`scripts/check-informational-release.py` now expects **15** generated
pages and checks that each form routes to a distinct endpoint, includes
the correct fields, and that the new Pages Function remains **excluded**
from `_routes.json`. The preview source was syntax-checked, but a
full clean build, visual checks and Make delivery tests are still pending.
**No release, merge or deployment is authorised.**

## 1 November follow-up source inspection

- A local execution of `node scripts/check-website-enquiry-handler.cjs`
  returned **PASS (31 offline checks; zero external requests)**.
- Checked the generated Website Services page expression in isolation:
  **one** form, `/api/website-enquiry` action, required fields,
  separate Dashboard pilot link, and balanced `section`, `div`,
  `form`, `aside`, `h1`, `h2`, and `textarea` tags.
- Inspected staged stylesheet selectors for all 15 principal classes
  used by the new services layout, including mobile breakpoint rules.
- Confirmed the prepared release handler allowlist remains limited to
  `/api/trial` and `/verify`. New Make secrets have not been
  configured in Cloudflare and no email has been sent.
- **Not yet passed:** an actual clean full site build and browser
  comparison against the separately owner-approved private preview.
  Do not claim visual equivalence or publication readiness.

## Approved visual source recovered — design parity gate

The exact owner-approved standalone preview is available in the user's
personal Library as `Fashearn_Labs_Private_Website_Preview_Two_Enquiry_Forms.html`
(1 November 2026). It was recovered and reviewed **locally** without making
network submissions or changing the live website.

Browser checks of that exact artifact: Website Services, Website Enquiry,
Route Operations Pilot, and Pilot Enquiry screens render at **1440px desktop
and 390px mobile**; no horizontal overflow was observed at either width.
These checks confirm the original preview, NOT the new repository release.

**IMPORTANT: design mismatch remains.** The draft `/services/` page built
from the existing release builder is **not an exact copy** of the approved
preview. Do not describe it as visually approved or release-ready.
Preserve the approved preview's distinctive dark/mint styling, header,
spacing, cards, and service/pilot separation when integrating the actual
release pages. Final comparison and owner sign-off remain mandatory.

**Website form contract difference to reconcile:** The approved preview
has `name`, `email`, `company`, `project_type` (one-page, multi-page,
existing-site, unsure) and `project_details`; the new Make/Cloudflare
draft currently expects `name`, `company`, `email`, `phone`, `message`.
Preserve the approved visual form and securely transform validated
`project_type` and `project_details` into the Make `message` field,
with `phone` optional/blank, rather than silently changing the layout.
The original pilot form uses `name`, `email`, `company`, `drivers`,
`carriers` and remains on the protected `/api/trial` route.

The private builder now also includes a Website Services homepage panel
and site-wide navigation link on all staged routes, with offline assertion
coverage. Source syntax was checked after correcting a navigation-rule typo.
A full clean build and exact visual comparison of **generated release output**
remain pending.

## 1 November — approved design integration milestone

Private GitHub review branch now retains **exact source sections** from the
owner-approved standalone preview:

- `staging/company-site/assets/approved-commercial.css` (approved styling)
- `staging/company-site/approved-reference/` (original header, Home,
  Services, Pilot, Website Enquiry and Pilot Enquiry visual sections)
- Release builder prepares `/services/`, `/website-enquiry/` and
  `/private-pilot/` using the approved styling, copy, sections and header,
  with ordinary same-site links instead of prototype-only screen switching.
- Website Enquiry source has the approved fields `name`, `email`,
  `company`, `project_type` and `project_details`. The **server**
  validates the category and transforms it into the existing Make
  `message` field, preserving the five-field Outlook mapping with
  `phone=""`; no API keys or webhook URLs are exposed in browser code.
- Browser-side form feedback uses the existing approved in-form status area.
  The original Route Operations enquiry stays at `/contact/#enquiry`,
  using its unchanged protected handler `/api/trial`.
- The Cloudflare release route allowlist STILL excludes
  `/api/website-enquiry`; the new form is not available for live submissions.

**Checks completed (offline only):**
- 18 request-level checks against the actual website-enquiry handler,
  using mocked Turnstile and Make responses, zero external requests
- 44 generated commercial-page builder checks with read-only mock
  filesystem data: HTML, links, field names, Turnstile, approved CSS and
  balanced key tags
- Local adaptation of the original reference tested with Chromium at
  1440px and 390px for Services, Website Enquiry and Private Pilot:
  **6/6 viewport checks**, no horizontal overflow. These are focused
  visual checks, **not a complete clean build or production-hosted test**.

**Pending:** full generated-site clean build; protected-handler, sitemap,
navigation and all-legacy-page checks; review of the other existing pages
against the approved homepage/navigation; privacy/terms review; secure
Cloudflare server secret configuration; independent synthetic delivery
tests after owner approval; and separate publication approval.
Do not claim the entire website matches the standalone approved preview
yet, or merge this branch into `main`.

## Release gates — all still pending

1. Visually review the staged `/services/` page against the separately
   owner-approved design preview. Incorporate that exact design only after
   confirming that its protected assets and forms remain separate.
2. Review Website Services enquiry privacy/terms and consent wording,
   and verify the new form's Turnstile widget is appropriate.
3. Configure the new webhook URL and Make API key only through Cloudflare's
   protected environment-variable settings. If the generated key was lost
   from the user's clipboard, rotate/recreate it securely in Make rather
   than trying to retrieve it.
4. With explicit owner approval, add only `/api/website-enquiry` to the
   release allowlist after the final form and server-side secrets are ready.
5. Run existing protected-handler, build, navigation and mobile checks
   offline without changing `/api/trial`.
6. Obtain separate permission before synthetic end-to-end submissions to
   **each** Make scenario; confirm receipt in `info@fashearn.io`.
7. Obtain separate publication approval before merging to `main` or
   deploying. No payments or RouteOps pilot accounts are enabled here.

Reference: `docs/COMMERCIAL-SERVICES-AND-PILOT-REVIEW-2026-11-01.md`
and `PROJECT-BASELINE.md`.
