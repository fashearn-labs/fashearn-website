# Company website — isolated design preview

This folder contains ten staged pages: Home, Product, Features, Pricing, Courier & Delivery, Resources, About, Contact, Trial information and the approved article. It is not a deployed website or release approval.

Rebuild HTML from shared templates with `node scripts/build-staged-site.cjs` at repository root. Run `python scripts/check-staged-site.py` to check navigation and staging protections.

Create a single-file review with `node scripts/build-review-preview.cjs`. The generated `outputs/Fashearn-Website-Review.html` embeds all ten pages and shared CSS, with a page selector and normal internal links. Existing public screenshots/video/guide require internet. The wrapper was checked through local HTTP; opening by file URL was not separately tested.

For local review: `python -m http.server 8765 --bind 127.0.0.1 --directory staging/company-site`, then open http://127.0.0.1:8765/ . Stop the local server after review.

All pages retain noindex/nofollow/noarchive. There is no Checkout or trial submission. Production root files, forms, functions, guide/video and SEO remain unchanged. Future publication needs separate owner approval and migration checks. See the company-site foundation handover under docs/.
