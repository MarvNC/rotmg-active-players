function SkeletonCard() {
  return (
    <article className="border border-[var(--color-surface-2)] rounded-xl bg-gradient-to-b from-[var(--color-stat-card-bg-start)] to-[var(--color-stat-card-bg-end)] p-4 grid gap-2.5" aria-hidden="true">
      <div className="skeleton h-3 w-[42%]" />
      <div className="skeleton h-6 w-[68%]" />
      <div className="skeleton h-3 w-[54%]" />
    </article>
  );
}

function SkeletonChart() {
  return (
    <article className="border border-[var(--color-surface-2)] rounded-xl bg-[var(--color-surface-1)] p-3" aria-hidden="true">
      <div className="grid gap-2 mb-3">
        <div className="skeleton h-3.5 w-[36%]" />
        <div className="skeleton h-3 w-[52%]" />
      </div>
      <div className="skeleton w-full min-h-[280px] border border-[var(--color-chart-shell-border)] rounded-[10px]" />
    </article>
  );
}

export function AppSkeleton() {
  return (
    <>
      <section className="grid gap-4 grid-cols-4" aria-label="Loading summary cards">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>

      <section className="border border-[var(--color-surface-2)] rounded-xl bg-[var(--color-surface-1)] p-3 flex flex-wrap justify-between items-center gap-3 min-h-16" aria-label="Loading controls" aria-hidden="true">
        <div className="inline-flex items-center gap-2">
          <div className="skeleton w-[76px] h-8 rounded-full" />
          <div className="skeleton w-[76px] h-8 rounded-full" />
        </div>
        <div className="inline-flex items-center gap-2">
          <div className="skeleton w-[76px] h-8 rounded-full" />
          <div className="skeleton w-[76px] h-8 rounded-full" />
          <div className="skeleton w-[76px] h-8 rounded-full" />
          <div className="skeleton w-[76px] h-8 rounded-full" />
        </div>
      </section>

      <section className="grid gap-4" aria-label="Loading charts">
        <SkeletonChart />
        <SkeletonChart />
        <SkeletonChart />
      </section>
    </>
  );
}
