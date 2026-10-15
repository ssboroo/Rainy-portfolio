import {it,expect} from 'vitest';
import {gaitBlend} from '../src/world/gait';
it('blends idle, walk and canter continuously at any speed',()=>{for(const speed of [0,.1,.5,2,5,6,7,10,-2]){const b=gaitBlend(speed);expect(b.idle+b.walk+b.canter).toBeCloseTo(1);expect(Math.min(b.idle,b.walk,b.canter)).toBeGreaterThanOrEqual(0);}expect(gaitBlend(0).idle).toBe(1);expect(gaitBlend(2.7).walk).toBeGreaterThan(.8);expect(gaitBlend(10).canter).toBe(1);expect(Math.abs(gaitBlend(4.51).canter-gaitBlend(4.49).canter)).toBeLessThan(.03);});

import {travelSpeed} from '../src/world/motion';
it('syncs animation to real travel, rejects teleports and handles reverse',()=>{expect(travelSpeed(0,0,.016,5)).toBe(0);expect(travelSpeed(0,.27,.1,2.7)).toBeCloseTo(2.7);expect(travelSpeed(0,-.2,.1,-2)).toBeCloseTo(-2);expect(travelSpeed(45,45,.016,0)).toBe(0);});

import {groundTilt} from '../src/world/motion';
it('aligns the mount to a bounded terrain slope in its heading direction',()=>{const flat=groundTilt(0,0,0,()=>0);expect(flat.pitch).toBe(0);expect(flat.roll).toBe(0);expect(groundTilt(0,0,0,(x,z)=>z*.1).pitch).toBeLessThan(0);expect(Math.abs(groundTilt(0,0,0,(x,z)=>z*5).pitch)).toBeLessThanOrEqual(.15);});

import {SmoothAxis} from '../src/world/motion';
it('suppresses alternating saddle noise without overshoot and snaps teleports',()=>{const s=new SmoothAxis();s.update(1.7,.016);let min=2,max=1;for(let i=0;i<120;i++){const value=s.update(1.7+(i%2?.01:-.01),1/60);min=Math.min(min,value);max=Math.max(max,value);}expect(max-min).toBeLessThan(.006);expect(s.update(4,1/60)).toBe(4);});
it('tracks smooth motion consistently at30 and120fps',()=>{const sample=(fps:number)=>{const s=new SmoothAxis();s.update(1.7,0);for(let i=1;i<=fps;i++)s.update(1.7+Math.sin(i/fps*2)*.04,1/fps);return s.value;};expect(Math.abs(sample(30)-sample(120))).toBeLessThan(.002);});
