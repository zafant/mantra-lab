# Mantra Lab V3 foundation

## What's new
- Interactive formation-builder direction preserved from MVP v2.
- PWA/offline shell (manifest + service worker).
- Data-provider abstraction for a future authorized online listone source.
- Local CSV/JSON workflows remain the fallback.
- Static hosting ready: GitHub Pages or Cloudflare Pages.

## Hosting plan
Recommended for the current static phase:
1. Dedicated public GitHub repository.
2. Cloudflare Pages connected to that repository for deployment/previews.
3. Optional custom domain later.

GitHub Pages is also a viable zero-cost static host. Cloudflare Pages currently supports static HTML and automatic deployments from Git, with a Free plan. See the project roadmap before connecting a live domain.

## Important
The online listone button should only be connected to a source/API whose terms authorize automated retrieval and reuse of the data/images.
