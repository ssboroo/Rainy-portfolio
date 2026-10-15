# Boulder 01

Rico Cilliers / Poly Haven. CC0.
https://polyhaven.com/a/boulder_01
https://polyhaven.com/license

Source glTF: https://dl.polyhaven.org/file/ph-assets/Models/gltf/1k/boulder_01/boulder_01_1k.gltf
The adjacent boulder_01.bin is required for preprocessing. Place both in one directory and run `node scripts/prepare-boulder.mjs <directory>` (rename JSON to boulder_01.gltf).

Source textures: https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k/boulder_01/ with boulder_01_diff_1k.jpg, boulder_01_nor_gl_1k.jpg and boulder_01_arm_1k.jpg. Saved unchanged as boulder-diff.jpg, boulder-nor_gl.jpg, boulder-arm.jpg.

The original scan is reduced to 599 triangles / 777 vertices. Coincident positions with equal UV coordinates are welded before simplification; distinct UV seams are preserved. Normals are recomputed and the model is grounded at y=0, with its maximum horizontal width normalized to 2 metres. Geometry is shared across a single instanced draw, with one shared textured material. ARM green supplies roughness; no metallic or baked AO is applied.

This is a licensed scanned boulder, not a scan of a specific Mongolian location. Browser appearance and frame rate require device verification.
