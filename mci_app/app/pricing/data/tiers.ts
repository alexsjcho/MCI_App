import type { TierData } from "../types";

/**
 * Tier breakdown per competitor.
 *
 * The reference module uses rich tier feature lists; for our purposes this
 * structure is what the UI renders and filters against.
 */
export const TIER_DATA: Record<string, TierData> = {
  wisdom: {
    tiers: [
      {
        n: "Starter",
        p: "Free",
        d: "Up to 5 users",
        f: [
          "Natural language queries (limited)",
          "Basic dashboards",
          "Cloud data connections",
          "Community support",
        ],
      },
      {
        n: "Professional",
        p: "$20",
        d: "/user/mo",
        f: [
          "Unlimited NL queries",
          "AI-generated insights",
          "All cloud warehouse connectors",
          "Custom metrics & KPIs",
          "Scheduled reports",
          "Email support",
        ],
      },
      {
        n: "Enterprise",
        p: "Custom",
        d: "volume pricing",
        f: [
          "All Professional features",
          "SSO / SCIM provisioning",
          "Role-based access controls",
          "Audit logging",
          "SLA & dedicated CSM",
          "On-prem / private cloud option",
        ],
      },
    ],
  },

  snowflake: {
    tiers: [
      {
        n: "Standard",
        p: "$2",
        d: "/credit",
        f: [
          "Core SQL analytics",
          "1-day Time Travel",
          "Basic data sharing",
          "Standard warehouses",
        ],
      },
      {
        n: "Enterprise",
        p: "$3",
        d: "/credit",
        f: [
          "Multi-cluster warehouses",
          "90-day Time Travel",
          "Materialized views",
          "Cortex AI (token-billed)",
          "Intelligence agents (add-on)",
        ],
      },
      {
        n: "Business Critical",
        p: "$4",
        d: "/credit",
        f: [
          "All Enterprise features",
          "Enhanced security",
          "Customer-managed encryption",
          "HIPAA compliance",
          "HA failover",
        ],
      },
    ],
  },

  databricks: {
    tiers: [
      {
        n: "Standard",
        p: "DBU",
        d: "+ cloud infra",
        f: ["Apache Spark", "Delta Lake", "Basic notebooks", "Genie AI (included)", "Job clusters"],
      },
      {
        n: "Premium",
        p: "DBU",
        d: "+ ~50% uplift",
        f: ["Unity Catalog", "SQL Analytics warehouse", "AI/BI Dashboards", "Genie Spaces (NLP)", "Enhanced governance"],
      },
      {
        n: "Enterprise",
        p: "Custom",
        d: "volume discount",
        f: ["All Premium features", "System tables", "HIPAA / compliance", "Advanced support SLA", "Custom deployment options"],
      },
    ],
  },

  powerbi: {
    tiers: [
      {
        n: "Pro",
        p: "$14",
        d: "/user/mo",
        f: ["Report creation & sharing", "8 refreshes/day", "10 GB dataset limit", "Standard connectors", "Collaborate with Pro users"],
      },
      {
        n: "Premium Per User",
        p: "$24",
        d: "/user/mo",
        f: ["All Pro features", "Large model support", "48 refreshes/day", "Paginated reports", "AI visuals", "Dataflows Gen 2"],
      },
      {
        n: "Premium Capacity",
        p: "$4,995",
        d: "/mo (P1)",
        f: ["Dedicated capacity", "Free viewer licenses at P1+", "Advanced governance", "XMLA endpoints", "On-prem data gateway", "Fabric integration"],
      },
    ],
  },

  sigma: {
    tiers: [
      {
        n: "Starter",
        p: "Free",
        d: "limited features",
        f: ["Basic workbooks", "Up to 3 connections", "Community support", "Standard visualizations"],
      },
      {
        n: "Plus / Pro",
        p: "Custom",
        d: "~$200–400/mo est.",
        f: ["Full SQL + spreadsheet UI", "Cloud warehouse direct query", "Data write-back", "Embedding capabilities", "AI-powered explanations"],
      },
      {
        n: "Enterprise",
        p: "Custom",
        d: "negotiated",
        f: ["All Pro features", "SSO & SCIM", "Advanced governance", "Dedicated support", "White-label embedding", "Custom SLAs"],
      },
    ],
  },

  omni: {
    tiers: [
      {
        n: "Starter",
        p: "N/A",
        d: "sales-required",
        f: ["Core BI platform", "Warehouse native queries", "Basic dashboards", "Git-backed version control"],
      },
      {
        n: "Professional",
        p: "~$1K–$2K",
        d: "/mo est.",
        f: ["Full semantic layer", "Explore mode for business users", "Embedded analytics", "AI-assisted authoring", "Looker model import"],
      },
      {
        n: "Enterprise",
        p: "Custom",
        d: "negotiated",
        f: ["All Professional features", "SSO / audit logs", "Multi-tenancy", "Priority support", "Advanced permissions"],
      },
    ],
  },

  hex: {
    tiers: [
      {
        n: "Community",
        p: "Free",
        d: "up to 5 projects",
        f: ["SQL + Python notebooks", "Basic AI assistance", "Up to 5 projects", "Public app sharing", "Standard integrations"],
      },
      {
        n: "Professional",
        p: "$36",
        d: "/editor/mo",
        f: ["Unlimited projects", "Scheduled runs & alerts", "Logic (branching apps)", "Slack & webhook alerts", "Hex AI (agentic notebooks)"],
      },
      {
        n: "Team / Enterprise",
        p: "$75+",
        d: "/editor/mo (Team)",
        f: ["All Professional features", "Version history & diff", "Unlimited viewers", "SSO / SCIM", "HIPAA compliance (Enterprise)", "Private cloud deployment"],
      },
    ],
  },

  thoughtspot: {
    tiers: [
      {
        n: "Essentials",
        p: "$25",
        d: "/user/mo",
        f: ["NL search (Spotter AI)", "Liveboards (dashboards)", "25M row data limit", "5 permission groups", "Community support"],
      },
      {
        n: "Pro",
        p: "$50",
        d: "/user or $0.10/query",
        f: ["Spotter AI Agent", "Up to 250M rows", "25–1000 users", "Cloud connectors", "Improved governance", "In-app chat support"],
      },
      {
        n: "Enterprise",
        p: "Custom",
        d: "~$140K avg ACV",
        f: ["Unlimited users & data", "Full AI capabilities", "Analyst Studio (SQL/R/Py)", "Embedded analytics API", "Salesforce / Slack integrations", "Custom SLA"],
      },
    ],
  },

  gooddata: {
    tiers: [
      {
        n: "Trial",
        p: "Free",
        d: "30 days",
        f: ["Full platform trial", "Up to 10 users", "Standard data connectors", "Embedded analytics preview"],
      },
      {
        n: "Professional",
        p: "Custom",
        d: "workspace-based",
        f: ["Unlimited users per workspace", "Multi-tenancy", "AI Assistant (limited)", "Full embedding API", "White-label branding", "Community support"],
      },
      {
        n: "Enterprise",
        p: "Custom",
        d: "volume + SLA",
        f: ["All Professional features", "Agent Builder (AI)", "Analytics catalog", "99.5% SLA", "24/7 support", "On-prem or private cloud", "Data residency options"],
      },
    ],
  },
};

