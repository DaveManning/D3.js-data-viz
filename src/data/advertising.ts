import raw from '../../data/Advertising.csv?raw';
import { parseCsv } from '@/utils/csv';

export type AdvertisingRow = {
  market: number;
  sales: number;
  TV: number;
  radio: number;
  newspaper: number;
};

/** Advertising spend (TV/radio/newspaper) vs. sales across 200 markets. */
export const advertising = parseCsv(raw) as unknown as AdvertisingRow[];
