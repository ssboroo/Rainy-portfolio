# SDD ledger — plan: docs/implementation-plan.md
Ruling: Execute natively in a new dedicated project directory; repeated user approvals authorize implementation. No additional worktree is needed for this newly created isolated repository.
Ruling: Latest user requirement replaces procedural low-poly horse with licensed PBR GLB and real animation; high fidelity scene supersedes stylized direction. Model availability determines exact gait clips; do not relabel canter as trot/gallop.
Ruling: Use CC BY audio preview as licensed short loop with visible credit, no synthesized audio claimed as morin khuur.
Pre-flight: project data feeds catalog/world/dialog consistently; movement obstacles feed collision; UI movement pause resets input.
Task 1: complete — eight bilingual projects; 4 website URLs HTTP 200; safe URL tests passed.
Task 2: implemented — actual licensed 9,938-triangle PBR horse, 4 embedded clips, ground maps, GPU grass, procedural deel rider. Visual QA unavailable.
Task 3: complete — movement/collision/frame-rate tests passed; held keyboard reset, visibility pause and pointercancel tested.
Task 4: complete — localized dialog/close/focus, hidden missing links, catalog and travel implemented. DOM tests passed.
Ruling: Browser visual QA skipped because Sites requires control-browser and it is unavailable. Costs: runtime shader/render appearance and performance remain unverified.
Ruling: Software installer mirrors omitted; user forbids public GitHub links and no independent download distribution exists. Costs: visitors can read software descriptions but cannot download here yet.
Ruling: Heavy-warhorse morphology and original procedural rider are disclosed, not represented as photoreal Mongolian assets. Costs: exact desired art quality not fully met in this first release.
Final review fix: coarse-pointer landscape tablets/phones now retain joystick/canter controls beyond 650px viewport width. CSS media-rule review; real device check unavailable.
Final review: independent code reviewer found no Critical issues. Landscape touch-control issue fixed. Input-pointer reset and two focus-return/localization issues regraded Important for real users, each reproduced by a failing regression test then fixed; suite 16/16 passed.
Deferred minor: full world disposal leaves some listeners/materials/textures; current app creates exactly one world. Deferred minor: large Three.js entry bundle warning; production build succeeds.
Task 5: local tests and TypeScript/build verified. Browser/visual/device performance checks unavailable. Deployment pending.
Visual refinement: user explicitly requested improved rider, terrain and realistic larger ger proportions. Kept existing architecture and controls. Added CC0 anatomical head asset, detailed tailored clothing, higher-resolution foreground, textured roads, grass tufts and metre-scaled gers.
Verification: new ger dimensions test observed failing before implementation then passing; full suite17/17 and TypeScript+production build passed. No browser/device QA capability.
Refinement code review: no Critical/Important issues. Addressed distant terrain overlap, roof-seam alignment and grass visibility cost through aligned terrain boundaries and16 independently culled grass chunks. Actual FPS and visual appearance remain unverified; full texture/material disposal remains a deferred minor.
Third visual pass: full licensed CC0 textured skinned human replaces the failed partial procedural model. Actual bone hierarchy tested and software-rendered face/body pose inspected. Distinct full model source retained in credits.
Horse motion investigation: sampled embedded front-hoof bone positions across native clips to derive stance speeds2.6893 and4.622m/s, lowest phases.625/.78. Continuous gait weights and stride-based synchronized cycle progression replace abrupt thresholds. Walk2.7/canter7 world m/s.
Atmosphere: larger geological mountain ring, physical sun direction consistent with lighting, gentle line drizzle/splashes, wetter ground and denser spatially culled grass.
Third-pass verification:19/19tests passed; TypeScript+production build passed. Internal CPU-rendered full human face/skin/rig inspection completed (not browser visual QA). Reviewer found no Critical/Important runtime bugs. Fixed moving splash culling bounds by disabling culling for55small rings. Grass peak is1.7million triangles desktop/.72million coarse-pointer before16-chunk frustum culling; actualdevice FPS remains unmeasured. Full resource disposal remains a deferred minor.

## Armored Mongolian rider and complete startup gate

Current rider supersedes both previous human implementations above. **Mongolian Warrior**, gg1105701968 / Meshy, CC0, public AI-generated asset: https://www.meshy.ai/3d-models/Mongolian-Warrior-v2-01955eef-63ea-79b9-85c0-09f9b2ba20df . Complete 74,307-triangle textured skinned character with its own armor, helmet, coat and boots; ~6.63MB GLB. Runtime normalizes pelvis and scale, poses existing bones astride the saddle and adapts imported materials to scene lighting. Not a scanned human or identity-matched portrait. Prior Sam preparation instructions are historical and do not reproduce this asset.

Gers retain original procedural geometry, now with a curved roof, felt weave, patterned maroon/gold bands and more elaborate timber/gold doors. They are not downloaded Meshy yurt models. Station diameter remains7m and central diameter8.6m. Terrain retains the local PBR textures, dense chunked grass, mountains, sun, clouds and drizzle from the previous pass.

The opaque startup screen reports0–100% with Mongolian please-wait copy.85% is byte-based across an exact build-generated manifest; the remainder requires textures/models, actual playable audio, local fonts, GPU compilation and the first rendered frame. Shader errors, context loss and file/audio errors prevent completion and expose retry/catalog fallback. Sound starts on user interaction. Fonts are now local Manrope/Noto Sans under SIL OFL, no external font request. Download payload is about25.3MB before HTTP compression.

Verification:24 unit/DOM/actual-skeleton tests pass; TypeScript and Vite production build pass. Actual warrior bone pose was inspected via an offline software-rendered front/back view. Browser appearance, GLSL execution, mobile performance and frame rates remain unverified because the supported browser QA capability is unavailable. No claim of Bruno Simon production parity or photorealism is made.
