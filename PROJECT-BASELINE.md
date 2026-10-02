# Fashearn Labs — Project Baseline

**Updated:** 30 September 2026  
**Status:** Approved working baseline for continuation in future chats/sessions.

## Mandatory continuation rule

Before modifying established Fashearn Labs work, review this baseline, the current repository state, and relevant project notes.

**Previous approved work is the minimum baseline. Preserve proven work first; improve it only where there is a clear reason.**

Do not remove, simplify, rename, omit, or redesign an existing approved feature, workflow, document section, or public asset merely because a new session starts. If something is not broken, keep it. Improvements should be additive or deliberate and tested.

When a new chat/session begins:
1. Read this file and the current repository notes before making substantive changes.
2. Inspect the current build/source rather than reconstructing it from chat memory.
3. Identify the last approved baseline and preserve all established functionality.
4. Make the smallest safe change needed.
5. Test/review the result against the previous baseline.
6. Record significant changes in GitHub so the next session can continue without reconstructing history.

GitHub/repository records are the authoritative project continuity source. Chat memory and handover summaries are supporting context, not replacements for the repository baseline.

## Public product baseline

**Brand:** Fashearn Labs  
**Product:** Route Operations Dashboard  
**Current public version:** v1.1  
**Full public name:** Fashearn Labs Route Operations Dashboard v1.1

Do not introduce new public-facing `RouteOps` or `RouteOps Core` wording.

Legacy internal identifiers may remain where changing them would add technical risk without customer benefit, including internal environment variables, database/file names, CSS/classes, session keys, schema fields, historical Git records and repository names.

## Product capability baseline

The current product includes, among other established functions:
- Dashboard and daily operational overview
- Driver Management
- Daily Operations / Daily Worksheet
- Driver Pay
- Pay Run / Settlement Close
- Smart Import and Customer Onboarding
- File Mapping
- Controlled Carrier Import with Sandbox/Test flow
- Exception Centre and controlled exception review
- Controlled Recalculation
- Reports & Exports
- Carrier Performance
- Scenario Analysis
- Contract Comparison
- Company / Contract Profiles
- Carrier Management
- User Accounts / administration
- Settings and database backup/restore
- **Audit Trail**

**Audit Trail is an established product capability and must not be omitted from future product reviews, guides, screenshots/marketing audits, or feature inventories simply because a new session starts.**

## Public presentation baseline

The application public branding and final visual sweep were completed on 29 September 2026.

LinkedIn public branding was cleaned and the product gallery was refreshed using final application screenshots.

The website is live at `https://fashearn.io`.

The approved public downloadable guide is:

`assets/Fashearn_Labs_Route_Operations_Dashboard_v1.1_Web_Square_Guide.pdf`

The guide is a **27-page square-format professional web guide**. It was built from the previous detailed 26-page guide as the minimum quality/content baseline, corrected for current public branding and screenshots, and improved by adding the missing Audit Trail page.

Future guide revisions must begin from this approved detailed guide. Do not replace it with a shorter or simplified guide unless that is an explicit product decision.

## Working principle

> Baseline first. Preserve proven work. Review before modifying. Improve; do not accidentally regress.

For major milestones, a handover summary is still useful, but routine continuation should be possible from the repository baseline and current source without requiring a complete reconstruction of previous chats.

## Social and LinkedIn milestone — 30 September 2026

- LinkedIn approved and the Fashearn Labs **Route Operations Dashboard** product page was published successfully.
- Published product positioning: operations software for delivery contractors and multi-carrier operators, with driver pay, carrier reconciliation, exception control, reporting, profitability, controlled pay runs, carrier/contract checks, **Audit Trail**, operational reporting and commercial visibility.
- Public offer shown on LinkedIn: **14-day free trial · £99/month · no minimum term**.
- Intended roles shown: Operations Manager, Payroll Manager, Logistics Manager, Fleet Manager and Fleet Operations Manager.
- Product gallery uses current Route Operations Dashboard screenshots.
- Fashearn Labs X profile was refreshed to remove old public-facing RouteOps Core wording and use the current company positioning.
- New Fashearn Labs brand direction approved: retain the square upward-arrow mark; use a darker, more restrained teal/navy visual system and cleaner company wordmark.
- Brand reference asset added under assets as **Fashearn_Labs_Brand_Board_v1.0.png** and first company-introduction social artwork was saved for reuse.

This LinkedIn product publication and refreshed social identity are part of the approved public-presentation baseline. Do not regress to public-facing RouteOps/RouteOps Core branding.

## Commercial / publishing milestone — 30 September 2026

