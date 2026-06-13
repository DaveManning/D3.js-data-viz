import { render } from '@/core/embed';
import { barChart } from '@/charts/bar/bar';
import type { Datum } from '@/types';

// Sample data — the first real dataset (the Pareto pain-points) lands in M1.
const data: Datum[] = [
  { category: 'Pricing & discounting', value: 4.8 },
  { category: 'Field workforce', value: 4.3 },
  { category: 'Aftermarket capture', value: 3.8 },
  { category: 'Spare-parts availability', value: 3.6 },
  { category: 'Value proposition', value: 3.3 },
  { category: 'Org design', value: 3.1 },
];

render(
  '#chart',
  barChart(data, {
    x: 'category',
    y: 'value',
    title: 'Vertical slice — bar chart spec factory → themed runtime',
  }),
);
