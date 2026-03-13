export type Tier = "Tier 1" | "Tier 2" | "Tier 3";

export type Readiness = "GA" | "Beta" | "Planned";

export type Competitor = { name: string; tier: Tier };

export type WisdomFeature = {
  score: number;
  readiness: Readiness;
  expectedDate: string;
  description: string;
};

export type CompetitorScore = { score: number; description: string };

export type Feature = {
  name: string;
  what: string;
  wisdom: WisdomFeature;
  competitors: Record<string, CompetitorScore>;
};

export type Category = {
  name: string;
  description: string;
  features: Feature[];
};

type DataShape = { competitors: Competitor[]; categories: Category[] };

export const DATA: DataShape = {
  competitors: [
    { name: "Microsoft Power BI", tier: "Tier 1" as Tier },
    { name: "Snowflake Intelligence", tier: "Tier 1" as Tier },
    { name: "Databricks Genie", tier: "Tier 1" as Tier },
    { name: "Sigma Computing", tier: "Tier 2" as Tier },
    { name: "Hex", tier: "Tier 2" as Tier },
    { name: "Tableau Einstein", tier: "Tier 2" as Tier },
    { name: "Omni", tier: "Tier 3" as Tier },
    { name: "ThoughtSpot", tier: "Tier 3" as Tier },
  ],
  categories: [
    {
      name: "Natural Language & Conversational AI",
      description: "NLQ, multi-turn conversation, and agentic capabilities",
      features: [
        {
          name: "Natural Language Query (NLQ)",
          what: "Ask data questions in plain English and get answers",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-09-01",
            description:
              "Core NLQ engine; LLMs write queries not answers — eliminates hallucination",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 4,
              description: "Copilot NLQ in reports and dashboards",
            },
            "Snowflake Intelligence": {
              score: 4,
              description: "Cortex Analyst NLQ via semantic model",
            },
            "Databricks Genie": {
              score: 4,
              description: "Genie spaces with Unity Catalog context",
            },
            "Sigma Computing": {
              score: 3,
              description: "AI formula suggestions; limited NLQ",
            },
            Hex: { score: 4, description: "Threads: conversational self-serve NLQ" },
            "Tableau Einstein": {
              score: 3,
              description: "Ask Data + Einstein Copilot",
            },
            Omni: { score: 4, description: "Agent Blobby: NLQ over semantic layer" },
            ThoughtSpot: {
              score: 5,
              description: "Search-first; Spotter 3 agentic NLQ",
            },
          },
        },
        {
          name: "Multi-Turn Conversation",
          what: "Follow-up questions with context retention across turns",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-09-01",
            description: "Persistent conversation with context carryover and refinement",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Copilot retains some session context",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Follow-ups within Cortex Analyst session",
            },
            "Databricks Genie": {
              score: 4,
              description: "Resumed conversations; persistent context",
            },
            "Sigma Computing": {
              score: 2,
              description: "Primarily single-turn AI assistance",
            },
            Hex: {
              score: 4,
              description: "Threads maintain semantic context",
            },
            "Tableau Einstein": {
              score: 2,
              description: "Basic follow-up; mostly single-turn",
            },
            Omni: { score: 3, description: "Blobby sessions for iterative exploration" },
            ThoughtSpot: {
              score: 5,
              description: "Spotter full context across multi-step",
            },
          },
        },
        {
          name: "Agentic Workflows",
          what: "Autonomous agents that monitor, reason, and execute actions",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2026-03-06",
            description:
              "Autonomous agentic workflows; agents execute playbooks on structured dataframes",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Copilot assists; limited autonomous exec",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Cortex AI agents emerging",
            },
            "Databricks Genie": {
              score: 4,
              description: "Genie Code: autonomous pipelines, dashboards",
            },
            "Sigma Computing": {
              score: 2,
              description: "AI assists creation; not autonomous",
            },
            Hex: { score: 4, description: "Notebook Agent automates analysis" },
            "Tableau Einstein": {
              score: 3,
              description: "Tableau Next agents for prep, NLQ",
            },
            Omni: {
              score: 3,
              description: "Blobby dashboard creation from prompts",
            },
            ThoughtSpot: {
              score: 4,
              description: "SpotterViz, SpotterModel, SpotterCode agents",
            },
          },
        },
        {
          name: "Proactive Insight Surfacing",
          what: "AI automatically surfaces anomalies, trends, and recommendations",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-11-01",
            description:
              "Agents monitor signals proactively; alert when interesting changes occur",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Data-driven alerts; scheduled refresh",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Cortex AI anomaly detection emerging",
            },
            "Databricks Genie": {
              score: 3,
              description: "Agent mode hypothesis generation",
            },
            "Sigma Computing": {
              score: 2,
              description: "Scheduled reports; threshold alerts",
            },
            Hex: { score: 3, description: "Scheduled runs with Slack alerts" },
            "Tableau Einstein": {
              score: 3,
              description: "Pulse metrics with anomaly alerts",
            },
            Omni: { score: 2, description: "Scheduled deliveries; no proactive AI" },
            ThoughtSpot: {
              score: 4,
              description: "SpotIQ auto-surfaces patterns; Monitor",
            },
          },
        },
      ],
    },
    {
      name: "Data Source & Integration",
      description: "Connectors, federation, and data source breadth",
      features: [
        {
          name: "Structured Data Support",
          what: "SQL databases, cloud data warehouses, and data lakes",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "Snowflake, BigQuery, Redshift, PostgreSQL, SQL Server, Athena, Druid",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 5,
              description: "400+ native connectors",
            },
            "Snowflake Intelligence": {
              score: 4,
              description: "Snowflake-native only",
            },
            "Databricks Genie": {
              score: 4,
              description: "Lakehouse-native; Unity Catalog",
            },
            "Sigma Computing": {
              score: 4,
              description: "Snowflake, BigQuery, Databricks, Redshift",
            },
            Hex: {
              score: 4,
              description: "Snowflake, BigQuery, Databricks, Redshift+",
            },
            "Tableau Einstein": {
              score: 5,
              description: "Hundreds of native connectors",
            },
            Omni: {
              score: 4,
              description: "Snowflake, BigQuery, Databricks, Redshift",
            },
            ThoughtSpot: {
              score: 5,
              description: "Live query to all major cloud DWHs",
            },
          },
        },
        {
          name: "Unstructured Data Support",
          what: "PDFs, documents, knowledge bases, images, semi-structured",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "PDFs, knowledge articles, semi-structured; handles dirty/messy data",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 2,
              description: "Primarily structured; limited via Fabric",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Cortex Search; Document AI for PDFs",
            },
            "Databricks Genie": {
              score: 3,
              description: "Delta Lake unstructured; evolving",
            },
            "Sigma Computing": {
              score: 1,
              description: "Structured cloud DWH data only",
            },
            Hex: {
              score: 2,
              description: "CSV/file imports; structured focus",
            },
            "Tableau Einstein": {
              score: 2,
              description: "Primarily structured data",
            },
            Omni: { score: 1, description: "Structured SQL data only" },
            ThoughtSpot: {
              score: 4,
              description: "Spotter 3: text and images alongside structured",
            },
          },
        },
        {
          name: "Zero-ETL / Federation",
          what: "Query across distributed sources without data movement",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2026-03-06",
            description:
              "MCP-native client; zero-ETL federation across SaaS, DWH, DBs in real-time",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "DirectQuery; Fabric shortcuts",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Iceberg tables; data must be in/near Snowflake",
            },
            "Databricks Genie": {
              score: 3,
              description: "Lakehouse Federation for external catalogs",
            },
            "Sigma Computing": {
              score: 2,
              description: "Direct to warehouse; no federation",
            },
            Hex: {
              score: 2,
              description: "Warehouse connections; no federation",
            },
            "Tableau Einstein": {
              score: 2,
              description: "Live connection or extract",
            },
            Omni: {
              score: 2,
              description: "Direct-query to connected warehouse",
            },
            ThoughtSpot: {
              score: 3,
              description: "Live query + SpotCache snapshots",
            },
          },
        },
        {
          name: "SaaS App Connectivity (MCP/API)",
          what: "Connect to live Salesforce, Google Analytics, Jira, etc.",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2026-03-06",
            description:
              "First analytics-native MCP client; Salesforce, GA, live SaaS",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 4,
              description: "Extensive SaaS connectors via Power Query",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Partner connectors; requires ingestion",
            },
            "Databricks Genie": {
              score: 3,
              description: "Partner integrations; lakehouse-focused",
            },
            "Sigma Computing": {
              score: 2,
              description: "Through cloud DWH; no direct SaaS",
            },
            Hex: {
              score: 3,
              description: "API integrations; MCP server available",
            },
            "Tableau Einstein": {
              score: 4,
              description: "Native Salesforce; Einstein connectors",
            },
            Omni: {
              score: 3,
              description: "Salesforce MCP recently added",
            },
            ThoughtSpot: {
              score: 3,
              description: "Through warehouse; Slack/Teams",
            },
          },
        },
      ],
    },
    {
      name: "Enterprise Context & Semantic Layer",
      description: "Business definitions, tribal knowledge, and adaptive learning",
      features: [
        {
          name: "Semantic / Business Context Layer",
          what: "Centralized business definitions, metrics, relationships",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "Enterprise Context Layer (ACE): codifies tribal knowledge, reconciles metrics",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 4,
              description: "Semantic models in Power BI datasets",
            },
            "Snowflake Intelligence": {
              score: 4,
              description: "Semantic models for Cortex Analyst",
            },
            "Databricks Genie": {
              score: 4,
              description: "Unity Catalog single source of truth",
            },
            "Sigma Computing": {
              score: 3,
              description: "Metrics and calculated fields; evolving",
            },
            Hex: {
              score: 4,
              description: "Semantic Authoring: measures, dimensions, joins",
            },
            "Tableau Einstein": {
              score: 3,
              description: "Tableau Catalog + Pulse metrics",
            },
            Omni: {
              score: 5,
              description: "Three-layer model: schema → governed → ad hoc",
            },
            ThoughtSpot: {
              score: 5,
              description: "SpotterModel: AI-guided semantic creation",
            },
          },
        },
        {
          name: "Adaptive Learning / Feedback Loop",
          what: "System improves from user corrections over time",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-09-01",
            description:
              "ACE continuously learns from corrections; improves accuracy over time",
          },
          competitors: {
            "Microsoft Power BI": { score: 2, description: "Manual Q&A training" },
            "Snowflake Intelligence": {
              score: 3,
              description: "Verified queries improve Cortex Analyst",
            },
            "Databricks Genie": {
              score: 4,
              description: "Benchmarks, Ask for Review, persistent memory",
            },
            "Sigma Computing": {
              score: 2,
              description: "Manual configuration",
            },
            Hex: {
              score: 3,
              description: "Context Studio with workspace rules",
            },
            "Tableau Einstein": {
              score: 2,
              description: "Limited BI feedback loop",
            },
            Omni: {
              score: 3,
              description: "Auto-modeling from AI sessions",
            },
            ThoughtSpot: {
              score: 3,
              description: "AI learns from user feedback",
            },
          },
        },
        {
          name: "Tribal Knowledge Codification",
          what: "Capture undocumented business rules and institutional knowledge",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-09-01",
            description:
              "ACE codifies undocumented business logic; auto-reconciles conflicting metrics",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 2,
              description: "Manual documentation in model",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Semantic model annotations",
            },
            "Databricks Genie": {
              score: 3,
              description: "Text instructions in Genie spaces",
            },
            "Sigma Computing": {
              score: 2,
              description: "Column descriptions and metrics docs",
            },
            Hex: {
              score: 3,
              description: "Endorsed tables, schema docs, rules",
            },
            "Tableau Einstein": {
              score: 2,
              description: "Data catalog descriptions",
            },
            Omni: {
              score: 3,
              description: "Shared model with dbt metadata sync",
            },
            ThoughtSpot: {
              score: 3,
              description: "Model-level business definitions",
            },
          },
        },
      ],
    },
    {
      name: "Accuracy & Trust",
      description: "Hallucination prevention, explainability, and data quality",
      features: [
        {
          name: "Hallucination Prevention",
          what: "Mechanisms to prevent AI from fabricating data or answers",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "LLMs only generate queries, not answers; hallucination creates bad SQL not fake data",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Copilot generates DAX/SQL; can err",
            },
            "Snowflake Intelligence": {
              score: 4,
              description: "Verified SQL against governed data",
            },
            "Databricks Genie": {
              score: 4,
              description: "SQL against Unity Catalog tables",
            },
            "Sigma Computing": {
              score: 3,
              description: "AI generates formulas; warehouse results",
            },
            Hex: {
              score: 3,
              description: "Code-based execution; semantic validation",
            },
            "Tableau Einstein": {
              score: 3,
              description: "SQL grounded in data; some risk",
            },
            Omni: {
              score: 4,
              description: "Semantic layer constrains AI; SQL exec",
            },
            ThoughtSpot: {
              score: 4,
              description: "SQL on governed semantic model",
            },
          },
        },
        {
          name: "Explainability / Audit Trail",
          what: "Show reasoning steps, SQL queries, and data lineage",
          wisdom: {
            score: 4,
            readiness: "GA",
            expectedDate: "2025-09-01",
            description: "Step-by-step explanation of how answers are produced",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "DAX/visuals shown; limited reasoning",
            },
            "Snowflake Intelligence": {
              score: 4,
              description: "Returns SQL query alongside answer",
            },
            "Databricks Genie": {
              score: 4,
              description: "Thinking steps; shows tables and SQL",
            },
            "Sigma Computing": {
              score: 3,
              description: "Formula visible; standard BI audit",
            },
            Hex: {
              score: 4,
              description: "Full notebook transparency; reasoning shared",
            },
            "Tableau Einstein": {
              score: 3,
              description: "Data source and filters shown",
            },
            Omni: { score: 4, description: "SQL visible; model lineage" },
            ThoughtSpot: {
              score: 4,
              description: "Transparent AI reasoning and sources",
            },
          },
        },
        {
          name: "Dirty / Messy Data Handling",
          what: "Work with imperfect, uncleaned, error-prone data",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "95% accuracy on cross-platform, multi-source environments with messy data",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Power Query transforms; manual cleaning",
            },
            "Snowflake Intelligence": {
              score: 2,
              description: "Expects clean, governed Snowflake data",
            },
            "Databricks Genie": {
              score: 3,
              description: "Delta Lake schema evolution; some tolerance",
            },
            "Sigma Computing": {
              score: 2,
              description: "Expects clean warehouse data",
            },
            Hex: {
              score: 3,
              description: "Python cleaning in notebooks; manual",
            },
            "Tableau Einstein": {
              score: 2,
              description: "Tableau Prep; expects structured input",
            },
            Omni: {
              score: 2,
              description: "Expects modeled, clean warehouse data",
            },
            ThoughtSpot: {
              score: 3,
              description: "SpotCache and data mashups; Analyst Studio",
            },
          },
        },
      ],
    },
    {
      name: "Automation & Self-Service",
      description: "Playbooks, automated workflows, and report generation",
      features: [
        {
          name: "Playbook / Workflow Automation",
          what: "Define and execute automated analytical workflows",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-11-01",
            description:
              "Playbooks automate analytical tasks; agents execute company playbooks",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Power Automate integration",
            },
            "Snowflake Intelligence": {
              score: 2,
              description: "Tasks/Streams; not analytics workflows",
            },
            "Databricks Genie": {
              score: 4,
              description: "Genie Code: pipelines, debugging, maintenance",
            },
            "Sigma Computing": {
              score: 2,
              description: "Scheduled queries; no autonomous workflows",
            },
            Hex: {
              score: 3,
              description: "Scheduled notebook runs; data apps",
            },
            "Tableau Einstein": {
              score: 2,
              description: "Prep flows for data; limited autonomous",
            },
            Omni: {
              score: 2,
              description: "Scheduled dashboards; no playbooks",
            },
            ThoughtSpot: {
              score: 3,
              description: "Liveboards with scheduled insights",
            },
          },
        },
        {
          name: "Data Stories / Narrative Generation",
          what: "Auto-generate data-driven narratives and reports",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-09-01",
            description:
              "Interactive Stories: data-driven narratives combining viz, text, insights",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Smart narratives; Copilot summaries",
            },
            "Snowflake Intelligence": {
              score: 2,
              description: "Limited narrative generation",
            },
            "Databricks Genie": {
              score: 3,
              description: "Research Agent generates reports",
            },
            "Sigma Computing": {
              score: 2,
              description: "Report builder; no AI narratives",
            },
            Hex: {
              score: 3,
              description: "Notebook narratives with code and text",
            },
            "Tableau Einstein": {
              score: 3,
              description: "Data Stories feature",
            },
            Omni: {
              score: 2,
              description: "Dashboards only; no narratives",
            },
            ThoughtSpot: {
              score: 3,
              description: "SpotIQ insight summaries",
            },
          },
        },
        {
          name: "API / Embed for External Apps",
          what: "API and SDKs for embedding analytics into products",
          wisdom: {
            score: 3,
            readiness: "Beta",
            expectedDate: "2026-06-01",
            description:
              "API for embedding analytics into custom apps; growing",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 5,
              description: "Power BI Embedded; mature SDK",
            },
            "Snowflake Intelligence": {
              score: 2,
              description: "Streamlit apps; native embed limited",
            },
            "Databricks Genie": {
              score: 4,
              description: "Embedded dashboards; Genie APIs",
            },
            "Sigma Computing": {
              score: 5,
              description: "Leading embedded analytics platform",
            },
            Hex: {
              score: 4,
              description: "Embedded analytics; full SDK",
            },
            "Tableau Einstein": {
              score: 5,
              description: "Tableau Embedded Analytics; extensive",
            },
            Omni: {
              score: 4,
              description: "Tenant-level model extensions",
            },
            ThoughtSpot: {
              score: 5,
              description: "ThoughtSpot Embedded; iFrame + SDK",
            },
          },
        },
      ],
    },
    {
      name: "Visualization & Dashboards",
      description: "Charts, dashboards, drill-downs, and visual exploration",
      features: [
        {
          name: "Interactive Dashboards",
          what: "Rich charts, drill-downs, cross-filtering, visual exploration",
          wisdom: {
            score: 3,
            readiness: "GA",
            expectedDate: "2025-09-01",
            description:
              "Stories with visualizations; conversational focus over dashboards",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 5,
              description: "Industry-leading dashboards and viz library",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Streamlit apps; limited native dashboards",
            },
            "Databricks Genie": {
              score: 4,
              description: "AI/BI Dashboards GA; faceting, pivots",
            },
            "Sigma Computing": {
              score: 5,
              description: "Spreadsheet + full visual BI",
            },
            Hex: {
              score: 4,
              description: "Explore cells + notebook viz; data apps",
            },
            "Tableau Einstein": {
              score: 5,
              description: "Best-in-class data visualization",
            },
            Omni: {
              score: 4,
              description: "20+ viz types; Excel-like exploration",
            },
            ThoughtSpot: {
              score: 4,
              description: "Liveboards with drill-anywhere; SpotIQ",
            },
          },
        },
        {
          name: "Code-Based Analysis (SQL/Python/R)",
          what: "Support for technical users doing deep analysis",
          wisdom: {
            score: 2,
            readiness: "Planned",
            expectedDate: "2026-09-01",
            description: "Primarily NLQ-driven; not a code-first platform",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "DAX, M, R/Python visuals",
            },
            "Snowflake Intelligence": {
              score: 4,
              description: "Full SQL + Snowpark",
            },
            "Databricks Genie": {
              score: 5,
              description: "Full notebook: SQL, Python, R, Scala",
            },
            "Sigma Computing": {
              score: 3,
              description: "SQL and spreadsheet formulas",
            },
            Hex: {
              score: 5,
              description: "SQL, Python, R collaborative notebooks",
            },
            "Tableau Einstein": {
              score: 3,
              description: "LOD expressions, table calcs",
            },
            Omni: {
              score: 4,
              description: "SQL-first with Excel formulas; custom measures",
            },
            ThoughtSpot: {
              score: 3,
              description: "TQL formulas; SQL for modeling",
            },
          },
        },
        {
          name: "AI-Generated Visualizations",
          what: "AI automatically selects and creates appropriate charts",
          wisdom: {
            score: 4,
            readiness: "GA",
            expectedDate: "2025-11-01",
            description:
              "AI selects appropriate viz types within Stories; auto-charting",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 4,
              description: "Copilot suggests visualizations",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Cortex Analyst returns basic viz",
            },
            "Databricks Genie": {
              score: 4,
              description: "AI/BI auto-selects chart types",
            },
            "Sigma Computing": {
              score: 3,
              description: "AI suggests chart types",
            },
            Hex: {
              score: 4,
              description: "AI generates Explore cell visualizations",
            },
            "Tableau Einstein": {
              score: 4,
              description: "Show Me auto-chart selection",
            },
            Omni: {
              score: 4,
              description: "Blobby creates dashboards from prompts",
            },
            ThoughtSpot: {
              score: 4,
              description: "SpotterViz: NL to dashboards",
            },
          },
        },
      ],
    },
    {
      name: "Governance & Security",
      description: "Access control, compliance, and enterprise readiness",
      features: [
        {
          name: "Role-Based Access Control (RBAC)",
          what: "Granular user permissions, row/column-level security",
          wisdom: {
            score: 4,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description: "Row/column-level security; Admin/Explorer roles",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 5,
              description: "RLS, OLS, workspace roles; Azure AD",
            },
            "Snowflake Intelligence": {
              score: 5,
              description: "RBAC, row-level security, dynamic masking",
            },
            "Databricks Genie": {
              score: 5,
              description: "Unity Catalog ACLs; fine-grained",
            },
            "Sigma Computing": {
              score: 4,
              description: "Team permissions; user attributes RLS",
            },
            Hex: { score: 3, description: "Workspace roles; enterprise SSO" },
            "Tableau Einstein": {
              score: 5,
              description: "Content perms, RLS, site roles",
            },
            Omni: {
              score: 3,
              description: "Permission model; git version control",
            },
            ThoughtSpot: {
              score: 4,
              description: "Data access controls; RLS; groups",
            },
          },
        },
        {
          name: "Enterprise SSO / Compliance",
          what: "SAML, SCIM, SOC 2, HIPAA, FedRAMP certifications",
          wisdom: {
            score: 4,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "Enterprise-grade security; built by Rubrik security alumni",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 5,
              description:
                "Azure AD, SAML, SCIM; SOC 2, HIPAA, FedRAMP",
            },
            "Snowflake Intelligence": {
              score: 5,
              description: "SOC 2 Type II, HIPAA, FedRAMP",
            },
            "Databricks Genie": {
              score: 5,
              description: "SOC 2, HIPAA, FedRAMP; CMK",
            },
            "Sigma Computing": {
              score: 4,
              description: "SOC 2 Type II; SAML SSO",
            },
            Hex: {
              score: 4,
              description: "SOC 2; SAML SSO; HIPAA Enterprise",
            },
            "Tableau Einstein": {
              score: 5,
              description: "Salesforce Trust; SOC 2, HIPAA, FedRAMP",
            },
            Omni: {
              score: 3,
              description: "SSO; SOC 2; building compliance",
            },
            ThoughtSpot: {
              score: 4,
              description: "SOC 2 Type II; SAML; Trust Center",
            },
          },
        },
      ],
    },
    {
      name: "Deployment & Ecosystem",
      description: "Time to value, platform independence, and market maturity",
      features: [
        {
          name: "Time to Value",
          what: "Speed of deployment and time to first actionable insights",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "5-min agent setup; rapid deployment; customers double usage in 2 months",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Quick start but complex enterprise deploy",
            },
            "Snowflake Intelligence": {
              score: 3,
              description: "Requires Snowflake; semantic model setup",
            },
            "Databricks Genie": {
              score: 3,
              description: "Genie space curation; Databricks prereq",
            },
            "Sigma Computing": {
              score: 4,
              description: "Cloud-native; quick warehouse connection",
            },
            Hex: {
              score: 4,
              description: "Fast onboarding; intuitive notebooks",
            },
            "Tableau Einstein": {
              score: 3,
              description: "Powerful but steep learning curve",
            },
            Omni: {
              score: 4,
              description: "Quick implementation; Looker familiarity",
            },
            ThoughtSpot: {
              score: 4,
              description: "Search-first simplicity; weeks to prod",
            },
          },
        },
        {
          name: "Platform Independence",
          what: "Low lock-in risk; works across cloud providers and DWHs",
          wisdom: {
            score: 5,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "Multi-cloud; Snowflake, BigQuery, Redshift, Databricks",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 3,
              description: "Best with Microsoft stack; Azure-optimized",
            },
            "Snowflake Intelligence": {
              score: 2,
              description: "Snowflake-only; full lock-in",
            },
            "Databricks Genie": {
              score: 2,
              description: "Databricks-only; Lakehouse required",
            },
            "Sigma Computing": {
              score: 4,
              description: "Multi-cloud DWH; cloud-agnostic",
            },
            Hex: {
              score: 4,
              description: "Multi-warehouse; cloud-agnostic",
            },
            "Tableau Einstein": {
              score: 4,
              description: "Multi-source; Salesforce-optimized",
            },
            Omni: {
              score: 4,
              description: "Multi-warehouse; dbt-integrated",
            },
            ThoughtSpot: {
              score: 4,
              description: "Cloud-agnostic; deep Snowflake/DB integ",
            },
          },
        },
        {
          name: "Enterprise Customer Base / Maturity",
          what: "Proven at enterprise scale with Fortune 500 customers",
          wisdom: {
            score: 3,
            readiness: "GA",
            expectedDate: "2025-06-01",
            description:
              "~40 enterprise customers; Cisco, ConocoPhillips, Patreon; Series A",
          },
          competitors: {
            "Microsoft Power BI": {
              score: 5,
              description: "Millions of users; Fortune 500 standard",
            },
            "Snowflake Intelligence": {
              score: 5,
              description: "$1.3B quarterly revenue; 10K+ customers",
            },
            "Databricks Genie": {
              score: 5,
              description: "$5.4B ARR; 20K+ orgs; 60% Fortune 500",
            },
            "Sigma Computing": {
              score: 3,
              description: "Growing enterprise; $300M+ raised",
            },
            Hex: {
              score: 3,
              description: "Reddit, Figma, Anthropic; $172M raised",
            },
            "Tableau Einstein": {
              score: 5,
              description: "Massive installed base; Gartner Leader",
            },
            Omni: {
              score: 2,
              description: "200+ customers; $69M Series B; early",
            },
            ThoughtSpot: {
              score: 4,
              description: "40% Fortune 25; $800M+; Gartner Leader",
            },
          },
        },
      ],
    },
  ],
};

export const COMP_NAMES = DATA.competitors.map((c) => c.name);
export const COMP_TIERS: Record<string, Tier> = {};
DATA.competitors.forEach((c) => {
  COMP_TIERS[c.name] = c.tier;
});

export const QUARTER_ENDS: Record<string, Date> = {
  Q1: new Date("2026-03-31"),
  Q2: new Date("2026-06-30"),
  Q3: new Date("2026-09-30"),
  Q4: new Date("2026-12-31"),
};

export const QUARTER_PREV_ENDS: Record<string, Date | null> = {
  Q1: null,
  Q2: new Date("2026-03-31"),
  Q3: new Date("2026-06-30"),
  Q4: new Date("2026-09-30"),
};

