import { getScoreSemantic } from "./helpers";

export const tierInfoLabels: Record<string, string> = {
  "Tier 1": "Tier 1 - Direct Threats",
  "Tier 2": "Tier 2 - Adjacent Players",
  "Tier 3": "Tier 3 - Emerging",
};

export const tierFilterTier = (tier: string) =>
  tier === "all" ? "all" : tier === "Tier 1" ? "t1" : tier === "Tier 2" ? "t2" : "t3";

export const pctColor = (pct: number): string => {
  const v = Math.max(0, Math.min(100, Math.round(pct || 0)));

  if (v === 0) return "#A8A2B4";
  if (v <= 20) return "#EF4444";
  if (v <= 40) return "#F15A24";
  if (v <= 60) return "#F97316";
  if (v <= 70) return "#FBBF24";

  if (v <= 80) {
    const t = (v - 71) / 9;
    const start = { r: 0x3b, g: 0x82, b: 0xf6 };
    const end = { r: 0x16, g: 0x65, b: 0x34 };
    const r = Math.round(start.r + (end.r - start.r) * t);
    const g = Math.round(start.g + (end.g - start.g) * t);
    const b = Math.round(start.b + (end.b - start.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  if (v <= 90) return "#166534";
  return "#4ADE80";
};

export const readinessLabel = (r: string, d: string) => {
  if (r === "GA") return "GA";
  if (r === "Beta") return "Beta";

  if (!d) return "Planned";

  const [year, monthStr] = d.split("-");
  const month = Number(monthStr);

  if (!Number.isFinite(month) || month < 1 || month > 12) {
    return "Planned";
  }

  const quarter = Math.floor((month - 1) / 3) + 1;
  return `Planned: Q${quarter} ${year}`;
};

export const formatScore = (value: number): string => {
  const n = Number(value) || 0;
  return Number.isInteger(n) ? `${n}` : n.toFixed(2);
};

export const clamp420 = (text: string): string => {
  const t = (text || "").trim().replace(/\s+/g, " ");
  if (t.length <= 420) return t;
  return `${t.slice(0, 417).trimEnd()}…`;
};

export const autoCriterionExplanation = (args: {
  companyName: string;
  scoreVal: number;
  featureWhat: string;
  cellDescription: string;
}): string => {
  const { companyName, scoreVal, featureWhat, cellDescription } = args;
  const what = (featureWhat || "").trim();
  const evidence = (cellDescription || "").trim();
  const semantic = getScoreSemantic(scoreVal);

  if (scoreVal >= 4) {
    return clamp420(
      `${companyName} is ${semantic} here because ${evidence || "they deliver strongly on this."} ` +
      (what ? `In practice: ${what}. ` : "") +
      `When your prospect brings it up: "They do well here—where we go further is on outcomes and adoption, not just the feature. Happy to show you."`,
    );
  }
  if (scoreVal >= 3) {
    return clamp420(
      `${companyName} is ${semantic} here—${evidence || "solid but not best-in-class."} ` +
      (what ? `${what}. ` : "") +
      `You can say: "They’re decent here; the gap shows up in real-world use and reliability. We’d rather you compare end-to-end than this one knob."`,
    );
  }
  return clamp420(
    `${companyName} is ${semantic} here: ${evidence || "limited."} ` +
    (what ? `${what}. ` : "") +
    `Use it when they object: "We lead here and I’d be happy to show you the difference in a quick call so you can see it yourself."`,
  );
};

