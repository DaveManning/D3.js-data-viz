import { describe, it, expect } from 'vitest';
import { scatterPlot } from './scatter';
import { render } from '@/core/embed';
import type { Datum } from '@/types';

const data: Datum[] = [
  { tv: 230, sales: 22, region: 'N' },
  { tv: 44, sales: 10, region: 'S' },
  { tv: 17, sales: 9, region: 'S' },
];

describe('scatterPlot', () => {
  it('maps fields to axis labels', () => {
    const spec = scatterPlot(data, { x: 'tv', y: 'sales' });
    expect(spec.x?.label).toBe('tv');
    expect(spec.y?.label).toBe('sales');
    expect(spec.color).toBeUndefined();
  });

  it('adds a color legend when color is given', () => {
    const spec = scatterPlot(data, { x: 'tv', y: 'sales', color: 'region' });
    expect(spec.color).toMatchObject({ legend: true });
  });

  it('renders one point per datum into the DOM', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    render(el, scatterPlot(data, { x: 'tv', y: 'sales' }));
    expect(el.querySelectorAll('svg circle').length).toBeGreaterThanOrEqual(data.length);
  });
});
