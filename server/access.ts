/** Sites supplies verified identity headers; Railway can use HTTP Basic Auth. */
export function authorizeAdmin(request:Request,ownerEmail?:string,adminUser?:string,adminPassword?:string):boolean{
 const email=request.headers.get('oai-authenticated-user-email');
 const sitesIdentity=Boolean(ownerEmail&&request.headers.get('oai-authenticated-user-id')&&email&&email.toLowerCase()===ownerEmail.toLowerCase());
 const basic=request.headers.get('authorization')?.match(/^Basic\s+([A-Za-z0-9+/]+={0,2})$/i)?.[1];
 let basicIdentity=false;
 if(adminUser&&adminPassword&&basic){
  try{
   const decoded=atob(basic),separator=decoded.indexOf(':');
   if(separator>=0){const user=decoded.slice(0,separator),password=decoded.slice(separator+1);basicIdentity=constantTimeEqual(user,adminUser)&&constantTimeEqual(password,adminPassword);}
  }catch{/* Malformed credentials are rejected. */}
 }
 if(!sitesIdentity&&!basicIdentity)return false;
 if(!['GET','HEAD'].includes(request.method)){
  if(request.headers.get('origin')!==new URL(request.url).origin)return false;
  const site=request.headers.get('sec-fetch-site');if(site&&site!=='same-origin'&&site!=='none')return false;
 }return true;
}
function constantTimeEqual(a:string,b:string):boolean{
 let difference=a.length^b.length;const length=Math.max(a.length,b.length);
 for(let index=0;index<length;index++)difference|=(a.charCodeAt(index%Math.max(1,a.length))||0)^(b.charCodeAt(index%Math.max(1,b.length))||0);
 return difference===0;
}
