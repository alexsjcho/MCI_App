export type ProductId = "conversational-bi" | "ai-dashboards" | "proactive-agents";

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  keyCapabilities: string[];
  differentiators: string[];
  idealBuyer: string;
  typicalPainPoints: string[];
}

export const products: Record<ProductId, Product> = {
  "conversational-bi": {
    id: "conversational-bi",
    name: "Conversational BI",
    tagline: "AI Data Analyst Agents",
    description:
      "Natural language interface that lets any business user ask questions in plain language and get context-aware, accurate answers with charts and visuals — no DAX, no data modeling, no BI developers required.",
    keyCapabilities: [
      "Plain-language Q&A across all connected data sources",
      "Context-aware answers grounded by the Adaptive Context Engine",
      "Auto-generated charts, tables, and visual explanations",
      "Federated querying — no need to centralize data first",
      "Transparent SQL generation with full source traceability",
      "95%+ accuracy that improves with usage",
    ],
    differentiators: [
      "Adaptive Context Engine eliminates hallucinations and context drift",
      "Works across distributed data sources without ETL pipelines",
      "Enterprise-grade governance: RBAC, SOC 2 Type II, HIPAA, GDPR",
      "Self-service — business users get answers without a BI team backlog",
    ],
    idealBuyer:
      "Data & Analytics leaders, VP of BI, CDO, business line leaders frustrated with BI backlog",
    typicalPainPoints: [
      "BI team is a bottleneck — 2-4 week turnaround on ad-hoc requests",
      "Low adoption of existing BI tools among business users",
      "Data literacy gap limits self-service analytics",
      "Inaccurate answers from AI tools without enterprise context",
      "Multiple data silos require manual consolidation",
    ],
  },
  "ai-dashboards": {
    id: "ai-dashboards",
    name: "AI-powered Dashboards",
    tagline: "Automated Visualizations",
    description:
      "Generate beautiful, interactive dashboards and data visualizations instantly using natural language. Explore data with drill-downs, get automatic executive read-outs, and share periodic highlights and lowlights.",
    keyCapabilities: [
      "Natural language dashboard creation — describe what you want to see",
      "Auto-generated executive read-outs and summaries",
      "Interactive drill-downs with conversational follow-ups",
      "Periodic insight digests with highlights and lowlights",
      "Multi-source visualization without data consolidation",
      "Shareable dashboards with role-based access controls",
    ],
    differentiators: [
      "Dashboards created in minutes, not weeks of development",
      "Contextual understanding ensures correct metric calculations",
      "Proactive surfacing of anomalies and trends in dashboards",
      "No DAX, no complex calculations — the AI handles the logic",
    ],
    idealBuyer:
      "Business operations leaders, finance directors, CxOs wanting real-time visibility without waiting on BI teams",
    typicalPainPoints: [
      "Dashboard development takes weeks and requires specialized skills",
      "Existing dashboards are static and quickly become stale",
      "Executives can't self-serve — always waiting on reports",
      "Dashboard sprawl — hundreds of reports nobody uses",
      "Metrics defined differently across teams and dashboards",
    ],
  },
  "proactive-agents": {
    id: "proactive-agents",
    name: "Proactive Agents",
    tagline: "Autonomous Insight Delivery",
    description:
      "Build custom intelligent workflows that detect risks and opportunities early, take autonomous actions with guardrails, and route insights automatically to Slack, Teams, and email — moving from reactive reporting to agentic automation.",
    keyCapabilities: [
      "Custom agent workflows triggered by data events",
      "Autonomous multi-step reasoning with built-in guardrails",
      "Automatic insight routing to Slack, Teams, email, and webhooks",
      "Risk and anomaly detection with configurable thresholds",
      "PDF report generation and distribution on schedule",
      "Integration with CRM, ERP, and operational systems",
    ],
    differentiators: [
      "Context-aware agents grounded in enterprise semantics, not just pattern matching",
      "Guardrail framework ensures agents act within defined boundaries",
      "Federated architecture connects to systems in place — no data movement",
      "Agentic Analytics Maturity Level 5: full autonomous workflows",
    ],
    idealBuyer:
      "COO, VP Operations, Revenue Operations leaders, data teams wanting to automate recurring analysis and alerting",
    typicalPainPoints: [
      "Analysts spend 80% of time on recurring reports instead of strategic work",
      "Critical insights surface too late to act on them",
      "No automated way to monitor KPIs and alert on anomalies",
      "Data-driven decisions require manual assembly from multiple tools",
      "Alert fatigue — too many false positives from simple threshold rules",
    ],
  },
};

export const productList = Object.values(products);
