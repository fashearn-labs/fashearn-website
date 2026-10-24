# Fashearn Labs website privacy notice — working draft
**Prepared 24 October 2026. NOT APPROVED FOR PUBLICATION.**
This internal draft is for website visitors and product enquiries. It does not establish the separate data-protection arrangements for customer/driver data inside the Route Operations Dashboard.

Bracketed items are unresolved facts or decisions. Do not publish them or turn them into assumed promises.

## Draft notice
### Who we are
Fashearn Labs is the trading name of **Harminder Singh Sekhon**, a sole trader responsible for the personal information described in this notice.

For questions about how Fashearn Labs uses personal information, contact **info@fashearn.io**.

### Information you provide
When you use our website enquiry form, we ask for your name, company, email address, approximate number of drivers and the carriers your operation uses.

Website enquiries arrive in the **info@fashearn.io** email inbox. If you contact us directly, we receive the information you include in that communication.

### Why we use your information
We use enquiry information to understand your request and respond to you about Fashearn Labs Route Operations Dashboard v1.1.
**[CONFIRM OTHER ACTUAL USES, IF ANY; DO NOT ASSUME MARKETING SUBSCRIPTION.]**

Our lawful basis for each use is **[CONFIRM BASIS AND EXPLANATION BEFORE PUBLICATION]**.

### Website operation and service providers
The website uses external services for hosting, enquiry security and content. Some pages include an embedded YouTube video and images hosted through GitHub.

We use **Microsoft 365** to store enquiry emails in the **info@fashearn.io** inbox. The website source also identifies **Cloudflare Pages** for hosting, **Cloudflare Turnstile** for spam protection, and a **Make webhook** for enquiry routing.

The owner-provided scenario diagram shows a custom webhook connected directly to Microsoft 365 Email (Outlook), using Send an Email.

**[Confirm service/transfer arrangements and any mailbox forwarding or other copies before treating this as a complete recipient inventory. The screenshot shows the flow, not the underlying email-field mappings.]**

Spam protection can process technical signals such as IP address and browser information to distinguish legitimate visitors from automated traffic.

