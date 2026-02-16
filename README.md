# ROTMG Player Tracker

Static React dashboard for historical Realm of the Mad God player counts.

## Stack

- Bun + Vite + React + TypeScript
- Plotly (`react-plotly.js`) for time-series charts
- AG Grid Community for virtualized table view

## Local Development

```bash
bun install
bun run migrate:realmeye
bun run aggregate
bun run dev
```

## Scripts

- `bun run scrape` - Scrape RealmEye and RealmStock and append CSV rows.
- `bun run aggregate` - Aggregate full CSV files into `src/data/daily.json`.
- `bun run migrate:realmeye` - Convert the historical source CSV into release-format CSV.
- `bun run test` - Run unit tests.
- `bun run build` - Type-check and build production assets.
