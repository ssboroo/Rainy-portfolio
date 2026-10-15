# Portfolio Admin Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement inline.

**Goal:** Deliver the approved biography, blue cinematic landscape and hidden owner-only project/ger editor, then publish and push the full source to ssboroo/Rainy-portfolio.

**Architecture:** Preserve the existing Vite/Three.js client. Add the supported Vinext Worker around it, serving built assets and authenticated APIs. Store a revisioned project document in R2; server-side ChatGPT identity must match the configured owner email before reads or writes to admin endpoints. Public API returns only visible projects. Base projects seed the first document without overwriting later edits.

**Tech Stack:** TypeScript, Three.js, Vite, Vinext, Cloudflare R2, Sites authentication.

**Spec:** User-approved design in the conversation, 2026-10-16. Exact biography is supplied by the user.

## Global Constraints
- Preserve site identity, audience, assets and all existing projects.
- /admin is not linked from public navigation. Hiding is not authorization.
- Persist edits server-side; do not present localStorage as shared storage.
- Validate links, bilingual text and positions; protect against lost updates.
- Keep instancing, adaptive quality and loading readiness gates.
- GitHub receives source and licensed assets, never credentials or build output.

## Review Focus
- Anonymous and non-owner writes must fail, including cross-origin requests.
- Simultaneous edits must return conflict instead of discarding another edit.
- Additional ger placement must not collide with existing households or camp center.
- Invalid or failed save must preserve form values and existing published content.
- R2 failure must be visible; no success notification for failed writes.

### Task 1: Persistent content and authorization
Files: server/content.ts, server/access.ts, app/api/content/route.ts, app/api/admin/content/route.ts, tests/admin-api.test.ts, hosting/build configuration.
Interfaces: validated ContentDocument {revision,projects}; GET public visible list; GET/PUT admin with ETag revision.
- [ ] Write failing validation, authorization, conflict and persistence tests; run to confirm missing behavior.
- [ ] Install retained starter dependencies and preserve its sites() integration.
- [ ] Implement shared validation, owner check, R2 conditional write and API routes.
- [ ] Run API tests and full suite.

### Task 2: Editor and 3D integration
Files: admin.html, src/admin.ts, src/admin.css, src/content/live.ts, src/main.ts, src/content/clan-layout.ts, src/ui/project-art.ts.
Interfaces: load server data before world construction; editor uses same schema and GET/PUT API.
- [ ] Write failing tests for new station positions and editor save failure handling.
- [ ] Implement add/edit/hide, bilingual fields, link and ger-position controls, loading/error states and revision conflict response.
- [ ] Load visible server projects before world construction and use safe station-name/art fallbacks.
- [ ] Apply exact biography and blue cinematic sky without adding expensive postprocessing.
- [ ] Run tests and production build.

### Task 3: Review and delivery
Files: README.md, docs/admin.md.
- [ ] Review authentication, public filtering, R2 updates, scene placement, startup failure and build artifact.
- [ ] Address important findings and run affected tests plus full suite/build.
- [ ] Publish through Sites helper; verify terminal success.
- [ ] Push source and licensed assets to the named GitHub repository; verify branch head.

## Execution record
- Task1 complete: owner and origin validation, shared schema, R2 conditional writes; actual-handler tests cover unauthorized writes and storage failure.
- Task2 complete: editor add/edit/hide, 2D ger plan, bilingual fields, catalogue/scene integration, exact approved biography and blue sky.
- Final review found outer stations exceeding the old65m rider boundary. Added a reproducing test (failed at65), expanded rider bounds to150m, and made minimap scale fit all projects and the rider. Regression now passes.
- Client and Worker typechecking are separate to prevent Cloudflare's streaming Element globals from colliding with DOM Element types.
- Preserved the Sites feature checkout and native source helper; no secondary worktree was required.
- Browser rendering/FPS unavailable in this managed environment; unit, geometry, API and production build checks are used, with deployed HTTP smoke checks after publishing.
