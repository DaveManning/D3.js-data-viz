import raw from '../../data/generateQuarterlyRevenue_data.csv?raw';
import { parseCsv } from '@/utils/csv';

export type RevenuePoint = {
  date: Date;
  revenue: number;
};

/** Projected revenue (millions) over time, sorted ascending by date. */
export const quarterlyRevenue: RevenuePoint[] = parseCsv(raw)
  .map((r) => ({ date: new Date(String(r.date)), revenue: Number(r.revenue_millions) }))
  .filter((r) => !Number.isNaN(r.date.getTime()) && Number.isFinite(r.revenue))
  .sort((a, b) => a.date.getTime() - b.date.getTime());
