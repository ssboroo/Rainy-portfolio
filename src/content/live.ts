import {projects as defaults,safePublicUrl,type Project} from './projects';
import {clanStation,type ClanStation} from './clan-layout';
export type ManagedProject=Project&{visible:boolean;householdName?:string;artIndex?:number};
export type ContentDocument={revision:number;projects:ManagedProject[]};
export const stationFor=clanStation;
export function seedDocument():ContentDocument{return {revision:0,projects:structuredClone(defaults).map(p=>({...p,visible:true}))};}
function text(value:unknown,max:number){if(typeof value!=='string'||!value.trim()||value.length>max)throw new Error('Текстийн урт эсвэл утга буруу байна.');return value.trim();}
function bilingual(value:any,max:number){return{mn:text(value?.mn,max),en:text(value?.en,max)};}
export function validateDocument(value:any):ContentDocument{
 if(!value||!Number.isSafeInteger(value.revision)||value.revision<0||!Array.isArray(value.projects)||value.projects.length>48)throw new Error('Өгөгдлийн бүтэц буруу байна. Дээд тал нь 48 бүтээл.');
 const ids=new Set<string>();const centers:{x:number;z:number}[]=[];
 const projects:ManagedProject[]=value.projects.map((raw:any,index:number)=>{
  const id=text(raw.id,60);if(!/^[a-z0-9][a-z0-9-]*$/.test(id)||ids.has(id))throw new Error('Бүтээлийн ID давхардсан эсвэл буруу байна.');ids.add(id);
  if(!['web','software'].includes(raw.kind)||typeof raw.visible!=='boolean')throw new Error('Төрөл эсвэл харагдах төлөв буруу байна.');
  const c=raw.station?.center??stationFor(index).center;
  if(!Number.isFinite(c.x)||!Number.isFinite(c.z)||Math.abs(c.x)>130||Math.abs(c.z)>130)throw new Error('Гэрийн байрлал -130–130 метрийн хооронд байна.');
  if(Math.hypot(c.x,c.z-6)<15||Math.hypot(c.x,c.z-17)<10||centers.some(p=>Math.hypot(p.x-c.x,p.z-c.z)<11))throw new Error('Гэрүүдийн хооронд 11 метрээс багагүй зай үлдээнэ.');centers.push(c);
  const station:ClanStation={center:{x:c.x,z:c.z},door:{x:c.x,z:c.z-3.65},approach:{x:c.x,z:c.z-6.1},yaw:0};
  const features={} as Project['features'];for(const lang of ['mn','en'] as const){const list=raw.features?.[lang];if(!Array.isArray(list)||list.length>8)throw new Error('Онцлогийн жагсаалт буруу байна.');features[lang]=list.map((v:unknown)=>text(v,180));}
  const p:ManagedProject={id,title:text(raw.title,100),kind:raw.kind,summary:bilingual(raw.summary,1800),status:bilingual(raw.status,140),features,visible:raw.visible,color:Number.isInteger(raw.color)&&raw.color>=0&&raw.color<=0xffffff?raw.color:0xc6a872,station,position:{...station.door}};
  if(raw.householdName)p.householdName=text(raw.householdName,60);
  if(raw.artIndex!==undefined){if(!Number.isInteger(raw.artIndex)||raw.artIndex<0||raw.artIndex>15)throw new Error('Зургийн дугаар буруу байна.');p.artIndex=raw.artIndex;}
  for(const key of ['website','download'] as const)if(raw[key]){const url=safePublicUrl(raw[key]);if(!url||url.length>1000)throw new Error('Холбоос https:// хаягтай байна.');p[key]=url;}
  return p;
 });return {revision:value.revision,projects};
}
export function visibleProjects(document:ContentDocument){return document.projects.filter(p=>p.visible);}
