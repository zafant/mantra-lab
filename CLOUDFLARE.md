# Cloudflare deployment

## Target architecture
GitHub repository (source) -> Cloudflare Pages (deployment) -> optional custom domain.

## First deployment
1. Create a new dedicated GitHub repository named `mantra-lab` (public is recommended for the open/free tool).
2. Upload the contents of this folder to the repository.
3. In Cloudflare Dashboard, open Workers & Pages -> Create -> Pages -> Connect to Git.
4. Select `mantra-lab`.
5. Framework preset: None / static.
6. Build command: leave empty.
7. Output directory: `/` (repository root).
8. Deploy.

Every push to the main branch can then trigger a new deployment.

## Domain
After the first deployment, add a custom domain from the Cloudflare Pages project. The exact DNS steps depend on whether the domain is already managed by Cloudflare.

## Next backend step
Keep the frontend static. If an authorized online listone API becomes available, add a small Cloudflare Worker as the server-side data adapter so API keys, caching, normalization and rate limits stay outside the browser.
