import {it,expect} from 'vitest';
import fs from 'node:fs';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
it('ships a connected, grounded boulder with bounded instancing cost and valid UVs',async()=>{
 const bytes=fs.readFileSync('public/assets/boulder.glb');
 const asset=await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),'');
 let geometry:T.BufferGeometry|undefined;asset.scene.traverse(o=>{if(o instanceof T.Mesh)geometry=o.geometry;});
 const g=geometry!,p=g.getAttribute('position'),uv=g.getAttribute('uv'),index=g.index!;
 expect(index.count/3).toBeLessThanOrEqual(650);expect(index.count/3).toBeGreaterThan(400);
 g.computeBoundingBox();const bounds=g.boundingBox!;
 expect(bounds.min.y).toBeCloseTo(0,5);expect(Math.max(bounds.max.x-bounds.min.x,bounds.max.z-bounds.min.z)).toBeCloseTo(2,5);
 const edges=new Map<string,number>(),key=(i:number)=>[p.getX(i),p.getY(i),p.getZ(i)].map(x=>Math.round(x*1e4)).join(',');
 for(let i=0;i<index.count;i+=3){const ids=[index.getX(i),index.getX(i+1),index.getX(i+2)];for(let n=0;n<3;n++){const edge=[key(ids[n]),key(ids[(n+1)%3])].sort().join('|');edges.set(edge,(edges.get(edge)??0)+1);}}
 const open=[...edges.values()].filter(n=>n===1).length;
 // Photogrammetry may retain a small underside boundary; no exploded independent triangles.
 expect(open/[...edges.keys()].length).toBeLessThan(.12);
 for(let i=0;i<p.count;i++){expect(Number.isFinite(p.getX(i)+p.getY(i)+p.getZ(i))).toBe(true);expect(Number.isFinite(uv.getX(i)+uv.getY(i))).toBe(true);}
});
