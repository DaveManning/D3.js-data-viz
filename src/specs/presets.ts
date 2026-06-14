import type { Datum } from '@/types';
import { painPointScores } from '@/data/aftermarket-pain-points';
import { advertising } from '@/data/advertising';
import { quarterlyRevenue } from '@/data/quarterly-revenue';

/**
 * A reusable, registry-dispatchable view definition: which chart, which data,
 * which options. Presets are the single source the demo gallery (and future
 * dashboards) render from — pair them with `renderChart(el, p.chart, p.data, p.options)`.
 */
export interface ChartPreset {
  id: string;
  /** Registered chart name (see core/registry). */
  chart: string;
  data: Datum[];
  options: Record<string, unknown>;
}

export const galleryPresets: ChartPreset[] = [
  {
    id: 'pareto',
    chart: 'pareto',
    data: painPointScores,
    options: {
      category: 'label',
      value: 'score',
      threshold: 80,
      title: 'Aftermarket & service pain points — weighted impact (Pareto)',
    },
  },
  {
    id: 'scatter',
    chart: 'scatter',
    data: advertising,
    options: { x: 'TV', y: 'sales', title: 'Advertising: TV spend vs. sales (200 markets)' },
  },
  {
    id: 'line',
    chart: 'line',
    data: quarterlyRevenue,
    options: { x: 'date', y: 'revenue', title: 'Projected revenue over time ($M)' },
  },
];
