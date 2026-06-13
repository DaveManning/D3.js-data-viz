import { describe, it, expect } from 'vitest';
import { compile, type TopLevelSpec } from 'vega-lite';
import { barChart } from './bar';
import type { Datum } from '@/types';

/** barChart always returns a unit spec; narrow the union so `.encoding` is typed. */
type UnitSpec = Extract<TopLevelSpec, { mark: unknown }>;

const data: Datum[] = [
  { category: 'A', value: 30 },
  { category: 'B', value: 80 },
  { category: 'C', value: 45 },
];

describe('barChart', () => {
  it('maps options to encodings', () => {
    const spec = barChart(data, { x: 'category', y: 'value' }) as UnitSpec;
    expect(spec.encoding?.x).toMatchObject({ field: 'category', type: 'nominal' });
    expect(spec.encoding?.y).toMatchObject({ field: 'value', type: 'quantitative' });
    expect(spec.data).toEqual({ values: data });
  });

  it('swaps axes when horizontal', () => {
    const spec = barChart(data, { x: 'category', y: 'value', horizontal: true }) as UnitSpec;
    expect(spec.encoding?.x).toMatchObject({ field: 'value', type: 'quantitative' });
    expect(spec.encoding?.y).toMatchObject({ field: 'category', type: 'nominal' });
  });

  it('produces a spec Vega-Lite can compile headlessly', () => {
    const spec = barChart(data, { x: 'category', y: 'value', title: 'Demo' });
    // compile() throws on an invalid spec — this is the real contract test.
    const { spec: vegaSpec } = compile(spec);
    expect(vegaSpec.marks?.length).toBeGreaterThan(0);
  });
});
