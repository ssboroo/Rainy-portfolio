import fs from 'node:fs';
fs.rmSync('public/client',{recursive:true,force:true});fs.cpSync('.client-build','public/client',{recursive:true});
fs.writeFileSync('app/portfolio-html.ts','export const portfolioHTML='+JSON.stringify(fs.readFileSync('.client-build/index.html','utf8'))+';\nexport const adminHTML='+JSON.stringify(fs.readFileSync('.client-build/admin.html','utf8'))+';\n');
