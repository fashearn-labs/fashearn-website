# Fashearn Labs website privacy notice — working draft
**Prepared 24 October 2026. NOT APPROVED FOR PUBLICATION.**
This internal draft is for website visitors and product enquiries. It does not establish the separate data-protection arrangements for customer/driver data inside the Route Operations Dashboard.

The reader-facing wording is separated from the internal assessment and publication checks below. Proposed lawful bases and provider arrangements require final review; this is not a published policy.

## Draft notice — proposed wording for review

### Who is responsible
Fashearn Labs is the trading name of **Harminder Singh Sekhon**, a sole trader responsible for the personal information described in this notice.

For privacy questions or requests, email **info@fashearn.io**.

This notice covers our website and enquiries. Separate information and arrangements are needed for personal data that customers put into Fashearn Labs Route Operations Dashboard v1.1.

### Information we receive
Our website enquiry form asks for your name, company, email address, approximate number of drivers and the carriers your operation uses. If you email us, we also receive the information you choose to include.

Website hosting and security services can handle technical information such as your IP address and browser details when serving and protecting the website.

### Why we use it
We use enquiry details to answer your questions, understand your operation and provide the Dashboard follow-up or access arrangements you request. Submitting an enquiry does not add you to a newsletter or general marketing list.

Our proposed lawful basis for this enquiry handling is **legitimate interests**: responding to people who have asked to hear from us about our business and Dashboard. We limit that use to the enquiry and requested follow-up. You can ask us to stop following up by emailing **info@fashearn.io**.

We also use hosting and spam-protection services to operate the website and protect it from automated misuse. The proposed basis for necessary security processing is our legitimate interest in protecting the website and its visitors.

Optional YouTube content is loaded only when you choose it, as explained below.

### Services involved
We use the following services for the purposes described:

| Service | What it does |
| --- | --- |
| Cloudflare Pages | Hosts and serves the website. |
| Cloudflare Turnstile | Checks the enquiry form for automated misuse; this can involve IP address and browser-related signals. |
| Make | Routes website enquiries to email and can retain details in execution logs. |
| Microsoft 365 | Stores enquiry emails in **info@fashearn.io**. |
| GitHub-hosted images | Supplies application images shown on the website; requesting an image connects your browser to GitHub's service. |
| YouTube / Google | Supplies the optional overview video after you choose to load its player. |

Following links to LinkedIn, YouTube or another external website takes you to a service with its own privacy arrangements.

### How long we keep enquiry information
Our retention policy for enquiries that do not become customers is **12 months after the last contact**.

Make's Free plan makes detailed execution logs available for **7 days**. This is separate from the email retention period; it is not a promise that every provider system, queue or backup deletes all information after seven days.

If an enquiry becomes a customer relationship, relevant records need to be handled under the applicable customer-record arrangements rather than treated as an unsuccessful enquiry.

### Video choices and cookies
The revised website does not create the YouTube player until you choose **Load YouTube video**. Loading it connects your browser to YouTube, which may use cookies or similar technologies and receive device information. The page provides a link to Google's privacy information before loading.

The video choice is not saved in a preference cookie or browser storage. You can remove the player from the page, but that does not erase information already received by YouTube. You can also choose to watch the video on YouTube's own website.

### International handling
The service providers listed above operate internationally, so information may be handled outside the UK. Their published data-processing terms describe international-transfer safeguards, including contractual protections and UK-specific provisions where applicable.

You can ask **info@fashearn.io** for information about the safeguards relevant to the handling of your information.

