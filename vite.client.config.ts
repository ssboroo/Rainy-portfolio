import {defineConfig} from 'vite';
export default defineConfig({base:'/client/',publicDir:false,build:{outDir:'.client-build',emptyOutDir:true,rollupOptions:{input:{main:'index.html',admin:'admin.html'}}}});
