import { useMemo, useState } from "react";
import dailyData from "./data/daily.json";
import { DataTable } from "./components/DataTable";
import { PlayerChart } from "./components/PlayerChart";
import { RangeSelector } from "./components/RangeSelector";
import { StatsCards } from "./components/StatsCards";
import type { DailyPoint, DateRange } from "./types";
import { filterByRange, resolvePresetRange, type RangePreset } from "./utils/dateRange";
import { buildStats, buildTableRows } from "./utils/metrics";

type Tab = "charts" | "table";

const data = (dailyData as DailyPoint[]).slice().sort((a, b) => a.date.localeCompare(b.date));

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("charts");
  const [preset, setPreset] = useState<RangePreset>("1Y");
  const [range, setRange] = useState<DateRange>(() => resolvePresetRange(data, "1Y"));

  const filtered = useMemo(() => filterByRange(data, range), [range]);
  const stats = useMemo(() => buildStats(data), []);

  const tableRows = useMemo(() => buildTableRows(filtered), [filtered]);

  const dates = useMemo(() => filtered.map((item) => item.date), [filtered]);
  const realmeyeMin = useMemo(() => filtered.map((item) => item.realmeye_min), [filtered]);
  const realmeyeMax = useMemo(() => filtered.map((item) => item.realmeye_max), [filtered]);
  const realmstockMin = useMemo(() => filtered.map((item) => item.realmstock_min), [filtered]);
  const realmstockMax = useMemo(() => filtered.map((item) => item.realmstock_max), [filtered]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <h1>ROTMG Player Tracker</h1>
          <p>Daily player trends from RealmEye and RealmStock</p>
        </div>
      </header>

      <main className="page-container">
        <StatsCards stats={stats} />

        <section className="panel controls-panel">
          <div className="tabs" role="tablist" aria-label="View switcher">
            <button
              role="tab"
              aria-selected={activeTab === "charts"}
              className={`tab-button${activeTab === "charts" ? " active" : ""}`}
              onClick={() => setActiveTab("charts")}
            >
              Charts
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "table"}
              className={`tab-button${activeTab === "table" ? " active" : ""}`}
              onClick={() => setActiveTab("table")}
            >
              Data Table
            </button>
          </div>

          <RangeSelector
            active={preset}
            onSelect={(nextPreset) => {
              setPreset(nextPreset);
              setRange(resolvePresetRange(data, nextPreset));
            }}
          />
        </section>

        {activeTab === "charts" ? (
          <section className="charts-stack">
            <PlayerChart
              title="RealmEye Active Players Over Time"
              dates={dates}
              minValues={realmeyeMin}
              maxValues={realmeyeMax}
              range={range}
              onRangeChange={(nextRange) => {
                setPreset("ALL");
                setRange(nextRange);
              }}
              showRangeSlider={true}
            />

            <PlayerChart
              title="RealmStock Live Players Over Time"
              dates={dates}
              minValues={realmstockMin}
              maxValues={realmstockMax}
              range={range}
              onRangeChange={(nextRange) => {
                setPreset("ALL");
                setRange(nextRange);
              }}
              showRangeSlider={false}
            />
          </section>
        ) : (
          <DataTable rows={tableRows} />
        )}
      </main>
    </div>
  );
}
