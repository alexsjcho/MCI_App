export type BadgeVariant = "enterprise" | "mid" | "smb" | "ai";

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

export interface TierItem {
  n: string;
  p: string;
  d: string;
  f: string[];
}

export interface TierData {
  tiers: TierItem[];
}

export type FeatureStatus = "full" | "partial" | "addon" | "no";

export interface Feature {
  cat: string;
  label: string;
  [competitorId: string]: FeatureStatus | string;
}

