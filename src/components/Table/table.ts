import type { Datum } from '@/types';
import { resolveElement } from '@/utils/dom';

export interface TableOptions {
  /** Columns to show, in order. Defaults to the keys of the first row. */
  columns?: string[];
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
  for (const row of data) {
    const tr = tbody.insertRow();
    for (const column of columns) {
      const td = tr.insertCell();
      const value = row[column];
      td.textContent = value == null ? '' : String(value);
    }
  }

  target.replaceChildren(table);
  return table;
}
