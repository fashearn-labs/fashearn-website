# Fashearn Labs website privacy notice — working draft
**Prepared 24 October 2026. NOT APPROVED FOR PUBLICATION.**
This internal draft is for website visitors and product enquiries. It does not establish the separate data-protection arrangements for customer/driver data inside the Route Operations Dashboard.

Bracketed items are unresolved facts or decisions. Do not publish them or turn them into assumed promises.

## Draft notice
### Who we are
Fashearn Labs is the trading name of **[CONFIRM LEGAL PERSON / ENTITY]**.
**[CONFIRM CONTACT DETAILS TO PUBLISH]**.
For questions about how we use personal information, contact **[CONFIRM PRIVACY EMAIL]**.

### Information you provide
When you use our website enquiry form, we ask for your name, company, email address, approximate number of drivers and the carriers your operation uses.

If you contact us directly, we receive the information you include in that communication.

### Why we use your information
We use enquiry information to understand your request and respond to you about Fashearn Labs Route Operations Dashboard v1.1.
**[CONFIRM OTHER ACTUAL USES, IF ANY; DO NOT ASSUME MARKETING SUBSCRIPTION.]**

Our lawful basis for each use is **[CONFIRM BASIS AND EXPLANATION BEFORE PUBLICATION]**.

### Website operation and service providers
The website uses external services for hosting, enquiry security and content. Some pages include an embedded YouTube video and images hosted through GitHub.

**[FINALISE ACTIVE RECIPIENTS/PROCESSOR ROLES: source identifies Cloudflare Pages/Turnstile and a Make webhook setting. Confirm actual onward integrations, mailboxes, spreadsheets and access before describing this as the complete recipient list.]**

**[CONFIRM WHAT TECHNICAL/SECURITY INFORMATION IS HANDLED, BY WHOM, AND FOR WHAT PURPOSE; SOURCE EXPLICITLY PASSES THE VISITOR IP ADDRESS TO TURNSTILE VERIFICATION.]**

### International handling
**[CONFIRM RELEVANT DATA LOCATIONS, ANY INTERNATIONAL TRANSFERS AND APPLICABLE SAFEGUARDS. DO NOT CLAIM UK-ONLY STORAGE.]**

### How long we keep information
**[CONFIRM ACTUAL RETENTION PERIODS OR MEANINGFUL RETENTION CRITERIA FOR ENQUIRIES/CORRESPONDENCE, AUTOMATION HISTORY, EMAIL/SPREADSHEETS AND RELEVANT LOGS.]**

### Cookies and embedded content
**[COMPLETE AFTER CHECKING ACTUAL COOKIES/STORAGE AND EMBED BEHAVIOUR. DO NOT CLAIM NO COOKIES OR THAT PRIVACY-ENHANCED YOUTUBE AUTOMATICALLY REMOVES CONSENT REQUIREMENTS.]**

### Your information rights
Depending on the circumstances and our lawful basis, you may have rights to access your personal information, ask for correction or deletion, restrict or object to its use, and obtain certain information in a portable form. Where we rely on consent, you can withdraw it.

Contact **[CONFIRM PRIVACY EMAIL]** to ask about your information or exercise your rights. You can also raise a concern with the Information Commissioner's Office at https://ico.org.uk/make-a-complaint/ .

**[RECHECK FINAL RIGHTS/COMPLAINT WORDING AGAINST THE SELECTED BASES AND CURRENT GUIDANCE.]**

### Changes
**[INSERT FINAL EFFECTIVE DATE AND CONFIRM HOW MATERIAL CHANGES WILL BE COMMUNICATED.]**

## Evidence and decisions for the editor
| Item | Observed source / remaining decision |
| --- | --- |
| Website form payload | functions/api/trial.js blob 15790e097ffb92f97c4461cae412186ec4b85297: name/company/email/drivers/carriers |
| Security | Same source verifies cf-turnstile-response and explicitly supplies CF-Connecting-IP as remoteip. Secret values were not read. |
| Forwarding | Same source posts payload to MAKE_WEBHOOK_URL. Environment value, actual Make scenario and onward destinations not read. |
| Existing contact candidate | assets/trial-form.js blob b21737c3f7127de941cb95050fd173fefdce9744 displays info@fashearn.io on failure. Owner must confirm privacy inbox responsibility. |
| Existing form UI | Root index form01; /api/trial; external Turnstile script; no submission performed. |
| Video/images | Existing YouTube privacy-enhanced embed; GitHub-hosted screenshots. Cookies, storage, provider retention and transfer safeguards not audited. |
| Legal identity/retention | Owner questions pending. No period, company registration, address or legal entity invented. |
| Lawful basis | Must be selected from the actual purposes and relationships; draft does not declare consent/contract/legitimate interests as an established fact. |
| Marketing | No unsupported promise of opt-in, no marketing, no sharing/sale or no analytics added. Confirm actual practice. |
| Customer app data | Outside this website-only draft. No app source/runtime/data changed. |

## Guidance consulted on 24 October 2026
- ICO, Right to be informed: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/
- ICO, How to write a privacy notice: https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/how-to-write-a-privacy-notice-and-what-goes-in-it/
- ICO, Create your own privacy notice (sector tools updated July 2026): https://ico.org.uk/create-your-own-privacy-notice
- ICO, Cookies: https://ico.org.uk/Global/cookies

The ICO flags some guidance as under review following the Data (Use and Access) Act. Recheck the final notice against current guidance after the actual facts are confirmed.

## Integration when finalised
Create /privacy/ in the isolated staged build only after factual gaps are resolved; add footer and a short enquiry-form notice/link. A footer link alone does not replace making privacy information available when data is collected. Review actual cookie/embedded-content behaviour separately. No public policy page, consent mechanism or production enquiry change is authorized by this internal draft.
