# Architecture

> The long-term shape of this project. This is the destination we refactor
> **toward**, not a skeleton we scaffold empty. Abstractions are extracted from
> real charts as patterns emerge — never designed against imagination.

## The shift

The repo began as a sketchbook: project folders → individual chart demos →
embedded, one-off chart logic. The goal is to invert that into a layered system:

```
Visualization runtime   (Vega / Vega-Lite — we do NOT build this)
        ↓
Reusable chart engine   (spec factories: data + options → spec)
        ↓
Declarative specs       (serializable JSON describing a view)
        ↓
Dashboard ecosystem     (composed, cross-filtered views)
```

## Foundation decision: build on Vega-Lite

We are **not** hand-writing a rendering engine (scales, layouts, transitions,
lifecycle). [Vega-Lite](https://vega.github.io/vega-lite/) already is a
"declarative spec → engine → runtime" system, and reinventing it is a multi-year
effort. We build the layers that are *ours*: chart presets, themes, composition,
and the data/dashboard ecosystem on top.

Rendering is done through [`vega-embed`](https://github.com/vega/vega-embed).

This decision **shrinks** the original target tree: `core/` no longer needs
`lifecycle/`, `registry/` (beyond a small factory map), `state/`, `scales/`,
`layouts/`, or `transitions/` — Vega owns all of that.

## Layer model

| Layer | Owns | Lives in |
|-------|------|----------|
| **Runtime** | Rendering, scales, layout, transitions, interaction primitives | `vega-embed` (dependency) + thin host wrapper in `core/` |
| **Chart engine** | Parameterized spec factories: `(data, options) => VlSpec` | `src/charts/` |
| **Specs** | Serializable view definitions + shared spec types | `src/specs/`, `src/types/` |
| **Themes** | Vega-Lite `config` objects (color, type, axes, legend) | `src/themes/` |
| **Components** | Custom UI the runtime doesn't give us (Filters, Table, StoryPanel) | `src/components/` |
| **Dashboards** | Composition of multiple views + cross-filtering selections | `src/dashboards/` |
| **Data** | Datasets + loaders/transforms | `src/data/`, `data/` |
| **Utils** | Shared helpers | `src/utils/` |

> Tooltip and Legend mostly come free from Vega-Lite, so `components/` is reserved
> for genuinely custom UI rather than re-implementing built-ins.

## Target tree

```
src/
├── core/           # thin host: embed wrapper, chart registry, theme applier
├── charts/         # spec factories — BarChart, LineChart, ScatterPlot, Pareto, Heatmap
├── components/     # custom UI: Filters, Table, StoryPanel
├── dashboards/     # composed, cross-filtered views
├── specs/          # serialized example specs + shared spec types
├── themes/         # Vega-Lite config objects
├── data/           # loaders / transforms (raw files stay in top-level data/)
└── utils/
```

## The contract every chart follows (the vertical slice)

A chart is a pure function from data + options to a Vega-Lite spec. It renders
only through `core/embed`. It is testable without a browser, because a spec is
just JSON and Vega-Lite can compile it headlessly.

```ts
// charts/bar/bar.ts
export function barChart(data: Datum[], options: BarOptions): VisualizationSpec { ... }

// rendering, anywhere
import { render } from '@/core/embed';
render('#chart', barChart(data, { x: 'category', y: 'value' }));
```

This is the pattern the whole engine is extracted from. Every new chart type
repeats it before we generalize anything.

## Why this sequencing

We build **one chart end-to-end through every layer first**, with a test, then
add charts until repetition is obvious — and only then extract shared engine
code. An engine distilled from a single example is almost always wrong. See
[ROADMAP.md](./ROADMAP.md) for the milestone order.
