import type * as Plot from '@observablehq/plot';

/**
 * The shared Plot options applied to every chart via `core/embed`. Observable
 * Plot has no single "config" object the way Vega-Lite does, so the theme is a
 * set of default `Plot.plot()` options we merge in. Charts can override any of
 * these per call.
 */
export const defaultTheme: Plot.PlotOptions = {
  width: 720,
  marginLeft: 60,
  marginBottom: 50,
  grid: true,
  style: {
    background: 'transparent',
    color: '#0f172a',
    fontFamily: 'Segoe UI, system-ui, sans-serif',
    fontSize: '12px',
  },
  color: {
    range: [
      '#6366f1', '#22d3ee', '#f59e0b', '#ef4444',
      '#10b981', '#a855f7', '#ec4899', '#84cc16',
    ],
  },
};
