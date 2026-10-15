// @vitest-environment jsdom
import {it,expect} from 'vitest';
import {createFolioArt,projectScene,setFolioSource} from '../src/ui/folio-art';
it('shows described Mongolian scenes with local prepared imagery and four variants',()=>{setFolioSource('blob:prepared-folio');expect(new Set([0,1,2,3].map(projectScene)).size).toBe(4);const art=createFolioArt('welcome','mn');expect(art.querySelector('[role=img]')?.getAttribute('aria-label')).toContain('Цай');expect(art.querySelector<HTMLElement>('.folio-scene')?.style.backgroundImage).toContain('blob:prepared-folio');expect(art.querySelector('figcaption')?.textContent).toBe('Зочломтгой тал');});
