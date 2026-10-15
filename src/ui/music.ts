export const musicVideoId='tTsE8dBd5FU';
export function createMusicPlayer(host:HTMLElement,onChange:(enabled:boolean)=>void){
 const panel=document.createElement('section');panel.className='music-player';panel.hidden=true;panel.setAttribute('aria-label','YouTube · Хөгжим');
 const top=document.createElement('div');top.className='music-player-heading';const title=document.createElement('span');title.textContent='RAINY · СОНГОСОН АЯ';const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Хөгжмийг зогсоож хаах');top.append(title,close);
 const screen=document.createElement('div');screen.className='music-player-screen';const source=document.createElement('a');source.href='https://www.youtube.com/watch?v='+musicVideoId;source.target='_blank';source.rel='noopener noreferrer';source.textContent='YouTube дээр нээх ↗';
 panel.append(top,screen,source);host.append(panel);
 function setEnabled(enabled:boolean){
  if(enabled&&!screen.firstChild){const frame=document.createElement('iframe');const url=new URL('https://www.youtube-nocookie.com/embed/'+musicVideoId);url.search=new URLSearchParams({autoplay:'1',loop:'1',playlist:musicVideoId,playsinline:'1',controls:'1',rel:'0'}).toString();frame.src=url.href;frame.title='RAINY · Сонгосон YouTube хөгжим';frame.width='356';frame.height='200';frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';screen.append(frame);}
  if(!enabled)screen.replaceChildren();panel.hidden=!enabled;onChange(enabled);
 }
 close.onclick=()=>setEnabled(false);return{setEnabled};
}
