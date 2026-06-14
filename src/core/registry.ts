import type * as Plot from '@observablehq/plot';
import type { Datum } from '@/types';
import { render } from '@/core/embed';

/** A chart factory: pure function from data + options to a Plot spec. */
export type ChartFactory<O = any> = (data: Datum[], options: O) => Plot.PlotOptions;

const registry = new Map<string, ChartFactory>();

/** Register a chart factory under a name (e.g. 'bar', 'pareto'). */
export function registerChart(name: string, factory: ChartFactory): void {
  registry.set(name, factory);
}

/** Look up a registered factory, throwing a helpful error if absent. */
export function getChart(name: string): ChartFactory {
  const factory = registry.get(name);
  if (!factory) {
    const known = [...registry.keys()].join(', ') || 'none';
    throw new Error(`Unknown chart "${name}". Registered: ${known}`);
  }
  return factory;
}

/** Names of all registered charts. */
export function chartNames(): string[] {
  return [...registry.keys()];
}

/**
 * Build a chart by name and render it. The dispatch seam dashboards (M3–M4)
 * build on: a chart can be selected by name rather than imported directly.
 */
export function renderChart(
  el: HTMLElement | string,
  name: string,
  data: Datum[],
  options: unknown,
): SVGSVGElement | HTMLElement {
  return render(el, getChart(name)(data, options));
}
