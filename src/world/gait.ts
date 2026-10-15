const smooth=(a:number,b:number,x:number)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
export function gaitBlend(speed:number){const s=Math.abs(speed),moving=smooth(.05,1.4,s),fast=smooth(3.2,5.7,s);return {idle:1-moving,walk:moving*(1-fast),canter:moving*fast};}
