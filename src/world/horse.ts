import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {createRider} from './rider';
import {SmoothAxis} from './motion';
import {gaitBlend} from './gait';
export async function loadHorse(parent:T.Group){
 const [gltf,rider]=await Promise.all([new GLTFLoader().loadAsync('/assets/horse.glb'),createRider()]);const horse=gltf.scene;parent.add(horse,rider);horse.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=true;o.receiveShadow=true;}});
 const saddle=horse.getObjectByName('saddle_socket');const mixer=new T.AnimationMixer(horse);const actions=new Map(gltf.animations.map(c=>[c.name,mixer.clipAction(c)]));const idle=actions.get('idle_loop'),walk=actions.get('walk_loop'),canter=actions.get('canter_loop');for(const action of [idle,walk,canter])action?.setEffectiveWeight(0).play();const pos=new T.Vector3();const saddleQ=new T.Quaternion(),parentQ=new T.Quaternion(),up=new T.Vector3();const seatX=new SmoothAxis(),seatY=new SmoothAxis(),seatZ=new SmoothAxis();let smoothSpeed=0,phase=0;
 const update=(dt:number,speed:number,turn=0)=>{smoothSpeed=T.MathUtils.damp(smoothSpeed,speed,8,dt);const weight=gaitBlend(smoothSpeed);idle?.setEffectiveWeight(weight.idle);walk?.setEffectiveWeight(weight.walk);canter?.setEffectiveWeight(weight.canter);const moving=weight.walk+weight.canter;const stride=moving>.001?(weight.walk*(2.6893*(walk?.getClip().duration??1.2))+weight.canter*(4.622*(canter?.getClip().duration??.6667)))/moving:3.2;phase+=dt*speed/stride;const cycle=(value:number)=>((value%1)+1)%1;
  if(idle)idle.time=(idle.time+dt)%idle.getClip().duration;if(walk)walk.time=cycle(phase+.625)*walk.getClip().duration;if(canter)canter.time=cycle(phase+.78)*canter.getClip().duration;mixer.update(0);
  horse.updateMatrixWorld(true);if(saddle){saddle.getWorldPosition(pos);parent.worldToLocal(pos);rider.position.set(seatX.update(pos.x,dt,24),seatY.update(pos.y+.055,dt,24),seatZ.update(pos.z,dt,24));saddle.getWorldQuaternion(saddleQ);parent.getWorldQuaternion(parentQ).invert();saddleQ.premultiply(parentQ);up.set(0,1,0).applyQuaternion(saddleQ);const pitch=T.MathUtils.clamp(Math.atan2(up.z,up.y)*.42,-.065,.065)+Math.min(.045,Math.abs(smoothSpeed)*.007);const roll=T.MathUtils.clamp(-Math.atan2(up.x,up.y)*.38,-.04,.04)-T.MathUtils.clamp(turn*Math.abs(smoothSpeed)*.012,-.055,.055);rider.rotation.x=T.MathUtils.damp(rider.rotation.x,pitch,9,dt);rider.rotation.z=T.MathUtils.damp(rider.rotation.z,roll,9,dt);rider.userData.animatePose?.(phase,smoothSpeed,pitch,turn);}else rider.position.set(0,1.72,-.08);
 };
 update(.016,0);return{horse,update,clips:gltf.animations.map(a=>a.name),animations:gltf.animations};
}
