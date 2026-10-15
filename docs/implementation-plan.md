# BOROO 3D Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Монгол талд морь унан аялаж вэб болон software бүтээлүүдтэй танилцах portfolio бүтээх.

**Architecture:** Статик Vite application; Three.js ертөнц болон HTML интерфэйс тусдаа. Typed контент өртөө, жагсаалт, dialog-ийг нэг эх үүсвэрээс тэжээнэ. Backend хэрэггүй.

**Tech Stack:** TypeScript, Vite, Three.js, Vitest; lockfile хадгална.

**Spec:** ../../../boroo-portfolio-design.md

## Global Constraints
- Дэлгэцийн нэр BOROO. Монгол/English хэлтэй.
- Сайтын хэрэглэгчид GitHub/repository холбоос үзүүлэхгүй.
- Баталгаагүй URL болон зохиомол хэрэглэгчийн тоо, орлого, үнэлгээ гаргахгүй.
- Дуу анхнаасаа унтраалттай; хэрэглэгч асаана.
- Геометрээр бүтээсэн морь, хүн эхний хувилбарт ашиглана.
- WebGL ажиллахгүй бол HTML жагсаалт автоматаар гарна.
- GitHub release рүү шууд татах товч тавихгүй; зориулалтын таталтын байршилгүй үед товч нуух.

## Review Focus
1. Tab солих буюу joystick cancel хийхэд морь үргэлжлэн давхихгүй.
2. WebGL үүсэхгүй/алдахад бүтээлүүд HTML-ээр уншигдана.
3. Удаан frame дээр морь байгууламж нэвтлэхгүй.
4. Тодорхойгүй URL болон GitHub хаяг товч болж харагдахгүй.
5. Dialog хаагдахад focus буцаж, хэл солиход нээлттэй контент шинэчлэгдэнэ.

### Task 1: Контент ба шууд үзэх portfolio
**Files:** package.json, index.html, tsconfig.json, src/main.ts, src/styles.css, src/content/projects.ts, src/content/i18n.ts, src/ui/catalog.ts, tests/content.test.ts.

**Interfaces:** `Locale = 'mn' | 'en'`; `Project = {id:string,title:string,kind:'web'|'software',summary:Record<Locale,string>,features:Record<Locale,string[]>,status:Record<Locale,string>,website?:string,download?:string,position:{x:number,z:number},color:number}`. `projects: Project[]`; `safePublicUrl(value?:string):string|null`; `mountCatalog(root:HTMLElement, projects:Project[], locale:Locale):void`.

- [ ] Scaffold Vite/TypeScript and install pinned dependencies; inspect official installed package docs for API compatibility.
- [ ] Write content tests: eight project IDs unique, both languages have descriptions, `safePublicUrl('https://github.com/ssboroo') === null`, invalid/non-HTTPS URL returns null.
- [ ] Run `npx vitest run tests/content.test.ts`; confirm failures before implementation.
- [ ] Implement eight projects from reviewed README facts; live-check supplied website URLs before making buttons visible. Keep unavailable links absent. Build readable responsive HTML catalog and introduction without fabricated contact information.
- [ ] Run content tests and `npm run build`; expect exit 0. Commit task.

### Task 2: Өнгөлөг Монгол 3D ертөнц
**Files:** src/world/create-world.ts, src/world/landmarks.ts, src/world/horse.ts, src/world/audio.ts, src/world/quality.ts, src/main.ts.

**Interfaces:** `createWorld(canvas:HTMLCanvasElement, projects:Project[]): {scene:THREE.Scene,camera:THREE.PerspectiveCamera,renderer:THREE.WebGLRenderer,horse:THREE.Group,obstacles:Obstacle[],dispose():void}`; `Obstacle={x:number,z:number,radius:number}`; `animateHorse(horse:THREE.Group,time:number,speed:number):void`; `setSoundEnabled(enabled:boolean):void`.

