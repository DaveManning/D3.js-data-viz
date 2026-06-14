/** A single tabular record. Charts consume arrays of these. */
export type Datum = Record<string, unknown>;

/** Common options shared by every chart factory. */
export interface BaseChartOptions {
  /** Optional title rendered above the view. */
  title?: string;
  /** Width in pixels. */
  width?: number;
  /** Height in pixels. */
  height?: number;
}
