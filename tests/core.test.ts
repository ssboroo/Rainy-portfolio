import {describe,it,expect} from 'vitest';
import {projects,safePublicUrl} from '../src/content/projects';
import {stepRider,nearestProject} from '../src/controls/movement';
describe('public portfolio',()=>{
 it('has sixteen distinct bilingual works',()=>{expect(projects).toHaveLength(16);expect(new Set(projects.map(p=>p.id)).size).toBe(16);projects.forEach(p=>{expect(p.summary.mn.length).toBeGreaterThan(10);expect(p.summary.en.length).toBeGreaterThan(10);});});
 it('links exactly five verified public websites',()=>{expect(projects.filter(p=>safePublicUrl(p.website))).toHaveLength(5);expect(projects.find(p=>p.id==='connect')?.status.mn).toContain('Төлөвлөлт');});
 it('rejects source links and unsafe URLs',()=>{for(const u of ['https://github.com/ssboroo','https://github.com/ssboroo/x/releases','javascript:alert(1)','http://example.com','nonsense',undefined])expect(safePublicUrl(u)).toBeNull();expect(safePublicUrl('https://voice.rainy.studio/')).toBe('https://voice.rainy.studio/');});
});
const initial={x:0,z:0,heading:0,speed:0};
describe('riding',()=>{
 it('travels equally across different frame rates',()=>{const distances=[30,60,120].map(n=>{let s={...initial};for(let i=0;i<n;i++)s=stepRider(s,{forward:1,turn:0,sprint:false},1/n,[]);return s.z;});expect(distances[0]).toBeGreaterThan(2.2);expect(Math.max(...distances)-Math.min(...distances)).toBeLessThan(.1);});
 it('cannot tunnel through obstacles on a slow frame',()=>{let s={...initial,speed:10};for(let i=0;i<30;i++)s=stepRider(s,{forward:1,turn:0,sprint:true},2,[{x:0,z:3,radius:1}]);expect(s.z).toBeGreaterThan(0);expect(s.z).toBeLessThan(1.5);});
 it('stays inside world boundary',()=>{let s={...initial,z:149};for(let i=0;i<100;i++)s=stepRider(s,{forward:1,turn:0,sprint:true},.1,[]);expect(s.z).toBeGreaterThan(149);expect(s.z).toBeLessThanOrEqual(150);});
 it('finds nearest station within interaction range',()=>{expect(nearestProject({x:999,z:999},projects,5)).toBeNull();const p=projects[0];expect(nearestProject(p.position,projects,5)?.id).toBe(p.id);});
});
