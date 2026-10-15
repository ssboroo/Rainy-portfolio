# BOROO — Миний бүтээлийн тал нутаг

A browser-based third-person horse-riding portfolio for Boroo, in Mongolian and English.

## Run

Node 22+: `npm ci`, `npm run dev`. Production: `npm run build`. Tests: `npm test`.

WASD/arrows: ride and turn. Shift: canter. Drag: orbit camera. Scroll: zoom. E or the station prompt: open a project. Mobile: joystick, canter button and tap. A direct HTML portfolio remains available independently of riding. Music starts only after the visitor selects Begin, or explicitly enables Music.

## Included

- Eight real project descriptions from owner-authorized public repository README files.
- Four website URLs checked for HTTP 200 on 2026-10-15; no source-code links on the public interface.
- Licensed PBR horse with idle, walk, canter and rear clips (rear is not exposed in controls).
- Full textured skinned human with custom riding pose and deel overlay, terrain heightfield, PBR ground textures, GPU grass, ger stations, mountains, sky, fog and third-person camera.
- CC BY short morin khuur loop, credits, bilingual portfolio dialogs, station navigation and minimap.
- Collision, input reset on focus loss, responsive controls and WebGL failure fallback.

## Fidelity and delivery limits

This first version is not an AAA game or an authenticated Mongolian horse reconstruction. The licensed horse is a European heavy warhorse with armor. Its model and real animation are substantially more detailed than the original low-poly proposal. The rider uses a full textured CC0 skinned human with a custom riding pose and deel overlay; the ger is procedural felt-and-timber geometry. They are not scanned photoreal assets. Native Mongolian tack, a production rigged rider and final art direction remain refinement work.

Software installers are described but not mirrored: public GitHub links were prohibited, and no independent distribution channel was supplied. No nonfunctional download buttons are shown. BEAUTY DROP remains labeled concept/development. No unverified sales, usage, endorsements or contact details are invented.

The environment lacks the required control-browser capability; no preview server or substitute browser was used. Tests/build are verified; visual rendering, real touch interaction and device frame rates are unverified. User visual review is required.

## Credits and rights

- **Warhorse Lite**, Literock Studios / Literock Ventures, 2026. Embedded in this end product under the included licence in `docs/HORSE-LICENSE.txt`. Do not extract or re-upload it as an asset/template/asset pack. Source: https://literock-studios.itch.io/warhorse-lite . AI-assisted base mesh/textures, custom rig and animation, as disclosed by its author.
- **morin khuur.wav**, Oleg Yastrebov / Qleq, https://freesound.org/people/Qleq/sounds/677538/ , CC BY 4.0: https://creativecommons.org/licenses/by/4.0/ . Uses the public HQ MP3 preview as a short repeating music loop, with reduced playback volume. No authorship claim by this site.
- **Aerial Grass Rock**, Rob Tuytel / Poly Haven, CC0: https://polyhaven.com/a/aerial_grass_rock . 1K diffuse, normal and roughness maps.
- Three.js MIT. Vite MIT. Fonts: Manrope and Noto Sans via Google Fonts (SIL OFL). Code package licences remain with their authors.

See `docs/progress.md` and `docs/link-check.json` for evidence and decisions.

## Visual refinement — 2026-10-15

Station gers now use metre-based dimensions: 7m diameter, 2.05m wall and 1.7m roof, with a ~4m crown height. The central ger is 8.6m across. Collision radii expand with the structure. Felt weave, roof seams, bands, timber doorway, raised decorative panels and a step improve scale cues.

Rider face geometry comes from the CC0 **Human base mesh with editable 53-bone rig**, Innerscene, using MakeHuman/MPFB anatomical assets: https://www.innerscene.com/tools/library/3d-parts/human-base-mesh-with-editable-53-bone-rig-8e7c8ab1 . Only the head was extracted, recentered and repackaged as `rider-head.glb`; the source base body is not shipped. The existing original deel is replaced with tailored folded geometry, woven bump detail, a sash, articulated-looking gloves/hands, boot cuffs and rein curves. This is an anatomical head with procedural clothing, not a scanned or identity-matched portrait or a full skinned rider.

