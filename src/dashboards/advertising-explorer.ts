import '@/charts'; // ensure the built-in charts are registered
import { renderChart } from '@/core/registry';
import { createSelectFilter } from '@/components/Filters/filters';
import { renderTable } from '@/components/Table/table';
import { advertising } from '@/data/advertising';
import { resolveElement } from '@/utils/dom';

const CHANNELS = ['TV', 'radio', 'newspaper'];

/**
 * A first coordinated dashboard: a channel selector drives a scatter (spend vs.
 * sales), re-rendered via the registry on every change, with a preview table
 * below. Demonstrates the full stack — Filters → registry → chart factory →
 * runtime — composed in one view.
 */
export function advertisingExplorer(root: HTMLElement | string): void {
  const el = resolveElement(root);
  el.replaceChildren();

  const controls = document.createElement('div');
  controls.className = 'viz-controls';
  const chartEl = document.createElement('div');
  const tableEl = document.createElement('div');
  el.append(controls, chartEl, tableEl);

  const draw = (channel: string) => {
    renderChart(chartEl, 'scatter', advertising, {
      x: channel,
      y: 'sales',
      title: `${channel} spend vs. sales`,
    });
  };

  createSelectFilter(controls, {
    label: 'Channel',
    values: CHANNELS,
    value: 'TV',
    onChange: draw,
  });

  draw('TV');
  renderTable(tableEl, advertising.slice(0, 10));
}
