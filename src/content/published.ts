import {validateDocument,visibleProjects,type ContentDocument} from './live';
export async function loadPublishedContent():Promise<ContentDocument>{
 const response=await fetch('/api/content',{cache:'no-store',credentials:'same-origin',signal:AbortSignal.timeout(8000)});
 if(!response.ok)throw new Error('Бүтээлийн мэдээллийг серверээс уншиж чадсангүй.');
 const document=validateDocument(await response.json());return{...document,projects:visibleProjects(document)};
}