Foreground terrain resolution is now 1m; paths use separate textured ribbons and feathered edges. Grass uses five-blade tufts (50k desktop / 22k coarse-pointer), with ground pebbles and small meadow flowers. No device frame-rate claim is made.

Additional CC0 textures by Rob Tuytel / Poly Haven: https://polyhaven.com/a/grass_path_2 and https://polyhaven.com/a/brown_mud_leaves_01 . Credits in the site remain available through the footer.

## Full rider and sunshower refinement

The latest version replaces the previous extracted head/procedural body with the complete **Sam locomotion collection** character by Innerscene, derived from MakeHuman/MPFB CC0 assets: https://www.innerscene.com/tools/library/3d-parts/locomotion-collection-sam-3d-person-animated-dc23800f . The real skin, eyes, eyebrows, eyelashes, hair, clothing, normal maps and full skeleton are retained. A custom bone pose puts the person astride the saddle with hands forward. A skinned deel-skirt overlay, sash and hat are added; the source is an adapted casual character, not a purpose-built scanned Mongolian rider or the portfolio owner's portrait.

Source PNG clothing normal map resized 4096→2048; skin texture remains 2048. Embedded RGB diffuse maps use JPEG quality94; alpha maps are preserved. `scripts/prepare-rider.py ORIGINAL_GLB` reproduces the web repack using Pillow. The prepared full GLB is ~11.6MB. The previous head asset is superseded.

Horse walk/canter weights are continuous. Native front-hoof stance travel was measured from embedded bone animation (approx2.689m/s walk,4.622m/s canter). Cycle phases are synchronized at the measured lowest front-hoof positions; distance-based phase progression uses the clip stride lengths. Walk speed is2.7m/s, canter7m/s. This reduces sliding but is not per-hoof IK or perfect ground-contact simulation.

The atmosphere now includes a higher ridged mountain ring, warm physical sun in the forward sky, grey-white cloud cover and a sunshower: fine line drizzle around the rider and small ground splash rings. Reduced-motion hides rain/splashes. Wet-looking ground remains a material effect, not fluid simulation. Grass uses85k desktop/36k coarse-pointer five-blade tufts, with reduced per-blade segment count and16 spatial chunks for culling. Device performance is still unmeasured.

Verification:19 unit/DOM/actual-skeleton tests and production build. An internal software-rendered front/back view of actual skinned model geometry was inspected for face detail and riding proportions; this does not verify the browser scene, GLSL or final lighting.

## Armored Mongolian rider and complete startup gate

Current rider supersedes both previous human implementations above. **Mongolian Warrior**, gg1105701968 / Meshy, CC0, public AI-generated asset: https://www.meshy.ai/3d-models/Mongolian-Warrior-v2-01955eef-63ea-79b9-85c0-09f9b2ba20df . Complete 74,307-triangle textured skinned character with its own armor, helmet, coat and boots; ~6.63MB GLB. Runtime normalizes pelvis and scale, poses existing bones astride the saddle and adapts imported materials to scene lighting. Not a scanned human or identity-matched portrait. Prior Sam preparation instructions are historical and do not reproduce this asset.

Gers retain original procedural geometry, now with a curved roof, felt weave, patterned maroon/gold bands and more elaborate timber/gold doors. They are not downloaded Meshy yurt models. Station diameter remains7m and central diameter8.6m. Terrain retains the local PBR textures, dense chunked grass, mountains, sun, clouds and drizzle from the previous pass.

The opaque startup screen reports0–100% with Mongolian please-wait copy.85% is byte-based across an exact build-generated manifest; the remainder requires textures/models, actual playable audio, local fonts, GPU compilation and the first rendered frame. Shader errors, context loss and file/audio errors prevent completion and expose retry/catalog fallback. Sound starts on user interaction. Fonts are now local Manrope/Noto Sans under SIL OFL, no external font request. Download payload is about25.3MB before HTTP compression.