**[CONFIRM OTHER ACTUAL HOSTING/SECURITY LOG HANDLING. The API explicitly sends the visitor IP address for Turnstile verification; the provider's Turnstile notice describes additional technical signals.]**

### International handling
**[CONFIRM RELEVANT DATA LOCATIONS, ANY INTERNATIONAL TRANSFERS AND APPLICABLE SAFEGUARDS. DO NOT CLAIM UK-ONLY STORAGE.]**

### How long we keep information
For enquiries that do not become customers, our retention policy is **12 months after the last contact**.

Make can temporarily retain enquiry information in detailed execution logs. On our current Free plan, those detailed logs are available for **7 days**.

**[BEFORE PUBLICATION: apply the 12-month policy to the existing inbox and relevant copies; document the review/deletion process. The 7-day figure is Make's detailed execution-log availability, not proof of complete erasure from all provider systems, webhook queues or backups. Customer records, any justified legal holds and other provider log/backup retention need separate treatment. No automatic email deletion has been configured.]**

### Cookies and embedded content
For the revised staged website, the YouTube player is not created until you choose **Load YouTube video**. The choice is not saved in a preference cookie or browser storage. You can remove the player from the page; this does not erase information already received by YouTube.

**[THE LIVE WEBSITE HAS NOT BEEN UPDATED. Complete the remaining cookie/storage inventory and final consent/legal wording before publication. This targeted control is not a whole-site cookie-compliance certification.]**

### Your information rights
Depending on the circumstances and our lawful basis, you may have rights to access your personal information, ask for correction or deletion, restrict or object to its use, and obtain certain information in a portable form. Where we rely on consent, you can withdraw it.

Contact **info@fashearn.io** to ask about your information or exercise your rights. You can also raise a concern with the Information Commissioner's Office at https://ico.org.uk/make-a-complaint/ .

**[RECHECK FINAL RIGHTS/COMPLAINT WORDING AGAINST THE SELECTED BASES AND CURRENT GUIDANCE.]**

### Changes
**[INSERT FINAL EFFECTIVE DATE AND CONFIRM HOW MATERIAL CHANGES WILL BE COMMUNICATED.]**

## Evidence and decisions for the editor
| Item | Observed source / remaining decision |
| --- | --- |
| Website form payload | functions/api/trial.js blob 15790e097ffb92f97c4461cae412186ec4b85297: name/company/email/drivers/carriers |
| Security | Same source verifies cf-turnstile-response and explicitly supplies CF-Connecting-IP as remoteip. Secret values were not read. |
| Forwarding | API posts payload to MAKE_WEBHOOK_URL. Owner screenshot shows webhook -> Microsoft 365 Send an Email. Settings screenshot codex-clipboard-409b3cc8-0354-485b-bca8-7a84b8e65078.png shows Keep data confidential = No and Store incomplete executions = No. Thus processed data may be available in execution logs; incomplete-execution recovery storage is disabled. No actual payload/log contents inspected, settings saved or runs triggered. |
| Make plan/log period | Owner and dashboard screenshot confirm Free. On 24 October 2026, actual rendered official https://www.make.com/pricing comparison row Execution log storage (days) showed Free 7, Core/Pro/Teams 30, Enterprise 60. This concerns detailed log availability, not all provider copies. |
| Existing contact candidate | assets/trial-form.js blob b21737c3f7127de941cb95050fd173fefdce9744 displays info@fashearn.io on failure. Owner has confirmed info@fashearn.io as the privacy contact and enquiry inbox. |
| Existing form UI | Root index form01; /api/trial; external Turnstile script; no submission performed. |
| Video/images | Revised staging uses explicit load/remove controls for the same approved privacy-enhanced YouTube video. Actual DOM 0 -> 1 -> 0 iframe checks passed in direct and standalone review. No full network/cookie audit or playback acceptance claimed. GitHub images retained. |
| Legal identity | Owner confirmed Harminder Singh Sekhon, sole trader trading as Fashearn Labs, on 24 October 2026. No limited-company or company-number claim. |
| Enquiry destination | Owner confirmed Microsoft 365 stores emails in info@fashearn.io. Additional forwarding, automation copies/history and access are not independently audited. |
| Retention | Owner initially had no period, then expressly adopted 12 months after last contact for enquiries that do not become customers. This is an approved policy decision; no mailbox deletion/retention configuration has been implemented. |
| Lawful basis | Must be selected from the actual purposes and relationships; draft does not declare consent/contract/legitimate interests as an established fact. |
| Marketing | No unsupported promise of opt-in, no marketing, no sharing/sale or no analytics added. Confirm actual practice. |
| Customer app data | Outside this website-only draft. No app source/runtime/data changed. |

## Guidance consulted on 24 October 2026
- ICO, Right to be informed: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/
- ICO, How to write a privacy notice: https://ico.org.uk/for-organisations/advice-for-small-organisations/privacy-notices-and-cookies/how-to-write-a-privacy-notice-and-what-goes-in-it/
- ICO, Create your own privacy notice (sector tools updated July 2026): https://ico.org.uk/create-your-own-privacy-notice
- ICO, Cookies: https://ico.org.uk/Global/cookies
- Make scenario settings (payload confidentiality and incomplete executions): https://help.make.com/scenario-settings
- Make scenario history (retention depends on plan): https://help.make.com/scenario-history
- Make official pricing (rendered plan comparison checked; Free execution logs 7 days): https://www.make.com/pricing
- YouTube privacy-enhanced embedding: https://support.google.com/youtube/answer/171780?hl=en
- Microsoft DPA (current index lists May 2026; actual tenant geography/settings not inspected): https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA
- Cloudflare Turnstile privacy notice: https://www.cloudflare.com/turnstile-privacy-policy/
- ICO, Storage limitation (periods depend on purpose and require actual review/deletion): https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/storage-limitation/

The ICO flags some guidance as under review following the Data (Use and Access) Act. Recheck the final notice against current guidance after the actual facts are confirmed.

## Integration when finalised
Create /privacy/ in the isolated staged build only after factual gaps are resolved; add footer and a short enquiry-form notice/link. A footer link alone does not replace making privacy information available when data is collected. Review actual cookie/embedded-content behaviour separately. No public policy page, consent mechanism or production enquiry change is authorized by this internal draft.

