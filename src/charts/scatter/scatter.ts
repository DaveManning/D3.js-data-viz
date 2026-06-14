import * as Plot from '@observablehq/plot';
import type { Datum } from '@/types';
import type { XYOptions } from '@/specs/options';
import { frame } from '@/core/spec';

export interface ScatterOptions extends XYOptions {
  /** Optional field to color points by. */
  color?: string;
  /** Optional field controlling point radius. */
  size?: string;
  /** Optional field to label each point. */
  label?: string;
}

const DOT_FILL = '#6366f1';

/**
 * Scatter plot factory. `color`, `size`, and `label` are optional extra
 * encodings. Returns a Plot spec; render through `core/embed`.
 */
export function scatterPlot(data: Datum[], options: ScatterOptions): Plot.PlotOptions {
  const { x, y, color, size, label } = options;

  const marks: Plot.Markish[] = [
    Plot.dot(data, {
      x,
      y,
      fill: color ?? DOT_FILL,
      ...(size ? { r: size } : {}),
      fillOpacity: 0.7,
      tip: true,
    }),
  ];

  if (label) {
    marks.push(Plot.text(data, { x, y, text: label, dy: -8, fontSize: 9, fill: '#475569' }));
  }

  return {
    ...frame(options, { width: 640, height: 420 }),
    ...(color ? { color: { legend: true } } : {}),
    x: { label: x, grid: true },
    y: { label: y, grid: true },
    marks,
  };
}