Verification:24 unit/DOM/actual-skeleton tests pass; TypeScript and Vite production build pass. Actual warrior bone pose was inspected via an offline software-rendered front/back view. Browser appearance, GLSL execution, mobile performance and frame rates remain unverified because the supported browser QA capability is unavailable. No claim of Bruno Simon production parity or photorealism is made.

## Rider visibility adjustment

Mounted warrior is now18.5% larger around the fixed saddle pelvis, including its posed limbs and reins. Approximate equivalent standing height2.18m includes helmet and armor; this is a deliberate heroic proportion. Follow distance5.5m (was6.5m), vertical FOV50° (was54°), and a higher look target improve screen presence. Browser visual/FPS verification remains unavailable.

## Meadow and open doorway stations

Removed freestanding torus-on-pole station markers. Information prompts now activate within2.6m of the open ger doorway, with E/tap to show the existing project details and website links. The ger wall and low ornamental bands have a genuine gap; hinged open wood door, threshold, recessed interior, rug and roof beams are original geometry. Circular building collision keeps the mounted horse outside. No walking/dismount mode is implied.

Grass instances now concentrate62% of tufts into the nearest90m square, with irregular height/width, more curved blades and shadow reception. Ground uses matched aerial grass/rock diffuse and normal maps; mountains receive matching normal detail. These are original procedural meshes with licensed CC0 textures, not newly downloaded scanned landscape models. Browser appearance and device frame rate remain unverified.

## Adaptive performance pass — current

