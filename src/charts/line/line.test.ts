import { describe, it, expect } from 'vitest';
import { lineChart } from './line';
import { render } from '@/core/embed';
import type { Datum } from '@/types';

const data: Datum[] = [
  { t: 1, v: 10 },
  { t: 2, v: 14 },
  { t: 3, v: 12 },
];

describe('lineChart', () => {
  it('builds a single-line spec by default (no color legend)', () => {
    const spec = lineChart(data, { x: 't', y: 'v' });
    expect(spec.marks?.length).toBeGreaterThan(0);
    expect(spec.color).toBeUndefined();
  });

  it('enables a color legend when a series is given', () => {
    const spec = lineChart(data, { x: 't', y: 'v', series: 'group' });
    expect(spec.color).toMatchObject({ legend: true });
  });

  it('renders a line path into the DOM', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    render(el, lineChart(data, { x: 't', y: 'v' }));
    expect(el.querySelectorAll('svg path').length).toBeGreaterThan(0);
  });
});
