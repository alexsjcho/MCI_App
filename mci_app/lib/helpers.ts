import type { Category, Feature } from "./comparison-data";
import {
  COMP_NAMES,
  COMP_TIERS,
  DATA,
  QUARTER_ENDS,
  QUARTER_PREV_ENDS,
} from "./comparison-data";

export type ViewMode = "ideal" | "real" | "quarterly";

export type FeatureCriterionKey =
  | "userPainPointResolution"
  | "easeOfUse"
  | "depthOfFunctionality"
  | "reliabilityAndPerformance"
  | "uniqueValueProposition";

export const FEATURE_CRITERIA_META: {
  key: FeatureCriterionKey;
  title: string;
  description: string;
}[] = [
  {
    key: "userPainPointResolution",
    title: "User Pain Point Resolution",
    description:
      "How effectively the feature removes friction and solves a real user problem compared to competitors.",
  },
  {
    key: "easeOfUse",
    title: "Ease of Use (UX/UI Friction)",
    description:
      "How quickly a new user can get value from the feature without extensive training or setup.",
  },
  {
    key: "depthOfFunctionality",
    title: "Depth of Functionality",
    description:
      "How well the feature handles complex, real-world scenarios and advanced use cases.",
  },
  {
    key: "reliabilityAndPerformance",
    title: "Reliability & Performance",
    description:
      "How consistently the feature works in production and how performant it is under load.",
  },
  {
    key: "uniqueValueProposition",
    title: "Unique Value Proposition (Differentiator)",
    description:
      "How much the feature differentiates the product and creates a reason to switch from competitors.",
  },
];

/** Per-criterion rationale: why the score was given, with examples and research links. */
export type CriterionDetail = {
  explanation?: string;
  examples?: string[];
  links?: { label: string; url: string }[];
};

/** Lookup key: "categoryName|featureName|criterionKey". Add entries here for researched rationale. */
const CRITERION_DETAILS: Record<string, CriterionDetail> = {
  // Example: Natural Language & Conversational AI > Natural Language Query (NLQ)
  "Natural Language & Conversational AI|Natural Language Query (NLQ)|userPainPointResolution":
    {
      explanation:
        "WisdomAI addresses the core pain of unreliable AI answers by having LLMs generate queries rather than final answers, reducing hallucination risk and user frustration.",
      examples: [
        "Users get SQL-backed answers instead of free-form text that may be wrong.",
        "Competitors often surface copilot suggestions that require verification.",
      ],
      links: [
        { label: "Gartner: Analytics & BI Platforms", url: "https://www.gartner.com/reviews/market/analytics-business-intelligence-platforms" },
      ],
    },
};

export function getCriterionDetail(
  categoryName: string,
  featureName: string,
  criterionKey: FeatureCriterionKey
): CriterionDetail {
  const key = `${categoryName}|${featureName}|${criterionKey}`;
  return CRITERION_DETAILS[key] ?? {};
}

/** Lookup key: "categoryName|featureName|competitorName|criterionKey". Add entries for competitor rationale. */
const COMPETITOR_CRITERION_DETAILS: Record<string, CriterionDetail> = {};

export function getCompetitorCriterionDetail(
  categoryName: string,
  featureName: string,
  competitorName: string,
  criterionKey: FeatureCriterionKey
): CriterionDetail {
  const key = `${categoryName}|${featureName}|${competitorName}|${criterionKey}`;
  return COMPETITOR_CRITERION_DETAILS[key] ?? {};
}

/** Per-criterion scores for a competitor on a feature. Derived from the single competitor score so total matches. */
export function getCompetitorCriteriaScores(
  f: Feature,
  competitorName: string
): Record<FeatureCriterionKey, number> {
  const base = Number(f.competitors[competitorName]?.score ?? 0);
  return {
    userPainPointResolution: base,
    easeOfUse: base,
    depthOfFunctionality: base,
    reliabilityAndPerformance: base,
    uniqueValueProposition: base,
  };
}

/** Messaging & positioning from WisdomAI's perspective vs competitor. */
export type MessagingPositioning = {
  /** Response: Short summary, max 280 chars. */
  responseShort: string;
  /** Response: Medium summary 280–560 chars. */
  responseMedium: string;
  /** Response: Long summary 560–1000 chars. */
  responseLong: string;
  /** What the competitor tells the prospect. */
  hook: string;
  /** The flaw in that logic / reality. */
  flaw: string;
  /** Our counter-positioning message. */
  counter: string;
  /** Landmine question to expose the weakness. */
  landmine: string;
};

