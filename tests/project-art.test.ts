// @vitest-environment jsdom
import {it,expect} from 'vitest';
import {projects} from '../src/content/projects';
import {projectArtCell,createProjectArt} from '../src/ui/project-art';
import {stationNames} from '../src/content/station-names';
import {renderContact} from '../src/ui/contact';
it('assigns sixteen distinct manuscript miniatures and Mongolian station names',()=>{const cells=projects.map(p=>projectArtCell(p.id).index);expect(new Set(cells).size).toBe(16);for(const p of projects){expect(stationNames[p.id].length).toBeGreaterThan(3);const a=createProjectArt(p.id,'mn'),b=createProjectArt(p.id,'mn');expect(a.querySelector<HTMLElement>('.folio-scene')?.style.backgroundPosition).toBe(b.querySelector<HTMLElement>('.folio-scene')?.style.backgroundPosition);expect(a.querySelector('[role=img]')?.getAttribute('aria-label')).toContain('гараар зурсан');}});
it('keeps contact concise with two working user-controlled links',()=>{const host=document.createElement('div');renderContact(host,'mn');expect(host.querySelectorAll('a')).toHaveLength(2);expect(host.querySelector('a[href="https://t.me/boroobro"]')).not.toBeNull();expect(host.querySelector('a[href="mailto:business@rainy.studio"]')).not.toBeNull();expect(host.textContent!.length).toBeLessThan(150);expect(host.querySelector('.about-prose')).toBeNull();});
