import {it,expect} from 'vitest';
import {sampleSteppeField} from '../src/world/steppe-field';
it('produces deterministic smooth ground variation with bounded density and moisture',()=>{
 const samples=[];for(let x=-150;x<=150;x+=5)for(let z=-150;z<=150;z+=7){
  const a=sampleSteppeField(x,z),b=sampleSteppeField(x,z);expect(a).toEqual(b);
  for(const v of Object.values(a)){expect(Number.isFinite(v)).toBe(true);expect(v).toBeGreaterThanOrEqual(0);expect(v).toBeLessThanOrEqual(1);}
  const near=sampleSteppeField(x+.01,z+.01);expect(Math.abs(a.cover-near.cover)).toBeLessThan(.01);samples.push(a.cover);
 }expect(Math.max(...samples)-Math.min(...samples)).toBeGreaterThan(.25);
});
import * as T from 'three';
import {vi} from 'vitest';
import {createTerrain} from '../src/world/terrain';
it('keeps grass within the existing draw budget and grounds every instance',()=>{
 vi.stubGlobal('matchMedia',()=>({matches:false}));
 const load=vi.spyOn(T.TextureLoader.prototype,'load').mockImplementation(()=>new T.Texture());
 try{const scene=new T.Scene(),terrain=createTerrain(scene);
  const grass=scene.children.filter(o=>o instanceof T.InstancedMesh&&o.geometry.index?.count===terrain.stats.tuftTriangles*3) as T.InstancedMesh[];
  expect(grass.reduce((n,g)=>n+g.count*terrain.stats.tuftTriangles,0)).toBeLessThan(700000);
  const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>'};
  (grass[0].material as T.Material).onBeforeCompile(shader as any,{} as any);
  expect(shader.fragmentShader).not.toContain('gl_FragCoord');expect(shader.vertexShader).toContain('vGrassWorld');
 }finally{load.mockRestore();vi.unstubAllGlobals();}
});
