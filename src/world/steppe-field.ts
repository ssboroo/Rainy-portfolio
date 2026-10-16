/** Deterministic metre-scale meadow fields; no textures, timers or random global state. */
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const hash=(x:number,z:number)=>{const value=Math.sin(x*127.1+z*311.7)*43758.5453123;return value-Math.floor(value);};
function noise(x:number,z:number){const ix=Math.floor(x),iz=Math.floor(z),fx=x-ix,fz=z-iz;const sx=fx*fx*(3-2*fx),sz=fz*fz*(3-2*fz);const a=hash(ix,iz),b=hash(ix+1,iz),c=hash(ix,iz+1),d=hash(ix+1,iz+1);return (a+(b-a)*sx)*(1-sz)+(c+(d-c)*sx)*sz;}
export function sampleSteppeField(x:number,z:number){
 if(!Number.isFinite(x)||!Number.isFinite(z))return{cover:.6,moisture:.5,straw:.3};
 const cover=clamp(.18+noise(x/23,z/23)*.56+noise(x/7+42,z/7-11)*.26);
 const moisture=clamp(noise(x/55-8,z/55+17)*.7+noise(x/13,z/13)*.3);
 const straw=clamp((1-moisture)*.65+noise(x/9+17,z/9-30)*.35);
 return{cover,moisture,straw};
}
