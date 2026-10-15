import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
/** CC0 Poly Haven Boulder 01: 600 triangles, shared by every stone. */
export async function loadBoulder(){
 const loader=new T.TextureLoader();
 const [asset,map,normalMap,arm]=await Promise.all([
  new GLTFLoader().loadAsync('/assets/boulder.glb'),
  loader.loadAsync('/assets/boulder-diff.jpg'),
  loader.loadAsync('/assets/boulder-nor_gl.jpg'),
  loader.loadAsync('/assets/boulder-arm.jpg'),
 ]);
 let geometry:T.BufferGeometry|undefined;asset.scene.traverse(o=>{if(o instanceof T.Mesh)geometry=o.geometry;});
 if(!geometry)throw new Error('Boulder geometry missing');
 map.colorSpace=T.SRGBColorSpace;
 for(const texture of [map,normalMap,arm]){texture.flipY=false;texture.anisotropy=4;}
 // AO is omitted: these instances have no independent baked ambient occlusion.
 const material=new T.MeshStandardMaterial({map,normalMap,roughnessMap:arm,roughness:1,metalness:0,normalScale:new T.Vector2(.65,.65)});
 return {geometry,material};
}
