# Company website — isolated design preview

This folder contains seven staged pages: Home, Product, Features, Pricing, Resources, About and the approved article. It is not a deployed website or release approval.

Rebuild HTML from shared templates with `node scripts/build-staged-site.cjs` at repository root. Run `python scripts/check-staged-site.py` to check navigation and staging protections.

For local review: `python -m http.server 8765 --bind 127.0.0.1 --directory staging/company-site`, then open http://127.0.0.1:8765/ . Stop the local server after review.

All pages retain noindex/nofollow/noarchive. There is no Checkout or trial submission. Production root files, forms, functions, guide/video and SEO remain unchanged. Future publication needs separate owner approval and migration checks. See the company-site foundation handover under docs/.
