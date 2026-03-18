import type { ProductId } from "./products";
import type { IndustryId } from "./industries";
import type { FrameworkCriterion, QualifiedOpportunityExample } from "./types";

type MettricContent = {
  howToQualify: string;
  discoveryQuestions: string[];
  redFlags: string[];
};

const mettricBase: Pick<FrameworkCriterion, "id" | "name" | "abbreviation" | "definition">[] = [
  {
    id: "measure-outcomes",
    name: "Measure Outcomes",
    abbreviation: "M",
    definition:
      "A qualified opportunity has at least one explicit success goal, mapped to measurable business outcomes (often via OKRs) and the metrics that prove improvement.",
  },
  {
    id: "identify-challenges-rewards",
    name: "Identify Challenges & Rewards",
    abbreviation: "I",
    definition:
      "Translate discovery into PoC-able challenges and rewards: what is broken today, what outcome is desired, and what proof must exist for the customer to believe the change will work.",
  },
  {
    id: "test-feasibility",
    name: "Test Feasibility",
    abbreviation: "T",
    definition:
      "Validate that at least the core use cases are supported (or can be proven with a workaround PoC). If a core use case cannot be supported, feasibility is not qualified.",
  },
  {
    id: "timeline",
    name: "Timeline",
    abbreviation: "T",
    definition:
      "There must be at least one tangible delivery timeline that aligns to real programs/projects. A qualified opportunity has a plan, not just intentions.",
  },
  {
    id: "roi-vs-cost",
    name: "ROI vs Cost",
    abbreviation: "R",
    definition:
      "A commercial judgment call that compares the ROI of changing to the cost of implementing (and the cost of not changing). Metrics must show why the change wins.",
  },
  {
    id: "executive-buy-in",
    name: "Executive Buy-In",
    abbreviation: "E",
    definition:
      "Qualification requires at least one (often multiple) executives who confirm the pain and the goals they want met, including what success looks like.",
  },
  {
    id: "commitment-to-change",
    name: "Commitment to Change",
    abbreviation: "C",
    definition:
      "Once prior criteria are satisfied, identify deal blockers and demonstrate the GTM path to commitment by addressing each blocker (price, risk, feasibility, and adoption).",
  },
];

const productLabel: Record<ProductId, string> = {
  "conversational-bi": "Conversational BI",
  "ai-dashboards": "AI-powered Dashboards",
  "proactive-agents": "Proactive Agents",
};

const industryLabel: Record<IndustryId, string> = {
  "financial-services": "Financial Services",
  healthcare: "Healthcare",
  retail: "Retail & E-Commerce",
  manufacturing: "Manufacturing",
  government: "Government",
};

const industryOutcomeExamples: Record<IndustryId, string[]> = {
  "financial-services": [
    "faster regulatory/risk reporting cycles",
    "reduced analyst rework from inconsistent metrics",
    "improved time-to-decision for exposure and risk views",
  ],
  healthcare: [
    "improved clinical/quality measure reporting timeliness",
    "reduced manual compilation effort for recurring clinical/ops reports",
    "better patient safety signal monitoring",
  ],
  retail: [
    "reduced stockout-driven revenue loss and faster issue detection",
    "more consistent omnichannel metric definitions",
    "improved merchandising and promotion decision speed",
  ],
  manufacturing: [
    "reduced unplanned downtime and scrap/rework from late detection",
    "faster root-cause analysis across ERP/MES/quality signals",
    "improved OEE and operational decision responsiveness",
  ],
  government: [
    "shorter FOIA/legislative response times with auditable outputs",
    "reduced audit findings tied to legacy reporting gaps",
    "improved transparency and cross-agency visibility",
  ],
};

