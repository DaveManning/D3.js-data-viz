# Roadmap

Milestones build toward the layered system in [ARCHITECTURE.md](./ARCHITECTURE.md).
The ordering principle: **prove the pattern on a real chart before generalizing.**

## M0 — Foundation (in progress)

- [x] Recreate remote repository
- [x] Capture vision as living docs (`ARCHITECTURE.md`, `ROADMAP.md`)
- [ ] Tooling: Vite + TypeScript + Vitest
- [ ] First vertical slice: a bar chart spec factory → `core/embed` → themed render, with a passing test and a demo page
- [ ] `.gitignore` and repo hygiene

## M1 — Prove the pattern on real data

- [ ] Reimplement the **Pareto** chart (currently a static Plotly export) as a
      spec factory on the real pain-point/revenue-impact data. This retires
      `pareto_*.html` and validates that the contract holds for a dual-axis chart.
- [ ] Establish `themes/default.ts` as the shared Vega-Lite config.
- [ ] Add `LineChart` and `ScatterPlot` factories.

## M2 — Extract the engine

- [ ] With 3–4 charts built, extract genuine commonality into `core/`
      (chart registry, shared option types, theme application).
- [ ] Formalize `specs/` types and ship a few serialized example specs.

## M3 — Components & interaction

- [ ] `components/`: Filters, Table, StoryPanel.
- [ ] Vega-Lite selections for cross-filtering between views.

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
