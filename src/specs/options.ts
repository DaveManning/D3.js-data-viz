import type { BaseChartOptions } from '@/types';

/**
 * Shared option shapes, extracted once the same field conventions appeared
 * across multiple chart factories. Charts extend these rather than re-declaring
 * `x`/`y` or `category`/`value`.
 */

/** Charts that map two fields onto x and y axes (bar, line, scatter). */
export interface XYOptions extends BaseChartOptions {
  /** Field for the x axis. */
  x: string;
  /** Field for the y axis. */
  y: string;
}

/** Charts that rank a value by category (pareto, and future ranked charts). */
export interface CategoryValueOptions extends BaseChartOptions {
  /** Field naming each category. */
  category: string;
  /** Field holding the value to rank. */
  value: string;
}
