import type { TopLevelSpec } from 'vega-lite';
import type { BaseChartOptions, Datum } from '@/types';

export interface BarOptions extends BaseChartOptions {
  /** Field for the categorical (nominal) axis. */
  x: string;
  /** Field for the quantitative axis. */
  y: string;
  /** Optional field to color bars by; defaults to coloring by `x`. */
  color?: string;
  /** Render horizontally (swap x/y). Defaults to vertical bars. */
  horizontal?: boolean;
}

/**
 * Bar chart spec factory — the reference implementation of the project's chart
 * contract: a pure function from data + options to a Vega-Lite spec, with no
 * rendering side effects. See docs/ARCHITECTURE.md.
 */
export function barChart(data: Datum[], options: BarOptions): TopLevelSpec {
  const { x, y, color, horizontal, title, width = 'container', height } = options;

  const cat = { field: x, type: 'nominal' as const, title: x };
  const quant = { field: y, type: 'quantitative' as const, title: y };

  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    ...(title ? { title } : {}),
    width,
    ...(height ? { height } : {}),
    data: { values: data },
    mark: { type: 'bar', cornerRadiusEnd: 4 },
    encoding: {
      x: horizontal ? quant : cat,
      y: horizontal ? cat : quant,
      color: {
        field: color ?? x,
        type: 'nominal',
        legend: color ? undefined : null,
      },
      tooltip: [cat, quant],
    },
  };
}
