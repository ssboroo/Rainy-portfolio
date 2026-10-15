import type {Locale} from '../content/projects';
import {profile} from '../content/profile';
export function renderContact(container:HTMLElement,locale:Locale){
 const card=document.createElement('div');card.className='contact-card';
 const name=document.createElement('strong');name.textContent='RAINY';const subtitle=document.createElement('p');subtitle.textContent=locale==='mn'?'Сайн дурын хөгжүүлэгч · Монгол':'Volunteer developer · Mongolia';
 const links=document.createElement('div');links.className='contact-actions';const telegram=document.createElement('a');telegram.className='primary-button';telegram.href=profile.telegram;telegram.target='_blank';telegram.rel='noopener noreferrer';telegram.textContent='Telegram ↗';
 const email=document.createElement('a');email.className='text-button';email.href='mailto:'+profile.email;email.textContent=profile.email;
 const note=document.createElement('small');note.textContent=locale==='mn'?'Ажлын санал, хамтын ажиллагаа':'Business enquiries & collaboration';
 links.append(telegram,email);card.append(name,subtitle,links,note);container.append(card);
}
