import type { Config } from 'vega-lite';

/**
 * The shared Vega-Lite `config`. This is the project's "theme" layer — every
 * chart inherits it via `core/embed`, so visual identity lives in exactly one
 * place rather than being repeated per chart.
 */
export const defaultTheme: Config = {
  background: 'transparent',
  font: 'Segoe UI, system-ui, sans-serif',
  view: { stroke: 'transparent' },
  range: {
    category: [
      '#6366f1', '#22d3ee', '#f59e0b', '#ef4444',
      '#10b981', '#a855f7', '#ec4899', '#84cc16',
    ],
  },
  axis: {
    labelColor: '#475569',
    titleColor: '#1e293b',
    gridColor: '#e2e8f0',
    domainColor: '#cbd5e1',
    tickColor: '#cbd5e1',
  },
  legend: {
    labelColor: '#475569',
    titleColor: '#1e293b',
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    anchor: 'start',
  },
};
