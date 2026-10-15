import {validateDocument,type ContentDocument} from '../content/live';
export type AdminAPI={load():Promise<ContentDocument>;save(document:ContentDocument):Promise<ContentDocument>};
async function contentRequest(init?:RequestInit){const response=await fetch('/api/admin/content',{credentials:'same-origin',cache:'no-store',...init});let body;try{body=await response.json();}catch{throw new Error('Серверээс зөв хариу ирсэнгүй. Дахин оролдоно уу.');}if(!response.ok)throw new Error(body.error||'Хадгалж чадсангүй.');return validateDocument(body);}
export const adminAPI:AdminAPI={load:()=>contentRequest(),save:document=>contentRequest({method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(document)})};
