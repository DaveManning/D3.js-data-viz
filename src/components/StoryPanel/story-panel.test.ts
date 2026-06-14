import { describe, it, expect } from 'vitest';
import { renderStoryPanel } from './story-panel';

describe('renderStoryPanel', () => {
  it('renders a heading and one paragraph per line', () => {
    const el = document.createElement('div');
    renderStoryPanel(el, { heading: 'Pricing', lines: ['Score: 3.1', 'Top: cash'] });
    expect(el.querySelector('.viz-story h3')?.textContent).toBe('Pricing');
    expect(el.querySelectorAll('.viz-story p').length).toBe(2);
  });

  it('replaces prior content on re-render', () => {
    const el = document.createElement('div');
    renderStoryPanel(el, { heading: 'A', lines: ['one'] });
    renderStoryPanel(el, { heading: 'B', lines: ['two', 'three'] });
    expect(el.querySelectorAll('.viz-story').length).toBe(1);
    expect(el.querySelector('h3')?.textContent).toBe('B');
    expect(el.querySelectorAll('p').length).toBe(2);
  });
});
