export type ThreatTier = "tier1" | "tier2" | "tier3";

export type CompanySummary = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  threatLevel: ThreatTier;
  threatLabel: string;
};

export type CompanyProfile = {
  stage: string;
  headcount: string;
  arr: string;
  icpRoles: string;
  verticals: string;
  delivery: string;
  businessModel: string;
  salesMotion: string[];
};

export type CompanyPositioning = {
  tagline: string;
  headline: string;
  tone: string;
  analystPerception: string;
  differentiators: string[];
};

export type CompanyCompete = {
  strengths: string[];
  weaknesses: string[];
  winConditions: string[];
  loseConditions: string[];
};

export const WISDOM_COMPANY: CompanySummary = {
  id: "wisdomai",
  name: "WisdomAI",
  shortName: "WisdomAI",
  tagline:
    "The AI-native analytics platform — accurate answers, no hallucinations",
  threatLevel: "tier1",
  threatLabel: "Home — WisdomAI",
};

export const COMPETITORS: CompanySummary[] = [
  {
    id: "databricks",
    name: "Databricks Genie",
    shortName: "Databricks",
    tagline: "Data + AI platform with conversational BI layer",
    threatLevel: "tier1",
    threatLabel: "Tier 1 — Existential",
  },
  {
    id: "powerbi",
    name: "Microsoft Power BI",
    shortName: "Power BI",
    tagline: "Dominant legacy BI with Fabric + Copilot AI layer",
    threatLevel: "tier1",
    threatLabel: "Tier 1 — Common Head-to-Head",
  },
  {
    id: "sigma",
    name: "Sigma Computing",
    shortName: "Sigma",
    tagline: "Spreadsheet-native cloud BI for analysts",
    threatLevel: "tier2",
    threatLabel: "Tier 2 — Opportunistic Takeout",
  },
  {
    id: "omni",
    name: "Omni",
    shortName: "Omni",
    tagline: "Modern BI for analysts who want code + no-code",
    threatLevel: "tier2",
    threatLabel: "Tier 2 — Watch",
  },
  {
    id: "hex",
    name: "HEX",
    shortName: "HEX",
    tagline: "Collaborative notebooks + apps for data teams",
    threatLevel: "tier2",
    threatLabel: "Tier 2 — Adjacent",
  },
  {
    id: "thoughtspot",
    name: "ThoughtSpot",
    shortName: "ThoughtSpot",
    tagline: "AI-powered search analytics for business users",
    threatLevel: "tier1",
    threatLabel: "Tier 1 — Direct Competitor",
  },
  {
    id: "gooddata",
    name: "GoodData",
    shortName: "GoodData",
    tagline: "Embedded analytics platform for SaaS companies",
    threatLevel: "tier3",
    threatLabel: "Tier 3 — Deprioritize",
  },
  {
    id: "snowflake",
    name: "Snowflake Intelligence",
    shortName: "Snowflake Intel.",
    tagline: "Native AI analytics layer built into the Snowflake Data Cloud",
    threatLevel: "tier1",
    threatLabel: "Tier 1 — Existential",
  },
];

