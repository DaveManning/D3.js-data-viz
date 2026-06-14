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
- [ ] Add `LineChart` and `ScatterPlot` factories.

## M2 — Extract the engine

- [ ] With 3–4 charts built, extract genuine commonality into `core/`
      (chart registry, shared option types, theme application).
- [ ] Formalize `specs/` types and ship a few reusable option presets.

## M3 — Components & interaction

- [ ] `components/`: Filters, Table, StoryPanel.
- [ ] Coordinated/linked selections across views (Plot render hooks + shared state).

## M4 — Dashboard ecosystem

- [ ] `dashboards/`: compose multiple views with shared selections.
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
