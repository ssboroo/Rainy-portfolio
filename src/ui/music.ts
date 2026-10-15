/** Local, preloaded audio. Playback starts in the user's journey/music click handler. */
export function createMusicPlayer(audio:Pick<HTMLAudioElement,'play'|'pause'>,onChange:(enabled:boolean)=>void,onError:()=>void){
 let version=0;
 return{async setEnabled(enabled:boolean){const request=++version;if(!enabled){audio.pause();onChange(false);return;}try{await audio.play();if(request===version)onChange(true);}catch{if(request===version){onChange(false);onError();}}}};
}
