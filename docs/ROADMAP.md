# Roadmap

Milestones build toward the layered system in [ARCHITECTURE.md](./ARCHITECTURE.md).
The ordering principle: **prove the pattern on a real chart before generalizing.**

## M0 — Foundation (in progress)

- [x] Recreate remote repository
- [x] Capture vision as living docs (`ARCHITECTURE.md`, `ROADMAP.md`)
- [x] Tooling: Vite + TypeScript + Vitest
- [x] First vertical slice: a bar chart factory → `core/embed` → themed render, with a passing test and a demo page
- [x] Settle the runtime: Observable Plot (see ARCHITECTURE.md for the Plot-vs-Vega-Lite reasoning)
- [x] `.gitignore` and repo hygiene

## M1 — Prove the pattern on real data

- [x] Reimplement the **Pareto** chart (was a static Plotly export) as a factory
      (`src/charts/pareto/`) on the real weighted pain-point data
      (`src/data/aftermarket-pain-points.ts`). Proves the contract on a dual-axis
      chart; the old `pareto_*.html` exports moved to `legacy/`.
- [x] Establish `themes/default.ts` as the shared Plot default options.
- [x] Add `LineChart` and `ScatterPlot` factories.
- [x] Seed the data layer: a small CSV loader (`utils/csv.ts`) + typed data
      modules (`data/advertising.ts`, `data/quarterly-revenue.ts`) loaded via
      Vite `?raw`. Demo is now a gallery (Pareto + scatter + line).

## M2 — Extract the engine

- [x] Extract the repetition the four charts revealed: `core/spec.ts` (`frame()`
      for title/width/height), `core/registry.ts` (name → factory dispatch +
      `renderChart`), and `specs/options.ts` (shared `XYOptions` /
      `CategoryValueOptions`). Theme application already lives in `core/embed`.
- [x] Ship reusable option presets in `specs/presets.ts` (registry-dispatchable
      view definitions); the demo gallery now renders from them.

## M3 — Components & interaction

- [x] `components/Filters` (`createSelectFilter`) and `components/Table`
      (`renderTable`) — first custom UI components.
- [ ] `components/StoryPanel`.
- [x] First coordinated interaction: a control re-renders a chart via the
      registry (`dashboards/advertising-explorer`).
- [ ] Linked selections *across* views (brush in one chart filters another),
      via Plot render hooks + shared state.

## M4 — Dashboard ecosystem

- [x] First dashboard: `dashboards/advertising-explorer` (Filters → scatter → table).
- [ ] Multi-view dashboard with shared selections across charts.
- [ ] A first end-to-end dashboard on a real dataset.

## Backlog / hygiene

- [ ] **`data/` cleanup** — the 20-newsgroups text corpus under
      `data/AutoElectronics/` (thousands of files) and the stray `.~lock` file do
      not belong in version control. Decide: move out of the repo, or `.gitignore`
      and remove from history. Until then it bloats every clone.
- [ ] Decide the fate of the legacy artifacts (`index.html` boilerplate,
      notebooks, `ModernViz.tsx`) — keep as reference under a `legacy/` folder, or
      remove once superseded.
- [ ] CI (lint + test on push).