const MESSAGING_POSITIONING: Record<string, MessagingPositioning> = {};

/** Competitive Edge Scoring Rubric: score → semantic description (no raw "X/5" in copy). */
const SCORE_SEMANTIC: Record<number, string> = {
  0: "absent",
  1: "minimal",
  2: "comparable",
  3: "solid",
  4: "leading",
  5: "dominant",
};

export function getScoreSemantic(score: number): string {
  const n = Math.max(0, Math.min(5, Math.round(Number(score) || 0)));
  return SCORE_SEMANTIC[n] ?? "comparable";
}

function truncateSnippet(s: string, max = 140): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd();
}

function clampLength(s: string, _min: number, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd();
}

function scoreCorrelatedMessaging(
  featureName: string,
  competitorName: string,
  wisdomScore: number,
  compScore: number,
  wisdomDesc: string,
  compDesc: string
): MessagingPositioning {
  const w = Math.round(wisdomScore);
  const c = Math.round(compScore);
  const ourSemantic = getScoreSemantic(w);
  const theirSemantic = getScoreSemantic(c);
  const ourEdge = (wisdomDesc || "our approach").slice(0, 60);
  const theirAngle = (compDesc || "their approach").slice(0, 50);

  // Build long narrative first (target 560–1000 chars). Voice: what you say to the prospect.
  let longNarrative: string;
  if (w > c) {
    longNarrative =
      `When they bring up ${competitorName} on ${featureName}, you can say: “We’re ${ourSemantic} here—they’re ${theirSemantic}. The difference is we focus on ${ourEdge}. So your team gets real adoption and fewer headaches, not just another tool that looks good in a demo.” ` +
      `If they push back, lean on that gap and ask how often their current or alternative solution actually gets used day to day. ` +
      `You can add: “Customers tell us the gap shows up in time-to-value and how much their teams rely on it week over week. Happy to share a reference or walk through a real workflow so you can see the difference.”`;
  } else if (w < c) {
    longNarrative =
      `When they say ${competitorName} is stronger on ${featureName}, you can say: “They’re ${theirSemantic} on that one piece—we’re ${ourSemantic}. What we’ve seen is that matters less than how it fits into how people work. With us, ${ourEdge}. So the feature gets used, not just demoed. I’d rather you compare total value and where we lead than this single checkbox.” ` +
      `Then pivot to capabilities where we win and to proof—references, benchmarks—so they see the full picture. ` +
      `You can say: “If you’d like, we can do a side-by-side in your environment so you can judge adoption and fit, not just the feature list.”`;
  } else {
    longNarrative =
      `When they say ${competitorName} is similar on ${featureName}, you can say: “We’re both ${ourSemantic} here. Where we pull ahead is how it works in practice: ${ourEdge}. So your team isn’t adding another silo; they’re extending how they already work.” ` +
      `Offer to walk through a real workflow or a customer story so they see the difference. ` +
      `Add: “A lot of evaluations stop at the demo. We’re happy to show you how this plugs into your existing tools and who on your team would actually use it day to day.”`;
  }

  const responseShort = truncateSnippet(longNarrative, 280);
  const responseMedium =
    longNarrative.length > 280 ? clampLength(longNarrative, 281, 560) : longNarrative;
  const responseLong =
    longNarrative.length > 560 ? clampLength(longNarrative, 561, 1000) : longNarrative;

  // Hook: what the competitor tells the prospect (script they'll hear).
  let hook: string;
  let flaw: string;
  let counter: string;
  let landmine: string;

  if (w > c) {
    hook =
      `What ${competitorName} will tell your prospect: “We have strong ${featureName}—${theirAngle}.”`;
    flaw =
      `What you can say back: “The gap is real—we’re ${ourSemantic} here and they’re ${theirSemantic}. Their approach still leaves teams with a lot of manual work and friction. I’d ask how often that actually slows your people down.”`;
    counter =
      `Your line: “With WisdomAI, we’re ${ourSemantic} on ${featureName} because we focus on ${ourEdge}. So you get adoption and outcomes, not just a feature that looks good in a slide. Want to see it in a real workflow?”`;
    landmine =
      `Ask your prospect: “When this kind of feature is slow or breaks, how quickly does your team today get back on track—and how often does that happen with ${competitorName}?”`;
  } else if (w < c) {
    hook =
      `What ${competitorName} will tell your prospect: “We’re ahead on ${featureName}—${theirAngle}.”`;
    flaw =
      `What you can say back: “They’re ${theirSemantic} on this one piece—we’re ${ourSemantic}. The piece they don’t talk about is reliability and whether anyone actually uses it. We’ve built ours so it gets used every day, not just in a demo.”`;
    counter =
      `Your line: “We position ${featureName} as part of how your team already works—${ourEdge}. So you’re not buying a checkbox; you’re buying something people will use. I’d compare total value and where we lead, not just this feature.”`;
    landmine =
      `Ask your prospect: “Beyond the demo, how often do your users actually rely on ${competitorName} for this, and how do you measure that?”`;
  } else {
    hook =
      `What ${competitorName} will tell your prospect: “We’re right there on ${featureName}—${theirAngle}.”`;
    flaw =
      `What you can say back: “We’re both ${ourSemantic} here. What doesn’t show up is ease of use, explainability, and how it fits your workflows. That’s where we see customers choose us.”`;
    counter =
      `Your line: “We’re ${ourSemantic} on ${featureName}, but we’ve built it so ${ourEdge}. So it plugs into how your data team works instead of adding another tool that only looks good in a deck. Want to see it in your environment?”`;
    landmine =
      `Ask your prospect: “When you evaluate this, how will you test real workflows and handoffs—not just whether the demo looks good?”`;
  }

  return {
    responseShort,
    responseMedium,
    responseLong,
    hook: truncateSnippet(hook, 420),
    flaw: truncateSnippet(flaw, 420),
    counter: truncateSnippet(counter, 420),
    landmine: truncateSnippet(landmine, 420),
  };
}

