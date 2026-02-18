import { useEffect, useState } from "react";
import type { StatsSummary } from "../utils/metrics";
import { ArrowDown, Clock3, Trophy, Users } from "lucide-react";

type StatsCardsProps = {
  stats: StatsSummary;
};

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const localDateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "long",
});

function formatNumber(value: number | null): string {
  if (value == null) {
    return "-";
  }

  return Intl.NumberFormat("en-US").format(value);
}

function formatRelativeLastUpdated(value: string | null, nowTimestamp: number): string {
  if (value == null) {
    return "-";
  }

  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return "-";
  }

  const deltaInSeconds = Math.round((timestamp - nowTimestamp) / 1000);
  const absoluteSeconds = Math.abs(deltaInSeconds);

  if (absoluteSeconds < 60) {
    return relativeTimeFormatter.format(deltaInSeconds, "second");
  }

  const deltaInMinutes = Math.round(deltaInSeconds / 60);
  if (absoluteSeconds < 60 * 60) {
    return relativeTimeFormatter.format(deltaInMinutes, "minute");
  }

  const deltaInHours = Math.round(deltaInSeconds / (60 * 60));
  if (absoluteSeconds < 24 * 60 * 60) {
    return relativeTimeFormatter.format(deltaInHours, "hour");
  }

  const deltaInDays = Math.round(deltaInSeconds / (24 * 60 * 60));
  if (absoluteSeconds < 30 * 24 * 60 * 60) {
    return relativeTimeFormatter.format(deltaInDays, "day");
  }

  const deltaInMonths = Math.round(deltaInDays / 30);
  if (absoluteSeconds < 365 * 24 * 60 * 60) {
    return relativeTimeFormatter.format(deltaInMonths, "month");
  }

  const deltaInYears = Math.round(deltaInDays / 365);

  return relativeTimeFormatter.format(deltaInYears, "year");
}

function formatLocalLastUpdated(value: string | null): string {
  if (value == null) {
    return "-";
  }

  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return "-";
  }

  return localDateTimeFormatter.format(new Date(timestamp));
}

export function StatsCards({ stats }: StatsCardsProps) {
  const [nowTimestamp, setNowTimestamp] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNowTimestamp(Date.now());
    }, 30 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="grid gap-4 grid-cols-4" aria-label="Summary statistics">
      <article className="border border-[var(--color-surface-2)] rounded-xl bg-gradient-to-b from-[var(--color-stat-card-bg-start)] to-[var(--color-stat-card-bg-end)] p-4 transition-all duration-160 hover:border-[rgba(220,40,40,0.38)] hover:-translate-y-px animate-[card-enter_260ms_ease_both]">
        <p className="m-0 text-[var(--color-text-muted)] text-[0.8rem] uppercase tracking-widest inline-flex items-center gap-1.5">
          <Users
            size={14}
            aria-hidden="true"
            className="text-[var(--color-brand-red)] transition-transform duration-140 group-hover:scale-[1.08]"
          />
          Current RealmEye Count
        </p>
        <p
          className="my-3 mb-1.5 text-[1.35rem] font-bold tabular-nums"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {formatNumber(stats.currentRealmeye)}
        </p>
      </article>

      <article className="border border-[var(--color-surface-2)] rounded-xl bg-gradient-to-b from-[var(--color-stat-card-bg-start)] to-[var(--color-stat-card-bg-end)] p-4 transition-all duration-160 hover:border-[rgba(220,40,40,0.38)] hover:-translate-y-px animate-[card-enter_260ms_ease_both]">
        <p className="m-0 text-[var(--color-text-muted)] text-[0.8rem] uppercase tracking-widest inline-flex items-center gap-1.5">
          <Trophy
            size={14}
            aria-hidden="true"
            className="text-[var(--color-brand-red)] transition-transform duration-140 group-hover:scale-[1.08]"
          />
          All-Time Peak
        </p>
        <p
          className="my-3 mb-1.5 text-[1.35rem] font-bold tabular-nums"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {formatNumber(stats.allTimePeak.value)}
        </p>
        <p className="m-0 text-[var(--color-text-muted)] text-[0.88rem]">{stats.allTimePeak.date ?? "-"}</p>
      </article>

      <article className="border border-[var(--color-surface-2)] rounded-xl bg-gradient-to-b from-[var(--color-stat-card-bg-start)] to-[var(--color-stat-card-bg-end)] p-4 transition-all duration-160 hover:border-[rgba(220,40,40,0.38)] hover:-translate-y-px animate-[card-enter_260ms_ease_both]">
        <p className="m-0 text-[var(--color-text-muted)] text-[0.8rem] uppercase tracking-widest inline-flex items-center gap-1.5">
          <ArrowDown
            size={14}
            aria-hidden="true"
            className="text-[var(--color-brand-red)] transition-transform duration-140 group-hover:scale-[1.08]"
          />
          All-Time Low
        </p>
        <p
          className="my-3 mb-1.5 text-[1.35rem] font-bold tabular-nums"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {formatNumber(stats.allTimeLow.value)}
        </p>
        <p className="m-0 text-[var(--color-text-muted)] text-[0.88rem]">{stats.allTimeLow.date ?? "-"}</p>
      </article>

      <article className="border border-[var(--color-surface-2)] rounded-xl bg-gradient-to-b from-[var(--color-stat-card-bg-start)] to-[var(--color-stat-card-bg-end)] p-4 transition-all duration-160 hover:border-[rgba(220,40,40,0.38)] hover:-translate-y-px animate-[card-enter_260ms_ease_both]">
        <p className="m-0 text-[var(--color-text-muted)] text-[0.8rem] uppercase tracking-widest inline-flex items-center gap-1.5">
          <Clock3
            size={14}
            aria-hidden="true"
            className="text-[var(--color-brand-red)] transition-transform duration-140 group-hover:scale-[1.08]"
          />
          Last Updated
        </p>
        <p className="my-3 mb-1.5 text-[1.35rem] font-bold">
          {formatRelativeLastUpdated(stats.lastUpdatedAt, nowTimestamp)}
        </p>
        <p className="m-0 text-[var(--color-text-muted)] text-[0.88rem]">
          {formatLocalLastUpdated(stats.lastUpdatedAt)} local time
        </p>
      </article>
    </section>
  );
}
