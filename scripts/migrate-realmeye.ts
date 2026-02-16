import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

type SourceRow = {
  time: string;
  date: string;
  players: number;
  notes: string;
};

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SOURCE_FILE = resolve(
  ROOT,
  "ROTMG Players Active Players Over Time - RealmEyeData.csv"
);
const OUTPUT_FILE = resolve(ROOT, "data", "realmeye-full.csv");

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

function normalizeTime(raw: string): string {
  const match = raw.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) {
    return "00:00:00";
  }

  const hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const seconds = Number.parseInt(match[3] ?? "0", 10);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pstToUtc(date: string, time: string): { date: string; time: string } {
  const iso = `${date}T${time}-08:00`;
  const converted = new Date(iso);
  return {
    date: converted.toISOString().slice(0, 10),
    time: converted.toISOString().slice(11, 19)
  };
}

function correctedPlayers(baseValue: number, notes: string): number {
  const lowerNotes = notes.toLowerCase();
  const hasCorrectionHint =
    lowerNotes.includes("correct") ||
    lowerNotes.includes("fixed") ||
    lowerNotes.includes("actual") ||
    lowerNotes.includes("use");

  if (!hasCorrectionHint) {
    return baseValue;
  }

  const matches = [...notes.matchAll(/(\d{4,7})/g)].map((item) => Number.parseInt(item[1], 10));
  if (matches.length === 0) {
    return baseValue;
  }

  return matches[matches.length - 1] ?? baseValue;
}

function parseRows(csv: string): SourceRow[] {
  const lines = csv.split(/\r?\n/).map((line) => line.trimEnd());
  const rows: SourceRow[] = [];

  for (const line of lines) {
    if (!line) {
      continue;
    }

    const parts = line.split(",");
    if (parts.length < 3) {
      continue;
    }

    const rawTime = parts[0]?.trim() ?? "";
    const rawDate = parts[1]?.trim() ?? "";
    const rawPlayers = parts[2]?.trim() ?? "";
    const notes = parts.slice(4).join(",").trim();

    if (!/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      continue;
    }

    const players = Number.parseInt(rawPlayers, 10);
    if (!Number.isFinite(players)) {
      continue;
    }

    rows.push({
      time: normalizeTime(rawTime),
      date: rawDate,
      players: correctedPlayers(players, notes),
      notes
    });
  }

  return rows;
}

function run(): void {
  if (!existsSync(SOURCE_FILE)) {
    throw new Error(`Missing source CSV: ${SOURCE_FILE}`);
  }

  const source = readFileSync(SOURCE_FILE, "utf8");
  const rows = parseRows(source);

  const seen = new Set<string>();
  const normalized = rows
    .map((row) => {
      const utc = pstToUtc(row.date, row.time);
      return {
        key: `${utc.date}T${utc.time}`,
        line: `${utc.time},${utc.date},${row.players}`
      };
    })
    .filter((entry) => {
      if (seen.has(entry.key)) {
        return false;
      }

      seen.add(entry.key);
      return true;
    })
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((entry) => entry.line);

  mkdirSync(resolve(ROOT, "data"), { recursive: true });
  writeFileSync(OUTPUT_FILE, `${normalized.join("\n")}\n`, "utf8");

  const realmstockPath = resolve(ROOT, "data", "realmstock-full.csv");
  if (!existsSync(realmstockPath)) {
    writeFileSync(realmstockPath, "", "utf8");
  }

  process.stdout.write(
    `Migrated ${rows.length} rows from source sheet to ${normalized.length} UTC rows.\n`
  );
}

run();
