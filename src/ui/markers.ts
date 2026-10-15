export type MarkerRect={left:number;top:number;right:number;bottom:number};
export function markerRect(x:number,y:number,small:boolean):MarkerRect{const width=small?164:196,height=small?56:58;return{left:x-width/2,right:x+width/2,top:y-height,bottom:y};}
export function overlapsMarker(rect:MarkerRect,occupied:MarkerRect[]){return occupied.some(other=>rect.left<other.right+12&&rect.right>other.left-12&&rect.top<other.bottom+12&&rect.bottom>other.top-12);}
export function placeMarker(x:number,y:number,small:boolean,viewportWidth:number,viewportHeight:number,occupied:MarkerRect[]){
 const width=small?164:196,height=small?56:58,safeTop=small?100:110,safeBottom=viewportHeight-70;
 if(viewportWidth<width+24||safeBottom-safeTop<height||!Number.isFinite(x+y))return null;
 const left=Math.max(12,Math.min(viewportWidth-width-12,x-width/2));
 const preferred=Math.max(safeTop,Math.min(safeBottom-height,y-height>=safeTop?y-height:y+12));
 for(const offset of [0,1,-1]){const top=preferred+offset*(height+14);if(top<safeTop||top+height>safeBottom)continue;const rect={left,top,right:left+width,bottom:top+height};if(!overlapsMarker(rect,occupied))return{rect,below:top>=y};}return null;
}
