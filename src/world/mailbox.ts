import * as T from 'three';
export function createMailbox(){
 const group=new T.Group();group.name='RAINY contact mailbox';const blue=new T.MeshStandardMaterial({color:0x284e59,metalness:.28,roughness:.55}),gold=new T.MeshStandardMaterial({color:0xcab17e,metalness:.55,roughness:.48}),wood=new T.MeshStandardMaterial({color:0x574231,roughness:.93}),ivory=new T.MeshStandardMaterial({color:0xf3ead2,roughness:.82,side:T.DoubleSide});
 const add=(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number)=>{const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;};
 add(new T.BoxGeometry(.17,1.55,.17),wood,0,.775,0);add(new T.CylinderGeometry(.30,.38,.12,16),wood,0,.04,0);
 const shape=new T.Shape();shape.moveTo(-.48,0);shape.lineTo(.48,0);shape.lineTo(.48,.34);shape.absarc(0,.34,.48,0,Math.PI,false);shape.lineTo(-.48,0);
 add(new T.ExtrudeGeometry(shape,{depth:1.10,bevelEnabled:true,bevelSegments:1,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:16}),blue,0,1.45,-.55);
 add(new T.BoxGeometry(.55,.035,.035),gold,0,1.70,-.59);add(new T.BoxGeometry(.43,.26,.025),ivory,0,1.93,-.59);
 const points=[new T.Vector3(-.20,2.04,-.611),new T.Vector3(0,1.91,-.611),new T.Vector3(.20,2.04,-.611)];group.add(new T.Line(new T.BufferGeometry().setFromPoints(points),new T.LineBasicMaterial({color:0x284e59})));
 add(new T.BoxGeometry(.045,.65,.045),gold,.54,2.03,0);add(new T.BoxGeometry(.30,.20,.035),gold,.67,2.27,0);
 return group;
}
