import * as Plot from '@observablehq/plot';
import type { BaseChartOptions, Datum } from '@/types';

export interface ParetoOptions extends BaseChartOptions {
  /** Field naming each category. */
  category: string;
  /** Field holding the value to rank and accumulate. */
  value: string;
  /** Cumulative-% threshold marker (the "vital few" cutoff). 0 hides it. Default 80. */
  threshold?: number;
}

/** A category with its value and the running cumulative percentage of the total. */
export interface ParetoRow {
  category: string;
  value: number;
  cumulative: number;
}

const BAR_FILL = '#6366f1';
const LINE_STROKE = '#ef4444';
const THRESHOLD_STROKE = '#64748b';

/**
 * The defining computation of a Pareto chart: drop non-numeric rows, sort by
 * value descending, and accumulate each row's share of the total. Pure and
 * unit-testable, independent of any rendering.
 */
export function paretoSeries(data: Datum[], category: string, value: string): ParetoRow[] {
  const rows = data
    .map((d) => ({ category: String(d[category]), value: Number(d[value]) }))
    .filter((r) => Number.isFinite(r.value))
    .sort((a, b) => b.value - a.value);

  const total = rows.reduce((sum, r) => sum + r.value, 0);
  let running = 0;
  return rows.map((r) => {
    running += r.value;
    return { ...r, cumulative: total ? (running / total) * 100 : 0 };
  });
}

/**
 * Pareto chart factory — sorted bars on the left value scale plus a cumulative-%
 * line on a right-hand axis, with an optional threshold marker. Returns a Plot
 * spec; render it through `core/embed`. See docs/ARCHITECTURE.md.
 *
 * Plot has a single y scale, so the cumulative line is mapped into the value
 * scale (`toScale`) and a second, right-anchored axis relabels those positions
 * as percentages.
 */
export function paretoChart(data: Datum[], options: ParetoOptions): Plot.PlotOptions {
  const { category, value, threshold = 80, title, width, height = 440 } = options;

  const series = paretoSeries(data, category, value);
  const order = series.map((r) => r.category);
  const maxValue = series.length ? series[0].value : 0;
  const toScale = (pct: number) => (maxValue ? (pct / 100) * maxValue : 0);

  const marks: Plot.Markish[] = [
    Plot.barY(series, { x: 'category', y: 'value', fill: BAR_FILL, tip: true }),
    Plot.ruleY([0]),
    Plot.line(series, {
      x: 'category',
      y: (d: ParetoRow) => toScale(d.cumulative),
      stroke: LINE_STROKE,
      strokeWidth: 2,
      marker: 'circle',
    }),
  ];

  if (threshold > 0) {
    marks.push(
      Plot.ruleY([toScale(threshold)], { stroke: THRESHOLD_STROKE, strokeDasharray: '4,4' }),
      Plot.text([{ label: `${threshold}% threshold` }], {
        x: order[0],
        y: toScale(threshold),
        text: 'label',
        dy: -6,
        textAnchor: 'start',
        fill: THRESHOLD_STROKE,
        fontWeight: 600,
      }),
    );
  }

  marks.push(
    Plot.axisY([0, 20, 40, 60, 80, 100].map(toScale), {
      anchor: 'right',
      tickFormat: (y: number) => `${Math.round((y / (maxValue || 1)) * 100)}%`,
      label: 'Cumulative %',
    }),
  );

  return {
    ...(title !== undefined ? { title } : {}),
    width: width ?? 860,
    height,
    marginBottom: 90,
    marginRight: 56,
    x: { domain: order, label: null, tickRotate: -20 },
    y: { domain: [0, maxValue], label: value, grid: true },
    marks,
  };
}
