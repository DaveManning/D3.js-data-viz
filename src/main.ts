import { render } from '@/core/embed';
import { paretoChart } from '@/charts/pareto/pareto';
import { scatterPlot } from '@/charts/scatter/scatter';
import { lineChart } from '@/charts/line/line';
import { painPointScores } from '@/data/aftermarket-pain-points';
import { advertising } from '@/data/advertising';
import { quarterlyRevenue } from '@/data/quarterly-revenue';

render(
  '#pareto',
  paretoChart(painPointScores, {
    category: 'label',
    value: 'score',
    threshold: 80,
    title: 'Aftermarket & service pain points — weighted impact (Pareto)',
  }),
);

render(
  '#scatter',
  scatterPlot(advertising, {
    x: 'TV',
    y: 'sales',
    title: 'Advertising: TV spend vs. sales (200 markets)',
  }),
);

render(
  '#line',
  lineChart(quarterlyRevenue, {
    x: 'date',
    y: 'revenue',
    title: 'Projected revenue over time ($M)',
  }),
);
