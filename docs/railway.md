# Railway deployment

The repository's default `build` command remains the Cloudflare Worker build. Railway uses Vinext's standalone Node server target selected by `railway.json`; this prevents Railpack from treating the app as a static Caddy site.

## Required Railway setup

1. Connect the repository's `main` branch and use the repository root as the service root.
2. Add a Railway Volume mounted at `/data` and set `DATA_DIR=/data`. The app uses this volume for the owner-edited project document. Without a volume, edits can be lost when Railway replaces the container.
3. Set `ADMIN_USER` and `ADMIN_PASSWORD` as Railway secrets. Use a unique, long password. Visiting `/admin` prompts for these HTTP Basic Auth credentials. Leave them unset only if the admin editor should remain inaccessible.
4. Keep Railway's generated domain assigned to this service. Railway terminates public HTTPS; the Node server listens on Railway's injected `PORT` over internal HTTP.
5. Redeploy from the latest `main` commit. The `/api/content` health check should return HTTP 200.

The Railway target replaces the Sites-only sign-in gate with HTTP Basic Auth for `/admin` and `/api/admin/content`. Writes retain same-origin checks and revision/ETag conflict protection. Never set the password in source control or a `VITE_` variable.

## Local checks

```sh
pnpm install --frozen-lockfile
pnpm run build:railway
PORT=8080 HOST=0.0.0.0 DATA_DIR=/tmp/rainy-data pnpm run start:railway
```

The Worker/Sites build remains available through `pnpm run build` and its existing Cloudflare configuration.
