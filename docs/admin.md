# Portfolio administration

Open `/admin` directly. The public menu has no admin link. Sites authenticates the visitor; the server requires both identity headers and an email matching the runtime secret `ADMIN_EMAIL`. Hidden navigation is not the security boundary. Writes also require a same-origin Origin header.

Select a project to edit its title, Mongolian household name, bilingual summaries/features/status, website/download links, manuscript miniature and ger coordinates. Add creates a hidden draft with a free household location. Enable “Сайтад харуулах” to publish it. Save commits the entire validated document to R2; re-open the portfolio to load the updated world and book. Hiding a project removes its ger and catalog card. Maximum 48 projects; household centers must remain 11 metres apart and outside the central camp.

R2 binding: `BUCKET`, key `portfolio/content-v1.json`. Initial content is seeded from the source when no saved document exists. Source deployments do not overwrite saved content. Updates use R2 ETag preconditions and a document revision; stale edits fail with HTTP409. Keep a copy of edited fields before reloading after a conflict.

For Sites, configure `ADMIN_EMAIL` as a runtime secret and retain the dispatch authentication integration. Never trust a client field or a hidden URL as authorization. Outside Sites, deploy behind a trusted authentication gateway that removes incoming `oai-authenticated-*` headers and supplies verified identity; do not expose the Worker directly while accepting arbitrary identity headers.

## Development

Use Node22+, `corepack pnpm install`, `pnpm test`, `pnpm build`. `build:client` builds the Vite client into public/client and generates app/portfolio-html.ts. The retained Vinext build then packages API routes and static assets. Public project defaults live in src/content/projects.ts; saved production edits live in R2 and are not automatically committed to GitHub.