Relevant provider information:
- [Cloudflare data-processing terms](https://www.cloudflare.com/cloudflare-customer-dpa/) and [Turnstile privacy information](https://www.cloudflare.com/turnstile-privacy-policy/).
- [Make data-processing agreement](https://www.make.com/data-processing-agreement.pdf).
- [Microsoft data-processing terms](https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA).
- [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- [Google privacy information](https://policies.google.com/privacy).

### Your rights and concerns
Depending on the circumstances and the relevant lawful basis, you may have rights to access your information, correct it, request deletion, restrict or object to its use, and receive certain information in a portable form. Where processing relies on consent, you can withdraw it.

Email **info@fashearn.io** to ask about your information or raise a concern. You can also complain to the [Information Commissioner's Office](https://ico.org.uk/make-a-complaint/).

### Changes to this notice
We will review this notice when the way we handle information changes and make the updated notice available on the website. Where appropriate, we will also draw material changes to affected people's attention.

## Internal assessment and publication checks — not website copy

### Enquiry handling: proposed legitimate-interests assessment
- **Purpose:** answer an inbound enquiry and arrange the Dashboard follow-up requested by the person; owner expressly confirmed no newsletter/general marketing-list use.
- **Necessity:** contact details enable a reply. Business context supports a relevant response or trial discussion. Before release, review whether driver/carrier fields must be mandatory for every enquiry; do not collect unnecessary detail merely because the old form did.
- **Balance:** a person voluntarily asking for a response can reasonably expect this limited business use. Keep the use within their request, provide a clear notice and objection channel, and follow the adopted retention policy.
- **Conclusion for draft:** ordinary legitimate interests is a supportable proposed basis for this narrow use, subject to the controller's final review and actual practice. This is not blanket authority for advertising, list-building, profiling, other uses or unnecessary data collection.

### Website security: proposed basis
The source shows Turnstile verification before forwarding an enquiry, including the visitor IP. Protecting the form from automated misuse is a legitimate purpose; the security processing must still be necessary and proportionate. The provider's technical-signal description is not an independent audit of this site's configuration. Complete the cookie/security inventory and review this proposed basis against actual behaviour.

### Publication conditions
1. Controller reviews the proposed lawful bases and wording. This document records a draft assessment, not a completed legal/compliance certification.
2. Check the actual applicable provider agreements, contracting/processing arrangements and transfer safeguards. Public Cloudflare/Make DPA text and Microsoft's published contract/guidance sources were reviewed; actual tenant geography, account-specific terms and onward transfers were not independently verified. Do not publish an unsupported UK-only storage or complete-transfer-assurance claim.
3. Put the adopted 12-month non-customer enquiry policy into practice. Review existing relevant inbox/copies and document a deletion/review procedure before promising operational compliance. No messages or provider retention settings have been changed.
4. Complete the remaining cookie/storage and technical-log inventory. Revised staged video controls are verified; live root source is unchanged. Do not present the old live site as already using those controls.
5. Assign an effective date and integrate the final notice at /privacy/ and beside data collection. Preserve the existing enquiry/security infrastructure. Footer-only availability is not enough at collection.
6. Customer/driver application data and customer-record retention require their own appropriate arrangements; this website-only notice does not settle them.

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
| Lawful basis | Proposed ordinary legitimate interests for narrow enquiry handling and necessary website security, with an internal purpose/necessity/balancing assessment above. Controller review and actual-practice checks remain required. |
| Marketing | Owner expressly confirmed: only enquiries and requested follow-up; no newsletters/general marketing lists. No broader no-sharing/sale/analytics promise inferred. |
| Customer app data | Outside this website-only draft. No app source/runtime/data changed. |

## Guidance consulted on 24 October 2026
- ICO legitimate-interests guidance: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/legitimate-interests/
- Cloudflare current DPA (6.4, 3 April 2026, UK-transfer provisions): https://www.cloudflare.com/cloudflare-customer-dpa/
- Make current DPA linked by its current terms page (3 May 2024), including UK transfer addendum provisions: https://www.make.com/data-processing-agreement.pdf
- Microsoft controller guidance on transfers: https://learn.microsoft.com/en-us/compliance/regulatory/gdpr-dpia-office365
- GitHub privacy statement: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement
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

