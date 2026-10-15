# Animated eagle

Author: Quaternius. License: CC0 1.0 Universal.

Primary source: https://opengameart.org/content/animated-animales-low-poly
Public source archive: https://opengameart.org/sites/default/files/Animal%20Pack%20Vol.2%20by%20%40Quaternius.zip
License: https://creativecommons.org/publicdomain/zero/1.0/

Retrieved2026-10-16. Source Eagle.fbx is from Animal Pack Vol.2. It contains native Flying and Idle animations. Shipped derivative public/assets/eagle.glb retains only Flying (renamed Flight), preserves skinning, converts materials to Three.js standard materials, combines57 repeated material groups into4, welds duplicate vertices, and exports a self-contained GLB. FBXLoader reports vertices with more than4weights; the loader truncates extras and normalization is applied. No claim of a scanned or photoreal eagle is made.

Final geometry:24,800triangles,4material primitives;2runtime birds share asset geometry/materials and have independent skeletons/mixers. Shadows disabled. Flight paths and placement are original code. Reproduction: node scripts/prepare-eagle.mjs '/path/to/Eagle.fbx'.
