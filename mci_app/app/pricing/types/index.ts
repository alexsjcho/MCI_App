// ─── Competitor ───────────────────────────────────────────────────────────────

export interface Scores {
  ai: number;
  ease: number;
  data: number;
  enterprise: number;
  support: number;
}

export interface TCO {
  license: number;
  impl: number;
  training: number;
  compute: number;
  support: number;
}

export type BadgeVariant = "enterprise" | "mid" | "smb" | "ai";

export interface Competitor {
  id: string;
  name: string;
  category: string;
  badge: BadgeVariant;
  badgeText: string;
  color: string;
  entryPrice: number;
  entryUnit: string;
  priceNote: string;
  scores: Scores;
  acv: number;
  valueScore: number;
  aiNative: boolean;
  transparent: boolean;
  tier: string[];
  tco: TCO;
}

// ─── Tiers ────────────────────────────────────────────────────────────────────

export interface TierItem {
  n: string; // name
  p: string; // price
  d: string; // description
  f: string[]; // features
}

export interface TierData {
  tiers: TierItem[];
}

// ─── Features / Matrix ────────────────────────────────────────────────────────

export type FeatureStatus = "full" | "partial" | "addon" | "no";

export interface Feature {
  cat: string;
  label: string;
  [competitorId: string]: FeatureStatus | string;
}

// ─── Tab IDs ──────────────────────────────────────────────────────────────────

export type TabId = "overview" | "valuemap" | "tco" | "tiers" | "matrix";

export const TAB_LABELS: Record<TabId, string> = {
  overview: "Overview",
  valuemap: "Value / Price Map",
  tco: "TCO Breakdown",
  tiers: "Tier Analysis",
  matrix: "Feature Matrix",
};

