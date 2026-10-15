"""Create a 4:34 ambient arrangement from the credited CC BY morin-khuur motif.
Requires ffmpeg (rubberband) and numpy. Input is the original Qleq 6.857s preview.
Not a new live performance: repeated/transposed source motif + original soft pads/wind.
"""
import sys,subprocess,numpy as np
rate=22050;beat=60/70;duration=320*beat;n=int(duration*rate)
source=sys.argv[1];out=sys.argv[2]
def phrase(semitones):
 raw=subprocess.check_output(['ffmpeg','-v','error','-i',source,'-af',f'rubberband=pitch={2**(semitones/12)},highpass=f=95,lowpass=f=5600','-ar',str(rate),'-ac','2','-f','f32le','-'])
 a=np.frombuffer(raw,dtype='<f4').reshape(-1,2).copy();fade=min(900,len(a)//4);a[:fade]*=np.linspace(0,1,fade)[:,None];a[-fade:]*=np.linspace(1,0,fade)[:,None];return a
phrases={s:phrase(s) for s in [0,7,-5]};mix=np.zeros((n,2),np.float32)
# 8-beat motif phrases breathe between entrances; sections swell and recede.
pattern=[0,None,0,7,0,None,-5,0,0,7,None,0,-5,None,0,None]
for k in range(38):
 semi=pattern[k%len(pattern)]
 if semi is None:continue
 start=int((8+k*8)*beat*rate);a=phrases[semi];length=min(len(a),n-start)
 if length<=0:break
 gain=.50+.11*np.sin(k*.51);mix[start:start+length]+=a[:length]*gain
 # Short, low-level stereo space is baked in and costs no browser DSP.
 for delay,volume in [(.17,.10),(.31,.07),(.57,.035)]:
  at=start+int(delay*rate);ln=min(length,n-at)
  if ln>0:mix[at:at+ln]+=a[:ln,::-1]*gain*volume
# Infer tonic from the real instrument's low-frequency energy, then add a quiet fifth.
a=phrases[0].mean(axis=1);spec=np.abs(np.fft.rfft(a));freq=np.fft.rfftfreq(len(a),1/rate);spec[(freq<90)|(freq>260)]=0;tonic=freq[np.argmax(spec)]
t=np.arange(n,dtype=np.float32)/rate
for frequency,gain in [(tonic/2,.009),(tonic,.006),(tonic*1.5,.004)]:
 env=(.5-.5*np.cos(t*np.pi/38))*(.65+.35*np.sin(t*.037)**2)
 for channel in [0,1]:mix[:,channel]+=gain*env*np.sin(2*np.pi*frequency*t+.012*np.sin(t*.55+channel))
# Gentle filtered stereo wind, deterministic and unobtrusive.
rng=np.random.default_rng(79)
for channel in [0,1]:
 knots=rng.normal(0,.0025,n//160+2);mix[:,channel]+=np.interp(np.arange(n)/160,np.arange(len(knots)),knots).astype(np.float32)
fade=int(8*rate);mix[:fade]*=np.linspace(0,1,fade)[:,None];mix[-fade:]*=np.linspace(1,0,fade)[:,None];mix=np.tanh(mix*1.3);peak=np.max(np.abs(mix));mix*=.8/max(.8,peak)
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(rate),'-ac','2','-i','-','-c:a','libmp3lame','-b:a','96k','-metadata','title=BOROO — Steppe Ambient Arrangement','-metadata','artist=Qleq motif / BOROO arrangement',out],input=mix.astype('<f4').tobytes(),check=True)
print(f'Arrangement: {duration:.1f}s, peak {np.max(np.abs(mix)):.3f}; original motif remains credited.')
