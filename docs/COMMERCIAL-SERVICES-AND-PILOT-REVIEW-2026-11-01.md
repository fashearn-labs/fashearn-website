> **HISTORICAL COPY REVIEW:** Later on 1 November the owner approved and deployed the final 19-page website and separate forms. Earlier NOT AUTHORISED FOR PUBLICATION statements remain as historical preparation context only. Current source, approved URLs, fees, asset rules, and release evidence: [final owner-approved handover](LIVE-WEBSITE-OWNER-APPROVAL-2026-11-01.md).

# Fashearn Labs — Website services + Route Operations private pilot
**1 November 2026 | PRIVATE COPY AND IMPLEMENTATION REVIEW | NOT AUTHORISED FOR PUBLICATION**

## Authority and scope
Owner asked us to continue preparing a commercial update to fashearn.io, making website-design services visible and explaining that Fashearn Labs Route Operations Dashboard v1.1 is currently **enquiry-led private pilot only**, not an open payment/subscription signup. This note prepares exact copy for a future website release. It **does not** authorise a merge to main, Pages deployment, Stripe live Checkout, new customer-data access, app release or bypass of the N2/G05–G12 holds.

Preserve the 14-page multi-page company site, original design, published RSMCR client story, approved guide and video, Cloudflare Turnstile, Make/Microsoft 365 enquiry path, 12-month unsuccessful-enquiry retention policy and static/Functions baseline. Website builder is `scripts/prepare-informational-release.cjs` using `staging/company-site/`, producing `dist-release`; production branch `main`. No installer is offered: Route Operations Dashboard is browser-based.

## Navigation and homepage
Add **Services** to primary navigation as a new /services/ route. Keep Dashboard, Features, Pricing, Resources, About, Guide and current user journeys. Add a short services panel near the top, without removing the existing Dashboard information.

**Section — Professional websites. Practical business solutions.**

Fashearn Labs designs and develops clean, modern, mobile-friendly websites for small businesses, alongside our work on practical software and automation.

Starting a business, or improving how yours looks online? We help you present your services clearly and give customers an easy way to contact you.

**Small Business Starter Website — £249 one-off.** One responsive page, up to five sections, using your approved text and images. Larger websites quoted individually.

**CTA:** Explore website services → /services/

**RouteOps homepage panel — Private pilot interest now open**

Fashearn Labs Route Operations Dashboard v1.1 is being prepared for a small, manually arranged private pilot with selected UK delivery subcontractors. You can enquire now; instant account creation, payment checkout and self-service subscriptions are not currently available.

**CTA:** Enquire about a private pilot → /contact/#enquiry

## New page: /services/
**SEO title:** Small Business Website Design & Development | Fashearn Labs
**Meta description:** Responsive small business websites from £249 by Fashearn Labs. Clear scope, mobile-friendly design, written communication, optional website care.

**H1:** Professional websites for small businesses

**Lead:** A modern, mobile-friendly website helps customers understand what you do and how to reach you. Fashearn Labs builds straightforward business websites with clear scope and practical handover.

**Package:** Small Business Starter Website — **£249 one-off**
- One static, responsive website page, up to five sections
- Client-supplied final text (up to approximately 600 words), logo and up to five images
- Clickable email, phone and supplied social links
- Basic page title, meta description, semantic structure and desktop/mobile checks
- One consolidated revision round after preview
- Simple customer-controlled static hosting setup and basic handover

**Larger projects:** Need extra pages, a different layout or special features? Tell us what you need. We assess the requirements and provide a separate written quote. Additional pages and complex work are **not** included in the £249 starter package.

**Optional Website Care — £49/month:** A monthly check that the website loads, HTTPS and key contact links work, plus up to 30 minutes of minor existing-page content updates from material you supply. Requests by email; nonurgent acknowledgement target within three UK working days. Unused time does not roll over. Monthly rolling; cancel before the next billing cycle. No 24/7 cover or guaranteed uptime.

**Our work:** We built and support the RSMCR Logistics business website and branding. Our own Fashearn Labs website is another example of responsive design. Link the existing factual /client-stories/rsmcr-logistics/ page. Do not imply that RSMCR uses Route Operations Dashboard. Do not invent client testimonials or use unapproved logo/images.

