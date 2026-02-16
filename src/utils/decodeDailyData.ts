import type { CompactDaily, DailyPoint } from "../types";

function expandDate(compactDate: string): string {
  return `${compactDate.slice(0, 4)}-${compactDate.slice(4, 6)}-${compactDate.slice(6, 8)}`;
}

export function decodeDailyData(compact: CompactDaily): DailyPoint[] {
  const length = compact.d.length;
  const decoded: DailyPoint[] = new Array(length);

  for (let index = 0; index < length; index += 1) {
    decoded[index] = {
      date: expandDate(compact.d[index]),
      realmeye_max: compact.a[index] ?? null,
      realmeye_min: compact.b[index] ?? null,
      realmstock_max: compact.c[index] ?? null,
      realmstock_min: compact.e[index] ?? null,
      launcher_loads: compact.f[index] ?? null
    };
  }

  return decoded;
}
