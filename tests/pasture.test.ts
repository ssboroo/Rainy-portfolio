import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {pasturePose} from '../src/world/pasture';
it('keeps grazing paths bounded and continuous',()=>{for(let i=0;i<12;i++){const center={x:29,z:1};const a=pasturePose(25,i,center),b=pasturePose(25.016,i,center);expect(Math.hypot(a.x-center.x,a.z-center.z)).toBeLessThanOrEqual(5.51);expect(Math.hypot(a.x-b.x,a.z-b.z)).toBeLessThan(.01);}});
it('ships complete lightweight animal rigs with native idle and slow walk clips',()=>{for(const name of ['cow','sheep','horse']){const bytes=readFileSync('public/assets/herd-'+name+'.glb');expect(bytes.length).toBeLessThan(700000);const j=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)).toString());expect(j.skins.length).toBeGreaterThan(0);expect(j.animations.map((a:any)=>a.name)).toEqual(expect.arrayContaining(['Idle','WalkSlow']));expect(j.buffers.every((b:any)=>!b.uri)).toBe(true);}});
