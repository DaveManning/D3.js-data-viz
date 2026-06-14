import type { Datum } from '@/types';

/**
 * Minimal CSV parser for the clean datasets in `data/`. Splits on commas and
 * strips one layer of surrounding double quotes; it does NOT handle commas or
 * newlines embedded inside quoted fields. Numeric-looking cells are coerced to
 * numbers so charts get real quantitative values.
 */
export function parseCsv(text: string): Datum[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = splitRow(lines[0]);
  return lines.slice(1).map((line) => {
    const cells = splitRow(line);
    const row: Datum = {};
    headers.forEach((header, i) => {
      row[header] = coerce(cells[i]);
    });
    return row;
  });
}

function splitRow(line: string): string[] {
  return line.split(',').map(unquote);
}

function unquote(cell: string): string {
  const trimmed = cell.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function coerce(value: string | undefined): string | number {
  if (value === undefined || value === '') return '';
  const n = Number(value);
  return Number.isFinite(n) ? n : value;
}