export const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  wisdomai: {
    stage: "Growth-stage, Series B (est.)",
    headcount: "~50–100 employees",
    arr: "Est. early ARR / scaling",
    icpRoles: "CDOs, VPs of Analytics, Business Analysts, Data Engineers",
    verticals: "FS, Healthcare, Retail, SaaS, Tech",
    delivery:
      "Cloud SaaS — connects to existing data stacks (Snowflake, BigQuery, Databricks, etc.)",
    businessModel: "Annual SaaS license; platform + per-seat tiers",
    salesMotion: [
      "Top-down enterprise",
      "CDO / VP Analytics champion",
      "POC-led land and expand",
    ],
  },
  databricks: {
    stage: "Late-stage private, ~$43B valuation (2023 raise)",
    headcount: "~6,000 employees",
    arr: "Est. $1.6B+ ARR (FY2024)",
    icpRoles: "Data engineers, ML engineers, CDOs",
    verticals: "FS, Healthcare, Retail, Tech, Media",
    delivery: "Cloud SaaS (multi-cloud: AWS, Azure, GCP)",
    businessModel:
      "Compute-based consumption pricing; platform fee for SQL Warehouse",
    salesMotion: ["Top-down enterprise", "Platform-led expansion", "Data team champion"],
  },
  powerbi: {
    stage: "Public (Microsoft subsidiary)",
    headcount: "Part of Microsoft (~220k total)",
    arr: "Est. $4–5B BI revenue (bundled with M365)",
    icpRoles: "Business analysts, BI developers, IT admins",
    verticals: "All verticals; dominant in Microsoft-heavy orgs",
    delivery: "Cloud SaaS + desktop app; Microsoft 365 bundled",
    businessModel:
      "Per-seat ($10/user/mo Pro; $20 Premium Per User); free with M365 E5",
    salesMotion: [
      "Bottom-up procurement lock-in",
      "IT champion / Microsoft-first buying",
      "Bundle defense",
    ],
  },
  sigma: {
    stage: "Series D, ~$800M valuation (2022)",
    headcount: "~400 employees",
    arr: "Est. $100–140M ARR",
    icpRoles: "Financial analysts, ops analysts, BI teams who love Excel",
    verticals: "FS, Retail, SaaS, Media",
    delivery: "Cloud SaaS",
    businessModel: "Per-seat licensing; viewer/explorer/creator tiers",
    salesMotion: ["PLG / analyst bottoms-up", "Snowflake co-sell", "Finance team champion"],
  },
  omni: {
    stage: "Series B, ~$150M raised",
    headcount: "~100 employees",
    arr: "Est. $15–25M ARR",
    icpRoles: "Analytics engineers, data analysts",
    verticals: "SaaS, fintech, e-commerce",
    delivery: "Cloud SaaS",
    businessModel: "Per-seat with model-layer licensing",
    salesMotion: ["Analytics engineer bottoms-up", "Looker migration plays", "Community/PLG"],
  },
  hex: {
    stage: "Series C, ~$130M raised",
    headcount: "~200 employees",
    arr: "Est. $25–40M ARR",
    icpRoles: "Data scientists, ML engineers, analytics engineers",
    verticals: "Tech, pharma, finance",
    delivery: "Cloud SaaS",
    businessModel: "Per-workspace + per-seat pricing",
    salesMotion: ["Bottoms-up data team", "PLG / free tier expansion"],
  },
  thoughtspot: {
    stage: "Late-stage private, ~$4.2B valuation (2021)",
    headcount: "~1,200 employees",
    arr: "Est. $200–260M ARR",
    icpRoles: "Business analysts, BI leaders, CDOs",
    verticals: "Retail, FS, Healthcare, Manufacturing",
    delivery: "Cloud SaaS + on-prem",
    businessModel:
      "Annual platform license + consumption; user-tier pricing",
    salesMotion: ["Top-down enterprise", "CDO/VP of Analytics buyer", "Implementation-partner led"],
  },
  gooddata: {
    stage: "Private, bootstrapped / growth-stage",
    headcount: "~400 employees",
    arr: "Est. $40–70M ARR",
    icpRoles: "Product managers, engineering teams at SaaS companies",
    verticals: "SaaS, fintech, HR tech",
    delivery: "Cloud SaaS + on-prem",
    businessModel: "Platform fee + API call volume; white-label pricing",
    salesMotion: ["Product-led, ISV/partner channel", "Developer/PM champion"],
  },
  snowflake: {
    stage: "Public (NYSE: SNOW)",
    headcount: "~7,000 employees",
    arr: "Est. $3.3B+ product revenue (FY2024)",
    icpRoles: "Data engineers, CDOs, analytics leaders",
    verticals: "FS, Healthcare, Retail, Tech, Media",
    delivery: "Cloud SaaS (AWS, Azure, GCP)",
    businessModel:
      "Consumption-based (compute credits); Intelligence bundled for Snowflake customers",
    salesMotion: [
      "Platform bundling / top-down enterprise",
      "Data engineering team champion",
      "Snowflake account team co-sell",
    ],
  },
};

