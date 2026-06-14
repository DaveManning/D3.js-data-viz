import '@/charts'; // register the built-in charts
import { renderChart } from '@/core/registry';
import { galleryPresets } from '@/specs/presets';
import { advertisingExplorer } from '@/dashboards/advertising-explorer';
import { painPointExplorer } from '@/dashboards/pain-point-explorer';
import { resolveElement } from '@/utils/dom';

// Gallery: render each preset by name through the registry.
const gallery = resolveElement('#gallery');
for (const preset of galleryPresets) {
  const card = document.createElement('div');
  card.className = 'chart';
  gallery.append(card);
  renderChart(card, preset.chart, preset.data, preset.options);
}

// Coordinated dashboards.
advertisingExplorer('#explorer');
painPointExplorer('#painpoints');
