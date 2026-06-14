import { describe, it, expect, beforeEach } from 'vitest';
import { painPointExplorer } from './pain-point-explorer';
import { getUrlParam } from '@/core/persist';

describe('painPointExplorer', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/'); // isolate URL state between tests
  });

  it('renders a table, a chart, and a story panel', () => {
    const el = document.createElement('div');
    document.body.append(el);
    painPointExplorer(el);

    expect(el.querySelectorAll('table tbody tr').length).toBe(10);
    expect(el.querySelectorAll('svg').length).toBeGreaterThan(0);
    expect(el.querySelector('.viz-story h3')).toBeTruthy();
  });

  it('updates the linked views when a different row is selected', () => {
    const el = document.createElement('div');
    document.body.append(el);
    painPointExplorer(el);

    const before = el.querySelector('.viz-story h3')?.textContent;
    const rows = el.querySelectorAll('table tbody tr');
    // click a row that isn't the default selection (default is row 0)
    rows[3].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const after = el.querySelector('.viz-story h3')?.textContent;
    expect(after).not.toBe(before);
    // the newly clicked row is now marked selected
    expect(el.querySelectorAll('table tbody tr')[3].classList.contains('is-selected')).toBe(true);
  });

  it('persists the selection to the URL when a row is clicked', () => {
    const el = document.createElement('div');
    document.body.append(el);
    painPointExplorer(el);

    const rows = el.querySelectorAll('table tbody tr');
    const label = rows[2].querySelector('td')?.textContent;
    rows[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(getUrlParam('painPoint')).toBe(label);
  });

  it('restores the selection from the URL on load', () => {
    window.history.replaceState(null, '', '/?painPoint=Field%20workforce');
    const el = document.createElement('div');
    document.body.append(el);
    painPointExplorer(el);

    const selected = el.querySelector('table tbody tr.is-selected td')?.textContent;
    expect(selected).toBe('Field workforce');
  });
});
