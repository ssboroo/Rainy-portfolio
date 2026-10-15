import {it,expect,vi,beforeAll,afterAll} from 'vitest';
beforeAll(()=>{vi.spyOn(T.TextureLoader.prototype,'load').mockImplementation(()=>new T.Texture());});afterAll(()=>vi.restoreAllMocks());
import * as T from 'three';
import {createGer,GER_DIMENSIONS} from '../src/world/ger';
it('makes station gers larger than the mounted rider at consistent metre scale',()=>{const g=createGer(3.5);const box=new T.Box3().setFromObject(g);const size=box.getSize(new T.Vector3());expect(size.x).toBeGreaterThanOrEqual(7);expect(size.y).toBeGreaterThan(3.8);expect(size.y).toBeLessThan(4.6);expect(GER_DIMENSIONS.doorHeight).toBeGreaterThanOrEqual(1.8);});

it('closes the door and batches the ger into fewer than12 mesh draws',()=>{const g=createGer(3.5);expect(g.userData.closedDoor).toBe(true);expect(g.getObjectByName('Closed ger door')!.rotation.y).toBe(0);let meshes=0;g.traverse(o=>{if(o instanceof T.Mesh)meshes++;});expect(meshes).toBeLessThan(12);});
