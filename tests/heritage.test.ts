// @vitest-environment jsdom
import {it,expect} from 'vitest';
import {renderHeritage} from '../src/ui/heritage';
import {heritageNotes,heritageSources} from '../src/content/heritage';
it('renders six researched notes with navigable attributed sources',()=>{const host=document.createElement('div');renderHeritage(host,'mn');expect(host.querySelectorAll('.heritage-grid article')).toHaveLength(6);expect(host.querySelectorAll('a')).toHaveLength(6);for(const [i,a] of [...host.querySelectorAll('a')].entries()){expect(a.href).toBe(heritageSources[heritageNotes[i].source].url);expect(a.rel).toContain('noopener');expect(a.textContent).toContain('↗');}expect(host.textContent).toContain('хятад үсгээр галигласан');expect(host.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');});
