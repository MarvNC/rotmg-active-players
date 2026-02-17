import type { DailyPoint } from "../types";

export type StatsSummary = {
  currentRealmeye: number | null;
  allTimePeak: { value: number | null; date: string | null };
  allTimeLow: { value: number | null; date: string | null };
  lastUpdatedDate: string | null;
};

export type TableRow = DailyPoint & {
  realmeye_delta: number | null;
  realmstock_delta: number | null;
  launcher_delta: number | null;
};

function latestValue(points: DailyPoint[]): number | null {
  for (let index = points.length - 1; index >= 0; index -= 1) {
    const point = points[index];
    if (point?.realmeye_max != null) {
      return point.realmeye_max;
    }
  }
  return null;
}

export function buildStats(points: DailyPoint[]): StatsSummary {
  const current = latestValue(points);

  let allTimePeak: { value: number | null; date: string | null } = {
    value: null,
    date: null,
  };

  let allTimeLow: { value: number | null; date: string | null } = {
    value: null,
    date: null,
  };

  for (const point of points) {
    if (point.realmeye_max == null) {
      continue;
    }

    if (allTimePeak.value == null || point.realmeye_max > allTimePeak.value) {
      allTimePeak = { value: point.realmeye_max, date: point.date };
    }

    if (point.realmeye_min != null) {
      if (allTimeLow.value == null || point.realmeye_min < allTimeLow.value) {
        allTimeLow = { value: point.realmeye_min, date: point.date };
      }
    }
  }

  const latestIndex = points.length - 1;

  return {
    currentRealmeye: current,
    allTimePeak,
    allTimeLow,
    lastUpdatedDate: points[latestIndex]?.date ?? null,
  };
}

export function buildTableRows(points: DailyPoint[]): TableRow[] {
  return points.map((point, index) => {
    const previousRealmeye = points[index - 1]?.realmeye_max ?? null;
    const currentRealmeye = point.realmeye_max;
    const previousRealmstock = points[index - 1]?.realmstock_max ?? null;
    const currentRealmstock = point.realmstock_max;
    const previousLauncher = points[index - 1]?.launcher_loads ?? null;
    const currentLauncher = point.launcher_loads;

    return {
      ...point,
      realmeye_delta: currentRealmeye == null || previousRealmeye == null ? null : currentRealmeye - previousRealmeye,
      realmstock_delta:
        currentRealmstock == null || previousRealmstock == null ? null : currentRealmstock - previousRealmstock,
      launcher_delta: currentLauncher == null || previousLauncher == null ? null : currentLauncher - previousLauncher,
    };
  });
}
