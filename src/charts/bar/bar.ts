import * as Plot from '@observablehq/plot';
import type { Datum } from '@/types';
import type { XYOptions } from '@/specs/options';
import { frame } from '@/core/spec';

export interface BarOptions extends XYOptions {
  /** Optional field to color bars by; defaults to coloring by the category. */
  color?: string;
  /** Render horizontally (swap the axes). Defaults to vertical bars. */
  horizontal?: boolean;
}

/**
 * Bar chart factory — the reference implementation of the project's chart
 * contract: a pure function from data + options to a Plot spec (the options
 * object for `Plot.plot()`), with no rendering side effects. Render it through
 * `core/embed`. See docs/ARCHITECTURE.md.
 */
export function barChart(data: Datum[], options: BarOptions): Plot.PlotOptions {
  const { x, y, color, horizontal } = options;
  const fill = color ?? x;

  const bar = horizontal
    ? Plot.barX(data, { x: y, y: x, fill, tip: true, sort: { y: '-x' } })
    : Plot.barY(data, { x, y, fill, tip: true, sort: { x: '-y' } });
  const baseline = horizontal ? Plot.ruleX([0]) : Plot.ruleY([0]);

  return {
    ...frame(options),
    x: { label: horizontal ? y : x },
    y: { label: horizontal ? x : y },
    marks: [bar, baseline],
  };
}
