import type { RangePreset } from "../utils/dateRange";
import { CalendarRange } from "lucide-react";

type RangeSelectorProps = {
  active: RangePreset;
  onSelect: (preset: RangePreset) => void;
};

const PRESETS: RangePreset[] = ["1M", "6M", "1Y", "2Y", "ALL"];

export function RangeSelector({ active, onSelect }: RangeSelectorProps) {
  return (
    <div
      className="inline-flex gap-2 p-1 border border-[var(--color-surface-2)] rounded-full bg-[var(--color-panel-highlight)]"
      role="group"
      aria-label="Date range presets"
    >
      <span className="inline-flex items-center text-[var(--color-text-muted)] px-1 pl-1.5" aria-hidden="true">
        <CalendarRange size={15} />
      </span>

      {PRESETS.map((preset) => (
        <button
          key={preset}
          type="button"
          className={`px-3 py-1.5 rounded-full font-semibold tracking-wide cursor-pointer transition-all duration-130 ${
            active === preset
              ? "bg-[var(--color-pill-active-bg)] border border-[var(--color-pill-active-border)] text-white"
              : "border border-transparent bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface-hover)]"
          }`}
          onClick={() => onSelect(preset)}
        >
          {preset}
        </button>
      ))}
    </div>
  );
}
