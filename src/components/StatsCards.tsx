import type { StatsSummary } from "../utils/metrics";
import { ArrowDown, Clock3, Trophy, Users } from "lucide-react";

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
        <p className="stat-label with-icon">
          <Users size={14} aria-hidden="true" />
          Current RealmEye Count
        </p>
        <p className="stat-value mono">{formatNumber(stats.currentRealmeye)}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label with-icon">
          <Trophy size={14} aria-hidden="true" />
          All-Time Peak
        </p>
        <p className="stat-value mono">{formatNumber(stats.allTimePeak.value)}</p>
        <p className="stat-meta">{stats.allTimePeak.date ?? "-"}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label with-icon">
          <ArrowDown size={14} aria-hidden="true" />
          All-Time Low
        </p>
        <p className="stat-value mono">{formatNumber(stats.allTimeLow.value)}</p>
        <p className="stat-meta">{stats.allTimeLow.date ?? "-"}</p>
      </article>

      <article className="stat-card">
        <p className="stat-label with-icon">
          <Clock3 size={14} aria-hidden="true" />
          Last Updated (UTC)
        </p>
        <p className="stat-value">{stats.lastUpdatedDate ?? "-"}</p>
      </article>
    </section>
  );
}
