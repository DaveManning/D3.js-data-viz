import { describe, it, expect, vi } from 'vitest';
import { createSelectFilter } from './filters';

describe('createSelectFilter', () => {
  it('renders an option per value and selects the first by default', () => {
    const el = document.createElement('div');
    createSelectFilter(el, { values: ['TV', 'radio', 'newspaper'], onChange: () => {} });
    const select = el.querySelector('select')!;
    expect(select.querySelectorAll('option').length).toBe(3);
    expect(select.value).toBe('TV');
  });

  it('honours an explicit initial value and a label', () => {
    const el = document.createElement('div');
    const handle = createSelectFilter(el, {
      values: ['a', 'b'],
      value: 'b',
      label: 'Channel',
      onChange: () => {},
    });
    expect(el.querySelector('span')?.textContent).toBe('Channel');
    expect(handle.value()).toBe('b');
  });

  it('fires onChange with the new value', () => {
    const el = document.createElement('div');
    const onChange = vi.fn();
    createSelectFilter(el, { values: ['a', 'b'], onChange });
    const select = el.querySelector('select')!;
    select.value = 'b';
    select.dispatchEvent(new Event('change'));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
