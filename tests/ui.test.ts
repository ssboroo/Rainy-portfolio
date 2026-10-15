// @vitest-environment jsdom
import {describe,it,expect,beforeEach} from 'vitest';
import {createInput} from '../src/controls/input';
import {createProjectDialog} from '../src/ui/dialog';
import {projects} from '../src/content/projects';
beforeEach(()=>{document.body.innerHTML='<button id="opener">Open</button><div id="root"></div>';});
describe('controls',()=>{
 it('clears held movement on blur',()=>{const input=createInput(document.getElementById('root')!);window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyW'}));expect(input.read().forward).toBe(1);window.dispatchEvent(new Event('blur'));expect(input.read().forward).toBe(0);input.dispose();});
 it('clears movement with reset',()=>{const input=createInput(document.getElementById('root')!);window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyW'}));input.reset();expect(input.read().forward).toBe(0);input.dispose();});
});
describe('project dialog',()=>{
 it('shows localized work and restores opener focus',()=>{const opener=document.querySelector('button')!;opener.focus();const ui=createProjectDialog(document.getElementById('root')!);ui.open(projects[0],'mn',opener);expect(document.querySelector('h2')?.textContent).toBe(projects[0].title);expect(document.body.textContent).toContain(projects[0].summary.mn);ui.setLocale('en');expect(document.body.textContent).toContain(projects[0].summary.en);document.querySelector('dialog')!.dispatchEvent(new Event('cancel',{cancelable:true}));expect(document.activeElement).toBe(opener);});
 it('omits missing download and source links',()=>{const ui=createProjectDialog(document.getElementById('root')!);ui.open(projects.find(p=>p.id==='pdf')!,'mn',document.querySelector('button')!);expect(document.querySelectorAll('dialog a')).toHaveLength(0);});
});
describe('control lifecycle',()=>{
 it('clears held keys when tab visibility changes',()=>{const input=createInput(document.getElementById('root')!);window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyW'}));expect(input.read().forward).toBe(1);document.dispatchEvent(new Event('visibilitychange'));expect(input.read().forward).toBe(0);input.dispose();});
 it('pauses input while a panel is open',()=>{const input=createInput(document.getElementById('root')!);input.setEnabled(false);window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyW'}));expect(input.read().forward).toBe(0);input.setEnabled(true);expect(input.read().forward).toBe(0);input.dispose();});
 it('cancels the touch joystick',()=>{const root=document.getElementById('root')!;root.innerHTML='<div class="joystick"><span class="stick-knob"></span></div>';const stick=root.querySelector<HTMLElement>('.joystick')!;stick.setPointerCapture=()=>{};stick.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,width:100,height:100,right:100,bottom:100,toJSON:()=>{}});const input=createInput(root);const down=new Event('pointerdown');Object.assign(down,{pointerId:1,clientX:50,clientY:0});stick.dispatchEvent(down);expect(input.read().forward).toBe(1);stick.dispatchEvent(new Event('pointercancel'));expect(input.read().forward).toBe(0);input.dispose();});
});
describe('review regressions',()=>{
 it('does not resume a cancelled drag after input reset',()=>{const root=document.getElementById('root')!;root.innerHTML='<div class="joystick"><span class="stick-knob"></span></div>';const stick=root.querySelector<HTMLElement>('.joystick')!;stick.setPointerCapture=()=>{};stick.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,width:100,height:100,right:100,bottom:100,toJSON:()=>{}});const input=createInput(root);const emit=(type:string)=>{const e=new Event(type);Object.assign(e,{pointerId:1,clientX:50,clientY:0});stick.dispatchEvent(e);};emit('pointerdown');expect(input.read().forward).toBe(1);input.reset();emit('pointermove');expect(input.read().forward).toBe(0);input.dispose();});
 it('returns focus to connected replacement after catalog refresh',()=>{const root=document.getElementById('root')!;const opener=document.querySelector('button')!;opener.dataset.projectOpen=projects[0].id;const ui=createProjectDialog(root);ui.open(projects[0],'mn',opener);const replacement=document.createElement('button');replacement.dataset.projectOpen=projects[0].id;opener.replaceWith(replacement);ui.close();expect(document.activeElement).toBe(replacement);});
 it('keeps focus inside open dialog when language changes',()=>{const ui=createProjectDialog(document.getElementById('root')!);ui.open(projects[0],'mn',document.querySelector('button')!);ui.setLocale('en');expect(document.querySelector('dialog')!.contains(document.activeElement)).toBe(true);});
});

import {renderContact} from '../src/ui/contact';
it('provides real contact links without pretending to send a message',()=>{const root=document.getElementById('root')!;renderContact(root,'mn');expect(root.querySelector('a[href="https://t.me/boroobro"]')).toBeTruthy();expect(root.querySelector('a[href="mailto:business@rainy.studio"]')).toBeTruthy();expect(root.querySelector('form')).toBeNull();});
import {renderProjectBook} from '../src/ui/book';
it('turns manuscript pages and resets pagination when filtering projects',()=>{const root=document.getElementById('root')!;renderProjectBook(root,projects,'mn',p=>{const el=document.createElement('article');el.dataset.id=p.id;el.textContent=p.title;return el;});expect(root.querySelectorAll('article')).toHaveLength(4);const pager=root.querySelector('.book-pager')!;const buttons=pager.querySelectorAll('button');expect(buttons[0].disabled).toBe(true);buttons[1].click();expect(root.querySelector('article')?.dataset.id).toBe(projects[4].id);root.querySelector<HTMLButtonElement>('[data-kind="software"]')!.click();expect(pager.textContent).toContain('Хуудас 1 /');expect(buttons[0].disabled).toBe(true);});

import {markerRect,overlapsMarker} from '../src/ui/markers';
it('keeps uniform station plaques from covering another visible plaque',()=>{const first=markerRect(300,300,false);expect(first.right-first.left).toBe(196);expect(overlapsMarker(markerRect(310,300,false),[first])).toBe(true);expect(overlapsMarker(markerRect(600,300,false),[first])).toBe(false);expect(markerRect(100,200,true).right-markerRect(100,200,true).left).toBe(164);});
