import type { CompactDaily, DailyPoint } from "../types";

function expandDate(compactDate: string): string {
  return `${compactDate.slice(0, 4)}-${compactDate.slice(4, 6)}-${compactDate.slice(6, 8)}`;
}

export function decodeDailyData(compact: CompactDaily): DailyPoint[] {
  return compact.d.map((compactDate, index) => {
    return {
      date: expandDate(compactDate),
      realmeye_max: compact.a[index] ?? null,
      realmstock_max: compact.c[index] ?? null,
      launcher_loads: compact.f[index] ?? null,
    };
  });
}