export const COMPANY_POSITIONING: Record<string, CompanyPositioning> = {
  wisdomai: {
    tagline: '"Accurate answers from your data — guaranteed"',
    headline: "Ask any data question. Get a trusted answer.",
    tone: "Confident, enterprise-safe, accuracy-first, non-technical buyer-friendly",
    analystPerception:
      "Emerging AI-native analytics vendor; positioned as the accuracy-first alternative to Copilot/Sage/Genie",
    differentiators: [
      "Enterprise Context Layer — semantic understanding of your business",
      "Anti-hallucination architecture — verified answers only",
      "Works on your existing data stack — no migration required",
      "Conversational AI built for business users, not engineers",
    ],
  },
  databricks: {
    tagline: '"The Data + AI Company"',
    headline: "One platform for all your data, analytics, and AI",
    tone: "Technical authority, enterprise-grade, data-engineer-first",
    analystPerception:
      "Gartner Magic Quadrant leader for cloud databases; TechCrunch frames them as 'the AI data company'",
    differentiators: [
      "Unified lakehouse (no data movement)",
      "Genie = NL analytics on top of Unity Catalog with verified answers",
      "Dominant in ML/AI workloads",
      "Strong Spark + Delta Lake ecosystem",
    ],
  },
  powerbi: {
    tagline: '"Transform data into actionable insights"',
    headline: "Connected, automated, and intelligent BI",
    tone: "Safe, enterprise-familiar, productivity-suite persona",
    analystPerception:
      "Gartner MQ Leader (BI) for many consecutive years; G2 #1 by volume of reviews",
    differentiators: [
      "Bundled with Microsoft 365 — zero incremental cost",
      "Power Automate + Teams integration",
      "Copilot for Power BI (GenAI)",
      "Largest community/ecosystem of any BI tool",
    ],
  },
  sigma: {
    tagline: '"The spreadsheet that scales"',
    headline: "Spreadsheet-familiar analytics on your cloud data",
    tone: "Analyst-friendly, approachable, anti-complexity",
    analystPerception:
      "G2 high performer; often described as 'Excel for the cloud warehouse'",
    differentiators: [
      "Familiar spreadsheet UI",
      "Live queries direct to warehouse (no extracts)",
      "Fast time-to-insight for Excel users",
      "Collaborative workbooks",
    ],
  },
  omni: {
    tagline: "\"BI that doesn't fight your data stack\"",
    headline: "Works with dbt, Git, and your warehouse natively",
    tone: "Developer-first, modern-stack credibility, anti-Looker",
    analystPerception:
      "Seen as 'the spiritual successor to Looker' by data community; strong on data Twitter/X",
    differentiators: [
      "Git-backed semantic layer",
      "dbt integration first-class",
      "Both SQL + no-code UX in one tool",
      "Strong developer experience",
    ],
  },
  hex: {
    tagline: '"Notebooks your whole team can use"',
    headline: "Where data teams do their best work — together",
    tone: "Data-scientist beloved, collaborative, modern-tool vibe",
    analystPerception:
      "Product-led growth darling; frequently cited as 'the Notion for data teams'",
    differentiators: [
      "Collaborative notebook UX",
      "Publish notebooks as apps",
      "SQL + Python in same environment",
      "Magic AI for code generation",
    ],
  },
  thoughtspot: {
    tagline: '"The AI-Powered Analytics Platform"',
    headline: "Let everyone in your company explore data with AI",
    tone: "AI-first messaging, democratization narrative, enterprise-safe",
    analystPerception:
      "Gartner MQ Visionary; noted as 'NLQ pioneer but showing age'",
    differentiators: [
      "Search-first analytics UX (NLQ pioneer)",
      "ThoughtSpot Everywhere embedded analytics",
      "Sage GenAI layer",
      "SpotIQ auto-insights",
    ],
  },
  gooddata: {
    tagline: '"Analytics for Everyone, Everywhere"',
    headline: "The only headless BI platform built for embedding",
    tone: "Developer-first, product-team language, technical precision",
    analystPerception:
      "Niche player in Gartner MQ; well known for embedded use cases",
    differentiators: [
      "API-first, headless analytics",
      "Semantic layer for SaaS products",
      "White-label and deeply embeddable",
      "Proven at scale (e.g. Zendesk)",
    ],
  },
  snowflake: {
    tagline: '"The AI Data Cloud"',
    headline: "Ask questions of your data — right inside Snowflake",
    tone: "Platform authority, data-governance-first, enterprise-safe",
    analystPerception:
      "Gartner MQ leader for cloud databases; Intelligence seen as direct threat to standalone BI/AI analytics tools",
    differentiators: [
      "Zero data movement — analytics where the data lives",
      "Cortex AI natively integrated",
      "Trusted governance via Snowflake platform",
      "Cross-cloud, multi-region enterprise scale",
    ],
  },
};