function buildMeasureOutcomesContent(
  productId: ProductId,
  industryId: IndustryId
): MettricContent {
  const industryExamples = industryOutcomeExamples[industryId].join("; ");
  const product = productLabel[productId];

  return {
    howToQualify: [
      `Map the prospect's explicit success goals to measurable outcomes (typically OKRs/initiatives) and then define the metrics that will prove improvement. For WisdomAI-style solutions, qualify outcomes like: ${industryExamples}.`,
      "",
      "Monetization Use Case (required for embedded analytics): WisdomAI supports embedded analytics, enabling a B2B2C business model where the prospect can sell their WisdomAI-powered data product to their direct customers and users. Qualify what monetization success looks like (example metrics: embedded analytics activation, paid conversion driven by insights, revenue per embedded analytics user, retention of users who consume the data product).",
      `Tie this back to the chosen product motion: ${product} embedded into the prospect's workflow.`,
    ].join("\n"),
    discoveryQuestions: [
      "What specific OKR or business initiative is this opportunity tied to (and what does success look like in one sentence)?",
      "Which metrics will you track to prove improvement after rollout (baseline and target values)?",
      "Monetization Use Case: if you embed analytics into your product to serve your direct customers and end users (B2B2C), what revenue metric proves the data product is working?",
      "What would be considered a win in the first 30-90 days for both usage and business impact?",
    ],
    redFlags: [
      "Success goals are vague ('improve analytics') with no measurable metrics or OKRs",
      "No monetization path for embedded analytics, even though the go-to-market requires B2B2C distribution",
      "They measure only engagement/adoption without business impact",
    ],
  };
}

function buildIdentifyChallengesRewardsContent(
  productId: ProductId,
  industryId: IndustryId
): MettricContent {
  const product = productLabel[productId];
  const industryName = industryLabel[industryId];

  return {
    howToQualify: [
      "Identify the challenge/reward pairs that can be proven in a PoC. The goal is to avoid 'demo success' that fails in the customer workflow.",
      "",
      `Qualify the core challenge for ${industryName}: usually stale/slow reporting, inconsistent metric definitions, and operational delay. Then qualify the reward: time saved, decision speed improved, and governance/auditability ensured.`,
      "",
      "For embedded monetization, ensure the reward path includes the Monetization Use Case: the embedded analytics must drive measurable value for the prospect's direct customers and end users (for example, fewer support cycles, higher self-serve resolution, or insights that justify paid plans).",
      `Align the PoC to the selected motion: ${product}.`,
    ].join("\n"),
    discoveryQuestions: [
      "What is the specific 'broken today' challenge that forces this search (not just a nice-to-have)?",
      "What does the reward look like (time saved, cost reduction, risk reduction, or improved revenue performance)?",
      "Which user role experiences the pain most (ops, analysts, executives, customer-facing users)?",
      "Monetization Use Case: how will your embedded analytics offer create value for your direct customers and end users (B2B2C)?",
    ],
    redFlags: [
      "Use cases are not PoC-able (no realistic workflow, no owners, no success criteria)",
      "The challenge is 'data access' only, without defining a downstream reward",
      "Embedded monetization is mentioned but cannot be tied to customer/user value",
    ],
  };
}

function buildTestFeasibilityContent(
  productId: ProductId,
  industryId: IndustryId
): MettricContent {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];

  return {
    howToQualify: [
      `Confirm at least the core use cases are feasible. If a key use case cannot be supported (or cannot be proven with a workaround PoC), feasibility is not qualified.`,
      "",
      `For ${industryName}, feasibility typically includes: governed access (RBAC), auditability/traceability, and support for the operational constraints that matter (for example, security/compliance expectations).`,
      "",
      `Align feasibility to the selected motion: ${product} must work in an embedded experience and support the prospect's decision workflow without requiring unrealistic data centralization.`,
    ].join("\n"),
    discoveryQuestions: [
      "Which 1-2 core use cases must succeed for you to say 'yes' to the opportunity?",
      "What proof do you need in the PoC (accuracy bar, latency, supported data sources, governance requirements)?",
      "What embedded experience requirements exist (UI placement, user access model, export/share behavior)?",
      "Are there any constraints that would disqualify embedded analytics (security review, on-prem/VPC requirements, data residency)?",
    ],
    redFlags: [
      "The prospect has only 'nice-to-have' use cases with no core workflow to validate",
      "Key use case depends on capabilities that cannot be shown in a PoC",
      "Governance/security requirements are undefined, making feasibility unverifiable",
    ],
  };
}

