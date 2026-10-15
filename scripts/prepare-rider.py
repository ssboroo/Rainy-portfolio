"""Repackage authorized CC0 full rider with web-sized textures; preserve the full skin/rig."""
import json,struct,io,sys
from pathlib import Path
from PIL import Image
source=Path(sys.argv[1] if len(sys.argv)>1 else '/tmp/sam.glb').read_bytes();length=struct.unpack_from('<I',source,12)[0]
j=json.loads(source[20:20+length]);blob=source[28+length:];replacements={}
for image in j['images']:
 index=image['bufferView'];view=j['bufferViews'][index];raw=blob[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']]
 im=Image.open(io.BytesIO(raw));name=image.get('name','')
 limit=2048 if ('skin' in name or 'diffuse2' in name or 'normal' in name) else 1024
 im.thumbnail((limit,limit),Image.Resampling.LANCZOS)
 out=io.BytesIO()
 if im.mode=='RGB' and 'normal' not in name:
  im.save(out,format='JPEG',quality=94,subsampling=0);image['mimeType']='image/jpeg'
 else:im.save(out,format='PNG',optimize=True)
 replacements[index]=out.getvalue()
parts=[];offset=0
for index,view in enumerate(j['bufferViews']):
 raw=replacements.get(index,blob[view.get('byteOffset',0):view.get('byteOffset',0)+view['byteLength']]);pad=(-offset)%4
 if pad:parts.append(b'\0'*pad);offset+=pad
 view['byteOffset']=offset;view['byteLength']=len(raw);parts.append(raw);offset+=len(raw)
j['buffers'][0]['byteLength']=offset
# Full texture/rig remains, held phone removed at runtime. Authored walking clips stay available.
j['asset']['copyright']='Innerscene / MakeHuman / MPFB — CC0. Recolored and posed for BOROO.'
text=json.dumps(j,separators=(',',':')).encode();text+=b' '*((-len(text))%4);binary=b''.join(parts);binary+=b'\0'*((-len(binary))%4)
result=struct.pack('<III',0x46546c67,2,28+len(text)+len(binary))+struct.pack('<II',len(text),0x4e4f534a)+text+struct.pack('<II',len(binary),0x004e4942)+binary
Path('public/assets/rider.glb').write_bytes(result)
print('Full textured rider:',len(result),'bytes')
