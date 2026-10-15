import {it,expect} from 'vitest';
import {AdaptiveQuality} from '../src/world/quality';
it('reduces sustained slow-frame resolution and grass reach within safe bounds',()=>{const q=new AdaptiveQuality(1);for(let i=0;i<3000;i++)q.sample(.04);expect(q.ratio).toBe(.65);expect(q.grassRadius).toBe(22);});
it('does not lower quality after one isolated slow frame',()=>{const q=new AdaptiveQuality(1.2);q.sample(.08);for(let i=0;i<130;i++)q.sample(.0167);expect(q.ratio).toBe(1.2);});
import * as T from 'three';
import {vi} from 'vitest';
import {createTerrain} from '../src/world/terrain';
it('restricts grass rendering to nearby cells with a bounded geometry budget',()=>{vi.stubGlobal('matchMedia',()=>({matches:false}));const load=vi.spyOn(T.TextureLoader.prototype,'load').mockImplementation(()=>new T.Texture());try{const scene=new T.Scene();const terrain=createTerrain(scene);terrain.update(0,new T.Vector3(0,0,-6),22);const grass=scene.children.filter(o=>o instanceof T.InstancedMesh&&o.geometry.index?.count===terrain.stats.tuftTriangles*3) as T.InstancedMesh[];const total=grass.reduce((n,g)=>n+g.count*terrain.stats.tuftTriangles,0);const active=grass.filter(g=>g.visible).reduce((n,g)=>n+g.count*terrain.stats.tuftTriangles,0);expect(total).toBeLessThan(700000);expect(active).toBeLessThan(total*.6);expect(active).toBeGreaterThan(1000);console.info({grassTrianglesTotal:total,grassTrianglesNearby:active,grassCellsVisible:grass.filter(g=>g.visible).length});}finally{load.mockRestore();vi.unstubAllGlobals();}});