- [ ] Implement terrain, hills, clouds, ger, ovoo, rocks, grass clusters, procedural distant horses and eight themed landmarks. Use original procedural geometry, warm light and capped shadow resolution/DPR.
- [ ] Build recognizable articulated horse, saddle and deel-clad rider; animate gait and subtle rider motion based on speed. Reduced-motion suppresses decorative movement and camera bob.
- [ ] Add opt-in procedural wind/hoof audio, visibility pause, resize and disposal. Catch renderer initialization errors and preserve catalog.
- [ ] Run `npm run build`; verify scene creation against installed Three.js types. If supported browser QA exists, inspect horse silhouette, landmark readability, phone layout and fallback. Document QA limits. Commit task.

### Task 3: Морьтны удирдлага ба камер
**Files:** src/controls/input.ts, src/controls/movement.ts, src/controls/camera.ts, tests/movement.test.ts, tests/input.test.ts.

**Interfaces:** `InputState={forward:number,turn:number,sprint:boolean}`; `RiderState={x:number,z:number,heading:number,speed:number}`; `stepRider(state:RiderState,input:InputState,dt:number,obstacles:Obstacle[]):RiderState`; `createInput(root:HTMLElement):{read():InputState,reset():void,dispose():void}`. Map WASD/arrows, Shift and touch joystick; speed 5 walk/10 sprint world units per second, world bounds ±65.

- [ ] Write movement tests for one-second distance across 30/60/120 steps, diagonal/input normalization, bounds, collision with a radius-2 obstacle, and dt=2 pause without tunneling (cap dt and use collision substeps).
- [ ] Write input reset tests for blur/visibilitychange/pointercancel; assert zero movement after reset.
- [ ] Run those tests and confirm failures.
- [ ] Implement pure movement and input adapter; prevent browser scrolling only for active gameplay controls, exclude form/dialog input. Add smooth following camera and touch controls. Reset held inputs on modal opening and hidden tab.
- [ ] Run movement/input tests and build; expect exit 0. Commit task.

### Task 4: Өртөө, dialog, газрын зураг, орчуулга
**Files:** src/ui/dialog.ts, src/ui/hud.ts, src/ui/minimap.ts, src/world/interactions.ts, tests/interactions.test.ts, tests/dialog.test.ts.

**Interfaces:** `nearestProject(position:{x:number,z:number},projects:Project[],radius:number):Project|null`; `openProject(project:Project,locale:Locale,opener:HTMLElement):void`; `setLocale(locale:Locale):void`; interaction radius 5 world units. `moveToProject(id:string):void` selects a free approach position outside obstacles.

- [ ] Write tests: radius boundary inside/outside, closest project, no project when far away; dialog has localized title, Escape closes/focus returns, switching locale refreshes open dialog, hidden links produce no anchor.
- [ ] Run tests and confirm failures.
- [ ] Implement E/tap prompts, modal movement pause, native dialog focus behavior, start overlay, language/sound controls, direct catalog, minimap player/landmark markers and menu travel. Show control instructions and reduced-motion behavior.
- [ ] Run interaction/dialog tests and build; expect exit 0. Commit task.

### Task 5: Хүргэлтийн шалгалт ба нийтлэл
**Files:** README.md, docs/verification.md, .openai/hosting.json; production dist generated.

- [ ] Run full test suite, TypeScript check and production build once; fix actual failures and rerun affected checks.
- [ ] Use Sites supported preview workflow only if available. Check keyboard/touch, modal/Escape/focus, mobile resize, reduced-motion, audio off by default, visibility pause, WebGL failure and public links. If browser unavailable, clearly report no visual/runtime QA; do not claim measured fps.
- [ ] Inspect final content: no GitHub anchors, invented contact details, dead buttons, false live status or fake screenshots. Software download stays hidden until approved direct asset hosting exists.
- [ ] Record verification and dependency/asset licenses in README/docs. Commit source. Run whole-change review; independent reviewer only if execution method explicitly authorizes delegation.
- [ ] Register a private Site, persist identity, package using Sites source helper, deploy and confirm terminal result. Return literal deployed URL and verification limits. Keep source and deployment identity for future updates.

## Execution choice
Recommend native execution in this session: the five tasks share scene/input/UI interfaces and benefit from one implementer carrying context. User may instead explicitly select subagent-driven execution. Implementation begins after plan review and method selection.
