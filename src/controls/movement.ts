import type {Project} from '../content/projects';
export type Obstacle={x:number;z:number;radius:number};
export type InputState={forward:number;turn:number;sprint:boolean};
export type RiderState={x:number;z:number;heading:number;speed:number};
export function stepRider(s:RiderState,input:InputState,dt:number,obstacles:Obstacle[]):RiderState{
 const next={...s};const elapsed=Math.min(Math.max(dt,0),.1);const steps=Math.max(1,Math.ceil(elapsed/.01));const h=elapsed/steps;
 for(let n=0;n<steps;n++){
  const target=Math.max(-.45,Math.min(1,input.forward))*(input.sprint?5.2:2.7);
  next.speed+=(target-next.speed)*(1-Math.exp(-7*h));next.heading+=Math.max(-1,Math.min(1,input.turn))*(1.65/(1+Math.abs(next.speed)*.14))*h*(next.speed<-.1?-1:1);
  const x=Math.max(-150,Math.min(150,next.x+Math.sin(next.heading)*next.speed*h));const z=Math.max(-150,Math.min(150,next.z+Math.cos(next.heading)*next.speed*h));
  if(!obstacles.some(o=>Math.hypot(x-o.x,z-o.z)<o.radius+.65)){next.x=x;next.z=z;}else next.speed=0;
 }
 return next;
}
export function nearestProject(s:{x:number;z:number},projects:Project[],radius:number):Project|null{let best:Project|null=null,dist=radius;for(const p of projects){const d=Math.hypot(s.x-p.position.x,s.z-p.position.z);if(d<=dist){best=p;dist=d;}}return best;}
