import { describe, it, expect } from 'vitest';
import { parseCsv } from './csv';

describe('parseCsv', () => {
  it('parses headers and rows, coercing numeric cells', () => {
    const rows = parseCsv('market,sales\n1,22.1\n2,10.4');
    expect(rows).toEqual([
      { market: 1, sales: 22.1 },
      { market: 2, sales: 10.4 },
    ]);
  });

  it('strips surrounding quotes and keeps non-numeric strings', () => {
    const rows = parseCsv('date,revenue_millions\n"2023-01-01","1489.5"');
    expect(rows[0]).toEqual({ date: '2023-01-01', revenue_millions: 1489.5 });
  });

  it('returns [] for empty or header-only input', () => {
    expect(parseCsv('')).toEqual([]);
    expect(parseCsv('a,b')).toEqual([]);
  });
});
