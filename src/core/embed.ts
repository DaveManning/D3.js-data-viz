import * as Plot from '@observablehq/plot';
import { defaultTheme } from '@/themes/default';
import { resolveElement } from '@/utils/dom';

/** A chart spec is the options object passed to `Plot.plot()`. */
export type ChartSpec = Plot.PlotOptions;

/**
 * The runtime host. Every chart in the project renders through this one
 * function — it is the single seam between our chart factories and Observable
 * Plot, and the one place the shared theme is applied.
 *
 * @param el    A DOM element or CSS selector to render into.
 * @param spec  Plot options, typically produced by a chart factory.
 * @returns     The rendered SVG/figure node.
 */
export function render(
  el: HTMLElement | string,
  spec: ChartSpec,
): SVGSVGElement | HTMLElement {
  const target = resolveElement(el);
  const figure = Plot.plot({ ...defaultTheme, ...spec });
  target.replaceChildren(figure);
  return figure;
}