function defaultMessagingPositioning(
  categoryName: string,
  featureName: string,
  competitorName: string,
  compDescription: string
): MessagingPositioning {
  const category = DATA.categories.find((c) => c.name === categoryName);
  const feature = category?.features.find((f) => f.name === featureName);
  const wisdomScore = feature?.wisdom?.score ?? 0;
  const compScore = feature?.competitors[competitorName]?.score ?? 0;
  const wisdomDesc = feature?.wisdom?.description ?? "";

  return scoreCorrelatedMessaging(
    featureName,
    competitorName,
    wisdomScore,
    compScore,
    wisdomDesc,
    compDescription
  );
}

export function getMessagingPositioning(
  categoryName: string,
  featureName: string,
  competitorName: string,
  compDescription: string
): MessagingPositioning {
  const key = `${categoryName}|${featureName}|${competitorName}`;
  const stored = MESSAGING_POSITIONING[key];
  if (stored) return stored;
  return defaultMessagingPositioning(
    categoryName,
    featureName,
    competitorName,
    compDescription
  );
}

export function isFeatureReady(f: Feature): boolean {
  return f.wisdom.readiness === "GA";
}

export function getFeatureCriteriaScores(
  f: Feature,
): Record<FeatureCriterionKey, number> {
  // For now, use the existing wisdom.score value for each criterion so that
  // totals remain consistent while still exposing a 5-criterion model.
  const base = Number(f.wisdom.score ?? 0);
  return {
    userPainPointResolution: base,
    easeOfUse: base,
    depthOfFunctionality: base,
    reliabilityAndPerformance: base,
    uniqueValueProposition: base,
  };
}

function wisdomBaseScoreFromCriteria(f: Feature): number {
  const criteria = getFeatureCriteriaScores(f);
  const sum = Object.values(criteria).reduce(
    (acc, value) => acc + (Number(value) || 0),
    0,
  );
  // Each criterion is scored 0–5. A perfect 5 contributes 1 point to the
  // overall feature score (max 5). This yields a 0–5 score with 2-decimal
  // granularity.
  const total = (sum / 25) * 5;
  return Number.isFinite(total) ? total : 0;
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
  const base = wisdomBaseScoreFromCriteria(f);

  if (view === "ideal") return base;

  if (view === "real") {
    // Real Comparison (GA view): only score GA features, Beta/Planned = 0
    return f.wisdom.readiness === "GA" ? base : 0;
  }

  if (view === "quarterly") {
    // Target Release view: only score GA/Beta that are available by the selected quarter
    if (
      (f.wisdom.readiness === "GA" || f.wisdom.readiness === "Beta") &&
      isFeatureInQuarter(f, quarter)
    ) {
      return base;
    }
    return 0;
  }

  return base;
}

export function isIncluded(
  f: Feature,
  view: ViewMode,
  quarter: string
): boolean {
  if (view === "ideal") return true;
  if (view === "real") return f.wisdom.readiness === "GA";
  if (view === "quarterly")
    return (
      (f.wisdom.readiness === "GA" || f.wisdom.readiness === "Beta") &&
      isFeatureInQuarter(f, quarter)
    );
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
