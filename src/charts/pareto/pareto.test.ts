import { describe, it, expect } from 'vitest';
import { paretoChart, paretoSeries } from './pareto';
import { render } from '@/core/embed';
import type { Datum } from '@/types';

const data: Datum[] = [
  { name: 'B', amount: 20 },
  { name: 'A', amount: 50 },
  { name: 'C', amount: 30 },
];

describe('paretoSeries', () => {
  it('sorts by value descending', () => {
    const series = paretoSeries(data, 'name', 'amount');
    expect(series.map((r) => r.category)).toEqual(['A', 'C', 'B']);
  });

  it('accumulates to 100% on the last row', () => {
    const series = paretoSeries(data, 'name', 'amount');
    expect(series[0].cumulative).toBeCloseTo(50); // 50/100
    expect(series[1].cumulative).toBeCloseTo(80); // 80/100
    expect(series.at(-1)?.cumulative).toBeCloseTo(100);
  });

  it('drops non-numeric rows and survives an empty/zero total', () => {
    expect(paretoSeries([{ name: 'x', amount: 'n/a' }], 'name', 'amount')).toEqual([]);
    const zero = paretoSeries([{ name: 'x', amount: 0 }], 'name', 'amount');
    expect(zero[0].cumulative).toBe(0);
  });
});

describe('paretoChart', () => {
  it('orders the x domain by descending value', () => {
    const spec = paretoChart(data, { category: 'name', value: 'amount' });
    expect(spec.x?.domain).toEqual(['A', 'C', 'B']);
    expect(spec.marks?.length).toBeGreaterThan(0);
  });

  it('hides the threshold marks when threshold is 0', () => {
    const withThreshold = paretoChart(data, { category: 'name', value: 'amount', threshold: 80 });
    const without = paretoChart(data, { category: 'name', value: 'amount', threshold: 0 });
    expect(without.marks!.length).toBeLessThan(withThreshold.marks!.length);
  });

  it('renders one bar per category into the DOM', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    render(el, paretoChart(data, { category: 'name', value: 'amount' }));
    expect(el.querySelectorAll('svg rect').length).toBeGreaterThanOrEqual(data.length);
    // the cumulative line should be present as a path
    expect(el.querySelectorAll('svg path').length).toBeGreaterThan(0);
  });
});
