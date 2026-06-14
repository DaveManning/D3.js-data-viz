import { resolveElement } from '@/utils/dom';

export interface SelectFilterOptions {
  /** Option values to choose from. */
  values: string[];
  /** Optional label shown beside the select. */
  label?: string;
  /** Initially selected value (defaults to the first). */
  value?: string;
  /** Called with the new value whenever the selection changes. */
  onChange: (value: string) => void;
}

export interface FilterHandle {
  /** The current selected value. */
  value(): string;
  /** Remove the control from the DOM. */
  destroy(): void;
}

/**
 * A labelled `<select>` control. Emits the chosen value through `onChange`;
 * dashboards wire that to re-render a chart or table. Pure DOM — no chart
 * dependency — so it composes with anything.
 */
export function createSelectFilter(
  el: HTMLElement | string,
  options: SelectFilterOptions,
): FilterHandle {
  const target = resolveElement(el);

  const wrap = document.createElement('label');
  wrap.className = 'viz-filter';

  if (options.label) {
    const span = document.createElement('span');
    span.textContent = options.label;
    wrap.append(span);
  }

  const select = document.createElement('select');
  for (const value of options.values) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
  select.value = options.value ?? options.values[0] ?? '';
  select.addEventListener('change', () => options.onChange(select.value));

  wrap.append(select);
  target.append(wrap);

  return {
    value: () => select.value,
    destroy: () => wrap.remove(),
  };
}
