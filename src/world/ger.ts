import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import * as T from 'three';
export const GER_DIMENSIONS={doorHeight:1.85,wallHeight:2.05,roofHeight:1.7};
let felt:T.MeshStandardMaterial|undefined;let woodTexture:T.Texture|undefined;
function timberTexture(){if(!woodTexture){woodTexture=new T.TextureLoader().load('/assets/ger-wood.jpg');woodTexture.colorSpace=T.SRGBColorSpace;woodTexture.wrapS=woodTexture.wrapT=T.RepeatWrapping;woodTexture.anisotropy=4;}return woodTexture;}
function feltMaterial(){if(felt)return felt;const n=128,data=new Uint8Array(n*n*4);let seed=75;for(let y=0;y<n;y++)for(let x=0;x<n;x++){seed=(seed*1664525+1013904223)>>>0;const value=220+(seed%12)+(x%3===0?-7:0)+(y%3===0?-5:0);const k=(y*n+x)*4;data[k]=value;data[k+1]=value-3;data[k+2]=value-13;data[k+3]=255;}const map=new T.DataTexture(data,n,n);map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(16,8);map.colorSpace=T.SRGBColorSpace;map.needsUpdate=true;felt=new T.MeshStandardMaterial({color:0xe8e6da,map,roughness:1,bumpMap:map,bumpScale:.008});return felt;}

let ornament:T.MeshStandardMaterial|undefined;
function ornamentMaterial(){if(ornament)return ornament;const width=512,height=64,data=new Uint8Array(width*height*4);for(let y=0;y<height;y++)for(let x=0;x<width;x++){const u=x%64,v=y;const diamond=Math.abs(u-32)+Math.abs(v-32);const knot=(diamond>16&&diamond<22)||(Math.abs(u-32)<3&&v>8&&v<56)||(Math.abs(v-32)<3&&u>8&&u<56);const border=v<5||v>58;const shade=(x*13+y*7)%9;const color=border?[170,126,65]:knot?[192,158,91]:[88,43,35];const i=(y*width+x)*4;data[i]=color[0]+shade;data[i+1]=color[1]+shade;data[i+2]=color[2]+shade;data[i+3]=255;}const map=new T.DataTexture(data,width,height);map.colorSpace=T.SRGBColorSpace;map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(2,1);map.needsUpdate=true;ornament=new T.MeshStandardMaterial({map,roughness:.91,bumpMap:map,bumpScale:.008});return ornament;}

