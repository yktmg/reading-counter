// 記録から集計を作る純粋な関数（画面に依存しないのでテストしやすい）
import type { ReadingRecord } from '../types';
import { lastMonths, toMonthKey } from './date';

export type MonthlyCount = {
  month: string; // 'YYYY-MM'
  book: number;
  movie: number;
};

export function countByMonth(
  records: ReadingRecord[],
  months: number,
  base: Date = new Date(),
): MonthlyCount[] {
  const keys = lastMonths(months, base);
  const table = new Map<string, MonthlyCount>(
    keys.map((month) => [month, { month, book: 0, movie: 0 }]),
  );
  for (const r of records) {
    const row = table.get(toMonthKey(r.finishedOn));
    if (row) row[r.kind] += 1;
  }
  return keys.map((k) => table.get(k)!);
}

export function totals(records: ReadingRecord[]) {
  return {
    book: records.filter((r) => r.kind === 'book').length,
    movie: records.filter((r) => r.kind === 'movie').length,
  };
}
