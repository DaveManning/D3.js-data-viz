import { registerChart } from '@/core/registry';
import { barChart } from './bar/bar';
import { paretoChart } from './pareto/pareto';
import { lineChart } from './line/line';
import { scatterPlot } from './scatter/scatter';

// Importing this module registers the built-in charts as a side effect.
registerChart('bar', barChart);
registerChart('pareto', paretoChart);
registerChart('line', lineChart);
registerChart('scatter', scatterPlot);

export { barChart, paretoChart, lineChart, scatterPlot };
