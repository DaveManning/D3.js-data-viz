# D3.js-data-viz

A layered, declarative data-visualization toolkit. Charts are **pure functions
from data to a [Vega-Lite](https://vega.github.io/vega-lite/) spec**, rendered
through a single thin runtime wrapper, themed centrally, and composed into
dashboards.

> **Status: early.** The foundation and first vertical slice are landing now.
> See [docs/ROADMAP.md](docs/ROADMAP.md) for what's built and what's next, and
> [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the design and the reasoning
> behind building on Vega-Lite rather than a hand-rolled engine.

## The idea

```
Visualization runtime  →  Reusable chart engine  →  Declarative specs  →  Dashboard ecosystem
```

A chart looks like this:

```ts
import { render } from './src/core/embed';
import { barChart } from './src/charts/bar/bar';

render('#chart', barChart(data, { x: 'category', y: 'value' }));
```

Because a chart is just JSON, it's testable without a browser.

## Develop

```bash
npm install
npm run dev      # Vite dev server + demo page
npm test         # Vitest
npm run build    # production build
```

## Layout

```
src/
├── core/         thin host: embed/render wrapper, theme applier, chart registry
├── charts/       spec factories — (data, options) => Vega-Lite spec
├── components/   custom UI (Filters, Table, StoryPanel)
├── dashboards/   composed, cross-filtered views
├── specs/        serialized example specs + shared types
├── themes/       Vega-Lite config objects
└── utils/
docs/             ARCHITECTURE.md, ROADMAP.md
data/             datasets
```

Legacy sketches (notebooks, the original Plotly Pareto exports, `ModernViz.tsx`)
remain in the repo as reference while the toolkit is built out.
