import { describe, it, expect } from 'vitest';
import { getChart, chartNames, renderChart } from './registry';
import '@/charts'; // side-effect import registers the built-in charts
import type { Datum } from '@/types';

const data: Datum[] = [
  { cat: 'A', val: 3 },
  { cat: 'B', val: 5 },
];

describe('registry', () => {
  it('registers the built-in charts', () => {
    expect(chartNames()).toEqual(expect.arrayContaining(['bar', 'pareto', 'line', 'scatter']));
  });

  it('getChart returns a factory that builds a spec', () => {
    const spec = getChart('scatter')([{ a: 1, b: 2 }], { x: 'a', y: 'b' });
    expect(spec.marks?.length).toBeGreaterThan(0);
  });

  it('throws a helpful error for an unknown chart', () => {
    expect(() => getChart('nope')).toThrow(/Unknown chart "nope"/);
  });

  it('renderChart builds by name and mounts into the DOM', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    renderChart(el, 'bar', data, { x: 'cat', y: 'val' });
    expect(el.querySelectorAll('svg rect').length).toBeGreaterThan(0);
  });
});
