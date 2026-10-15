import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {mountRiderModel} from './rider-pose';
export async function createRider(){
 const gltf=await new GLTFLoader().loadAsync('/assets/rider.glb');const body=gltf.scene;
 body.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=true;o.receiveShadow=true;o.frustumCulled=false;const materials=Array.isArray(o.material)?o.material:[o.material];for(const m of materials)if(m instanceof T.MeshStandardMaterial){m.emissiveIntensity=.025;m.metalness=.14;m.roughness=.67;if(m.map)m.map.anisotropy=8;if(m instanceof T.MeshPhysicalMaterial){m.specularColor.setRGB(.8,.8,.8);m.specularIntensity=.6;}}}});
 const group=mountRiderModel(body);const material=new T.MeshStandardMaterial({color:0x30291e,roughness:.8});for(const side of [-1,1]){const curve=new T.CatmullRomCurve3([new T.Vector3(side*.145,.14,.44),new T.Vector3(side*.17,-.08,.69),new T.Vector3(side*.15,-.19,.91)]);group.add(new T.Mesh(new T.TubeGeometry(curve,20,.004,5,false),material));}
 const chest=group.getObjectByName('Spine02'),head=group.getObjectByName('Head');const chestBase=chest?.quaternion.clone(),headBase=head?.quaternion.clone();const delta=new T.Quaternion(),axis=new T.Vector3(1,0,0),yawAxis=new T.Vector3(0,1,0);group.userData.animatePose=(phase:number,speed:number,pitch:number,turn=0)=>{const moving=Math.min(1,Math.abs(speed)/3);const breath=Math.sin(phase*Math.PI*2)*.012*moving;if(chest&&chestBase)chest.quaternion.copy(chestBase).multiply(delta.setFromAxisAngle(axis,-pitch*.38+breath));if(head&&headBase)head.quaternion.copy(headBase).multiply(delta.setFromAxisAngle(axis,pitch*.42-breath*.6)).multiply(delta.setFromAxisAngle(yawAxis,T.MathUtils.clamp(turn*.08,-.1,.1)));};
 group.userData.riderSource='Mongolian Warrior — gg1105701968 / Meshy, CC0';return group;
}
