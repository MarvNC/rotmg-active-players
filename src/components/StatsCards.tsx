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

export function StatsCards({ stats }: StatsCardsProps) {
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
        <p className="stat-label">All-Time Low</p>
        <p className="stat-value mono">{formatNumber(stats.allTimeLow.value)}</p>
        <p className="stat-meta">{stats.allTimeLow.date ?? "-"}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label">Last Updated (UTC)</p>
        <p className="stat-value">{stats.lastUpdatedDate ?? "-"}</p>
      </article>
    </section>
  );
}
