import {env} from 'cloudflare:workers';
import {adminHTML} from '../portfolio-html';
import {authorizeAdmin} from '../../server/access';
export const dynamic='force-dynamic';
export function GET(request:Request){
 if(!authorizeAdmin(request,(env as unknown as {ADMIN_EMAIL?:string}).ADMIN_EMAIL))return new Response('<!doctype html><html lang="mn"><meta charset="utf-8"><title>RAINY · Нэвтрэх</title><body style="font:18px system-ui;background:#f7f3e9;padding:10%"><h1>RAINY · Удирдлага</h1><p>Энэ хэсэгт зөвхөн эзэмшигч нэвтрэх боломжтой.</p><a href="/signin-with-chatgpt?return_to=%2Fadmin" target="_top">ChatGPT эрхээр нэвтрэх →</a></body></html>',{status:403,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store'}});
 return new Response(adminHTML,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
}
