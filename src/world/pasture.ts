import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {terrainHeight} from './terrain';
export function pasturePose(time:number,index:number,anchor:{x:number;z:number}){
 const phase=time*.055+index*1.9,radius=3.5+index%3;const progress=time;
 return{x:anchor.x+Math.sin(progress*.055+index*1.9)*radius,z:anchor.z+Math.cos(progress*.055+index*1.9)*radius,heading:Math.atan2(Math.cos(phase),-Math.sin(phase))};
}
export async function createPasture(scene:T.Scene){
 const loader=new GLTFLoader();const models=await Promise.all(['cow','sheep','horse'].map(name=>loader.loadAsync('/assets/herd-'+name+'.glb')));
 const actors:{root:T.Group;mixer:T.AnimationMixer;walk:T.AnimationAction;idle:T.AnimationAction;clock:number;elapsed:number;index:number;anchor:{x:number;z:number};speed:number}[]=[];const coarse=matchMedia('(pointer: coarse)').matches;
 for(let species=0;species<3;species++){const source=models[species];source.scene.updateMatrixWorld(true);const box=new T.Box3().setFromObject(source.scene),height=box.max.y-box.min.y;const scale=[1.38,.88,1.70][species]/height;const center=box.getCenter(new T.Vector3());const count=coarse?[2,4,2][species]:[3,6,3][species];
  for(let i=0;i<count;i++){const body=clone(source.scene);body.scale.setScalar(scale);body.position.set(-center.x*scale,-box.min.y*scale,-center.z*scale);body.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=false;o.receiveShadow=false;o.frustumCulled=false;}});const root=new T.Group();root.name=['Grazing cow','Grazing sheep','Pasture horse'][species];root.add(body);scene.add(root);const mixer=new T.AnimationMixer(body);const walk=mixer.clipAction(source.animations.find(a=>a.name==='WalkSlow')!);const idle=mixer.clipAction(source.animations.find(a=>a.name==='Idle')!);walk.setEffectiveWeight(0).play();idle.play();const index=actors.length;actors.push({root,mixer,walk,idle,clock:i*4,elapsed:0,index,anchor:[{x:-72,z:-14},{x:68,z:37},{x:-34,z:74}][species],speed:0});}
 }
 return{count:actors.length,update(dt:number,time:number,viewer:T.Vector3,reduced:boolean){for(const a of actors){const moving=!reduced&&Math.sin(time*.11+a.index*1.7)>-.35;a.speed=T.MathUtils.damp(a.speed,moving?1:0,2,dt);a.clock+=dt*a.speed;const pose=pasturePose(a.clock,a.index,a.anchor);a.root.position.set(pose.x,terrainHeight(pose.x,pose.z),pose.z);a.root.rotation.y=pose.heading;const distance=Math.hypot(pose.x-viewer.x,pose.z-viewer.z);a.root.visible=distance<100;if(!a.root.visible)continue;a.elapsed+=dt;if(distance>32&&a.elapsed<1/24)continue;a.walk.setEffectiveWeight(a.speed);a.idle.setEffectiveWeight(1-a.speed);a.walk.timeScale=.6;a.mixer.update(reduced?0:a.elapsed);a.elapsed=0;}}};
}
