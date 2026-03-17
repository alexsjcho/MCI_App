export interface BattlecardFeatureRow {
  dimension: string;
  wisdom: string;
  competitor: string;
  winner: 'wisdom' | 'competitor' | 'neutral';
}

export interface BattlecardRating {
  label: string;
  score: number;
}

export interface BattlecardObjection {
  question: string;
  response: string;
}

export interface BattlecardData {
  meta: {
    category: string;
    dealStage: string;
    icp: string;
    updated: string;
    owner: string;
  };
  positioning: {
    wisdom: { title: string; description: string };
    competitor: { title: string; description: string };
  };
  proofPoints: Array<{ stat: string; description: string }>;
  featureComparison: BattlecardFeatureRow[];
  wisdomRatings: BattlecardRating[];
  competitorRatings: BattlecardRating[];
  objections: BattlecardObjection[];
  discoveryQuestions: string[];
}

export const battlecardDataMap: Record<string, BattlecardData> = {
  thoughtspot: {
    meta: {
      category: 'AI-Powered Analytics / BI',
      dealStage: 'All stages',
      icp: 'Enterprise Data Teams',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — The AI Data Analyst Layer',
        description:
          'WisdomAI sits on top of your existing BI stack as an intelligent, proactive analyst. It monitors data continuously, surfaces anomalies before anyone asks, and works across multiple data platforms — databases, documents, and files — without forcing a warehouse consolidation. Built for the AI-native era from day one.',
      },
      competitor: {
        title: 'ThoughtSpot — Search-Driven Self-Service BI',
        description:
          'ThoughtSpot is a mature search-based BI platform that lets non-technical users query data through natural language. It integrates with major cloud warehouses and offers Liveboards for embedded analytics. Best suited to teams with a single consolidated warehouse who want a polished self-service interface.',
      },
    },
    proofPoints: [
      { stat: '0', description: 'Hallucinations in query outputs — generative AI generates queries only, never the answer itself' },
      { stat: '3+', description: 'Industries with purpose-built vertical AI models (Finance, Healthcare, Retail)' },
      { stat: '24/7', description: 'Autonomous monitoring — catches issues before your team thinks to check a dashboard' },
    ],
    featureComparison: [
      {
        dimension: 'Architecture',
        wisdom: 'Cross-platform AI layer — sits above existing BI tools; no rip-and-replace required',
        competitor: 'Proprietary platform with its own search interface; best within a single warehouse ecosystem',
        winner: 'wisdom',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Bridges structured + unstructured sources (DBs, docs, files) across multiple platforms',
        competitor: 'Connects to major cloud warehouses (Snowflake, BigQuery, Redshift); primarily structured data',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: 'AI monitors business conditions 24/7; alerts teams before they think to ask',
        competitor: 'Reactive — surfaces answers when users ask questions; no autonomous alerting',
        winner: 'wisdom',
      },
      {
        dimension: 'AI Accuracy',
        wisdom: 'Generative AI used only to generate queries, not answers — grounded in actual data, avoids hallucinations',
        competitor: 'AI interprets search queries; limited explainability into how results are produced',
        winner: 'wisdom',
      },
      {
        dimension: 'Natural Language',
        wisdom: 'Conversational AI analyst — ask complex multi-step questions across all data sources',
        competitor: 'Search-bar NLQ interface; strong for simple queries, struggles with compound questions',
        winner: 'neutral',
      },
      {
        dimension: 'Ease of Use (Biz Users)',
        wisdom: 'Designed for business users with zero technical background',
        competitor: 'Search interface is accessible; advanced features require higher skill level',
        winner: 'neutral',
      },
      {
        dimension: 'Visualization',
        wisdom: 'Modern AI-generated charts contextual to query results',
        competitor: 'Solid visualizations, but limited customization compared to Tableau/Power BI',
        winner: 'neutral',
      },
      {
        dimension: 'Enterprise Governance',
        wisdom: 'Enterprise Context Layer ensures governed, accurate insights; SOC2 compliant',
        competitor: 'Deep governance features from 10+ years in enterprise; battle-tested at scale',
        winner: 'competitor',
      },
      {
        dimension: 'Track Record',
        wisdom: 'Founded 2023; modern architecture; rapidly expanding enterprise roster',
        competitor: 'Founded 2012; rated 8.4/10 on PeerSpot; 92% user recommendation rate',
        winner: 'competitor',
      },
      {
        dimension: 'Pricing Transparency',
        wisdom: 'Custom enterprise pricing — contact for quote',
        competitor: 'Competitive pricing with rapid deployment options; usage-based costs can surprise',
        winner: 'neutral',
      },
      {
        dimension: 'Industry Verticals',
        wisdom: 'Finance (market prediction), healthcare (patient insights), retail (personalization) — built-in vertical models',
        competitor: 'Horizontal platform; verticals served through partner ecosystem',
        winner: 'wisdom',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 7.0 },
      { label: 'Multi-source Support', score: 6.5 },
      { label: 'Proactive Monitoring', score: 4.5 },
      { label: 'Ease of Use', score: 7.8 },
      { label: 'Enterprise Maturity', score: 9.0 },
      { label: 'Customer Reviews', score: 8.4 },
    ],
    objections: [
      {
        question: 'ThoughtSpot has been around since 2012. WisdomAI is too new and unproven.',
        response:
          "Acknowledge, then redirect: ThoughtSpot's longevity is real — and it shows in their governance and compliance depth. But our modern architecture means we skipped a decade of technical debt. We were built for a world with large language models, multi-cloud data stacks, and proactive AI — not retrofitted for it. Ask them: how many of ThoughtSpot's features did they add to catch up to the AI era vs. building for it from day one?",
      },
      {
        question: "ThoughtSpot has thousands of reviews. We can't find WisdomAI on G2.",
        response:
          "Flip to outcome: G2 reviews measure past adoption — not future outcomes. WisdomAI is enterprise-first and moves through direct relationships and proof-of-concept pilots, not a self-serve freemium funnel. We'd rather show you exactly how it performs on your data in a 30-day pilot than ask you to read reviews from companies with different data architectures than yours.",
      },
      {
        question: "ThoughtSpot integrates with our Snowflake stack and we're all-in on that ecosystem.",
        response:
          "Complement, don't replace: WisdomAI doesn't replace your Snowflake investment — it adds a proactive intelligence layer on top. ThoughtSpot answers the questions your team asks. WisdomAI finds the questions your team hasn't thought to ask yet. If you're all-in on Snowflake, WisdomAI connects natively and works alongside ThoughtSpot if needed.",
      },
      {
        question: 'ThoughtSpot is cheaper and has a quicker time-to-value.',
        response:
          "Total cost vs. sticker price: ThoughtSpot's deployment may be faster — but ask what happens when usage scales. Their usage-based pricing surprises customers at billing. WisdomAI's value is in catching revenue anomalies and market shifts proactively — one alert that prevents a missed quarter pays for the platform many times over.",
      },
      {
        question: 'We need SOC2, HIPAA, and enterprise-grade security. Can WisdomAI deliver?',
        response:
          'Lead with specifics: WisdomAI is SOC2 Type II certified and purpose-built for regulated industries including healthcare. Our Enterprise Context Layer enforces data governance policies before any AI query is run — meaning no unauthorized data ever surfaces. Happy to provide our security documentation and connect you with our CISO for a deep-dive.',
      },
    ],
    discoveryQuestions: [
      'How many different data sources do your analysts pull from today — and how many are outside your primary warehouse?',
      'When something goes wrong in your business metrics, how do you usually find out — from an alert, a dashboard, or a customer complaint?',
      'How much time does your data team spend fielding ad-hoc questions from business stakeholders each week?',
      "If an AI gave you an insight, how important is it that you can trace exactly where that answer came from — down to the source row?",
      'What happens when analysts need to combine structured data from your warehouse with unstructured content like sales emails, PDFs, or support tickets?',
      'Are you looking to replace your existing BI tools, or augment what you already have with AI-driven intelligence on top?',
    ],
  },

  databricks: {
    meta: {
      category: 'Data + AI Platform / Conversational BI',
      dealStage: 'All stages',
      icp: 'Enterprise Data & ML Teams',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — The AI Data Analyst Layer',
        description:
          'WisdomAI is a platform-agnostic AI analyst that works across your existing data stack — warehouses, databases, documents, and files. It monitors data proactively, delivers hallucination-free insights grounded in actual data, and requires zero rip-and-replace. Purpose-built for business users who need answers, not notebooks.',
      },
      competitor: {
        title: 'Databricks Genie — Conversational BI Inside the Lakehouse',
        description:
          'Genie is a natural-language analytics feature embedded within the Databricks Data Intelligence Platform. It leverages Unity Catalog for verified answers and works exclusively within the Databricks ecosystem. Strongest when the entire data stack already lives in Databricks.',
      },
    },
    proofPoints: [
      { stat: '0', description: 'Hallucinations — generative AI generates queries only, never fabricates the answer itself' },
      { stat: 'Any', description: 'Data source — works across warehouses, databases, docs, and files without requiring a single platform' },
      { stat: '24/7', description: 'Autonomous monitoring — surfaces anomalies before your team opens a dashboard' },
    ],
    featureComparison: [
      {
        dimension: 'Architecture',
        wisdom: 'Platform-agnostic AI layer — sits above any warehouse, database, or BI tool',
        competitor: 'Feature within the Databricks Lakehouse — requires full Databricks adoption',
        winner: 'wisdom',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Bridges structured + unstructured sources across any platform (Snowflake, BigQuery, S3, docs)',
        competitor: 'Databricks-only — Unity Catalog governs what Genie can access',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: 'Continuous AI monitoring with autonomous alerts — catches issues before anyone asks',
        competitor: 'Reactive query interface — answers when users ask, no autonomous alerting',
        winner: 'wisdom',
      },
      {
        dimension: 'AI Accuracy',
        wisdom: 'AI generates queries, not answers — grounded in source data, zero hallucinations',
        competitor: 'Verified answers via Unity Catalog semantic layer — strong within governed tables, degrades outside',
        winner: 'wisdom',
      },
      {
        dimension: 'Business User UX',
        wisdom: 'Designed for non-technical business users — conversational AI with no SQL required',
        competitor: 'Notebook-centric UX designed for data engineers — business users struggle with the interface',
        winner: 'wisdom',
      },
      {
        dimension: 'Natural Language',
        wisdom: 'Multi-step conversational AI across all data sources',
        competitor: 'NLQ on top of Unity Catalog — effective for simple queries within governed tables',
        winner: 'wisdom',
      },
      {
        dimension: 'Platform Depth',
        wisdom: 'Focused on analytics intelligence — does not handle ETL, ML training, or data engineering',
        competitor: 'Full data platform — ETL, ML, streaming, SQL analytics, and BI in one ecosystem',
        winner: 'competitor',
      },
      {
        dimension: 'Enterprise Governance',
        wisdom: 'Enterprise Context Layer enforces governance; SOC2 compliant',
        competitor: 'Unity Catalog is industry-leading for data governance, lineage, and access control',
        winner: 'competitor',
      },
      {
        dimension: 'Market Position',
        wisdom: 'Founded 2023; modern architecture; rapidly growing enterprise roster',
        competitor: '~$43B valuation; ~6,000 employees; dominant in enterprise ML/data engineering',
        winner: 'competitor',
      },
      {
        dimension: 'Pricing',
        wisdom: 'Custom enterprise pricing — predictable annual cost',
        competitor: 'Consumption-based compute pricing — Genie bundled but total Databricks costs can escalate',
        winner: 'neutral',
      },
      {
        dimension: 'Industry Verticals',
        wisdom: 'Purpose-built vertical AI models for Finance, Healthcare, and Retail',
        competitor: 'Horizontal platform — vertical solutions through partner ecosystem and Solution Accelerators',
        winner: 'wisdom',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 7.5 },
      { label: 'Multi-source Support', score: 5.0 },
      { label: 'Proactive Monitoring', score: 3.5 },
      { label: 'Ease of Use', score: 5.5 },
      { label: 'Enterprise Maturity', score: 9.3 },
      { label: 'Customer Reviews', score: 8.0 },
    ],
    objections: [
      {
        question: 'We already use Databricks for everything — why add another tool?',
        response:
          "Complement, don't compete: WisdomAI doesn't replace Databricks — it extends it. Genie answers questions your data engineers think to ask within Unity Catalog. WisdomAI adds a proactive intelligence layer that monitors across all your data — including sources outside Databricks — and alerts your business team before they even know to look. Think of it as your AI analyst that never sleeps, sitting on top of the investment you've already made.",
      },
      {
        question: 'Genie is essentially free — it comes with our Databricks contract.',
        response:
          "Free vs. value: Genie is bundled, but bundled features get bundled investment. Genie is a feature within a data engineering platform, not a purpose-built analytics product. Ask: how many business users actually use Genie today vs. your data team? WisdomAI is purpose-built for the business user — the person waiting 3 days for an analyst to pull a report. The ROI isn't Genie's license cost — it's the hours your data team spends fielding ad-hoc requests.",
      },
      {
        question: 'Our data team already built a semantic layer in Unity Catalog.',
        response:
          "Build on it, don't abandon it: WisdomAI's Enterprise Context Layer can ingest your Unity Catalog definitions as a source of truth. The difference is what happens on top. Unity Catalog governs access. WisdomAI provides proactive monitoring, cross-source intelligence, and a conversational interface that your VP of Sales can actually use — without filing a Jira ticket with the data team.",
      },
      {
        question: 'Databricks is investing heavily in Genie — it will catch up.',
        response:
          "Roadmap vs. reality: Databricks is investing in Genie, but their core business is the data platform — compute, storage, ML. Genie will always be a feature, not the product. WisdomAI's entire R&D investment goes into AI analytics. Ask Databricks: what percentage of their engineering team works on Genie vs. the lakehouse? Meanwhile, we ship weekly improvements to the one thing we do.",
      },
      {
        question: 'We need Databricks for our ML workloads anyway — consolidation is simpler.',
        response:
          "Consolidation vs. best-of-breed: Keep Databricks for what it's great at — data engineering and ML. But analytics is a different job for a different user. Your data scientists don't use the same tools as your VP of Finance. WisdomAI plugs into Databricks as a data source and gives business users an interface designed for them — not repurposed from a notebook.",
      },
    ],
    discoveryQuestions: [
      'How many business users in your org actually log into Databricks today vs. how many need data-driven answers?',
      'When your VP of Sales needs a quick analysis, what\'s the current turnaround time — and who does the work?',
      'What percentage of your analytics data lives outside Databricks — in other warehouses, SaaS tools, documents, or spreadsheets?',
      'How does your team currently detect anomalies in business metrics — is it proactive or after the fact?',
      'If Genie could only answer questions about data inside Unity Catalog, how much of your business context would it miss?',
      'What happens when a stakeholder asks a question that spans data from Databricks and a source outside it?',
    ],
  },

  powerbi: {
    meta: {
      category: 'Legacy BI + AI Copilot',
      dealStage: 'All stages',
      icp: 'Microsoft-Heavy Enterprise Orgs',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — The AI-Native Data Analyst',
        description:
          'WisdomAI is built from the ground up for the AI era. It provides a conversational interface that any business user can operate, works across all data sources without vendor lock-in, and proactively surfaces insights before anyone asks. No DAX, no data modeling, no BI developers required.',
      },
      competitor: {
        title: 'Microsoft Power BI — Enterprise BI with Copilot AI',
        description:
          'Power BI is the market-leading business intelligence tool by volume, deeply embedded in the Microsoft 365 ecosystem. Copilot adds a GenAI layer within Fabric. Strongest when the org is heavily invested in Microsoft licensing and IT controls the BI buying decision.',
      },
    },
    proofPoints: [
      { stat: '0', description: 'DAX required — business users ask questions in plain English, no formulas needed' },
      { stat: '0', description: 'Hallucinations — AI generates queries, not answers; every insight traceable to source data' },
      { stat: '< 1 min', description: 'Time to first insight — no data modeling, no report building, no waiting for IT' },
    ],
    featureComparison: [
      {
        dimension: 'Architecture',
        wisdom: 'Platform-agnostic AI layer — connects to any data source without vendor lock-in',
        competitor: 'Tightly coupled to Microsoft ecosystem (Fabric, Azure, M365); best within that stack',
        winner: 'wisdom',
      },
      {
        dimension: 'AI Quality',
        wisdom: 'AI generates verified queries grounded in data — zero hallucinations by design',
        competitor: 'Copilot generates suggestions, but lacks anti-hallucination guardrails — accuracy varies',
        winner: 'wisdom',
      },
      {
        dimension: 'Business User UX',
        wisdom: 'Conversational AI — any business user can ask questions and get answers immediately',
        competitor: 'Complex interface — non-technical users depend on BI developers for report creation (DAX, Power Query)',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: '24/7 autonomous monitoring — alerts teams to anomalies before they surface in dashboards',
        competitor: 'Reactive — users must build alerts manually or check dashboards; no autonomous intelligence',
        winner: 'wisdom',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Structured + unstructured across any platform — databases, warehouses, docs, files',
        competitor: '500+ connectors for structured data; limited unstructured data support',
        winner: 'wisdom',
      },
      {
        dimension: 'Cost Barrier',
        wisdom: 'Purpose-built AI analytics — requires separate investment',
        competitor: 'Bundled with Microsoft 365 E5 — effectively zero incremental cost for many orgs',
        winner: 'competitor',
      },
      {
        dimension: 'Ecosystem',
        wisdom: 'Focused analytics AI — smaller partner/plugin ecosystem',
        competitor: 'Largest BI ecosystem — hundreds of connectors, templates, community resources, and ISV integrations',
        winner: 'competitor',
      },
      {
        dimension: 'Market Position',
        wisdom: 'Founded 2023; modern architecture; rapidly growing enterprise roster',
        competitor: 'Gartner MQ Leader for 17 consecutive years; millions of users; G2 #1 by review volume',
        winner: 'competitor',
      },
      {
        dimension: 'Natural Language',
        wisdom: 'Multi-step conversational AI — handles complex, compound questions across sources',
        competitor: 'Q&A feature and Copilot handle simple queries; struggles with multi-step analysis',
        winner: 'wisdom',
      },
      {
        dimension: 'Industry Verticals',
        wisdom: 'Purpose-built vertical AI models for Finance, Healthcare, and Retail',
        competitor: 'Horizontal platform — verticals served through partner templates and Microsoft industry clouds',
        winner: 'wisdom',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 5.5 },
      { label: 'Multi-source Support', score: 7.0 },
      { label: 'Proactive Monitoring', score: 4.0 },
      { label: 'Ease of Use', score: 6.0 },
      { label: 'Enterprise Maturity', score: 9.5 },
      { label: 'Customer Reviews', score: 8.2 },
    ],
    objections: [
      {
        question: 'We already pay for Power BI — it\'s included in our Microsoft license.',
        response:
          "Free isn't free: Power BI's license cost is zero, but the total cost of ownership is massive. How many BI developers do you employ to build and maintain reports? How many hours per week does your data team spend on ad-hoc requests? WisdomAI eliminates the intermediary. One platform that lets your VP of Marketing get answers directly — without filing a ticket. The ROI is in headcount reallocation and speed-to-insight, not license savings.",
      },
      {
        question: 'Copilot is improving every quarter — Microsoft will catch up.',
        response:
          "Roadmap vs. reality: Microsoft invests in Copilot across 20+ products — Word, Excel, Teams, Power BI. Analytics AI gets a fraction of that attention. WisdomAI's entire engineering team is focused on one problem: making AI analytics accurate, proactive, and hallucination-free. Ask Microsoft what percentage of Copilot development is dedicated to Power BI specifically. Meanwhile, we're shipping purpose-built improvements weekly.",
      },
      {
        question: 'Our IT team manages Power BI centrally — adding WisdomAI creates governance risk.',
        response:
          "Strengthen governance, don't fragment it: WisdomAI's Enterprise Context Layer enforces data governance policies before any AI query is run. It can consume your existing Power BI semantic model definitions as a source of truth. The difference: Power BI governance requires BI developers to build reports correctly. WisdomAI governance is built into every AI-generated query automatically — no human error possible.",
      },
      {
        question: 'Power BI has millions of users and the largest community. WisdomAI is unproven.',
        response:
          "Adoption vs. satisfaction: Power BI's user count reflects Microsoft's distribution power, not user satisfaction. Ask your business users: how many of them actually build their own reports vs. waiting for someone else to do it? WisdomAI doesn't need your users to learn DAX or build data models. It gives them answers directly. We'd rather show you a 30-day pilot on your data than compare community forum sizes.",
      },
      {
        question: 'We need SOC2 and enterprise security. Can WisdomAI match Microsoft?',
        response:
          'Lead with specifics: WisdomAI is SOC2 Type II certified with enterprise-grade encryption at rest and in transit. Our Enterprise Context Layer enforces row-level and column-level access policies before any AI query executes. Happy to provide our security documentation and arrange a call with our CISO — and we can complete your security questionnaire in under a week.',
      },
    ],
    discoveryQuestions: [
      'How many business users in your org can actually build their own Power BI reports without help from the BI team?',
      'What\'s the average turnaround time when a business leader requests a new report or dashboard?',
      'How much of your analytics data lives outside the Microsoft ecosystem — in Snowflake, BigQuery, SaaS tools, or unstructured sources?',
      'When Copilot gives a suggestion in Power BI, how does your team verify that the answer is accurate?',
      'If you could eliminate the DAX/Power Query learning curve entirely, what would that unlock for your business teams?',
      'How do you currently detect business anomalies — through scheduled reports, manual checks, or proactive alerts?',
    ],
  },

  sigma: {
    meta: {
      category: 'Cloud BI / Spreadsheet Analytics',
      dealStage: 'Mid-to-late stage',
      icp: 'Data-Literate Business Analysts',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — Conversational AI for Any Business User',
        description:
          'WisdomAI delivers answers through conversation, not spreadsheets. It works across any data source, proactively monitors business metrics, and requires zero workbook building. Designed for the business user who needs answers — not another tool to learn.',
      },
      competitor: {
        title: 'Sigma Computing — The Cloud Spreadsheet for Analysts',
        description:
          'Sigma provides a familiar spreadsheet interface directly on top of cloud warehouses like Snowflake and Databricks. Beloved by finance and ops analysts who think in rows and columns. Best suited to teams migrating from Excel to cloud-connected analytics.',
      },
    },
    proofPoints: [
      { stat: '0', description: 'Workbooks to build — ask questions in plain language and get immediate answers' },
      { stat: '24/7', description: 'Proactive monitoring — AI watches your metrics and alerts you to changes automatically' },
      { stat: 'Any', description: 'Data source — structured and unstructured, across any warehouse or platform' },
    ],
    featureComparison: [
      {
        dimension: 'User Interface',
        wisdom: 'Conversational AI — ask questions in natural language, get answers immediately',
        competitor: 'Spreadsheet-native UI — powerful but requires building workbooks manually',
        winner: 'wisdom',
      },
      {
        dimension: 'Target User',
        wisdom: 'Any business user — executives, marketers, sales leaders, ops managers',
        competitor: 'Data-literate analysts — especially finance/ops teams comfortable with spreadsheet logic',
        winner: 'wisdom',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Multi-platform: warehouses, databases, documents, files — structured and unstructured',
        competitor: 'Direct-to-warehouse (Snowflake, Databricks) — primarily structured data',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: '24/7 autonomous anomaly detection and alerting',
        competitor: 'No proactive monitoring — users must check workbooks for changes',
        winner: 'wisdom',
      },
      {
        dimension: 'AI Capabilities',
        wisdom: 'Enterprise Context Layer, hallucination-free queries, vertical AI models',
        competitor: 'Sigma AI is early-stage — basic AI assistance without anti-hallucination architecture',
        winner: 'wisdom',
      },
      {
        dimension: 'Spreadsheet Workflows',
        wisdom: 'Not a spreadsheet — conversational paradigm replaces manual workbook building',
        competitor: 'Best-in-class spreadsheet metaphor — beloved by teams that think in rows, columns, and formulas',
        winner: 'competitor',
      },
      {
        dimension: 'Finance Use Cases',
        wisdom: 'Vertical AI model for finance — but not a spreadsheet replacement for detailed modeling',
        competitor: 'Purpose-built for finance/ops analysts migrating from Excel — formulas, pivots, and drill-downs',
        winner: 'competitor',
      },
      {
        dimension: 'Time to Value',
        wisdom: 'Minutes — connect data source, start asking questions',
        competitor: 'Hours to days — need to build workbooks, define calculations, and train users',
        winner: 'wisdom',
      },
      {
        dimension: 'Collaboration',
        wisdom: 'AI-generated insights shareable across teams with full audit trail',
        competitor: 'Collaborative workbooks with real-time co-editing — Google Sheets-like experience',
        winner: 'neutral',
      },
      {
        dimension: 'Enterprise Governance',
        wisdom: 'Enterprise Context Layer with row/column-level policies; SOC2 certified',
        competitor: 'Warehouse-level governance inherited from Snowflake/Databricks; growing enterprise features',
        winner: 'wisdom',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 5.0 },
      { label: 'Multi-source Support', score: 5.5 },
      { label: 'Proactive Monitoring', score: 2.0 },
      { label: 'Ease of Use', score: 8.0 },
      { label: 'Enterprise Maturity', score: 6.5 },
      { label: 'Customer Reviews', score: 7.5 },
    ],
    objections: [
      {
        question: 'Our finance team already built all their models in Sigma.',
        response:
          "Complement, don't replace: Sigma is great for detailed financial modeling — keep it for that. WisdomAI serves a different audience: the executive who wants a quick answer, the sales leader who needs pipeline insights, the ops manager tracking anomalies. WisdomAI gives those users instant answers without building workbooks. The question isn't Sigma vs. WisdomAI — it's whether every persona in your org is served by a spreadsheet.",
      },
      {
        question: 'Sigma is spreadsheet-familiar — our users won\'t adopt something new.',
        response:
          "Familiarity vs. accessibility: Sigma is familiar to analysts who already think in spreadsheets. But what about the 80% of your org that doesn't? Your CEO isn't going to build a Sigma workbook. WisdomAI meets users where they are — in a conversation. No formulas, no workbook design, no pivot table configuration. Just ask a question and get a verified answer.",
      },
      {
        question: 'Sigma connects directly to our Snowflake — no data movement required.',
        response:
          "Same advantage, broader scope: WisdomAI also connects directly to Snowflake with zero data movement. The difference is we also connect to your other data sources — BigQuery, Postgres, SaaS APIs, PDFs, and spreadsheets. How much of your business context lives outside Snowflake? WisdomAI bridges that gap without asking you to consolidate everything into one warehouse first.",
      },
      {
        question: 'We just bought Sigma last year — we need to get ROI before adding another tool.',
        response:
          "Expand the ROI: Sigma serves your analyst power users. WisdomAI expands the reach of your data investment to every business user in the org — people who will never log into Sigma. Think of it as 10x-ing the audience for the data your analysts curate in Sigma. More users getting value from data = better ROI on your entire data stack, including Sigma.",
      },
    ],
    discoveryQuestions: [
      'What percentage of your org actually uses Sigma today — and what do the rest do when they need data?',
      'When a non-analyst stakeholder needs an insight, do they ask the data team or try to find it themselves?',
      'How much of your critical business data lives outside Snowflake — in SaaS tools, documents, or other databases?',
      'How does your team currently detect unexpected changes in business metrics — proactively or after the fact?',
      'If your CEO needed a quick answer about revenue trends, would they open Sigma or ask someone else?',
      'What would it mean for your business if every department could get data-driven answers without the analytics team bottleneck?',
    ],
  },

  omni: {
    meta: {
      category: 'Modern BI / Developer-First Analytics',
      dealStage: 'Early-to-mid stage',
      icp: 'Analytics Engineers & Data Teams',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — AI Analytics for the Entire Organization',
        description:
          'WisdomAI serves the full org — from data teams to business executives — with conversational AI that works across any data source. It provides proactive monitoring, hallucination-free insights, and vertical AI models, without requiring dbt expertise or SQL proficiency.',
      },
      competitor: {
        title: 'Omni — Developer-First BI with dbt at its Core',
        description:
          'Omni is a modern BI tool built by ex-Looker founders, designed for analytics engineers who want a Git-native, dbt-integrated semantic layer. It bridges code-first workflows with a no-code exploration layer. Strongest in dbt-centric data teams at mid-market tech companies.',
      },
    },
    proofPoints: [
      { stat: '0', description: 'SQL required — business users ask questions in plain English' },
      { stat: '24/7', description: 'Proactive monitoring that catches anomalies before your data team does' },
      { stat: '3+', description: 'Vertical AI models purpose-built for Finance, Healthcare, and Retail' },
    ],
    featureComparison: [
      {
        dimension: 'Target User',
        wisdom: 'Business users, executives, and analysts — anyone who needs data-driven answers',
        competitor: 'Analytics engineers and data analysts — technical users who manage semantic layers',
        winner: 'wisdom',
      },
      {
        dimension: 'AI Capabilities',
        wisdom: 'Conversational AI with Enterprise Context Layer, hallucination-free, proactive monitoring',
        competitor: 'AI features are nascent — basic natural language with no anti-hallucination architecture',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: '24/7 autonomous anomaly detection across all data sources',
        competitor: 'No proactive monitoring — reactive dashboard and exploration tool',
        winner: 'wisdom',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Multi-platform: warehouses, databases, documents, files — any source',
        competitor: 'Warehouse-native (Snowflake, BigQuery, Databricks) — structured data only',
        winner: 'wisdom',
      },
      {
        dimension: 'dbt Integration',
        wisdom: 'Can leverage dbt models as a data source — not a dbt-native tool',
        competitor: 'Best-in-class dbt integration — Git-native semantic layer, first-class dbt support',
        winner: 'competitor',
      },
      {
        dimension: 'Developer Experience',
        wisdom: 'Focused on business user experience — less emphasis on developer workflows',
        competitor: 'Git-backed, version-controlled, SQL + no-code in one tool — analytics engineer dream',
        winner: 'competitor',
      },
      {
        dimension: 'Enterprise Maturity',
        wisdom: 'SOC2 certified; Enterprise Context Layer for governance; growing enterprise roster',
        competitor: 'Early stage (~100 employees) — enterprise security and compliance still maturing',
        winner: 'wisdom',
      },
      {
        dimension: 'Ease of Use',
        wisdom: 'Conversational interface — no training required for business users',
        competitor: 'Requires data team to set up and maintain semantic layer — business user access is secondary',
        winner: 'wisdom',
      },
      {
        dimension: 'Community',
        wisdom: 'Enterprise-focused go-to-market — growing through direct sales',
        competitor: 'Strong word-of-mouth in data community — "spiritual successor to Looker"',
        winner: 'competitor',
      },
      {
        dimension: 'Visualization',
        wisdom: 'AI-generated contextual charts — not a dashboard builder',
        competitor: 'Full dashboard and exploration UI — interactive and developer-customizable',
        winner: 'neutral',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 4.5 },
      { label: 'Multi-source Support', score: 5.0 },
      { label: 'Proactive Monitoring', score: 2.0 },
      { label: 'Ease of Use', score: 5.5 },
      { label: 'Enterprise Maturity', score: 5.0 },
      { label: 'Customer Reviews', score: 7.0 },
    ],
    objections: [
      {
        question: 'Our data team already chose Omni as the BI layer above dbt.',
        response:
          "Different users, different tools: Omni is a great choice for your data team's workflow — dbt integration, Git-native, code-first. But who serves the business users? Your VP of Marketing isn't going to explore an Omni dashboard or write SQL. WisdomAI sits on top of the data your team curates in Omni and dbt, and makes it accessible to everyone else in the org through conversation. It's not a replacement — it's the last mile.",
      },
      {
        question: 'Omni is developer-friendly — our data team prefers it.',
        response:
          "Developer preference vs. org-wide value: Your data team should love their tools — and Omni is designed for them. But the buying decision should also consider the 90% of your org that doesn't write SQL. WisdomAI gives those users direct access to insights, reducing the load on your data team. Instead of fielding ad-hoc requests, your analytics engineers can focus on modeling and infrastructure — the work they actually want to do.",
      },
      {
        question: 'We want to consolidate on fewer tools, not add more.',
        response:
          "Consolidation vs. coverage: If your data team uses Omni and your business users have no self-serve option, you haven't consolidated — you've just left the business without a tool. WisdomAI fills the gap for the rest of the org. And with proactive monitoring, it reduces the volume of ad-hoc requests that currently flow from business users to your data team via Slack and email.",
      },
      {
        question: 'Omni is adding AI features — they\'ll catch up.',
        response:
          "Feature vs. focus: Omni's core investment is in the semantic layer and developer experience — and that's where their engineering team will continue to focus. AI analytics is WisdomAI's entire reason for existing. We ship purpose-built AI improvements weekly. By the time Omni's AI features mature, WisdomAI will be two generations ahead in accuracy, proactive monitoring, and vertical intelligence.",
      },
    ],
    discoveryQuestions: [
      'How many people in your org actually use Omni today — and what do non-technical stakeholders do when they need data?',
      'When your data team sets up a dashboard in Omni, how often do business users ask for modifications or new views?',
      'What percentage of ad-hoc data requests still come through Slack, email, or Jira tickets?',
      'How does your team currently detect anomalies in key business metrics?',
      'If your business users could ask questions of your data directly — without involving the data team — what would that free up?',
      'How important is it that your analytics AI works across data sources beyond what Omni connects to?',
    ],
  },

  hex: {
    meta: {
      category: 'Collaborative Notebooks / Data Science',
      dealStage: 'Early stage',
      icp: 'Data Science & ML Teams',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — AI Analytics for Business Decision-Makers',
        description:
          'WisdomAI is purpose-built for business users who need answers — not code. It provides conversational AI, proactive monitoring, and hallucination-free insights across any data source. No notebooks, no Python, no SQL required.',
      },
      competitor: {
        title: 'HEX — Collaborative Notebooks for Data Teams',
        description:
          'HEX is a collaborative notebook platform that combines SQL and Python in a beautiful interface, with the ability to publish notebooks as interactive apps. Magic AI provides inline code assistance. Strongest for data science teams doing exploratory analysis.',
      },
    },
    proofPoints: [
      { stat: '0', description: 'Code required — business users get answers through natural conversation' },
      { stat: '24/7', description: 'Proactive anomaly detection — not dependent on someone running a notebook' },
      { stat: '100%', description: 'Governed insights — every answer traceable to source data with full audit trail' },
    ],
    featureComparison: [
      {
        dimension: 'Target User',
        wisdom: 'Business users, executives, analysts — anyone who needs data-driven answers',
        competitor: 'Data scientists, ML engineers, analytics engineers — technical users who write code',
        winner: 'wisdom',
      },
      {
        dimension: 'Interface',
        wisdom: 'Conversational AI — ask questions, get verified answers in seconds',
        competitor: 'SQL + Python notebooks — powerful but requires coding proficiency',
        winner: 'wisdom',
      },
      {
        dimension: 'AI Approach',
        wisdom: 'Enterprise Context Layer with hallucination-free query generation',
        competitor: 'Magic AI generates code snippets — helpful but not analytical intelligence',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: '24/7 autonomous monitoring across all data sources',
        competitor: 'No proactive monitoring — insights only when someone runs a notebook',
        winner: 'wisdom',
      },
      {
        dimension: 'Governance',
        wisdom: 'Enterprise Context Layer enforces policies; governed metrics; SOC2 certified',
        competitor: 'No semantic layer or governed metrics — freeform exploration environment',
        winner: 'wisdom',
      },
      {
        dimension: 'Exploratory Analysis',
        wisdom: 'Conversational exploration — not designed for deep statistical modeling or custom code',
        competitor: 'Best-in-class for exploratory analysis — SQL, Python, and visualization in one flow',
        winner: 'competitor',
      },
      {
        dimension: 'Data Science Workflows',
        wisdom: 'Not a data science tool — focused on business analytics and intelligence',
        competitor: 'Purpose-built for data science — model development, experimentation, and collaboration',
        winner: 'competitor',
      },
      {
        dimension: 'App Publishing',
        wisdom: 'AI-generated shareable insights — not interactive published apps',
        competitor: 'Publish notebooks as beautiful stakeholder-facing apps',
        winner: 'competitor',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Multi-platform: warehouses, databases, documents, files — structured and unstructured',
        competitor: 'Warehouse connections + file uploads — primarily structured data',
        winner: 'wisdom',
      },
      {
        dimension: 'Scale & Adoption',
        wisdom: 'Designed for org-wide deployment — every department gets self-serve analytics',
        competitor: 'Typically confined to data team — limited business user adoption',
        winner: 'wisdom',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 5.0 },
      { label: 'Multi-source Support', score: 5.5 },
      { label: 'Proactive Monitoring', score: 1.5 },
      { label: 'Ease of Use', score: 6.0 },
      { label: 'Enterprise Maturity', score: 5.5 },
      { label: 'Customer Reviews', score: 8.0 },
    ],
    objections: [
      {
        question: 'Our data team uses HEX for exploration — it\'s a different use case.',
        response:
          "Exactly right — and that's the point: HEX is a data science tool. WisdomAI is a business intelligence tool. They serve different users with different needs. The question is: while your data team explores in HEX, who serves the business stakeholders waiting for answers? WisdomAI fills that gap — giving executives and operators instant, governed insights without waiting for a notebook to be built and published.",
      },
      {
        question: 'HEX can publish apps for stakeholders — that covers our business user needs.',
        response:
          "Published apps vs. self-serve intelligence: HEX apps are great for structured deliverables — but they're still built and maintained by your data team. Every new question requires someone to update or create a new notebook. WisdomAI flips this: business users ask their own questions directly. No backlog, no ticket, no waiting. Your data team gets freed from the ad-hoc request cycle.",
      },
      {
        question: 'We don\'t want to add another tool — we\'re trying to simplify our stack.',
        response:
          "Simplify by role, not by tool count: Having one tool that serves data scientists but not business users isn't simplification — it's leaving the business without self-serve analytics. WisdomAI serves the rest of the org. Together, HEX + WisdomAI cover both technical exploration and business intelligence with purpose-built tools for each persona.",
      },
    ],
    discoveryQuestions: [
      'When your data team publishes an analysis in HEX, who consumes it — and do they ever need a different view?',
      'How many ad-hoc data requests does your data team handle per week from business stakeholders?',
      'What tools do your non-technical stakeholders use today when they need a quick answer about business metrics?',
      'How does your team currently monitor key business metrics for unexpected changes?',
      'If business users could get governed, instant answers without involving the data team, how would that change your team\'s workload?',
      'What percentage of HEX notebooks get published as apps vs. staying as internal explorations?',
    ],
  },

  gooddata: {
    meta: {
      category: 'Embedded Analytics / Headless BI',
      dealStage: 'Niche overlap only',
      icp: 'SaaS Product Teams Building Embedded Analytics',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — AI-Powered Enterprise Analytics',
        description:
          'WisdomAI is built for enterprise teams who need proactive, conversational intelligence across all their data. It monitors metrics autonomously, delivers hallucination-free answers, and works across any data source — purpose-built for internal business decision-making, not embedded product analytics.',
      },
      competitor: {
        title: 'GoodData — Headless Embedded Analytics for SaaS',
        description:
          'GoodData is an API-first, headless analytics platform designed for SaaS companies that want to embed analytics into their own products. It excels at multi-tenant, white-label dashboards. Not positioned for enterprise self-serve BI or AI-driven analytics.',
      },
    },
    proofPoints: [
      { stat: '0', description: 'Hallucinations — AI generates queries only, every insight verified against source data' },
      { stat: '24/7', description: 'Autonomous monitoring — proactive alerting for business anomalies' },
      { stat: '3+', description: 'Vertical AI models purpose-built for enterprise industries' },
    ],
    featureComparison: [
      {
        dimension: 'Primary Use Case',
        wisdom: 'Internal enterprise analytics — self-serve AI for business teams',
        competitor: 'External embedded analytics — white-label dashboards inside SaaS products',
        winner: 'neutral',
      },
      {
        dimension: 'AI Capabilities',
        wisdom: 'Conversational AI, Enterprise Context Layer, proactive monitoring, vertical models',
        competitor: 'Minimal AI story — no GenAI layer worth noting as of 2026',
        winner: 'wisdom',
      },
      {
        dimension: 'Natural Language',
        wisdom: 'Multi-step conversational AI across any data source',
        competitor: 'No meaningful natural language analytics capability',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: '24/7 autonomous anomaly detection and alerting',
        competitor: 'No proactive monitoring — reactive dashboard platform',
        winner: 'wisdom',
      },
      {
        dimension: 'Embedding Capability',
        wisdom: 'Not designed for white-label embedding into customer-facing products',
        competitor: 'API-first, headless, white-label — purpose-built for embedding into SaaS products',
        winner: 'competitor',
      },
      {
        dimension: 'Multi-Tenant Architecture',
        wisdom: 'Enterprise single-tenant — designed for internal org use',
        competitor: 'Multi-tenant by design — row-level security for SaaS customers',
        winner: 'competitor',
      },
      {
        dimension: 'Semantic Layer',
        wisdom: 'Enterprise Context Layer for governed AI analytics',
        competitor: 'Strong semantic layer for multi-tenant analytics — well-proven at scale',
        winner: 'neutral',
      },
      {
        dimension: 'Business User UX',
        wisdom: 'Conversational AI — any business user can get answers without training',
        competitor: 'Developer-facing API — not designed for direct business user interaction',
        winner: 'wisdom',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Multi-platform: warehouses, databases, documents, files',
        competitor: 'Database and warehouse connections — limited to structured data',
        winner: 'wisdom',
      },
      {
        dimension: 'Market Position',
        wisdom: 'Founded 2023; AI-native architecture; enterprise-focused growth',
        competitor: 'Established player in embedded analytics niche; low brand awareness outside that segment',
        winner: 'neutral',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 3.0 },
      { label: 'Multi-source Support', score: 5.0 },
      { label: 'Proactive Monitoring', score: 1.5 },
      { label: 'Ease of Use', score: 4.0 },
      { label: 'Enterprise Maturity', score: 6.5 },
      { label: 'Customer Reviews', score: 6.0 },
    ],
    objections: [
      {
        question: 'Our product team embedded GoodData for customer-facing analytics.',
        response:
          "Different purpose entirely: GoodData serves your product's customers with embedded dashboards. WisdomAI serves your internal teams with AI-driven intelligence. There's no overlap — GoodData powers the analytics inside your product; WisdomAI powers the analytics your business runs on. If anything, WisdomAI can help your internal teams analyze the same data that GoodData surfaces externally, giving you deeper internal insights.",
      },
      {
        question: 'We don\'t need another analytics tool — GoodData handles our reporting.',
        response:
          "External vs. internal: GoodData handles analytics for your customers. But who handles analytics for your own teams? If your VP of Sales needs pipeline insights or your CFO wants revenue anomaly alerts, GoodData isn't the answer — it's not designed for that. WisdomAI fills the internal analytics gap with conversational AI that your business leaders can use directly.",
      },
      {
        question: 'GoodData has a semantic layer — isn\'t that similar to WisdomAI\'s Enterprise Context Layer?',
        response:
          "Similar concept, different purpose: GoodData's semantic layer organizes metrics for multi-tenant embedded analytics — mapping data to customer-facing dashboards. WisdomAI's Enterprise Context Layer governs AI query generation — ensuring every AI-generated insight is accurate, authorized, and grounded in source data. One is a data modeling tool; the other is an AI accuracy and governance framework.",
      },
    ],
    discoveryQuestions: [
      'How do your internal business teams currently get analytics — is GoodData used internally or only for customer-facing analytics?',
      'What tools do your internal stakeholders use when they need insights about your own business operations?',
      'How does your team detect internal business anomalies — revenue drops, churn spikes, pipeline changes?',
      'If your product team uses GoodData for customers, who provides self-serve analytics for your sales, marketing, and ops teams?',
      'How much time does your data team spend building internal reports vs. maintaining the GoodData-powered customer analytics?',
    ],
  },

  snowflake: {
    meta: {
      category: 'Data Cloud / Native AI Analytics',
      dealStage: 'All stages',
      icp: 'Enterprise Snowflake Customers',
      updated: 'Q1 2026',
      owner: 'Sales Enablement',
    },
    positioning: {
      wisdom: {
        title: 'WisdomAI — Platform-Agnostic AI Data Analyst',
        description:
          'WisdomAI works across your entire data stack — Snowflake, BigQuery, Databricks, databases, documents, and files. It provides proactive monitoring, hallucination-free conversational AI, and vertical intelligence models without requiring you to consolidate everything into a single platform.',
      },
      competitor: {
        title: 'Snowflake Intelligence — Native AI Analytics in the Data Cloud',
        description:
          'Snowflake Intelligence is the native AI analytics layer built into the Snowflake Data Cloud, powered by Cortex AI. It offers NLQ, auto-insights, and agentic analytics directly within the warehouse. Strongest when the entire data stack lives in Snowflake and the org values platform consolidation.',
      },
    },
    proofPoints: [
      { stat: 'Any', description: 'Data source supported — not locked into a single warehouse or platform' },
      { stat: '0', description: 'Hallucinations — AI generates queries only, never fabricates answers' },
      { stat: '24/7', description: 'Proactive monitoring that catches business anomalies before anyone checks a dashboard' },
    ],
    featureComparison: [
      {
        dimension: 'Architecture',
        wisdom: 'Platform-agnostic AI layer — works across any warehouse, database, or data source',
        competitor: 'Native to Snowflake only — requires Snowflake as the data platform',
        winner: 'wisdom',
      },
      {
        dimension: 'Data Sources',
        wisdom: 'Multi-platform: Snowflake, BigQuery, Databricks, Postgres, documents, files, APIs',
        competitor: 'Snowflake-only — data must be in Snowflake for Intelligence to access it',
        winner: 'wisdom',
      },
      {
        dimension: 'Proactive Monitoring',
        wisdom: '24/7 autonomous anomaly detection across all connected sources',
        competitor: 'Auto-insights within Snowflake — maturing but not fully autonomous proactive alerting',
        winner: 'wisdom',
      },
      {
        dimension: 'AI Accuracy',
        wisdom: 'Enterprise Context Layer ensures hallucination-free, verified query generation',
        competitor: 'Cortex AI growing rapidly — but lacks dedicated anti-hallucination architecture',
        winner: 'wisdom',
      },
      {
        dimension: 'Business User UX',
        wisdom: 'Conversational AI designed for non-technical business users',
        competitor: 'NLQ layer improving — but business user experience behind purpose-built analytics tools',
        winner: 'wisdom',
      },
      {
        dimension: 'Zero Data Movement',
        wisdom: 'Queries data in place — but also works with data outside any warehouse',
        competitor: 'True zero-ETL within Snowflake — analytics where the data already lives',
        winner: 'competitor',
      },
      {
        dimension: 'Platform Depth',
        wisdom: 'Focused on AI analytics — does not handle data warehousing, compute, or storage',
        competitor: 'Full data cloud — warehouse, compute, governance, marketplace, and AI in one platform',
        winner: 'competitor',
      },
      {
        dimension: 'Enterprise Governance',
        wisdom: 'Enterprise Context Layer with row/column-level policies; SOC2 certified',
        competitor: 'Industry-leading data governance — access controls, lineage, data sharing at massive scale',
        winner: 'competitor',
      },
      {
        dimension: 'Market Position',
        wisdom: 'Founded 2023; AI-native architecture; rapidly growing enterprise roster',
        competitor: 'Public company (NYSE: SNOW); $3.3B+ product revenue; dominant enterprise data cloud',
        winner: 'competitor',
      },
      {
        dimension: 'Industry Verticals',
        wisdom: 'Purpose-built vertical AI models for Finance, Healthcare, and Retail',
        competitor: 'Horizontal platform with Snowflake Marketplace solutions for verticals',
        winner: 'wisdom',
      },
      {
        dimension: 'Pricing',
        wisdom: 'Predictable enterprise pricing — annual contract',
        competitor: 'Consumption-based — Intelligence bundled but total Snowflake costs escalate with usage',
        winner: 'neutral',
      },
    ],
    wisdomRatings: [
      { label: 'AI Accuracy', score: 9.2 },
      { label: 'Multi-source Support', score: 9.5 },
      { label: 'Proactive Monitoring', score: 9.5 },
      { label: 'Ease of Use', score: 8.2 },
      { label: 'Enterprise Maturity', score: 6.8 },
      { label: 'Customer Reviews', score: 0 },
    ],
    competitorRatings: [
      { label: 'AI Accuracy', score: 6.5 },
      { label: 'Multi-source Support', score: 4.0 },
      { label: 'Proactive Monitoring', score: 4.5 },
      { label: 'Ease of Use', score: 5.5 },
      { label: 'Enterprise Maturity', score: 9.5 },
      { label: 'Customer Reviews', score: 8.5 },
    ],
    objections: [
      {
        question: 'We already have Snowflake — why add WisdomAI on top?',
        response:
          "Extend, don't replace: WisdomAI doesn't replace Snowflake — it makes your Snowflake investment more valuable. Intelligence answers questions about data inside Snowflake. WisdomAI answers questions across all your data — including what's outside Snowflake — and proactively alerts you to issues before anyone thinks to check. Think of it as hiring an AI analyst that watches your entire business 24/7, not just one warehouse.",
      },
      {
        question: 'Intelligence is included in our Snowflake contract — it\'s essentially free.',
        response:
          "Bundled vs. purpose-built: Intelligence is bundled because it drives Snowflake compute consumption — that's how they monetize it. WisdomAI is purpose-built for one thing: accurate, proactive AI analytics. Ask Snowflake what percentage of their R&D goes to Intelligence vs. the core data platform. The tool that's included for free gets funded like a feature. The tool you invest in gets funded like a product.",
      },
      {
        question: 'Our data team trusts Cortex AI for analytics.',
        response:
          "Cortex is impressive — and growing: But Cortex serves data engineers and analysts. Who serves your business stakeholders? If your VP of Sales needs a pipeline insight, are they logging into Snowflake? WisdomAI gives business users a conversational interface designed for them — plus proactive monitoring that alerts them before they think to check. It builds on the data your team manages in Snowflake.",
      },
      {
        question: 'We\'re standardizing on Snowflake for everything — consolidation is our strategy.',
        response:
          "Consolidation of data vs. consolidation of tools: Keeping your data in Snowflake is smart. But analytics tools should serve the user, not the warehouse. WisdomAI connects natively to Snowflake — zero data movement. The question is whether Intelligence alone serves every persona in your org. If your data engineers are happy but your business leaders still can't get answers without filing a ticket, consolidation has a gap.",
      },
      {
        question: 'Snowflake is a public company with massive R&D — they\'ll build everything WisdomAI does.',
        response:
          "Scale cuts both ways: Snowflake's ~7,000 employees build a data cloud — warehousing, compute, governance, marketplace, security, and Intelligence. WisdomAI's entire team builds AI analytics. When you need the most accurate, proactive AI analyst, you want the company whose survival depends on that one thing — not the one that also has to ship a new storage engine, a marketplace feature, and a compliance update this quarter.",
      },
    ],
    discoveryQuestions: [
      'What percentage of your analytics data lives outside Snowflake — in other warehouses, SaaS tools, or unstructured sources?',
      'How many business users in your org actually log into Snowflake or use Intelligence today?',
      'When a business leader needs a quick analysis, what\'s the current process — self-serve or data team request?',
      'How does your team currently detect anomalies in business metrics — is it proactive or discovered after the fact?',
      'If Snowflake Intelligence can only see data inside Snowflake, how much business context does it miss?',
      'What would it mean for your org if every department head could get verified, instant answers across all your data — not just what\'s in the warehouse?',
    ],
  },
};
