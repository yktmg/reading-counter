// 日付まわりの小さな関数（ライブラリを使わずに済む範囲だけ）

const pad = (n: number) => String(n).padStart(2, '0');

/** Date → 'YYYY-MM-DD'（端末のローカル時刻） */
export function toDateString(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function today(): string {
  return toDateString(new Date());
}

/** 'YYYY-MM-DD' として正しい日付か */
export function isValidDateString(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

/** 'YYYY-MM-DD' → 'YYYY-MM' */
export function toMonthKey(dateString: string): string {
  return dateString.slice(0, 7);
}

/** 基準月から過去 n か月分の 'YYYY-MM' を古い順で返す */
export function lastMonths(n: number, base: Date = new Date()): string[] {
  const result: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
    result.push(`${d.getFullYear()}-${pad(d.getMonth() + 1)}`);
  }
  return result;
}
