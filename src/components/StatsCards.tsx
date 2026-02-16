import type { StatsSummary } from "../utils/metrics";

type StatsCardsProps = {
  stats: StatsSummary;
};

function formatNumber(value: number | null): string {
  if (value == null) {
    return "-";
  }

  return Intl.NumberFormat("en-US").format(value);
}

function formatPercent(value: number | null): string {
  if (value == null) {
    return "-";
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const trendPositive = (stats.trend30d.absolute ?? 0) >= 0;

  return (
    <section className="stats-grid" aria-label="Summary statistics">
      <article className="stat-card">
        <p className="stat-label">Current RealmEye Count</p>
        <p className="stat-value mono">{formatNumber(stats.currentRealmeye)}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">All-Time Peak</p>
        <p className="stat-value mono">{formatNumber(stats.allTimePeak.value)}</p>
        <p className="stat-meta">{stats.allTimePeak.date ?? "-"}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">30-Day Trend</p>
        <p className={`stat-value mono ${trendPositive ? "positive" : "negative"}`}>
          {stats.trend30d.absolute == null
            ? "-"
            : `${stats.trend30d.absolute >= 0 ? "+" : ""}${formatNumber(stats.trend30d.absolute)}`}
        </p>
        <p className="stat-meta">{formatPercent(stats.trend30d.percent)}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Last Updated (UTC)</p>
        <p className="stat-value">{stats.lastUpdatedDate ?? "-"}</p>
      </article>
    </section>
  );
}
