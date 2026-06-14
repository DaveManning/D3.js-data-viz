import { describe, it, expect } from 'vitest';
import { advertisingExplorer } from './advertising-explorer';

describe('advertisingExplorer', () => {
  it('mounts a channel selector, a chart, and a table', () => {
    const el = document.createElement('div');
    document.body.append(el);
    advertisingExplorer(el);

    expect(el.querySelectorAll('select option').length).toBe(3);
    expect(el.querySelectorAll('svg').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('table tbody tr').length).toBe(10);
  });

  it('re-renders the chart when the channel changes', () => {
    const el = document.createElement('div');
    document.body.append(el);
    advertisingExplorer(el);

    const select = el.querySelector('select')!;
    select.value = 'radio';
    select.dispatchEvent(new Event('change'));

    // a fresh chart is rendered; the title reflects the new channel
    expect(el.textContent).toContain('radio spend vs. sales');
    expect(el.querySelectorAll('svg').length).toBeGreaterThan(0);
  });
});
