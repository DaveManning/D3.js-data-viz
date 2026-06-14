import { render } from '@/core/embed';
import { paretoChart } from '@/charts/pareto/pareto';
import { painPointScores } from '@/data/aftermarket-pain-points';

// M1: the real weighted-impact Pareto, replacing the static Plotly export.
render(
  '#chart',
  paretoChart(painPointScores, {
    category: 'label',
    value: 'score',
    threshold: 80,
    title: 'Aftermarket & service pain points — weighted impact (Pareto)',
  }),
);
