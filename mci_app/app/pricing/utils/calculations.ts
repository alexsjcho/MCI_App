import type { Competitor, TCO } from "../types";

/** Compute 3-year TCO in $K units */
export function calcTCO(tco: TCO): number {
  return Math.round((tco.license * 3 + tco.impl + tco.training + tco.compute * 3 + tco.support * 3) / 1000);
}

/** Compute composite value score from raw scores */
export function calcValueScore(scores: Competitor["scores"]): number {
  return Math.round(
    scores.ai * 0.35 + scores.ease * 0.25 + scores.data * 0.2 + scores.enterprise * 0.12 + scores.support * 0.08,
  );
}

/** Short display name — strips common suffixes */
export function shortName(name: string): string {
  return name.replace(" Intelligence", "").replace(" Computing", "").replace("Microsoft ", "").replace(" Genie", "");
}

/** Format a dollar amount with comma separators */
export function fmtUSD(n: number): string {
  return "$" + n.toLocaleString();
}

/** Filter competitors to only selected IDs */
export function getSelectedComps(competitors: Competitor[], selectedIds: Set<string>): Competitor[] {
  return competitors.filter((c) => selectedIds.has(c.id));
}

/** Filter to only non-wisdom competitors */
export function getNonWisdom(competitors: Competitor[]): Competitor[] {
  return competitors.filter((c) => c.id !== "wisdom");
}

