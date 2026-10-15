export type StartupStep='assets'|'textures'|'audio'|'fonts'|'gpu'|'firstFrame';
const weights:Record<StartupStep,number>={assets:85,textures:5,audio:3,fonts:2,gpu:4,firstFrame:1};
export class StartupProgress{
 percent=0;error='';private downloaded=0;private completed=new Set<StartupStep>();
 bytes(loaded:number,total:number){this.downloaded=Math.max(this.downloaded,total>0?Math.min(1,Math.max(0,loaded/total)):0);this.update();}
 finish(step:StartupStep){if(this.error)return;this.completed.add(step);if(step==='assets')this.downloaded=1;this.update();}
 fail(message:string){this.error=message;this.percent=Math.min(this.percent,99);}
 private update(){if(this.error)return;let sum=85*this.downloaded;for(const s of this.completed)if(s!=='assets')sum+=weights[s];this.percent=this.completed.size===6?100:Math.min(99,Math.max(this.percent,Math.floor(sum)));}
}
