import { describe, it, expect } from 'vitest';
import { renderTable } from './table';
import type { Datum } from '@/types';

const data: Datum[] = [
  { market: 1, sales: 22.1, TV: 230.1 },
  { market: 2, sales: 10.4, TV: 44.5 },
];

describe('renderTable', () => {
  it('renders a header per column and a row per datum', () => {
    const el = document.createElement('div');
    renderTable(el, data);
    expect(el.querySelectorAll('thead th').length).toBe(3);
    expect(el.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('respects an explicit column subset and order', () => {
    const el = document.createElement('div');
    renderTable(el, data, { columns: ['sales', 'market'] });
    const headers = [...el.querySelectorAll('thead th')].map((th) => th.textContent);
    expect(headers).toEqual(['sales', 'market']);
    expect(el.querySelector('tbody td')?.textContent).toBe('22.1');
  });

  it('handles empty data', () => {
    const el = document.createElement('div');
    renderTable(el, []);
    expect(el.querySelectorAll('tbody tr').length).toBe(0);
  });
});
