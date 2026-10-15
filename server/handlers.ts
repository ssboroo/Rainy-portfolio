import {authorizeAdmin} from './access';
import {readContent,writeContent,type ContentBucket} from './content';
import {visibleProjects} from '../src/content/live';
export type PortfolioEnv={BUCKET:ContentBucket;ADMIN_EMAIL?:string};
const reply=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function publicContent(env:PortfolioEnv){try{const {document}=await readContent(env.BUCKET);return reply({...document,projects:visibleProjects(document)});}catch{return reply({error:'Агуулгыг уншиж чадсангүй.'},503);}}
export async function adminContent(request:Request,env:PortfolioEnv){
 if(!authorizeAdmin(request,env.ADMIN_EMAIL))return reply({error:'Энэ хэсэгт зөвхөн эзэмшигч нэвтэрнэ.'},403);
 try{
  if(request.method==='GET')return reply((await readContent(env.BUCKET)).document);
  if(request.method!=='PUT')return reply({error:'Method not allowed'},405);
  if(!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'JSON өгөгдөл шаардлагатай.'},415);
  const raw=await request.text();if(new TextEncoder().encode(raw).length>120000)return reply({error:'Өгөгдөл хэт том байна.'},413);
  let data;try{data=JSON.parse(raw);}catch{return reply({error:'JSON бүтэц буруу байна.'},400);}
  const result=await writeContent(env.BUCKET,data,data?.revision);return reply(result.document);
 }catch(error){const message=error instanceof Error?error.message:'Хадгалж чадсангүй.';return reply({error:message==='CONFLICT'?'Өөр цонхноос шинэчилсэн байна. Өөрчлөлтөө хуулж аваад дахин ачаална уу.':message},message==='CONFLICT'?409:message==='STORAGE_UNAVAILABLE'?503:400);}
}