- New 44-second **Fashearn Labs Route Operations Dashboard v1.1 | Operations Overview** video completed using the approved 10-scene campaign sequence.
- Final Canva motion sequence: Zoom, Flow, Flow, Zoom, then Breathe across the remaining scenes, with 0.3-second dissolve transitions and soft background music.
- Video published publicly on YouTube and embedded on the website using the privacy-enhanced YouTube embed. Website duration copy was corrected from 42 seconds to 44 seconds.
- The same MP4 was published natively on the Fashearn Labs LinkedIn page and X profile.
- LinkedIn Product Page for **Route Operations Dashboard** remains published and approved.
- Public commercial offer remains **14-day free trial · £99/month · no minimum term**.
- ICO registration application has been submitted. An ICO contact security number has now been received by email; the number itself is deliberately **not stored in this public repository**. Final registration/reference confirmation remains pending.
- Current website trial CTA still leads to the legacy manual `/api/trial` enquiry form. The next commercial website task is to replace that manual request flow with the approved Stripe card-upfront 14-day trial flow, after verifying the legal-page/Stripe production prerequisites and preserving the existing website design.



## Card-first trial policy — 1 October 2026

The previous hold on developing the website trial journey has been deliberately superseded for sandbox/test development by the approved card-first commercial model.

Approved customer journey:
- 14-day free trial
- a valid payment method/card is required through Stripe Checkout before the trial starts
- £0 is charged at trial start
- after 14 days the subscription becomes £99 GBP/month unless cancelled
- the local trial clock starts only after a verified completed Stripe subscription Checkout
- email verification alone does not start the trial
- anonymous/unsecured persistent trials are not the approved commercial model

A controlled Stripe sandbox end-to-end test has verified this boundary. Website signup, Checkout-return and trial-success integration may therefore be built and tested in Stripe sandbox without waiting for final ICO confirmation.

This does NOT authorize live customer charging or production Stripe activation. Live activation still requires the remaining production/legal readiness checks and an explicit controlled decision. Preserve the existing public website design while integrating the new self-service journey.


## Public email-verification bridge verified — 2 October 2026

The sandbox email-verification bridge is now verified end to end on the public Fashearn Labs domain.

Verified controlled flow:
- hosted sandbox signup returned `verification_email_sent` with `trial_started=false`;
- verification email was received in a user-controlled test mailbox (mailbox address deliberately not recorded here);
- the email verification link entered `https://fashearn.io/verify?token=...`;
- Cloudflare Pages routed `GET /verify` to `functions/verify.js:onRequestGet`;
- the Pages Function handed the one-time token to the hosted Render sandbox verification endpoint;
- the Render sandbox accepted the token and returned the expected `email_verified` / `sandbox` / `stripe_checkout` / `checkout_started=false` contract;
- the public browser displayed the branded **Email verified** page stating that secure card setup is next and the 14-day trial has not started.

A Cloudflare Workers runtime incompatibility was isolated during testing: outbound `fetch()` with `redirect: "error"` raised a `TypeError` before the request reached Render. Commit `e61b23ee1a01984e463c86dbfa543e6697f73f39` changed this narrowly to `redirect: "manual"`. The commit deployed successfully to Cloudflare production and the subsequent public verification test passed.

Safe diagnostic logging added in commit `a80f6f6b7f09d1edf294f5ccda63f1e222209a9c` records only bounded failure category/upstream status information and does not deliberately log verification tokens, email addresses or secrets.

No live Stripe activation or paid-customer provisioning is authorized by this milestone. The next controlled boundary is sandbox Stripe Checkout after verified email. The existing homepage trial form remains the legacy Make/manual flow until the self-service chain is separately built and verified.


## Sandbox Checkout return wording correction — 2 October 2026

Controlled hosted sandbox Checkout returned to `trial/success.html`, but a read-only check of the exact hosted trial showed pending status, verified email and null trial dates. The prior static page incorrectly declared activation without server confirmation.

Source correction: `c7c0fb9f2a2395dc28eedacc68e675d0f0705918`.
- page title now says Trial confirmation pending;
- heading says Trial activation is awaiting confirmation;
- body states that return from Stripe Checkout does not confirm an active account;
- existing CSS/design, sandbox notice, subscription terms and home link preserved;
- no backend activation, manual database change or webhook shortcut added.

Source comparison confirmed the style block was unchanged. **Cloudflare Pages deployment and visible owner confirmation are pending**; do not call this a verified deployed milestone yet. This repository has no GitHub Actions workflow at this checkpoint.

Next checkpoint: Cloudflare Pages production deployment success, then visible page refresh/owner confirmation. Afterwards, separately review and test the existing Provisioner signature-verified Checkout webhook integration before connecting hosted sandbox event delivery. Keep the public signup form and live Stripe/Render boundaries unchanged.
