/** Identity headers are supplied by Sites dispatch, never by client-side login state. */
export function authorizeAdmin(request:Request,ownerEmail?:string):boolean{
 const email=request.headers.get('oai-authenticated-user-email');
 if(!ownerEmail||!request.headers.get('oai-authenticated-user-id')||!email||email.toLowerCase()!==ownerEmail.toLowerCase())return false;
 if(!['GET','HEAD'].includes(request.method)){
  if(request.headers.get('origin')!==new URL(request.url).origin)return false;
  const site=request.headers.get('sec-fetch-site');if(site&&site!=='same-origin'&&site!=='none')return false;
 }return true;
}