**The process:** Tell us what you need → we confirm scope and written quote → send us approved text and images → review a preview → one agreed revision → handover. Target around seven working days once the complete agreed inputs are provided; scheduling and exact delivery terms confirmed in writing.

**Important:** Domains, paid hosting, email accounts and third-party subscriptions are separate and remain under client control. The starter price excludes ecommerce, payments, booking systems, custom forms/backends, CMS, client logins, copywriting, logo creation, legal-policy drafting, advanced SEO and guaranteed search rankings.

**CTA:** Ask about a website → mailto:info@fashearn.io?subject=Small%20Business%20Website%20Enquiry

## Private pilot: public product, pricing and trial copy
Apply consistently to homepage, /route-operations-dashboard/, /pricing/, /trial/, /about/, /contact/ and relevant CTAs.

**H1 or highlighted heading:** Route Operations Dashboard v1.1 — Private Pilot

**Current status:** We are accepting enquiries from UK courier/delivery subcontractors interested in a limited, manually arranged private pilot. Applying does not guarantee immediate access or acceptance.

**Pilot steps:**
1. Send an enquiry through the existing Dashboard enquiry form, describing your business and approximate driver/carrier needs.
2. We review the enquiry and confirm whether a pilot place can be offered.
3. After approval and readiness checks, we manually arrange access and email the secure browser login instructions and unique setup key.
4. The business completes the first-time setup wizard and evaluates the Dashboard under agreed pilot terms.

**No download/installer:** This is a browser-based application. Do **not** promise an installer, automatic accounts or immediate onboarding. Never email credentials/keys until readiness and operator approval. Access and any operational-data use remain subject to security/recovery controls and individual release decision.

**Payment and subscription status:** There is no payment gateway or card collection on the website at present. Self-service Checkout is disabled. **Enquiring does not start a paid subscription or charge a card.** Planned future subscription is £99/month; pilot duration, any later trial billing, conversion and cancellation arrangements will be explained and agreed separately *before* any paid commitment. Avoid displaying the historical card-required instant 14-day subscription journey as if currently available.

**CTA:** Enquire about the private pilot → /contact/#enquiry

**RouteOps privacy:** The existing Dashboard enquiry form remains `POST /api/trial` with its established fields and Turnstile protections. Do not repurpose it for web-design enquiries, reconfigure protected Functions, or claim the form has been live-tested by sending actual submissions. Website-services enquiries use the company email separately.

## Implementation checklist (release-gated, NOT complete)
- [ ] Incorporate approved copy and /services/ page into the existing generated site without losing nav/footer/legacy anchors
- [ ] Keep Dashboard guide, video, RSMCR case study, original routes and static assets unchanged
- [ ] Replace or clearly distinguish historical card-required/14-day/self-serve wording on homepage, /pricing/, /trial/, product and About pages
- [ ] Preserve /contact/#enquiry and existing Turnstile/Make backend for Dashboard enquiries only; add no new form backend
- [ ] Review Privacy/Terms implications of new website-services email enquiries before publication
- [ ] Update sitemap, canonical/meta and appropriate lastmod for new/changed pages when publication is approved
- [ ] Offline build, existing protected-handler and local-link checks; desktop and mobile visual QA; no live data, checkout, or form submissions
- [ ] Review final actual page previews with owner; obtain **separate explicit owner approval** before merging/deploying
- [ ] After authorised release, verify HTTP pages, redirects, anchors and visible wording; rollback if unexpected

## Existing source and governing commercial choices
- `fashearn-labs/fashearn-labs-operating-plan/commercial/INCOME-FIRST-PLAN-2026-10-30.md`: owner-approved direct UK £249 starter / £49 optional care; platform-specific Upwork listing $349 approved (independent marketplace terms).
- `fashearn-website/PROJECT-BASELINE.md` and `docs/INFORMATIONAL-RELEASE-HANDOVER-2026-10-24.md`.
- `docs/RSMCR-CLIENT-STORY-REVIEW-2026-10-27.md`: factual client work and permission; no Dashboard endorsement.