export function createGer(radius:number){
 const group=new T.Group();group.name='Mongolian ger';const heightScale=1+(radius-3.5)*.04;const wall=GER_DIMENSIONS.wallHeight*heightScale,roof=GER_DIMENSIONS.roofHeight*heightScale;
 const wood=new T.MeshStandardMaterial({color:0xab8e70,map:timberTexture(),bumpMap:timberTexture(),bumpScale:.008,roughness:.82});const rope=new T.MeshStandardMaterial({color:0x44372a,roughness:1});const gold=new T.MeshStandardMaterial({color:0xbd9455,roughness:.7});const doorMat=new T.MeshStandardMaterial({color:0xa5502c,map:timberTexture(),bumpMap:timberTexture(),bumpScale:.006,roughness:.78});const dark=new T.MeshStandardMaterial({color:0x302c23,roughness:1});
 const add=(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number)=>{const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;};
 add(new T.CylinderGeometry(radius+.12,radius+.20,.3,80),wood,0,-.04,0);
 add(new T.CylinderGeometry(radius,radius,wall,96,4,true,Math.PI+.21,Math.PI*2-.42),feltMaterial(),0,wall/2,0);
 const roofProfile=[new T.Vector2(radius+.1,wall),new T.Vector2(radius*.94,wall+roof*.13),new T.Vector2(radius*.73,wall+roof*.47),new T.Vector2(radius*.43,wall+roof*.78),new T.Vector2(.5,wall+roof*.97)];add(new T.LatheGeometry(roofProfile,96),feltMaterial(),0,0,0);
 add(new T.CylinderGeometry(radius+.035,radius+.035,.28,96,1,true,Math.PI+.21,Math.PI*2-.42),ornamentMaterial(),0,wall-.34,0);
 add(new T.CylinderGeometry(radius+.032,radius+.032,.20,96,1,true,Math.PI+.21,Math.PI*2-.42),ornamentMaterial(),0,.38,0);
 const eaveBand=add(new T.TorusGeometry(radius+.09,.065,8,96),doorMat,0,wall-.015,0);eaveBand.rotation.x=Math.PI/2;
 add(new T.CylinderGeometry(.50,.55,.20,40),doorMat,0,wall+roof,0);add(new T.CylinderGeometry(.43,.43,.045,40),dark,0,wall+roof+.12,0);const crownRing=add(new T.TorusGeometry(.52,.025,6,48),gold,0,wall+roof+.11,0);crownRing.rotation.x=Math.PI/2;
 for(const y of [wall-.12]){const ring=add(new T.TorusGeometry(radius+.025,.026,6,96),rope,0,y,0);ring.rotation.x=Math.PI/2;}
 const edge=add(new T.TorusGeometry(radius+.08,.045,7,96),wood,0,wall,0);edge.rotation.x=Math.PI/2;
 // Roof seams follow the cone, with straps continuing down the wall.
 const vertices:number[]=[];for(let i=0;i<24;i++){const angle=i/24*Math.PI*2;const x=Math.sin(angle),z=Math.cos(angle);for(let k=0;k<roofProfile.length-1;k++){const a=roofProfile[k],b=roofProfile[k+1];vertices.push(x*(a.x+.008),a.y+.008,z*(a.x+.008),x*(b.x+.008),b.y+.008,z*(b.x+.008));}if(i%3===0&&Math.abs(angle-Math.PI)>.22)vertices.push(x*(radius+.025),.15,z*(radius+.025),x*(radius+.025),wall,z*(radius+.025));}
 const seams=new T.LineSegments(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(vertices,3)),new T.LineBasicMaterial({color:0x8d8878,transparent:true,opacity:.5}));group.add(seams);
 // Weathered felt skirt, paired animal-hair belts and a folded roof cover.
 add(new T.CylinderGeometry(radius+.045,radius+.075,.16,80,1,true,Math.PI+.21,Math.PI*2-.42),rope,0,.09,0);
 for(const y of [.68,1.35]){const belt=add(new T.TorusGeometry(radius+.045,.018,5,80),rope,0,y,0);belt.rotation.x=Math.PI/2;}
 const cover=add(new T.BoxGeometry(.92,.035,.54),feltMaterial(),0,wall+roof+.19,.14);cover.rotation.x=.12;
 for(const side of [-1,1]){const points=[new T.Vector3(side*.48,wall+roof+.2,.12),new T.Vector3(side*radius*.45,wall+roof*.77,.2),new T.Vector3(side*(radius+.06),wall,.24),new T.Vector3(side*(radius+.07),.25,.24)];add(new T.TubeGeometry(new T.CatmullRomCurve3(points),14,.016,4,false),rope,0,0,0);}
 const dh=GER_DIMENSIONS.doorHeight;const front=-radius-.075;
 // Genuine opening: the cylindrical felt wall leaves a doorway-sized gap.
 for(const x of [-.73,.73])add(new T.BoxGeometry(.16,dh+.18,.24),wood,x,(dh+.18)/2,front);
 add(new T.BoxGeometry(1.62,.20,.25),wood,0,dh+.10,front);
 for(const x of [-.63,.63])add(new T.BoxGeometry(.035,dh,.27),gold,x,dh/2,front);
 // Open carved leaf on a hinge, outside the entrance.
 const hinge=new T.Group();hinge.name='Closed ger door';hinge.position.set(-.64,0,front-.12);hinge.rotation.y=0;group.add(hinge);
 const door=new T.Mesh(new T.BoxGeometry(1.26,dh,.12),doorMat);door.position.set(.63,dh/2,0);door.castShadow=true;hinge.add(door);
 for(const y of [.55,1.30]){const panel=new T.Mesh(new T.BoxGeometry(.88,.43,.05),wood);panel.position.set(.63,y,-.09);hinge.add(panel);const ornament=new T.Mesh(new T.BoxGeometry(.22,.22,.06),gold);ornament.position.set(.63,y,-.13);ornament.rotation.z=Math.PI/4;hinge.add(ornament);}
 add(new T.BoxGeometry(1.65,.10,.70),wood,0,.02,front-.18);
 const handle=add(new T.TorusGeometry(.055,.012,6,14),gold,.43,.95,front-.22);handle.name='Brass door handle';
 // The closed door occludes the interior: no hidden furnishings or internal lights.
 group.updateMatrixWorld(true);
 const batches=new Map<T.Material,T.BufferGeometry[]>();const old:T.Mesh[]=[];
 group.traverse(o=>{if(o instanceof T.Mesh&&!Array.isArray(o.material)){const g=o.geometry.clone();g.applyMatrix4(o.matrixWorld);const list=batches.get(o.material)??[];list.push(g);batches.set(o.material,list);old.push(o);}});
 for(const mesh of old){mesh.removeFromParent();mesh.geometry.dispose();}
 for(const [material,geometries] of batches){const merged=mergeGeometries(geometries,false);geometries.forEach(g=>g.dispose());if(!merged)continue;const mesh=new T.Mesh(merged,material);mesh.name='Batched ger structure';mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);}
 group.userData.closedDoor=true;return group;
}
