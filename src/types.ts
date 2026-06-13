/** A single tabular record. Charts consume arrays of these. */
export type Datum = Record<string, unknown>;

/** Common options shared by every chart factory. */
export interface BaseChartOptions {
  /** Optional title rendered above the view. */
  title?: string;
  /** Width in pixels, or "container" to fill the parent. */
  width?: number | 'container';
  /** Height in pixels, or "container" to fill the parent. */
  height?: number | 'container';
}