export const COMPANY_COMPETE: Record<string, CompanyCompete> = {
  wisdomai: {
    strengths: [
      "Best-in-class NLQ accuracy — Enterprise Context Layer prevents hallucinations",
      "Non-disruptive — plugs into existing warehouse, no data movement",
      "Fastest time-to-value for business users vs legacy BI",
      "Agentic analytics layer that can trigger actions, not just answer questions",
    ],
    weaknesses: [
      "Brand awareness lags incumbents like Power BI / ThoughtSpot",
      "Earlier stage with smaller customer base",
      "Lighter traditional BI surface area by design",
    ],
    winConditions: [
      "Business buyer is champion (VP/Director), not IT",
      "Customer has been burned by hallucinations from Copilot/Genie/Sage",
      "Org wants AI analytics without replacing its warehouse",
    ],
    loseConditions: [
      "IT controls budget and is deeply committed to Microsoft stack",
      "Customer is 'all-in' on Databricks or Snowflake platform bundling",
      "Finance team wants spreadsheet-style exploration (Sigma territory)",
    ],
  },
  databricks: {
    strengths: [
      "Owns the entire data stack — lakehouse, ETL, ML",
      "Unity Catalog semantic layer trusted in enterprise",
      "Engineering credibility with data teams",
      "Massive go-to-market machine",
    ],
    weaknesses: [
      "Genie is a feature, not a dedicated product",
      "Requires Databricks for everything — limited interoperability",
      "UI/UX skewed to data engineers, not business analysts",
    ],
    winConditions: [
      "Account already runs Databricks for ETL/ML",
      "IT/data team controls BI buying decision",
    ],
    loseConditions: [
      "Business analyst is the buyer",
      "Customer is Snowflake or BigQuery native",
    ],
  },
  // For competitors below, keep concise but structured entries.
  powerbi: {
    strengths: [
      "Bundled with Microsoft 365 — effectively free",
      "Deep ecosystem of connectors and plugins",
      "Org-wide familiarity with Excel/Office patterns",
    ],
    weaknesses: [
      "Complex UX for non-technical users",
      "DAX learning curve",
      "AI quality (Copilot) lags dedicated AI analytics",
    ],
    winConditions: [
      "Full Microsoft shop where IT controls budget",
      "BI team invested heavily in Power BI models",
    ],
    loseConditions: [
      "Business user is buyer seeking simplicity",
      "Org is Snowflake/Google native and wants best-of-breed",
    ],
  },
  sigma: {
    strengths: [
      "Spreadsheet metaphor beloved by finance/ops",
      "Live queries direct to warehouse",
      "Fast implementation vs legacy BI",
    ],
    weaknesses: [
      "Thin AI story; early Sigma AI",
      "Not truly conversational",
    ],
    winConditions: [
      "Finance team is the buyer",
      "Snowflake-native org wanting warehouse-connected analytics",
    ],
    loseConditions: [
      "Executive wants simple NLQ",
      "Org needs one tool for execs and analysts",
    ],
  },
  omni: {
    strengths: [
      "Best-in-class dbt integration",
      "Git-native semantic layer",
      "Modern UI for analytics engineers",
    ],
    weaknesses: [
      "Early-stage enterprise story",
      "Primarily technical persona; not exec-friendly",
    ],
    winConditions: [
      "Analytics engineer champion who loves dbt",
      "Looker migration projects",
    ],
    loseConditions: [
      "Non-technical exec buyer",
    ],
  },
  hex: {
    strengths: [
      "Beloved by data scientists",
      "Notebook + app publishing in one tool",
    ],
    weaknesses: [
      "Notebook paradigm too complex for business users",
      "No governed semantic layer",
    ],
    winConditions: [
      "Data science team buying internal workflow tooling",
    ],
    loseConditions: [
      "Business analyst or executive is buyer",
    ],
  },
  thoughtspot: {
    strengths: [
      "Pioneered natural-language search in BI",
      "Strong embedded analytics (ThoughtSpot Everywhere)",
    ],
    weaknesses: [
      "Aging search UX vs conversational AI",
      "Implementation complexity and cost",
    ],
    winConditions: [
      "Embedded analytics is primary use case",
      "Large Fortune 500 with budget and partner ecosystem",
    ],
    loseConditions: [
      "Customer wants truly conversational AI",
      "Mid-market with tighter budgets",
    ],
  },
  gooddata: {
    strengths: [
      "API-first, headless architecture",
      "Strong semantic layer for multi-tenant analytics",
    ],
    weaknesses: [
      "Minimal AI story",
      "Low brand awareness outside embedded niche",
    ],
    winConditions: [
      "SaaS company building customer-facing analytics",
    ],
    loseConditions: [
      "Internal enterprise self-serve analytics",
      "Conversational AI use cases",
    ],
  },
  snowflake: {
    strengths: [
      "Dominant data cloud platform",
      "Zero-ETL advantage; data stays in Snowflake",
    ],
    weaknesses: [
      "Requires Snowflake as core data platform",
      "Intelligence still maturing vs dedicated AI analytics",
    ],
    winConditions: [
      "Account is all-in on Snowflake",
      "IT/data engineering team controls BI/AI buying",
    ],
    loseConditions: [
      "Business analyst or executive is buyer",
      "Multi-cloud or non-Snowflake data stack",
    ],
  },
};