function buildTimelineContent(
  productId: ProductId,
  industryId: IndustryId
): MettricContent {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];

  const defaultTimeline = (() => {
    if (productId === "proactive-agents") return "8-12 weeks for pilot with operational routing, then 12-20 weeks for expansion";
    if (productId === "ai-dashboards") return "6-10 weeks for dashboard + embedded views pilot, then 10-16 weeks for broader rollout";
    return "4-8 weeks for guided embedded Q&A pilot, then 10-18 weeks for expansion";
  })();

  return {
    howToQualify: [
      "Qualification requires at least one tangible delivery timeline. Opportunistic 'sometime this year' plans are not enough.",
      "",
      `For ${industryName} + ${product}, qualify whether the roadmap supports a real evaluation-to-rollout path (pilot, success validation, then deployment).`,
      `Example timeline expectation: ${defaultTimeline}.`,
    ].join("\n"),
    discoveryQuestions: [
      "What project or program date drives this (OKRs, compliance deadline, budget cycle, customer plan launch)?",
      "When should the first PoC be usable by the intended users?",
      "What dependencies might delay feasibility validation (security review, data access, embedded integration)?",
      "What is the decision date and who owns it?",
    ],
    redFlags: [
      "No credible dates exist (only vague interest)",
      "The pilot timeline is blocked by unresolved embedded/security dependencies",
      "No decision date or owner for rollout approval",
    ],
  };
}

function buildRoiVsCostContent(
  productId: ProductId,
  industryId: IndustryId
): MettricContent {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];
  return {
    howToQualify: [
      "Build an ROI vs cost case that compares (a) expected benefits from changing (including measurable monetization outcomes when relevant) against (b) total cost of implementation and the cost of not changing.",
      "",
      `For ${industryName} + ${product}, the ROI case should explicitly include: reduced operational delay + governance value, and (when applicable) the Monetization Use Case for embedded analytics (B2B2C) through revenue-linked success metrics.`,
      "Make sure the commercial argument is decision-ready: it should be possible to defend with numbers and assumptions.",
    ].join("\n"),
    discoveryQuestions: [
      "What is the estimated cost of building in-house or using another alternative (people, tools, time, and risk)?",
      "What is the cost of not changing (missed revenue, delayed decisions, compliance/audit risk, support overhead)?",
      "Monetization Use Case: what revenue model assumptions will we use to forecast embedded-analytics-driven outcomes?",
      "What confidence level do you have in the metric baselines (and what gaps remain)?",
    ],
    redFlags: [
      "ROI is claimed without baselines or forecast assumptions",
      "The monetization plan is disconnected from measurable embedded-analytics outcomes",
      "Cost comparisons ignore the cost of not changing",
    ],
  };
}

function buildExecutiveBuyInContent(
  productId: ProductId,
  industryId: IndustryId
): MettricContent {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];
  return {
    howToQualify: [
      `Executive Buy-In means you can get at least one (often multiple) high-level leaders in ${industryName} to confirm the pain and the goals for ${product}.`,
      "",
      "Qualify that leadership understands what success must look like in practice, including the Monetization Use Case for embedded analytics (B2B2C) when the customer wants to distribute a data product to their direct customers and users.",
    ].join("\n"),
    discoveryQuestions: [
      "Who experiences the pain most, and who has authority to prioritize change?",
      "What executive metric matters most (timeliness, cost, revenue, risk/compliance)?",
      "Monetization Use Case: what leadership KPI validates that embedded analytics is improving customer outcomes and monetization?",
      "What obstacles might leadership need help removing to approve a rollout?",
    ],
    redFlags: [
      "No engaged executive; decisions remain in 'discussion' status",
      "Executives agree conceptually but cannot name what success metrics look like",
      "No clarity on executive ownership for embedded monetization outcomes",
    ],
  };
}

