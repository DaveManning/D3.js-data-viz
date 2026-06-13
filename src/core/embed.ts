import vegaEmbed, { type EmbedOptions, type Result } from 'vega-embed';
import type { TopLevelSpec } from 'vega-lite';
import { defaultTheme } from '@/themes/default';

/**
 * The runtime host. Every chart in the project renders through this one
 * function — it is the single seam between our declarative specs and the
 * Vega/Vega-Lite runtime, and the one place the shared theme is applied.
 *
 * @param el       A DOM element or CSS selector to render into.
 * @param spec     A Vega-Lite spec (typically produced by a chart factory).
 * @param options  Optional vega-embed overrides.
 */
export function render(
  el: HTMLElement | string,
  spec: TopLevelSpec,
  options: EmbedOptions = {},
): Promise<Result> {
  const themed: TopLevelSpec = {
    ...spec,
    config: { ...defaultTheme, ...spec.config },
  };

  return vegaEmbed(el, themed, {
    actions: false,
    renderer: 'svg',
    ...options,
  });
}