This supersedes the open-door and previous density settings. All ger doors are closed, with a real1K wood photograph (Wood Table001, Dimitrios Savva / Rico Cilliers / Poly Haven, CC0, https://polyhaven.com/a/wood_table_001), brass handle and felt material. Original ger geometry is batched by material to fewer than12 mesh draws; hidden interiors and8 point lights are removed. The doorway information prompt still works outside.

Grass:42k desktop/20k coarse,4 curved blades,121 small cells, Lambert vertex lighting, distance dither fade22–40m and CPU cell culling. Offline scene test at start with22m quality radius draws208,224 grass triangles vs prior1.7m worst-case field. All new desktop grass geometry totals672,000triangles. This is a geometric workload comparison, not measured FPS. Terrain foreground180k→45k triangles, coarser distant mountains; rocks and ovoo share one instanced draw; clouds55→20, herd4→2.

Initial resolution targets about1.8million pixels; sustained slow gameplay lowers pixel ratio to.65 and grass reach to22m, with hysteresis recovery. Deliberately30fps welcome/panel frames are excluded from adaptation. Shadow map1024, updates at most~13Hz; actual browser FPS, draw calls, triangles and ratio are available in world canvas data attributes. No GPU measurements are claimed.

Music now4:34 (274.3s),96kbps stereo ambient arrangement built from Qleq/Oleg Yastrebov's6.857s CC BY4.0 morin-khuur motif, with transposed/breathing phrases, original quiet pads and wind. This is an arrangement of a short source, not a newly recorded full live performance. `scripts/arrange-steppe-music.py` reproduces from original source MP3 with numpy/ffmpeg. Original source URL/license above remain applicable. Actual audio canplay/error readiness remains; duplicate OfflineAudioContext PCM decoding is removed. Versioned preload URLs prevent stale music assets after deployment.

Verification:28 tests, TypeScript and Vite build. Shader/geometry review completed; browser visual, audio listening and FPS QA unavailable in this environment. No zero-lag or photorealism guarantee.

## RAINY portfolio expansion and riding correction

16 requested projects are summarized from15 current public READMEs. RAINY-CONNECT has no README or implementation; its design document explicitly says planning, so the card is labeled accordingly. Source paths/hashes are recorded in `docs/project-sources.json`. Public UI keeps repository links hidden. Five website homepages were fetched withHTTP200 and matching titles: Voice, Video, RAINY Studio, SOCIALTOOL.STORE, BOOST.MN. This proves homepage availability only, not paid generation or provider readiness. Other projects have no verified public URL and show no invented link. LLM and Mobile retain research/MVP labels.

Brand and bilingual About now useRAINY, volunteer developer, with no invented employment/awards/experience claims.16 stations occupy a4×4 grid. Large contrasting labels display at mostfive nearby project names. A modeled contact mailbox at(8,-3) opens the contact panel when approached, then waits until the rider leaves4.5m before triggering again. Header/label access also works. Contact uses the publicSOCIALTOOL.STORE Telegram@boroobro and clearly labeled business support email; links open the user's own apps, no fake send form.

Riding: blocked collisions now clear speed; animation cycles use measured displacement, rejecting teleports. Top canter speed5.2m/s reduces time-warp relative to the embedded4.622m/s animation. Rider pitch/roll are damped with smaller limits, plus small upper-body/head counter-motion from existing bones. Cached vectors/quaternions avoid recurring allocations. Shadow refresh increased from~13 to30Hz to reduce visible stepping. This remains an adapted rig, not a new motion-captured mounted human or per-hoof IK.

Verification:31 tests, TypeScript/Vite build, code review. Supported browser QA is unavailable; final rendering, perceived movement, label overlap and real device FPS remain unverified.

## Sunny green pasture and manuscript folio

Current environment uses a higher warm sun, clearer blue sky, lighter clouds and the existing gentle sunshower. Meadow material/tints are greener. The mounted horse follows bounded terrain pitch/roll, speed-sensitive turning and subtle turn lean/head anticipation; it retains native gait animation and displacement-based cycles.

Cow, Sheep and Horse models/rigs/native Idle + WalkSlow animations byQuaternius, CC0: https://opengameart.org/content/lowpoly-animated-farm-animal-pack . Obtained from the Three.js manual's public distribution and repacked glTF+BIN to self-containedGLB. Total1.67MB;796/612/690triangles per model respectively. Three pastures spawn12desktop or8coarse animals, walking/resting at varying times. Skeleton-aware clones share geometry/materials, no animal shadows,24Hz distant pose updates,100m culling. These are visibly low-poly stylized models, not photoreal livestock. Goat candidates could not be downloaded and no goat is shipped.

About, work catalog and project detail now use an original Mongolian manuscript-inspired parchment/brown-ink design. Local Caveat handwriting and Lora serif fonts support ӨөҮү; font cmap was checked.4project cards per folio spread with previous/next navigation and category filters. No historical manuscript text or exact Secret History facsimile is reproduced. Font SIL OFL notices included in docs/font-licenses.

Verification:35 unit/DOM/actual-model tests, production build and code review. Native herd root motion verified zero; actual animal poses inspected with offline geometry rendering. Browser visuals, manuscript layout, audio and device FPS remain unverified without supported browser QA.

## Walking stability and unified station HUD

Actual embedded horse clips were sampled offline at300 positions per cycle. Saddle tracks were smooth (walk maximum adjacent step~1.12mm); no source loop discontinuity was found. This does not reproduce the user's browser jitter. Runtime now uses critically damped saddle tracking with teleport snap, matching7Hz camera/focus smoothing, texel-snapped sun shadow center and MSAA. Initial raster budget is1.4million pixels, preserving the adaptive quality controller. This reduces likely positional and edge shimmer sources; measured device FPS and perceived jitter remain unverified.

Station labels now share fixed252×102desktop/202×92mobile plaques: number badge, category, two-line title, distance and nearby highlight, anchored above each ger roof. Nearest visible markers take priority; screen-space overlap suppression prevents plaques from covering one another, maximumfive visible. Paper/handwritten catalog and About remain intact.

Verification:38 tests, TypeScript/Vite build, no CSS syntax warnings. Browser render and visual motion verification unavailable. No newly downloaded character models are claimed in this pass.

## Clan camp and warrior accessories — current

The sixteen stations now form two inward-facing household rings around a communal space, connected by circular and radial trails. Doors, interaction positions, collision centers and teleport headings share a single station layout. The larger chief ger sits beyond the central horsehair-inspired standard. Original batched meshes add a hearth, cooking tripod, kettle, benches, carts, storage, tether rails and household pennants. This is a Mongolian clan-inspired composition, not an exact reconstruction of a named historical tribe. Herd anchors move outside the settlement. Static camp props are merged by material; no extra point lights are added.

The existing CC0 Meshy Mongolian Warrior rig remains the mounted character. Original maroon cape, leather quiver, arrows and recurve bow reinforce the warrior silhouette; the cape has subtle vertex motion. A searched alternate warrior asset had no usable animation rig and was not substituted. No new scanned or motion-captured human is claimed.

The previous morin-khuur arrangement is removed from the shipped assets. Current music is a44.04-second looping throat-singing ambient made by crossfading two CC0 recordings by xX_GimbleGoblin10000_Xx, normalized and faded. This is not a full traditional song or a verified Mongolian performer. Attribution and source links are in docs/THROAT-AUDIO-LICENSE.md and the in-app credits.

Verification:41 tests and TypeScript/Vite production build pass. Camp station spacing, inward door/approach positions, trail layout and batched prop mesh count have automated checks. Browser rendering, perceived animation, audio listening and device FPS remain unverified because supported browser QA is unavailable.

## Researched Mongolian chronicle — current

Default interface now uses Mongolian labels for navigation, loading, category plaques, controls, location/map, credits and About tags. Brand/project names and source author names remain unchanged. The welcome title is Талын товчоон. The manuscript-inspired folio gains original vector steppe line art, warm paper, burgundy seal, mineral-ink colors and matching wooden station plaques. These are original design elements, not a facsimile of The Secret History of the Mongols.

A new Өв соёл panel contains six Mongolian notes linked to UNESCO, Mongolia's National Museum, the Metropolitan Museum, Cambridge and a contextual ger guide. Historical scope and research decisions are documented in docs/MONGOLIAN-HERITAGE.md. Contemporary customs and Ilkhanid court accounts are explicitly not generalized into an exact13th-century tribal reconstruction.

All household ger doors now face south (negativeZ; positiveZ is north on the map), replacing inward-facing doors. Door interaction, safe travel approach and heading stay aligned. Short dirt approach trails and grass exclusion follow those doors. Gers gain felt skirts, paired belts, roof-cover shapes and two rope ties. Three household dairy-work arrangements add drying boards, simplified leather vessels and painted chests. Hearth smoke uses12 soft billboards in one draw and hides for reduced motion; existing grass, adaptive resolution and lighting budgets remain. No new downloaded character, photogrammetric scenery or high-poly animal is claimed.

Verification:42 tests and production build pass; review of source, station approach clearance and marker bounds. No supported browser QA is available, so final scene appearance, GPU shader execution, audio listening and real device FPS remain unverified.

## Visible roof plaques and illustrated folios — current

Reproduced label failure numerically using the actual startup camera: roof anchors project near y94px at1366×768; placing102px cards above them makes them fail the header110px boundary check. All11front-facing candidates were rejected in a representative pose. New placement chooses above/below, clamps inside usable viewport, reserves HUD/mobile-map bounds and tries non-overlapping rows. Maximum5desktop/3phone. Numeric projection regression covers desktop and390×844phone and requires at least two visible plaques.

The manuscript pages now use a four-scene Mongolian life illustration series (camp, rider, household crafts, tea welcome) across catalog cards, project details, About and Contact. Original AI-generated watercolor/ink artwork; full prompt and attribution context in docs/FOLIO-ILLUSTRATIONS.md. One compressed atlas is fetched through the real startup manifest and reused via its blob URL. It is art, not an archaeological reconstruction or screenshot of the3Dworld.

Household pennants have subtle vertex wind motion and now sit outside the ger roofs. Eight small distant bird silhouettes use one instanced draw and24Hz transform updates; reduced motion hides them. Existing adaptive rendering remains. Bird geometry merging has an actual-geometry regression test to prevent an attribute mismatch from breaking startup.

Verification:47 unit/DOM/actual-model tests and production build. Source review completed. Browser appearance, GPU shader compilation, perceived motion and device FPS remain unverified without supported browser QA.

## Screenshot-driven simplification and native eagle flight — current

User screenshot showed oversized plaques covering the camp. Labels are now196×50desktop/164×48mobile, with title and number only, capped3desktop/2mobile and48m. Fewer placement alternatives avoid rows far from the roof anchor. Location HUD/controls lose the large brown panels, map shrinks, and mailbox label appears within14m. Random repeated folio scenes are removed from project cards/dialogs; illustration remains at chapter level. Project details use their original compact glyph.

Birds previously flew outside the default upper camera frustum. Their procedural silhouettes are replaced by Quaternius's licensed CC0 Eagle with native Flight animation. Two independent rigs fly lower in visible space. Material grouping optimization reduces57draw primitives to4per bird, asset2.6MB,24.8ktri per bird; no shadows. Real imported flight vertex motion and startup frustum inclusion have automated tests. See docs/EAGLE-LICENSE.md.

Horsehair standards and4household pennants now deform actual CPU vertex positions; reduced motion restores rest geometry. A footer motion toggle explicitly overrides a system reduced-motion preference. Larger pennants and updated normals make motion visible from nearby. Households with carts are reduced8→4. Shared photographic wood material replaces flat cart timber. The added flat rectangular rider cape is removed to reveal imported armor. Native horse/rider motion is retained.

Foreground uses a CC0 photographed Leafy Grass material with matched normal/roughness; short14–25cm blade geometry replaces tall dark reeds, without increasing the672ktriangle total grass budget. Mountain elevations are lower, default camera pitch.10, with more sky visible. These changes respond to the screenshot; they do not amount to a scanned Mongolian landscape or AAA rendering claim.

Verification:49 tests and production build pass, including actual eagle skinned vertices, visible flight positions, wind vertex deformation and compact label layout. Code review completed. The uploaded screenshot was inspected; no supported browser QA is available to inspect the new final scene or measure actual FPS.

## Nine white standards, national flags and project miniatures — current

Bow, quiver, added arrows and bowstring are removed from the mounted character; reins remain. Contact is a compact illustration-and-links layout, one column on phones, with Telegram and the existing clearly labeled business support email. No long introductory prose or repeated instructions.

Ger nameplates now combine a handwritten Mongolian household name (Багшийн өргөө, Бичгийн өргөө, Дууны өргөө, etc.) with the actual project brand in a small secondary line. Same compact width,58pxdesktop/56pxphone height, maximum3/2labels. New16scene book-illustration atlas gives every project its own cultural miniature, consistently assigned in catalog and dialog. Entire square cells are shown, avoiding face cropping. More detail and exact prompt in docs/FOLIO-ILLUSTRATIONS.md.

Four current Mongolian national flags use a local1200×600SVG, verified red/blue/red arrangement and golden hoist-side Soyombo. Flag geometry1.8×.9m, wind-deformed with pinned hoist and updated normals. Center now has exactly one larger and eight surrounding white standards on a protected pedestal, simplified original three-pronged finials and white horsehair. Source/reconstruction limits in docs/NATIONAL-SYMBOLS.md. All static clan geometry is normalized to non-indexed attributes before material batching to avoid mixed Extrude/Cylinder/Icosahedron failures. Clouds drift slowly; reduced motion freezes them. Existing native eagle, herd and mounted gait systems remain.

Verification:52tests and production build pass. Tests cover9standard arrangement,2:1flag geometry,16unique project art cells, concise working contact links and prior motion/loading behavior. Independent source review found no blocker. Final browser render and device FPS remain unverified without supported browser QA.

## Owner editor

Open `/admin` directly while signed in as the configured owner. Add/edit/hide projects and position their ger on the camp plan; save to publish the content, then reopen the portfolio. Data persists in server-side R2 and updates use revision checks. Setup and security details: [docs/admin.md](docs/admin.md).

This version uses the retained Sites Vinext Worker around the Three.js/Vite client. Build with `pnpm build`; test with `pnpm test`. Runtime secret: `ADMIN_EMAIL`; R2 binding: `BUCKET`. The public navigation does not show an admin link.