export const COMPANY_OBJECTIONS: Record<string, string[]> = {
  wisdomai: [
    "We haven't heard of WisdomAI — how long have you been around?",
    "Can you integrate with our existing Snowflake/Databricks setup?",
    "How is this different from what Copilot already does?",
  ],
  databricks: [
    "We already use Databricks — why add WisdomAI on top?",
    "Genie is free with our existing contract.",
    "Our data team built a semantic layer in Unity Catalog already.",
  ],
  powerbi: [
    "We already pay for Power BI — why spend more?",
    "Copilot is improving every quarter.",
    "Our IT team manages Power BI centrally — WisdomAI would require new governance.",
  ],
  sigma: [
    "Our finance team already built all their models in Sigma.",
    "Sigma is spreadsheet-familiar — our users won't adopt something new.",
  ],
  omni: [
    "Our data team already chose Omni as the BI layer above dbt.",
    "Omni is developer-friendly — our data team prefers it.",
  ],
  hex: [
    "Our data team uses HEX for exploration — different use case.",
  ],
  thoughtspot: [
    "ThoughtSpot pioneered NLQ — why switch?",
    "We've invested a lot of time in ThoughtSpot implementation.",
    "ThoughtSpot Everywhere handles our embedded analytics.",
  ],
  gooddata: [
    "Our product team embedded GoodData for customer-facing analytics.",
  ],
  snowflake: [
    "We already have Snowflake — why add WisdomAI on top?",
    "Intelligence is included in our Snowflake contract.",
    "Our data team trusts Cortex AI for analytics.",
  ],
};

export type QuadrantPoint = {
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  isWisdom?: boolean;
};

export type QuadrantConfig = {
  id: string;
  title: string;
  subtitle: string;
  xLabel: string;
  yLabel: string;
  quadrantLabels: [string, string, string, string];
  points: QuadrantPoint[];
};

