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
        {
          label: "Gartner: Analytics & BI Platforms",
          url: "https://www.gartner.com/reviews/market/analytics-business-intelligence-platforms",
        },
      ],
    },
};

export function getCriterionDetail(
  categoryName: string,
  featureName: string,
  criterionKey: FeatureCriterionKey,
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
  criterionKey: FeatureCriterionKey,
): CriterionDetail {
  const key = `${categoryName}|${featureName}|${competitorName}|${criterionKey}`;
  return COMPETITOR_CRITERION_DETAILS[key] ?? {};
}

/** Per-criterion scores for a competitor on a feature. Derived from the single competitor score so total matches. */
export function getCompetitorCriteriaScores(
  f: Feature,
  competitorName: string,
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

/** Messaging & positioning from WisdomAI's perspective vs competitor (SPY Framework). */
export type MessagingPositioning = {
  /** So What: Why this matters to the prospect right now. */
  soWhat: string;
  /** Prove It: Evidence, references, or data points that back the claim. */
  proveIt: string;
  /** Why You: Why WisdomAI is the right choice over the competitor. */
  whyYou: string;
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

/** Competitive Edge Scoring Rubric: score -> semantic description (no raw "X/5" in copy). */
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

function scoreCorrelatedMessaging(
  featureName: string,
  competitorName: string,
  wisdomScore: number,
  compScore: number,
  wisdomDesc: string,
  compDesc: string,
): MessagingPositioning {
  const w = Math.round(wisdomScore);
  const c = Math.round(compScore);
  const ourSemantic = getScoreSemantic(w);
  const theirSemantic = getScoreSemantic(c);
  const ourEdge = (wisdomDesc || "our approach").slice(0, 60);
  const theirAngle = (compDesc || "their approach").slice(0, 50);

  let soWhat: string;
  let proveIt: string;
  let whyYou: string;
  let hook: string;
  let flaw: string;
  let counter: string;
  let landmine: string;

  if (w > c) {
    soWhat =
      `Your team needs ${featureName} that actually works in production, not just in a demo. ${competitorName} is ${theirSemantic} here, which means your people will hit friction fast. That slows adoption and kills ROI before you even get started.`;
    proveIt =
      `WisdomAI is ${ourSemantic} on ${featureName} vs. ${competitorName}'s ${theirSemantic}. Customers report faster time-to-value and higher weekly active usage because we focus on ${ourEdge}. Ask for a reference call or a side-by-side in your environment to see the gap firsthand.`;
    whyYou =
      `We built ${featureName} around ${ourEdge}, so your team adopts it day one, not day never. With WisdomAI you get outcomes and adoption, not just a checkbox on a slide.`;
    hook =
      `What ${competitorName} will tell your prospect: "We have strong ${featureName} - ${theirAngle}."`;
    flaw =
      `What you can say back: "The gap is real. We're ${ourSemantic} here and they're ${theirSemantic}. Their approach still leaves teams with a lot of manual work and friction. I'd ask how often that actually slows your people down."`;
    counter =
      `Your line: "With WisdomAI, we're ${ourSemantic} on ${featureName} because we focus on ${ourEdge}. So you get adoption and outcomes, not just a feature that looks good in a slide. Want to see it in a real workflow?"`;
    landmine =
      `Ask your prospect: "When this kind of feature is slow or breaks, how quickly does your team today get back on track, and how often does that happen with ${competitorName}?"`;
  } else if (w < c) {
    soWhat =
      `${competitorName} leads on ${featureName} in isolation, but a single feature score doesn't tell you whether your team will actually use it. What matters is how it fits into real workflows and whether it delivers value beyond the demo.`;
    proveIt =
      `WisdomAI is ${ourSemantic} on ${featureName} while ${competitorName} is ${theirSemantic}, but our customers choose us for total platform value. We focus on ${ourEdge}, which drives real adoption. We're happy to do a side-by-side in your environment so you can judge fit, not just the feature list.`;
    whyYou =
      `We position ${featureName} as part of how your team already works: ${ourEdge}. You're not buying a checkbox; you're buying something people will use every day. Compare total value and where we lead, not just this one feature.`;
    hook =
      `What ${competitorName} will tell your prospect: "We're ahead on ${featureName} - ${theirAngle}."`;
    flaw =
      `What you can say back: "They're ${theirSemantic} on this one piece. We're ${ourSemantic}. The piece they don't talk about is reliability and whether anyone actually uses it. We've built ours so it gets used every day, not just in a demo."`;
    counter =
      `Your line: "We position ${featureName} as part of how your team already works: ${ourEdge}. So you're not buying a checkbox; you're buying something people will use. I'd compare total value and where we lead, not just this feature."`;
    landmine =
      `Ask your prospect: "Beyond the demo, how often do your users actually rely on ${competitorName} for this, and how do you measure that?"`;
  } else {
    soWhat =
      `You're evaluating two platforms that score similarly on ${featureName}. The real question isn't "who has it" but "whose version will my team actually use?" That's where evaluations stall, and where the wrong choice costs you months.`;
    proveIt =
      `Both WisdomAI and ${competitorName} are ${ourSemantic} on ${featureName}. The difference shows up in ease of use, explainability, and workflow integration: ${ourEdge}. We're happy to walk through a real workflow or share a customer story so you can see the difference beyond the scorecard.`;
    whyYou =
      `We built ${featureName} so ${ourEdge}. It plugs into how your data team works instead of adding another silo. With WisdomAI, your team extends how they already work rather than learning another tool.`;
    hook =
      `What ${competitorName} will tell your prospect: "We're right there on ${featureName} - ${theirAngle}."`;
    flaw =
      `What you can say back: "We're both ${ourSemantic} here. What doesn't show up is ease of use, explainability, and how it fits your workflows. That's where we see customers choose us."`;
    counter =
      `Your line: "We're ${ourSemantic} on ${featureName}, but we've built it so ${ourEdge}. So it plugs into how your data team works instead of adding another tool that only looks good in a deck. Want to see it in your environment?"`;
    landmine =
      `Ask your prospect: "When you evaluate this, how will you test real workflows and handoffs, not just whether the demo looks good?"`;
  }

  return {
    soWhat,
    proveIt,
    whyYou,
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
  compDescription: string,
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
    compDescription,
  );
}

export function getMessagingPositioning(
  categoryName: string,
  featureName: string,
  competitorName: string,
  compDescription: string,
): MessagingPositioning {
  const key = `${categoryName}|${featureName}|${competitorName}`;
  const stored = MESSAGING_POSITIONING[key];
  if (stored) return stored;
  return defaultMessagingPositioning(
    categoryName,
    featureName,
    competitorName,
    compDescription,
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
  quarter: string,
): number {
  const base = wisdomBaseScoreFromCriteria(f);

  if (view === "ideal") return base;

  if (view === "real") {
    return f.wisdom.readiness === "GA" ? base : 0;
  }

  if (view === "quarterly") {
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
  quarter: string,
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
  quarter: string,
): number {
  return cat.features.reduce(
    (s, f) => s + getWisdomScore(f, view, quarter),
    0,
  );
}

export function catCompTotal(
  cat: Category,
  comp: string,
  view: ViewMode,
  quarter: string,
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
  quarter: string,
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
  return str.length > len ? str.substring(0, len) + "\u2026" : str;
}

export function getVisibleCompetitors(
  visibleSet: Set<string>,
  tierFilter: string,
): string[] {
  return COMP_NAMES.filter((c) => {
    if (!visibleSet.has(c)) return false;
    if (tierFilter === "all") return true;
    if (COMP_TIERS[c] !== tierFilter) return false;
    return true;
  });
}
