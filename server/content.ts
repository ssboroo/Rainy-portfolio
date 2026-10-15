import {seedDocument,validateDocument,type ContentDocument} from '../src/content/live';
export type ContentBucket={get(key:string):Promise<{text():Promise<string>;etag:string}|null>;put(key:string,value:string,options:unknown):Promise<unknown>};
const key='portfolio/content-v1.json';
export async function readContent(bucket:ContentBucket){if(!bucket)throw new Error('STORAGE_UNAVAILABLE');const object=await bucket.get(key);return object?{document:validateDocument(JSON.parse(await object.text())),etag:object.etag}:{document:seedDocument(),etag:null};}
export async function writeContent(bucket:ContentBucket,input:unknown,expectedRevision:number){
 const next=validateDocument(input),current=await readContent(bucket);
 if(current.document.revision!==expectedRevision||next.revision!==expectedRevision)throw new Error('CONFLICT');
 next.revision=expectedRevision+1;
 const result=await bucket.put(key,JSON.stringify(next),{onlyIf:current.etag?{etagMatches:current.etag}:{etagDoesNotMatch:'*'},httpMetadata:{contentType:'application/json'}});
 if(!result)throw new Error('CONFLICT');return{document:next};
}
