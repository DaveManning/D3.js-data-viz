# Architecture

> The long-term shape of this project. This is the destination we refactor
> **toward**, not a skeleton we scaffold empty. Abstractions are extracted from
> real charts as patterns emerge — never designed against imagination.

## The shift

The repo began as a sketchbook: project folders → individual chart demos →
embedded, one-off chart logic. The goal is to invert that into a layered system:

```
Visualization runtime   (Observable Plot — we do NOT build this)
        ↓
Reusable chart engine   (chart factories: data + options → Plot spec)
        ↓
Declarative specs       (reusable option presets + shared types)
        ↓
Dashboard ecosystem     (composed, coordinated views)
```

## Foundation decision: build on Observable Plot

We are **not** hand-writing a rendering engine (scales, layouts, transitions).
[Observable Plot](https://observablehq.com/plot/) is a concise, declarative
layer over D3 — the natural successor to hand-rolled D3 — and gives us scales,
axes, legends, faceting, and transforms for free.

This decision **shrinks** the original target tree: `core/` no longer needs
`lifecycle/`, `state/`, `scales/`, `layouts/`, or `transitions/` — Plot owns all
of that.

### Why Plot over Vega-Lite (decided after due diligence)

The deciding axis was **"is a spec data, or code?"** Vega-Lite specs are
serializable JSON; Plot specs are JavaScript (marks are function calls). We do
**not** have a requirement to persist, transmit, or generate chart definitions
as data, so Vega-Lite's main advantage didn't apply. Against that, Plot is more
ergonomic, lighter weight, closer to the D3 spirit of this repo, and the team
already has hands-on experience with it. Trade-offs we consciously accepted:

- **Specs are code, not serializable JSON.** The `specs/` layer holds reusable
  option presets and shared types, not saved JSON documents.
- **Theming is a merged options object, not a single config.** Plot has no
  global `config`; `core/embed` merges `themes/default.ts` into every render.
- **Cross-filtering is wired in code, not declared.** Coordinated views in the
  dashboard layer (M3–M4) are built with render hooks + shared state rather than
  a declarative selection model.

## Layer model

| Layer | Owns | Lives in |
|-------|------|----------|
| **Runtime** | Rendering, scales, layout, axes, legends, transforms | Observable Plot (dependency) + thin host wrapper in `core/` |
| **Chart engine** | Parameterized factories: `(data, options) => PlotOptions` | `src/charts/` |
| **Specs** | Reusable option presets + shared option types | `src/specs/`, `src/types.ts` |
| **Themes** | Default `Plot.plot()` options merged into every chart | `src/themes/` |
| **Components** | Custom UI Plot doesn't give us (Filters, Table, StoryPanel) | `src/components/` |
| **Dashboards** | Composition of multiple views + coordinated interaction | `src/dashboards/` |
| **Data** | Datasets + loaders/transforms | `src/data/`, `data/` |
| **Utils** | Shared helpers | `src/utils/` |

> Tooltips and legends mostly come free from Plot, so `components/` is reserved
> for genuinely custom UI rather than re-implementing built-ins.

## Target tree

```
src/
├── core/           # thin host: Plot.plot wrapper + theme application
├── charts/         # chart factories — BarChart, LineChart, ScatterPlot, Pareto, Heatmap
├── components/     # custom UI: Filters, Table, StoryPanel
├── dashboards/     # composed, coordinated views
├── specs/          # reusable option presets + shared spec types
├── themes/         # default Plot options
├── data/           # loaders / transforms (raw files stay in top-level data/)
└── utils/
```

## The contract every chart follows (the vertical slice)

A chart is a pure function from data + options to a Plot spec (the options object
for `Plot.plot()`). It renders only through `core/embed`.

```ts
// charts/bar/bar.ts
export function barChart(data: Datum[], options: BarOptions): Plot.PlotOptions { ... }

// rendering, anywhere
import { render } from '@/core/embed';
render('#chart', barChart(data, { x: 'category', y: 'value' }));
```

This is the pattern the whole engine is extracted from. Every new chart type
repeats it before we generalize anything. Because the factory is pure, its
output is asserted directly in tests; rendering is verified by mounting into a
jsdom DOM (a spec is code, so it needs a document to render — unlike a JSON spec
that can be validated headlessly).

## Why this sequencing

We build **one chart end-to-end through every layer first**, with a test, then
add charts until repetition is obvious — and only then extract shared engine
code. An engine distilled from a single example is almost always wrong. See
[ROADMAP.md](./ROADMAP.md) for the milestone order.
