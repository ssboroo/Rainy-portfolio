// Hysteresis avoids resolution oscillation; low frame rate reduces GPU load first.
export class AdaptiveQuality{
 ratio:number;grassRadius=34;private elapsed=0;private frames=0;private slow=0;
 constructor(maxRatio=1.25){this.ratio=Math.min(maxRatio,1.25);}
 sample(dt:number){if(dt<=0||dt>.15)return false;this.elapsed+=dt;this.frames++;if(this.elapsed<2.5)return false;const ms=this.elapsed*1000/this.frames;this.elapsed=0;this.frames=0;
 if(ms>23){this.slow++;if(this.slow>=2||ms>38){this.slow=0;const before=this.ratio;this.ratio=Math.max(.65,this.ratio-(ms>38?.25:.15));this.grassRadius=Math.max(22,this.grassRadius-4);return this.ratio!==before;}}
 else{this.slow=0;if(ms<17&&this.ratio<1.25){this.ratio=Math.min(1.25,this.ratio+.05);this.grassRadius=Math.min(34,this.grassRadius+1);return true;}}return false;
 }
}
