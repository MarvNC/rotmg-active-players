export type DailyPoint = {
  date: string;
  realmeye_max: number | null;
  realmeye_min: number | null;
  realmstock_max: number | null;
  realmstock_min: number | null;
  launcher_loads: number | null;
};

export type CompactDaily = {
  d: string[];
  a: Array<number | null>;
  b: Array<number | null>;
  c: Array<number | null>;
  e: Array<number | null>;
  f: Array<number | null>;
};

export type DateRange = {
  start: string;
  end: string;
};
