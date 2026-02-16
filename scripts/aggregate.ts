import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

type DailyAggregate = {
  date: string;
  realmeye_max: number | null;
  realmeye_min: number | null;
  realmstock_max: number | null;
  realmstock_min: number | null;
};

type Row = {
  date: string;
  players: number;
};

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const REALMEYE_FALLBACK = resolve(
  ROOT,
  "ROTMG Players Active Players Over Time - RealmEyeData.csv"
);
const REALMEYE_FILE = resolve(ROOT, "data", "realmeye-full.csv");
const REALMSTOCK_FILE = resolve(ROOT, "data", "realmstock-full.csv");
const OUTPUT_FILE = resolve(ROOT, "src", "data", "daily.json");

function parseCsvRows(inputPath: string): Row[] {
  if (!existsSync(inputPath)) {
    return [];
  }

  const lines = readFileSync(inputPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const rows: Row[] = [];

  for (const line of lines) {
    const [_, rawDate, rawPlayers] = line.split(",", 3).map((part) => part.trim());
    if (!rawDate || !rawPlayers) {
      continue;
    }

    const players = Number.parseInt(rawPlayers, 10);
    if (!Number.isFinite(players)) {
      continue;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      continue;
    }

    rows.push({ date: rawDate, players });
  }

  return rows;
}

function aggregateByDate(rows: Row[]): Map<string, { min: number; max: number }> {
  const daily = new Map<string, { min: number; max: number }>();

  for (const row of rows) {
    const existing = daily.get(row.date);
    if (!existing) {
      daily.set(row.date, { min: row.players, max: row.players });
      continue;
    }

    if (row.players < existing.min) {
      existing.min = row.players;
    }
    if (row.players > existing.max) {
      existing.max = row.players;
    }
  }

  return daily;
}

function mergeDaily(
  realmeyeDaily: Map<string, { min: number; max: number }>,
  realmstockDaily: Map<string, { min: number; max: number }>
): DailyAggregate[] {
  const dates = new Set<string>([
    ...realmeyeDaily.keys(),
    ...realmstockDaily.keys()
  ]);

  return Array.from(dates)
    .sort((a, b) => a.localeCompare(b))
    .map((date) => {
      const realmeye = realmeyeDaily.get(date) ?? null;
      const realmstock = realmstockDaily.get(date) ?? null;

      return {
        date,
        realmeye_max: realmeye?.max ?? null,
        realmeye_min: realmeye?.min ?? null,
        realmstock_max: realmstock?.max ?? null,
        realmstock_min: realmstock?.min ?? null
      };
    });
}

function run(): void {
  const realmeyeSource = existsSync(REALMEYE_FILE) ? REALMEYE_FILE : REALMEYE_FALLBACK;
  const realmeyeRows = parseCsvRows(realmeyeSource);
  const realmstockRows = parseCsvRows(REALMSTOCK_FILE);

  const merged = mergeDaily(aggregateByDate(realmeyeRows), aggregateByDate(realmstockRows));

  mkdirSync(resolve(ROOT, "src", "data"), { recursive: true });
  writeFileSync(OUTPUT_FILE, `${JSON.stringify(merged, null, 2)}\n`, "utf8");

  process.stdout.write(
    `Aggregated ${merged.length} days from ${realmeyeRows.length} RealmEye rows and ${realmstockRows.length} RealmStock rows.\n`
  );
}

run();
