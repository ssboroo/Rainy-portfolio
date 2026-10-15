// Measure real travel so a blocked rider never keeps walking in place.
export function travelSpeed(dx:number,dz:number,dt:number,direction:number){if(dt<=0)return 0;const distance=Math.hypot(dx,dz);if(distance>Math.max(1,dt*10))return 0;return distance/dt*(direction<0?-1:1);}

export function groundTilt(x:number,z:number,heading:number,height:(x:number,z:number)=>number){const sx=Math.sin(heading),cz=Math.cos(heading),front=height(x+sx,z+cz),back=height(x-sx,z-cz),right=height(x+cz*.45,z-sx*.45),left=height(x-cz*.45,z+sx*.45);return{pitch:Math.max(-.15,Math.min(.15,Math.atan2(back-front,2))),roll:Math.max(-.12,Math.min(.12,Math.atan2(right-left,.9)))};}
// Frame-rate independent, critically damped scalar tracking for the saddle.
export class SmoothAxis{
 value=0;velocity=0;private initialized=false;
 update(target:number,dt:number,frequency=18){if(!this.initialized||Math.abs(target-this.value)>.6){this.value=target;this.velocity=0;this.initialized=true;return this.value;}const t=Math.min(.1,Math.max(0,dt)),offset=this.value-target,decay=Math.exp(-frequency*t),temp=(this.velocity+frequency*offset)*t;this.value=target+(offset+temp)*decay;this.velocity=(this.velocity-frequency*temp)*decay;return this.value;}
}
