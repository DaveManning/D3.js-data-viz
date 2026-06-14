import { describe, it, expect, vi } from 'vitest';
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

  it('marks the selected row and fires onRowClick with the datum and index', () => {
    const el = document.createElement('div');
    const onRowClick = vi.fn();
    renderTable(el, data, { selectedIndex: 1, onRowClick });

    const rows = el.querySelectorAll('tbody tr');
    expect(rows[1].classList.contains('is-selected')).toBe(true);

    rows[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onRowClick).toHaveBeenCalledWith(data[0], 0);
  });
});
