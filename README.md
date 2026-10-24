# Fashearn Labs website

The owner-approved informational company website is live at https://fashearn.io/ (24 October 2026). It presents Fashearn Labs as a business-workflow software company, with **Fashearn Labs Route Operations Dashboard v1.1** as its current courier/delivery product.

**Dashboard enrolment and paid Checkout remain closed.** Website publication does not change the separate app release HOLD.

## Source and build

Cloudflare Pages project: `fashearn-website`; production branch: `main`.

Build: `node scripts/prepare-informational-release.cjs --require-business-details`

Public output: `dist-release`. Keep project-root `functions/` and current production environment variables. Do not deploy the whole repository or `staging/` as the static output.

The release builder produces 13 pages from the reviewed staging source, adds the approved legal/contact details and notices, retains original assets and checks protected source against `release/baseline-manifest.json`. The original root `index.html` is retained as a baseline input; it is no longer the production output.

Checks: `python scripts/check-informational-release.py` and `node scripts/check-protected-handlers.cjs`.

[Published release handover and verification](docs/INFORMATIONAL-RELEASE-HANDOVER-2026-10-24.md)

## Product presentation

Preserve the full product name, approved 27-page User Guide, overview video and Audit Trail. The public guide is `assets/Fashearn_Labs_Route_Operations_Dashboard_v1.1_Web_Square_Guide.pdf`; keep the legacy PDF URL available.

The Privacy notice and enquiry-form notice describe requested enquiry follow-up only, Make and Microsoft 365, and the adopted 12-month retention policy for enquiries that do not become customers. Do not add visitors to general marketing lists without separately approved arrangements.

## Operating authority

The private `fashearn-labs/fashearn-labs-operating-plan` repository coordinates company priorities and the separate application release controls. Read its current handover, priorities and WEBSITE-ROADMAP before substantial further changes, together with direct owner instructions.

Earlier docs record historical preparation and holds; the published release handover above is the current website status.