function buildCommitmentToChangeContent(
  productId: ProductId,
  industryId: IndustryId
): MettricContent {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];
  return {
    howToQualify: [
      `Commitment to Change requires addressing deal blockers and building a path from qualified opportunity to purchase/rollout in ${industryName} for ${product}.`,
      "",
      "Create/confirm a blocker list derived from earlier METTRIC criteria: price/budget, feasibility proof gaps, timeline dependencies, and embedded monetization adoption risk. Then qualify the GTM plan to overcome each blocker.",
    ].join("\n"),
    discoveryQuestions: [
      "What are the top blockers preventing approval (budget, timeline, security, integration, or adoption)?",
      "Which team owns each blocker, and what is their decision process?",
      "Monetization Use Case: what would stop your direct customers/users from adopting the embedded data product (and how will we mitigate)?",
      "What is the commitment path (pilot success criteria, decision date, procurement/contracting steps)?",
    ],
    redFlags: [
      "Blockers exist but no plan exists to address them with evidence",
      "Security/compliance or embedded integration dependencies are not resolved before decision",
      "The Monetization Use Case is treated as marketing only, without operational adoption proof",
    ],
  };
}

function getMettricStrategyByCriterion(
  productId: ProductId,
  industryId: IndustryId
): Record<string, MettricContent> {
  return {
    "measure-outcomes": buildMeasureOutcomesContent(productId, industryId),
    "identify-challenges-rewards": buildIdentifyChallengesRewardsContent(productId, industryId),
    "test-feasibility": buildTestFeasibilityContent(productId, industryId),
    timeline: buildTimelineContent(productId, industryId),
    "roi-vs-cost": buildRoiVsCostContent(productId, industryId),
    "executive-buy-in": buildExecutiveBuyInContent(productId, industryId),
    "commitment-to-change": buildCommitmentToChangeContent(productId, industryId),
  };
}

export function getMettricCriteria(
  productId: ProductId,
  industryId: IndustryId
): FrameworkCriterion[] {
  const strategy = getMettricStrategyByCriterion(productId, industryId);

  return mettricBase.map((base) => {
    const content = strategy[base.id];
    return {
      ...base,
      howToQualify: content?.howToQualify ?? "",
      discoveryQuestions: content?.discoveryQuestions ?? [],
      redFlags: content?.redFlags ?? [],
    };
  });
}

function buildCompanyProfile(productId: ProductId, industryId: IndustryId): string {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];
  return `${industryName} organization modernizing how decision-makers and customer-facing users consume analytics through ${product} (embedded into their workflows and distributed as a data product).`;
}

function buildDealSize(productId: ProductId, industryId: IndustryId): string {
  // Simple deterministic sizing so the data is stable per context.
  const base = productId === "proactive-agents" ? 300 : productId === "ai-dashboards" ? 220 : 180;
  const industryAdj =
    industryId === "financial-services"
      ? 1.25
      : industryId === "healthcare"
        ? 1.15
        : industryId === "government"
          ? 1.35
          : industryId === "manufacturing"
            ? 1.05
            : 1.1;
  return `$${Math.round(base * industryAdj)}K ARR`;
}

function buildTimeline(productId: ProductId): string {
  if (productId === "proactive-agents") return "90-day evaluation, 60-day implementation";
  if (productId === "ai-dashboards") return "75-day evaluation, 45-day implementation";
  return "60-day evaluation, 40-day implementation";
}

function buildStakeholders(productId: ProductId, industryId: IndustryId): QualifiedOpportunityExample["stakeholders"] {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];

  const executiveByIndustry: Record<IndustryId, string> = {
    "financial-services": "CFO / CDO",
    healthcare: "CFO / CIO",
    retail: "CFO / VP Operations",
    manufacturing: "COO / CIO",
    government: "Budget Director / CDO",
  };

  const championByIndustry: Record<IndustryId, string> = {
    "financial-services": "Head of Analytics",
    healthcare: "VP of Analytics",
    retail: "Head of Merchandising Analytics",
    manufacturing: "VP Operations Excellence",
    government: "Director of Program Data",
  };

  return [
    { role: `${executiveByIndustry[industryId]}`, stance: "Sponsor - responsible for budget and success metrics" },
    { role: `${championByIndustry[industryId]}`, stance: `Champion - owns the workflow and must prove ${product} impact` },
    { role: "Security / Compliance", stance: "Evaluator - validates governance, auditability, and embedded constraints" },
    { role: "Product / Integration Lead", stance: "Technical owner - ensures embedded analytics can ship on time" },
    { role: "Commercial Owner", stance: `Commercial buyer - confirms the Monetization Use Case for embedded analytics in a B2B2C motion` },
  ].map((s) => s as { role: string; stance: string });
}

