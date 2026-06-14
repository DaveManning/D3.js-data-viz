import type * as Plot from '@observablehq/plot';
import type { BaseChartOptions } from '@/types';

/**
 * Build the top-level Plot options shared by every chart factory: the optional
 * title, and width/height resolved as option value → per-chart default → left
 * to the theme. Keeps that boilerplate in one place instead of repeated in each
 * factory's return.
 */
export function frame(
  options: BaseChartOptions,
  defaults: { width?: number; height?: number } = {},
): Plot.PlotOptions {
  const spec: Plot.PlotOptions = {};

  if (options.title !== undefined) spec.title = options.title;

  const width = options.width ?? defaults.width;
  if (width !== undefined) spec.width = width;

  const height = options.height ?? defaults.height;
  if (height !== undefined) spec.height = height;

  return spec;
}
