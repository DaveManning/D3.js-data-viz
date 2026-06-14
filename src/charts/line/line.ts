import * as Plot from '@observablehq/plot';
import type { Datum } from '@/types';
import type { XYOptions } from '@/specs/options';
import { frame } from '@/core/spec';

export interface LineOptions extends XYOptions {
  /** Optional field to split into multiple colored lines. */
  series?: string;
}

const LINE_STROKE = '#6366f1';

/**
 * Line chart factory. A single line by default; pass `series` to draw one
 * colored line per group. Returns a Plot spec; render through `core/embed`.
 */
export function lineChart(data: Datum[], options: LineOptions): Plot.PlotOptions {
  const { x, y, series } = options;
  const stroke = series ?? LINE_STROKE;

  const marks: Plot.Markish[] = [
    Plot.lineY(data, { x, y, stroke, marker: 'circle' }),
    Plot.tip(data, Plot.pointerX({ x, y, ...(series ? { stroke: series } : {}) })),
  ];

  return {
    ...frame(options, { width: 760, height: 360 }),
    ...(series ? { color: { legend: true } } : {}),
    x: { label: null },
    y: { label: y, grid: true },
    marks,
  };
}
