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

## Release gates — all still pending

1. Preserve the approved site design, and separately integrate the two
   **visually distinct** forms into the existing production builder on
   this private branch.
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
