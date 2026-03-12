import type { Category, Feature } from "./comparison-data";
import {
  COMP_NAMES,
  COMP_TIERS,
  DATA,
  QUARTER_ENDS,
  QUARTER_PREV_ENDS,
} from "./comparison-data";

export type ViewMode = "ideal" | "real" | "quarterly";

export function isFeatureReady(f: Feature): boolean {
  return f.wisdom.readiness === "GA";
}

export function isFeatureInQuarter(f: Feature, q: string): boolean {
  if (!f.wisdom.expectedDate) return false;
  return new Date(f.wisdom.expectedDate) <= QUARTER_ENDS[q];
}

export function isFeatureNewInQuarter(f: Feature, q: string): boolean {
  if (!f.wisdom.expectedDate) return false;
  const d = new Date(f.wisdom.expectedDate);
  const prev = QUARTER_PREV_ENDS[q];
  if (!prev) return d <= QUARTER_ENDS[q];
  return d > prev && d <= QUARTER_ENDS[q];
}

export function getWisdomScore(
  f: Feature,
  view: ViewMode,
  quarter: string
): number {
  if (view === "ideal") return f.wisdom.score;
  if (view === "real") return isFeatureReady(f) ? f.wisdom.score : 0;
  if (view === "quarterly")
    return isFeatureInQuarter(f, quarter) ? f.wisdom.score : 0;
  return f.wisdom.score;
}

export function isIncluded(
  f: Feature,
  view: ViewMode,
  quarter: string
): boolean {
  if (view === "ideal") return true;
  if (view === "real") return isFeatureReady(f);
  if (view === "quarterly") return isFeatureInQuarter(f, quarter);
  return true;
}

export function catWisdomTotal(
  cat: Category,
  view: ViewMode,
  quarter: string
): number {
  return cat.features.reduce(
    (s, f) => s + getWisdomScore(f, view, quarter),
    0
  );
}

export function catCompTotal(
  cat: Category,
  comp: string,
  view: ViewMode,
  quarter: string
): number {
  let t = 0;
  for (const f of cat.features) {
    if (view === "real" && !isFeatureReady(f)) continue;
    if (view === "quarterly" && !isFeatureInQuarter(f, quarter)) continue;
    t += f.competitors[comp]?.score ?? 0;
  }
  return t;
}

export function overallTotal(
  isWisdom: boolean,
  comp: string | null,
  view: ViewMode,
  quarter: string
): number {
  let t = 0;
  DATA.categories.forEach((cat) => {
    t += isWisdom
      ? catWisdomTotal(cat, view, quarter)
      : comp
        ? catCompTotal(cat, comp, view, quarter)
        : 0;
  });
  return t;
}

export function maxPossible(view: ViewMode, quarter: string): number {
  let m = 0;
  DATA.categories.forEach((cat) => {
    cat.features.forEach((f) => {
      if (isIncluded(f, view, quarter)) m += 5;
    });
  });
  return m;
}

export function scoreClass(s: number): string {
  const n = Math.round(Number(s) || 0);
  if (n >= 5) return "score-5";
  if (n >= 4) return "score-4";
  if (n >= 3) return "score-3";
  if (n >= 2) return "score-2";
  if (n >= 1) return "score-1";
  return "score-0";
}

export function tierClass(comp: string): "t1" | "t2" | "t3" {
  const t = COMP_TIERS[comp];
  if (t === "Tier 1") return "t1";
  if (t === "Tier 2") return "t2";
  return "t3";
}

export function trunc(str: string | undefined, len: number): string {
  if (!str) return "";
  return str.length > len ? str.substring(0, len) + "…" : str;
}

export function getVisibleCompetitors(
  visibleSet: Set<string>,
  tierFilter: string
): string[] {
  return COMP_NAMES.filter((c) => {
    if (!visibleSet.has(c)) return false;
    if (tierFilter === "all") return true;
    if (COMP_TIERS[c] !== tierFilter) return false;
    return true;
  });
}