export const QUADRANTS: QuadrantConfig[] = [
  {
    id: "q1",
    title: "Q1 — AI Depth vs BI Maturity",
    subtitle:
      "WisdomAI's anti-hallucination architecture places it firmly AI-first with lighter traditional BI surface area",
    xLabel: "BI Maturity →",
    yLabel: "AI Depth →",
    quadrantLabels: ["AI-first, BI light", "AI-first + full BI ← ideal", "Legacy BI, low AI", "BI mature, AI catching up"],
    points: [
      { label: "WisdomAI", x: 38, y: 75, r: 9, color: "#2a4f3e", isWisdom: true },
      { label: "Databricks", x: 22, y: 62, r: 12, color: "#c0392b" },
      { label: "HEX", x: 18, y: 42, r: 7, color: "#534AB7" },
      { label: "ThoughtSpot", x: 62, y: 68, r: 10, color: "#b7660d" },
      { label: "Snowflake Intel.", x: 78, y: 80, r: 11, color: "#888888" },
      { label: "Power BI", x: 82, y: 32, r: 14, color: "#f2a900" },
      { label: "Sigma", x: 70, y: 28, r: 8, color: "#1a4a7a" },
      { label: "Omni", x: 58, y: 26, r: 6, color: "#0f6e56" },
      { label: "GoodData", x: 52, y: 18, r: 7, color: "#444444" },
    ],
  },
  {
    id: "q2",
    title: "Q2 — Stack Ownership vs Sales Motion",
    subtitle:
      "WisdomAI plugs into existing data stacks — connector with enterprise ambition",
    xLabel: "Stack Ownership →",
    yLabel: "Enterprise Sales Motion →",
    quadrantLabels: ["Connector, enterprise", "Platform owner, enterprise ← win zone", "Connector, PLG", "Platform owner, PLG"],
    points: [
      { label: "WisdomAI", x: 28, y: 78, r: 9, color: "#2a4f3e", isWisdom: true },
      { label: "Databricks", x: 72, y: 68, r: 12, color: "#c0392b" },
      { label: "Power BI", x: 42, y: 72, r: 14, color: "#f2a900" },
      { label: "ThoughtSpot", x: 28, y: 62, r: 10, color: "#b7660d" },
      { label: "Snowflake Intel.", x: 82, y: 78, r: 11, color: "#888888" },
      { label: "Sigma", x: 68, y: 32, r: 8, color: "#1a4a7a" },
      { label: "Omni", x: 38, y: 28, r: 6, color: "#0f6e56" },
      { label: "HEX", x: 18, y: 22, r: 7, color: "#534AB7" },
      { label: "GoodData", x: 48, y: 20, r: 7, color: "#444444" },
    ],
  },
  {
    id: "q3",
    title: "Q3 — Ease of Use vs Analytical Power",
    subtitle: "Bubble size = perceived market momentum / funding scale",
    xLabel: "Ease of Use →",
    yLabel: "Analytical Power →",
    quadrantLabels: ["Powerful but complex", "Powerful + easy ← win zone", "Limited + complex", "Easy but limited"],
    points: [
      { label: "WisdomAI", x: 82, y: 82, r: 9, color: "#2a4f3e", isWisdom: true },
      { label: "Databricks", x: 22, y: 85, r: 18, color: "#c0392b" },
      { label: "HEX", x: 30, y: 55, r: 8, color: "#534AB7" },
      { label: "ThoughtSpot", x: 65, y: 70, r: 12, color: "#b7660d" },
      { label: "Snowflake Intel.", x: 62, y: 78, r: 14, color: "#888888" },
      { label: "Power BI", x: 72, y: 68, r: 18, color: "#f2a900" },
      { label: "Sigma", x: 78, y: 42, r: 9, color: "#1a4a7a" },
      { label: "Omni", x: 60, y: 38, r: 7, color: "#0f6e56" },
      { label: "GoodData", x: 62, y: 22, r: 7, color: "#444444" },
    ],
  },
  {
    id: "q4",
    title: "Q4 — Deal Overlap vs Difficulty to Displace",
    subtitle:
      "Threat radar — Snowflake & Databricks are existential; Power BI & ThoughtSpot are common head-to-heads",
    xLabel: "Deal Overlap Frequency →",
    yLabel: "Difficulty to Displace →",
    quadrantLabels: ["Rare + hard — monitor", "Frequent + hard — full battlecard", "Rare + easy — deprioritize", "Common + beatable — light battlecard"],
    points: [
      { label: "Snowflake Intel.", x: 82, y: 88, r: 11, color: "#c0392b" },
      { label: "Databricks", x: 68, y: 78, r: 12, color: "#e05540" },
      { label: "ThoughtSpot", x: 65, y: 65, r: 10, color: "#b7660d" },
      { label: "Power BI", x: 88, y: 68, r: 14, color: "#f2a900" },
      { label: "Sigma", x: 75, y: 35, r: 8, color: "#1a4a7a" },
      { label: "Omni", x: 62, y: 28, r: 6, color: "#0f6e56" },
      { label: "HEX", x: 28, y: 32, r: 7, color: "#534AB7" },
      { label: "GoodData", x: 15, y: 22, r: 7, color: "#444444" },
    ],
  },
  {
    id: "q5",
    title: "Q5 — Time-to-Value vs Sales Complexity",
    subtitle:
      "How fast can a customer see ROI, and how painful is the buying process? WisdomAI's onboarding speed is a core differentiator against incumbents.",
    xLabel: "Fast time-to-value (days) →",
    yLabel: "Complex buy (long cycle) →",
    quadrantLabels: ["Slow value, hard to buy", "Fast value, hard buy", "Slow value, easy buy", "Fast value + simple buy ← ideal"],
    points: [
      { label: "WisdomAI", x: 78, y: 32, r: 10, color: "#2a4f3e", isWisdom: true },
      { label: "Databricks", x: 18, y: 82, r: 14, color: "#c0392b" },
      { label: "Snowflake Intel.", x: 28, y: 75, r: 12, color: "#29b5e8" },
      { label: "ThoughtSpot", x: 42, y: 72, r: 10, color: "#b7660d" },
      { label: "Power BI", x: 72, y: 62, r: 15, color: "#f2a900" },
      { label: "HEX", x: 78, y: 22, r: 8, color: "#534AB7" },
      { label: "Sigma", x: 82, y: 28, r: 9, color: "#1a4a7a" },
      { label: "Omni", x: 85, y: 24, r: 7, color: "#0f6e56" },
      { label: "GoodData", x: 52, y: 28, r: 8, color: "#444444" },
    ],
  },
  {
    id: "q6",
    title: "Q6 — NLQ Accuracy vs Proactive / Agentic Insight",
    subtitle:
      "WisdomAI's hallucination-free architecture + Enterprise Context Layer is the core claim on both axes simultaneously.",
    xLabel: "Trusted NLQ →",
    yLabel: "Proactive / agentic alerting →",
    quadrantLabels: ["Agentic but untrustworthy", "Trusted + proactive ← WisdomAI's claim", "Static + unreliable", "Trusted but reactive"],
    points: [
      { label: "WisdomAI", x: 88, y: 82, r: 10, color: "#2a4f3e", isWisdom: true },
      { label: "Databricks", x: 58, y: 68, r: 12, color: "#c0392b" },
      { label: "Snowflake Intel.", x: 72, y: 60, r: 12, color: "#29b5e8" },
      { label: "ThoughtSpot", x: 68, y: 48, r: 10, color: "#b7660d" },
      { label: "Power BI", x: 60, y: 22, r: 14, color: "#f2a900" },
      { label: "HEX", x: 28, y: 28, r: 7, color: "#534AB7" },
      { label: "Sigma", x: 62, y: 18, r: 8, color: "#1a4a7a" },
      { label: "Omni", x: 66, y: 22, r: 6, color: "#0f6e56" },
      { label: "GoodData", x: 55, y: 15, r: 7, color: "#444444" },
    ],
  },
];

