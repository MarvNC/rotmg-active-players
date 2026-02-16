import { describe, expect, test } from "vitest";
import { buildStats, buildTableRows } from "../src/utils/metrics";
import type { DailyPoint } from "../src/types";

const sample: DailyPoint[] = [
  {
    date: "2026-01-01",
    realmeye_max: 100,
    realmeye_min: 90,
    realmstock_max: 20,
    realmstock_min: 10
  },
  {
    date: "2026-01-02",
    realmeye_max: 130,
    realmeye_min: 120,
    realmstock_max: 22,
    realmstock_min: 11
  },
  {
    date: "2026-01-03",
    realmeye_max: 110,
    realmeye_min: 100,
    realmstock_max: null,
    realmstock_min: null
  }
];

describe("buildStats", () => {
  test("computes current and all-time peak", () => {
    const stats = buildStats(sample);
    expect(stats.currentRealmeye).toBe(110);
    expect(stats.allTimePeak.value).toBe(130);
    expect(stats.allTimePeak.date).toBe("2026-01-02");
    expect(stats.lastUpdatedDate).toBe("2026-01-03");
  });
});

describe("buildTableRows", () => {
  test("adds day-over-day delta", () => {
    const rows = buildTableRows(sample);
    expect(rows[0]?.realmeye_delta).toBeNull();
    expect(rows[1]?.realmeye_delta).toBe(30);
    expect(rows[2]?.realmeye_delta).toBe(-20);
  });
});
