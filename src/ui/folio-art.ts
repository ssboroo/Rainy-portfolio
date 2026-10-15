import type {Locale} from '../content/projects';
export type FolioScene='camp'|'rider'|'craft'|'welcome';
let source='/assets/folio-life.webp';
export function setFolioSource(url:string){source=url;}
const scenes:Record<FolioScene,{position:string;mn:string;en:string}>={
 camp:{position:'0% 14%',mn:'Ногоон талын гэр, тэрэг, уулсын зурагт зохиомж',en:'Illustration of a ger camp, cart and mountains'},
 rider:{position:'100% 0%',mn:'Дээлтэй монгол морьтон, бэлчээрийн зурагт зохиомж',en:'Illustration of a Mongolian rider and pasture'},
 craft:{position:'0% 86%',mn:'Авдар, хөхүүр, модон сав бүхий ахуйн зурагт зохиомж',en:'Illustration of a chest, leather vessel and wooden household ware'},
 welcome:{position:'100% 73%',mn:'Цай барин угтах монгол ахуйн зурагт зохиомж',en:'Illustration of a Mongolian tea welcome'}
};
export function createFolioArt(scene:FolioScene,locale:Locale){const figure=document.createElement('figure');figure.className='folio-art';const image=document.createElement('div');image.className='folio-scene';image.style.backgroundImage=`url("${source}")`;image.style.backgroundPosition=scenes[scene].position;image.setAttribute('role','img');image.setAttribute('aria-label',scenes[scene][locale]);const caption=document.createElement('figcaption');caption.textContent=locale==='mn'?({camp:'Бууцны өглөө',rider:'Талын морьтон',craft:'Урлахуйн ухаан',welcome:'Зочломтгой тал'}[scene]):({camp:'Morning at camp',rider:'A rider of the steppe',craft:'The art of making',welcome:'A steppe welcome'}[scene]);figure.append(image,caption);return figure;}
export function projectScene(index:number):FolioScene{return(['camp','rider','craft','welcome'] as FolioScene[])[index%4];}
