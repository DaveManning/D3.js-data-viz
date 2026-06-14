import { describe, it, expect } from 'vitest';
import { barChart } from './bar';
import { render } from '@/core/embed';
import type { Datum } from '@/types';

const data: Datum[] = [
  { category: 'A', value: 30 },
  { category: 'B', value: 80 },
  { category: 'C', value: 45 },
];

describe('barChart', () => {
  it('maps fields to axis labels', () => {
    const spec = barChart(data, { x: 'category', y: 'value' });
    expect(spec.x?.label).toBe('category');
    expect(spec.y?.label).toBe('value');
    expect(spec.marks?.length).toBeGreaterThan(0);
  });

  it('swaps axis labels when horizontal', () => {
    const spec = barChart(data, { x: 'category', y: 'value', horizontal: true });
    expect(spec.x?.label).toBe('value');
    expect(spec.y?.label).toBe('category');
  });

  it('renders one bar per datum into the DOM', () => {
    // The real contract test: the spec actually renders. Needs a DOM (jsdom).
    const el = document.createElement('div');
    document.body.appendChild(el);
    render(el, barChart(data, { x: 'category', y: 'value' }));
    const rects = el.querySelectorAll('svg rect');
    expect(rects.length).toBeGreaterThanOrEqual(data.length);
  });
});
