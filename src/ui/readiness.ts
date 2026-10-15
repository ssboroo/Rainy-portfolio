export function assertGraphicsReady(contextLost:boolean,shaderErrors:readonly string[]){
 if(contextLost)throw new Error('Graphics context lost');
 if(shaderErrors.length)throw new Error('Shader compilation failed: '+shaderErrors.join('; '));
}
export function waitForAudioElement(audio:HTMLAudioElement):Promise<void>{return new Promise((resolve,reject)=>{
 const cleanup=()=>{clearTimeout(timer);audio.removeEventListener('canplay',success);audio.removeEventListener('error',failure);};
 const success=()=>{cleanup();resolve();};const failure=()=>{cleanup();reject(new Error('Music could not be prepared'));};
 const timer=setTimeout(failure,20000);audio.addEventListener('canplay',success,{once:true});audio.addEventListener('error',failure,{once:true});audio.load();if(audio.readyState>=3)success();
});}
