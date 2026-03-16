export interface CompetitorProfile {
  stage: string;
  headcount: string;
  arr: string;
  targetMarket: string;
  ics: string;
  verticals: string;
  coreOffering: string;
  delivery: string;
  businessModel: string;
}

export interface CompetitorPositioning {
  tagline: string;
  headline: string;
  differentiators: string[];
  tone: string;
  analystPerception: string;
}

export interface Competitor {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  bg: string;
  threatLevel: string | null;
  threatLabel: string | null;
  emoji: string;
  profile: CompetitorProfile;
  positioning: CompetitorPositioning;
  strengths: string[];
  weaknesses: string[];
  winConditions: string[];
  loseConditions: string[];
  objections: string[];
  salesMotion: string[];
}

export const competitors: Competitor[] = [
  {
    id: 'databricks', name: 'Databricks Genie', shortName: 'Databricks',
    tagline: 'Data + AI platform with conversational BI layer',
    color: '#c0392b', bg: '#fdecea', threatLevel: 'tier1',
    threatLabel: 'Tier 1 — Existential', emoji: 'DB',
    profile: {
      stage: 'Late-stage private, ~$43B valuation (2023 raise)', headcount: '~6,000 employees',
      arr: 'Est. $1.6B+ ARR (FY2024)', targetMarket: 'Enterprise data/ML teams; financial services, healthcare, tech',
      ics: 'Data engineers, ML engineers, CDOs', verticals: 'FS, Healthcare, Retail, Tech, Media',
      coreOffering: 'Unified Data + AI Lakehouse. Genie is the NL analytics layer on top of Unity Catalog.',
      delivery: 'Cloud SaaS (multi-cloud: AWS, Azure, GCP)',
      businessModel: 'Compute-based consumption pricing; platform fee for SQL Warehouse',
    },
    positioning: {
      tagline: '"The Data + AI Company"', headline: 'One platform for all your data, analytics, and AI',
      differentiators: ['Unified lakehouse (no data movement)', 'Genie = NL on top of Unity Catalog with verified answers', 'Dominant in ML/AI workloads', 'Strong Spark + Delta Lake ecosystem'],
      tone: 'Technical authority, enterprise-grade, data-engineer-first',
      analystPerception: 'Gartner Magic Quadrant leader for cloud databases; TechCrunch frames them as "the AI data company"',
    },
    strengths: ['Owns the entire data stack — warehouse wins = they bundle Genie for free','Unity Catalog semantic layer is deeply trusted in enterprise','Engineering credibility with data teams (Spark, MLflow, Delta)','Massive go-to-market machine — thousands of AEs','Can undercut on BI if it defends a platform deal'],
    weaknesses: ['Genie is a feature, not a product — less investment than dedicated BI tools','Requires Databricks for everything — no interoperability','Poor UI/UX for business analysts vs data engineers','Expensive for orgs that don\'t need full lakehouse','NL accuracy degrades outside Unity Catalog governed tables'],
    winConditions: ['Account already runs Databricks for ETL/ML — bundling is irresistible','IT/data team controls the BI buying decision','Customer is "Databricks all-in" and values consolidation'],
    loseConditions: ['Business analyst is the buyer — they hate the SQL notebook UX','Customer is Snowflake or BigQuery native','Org needs governed, dashboard-style reporting out-of-the-box'],
    objections: ['We already use Databricks — why add WisdomAI on top?','Genie is free with our existing contract','Our data team built semantic layer in Unity Catalog already'],
    salesMotion: ['Top-down enterprise', 'Platform-led expansion', 'Data team champion'],
  },
  {
    id: 'powerbi', name: 'Microsoft Power BI', shortName: 'Power BI',
    tagline: 'Dominant legacy BI with Fabric + Copilot AI layer',
    color: '#f2a900', bg: '#fff8e1', threatLevel: 'tier1',
    threatLabel: 'Tier 1 — Common Head-to-Head', emoji: 'PBI',
    profile: {
      stage: 'Public (Microsoft subsidiary)', headcount: 'Part of Microsoft (~220k total)',
      arr: 'Est. $4–5B BI revenue (bundled with M365)', targetMarket: 'All enterprise segments; strong in SMB-to-midmarket via Microsoft licensing',
      ics: 'Business analysts, BI developers, IT admins', verticals: 'All verticals; dominant in Microsoft-heavy orgs',
      coreOffering: 'Desktop BI + cloud service (Power BI Service). Copilot is the GenAI layer in Microsoft Fabric.',
      delivery: 'Cloud SaaS + desktop app; Microsoft 365 bundled',
      businessModel: 'Per-seat ($10/user/mo Pro; $20 Premium Per User); free with M365 E5',
    },
    positioning: {
      tagline: '"Transform data into actionable insights"', headline: 'Connected, automated, and intelligent BI',
      differentiators: ['Bundled with Microsoft 365 — zero incremental cost', 'Power Automate + Teams integration', 'Copilot for Power BI (GenAI)', 'Largest community/ecosystem of any BI tool'],
      tone: 'Safe, enterprise-familiar, productivity-suite persona',
      analystPerception: 'Gartner MQ Leader (BI) for 17 consecutive years; G2 #1 by volume of reviews',
    },
    strengths: ['Zero cost barrier for Microsoft shops — massive procurement leverage','Deepest ecosystem: 500+ connectors, massive plugin library','Org-wide familiarity with Excel/Office patterns','Copilot growing fast — Microsoft will invest heavily','Low switching cost for existing Microsoft BI users'],
    weaknesses: ['Copilot AI quality far below WisdomAI — hallucination-prone without guardrails','UI is complex for non-technical users ("death by right-click")','DAX is notoriously hard — business users need BI developers','Poor semantic layer vs purpose-built tools','Slow to innovate vs AI-native competitors'],
    winConditions: ['Full Microsoft shop — "it\'s already paid for"','IT controls budget; CFO blocks new vendor spend','BI team is the buyer and they know DAX/Power Query'],
    loseConditions: ['Business user is buyer — UX complexity kills adoption','Org is Snowflake/Google native — feels like forcing it','VP/Director wants accurate AI answers, not Copilot suggestions'],
    objections: ['We already pay for Power BI — why spend more?','Copilot is improving every quarter','Our IT team manages Power BI centrally — WisdomAI would require new governance'],
    salesMotion: ['Bottom-up procurement lock-in', 'IT champion / Microsoft-first buying', 'Bundle defense'],
  },
  {
    id: 'sigma', name: 'Sigma Computing', shortName: 'Sigma',
    tagline: 'Spreadsheet-native cloud BI for analysts',
    color: '#1a4a7a', bg: '#e8f0fa', threatLevel: 'tier2',
    threatLabel: 'Tier 2 — Opportunistic Takeout', emoji: 'SG',
    profile: {
      stage: 'Series D, ~$800M valuation (2022)', headcount: '~400 employees',
      arr: 'Est. $100–140M ARR', targetMarket: 'Mid-market to enterprise; data-literate business teams',
      ics: 'Financial analysts, ops analysts, BI teams who love Excel', verticals: 'FS, Retail, SaaS, Media',
      coreOffering: 'Cloud spreadsheet interface directly on Snowflake/Databricks. AI features via Sigma AI.',
      delivery: 'Cloud SaaS', businessModel: 'Per-seat licensing; viewer/explorer/creator tiers',
    },
    positioning: {
      tagline: '"The spreadsheet that scales"', headline: 'Spreadsheet-familiar analytics on your cloud data',
      differentiators: ['Familiar spreadsheet UI', 'Live queries direct to warehouse (no extracts)', 'Fast time-to-insight for Excel users', 'Collaborative workbooks'],
      tone: 'Analyst-friendly, approachable, anti-complexity',
      analystPerception: 'G2 high performer; TechCrunch highlights "Excel for the cloud warehouse"',
    },
    strengths: ['Best-in-class spreadsheet metaphor — beloved by finance/ops','Zero-code SQL — power without writing queries','Direct-to-warehouse means fresh data always','Fast implementation vs legacy BI'],
    weaknesses: ['AI story is thin — Sigma AI is early, no anti-hallucination architecture','Not truly conversational — still a visual tool at heart','Weaker for executive dashboards vs Tableau/PBIX','Smaller ecosystem / fewer connectors than Power BI','No semantic layer or Enterprise Context Layer'],
    winConditions: ['Finance team is the buyer — they think in spreadsheets','Snowflake-native org wants warehouse-connected analytics','Replacement for Excel-to-BI migration projects'],
    loseConditions: ['Executive wants simple NLQ — Sigma still requires building workbooks','Multi-persona org where execs + analysts need same tool'],
    objections: ['Our finance team already built all their models in Sigma','Sigma is spreadsheet-familiar — our users won\'t adopt something new'],
    salesMotion: ['PLG / analyst bottoms-up', 'Snowflake co-sell', 'Finance team champion'],
  },
  {
    id: 'omni', name: 'Omni', shortName: 'Omni',
    tagline: 'Modern BI for analysts who want code + no-code',
    color: '#0f6e56', bg: '#e1f5ee', threatLevel: 'tier2',
    threatLabel: 'Tier 2 — Watch', emoji: 'OM',
    profile: {
      stage: 'Series B, ~$150M raised', headcount: '~100 employees',
      arr: 'Est. $15–25M ARR', targetMarket: 'Data teams + analysts; mid-market tech companies',
      ics: 'Analytics engineers, data analysts', verticals: 'SaaS, fintech, e-commerce',
      coreOffering: 'Modeling + exploration + dashboards. Bridges dbt and self-serve BI.',
      delivery: 'Cloud SaaS', businessModel: 'Per-seat with model-layer licensing',
    },
    positioning: {
      tagline: '"BI that doesn\'t fight your data stack"', headline: 'Works with dbt, Git, and your warehouse natively',
      differentiators: ['Git-backed semantic layer', 'dbt integration first-class', 'Both SQL + no-code UX in one tool', 'Strong developer experience'],
      tone: 'Developer-first, modern-stack credibility, anti-Looker',
      analystPerception: 'Seen as "the spiritual successor to Looker" by data community; strong on Twitter/X data circles',
    },
    strengths: ['Best dbt integration in BI market — beloved by analytics engineers','Git-native semantic layer is code-first dream','Modern UI and fast iteration','Strong word-of-mouth in data community'],
    weaknesses: ['Early stage — enterprise security/compliance still maturing','AI features nascent compared to WisdomAI','Limited enterprise track record','Primarily technical user persona — not exec-friendly'],
    winConditions: ['Analytics engineer is the champion and loves dbt','Org migrating off Looker'],
    loseConditions: ['Non-technical exec buyer — Omni requires data team ownership','Enterprise compliance requirements (SOC 2 Type II, etc.)'],
    objections: ['Our data team already chose Omni as the BI layer above dbt','Omni is developer-friendly — our data team prefers it'],
    salesMotion: ['Analytics engineer bottoms-up', 'Looker migration plays', 'Community/PLG'],
  },
  {
    id: 'hex', name: 'HEX', shortName: 'HEX',
    tagline: 'Collaborative notebooks + apps for data teams',
    color: '#534AB7', bg: '#EEEDFE', threatLevel: 'tier2',
    threatLabel: 'Tier 2 — Adjacent', emoji: 'HX',
    profile: {
      stage: 'Series C, ~$130M raised', headcount: '~200 employees',
      arr: 'Est. $25–40M ARR', targetMarket: 'Data scientists, analytics engineers, DS teams',
      ics: 'Data scientists, ML engineers, analytics engineers', verticals: 'Tech, pharma, finance',
      coreOffering: 'Collaborative notebooks (SQL + Python) with app publishing. Magic AI = inline code assistance.',
      delivery: 'Cloud SaaS', businessModel: 'Per-workspace + per-seat pricing',
    },
    positioning: {
      tagline: '"Notebooks your whole team can use"', headline: 'Where data teams do their best work — together',
      differentiators: ['Best-in-class collaborative notebook UX', 'Publish notebooks as apps', 'SQL + Python in same cell', 'Magic AI for code generation'],
      tone: 'Data-scientist beloved, collaborative, modern-tool vibe',
      analystPerception: 'Product-led growth darling; frequently cited as "the Notion for data teams"',
    },
    strengths: ['Beloved product — strong NPS among data scientists','SQL + Python in one environment is unique','Fast, beautiful app publishing for stakeholders','Strong community and content marketing'],
    weaknesses: ['Notebook paradigm not for business users — high complexity','No semantic layer, no governed metrics','AI is code-generation (Magic), not conversational analytics','Not an enterprise BI replacement — complements it'],
    winConditions: ['Data science team is buying for internal workflows'],
    loseConditions: ['Business analyst or executive is the buyer','Customer needs governed self-serve — HEX is too freeform'],
    objections: ['Our data team uses HEX for exploration — different use case'],
    salesMotion: ['Bottoms-up data team', 'PLG / free tier expansion'],
  },
  {
    id: 'thoughtspot', name: 'ThoughtSpot', shortName: 'ThoughtSpot',
    tagline: 'AI-powered search analytics for business users',
    color: '#b7660d', bg: '#fef3e2', threatLevel: 'tier1',
    threatLabel: 'Tier 1 — Direct Competitor', emoji: 'TS',
    profile: {
      stage: 'Late-stage private, ~$4.2B valuation (2021)', headcount: '~1,200 employees',
      arr: 'Est. $200–260M ARR', targetMarket: 'Enterprise business users, Fortune 1000',
      ics: 'Business analysts, BI leaders, CDOs', verticals: 'Retail, FS, Healthcare, Manufacturing',
      coreOffering: 'Search-driven analytics (SpotIQ) + embedded analytics (Everywhere). Sage = GenAI layer.',
      delivery: 'Cloud SaaS + on-prem', businessModel: 'Annual platform license + consumption; user-tier pricing',
    },
    positioning: {
      tagline: '"The AI-Powered Analytics Platform"', headline: 'Let everyone in your company explore data with AI',
      differentiators: ['Search-first analytics UX (pioneered NLQ in BI)', 'ThoughtSpot Everywhere (embedded analytics)', 'Sage GenAI layer', 'SpotIQ auto-insights'],
      tone: 'AI-first messaging, democratization narrative, enterprise-safe',
      analystPerception: 'Gartner MQ Visionary; Forrester noted as "NLQ pioneer but showing age"',
    },
    strengths: ['Pioneered natural language search in BI — strong brand in NLQ','Everywhere platform is genuinely strong for embedded','Enterprise pedigree with Fortune 1000 logos','SpotIQ auto-insight is differentiated vs pure query tools','Sage adds GenAI on top of search — roadmap alignment'],
    weaknesses: ['Sage AI quality lags WisdomAI — no enterprise context layer','Aging search UX compared to conversational AI','Expensive for mid-market','Complex to implement — needs extensive modeling','Losing ground to AI-native vendors'],
    winConditions: ['Embedded analytics use case — ThoughtSpot Everywhere is unmatched','Large Fortune 500 with data science team and budget','Existing ThoughtSpot customer expanding use cases'],
    loseConditions: ['Customer wants truly conversational AI, not search UI','Mid-market deal — ThoughtSpot pricing is prohibitive','Customer has complex, multi-source data — WisdomAI context layer wins'],
    objections: ['ThoughtSpot pioneered NLQ — why switch?','We\'ve invested 18 months in ThoughtSpot implementation','ThoughtSpot Everywhere handles our embedded analytics'],
    salesMotion: ['Top-down enterprise', 'CDO/VP of Analytics buyer', 'Implementation-partner led'],
  },
  {
    id: 'gooddata', name: 'GoodData', shortName: 'GoodData',
    tagline: 'Embedded analytics platform for SaaS companies',
    color: '#444441', bg: '#f1efe8', threatLevel: 'tier3',
    threatLabel: 'Tier 3 — Deprioritize', emoji: 'GD',
    profile: {
      stage: 'Private, bootstrapped / growth-stage', headcount: '~400 employees',
      arr: 'Est. $40–70M ARR', targetMarket: 'SaaS ISVs building embedded analytics into their product',
      ics: 'Product managers, engineering teams at SaaS companies', verticals: 'SaaS, fintech, HR tech',
      coreOffering: 'Headless embedded analytics with REST API and semantic layer',
      delivery: 'Cloud SaaS + on-prem', businessModel: 'Platform fee + API call volume; white-label pricing',
    },
    positioning: {
      tagline: '"Analytics for Everyone, Everywhere"', headline: 'The only headless BI platform built for embedding',
      differentiators: ['API-first, headless analytics', 'Semantic layer for SaaS products', 'White-label and deeply embeddable', 'Proven at scale (Zendesk, Keboola)'],
      tone: 'Developer-first, product-team language, technical precision',
      analystPerception: 'Niche player in Gartner MQ; G2 known for embedded use case',
    },
    strengths: ['API-first architecture ideal for SaaS embedding','Strong semantic layer for multi-tenant analytics','Can white-label completely — partner-friendly'],
    weaknesses: ['Minimal AI story — no GenAI layer worth noting','Low brand awareness outside embedded niche','Not a self-serve analytics tool — not competitive in WisdomAI territory','Slow to modernize UX'],
    winConditions: ['SaaS company building analytics into their product — their core use case'],
    loseConditions: ['Enterprise self-serve analytics — not their market','Any conversational AI use case'],
    objections: ['Our product team embedded GoodData for customer-facing analytics'],
    salesMotion: ['Product-led, ISV/partner channel', 'Developer/PM champion'],
  },
  {
    id: 'snowflake', name: 'Snowflake Intelligence', shortName: 'Snowflake Intel.',
    tagline: 'Native AI analytics layer built into the Snowflake Data Cloud',
    color: '#29b5e8', bg: '#e6f7fd', threatLevel: 'tier1',
    threatLabel: 'Tier 1 — Existential', emoji: 'SF',
    profile: {
      stage: 'Public (NYSE: SNOW)', headcount: '~7,000 employees',
      arr: 'Est. $3.3B+ product revenue (FY2024)', targetMarket: 'Enterprise data teams already on Snowflake',
      ics: 'Data engineers, CDOs, analytics leaders', verticals: 'FS, Healthcare, Retail, Tech, Media',
      coreOffering: 'Cortex AI + Intelligence layer native to Snowflake — NLQ, auto-insights, and agentic analytics inside the warehouse.',
      delivery: 'Cloud SaaS (AWS, Azure, GCP)',
      businessModel: 'Consumption-based (compute credits); Intelligence bundled for Snowflake customers',
    },
    positioning: {
      tagline: '"The AI Data Cloud"',
      headline: 'Ask questions of your data — right inside Snowflake',
      differentiators: ['Zero data movement — analytics where the data lives', 'Cortex AI natively integrated', 'Trusted governance via Snowflake platform', 'Cross-cloud, multi-region enterprise scale'],
      tone: 'Platform authority, data-governance-first, enterprise-safe',
      analystPerception: 'Gartner MQ leader for cloud databases; Intelligence seen as a direct threat to standalone BI/AI analytics tools',
    },
    strengths: ['Dominant warehouse position — bundling Intelligence is nearly free for existing customers', 'Cortex AI growing fast with Snowflake\'s massive R&D investment', 'Zero-ETL advantage — data never leaves the warehouse', 'Largest enterprise data cloud customer base to upsell into'],
    weaknesses: ['Requires Snowflake as the data platform — no portability', 'Intelligence is still maturing vs purpose-built AI analytics', 'Business user UX behind dedicated tools like WisdomAI', 'No anti-hallucination architecture comparable to Enterprise Context Layer'],
    winConditions: ['Account is all-in on Snowflake for data infrastructure', 'IT/data engineering team controls the BI/AI buying decision', 'Customer prioritises consolidation over best-of-breed'],
    loseConditions: ['Business analyst or executive is the buyer — UX is too technical', 'Multi-cloud or non-Snowflake data stack', 'Customer demands hallucination-free verified answers'],
    objections: ['We already have Snowflake — why add WisdomAI on top?', 'Intelligence is included in our Snowflake contract', 'Our data team trusts Cortex AI for analytics'],
    salesMotion: ['Platform bundling / top-down enterprise', 'Data engineering team champion', 'Snowflake account team co-sell'],
  },
];

export const compLabelMap: Record<string, string> = {
  databricks: 'Databricks',
  powerbi: 'Power BI',
  sigma: 'Sigma',
  omni: 'Omni',
  hex: 'HEX',
  thoughtspot: 'ThoughtSpot',
  gooddata: 'GoodData',
  snowflake: 'Snowflake Intel.',
};
