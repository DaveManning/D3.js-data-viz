import type { Datum } from '@/types';
import { resolveElement } from '@/utils/dom';

export interface TableOptions {
  /** Columns to show, in order. Defaults to the keys of the first row. */
  columns?: string[];
  /** Called when a row is clicked; makes rows interactive. */
  onRowClick?: (row: Datum, index: number) => void;
  /** Index of the row to mark as selected (adds the `is-selected` class). */
  selectedIndex?: number;
}

/**
 * Render `data` as a simple HTML table. A custom UI component (Plot doesn't do
 * tables) and a building block for StoryPanel and dashboards.
 */
export function renderTable(
  el: HTMLElement | string,
  data: Datum[],
  options: TableOptions = {},
): HTMLTableElement {
  const target = resolveElement(el);
  const columns = options.columns ?? (data.length ? Object.keys(data[0]) : []);

  const table = document.createElement('table');
  table.className = 'viz-table';

  const thead = table.createTHead();
  const headRow = thead.insertRow();
  for (const column of columns) {
    const th = document.createElement('th');
    th.textContent = column;
    headRow.append(th);
  }

  const tbody = table.createTBody();
  data.forEach((row, index) => {
    const tr = tbody.insertRow();
    for (const column of columns) {
      const td = tr.insertCell();
      const value = row[column];
      td.textContent = value == null ? '' : String(value);
    }
    if (index === options.selectedIndex) tr.classList.add('is-selected');
    if (options.onRowClick) {
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', () => options.onRowClick!(row, index));
    }
  });

  target.replaceChildren(table);
  return table;
}
