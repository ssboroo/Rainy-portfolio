import { resolve } from "node:path";
import vinext from "vinext";
import { defineConfig } from "vite";

// Railway runs the same Vinext routes on a Node server. The existing
// Cloudflare deployment keeps using vite.config.ts and its Worker bindings.
export default defineConfig({
  resolve: {
    alias: {
      "cloudflare:workers": resolve(process.cwd(), "server/railway-env.ts"),
    },
  },
  plugins: [vinext()],
});