export function getMettricExample(
  productId: ProductId,
  industryId: IndustryId
): QualifiedOpportunityExample {
  const industryName = industryLabel[industryId];
  const product = productLabel[productId];
  const dealSize = buildDealSize(productId, industryId);
  const timeline = buildTimeline(productId);

  const measureOutcomeFinding = [
    `Success goals mapped to OKRs: improve decision speed and reduce operational delay in ${industryName}.`,
    `Monetization Use Case: embed WisdomAI-powered analytics into the prospect's offering so their direct customers and end users can self-serve, enabling a B2B2C data product motion.`,
    "Qualified success metrics included embedded analytics activation, paid conversion driven by insights, and retention of users consuming the embedded data product.",
  ].join(" ");

  const strategyFindings = {
    "identify-challenges-rewards":
      "PoC-ready challenge/reward pairs were agreed: faster answers without inconsistent metrics, governed access for sensitive data, and reduced support/rework for customer-facing teams.",
    "test-feasibility":
      "PoC validated the core embedded workflow for the chosen motion (governed access + auditability + source traceability) with accuracy targets met for critical use cases.",
    timeline:
      "A tangible pilot-to-rollout timeline was confirmed, aligning to a real program milestone and an embedded launch window for distribution as a data product.",
    "roi-vs-cost":
      "ROI model showed benefits from reduced delay and operational cost plus monetization uplift from the embedded analytics offer; status quo cost included continued rework and delayed customer value.",
    "executive-buy-in":
      "Executives confirmed the pain, named the KPI scoreboard, and committed to a rollout decision after feasibility evidence and embedded monetization proof.",
    "commitment-to-change":
      "Top blockers were addressed (security review path, embedded integration dependencies, and adoption plan for direct customers/users). Procurement approved a phased rollout.",
  };

  const criteriaMapping: QualifiedOpportunityExample["criteriaMapping"] = [
    { criterion: "Measure Outcomes", finding: measureOutcomeFinding, status: "strong" },
    {
      criterion: "Identify Challenges & Rewards",
      finding: strategyFindings["identify-challenges-rewards"],
      status: "strong",
    },
    { criterion: "Test Feasibility", finding: strategyFindings["test-feasibility"], status: "strong" },
    { criterion: "Timeline", finding: strategyFindings.timeline, status: "strong" },
    { criterion: "ROI vs Cost", finding: strategyFindings["roi-vs-cost"], status: "strong" },
    {
      criterion: "Executive Buy-In",
      finding: strategyFindings["executive-buy-in"],
      status: "strong",
    },
    {
      criterion: "Commitment to Change",
      finding: strategyFindings["commitment-to-change"],
      status: "moderate",
    },
  ];

  const outcome = `Closed-won with a phased rollout for ${product} in ${industryName}. Embedded analytics enabled a B2B2C data product motion, with measurable improvements in the first pilot cycle.`;

  const lessonsLearned = [
    "The clearest qualification moment was tying outcomes to embedded monetization KPIs (activation, conversion, and retention) rather than only engagement.",
    "Feasibility evidence had to include governance/auditability so security/compliance approved the embedded experience.",
    "A concrete pilot-to-rollout timeline reduced deal slippage and ensured embedded distribution could ship with the customer launch window.",
  ];

  return {
    companyProfile: buildCompanyProfile(productId, industryId),
    industry: industryName,
    dealSize,
    timeline,
    stakeholders: buildStakeholders(productId, industryId),
    criteriaMapping,
    outcome,
    lessonsLearned,
  };
}

