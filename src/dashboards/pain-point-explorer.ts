import '@/charts'; // ensure charts are registered
import { renderChart } from '@/core/registry';
import { createStore } from '@/core/store';
import { renderTable } from '@/components/Table/table';
import { renderStoryPanel } from '@/components/StoryPanel/story-panel';
import { painPoints, weightedScore } from '@/data/aftermarket-pain-points';
import { resolveElement } from '@/utils/dom';
import type { Datum } from '@/types';

const round = (n: number) => Math.round(n * 100) / 100;

const DIMENSIONS: { key: keyof (typeof painPoints)[number]; label: string }[] = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'margin', label: 'Margin' },
  { key: 'cash', label: 'Cash' },
  { key: 'customer', label: 'Customer' },
  { key: 'strategic', label: 'Strategic' },
];

/**
 * A multi-view linked dashboard: selecting a pain point in the table drives a
 * dimension-breakdown bar chart and a narrative panel. All three views share
 * one store — click a row, every view re-renders. The first real cross-view
 * selection in the toolkit.
 */
export function painPointExplorer(root: HTMLElement | string): void {
  const el = resolveElement(root);
  el.replaceChildren();

  const tableEl = document.createElement('div');
  const chartEl = document.createElement('div');
  const storyEl = document.createElement('div');
  el.append(tableEl, chartEl, storyEl);

  const rows = painPoints
    .map((p) => ({ label: p.label, score: round(weightedScore(p)) }))
    .sort((a, b) => b.score - a.score);

  const store = createStore<string>(rows[0].label);

  const renderTableView = () => {
    const selectedIndex = rows.findIndex((r) => r.label === store.get());
    renderTable(tableEl, rows as Datum[], {
      columns: ['label', 'score'],
      selectedIndex,
      onRowClick: (row) => store.set(String(row.label)),
    });
  };

  const renderDetail = () => {
    const p = painPoints.find((pp) => pp.label === store.get());
    if (!p) return;

    const breakdown: Datum[] = DIMENSIONS.map((d) => ({ dimension: d.label, score: p[d.key] }));
    renderChart(chartEl, 'bar', breakdown, {
      x: 'dimension',
      y: 'score',
      title: `${p.label}: impact by dimension`,
    });

    const top = [...breakdown].sort((a, b) => (b.score as number) - (a.score as number))[0];
    renderStoryPanel(storyEl, {
      heading: p.painPoint,
      lines: [
        `Weighted impact score: ${round(weightedScore(p))} of 5.`,
        `Strongest dimension: ${top.dimension} (${top.score}/5).`,
      ],
    });
  };

  store.subscribe(() => {
    renderTableView();
    renderDetail();
  });

  renderTableView();
  renderDetail();
}
