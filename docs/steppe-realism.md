# Steppe environment update
Natural ground variation now uses deterministic smooth fields for grass cover, soil moisture and dry vegetation. Grass placement, height and tint share these fields, avoiding a uniform carpet. Ground roughness is interpolated per vertex; no additional maps or per-frame CPU noise are needed. The existing grass triangle and chunk budgets are preserved.
Grass fade uses world-space coordinates instead of screen-space noise, and nearby tufts share wind gusts. Terrain height and hoof-contact calculations remain unchanged.

## Selected model replacements
The owner approved:
- Horse Rigged All Gaits: https://blendswap.com/blend/28627 (sign-in download; large Blender source needs texture baking, hair conversion, GLB export and native animation validation).
- Mongolian Hunting Yurt: https://sketchfab.com/3d-models/mongolian-hunting-yurt-433219c2c7b14c37ab74b430f462ce5c (CC BY listing; original files not yet obtained).
- Mongolian Warrior: https://sketchfab.com/3d-models/mongolian-warrior-80c703bf0e6541f2b539f95e57ab3534 (CC BY listing; rigging/animation not verified).
- Wooden Bowl02: https://polyhaven.com/a/wooden_bowl_02 (CC0).

These four assets are NOT claimed as installed by this environment update. Preserve the current working horse and ger until the actual files have been obtained, optimized and tested. Model names are not evidence of thirteenth-century accuracy. Current flags and portfolio UI remain as requested previously.

## Validation
GitHub Actions runs the existing test suite, new smooth-field and shader/geometry checks, client production build and server typecheck. Browser appearance, shader compilation on real WebGL and FPS still need verification before any claim of visual parity or zero lag.
