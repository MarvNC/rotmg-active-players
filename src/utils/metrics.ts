import type { DailyPoint } from "../types";

export type StatsSummary = {
  currentRealmeye: number | null;
  allTimePeak: { value: number | null; date: string | null };
  trend30d: {
    absolute: number | null;
    percent: number | null;
  };
  lastUpdatedDate: string | null;
};

export type TableRow = DailyPoint & {
  realmeye_delta: number | null;
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
    date: null
  };

  for (const point of points) {
    if (point.realmeye_max == null) {
      continue;
    }

    if (allTimePeak.value == null || point.realmeye_max > allTimePeak.value) {
      allTimePeak = { value: point.realmeye_max, date: point.date };
    }
  }

  const latestIndex = points.length - 1;
  const baselineIndex = Math.max(0, latestIndex - 30);
  const latest = points[latestIndex]?.realmeye_max ?? null;
  const baseline = points[baselineIndex]?.realmeye_max ?? null;

  let absolute: number | null = null;
  let percent: number | null = null;

  if (latest != null && baseline != null) {
    absolute = latest - baseline;
    percent = baseline === 0 ? null : (absolute / baseline) * 100;
  }

  return {
    currentRealmeye: current,
    allTimePeak,
    trend30d: {
      absolute,
      percent
    },
    lastUpdatedDate: points[latestIndex]?.date ?? null
  };
}

export function buildTableRows(points: DailyPoint[]): TableRow[] {
  return points.map((point, index) => {
    const previous = points[index - 1]?.realmeye_max ?? null;
    const current = point.realmeye_max;

    return {
      ...point,
      realmeye_delta:
        current == null || previous == null
          ? null
          : current - previous
    };
  });
}
