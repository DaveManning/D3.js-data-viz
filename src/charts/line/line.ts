import * as Plot from '@observablehq/plot';
import type { BaseChartOptions, Datum } from '@/types';

export interface LineOptions extends BaseChartOptions {
  /** Field for the x axis (temporal or quantitative — Plot infers the scale). */
  x: string;
  /** Field for the y axis. */
  y: string;
  /** Optional field to split into multiple colored lines. */
  series?: string;
}

const LINE_STROKE = '#6366f1';

/**
 * Line chart factory. A single line by default; pass `series` to draw one
 * colored line per group. Returns a Plot spec; render through `core/embed`.
 */
export function lineChart(data: Datum[], options: LineOptions): Plot.PlotOptions {
  const { x, y, series, title, width, height = 360 } = options;
  const stroke = series ?? LINE_STROKE;

  const marks: Plot.Markish[] = [
    Plot.lineY(data, { x, y, stroke, marker: 'circle' }),
    Plot.tip(data, Plot.pointerX({ x, y, ...(series ? { stroke: series } : {}) })),
  ];

  return {
    ...(title !== undefined ? { title } : {}),
    width: width ?? 760,
    height,
    ...(series ? { color: { legend: true } } : {}),
    x: { label: null },
    y: { label: y, grid: true },
    marks,
  };
}
