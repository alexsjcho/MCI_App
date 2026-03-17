import type { ProductId } from "./products";
import type { IndustryId } from "./industries";
import type { FrameworkCriterion, QualifiedOpportunityExample } from "./types";

// ─── SPIN Criteria Definitions (constant across all) ───

const spinBase: Pick<FrameworkCriterion, "id" | "name" | "abbreviation" | "definition">[] = [
  {
    id: "situation",
    name: "Situation",
    abbreviation: "S",
    definition:
      "Understand the prospect's current environment, tools, processes, and organizational context. This establishes the baseline before exploring problems.",
  },
  {
    id: "problem",
    name: "Problem",
    abbreviation: "P",
    definition:
      "Identify explicit difficulties, dissatisfactions, or challenges the prospect faces with their current situation. These are the gaps that your solution can address.",
  },
  {
    id: "implication",
    name: "Implication",
    abbreviation: "I",
    definition:
      "Explore the consequences and downstream effects of the identified problems. Implications build urgency by quantifying the cost of inaction.",
  },
  {
    id: "need-payoff",
    name: "Need-Payoff",
    abbreviation: "N",
    definition:
      "Guide the prospect to articulate the value of solving the problem. Need-payoff questions help the buyer sell the solution internally by stating benefits in their own words.",
  },
];

// ─── Product + Industry specific SPIN content ───

type SpinContent = {
  howToQualify: string;
  discoveryQuestions: string[];
  redFlags: string[];
};

type SpinMap = Record<ProductId, Record<IndustryId, Record<string, SpinContent>>>;

const spinContent: SpinMap = {
  "conversational-bi": {
    "financial-services": {
      situation: {
        howToQualify:
          "Map their current BI stack (Power BI, Tableau, Looker), data warehouse (Snowflake, Databricks), and how portfolio managers and risk analysts access data today. Understand who builds reports and the typical turnaround time.",
        discoveryQuestions: [
          "How do your portfolio managers currently access performance and risk data?",
          "What BI tools are deployed across your front, middle, and back office?",
          "How many ad-hoc data requests does your analytics team receive per week?",
          "Who is responsible for maintaining metric definitions across compliance and trading desks?",
        ],
        redFlags: [
          "They just signed a 3-year enterprise agreement with a competing BI vendor",
          "No centralized data team — analytics is fully decentralized with no coordination",
          "IT has a strict 'no new vendor' policy with no executive sponsorship for exceptions",
        ],
      },
      problem: {
        howToQualify:
          "Probe for friction in getting timely, accurate answers. Financial services organizations often struggle with data silos between trading, risk, and compliance systems. Look for pain around regulatory reporting bottlenecks.",
        discoveryQuestions: [
          "How long does it take a risk analyst to get an ad-hoc report on portfolio exposure?",
          "Have you experienced situations where different teams reported different numbers for the same metric?",
          "What happens when regulators ask for data your current tools can't easily produce?",
          "How much time do your analysts spend on data preparation vs. actual analysis?",
        ],
        redFlags: [
          "They claim to have no data quality or timeliness issues (lack of problem awareness)",
          "The real problem is data infrastructure, not analytics — they need a data platform first",
          "They are primarily looking for a visualization tool, not an AI analyst",
        ],
      },
      implication: {
        howToQualify:
          "Quantify the cost of slow reporting cycles, compliance risks from inconsistent metrics, and analyst time wasted on manual data assembly. In financial services, late or inaccurate data can mean regulatory fines or missed trading opportunities.",
        discoveryQuestions: [
          "What's the cost to your firm when a regulatory report is late or contains errors?",
          "How many hours per week do your senior analysts spend assembling data instead of analyzing it?",
          "If a portfolio manager can't get real-time exposure data, what's the risk to your P&L?",
          "Have you ever missed a market opportunity because the data wasn't available fast enough?",
        ],
        redFlags: [
          "They can't articulate business impact — analytics is seen as a 'nice to have'",
          "No regulatory pressure or compliance mandate driving urgency",
          "The CFO/CRO is not involved in or aware of analytics modernization efforts",
        ],
      },
      "need-payoff": {
        howToQualify:
          "Guide them to articulate how self-service, accurate analytics would transform their operations. They should describe the value in terms of faster decisions, reduced compliance risk, and analyst productivity gains.",
        discoveryQuestions: [
          "If your risk team could query any data source in natural language and get trusted answers in seconds, how would that change your daily operations?",
          "What would it mean for compliance if every metric had a single, governed definition across all reports?",
          "If you could redeploy 30% of analyst time from report-building to strategic analysis, what initiatives would you prioritize?",
          "How valuable would it be to have a single source of truth that both front-office and compliance teams trust?",
        ],
        redFlags: [
          "They can't envision the end state — no internal champion who 'gets it'",
          "The value proposition doesn't connect to any active strategic initiative or OKR",
          "They want to 'see it work first' with no commitment to a pilot timeline or success criteria",
        ],
      },
    },
    healthcare: {
      situation: {
        howToQualify:
          "Understand their EHR vendor (Epic, Cerner), data warehouse strategy, and how clinical and operational leaders currently access analytics. Map the BI team structure and reporting workflows.",
        discoveryQuestions: [
          "What EHR and analytics platforms are currently in use across your health system?",
          "How do department heads access operational and clinical performance data today?",
          "What's the process when a VP needs an ad-hoc report on patient outcomes or throughput?",
          "How are metric definitions managed across clinical quality, finance, and operations?",
        ],
        redFlags: [
          "They're mid-EHR migration with no bandwidth for new analytics initiatives",
          "HIPAA concerns are used as a blanket excuse to block all new technology evaluations",
          "No data governance program exists — foundational data infrastructure work is needed first",
        ],
      },
      problem: {
        howToQualify:
          "Healthcare organizations typically struggle with fragmented data across EHR, claims, and operational systems. Look for pain around clinical quality reporting bottlenecks, inability to answer operational questions quickly, and data team overload.",
        discoveryQuestions: [
          "How long does it take to produce a clinical quality report for CMS or Joint Commission?",
          "Are department leaders able to self-serve on operational data, or do they rely on the analytics team?",
          "Have you experienced metric discrepancies between clinical and financial reporting?",
          "What's the backlog of analytics requests from your clinical and operational leaders?",
        ],
        redFlags: [
          "Analytics is not a priority — clinical operations are in crisis mode",
          "They're looking for EHR-embedded analytics only (Epic Caboodle/Cogito lock-in)",
          "No budget allocated for analytics modernization",
        ],
      },
      implication: {
        howToQualify:
          "Quantify the impact of slow reporting on clinical decisions, CMS penalties for late quality measures, and the opportunity cost of analyst time spent on manual report generation.",
        discoveryQuestions: [
          "What's the financial impact when quality measures aren't reported accurately or on time?",
          "How does delayed operational data affect patient throughput and bed management decisions?",
          "What's the cost of having 10+ analysts spending 60% of their time on recurring reports?",
          "How does the inability to quickly analyze readmission patterns affect your value-based care contracts?",
        ],
        redFlags: [
          "No connection between analytics gaps and financial or clinical quality outcomes",
          "Leadership views analytics as a cost center, not a strategic capability",
          "No upcoming regulatory deadlines or value-based care transitions creating urgency",
        ],
      },
      "need-payoff": {
        howToQualify:
          "Have them describe how real-time, self-service analytics would improve clinical quality reporting, operational efficiency, and decision-making speed for department leaders.",
        discoveryQuestions: [
          "If your CMO could ask questions about readmission trends in natural language and get HIPAA-compliant answers instantly, how would that change quality improvement efforts?",
          "What would it mean for your organization if quality reporting that takes weeks could be done in minutes?",
          "How would freeing up your analytics team from recurring reports enable strategic initiatives?",
          "If every department had trusted, consistent data without filing a ticket, how would that impact care delivery?",
        ],
        redFlags: [
          "No clinical or operational champion willing to sponsor a pilot",
          "The value case doesn't connect to any active quality improvement or operational excellence initiative",
          "They want to solve the problem by hiring more analysts rather than enabling self-service",
        ],
      },
    },
    retail: {
      situation: {
        howToQualify:
          "Map their e-commerce platform, POS systems, CDP/CRM, and marketing analytics stack. Understand how merchandising, marketing, and operations teams access performance data.",
        discoveryQuestions: [
          "What analytics tools does your merchandising team use to track category performance?",
          "How do you currently combine online and in-store data to get a unified customer view?",
          "What's the typical turnaround when your CMO asks for a campaign performance deep-dive?",
          "How many data sources does your analytics team need to connect to answer a typical business question?",
        ],
        redFlags: [
          "Very small operation with simple data needs — a spreadsheet might suffice",
          "They just completed a major CDP/data platform investment and see no gaps",
          "No analytics team or data infrastructure exists — they need foundational data work first",
        ],
      },
      problem: {
        howToQualify:
          "Retail organizations face challenges unifying online/offline data, getting real-time inventory visibility, and enabling merchandising teams to self-serve. Probe for data silos between e-commerce, stores, and marketing.",
        discoveryQuestions: [
          "Can your category managers easily see how a promotion is performing across both online and in-store channels?",
          "How do you identify underperforming SKUs or categories before they impact margins?",
          "What's your biggest challenge in getting a unified view of customer behavior across channels?",
          "How often do inventory decisions get made with stale or incomplete data?",
        ],
        redFlags: [
          "They're a pure digital-native with a clean, unified data stack already",
          "The problem is data collection/capture, not analytics",
          "No budget pressure — they're not optimizing for margin or efficiency",
        ],
      },
      implication: {
        howToQualify:
          "Quantify the cost of poor inventory decisions, missed merchandising opportunities, and marketing waste from inability to quickly analyze campaign performance.",
        discoveryQuestions: [
          "What's the revenue impact of a category manager not seeing a stockout trend for 48 hours?",
          "How much marketing spend is wasted because you can't quickly analyze cross-channel attribution?",
          "What's the markdown cost when you can't identify slow-moving inventory early enough?",
          "How does delayed competitive pricing intelligence affect your market position?",
        ],
        redFlags: [
          "They can't tie analytics gaps to revenue or margin impact",
          "No executive urgency around omnichannel visibility",
          "Merchandising decisions are based on 'gut feel' and they're comfortable with that",
        ],
      },
      "need-payoff": {
        howToQualify:
          "Guide them to articulate how real-time, self-service analytics would improve merchandising decisions, marketing ROI, and inventory management.",
        discoveryQuestions: [
          "If your category managers could ask 'How is the spring collection performing vs. last year across all channels?' and get an answer in seconds, how would that change weekly planning?",
          "What would it mean if your marketing team could self-serve on campaign ROI without waiting for the data team?",
          "How would real-time inventory analytics across all channels reduce markdowns and stockouts?",
          "If you could free your analysts from recurring reports, what strategic projects would they tackle?",
        ],
        redFlags: [
          "No clear link between faster analytics and revenue or margin improvement",
          "They want a dashboarding tool, not conversational self-service",
          "No merchandising or marketing leader willing to pilot",
        ],
      },
    },
    manufacturing: {
      situation: {
        howToQualify:
          "Map their ERP (SAP, Oracle), MES, IoT/sensor data infrastructure, and how plant managers and supply chain leaders access operational data today.",
        discoveryQuestions: [
          "What systems does your operations team rely on for production performance data?",
          "How do plant managers currently track OEE and downtime causes?",
          "What's the process when supply chain needs to analyze vendor performance or delivery trends?",
          "How many different systems does an analyst need to query to answer a typical operations question?",
        ],
        redFlags: [
          "They have no ERP or central data system — purely manual/spreadsheet operations",
          "In the middle of a major ERP migration with a 2-year freeze on new tools",
          "OT and IT teams are siloed with no collaboration or shared data strategy",
        ],
      },
      problem: {
        howToQualify:
          "Manufacturing organizations struggle with data locked in ERP, MES, and IoT systems. Probe for pain around slow production reporting, inability to correlate quality data with process parameters, and supply chain visibility gaps.",
        discoveryQuestions: [
          "How quickly can you identify the root cause when a quality issue appears on the production line?",
          "Can your plant managers answer ad-hoc questions about yield or throughput without filing a report request?",
          "What's your biggest challenge in getting end-to-end supply chain visibility?",
          "How do you currently correlate sensor data with quality outcomes?",
        ],
        redFlags: [
          "They're looking for an IoT platform, not analytics",
          "No quality or operational improvement mandate from leadership",
          "Data is so fragmented that basic integration work must come first",
        ],
      },
      implication: {
        howToQualify:
          "Quantify the cost of unplanned downtime, scrap/rework from late quality detection, and supply chain disruptions from lack of predictive visibility.",
        discoveryQuestions: [
          "What does an hour of unplanned downtime cost your highest-volume production line?",
          "How much scrap or rework could be avoided if quality issues were detected in real-time?",
          "What's the cost of a supply chain disruption when you lack early warning signals?",
          "How many engineering hours are spent on manual data analysis for root cause investigations?",
        ],
        redFlags: [
          "They can't quantify the cost of operational inefficiencies",
          "No urgency — operations are 'good enough'",
          "Leadership is focused on capex projects, not analytics investments",
        ],
      },
      "need-payoff": {
        howToQualify:
          "Have them describe how natural-language access to production, quality, and supply chain data would accelerate decision-making and reduce operational losses.",
        discoveryQuestions: [
          "If a plant manager could ask 'What caused the OEE drop on Line 3 this week?' and get an instant, data-backed answer, how would that change your operations?",
          "What would it mean for quality if engineers could query defect data across shifts and lines in seconds?",
          "How would faster supply chain analytics help you respond to disruptions or demand changes?",
          "If your analysts could focus on optimization instead of report generation, what projects would you prioritize?",
        ],
        redFlags: [
          "No operations or quality leader willing to champion the initiative",
          "They see analytics as an IT project, not an operational improvement",
          "The expected value doesn't justify the investment for their scale",
        ],
      },
    },
    government: {
      situation: {
        howToQualify:
          "Understand their legacy systems, data warehouse strategy, and how agency leaders and program managers currently access performance data. Map the procurement and compliance landscape.",
        discoveryQuestions: [
          "What systems do program managers rely on for performance and budget data?",
          "How does your agency currently produce reports for legislative oversight or FOIA requests?",
          "What BI tools are currently deployed, and what's the adoption rate among non-technical staff?",
          "What data governance structures exist across your departments?",
        ],
        redFlags: [
          "No FedRAMP or equivalent security certification is acceptable to them (WisdomAI supports FedRAMP-ready VPC/on-prem)",
          "Multi-year procurement cycle with no active RFP or budget allocation",
          "Strong incumbent vendor with deep political relationships and no evaluation criteria",
        ],
      },
      problem: {
        howToQualify:
          "Government agencies struggle with siloed legacy systems, slow reporting for legislative inquiries, and inability to provide cross-agency data visibility. Probe for citizen service delivery gaps driven by poor data access.",
        discoveryQuestions: [
          "How long does it take to respond to a legislative data request or FOIA inquiry?",
          "Can program managers access real-time performance data without requesting a report?",
          "What challenges do you face in providing cross-departmental data for strategic planning?",
          "How do you ensure consistency in how metrics are defined and reported across agencies?",
        ],
        redFlags: [
          "They're looking for a document management or case management system, not analytics",
          "No mandate from agency leadership for data modernization",
          "Data sharing is blocked by legislative or policy restrictions, not technology",
        ],
      },
      implication: {
        howToQualify:
          "Explore the consequences of slow data access on citizen services, legislative compliance, fraud detection, and cross-agency coordination. Government implications often center on public trust and accountability.",
        discoveryQuestions: [
          "What's the impact on public trust when your agency can't provide timely data on program effectiveness?",
          "How does slow reporting affect your ability to detect fraud, waste, or abuse in government programs?",
          "What's the operational cost of maintaining dozens of disconnected legacy reporting systems?",
          "How does the inability to share data across agencies affect coordinated service delivery?",
        ],
        redFlags: [
          "No legislative mandate or executive order driving data modernization",
          "Analytics is seen as a luxury, not a requirement for agency effectiveness",
          "No political champion willing to sponsor the initiative",
        ],
      },
      "need-payoff": {
        howToQualify:
          "Guide them to articulate how self-service analytics would improve transparency, citizen services, legislative responsiveness, and cross-agency collaboration.",
        discoveryQuestions: [
          "If any program manager could query budget and performance data in plain English and get an instant, auditable answer, how would that change oversight?",
          "What would it mean for legislative relations if data requests that take weeks could be answered in minutes?",
          "How would cross-agency data visibility improve coordinated citizen service delivery?",
          "If your analysts could shift from report generation to policy analysis, what impact would that have on your mission?",
        ],
        redFlags: [
          "No agency leader willing to champion the initiative through procurement",
          "The value proposition doesn't connect to an active mandate or strategic plan",
          "They want to 'study it' with no path to pilot or procurement",
        ],
      },
    },
  },
  "ai-dashboards": {
    "financial-services": {
      situation: {
        howToQualify:
          "Map existing dashboard infrastructure — who builds them, how often they're updated, and how executives consume data. Understand the gap between available dashboards and actual usage.",
        discoveryQuestions: [
          "How many dashboards exist across your organization, and what percentage are actively used?",
          "What tools does your team use to build executive-level reports and dashboards?",
          "How do your C-suite and board members currently consume financial performance data?",
          "What's the typical lead time to build a new dashboard or modify an existing one?",
        ],
        redFlags: [
          "They have a mature, well-adopted dashboard platform with high satisfaction",
          "The real need is data infrastructure, not visualization",
          "No executive stakeholder cares about dashboard quality or timeliness",
        ],
      },
      problem: {
        howToQualify:
          "Financial services firms often have dashboard sprawl — hundreds of reports with inconsistent metrics. Probe for pain around stale dashboards, long development cycles, and executives who can't self-serve.",
        discoveryQuestions: [
          "How often do your executive dashboards reflect stale data or definitions that no longer match reality?",
          "What happens when the CFO needs a new view of data that doesn't exist in current dashboards?",
          "Do different teams show different numbers for the same metric in their dashboards?",
          "How much of your BI team's time is spent maintaining existing dashboards vs. building new insights?",
        ],
        redFlags: [
          "They're satisfied with their current dashboarding capabilities",
          "The problem is data quality at the source, not dashboard creation",
          "No budget for analytics — focused purely on core banking technology",
        ],
      },
      implication: {
        howToQualify:
          "Quantify the cost of stale dashboards leading to poor decisions, BI team bottleneck delaying executive insights, and inconsistent metrics creating compliance or strategic risk.",
        discoveryQuestions: [
          "What's the risk when board-level reports contain metrics calculated differently from operating reports?",
          "How does a 3-week dashboard development cycle affect your ability to respond to market events?",
          "What's the cost of your BI team spending 70% of time on dashboard maintenance?",
          "Have inconsistent dashboard metrics ever led to a compliance issue or audit finding?",
        ],
        redFlags: [
          "No connection between dashboard issues and business or compliance impact",
          "The C-suite doesn't consume dashboards — they rely on verbal briefings",
          "No urgency — 'we've always done it this way'",
        ],
      },
      "need-payoff": {
        howToQualify:
          "Have them envision AI-generated dashboards that create themselves from natural language, automatically surface anomalies, and deliver executive read-outs on schedule.",
        discoveryQuestions: [
          "If any executive could describe the dashboard they need in plain language and have it generated instantly, how would that change your reporting process?",
          "What would it mean if dashboards automatically highlighted anomalies and risks instead of just displaying numbers?",
          "How valuable would periodic AI-generated executive summaries be — highlighting what changed and why?",
          "If your BI team could stop maintaining dashboards and focus on strategic analytics, what would you tackle first?",
        ],
        redFlags: [
          "They want pixel-perfect design control that AI generation can't provide",
          "No executive willing to try a new approach to consuming data",
          "The value proposition doesn't justify change management effort",
        ],
      },
    },
    healthcare: {
      situation: {
        howToQualify: "Map existing reporting infrastructure including EHR-embedded analytics, standalone BI tools, and how clinical and operational leaders consume performance data.",
        discoveryQuestions: [
          "What dashboards do your clinical and operational leaders use daily?",
          "How are quality measure dashboards currently built and maintained?",
          "What tools does your BI team use, and how long does it take to build a new dashboard?",
          "How do department heads consume data — dashboards, emailed reports, or meetings?",
        ],
        redFlags: [
          "They rely exclusively on Epic/Cerner embedded analytics and won't consider external tools",
          "No BI team or reporting infrastructure exists",
          "Leadership doesn't consume dashboards in any form",
        ],
      },
      problem: {
        howToQualify: "Healthcare dashboards are often static, built by a small BI team, and quickly become outdated. Probe for pain around clinical quality dashboards that take weeks to build and operational reports that don't reflect real-time data.",
        discoveryQuestions: [
          "How current is the data in your operational dashboards — real-time, daily, or weekly?",
          "Can your quality team quickly spin up a dashboard to track a new CMS measure?",
          "How many dashboard requests are in your BI team's backlog right now?",
          "Do clinical leaders trust the numbers in their dashboards?",
        ],
        redFlags: [
          "Dashboards are not used for clinical or operational decisions",
          "The problem is data availability, not dashboard creation speed",
          "No budget for analytics outside the EHR contract",
        ],
      },
      implication: {
        howToQualify: "Explore the clinical and financial impact of stale dashboards, slow reporting, and inability for department leaders to visualize data on-demand.",
        discoveryQuestions: [
          "What happens to quality improvement when dashboards take weeks to reflect new measures?",
          "How does lack of real-time operational visibility affect patient flow and bed management?",
          "What's the cost of your BI team being fully consumed by dashboard maintenance?",
          "How do inconsistent metrics across dashboards affect clinical quality reporting?",
        ],
        redFlags: [
          "No connection between dashboard gaps and clinical/financial outcomes",
          "Leadership doesn't see analytics as a clinical quality driver",
          "No regulatory or accreditation pressure creating urgency",
        ],
      },
      "need-payoff": {
        howToQualify: "Have them describe how AI-generated dashboards with automatic insights would accelerate quality improvement, operational efficiency, and executive decision-making.",
        discoveryQuestions: [
          "If department heads could create their own dashboards by describing what they need in plain language, how would that reduce your BI backlog?",
          "What would proactive alerting on quality measure trends mean for your improvement programs?",
          "How would automated executive read-outs change your monthly operational review process?",
          "If your BI team could focus on strategic analytics instead of dashboard maintenance, what would they work on?",
        ],
        redFlags: [
          "No clinical or operational champion willing to pilot",
          "They want EHR-native dashboards only",
          "No vision for how AI-powered dashboards differ from what they have",
        ],
      },
    },
    retail: {
      situation: {
        howToQualify: "Map how merchandising, marketing, and operations teams visualize performance data. Understand existing dashboard tools, refresh frequencies, and who builds reports.",
        discoveryQuestions: [
          "How do your merchandising and marketing leaders track daily performance?",
          "What tools are used for executive-level retail performance dashboards?",
          "How often are your dashboards refreshed — real-time, hourly, daily?",
          "Who is responsible for building and maintaining dashboards for each department?",
        ],
        redFlags: [
          "They have a mature, real-time analytics platform they're happy with",
          "Very small team that doesn't need sophisticated dashboarding",
          "No centralized analytics function to drive adoption",
        ],
      },
      problem: {
        howToQualify: "Retail organizations often have dashboard fatigue — too many reports, inconsistent metrics across channels, and merchandising teams that can't get the views they need quickly enough.",
        discoveryQuestions: [
          "Can your category managers see a unified online + in-store performance view in one dashboard?",
          "How long does it take to get a new dashboard view for a seasonal promotion or product launch?",
          "Do different channels report different numbers for the same sales metric?",
          "How much time does your analytics team spend building and updating recurring retail reports?",
        ],
        redFlags: [
          "They're satisfied with their current omnichannel analytics",
          "The problem is data integration, not visualization",
          "No budget or priority for analytics improvement",
        ],
      },
      implication: {
        howToQualify: "Quantify the cost of slow dashboard creation on merchandising decisions, stale data affecting promotional strategies, and BI team bottleneck delaying insights.",
        discoveryQuestions: [
          "What's the revenue impact when a category manager can't see promotion performance for 48 hours?",
          "How does a 2-week dashboard development cycle affect your ability to capitalize on trends?",
          "What's the cost of your BI team spending most of their time on dashboard maintenance?",
          "How do inconsistent channel metrics affect omnichannel strategy decisions?",
        ],
        redFlags: [
          "Can't tie dashboard gaps to revenue or margin impact",
          "Merchandising and marketing make decisions without data anyway",
          "No urgency around faster reporting",
        ],
      },
      "need-payoff": {
        howToQualify: "Guide them to envision AI-generated dashboards that adapt to seasonal needs, automatically highlight performance anomalies, and give every category manager self-serve visibility.",
        discoveryQuestions: [
          "If your category managers could describe the dashboard they need and have it generated instantly, how would that change seasonal planning?",
          "What would it mean if dashboards automatically flagged stockout risks or margin erosion?",
          "How valuable would weekly AI-generated executive summaries be for your leadership team?",
          "If your analytics team didn't have to build recurring reports, what strategic projects would they tackle?",
        ],
        redFlags: [
          "They want a specific visualization tool (e.g., Looker) not AI-generated dashboards",
          "No merchandising or marketing leader willing to try a new approach",
          "Low data maturity — they need basic reporting before AI dashboards",
        ],
      },
    },
    manufacturing: {
      situation: {
        howToQualify: "Map how plant managers, quality engineers, and supply chain leaders consume operational data. Understand existing dashboards, their refresh rates, and who maintains them.",
        discoveryQuestions: [
          "What dashboards do your plant managers use to monitor production performance?",
          "How do quality engineers track defect trends and root cause analyses?",
          "What's the refresh frequency of your operational dashboards — real-time, shift-based, daily?",
          "Who builds and maintains dashboards for the operations team?",
        ],
        redFlags: [
          "They have a mature MES with built-in dashboards that are well-adopted",
          "No centralized analytics or visualization infrastructure exists",
          "Dashboard needs are very simple — a few KPIs on a TV screen",
        ],
      },
      problem: {
        howToQualify: "Manufacturing organizations often have disconnected dashboards across ERP, MES, and quality systems. Probe for pain around inability to correlate production data across systems and slow dashboard creation for new requirements.",
        discoveryQuestions: [
          "Can plant managers see a unified view of OEE, quality, and maintenance data in one dashboard?",
          "How long does it take to create a new dashboard for a new production line or KPI?",
          "Do your dashboards show real-time data or yesterday's data?",
          "How do you visualize supply chain performance alongside production metrics?",
        ],
        redFlags: [
          "They're looking for an MES or IoT platform, not analytics dashboards",
          "No interest in operational analytics beyond basic production counts",
          "Data from key systems isn't digitized or accessible",
        ],
      },
      implication: {
        howToQualify: "Quantify the impact of disconnected operational dashboards on decision speed, the cost of not seeing quality trends in real-time, and the BI bottleneck for plant-level reporting.",
        discoveryQuestions: [
          "What's the cost of delayed visibility into a quality trend that could have been caught earlier?",
          "How does waiting for weekly reports affect your ability to optimize production schedules?",
          "What's the impact when plant managers can't correlate downtime causes with quality outcomes?",
          "How much engineering time is spent manually creating operational reports?",
        ],
        redFlags: [
          "Can't quantify the cost of slow operational visibility",
          "Operations leadership doesn't use dashboards for decision-making",
          "No urgency — current reporting cadence is considered acceptable",
        ],
      },
      "need-payoff": {
        howToQualify: "Have them describe how AI-generated operational dashboards with automatic anomaly detection would improve production efficiency, quality, and decision speed.",
        discoveryQuestions: [
          "If plant managers could create custom operational views by describing what they need, how would that change shift management?",
          "What would it mean if dashboards automatically alerted you to OEE drops or quality anomalies?",
          "How would AI-generated shift summaries improve handoff quality between shifts?",
          "If your BI resources could focus on advanced analytics instead of maintaining reports, what would you tackle?",
        ],
        redFlags: [
          "They need real-time process control, not analytics dashboards",
          "No operations leader willing to pilot a new approach",
          "The manufacturing scale doesn't justify the investment",
        ],
      },
    },
    government: {
      situation: {
        howToQualify: "Understand how agency leaders and program managers consume performance data. Map existing reporting tools, legislative reporting requirements, and public-facing dashboard needs.",
        discoveryQuestions: [
          "What dashboards do your agency leaders use for program performance oversight?",
          "How do you currently produce reports for legislative committees and public transparency?",
          "What tools does your team use for building and maintaining dashboards?",
          "How do citizens access program performance data?",
        ],
        redFlags: [
          "No appetite for modernization — strong incumbent preference",
          "No budget line for analytics or reporting tools",
          "Strict security requirements that can't be met (verify WisdomAI's compliance posture)",
        ],
      },
      problem: {
        howToQualify: "Government agencies often have outdated, static dashboards that take months to create. Probe for pain around legislative reporting bottlenecks, lack of public transparency dashboards, and inability to visualize cross-agency data.",
        discoveryQuestions: [
          "How long does it take to produce a new dashboard for a legislative reporting requirement?",
          "Can program managers see real-time performance data, or do they rely on monthly reports?",
          "Do you have the dashboard capabilities to support public transparency requirements?",
          "How do you visualize data that spans multiple departments or agencies?",
        ],
        redFlags: [
          "No legislative or executive mandate for improved reporting",
          "The problem is data availability, not visualization",
          "No analytics team to drive adoption",
        ],
      },
      implication: {
        howToQualify: "Explore the consequences of slow dashboard creation on legislative compliance, public trust, and program management effectiveness.",
        discoveryQuestions: [
          "What's the reputational risk when your agency can't provide timely performance data to legislators?",
          "How does lack of real-time program dashboards affect your ability to manage budgets effectively?",
          "What's the cost of maintaining legacy reporting systems versus investing in modern tools?",
          "How does poor data visualization affect cross-agency coordination on shared programs?",
        ],
        redFlags: [
          "No political or legislative pressure driving improved reporting",
          "Leadership sees dashboards as a 'nice to have'",
          "No clear ROI path for dashboard modernization",
        ],
      },
      "need-payoff": {
        howToQualify: "Guide them to articulate how AI-generated dashboards would improve legislative responsiveness, citizen transparency, and program management.",
        discoveryQuestions: [
          "If program managers could create their own performance dashboards by describing what they need, how would that change oversight?",
          "What would it mean if legislative data requests that take weeks could be turned into dashboards in minutes?",
          "How would automatic anomaly detection in budget dashboards help detect fraud or waste early?",
          "If your analytics team could focus on policy analysis instead of report building, how would that improve agency effectiveness?",
        ],
        redFlags: [
          "No agency leader willing to champion the initiative",
          "They want a public transparency portal, not internal dashboards",
          "The value case doesn't connect to any active modernization initiative",
        ],
      },
    },
  },
  "proactive-agents": {
    "financial-services": {
      situation: {
        howToQualify: "Map their current alerting and monitoring infrastructure. Understand how risk events, compliance triggers, and market anomalies are currently detected and escalated.",
        discoveryQuestions: [
          "How does your organization currently detect and respond to risk events or compliance anomalies?",
          "What alerting or monitoring tools are in place for trading, risk, and compliance?",
          "How are insights from data analysis routed to decision-makers today?",
          "What percentage of your analyst time is spent on recurring monitoring vs. strategic analysis?",
        ],
        redFlags: [
          "They have a sophisticated, well-adopted alerting system (e.g., Splunk, custom) they're happy with",
          "No automated monitoring or alerting exists at all — they need basic infrastructure first",
          "Regulatory constraints prevent autonomous agent actions on financial data",
        ],
      },
      problem: {
        howToQualify: "Financial services firms struggle with alert fatigue from simple threshold rules, slow escalation of critical risk events, and analysts spending most time on recurring monitoring rather than strategic work.",
        discoveryQuestions: [
          "How many alerts does your team receive daily, and what percentage are actionable?",
          "How long does it take for a critical risk anomaly to reach the right decision-maker?",
          "What recurring analysis workflows does your team run manually every day/week?",
          "Have you missed a risk event because it wasn't detected until the next reporting cycle?",
        ],
        redFlags: [
          "They're looking for a trading algorithm, not an analytics agent",
          "No recurring analysis workflows — everything is ad-hoc",
          "Compliance team won't accept AI-driven actions without human review (note: WisdomAI has guardrails for this)",
        ],
      },
      implication: {
        howToQualify: "Quantify the cost of delayed risk detection, alert fatigue causing missed events, and analyst time wasted on recurring monitoring that could be automated.",
        discoveryQuestions: [
          "What's the financial exposure when a risk event goes undetected for 24 hours?",
          "How much analyst time is consumed by monitoring activities that could be automated?",
          "What's the regulatory penalty risk if a compliance anomaly is detected late?",
          "How does alert fatigue affect your team's ability to respond to genuine critical events?",
        ],
        redFlags: [
          "Can't quantify the cost of delayed detection or missed events",
          "No recent incident that created urgency for better monitoring",
          "Leadership doesn't prioritize proactive risk detection",
        ],
      },
      "need-payoff": {
        howToQualify: "Have them describe how context-aware autonomous agents would transform risk monitoring, compliance alerting, and analyst productivity.",
        discoveryQuestions: [
          "If an AI agent could monitor your portfolio exposure 24/7 and alert the right person with context when thresholds are breached, how would that change risk management?",
          "What would it mean if recurring compliance checks were automated with full audit trails?",
          "How would autonomous agents that detect anomalies and auto-generate incident reports improve your response time?",
          "If you could redeploy 50% of analyst monitoring time to strategic work, what would you prioritize?",
        ],
        redFlags: [
          "They want full autonomous trading/action without human guardrails",
          "No risk or compliance leader willing to sponsor automated monitoring",
          "The value proposition doesn't outweigh the change management effort",
        ],
      },
    },
    healthcare: {
      situation: {
        howToQualify: "Understand current clinical and operational monitoring capabilities. Map how patient safety events, quality triggers, and operational anomalies are currently detected.",
        discoveryQuestions: [
          "How does your organization currently monitor for clinical quality trends or patient safety signals?",
          "What alerting systems exist for operational issues like bed capacity or staffing shortages?",
          "How are recurring clinical quality reports generated and distributed?",
          "What percentage of your analytics team's time goes to recurring monitoring vs. strategic work?",
        ],
        redFlags: [
          "They have a mature clinical decision support system they're satisfied with",
          "No analytics or monitoring infrastructure — they need foundational work",
          "Strict clinical governance prevents any AI-driven alerting without physician oversight",
        ],
      },
      problem: {
        howToQualify: "Healthcare organizations need proactive detection of quality trends, patient safety risks, and operational issues but rely on manual reviews and periodic reporting.",
        discoveryQuestions: [
          "How quickly do you detect a rising readmission trend or an unusual infection rate?",
          "What recurring reports does your quality team produce manually every week/month?",
          "How long does it take for an operational anomaly (e.g., ER wait time spike) to reach the right manager?",
          "Are your current alerting rules sophisticated enough to distinguish real signals from noise?",
        ],
        redFlags: [
          "No quality improvement or patient safety mandate driving urgency",
          "They want clinical decision support at the point of care, not analytics agents",
          "The problem is data availability, not proactive monitoring",
        ],
      },
      implication: {
        howToQualify: "Explore the clinical and financial impact of delayed detection — patient safety events, quality penalties, and operational inefficiencies.",
        discoveryQuestions: [
          "What's the patient impact when a quality trend goes undetected for weeks?",
          "How do CMS quality measure penalties affect your reimbursement when trends aren't caught early?",
          "What's the cost of manual recurring reporting on your analytics team's capacity?",
          "How does delayed operational alerting affect patient throughput and satisfaction?",
        ],
        redFlags: [
          "No recent quality or safety event creating urgency",
          "Leadership doesn't see proactive monitoring as a priority",
          "Can't connect delayed detection to patient or financial outcomes",
        ],
      },
      "need-payoff": {
        howToQualify: "Have them describe how autonomous monitoring agents would improve patient safety, quality performance, and operational responsiveness.",
        discoveryQuestions: [
          "If an AI agent could continuously monitor readmission trends and alert the quality team when patterns emerge, how would that improve outcomes?",
          "What would it mean if recurring quality reports were generated and distributed automatically with insights highlighted?",
          "How would proactive staffing alerts help you manage patient-to-nurse ratios before they become critical?",
          "If your quality team could focus on improvement initiatives instead of manual monitoring, what would they prioritize?",
        ],
        redFlags: [
          "They want clinical AI for diagnosis/treatment, not operational analytics agents",
          "No quality or operations champion willing to pilot",
          "Concerns about AI in healthcare that can't be addressed by WisdomAI's governance features",
        ],
      },
    },
    retail: {
      situation: {
        howToQualify: "Map current monitoring for inventory, pricing, marketing performance, and how anomalies are detected and escalated across the retail operation.",
        discoveryQuestions: [
          "How does your team currently detect inventory issues, pricing anomalies, or demand shifts?",
          "What automated alerting exists for supply chain disruptions or stockout risks?",
          "How are recurring sales and marketing performance reports generated and distributed?",
          "What monitoring systems exist for e-commerce site performance and conversion trends?",
        ],
        redFlags: [
          "They have a sophisticated demand planning and alerting system they're happy with",
          "Very simple retail operation that doesn't need proactive monitoring",
          "No data infrastructure to support automated agents",
        ],
      },
      problem: {
        howToQualify: "Retail organizations often detect issues reactively — stockouts after they happen, pricing errors after margin impact, demand shifts after missed sales. Probe for pain around reactive vs. proactive operations.",
        discoveryQuestions: [
          "How quickly do you detect a stockout situation across your stores or channels?",
          "What happens when a pricing anomaly goes undetected for a day across hundreds of SKUs?",
          "How do you currently identify demand shifts that should trigger replenishment or promotional changes?",
          "What recurring reports do your merchandising analysts produce manually each week?",
        ],
        redFlags: [
          "They're looking for a demand planning tool, not proactive analytics agents",
          "Retail operation is too small for automated monitoring to be valuable",
          "No recurring analysis workflows that could benefit from automation",
        ],
      },
      implication: {
        howToQualify: "Quantify the cost of reactive detection — lost sales from stockouts, margin erosion from pricing errors, missed promotional windows from slow demand signals.",
        discoveryQuestions: [
          "What's the lost revenue from a stockout that goes undetected for 48 hours across stores?",
          "How much margin is lost when pricing anomalies aren't caught same-day?",
          "What's the cost when a demand shift isn't detected early enough to adjust promotions?",
          "How much analyst time is consumed by recurring monitoring that could be automated?",
        ],
        redFlags: [
          "Can't quantify the cost of reactive operations",
          "No recent incident creating urgency (e.g., major stockout or pricing error)",
          "Leadership accepts the current reactive approach",
        ],
      },
      "need-payoff": {
        howToQualify: "Guide them to envision how autonomous agents would proactively detect and route insights on inventory, pricing, demand, and competitive changes.",
        discoveryQuestions: [
          "If an AI agent could monitor inventory levels across all channels and alert buyers before a stockout occurs, how would that change your operations?",
          "What would it mean if margin anomalies were detected and routed to the right category manager within hours?",
          "How valuable would automated weekly merchandising summaries be — delivered to every category manager's inbox with key trends highlighted?",
          "If your analysts could stop running recurring reports and focus on strategic merchandising analysis, what would they work on?",
        ],
        redFlags: [
          "They want a supply chain management system, not analytics agents",
          "No merchandising or operations leader willing to pilot",
          "The scale of their operation doesn't justify the investment",
        ],
      },
    },
    manufacturing: {
      situation: {
        howToQualify: "Map current monitoring for production, quality, maintenance, and supply chain. Understand how anomalies are detected and escalated to plant managers and engineers.",
        discoveryQuestions: [
          "How does your operations team currently detect production anomalies or quality trends?",
          "What automated alerting exists for equipment failures or maintenance needs?",
          "How are recurring production and quality reports generated and distributed?",
          "What monitoring exists for supply chain disruptions or vendor performance issues?",
        ],
        redFlags: [
          "They have a mature predictive maintenance and alerting system",
          "No connected IoT or sensor infrastructure — manual data collection",
          "Looking for real-time process control, not analytics agents",
        ],
      },
      problem: {
        howToQualify: "Manufacturing organizations often detect quality issues after the fact, miss equipment failure warnings, and rely on manual reporting. Probe for pain around reactive vs. proactive operations management.",
        discoveryQuestions: [
          "How quickly do you detect a quality trend that's developing on a production line?",
          "What happens when an equipment degradation pattern goes unnoticed until failure?",
          "How do you currently identify supply chain risks before they affect production?",
          "What recurring operations reports do your engineers produce manually?",
        ],
        redFlags: [
          "They want real-time process control automation, not insight agents",
          "Production monitoring is entirely manual with no data infrastructure",
          "No recurring analysis workflows to automate",
        ],
      },
      implication: {
        howToQualify: "Quantify the cost of reactive detection — unplanned downtime, scrap from late quality detection, supply chain surprises, and engineer time on manual monitoring.",
        discoveryQuestions: [
          "What's the cost of unplanned downtime that could have been predicted?",
          "How much scrap or rework results from quality trends detected too late?",
          "What's the production impact of a supply chain disruption you didn't see coming?",
          "How many engineer-hours per week go to manual monitoring and recurring reports?",
        ],
        redFlags: [
          "Can't quantify the cost of reactive operations",
          "No recent incident creating urgency for proactive monitoring",
          "Operations leadership accepts current approach as adequate",
        ],
      },
      "need-payoff": {
        howToQualify: "Have them describe how autonomous agents monitoring production, quality, and supply chain data would reduce downtime, improve quality, and free up engineering time.",
        discoveryQuestions: [
          "If AI agents could monitor production lines 24/7 and alert shift supervisors before quality issues escalate, how would that change your operations?",
          "What would it mean if equipment degradation patterns were detected and maintenance scheduled automatically?",
          "How would automated supply chain risk alerts improve your production planning?",
          "If your engineers could stop running recurring reports and focus on process optimization, what would they tackle first?",
        ],
        redFlags: [
          "They want autonomous process control (adjusting machines), not insight agents",
          "No operations champion willing to pilot automated monitoring",
          "Manufacturing scale or complexity doesn't justify the investment",
        ],
      },
    },
    government: {
      situation: {
        howToQualify: "Map current monitoring for program performance, fraud detection, and compliance. Understand how anomalies in budget, operations, or citizen services are currently detected.",
        discoveryQuestions: [
          "How does your agency currently detect anomalies in program spending or performance?",
          "What automated monitoring exists for fraud, waste, and abuse in government programs?",
          "How are recurring compliance and performance reports generated?",
          "What alerting capabilities exist for operational issues affecting citizen services?",
        ],
        redFlags: [
          "They have a mature fraud detection or monitoring system",
          "No data infrastructure to support automated agents",
          "Strong resistance to AI-driven monitoring from political or union stakeholders",
        ],
      },
      problem: {
        howToQualify: "Government agencies often detect fraud, performance issues, and compliance gaps reactively through audits rather than proactive monitoring. Probe for pain around late detection and manual reporting burdens.",
        discoveryQuestions: [
          "How long does it take to detect a pattern of fraudulent claims in your programs?",
          "What happens when a budget anomaly goes undetected until the next audit cycle?",
          "How do you currently identify performance trends that require intervention?",
          "What recurring reports does your team produce manually for oversight committees?",
        ],
        redFlags: [
          "They're looking for investigation tools, not proactive monitoring",
          "No mandate for improved monitoring or fraud detection",
          "Data quality is too poor to support automated analysis",
        ],
      },
      implication: {
        howToQualify: "Explore the consequences of reactive detection — financial losses from fraud, program effectiveness gaps, and public accountability risks.",
        discoveryQuestions: [
          "What's the financial impact of fraud or waste that goes undetected for months?",
          "How does late detection of program performance issues affect citizen outcomes?",
          "What's the reputational risk when an audit reveals issues that proactive monitoring could have caught?",
          "How much staff time goes to manual monitoring and reporting that could be automated?",
        ],
        redFlags: [
          "No recent audit finding or fraud incident creating urgency",
          "Leadership doesn't prioritize proactive monitoring",
          "Can't connect delayed detection to financial or public trust impact",
        ],
      },
      "need-payoff": {
        howToQualify: "Guide them to articulate how autonomous agents would improve fraud detection, program monitoring, compliance, and resource efficiency.",
        discoveryQuestions: [
          "If AI agents could continuously monitor program spending and flag anomalies with full audit trails, how would that change your oversight capabilities?",
          "What would it mean if compliance reports were automatically generated and distributed to oversight committees?",
          "How would proactive citizen service monitoring help you intervene before issues escalate?",
          "If your analysts could focus on program improvement instead of manual reporting, what initiatives would you prioritize?",
        ],
        redFlags: [
          "They want investigation tools for known cases, not proactive monitoring",
          "No agency leader willing to champion AI-driven monitoring",
          "Political or regulatory barriers to automated monitoring that can't be addressed",
        ],
      },
    },
  },
};

// ─── Build function ───

export function getSpinCriteria(
  productId: ProductId,
  industryId: IndustryId
): FrameworkCriterion[] {
  const productContent = spinContent[productId]?.[industryId];
  if (!productContent) return [];

  return spinBase.map((base) => {
    const content = productContent[base.id];
    return {
      ...base,
      howToQualify: content?.howToQualify ?? "",
      discoveryQuestions: content?.discoveryQuestions ?? [],
      redFlags: content?.redFlags ?? [],
    };
  });
}

// ─── Example opportunities ───

type ExampleMap = Record<ProductId, Record<IndustryId, QualifiedOpportunityExample>>;

export const spinExamples: ExampleMap = {
  "conversational-bi": {
    "financial-services": {
      companyProfile: "Mid-market asset management firm with $8B AUM, 200 employees, using Snowflake + Power BI",
      industry: "Financial Services",
      dealSize: "$180K ARR",
      timeline: "90-day evaluation, 45-day implementation",
      stakeholders: [
        { role: "VP of Data & Analytics", stance: "Champion — frustrated with 3-week report turnaround" },
        { role: "CRO (Chief Risk Officer)", stance: "Sponsor — wants real-time risk exposure visibility" },
        { role: "Head of IT", stance: "Evaluator — concerned about security and data governance" },
        { role: "CFO", stance: "Economic buyer — needs to see ROI within 6 months" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "3 BI analysts supporting 50 portfolio managers. 3-week backlog. Snowflake DW + Power BI. Considering Copilot add-on.", status: "strong" },
        { criterion: "Problem", finding: "Portfolio managers can't get real-time exposure data. Different teams reporting different AUM figures. Compliance reporting takes 2 weeks.", status: "strong" },
        { criterion: "Implication", finding: "Estimated $2M annual cost in analyst time on manual reporting. Compliance risk from inconsistent metrics. PM frustration causing talent retention issues.", status: "strong" },
        { criterion: "Need-Payoff", finding: "VP described vision of 'every PM asking questions in English and getting trusted answers in seconds.' CRO wants single source of truth for risk metrics.", status: "strong" },
      ],
      outcome: "Closed-won after 75-day cycle. Deployed to risk and portfolio management teams first. Expanded to compliance within 90 days.",
      lessonsLearned: [
        "Security review with IT was the longest phase — having SOC 2 Type II and RBAC demos ready accelerated by 2 weeks",
        "Competitive displacement of Power BI Copilot required side-by-side accuracy benchmarking",
        "Champion's frustration with report backlog was the key emotional driver — anchor all messaging here",
      ],
    },
    healthcare: {
      companyProfile: "Regional health system with 12 hospitals, 4,000 beds, Epic EHR, 15-person analytics team",
      industry: "Healthcare",
      dealSize: "$250K ARR",
      timeline: "120-day evaluation, 60-day implementation",
      stakeholders: [
        { role: "VP of Analytics", stance: "Champion — drowning in report requests" },
        { role: "CMO", stance: "Sponsor — needs faster quality measure visibility" },
        { role: "CISO", stance: "Evaluator — HIPAA compliance is non-negotiable" },
        { role: "CFO", stance: "Economic buyer — wants to avoid hiring 5 more analysts" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "15 analysts supporting 12 hospitals. 200+ report requests/month. Epic Caboodle + Tableau. Considering Epic Cogito expansion.", status: "strong" },
        { criterion: "Problem", finding: "Department heads wait 4 weeks for ad-hoc reports. Quality measures take 3 weeks to compile. Different hospitals define metrics differently.", status: "strong" },
        { criterion: "Implication", finding: "Estimated $1.5M in analyst salary for recurring reports. CMS quality penalties at risk. Department leaders making decisions on stale data.", status: "strong" },
        { criterion: "Need-Payoff", finding: "CMO: 'If my quality directors could ask about readmission trends and get instant answers, it would transform our improvement programs.' CFO: 'Avoiding 5 new analyst hires saves $600K/year.'", status: "strong" },
      ],
      outcome: "Closed-won after 105-day cycle. Piloted with 2 hospitals' quality teams, then expanded system-wide within 6 months.",
      lessonsLearned: [
        "HIPAA compliance review was critical path — having on-prem deployment option was the differentiator",
        "Competitive positioning against Epic Cogito required focusing on cross-system data federation",
        "Quality directors as power users drove bottom-up adoption faster than executive mandate",
      ],
    },
    retail: {
      companyProfile: "National specialty retailer with 500 stores, $2B revenue, Shopify + SAP, 8-person analytics team",
      industry: "Retail & E-Commerce",
      dealSize: "$200K ARR",
      timeline: "75-day evaluation, 30-day implementation",
      stakeholders: [
        { role: "VP of Merchandising Analytics", stance: "Champion — needs faster category performance insights" },
        { role: "CTO", stance: "Sponsor — driving data democratization initiative" },
        { role: "VP E-Commerce", stance: "Evaluator — wants unified online/offline analytics" },
        { role: "CFO", stance: "Economic buyer — focused on margin improvement" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "8 analysts serving 40 category managers. Shopify + SAP + Google Analytics in silos. Looker for dashboards.", status: "strong" },
        { criterion: "Problem", finding: "Category managers can't get unified channel views. Weekly performance reports take 3 days to produce. Different channel teams report different numbers.", status: "strong" },
        { criterion: "Implication", finding: "Estimated 2% margin improvement opportunity from faster merchandising decisions. Category managers make inventory decisions on stale data. BI team is a bottleneck.", status: "moderate" },
        { criterion: "Need-Payoff", finding: "VP Merch: 'If my category managers could ask how a promotion is performing across all channels right now, we'd catch underperformers days earlier.' CTO sees self-service as key to scaling analytics.", status: "strong" },
      ],
      outcome: "Closed-won after 65-day cycle. Started with top 5 categories, expanded to all 25 categories within 4 months.",
      lessonsLearned: [
        "Federated querying across Shopify + SAP was the technical differentiator — no ETL pipeline needed",
        "Competitive displacement of Looker was easiest when framed as 'analyst enablement' not 'Looker replacement'",
        "ROI was strongest when tied to specific markdown reduction from earlier trend detection",
      ],
    },
    manufacturing: {
      companyProfile: "Industrial manufacturer with 8 plants, $1.5B revenue, SAP ERP, Historian/IoT sensors, 6-person analytics team",
      industry: "Manufacturing",
      dealSize: "$175K ARR",
      timeline: "90-day evaluation, 45-day implementation",
      stakeholders: [
        { role: "VP of Operations Analytics", stance: "Champion — wants self-service for plant managers" },
        { role: "COO", stance: "Sponsor — driving operational excellence program" },
        { role: "VP Quality", stance: "Evaluator — needs faster root cause analysis" },
        { role: "CIO", stance: "Economic buyer — consolidating analytics tools" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "6 analysts serving 8 plant managers + quality engineers. SAP + Historian + MES in silos. Custom Excel reports.", status: "strong" },
        { criterion: "Problem", finding: "Root cause analysis takes days. Plant managers can't correlate quality data with process parameters without analyst help. Production reports are 24 hours stale.", status: "strong" },
        { criterion: "Implication", finding: "Estimated $3M/year in preventable scrap and rework. 12 hours of unplanned downtime per plant per month. Engineers spend 60% of time on reporting.", status: "strong" },
        { criterion: "Need-Payoff", finding: "COO: 'If plant managers could query OEE and quality data in real-time without waiting for a report, we could prevent issues before they cost us.' VP Quality wants instant defect trend correlation.", status: "strong" },
      ],
      outcome: "Closed-won after 80-day cycle. Piloted at 2 highest-volume plants, expanded to all 8 within 5 months.",
      lessonsLearned: [
        "Connecting SAP + Historian data without ETL was the key technical win",
        "Plant manager usability was critical — the demo had to show a non-technical user asking questions",
        "ROI was anchored on downtime and scrap reduction, not analyst productivity",
      ],
    },
    government: {
      companyProfile: "State government agency, 2,000 employees, managing $5B in program budgets across 15 departments",
      industry: "Government",
      dealSize: "$300K ARR (3-year contract)",
      timeline: "180-day procurement cycle, 90-day implementation",
      stakeholders: [
        { role: "Chief Data Officer", stance: "Champion — leading data modernization initiative" },
        { role: "Deputy Secretary", stance: "Sponsor — legislative mandate for data transparency" },
        { role: "CISO", stance: "Evaluator — FedRAMP/StateRAMP requirements" },
        { role: "Budget Director", stance: "Economic buyer — needs cost justification for legislature" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "8 analysts supporting 15 departments. Legacy Oracle BI + custom SQL reports. 300+ recurring reports monthly. Legislative data requests take 2-4 weeks.", status: "strong" },
        { criterion: "Problem", finding: "Cross-department data requests require manual assembly. Metric definitions vary by department. Legislative requests are always urgent and always late.", status: "strong" },
        { criterion: "Implication", finding: "Legislature questioning data timeliness. FOIA response times at risk of non-compliance. $500K/year in contractor costs for report generation. Cross-agency coordination hampered.", status: "moderate" },
        { criterion: "Need-Payoff", finding: "CDO: 'If any program manager could ask budget and performance questions in plain language, we'd transform government transparency.' Deputy Secretary sees it as key to legislative relations.", status: "strong" },
      ],
      outcome: "Closed-won after 150-day procurement cycle. Deployed to budget office and 3 largest departments. Full agency rollout planned over 18 months.",
      lessonsLearned: [
        "On-prem/VPC deployment was required — SaaS was a non-starter for this agency",
        "Legislative mandate provided the urgency that procurement process typically lacks",
        "Had to navigate a formal RFP process — pre-positioning with the CDO 6 months earlier was critical",
      ],
    },
  },
  "ai-dashboards": {
    "financial-services": {
      companyProfile: "Regional bank, $15B assets, 1,500 employees, Power BI + Tableau mix, 5-person BI team",
      industry: "Financial Services",
      dealSize: "$150K ARR",
      timeline: "60-day evaluation, 30-day implementation",
      stakeholders: [
        { role: "SVP of Business Intelligence", stance: "Champion — overwhelmed with dashboard requests" },
        { role: "CFO", stance: "Sponsor — wants real-time financial dashboards for the board" },
        { role: "Head of Compliance", stance: "Evaluator — needs regulatory reporting dashboards" },
        { role: "CTO", stance: "Economic buyer — wants to reduce BI tool sprawl" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "5-person BI team maintaining 200+ dashboards. 40% are unused. New dashboard takes 3 weeks to build. Board reports are manually assembled.", status: "strong" },
        { criterion: "Problem", finding: "CFO gets board-ready reports 2 days late every quarter. Dashboard metrics don't match across departments. BI team spends 80% on maintenance.", status: "strong" },
        { criterion: "Implication", finding: "Board confidence at risk from inconsistent metrics. 3-week delay means missed opportunities in rate environment changes. $400K BI team cost mostly on maintenance.", status: "strong" },
        { criterion: "Need-Payoff", finding: "CFO: 'I want to describe what I need to see and have a dashboard appear.' SVP BI: 'If AI maintained dashboards and surfaced anomalies, my team could do real analysis.'", status: "strong" },
      ],
      outcome: "Closed-won in 50 days. Deployed for executive and finance dashboards first. Compliance dashboards added in month 2.",
      lessonsLearned: [
        "Board reporting use case created executive urgency that accelerated procurement",
        "Competitive win against Tableau Pulse by demonstrating contextual understanding of financial metrics",
        "Quick win: auto-generated monthly board summary replaced 3 days of manual assembly",
      ],
    },
    healthcare: {
      companyProfile: "Academic medical center, 1,200 beds, Epic EHR, 10-person BI team managing 300+ dashboards",
      industry: "Healthcare",
      dealSize: "$200K ARR",
      timeline: "90-day evaluation, 45-day implementation",
      stakeholders: [
        { role: "Director of BI", stance: "Champion — BI team spending 90% on dashboard maintenance" },
        { role: "COO", stance: "Sponsor — needs real-time operational dashboards" },
        { role: "VP Quality", stance: "Evaluator — wants dynamic CMS measure dashboards" },
        { role: "CFO", stance: "Economic buyer — looking at BI team ROI" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "300+ dashboards, 60% unused or stale. New dashboard requests take 4-6 weeks. Quality dashboards updated monthly. BI team of 10 fully consumed.", status: "strong" },
        { criterion: "Problem", finding: "COO can't get real-time operational views. Quality dashboards don't reflect new CMS measures for months. Dashboard metrics inconsistent across hospitals.", status: "strong" },
        { criterion: "Implication", finding: "Operational decisions made on weekly data costing $2M+ in efficiency. CMS penalty risk from slow quality measure adoption. BI team can't support growth.", status: "strong" },
        { criterion: "Need-Payoff", finding: "COO: 'I need a dashboard that updates itself when new priorities emerge.' VP Quality: 'If measures could be visualized in days instead of months, we'd improve faster.'", status: "strong" },
      ],
      outcome: "Closed-won in 80 days. Deployed for operational dashboards and quality team. Expanded to clinical departments over 6 months.",
      lessonsLearned: [
        "Demonstrating auto-generated executive summaries was the 'aha moment' for the COO",
        "HIPAA compliance and on-prem option were table stakes for evaluation",
        "Quick win: replacing the monthly quality dashboard refresh with real-time views",
      ],
    },
    retail: {
      companyProfile: "DTC brand expanding to wholesale, $500M revenue, Shopify + NetSuite, 4-person analytics team",
      industry: "Retail & E-Commerce",
      dealSize: "$120K ARR",
      timeline: "45-day evaluation, 21-day implementation",
      stakeholders: [
        { role: "Head of Analytics", stance: "Champion — can't keep up with dashboard requests" },
        { role: "VP of Sales", stance: "Sponsor — needs channel performance dashboards" },
        { role: "CMO", stance: "Evaluator — wants marketing ROI visibility" },
        { role: "CEO", stance: "Economic buyer — data-driven growth strategy" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "4-person team building everything in Looker. 50+ dashboards, many outdated. New dashboard takes 2 weeks. Growing wholesale channel needs new views.", status: "strong" },
        { criterion: "Problem", finding: "VP Sales: no unified DTC + wholesale view. CMO can't see cross-channel marketing ROI. New channel dashboards take weeks. Data definitions inconsistent.", status: "strong" },
        { criterion: "Implication", finding: "Wholesale expansion hampered by poor visibility. Marketing spending not optimized — estimated 15% waste. Analytics team is a growth bottleneck.", status: "moderate" },
        { criterion: "Need-Payoff", finding: "VP Sales: 'I need to describe what I want and see it immediately.' CEO: 'If every leader had real-time dashboards, we could scale the business faster.'", status: "strong" },
      ],
      outcome: "Closed-won in 40 days. Fast deployment for sales and marketing dashboards. Full company rollout within 2 months.",
      lessonsLearned: [
        "Fast-growing company meant speed of deployment was the top priority",
        "Competitive win against Looker by demonstrating 5-minute dashboard creation",
        "CEO involvement accelerated procurement — this was a strategic initiative",
      ],
    },
    manufacturing: {
      companyProfile: "Automotive parts manufacturer, 5 plants, $800M revenue, SAP ERP, custom Grafana dashboards",
      industry: "Manufacturing",
      dealSize: "$160K ARR",
      timeline: "75-day evaluation, 40-day implementation",
      stakeholders: [
        { role: "VP of Operations Excellence", stance: "Champion — wants standardized operational dashboards across plants" },
        { role: "COO", stance: "Sponsor — driving Industry 4.0 initiative" },
        { role: "Quality Director", stance: "Evaluator — needs real-time quality dashboards" },
        { role: "CFO", stance: "Economic buyer — funding from operational excellence budget" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "Each plant has different dashboards. Grafana for IoT, SAP reports for production. No unified view. Custom development for any new dashboard.", status: "strong" },
        { criterion: "Problem", finding: "No cross-plant performance comparison possible. New dashboard takes 4+ weeks. Quality dashboards are batch-updated daily. No standardization.", status: "strong" },
        { criterion: "Implication", finding: "Best practices can't be identified across plants. Quality issues detected 24h late. Custom dashboard development costing $300K/year in IT labor.", status: "strong" },
        { criterion: "Need-Payoff", finding: "COO: 'I want one view across all plants with drill-down capability.' VP OpEx: 'If plant managers could create their own views, we'd accelerate continuous improvement.'", status: "strong" },
      ],
      outcome: "Closed-won in 65 days. Deployed at flagship plant, then standardized across all 5 plants within 4 months.",
      lessonsLearned: [
        "Cross-plant standardization use case resonated strongly with C-suite",
        "Competitive displacement of Grafana was about business user usability, not technical capability",
        "Quick win: auto-generated daily shift summary dashboard replaced manual Excel compilation",
      ],
    },
    government: {
      companyProfile: "Federal agency, 5,000 employees, managing 20 national programs with $10B annual budget",
      industry: "Government",
      dealSize: "$400K ARR (3-year contract)",
      timeline: "200-day procurement cycle, 90-day implementation",
      stakeholders: [
        { role: "Director of Data Analytics", stance: "Champion — mandated to improve program visibility" },
        { role: "Agency Administrator", stance: "Sponsor — Congressional pressure for transparency" },
        { role: "CISO", stance: "Evaluator — strict security requirements" },
        { role: "CFO", stance: "Economic buyer — operating under continuing resolution constraints" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "Legacy Cognos + MicroStrategy. 500+ reports, most outdated. New dashboards require 6-month IT project. Congressional inquiries take weeks.", status: "strong" },
        { criterion: "Problem", finding: "Administrator can't see real-time program performance. Congressional data requests are always late. No public-facing transparency dashboards. Metrics vary by office.", status: "strong" },
        { criterion: "Implication", finding: "Congressional relations strained. GAO audit findings on data timeliness. $1.2M annual cost for legacy report maintenance. Public trust declining.", status: "strong" },
        { criterion: "Need-Payoff", finding: "Administrator: 'I need dashboards that legislators can access themselves.' Director: 'If program managers could create their own views, we'd reduce IT dependency by 80%.'", status: "moderate" },
      ],
      outcome: "Closed-won after 180-day procurement. Deployed for executive dashboards and Congressional reporting. Public transparency dashboards in Phase 2.",
      lessonsLearned: [
        "Congressional pressure created urgency that overcame typical government procurement inertia",
        "FedRAMP-ready VPC deployment was a mandatory requirement",
        "Had to demonstrate superiority over legacy Cognos/MicroStrategy in formal bake-off evaluation",
      ],
    },
  },
  "proactive-agents": {
    "financial-services": {
      companyProfile: "Hedge fund, $12B AUM, 150 employees, proprietary risk systems + Bloomberg, 8-person quant/analytics team",
      industry: "Financial Services",
      dealSize: "$220K ARR",
      timeline: "60-day evaluation, 30-day implementation",
      stakeholders: [
        { role: "Head of Risk Analytics", stance: "Champion — wants automated risk monitoring" },
        { role: "CIO (Investments)", stance: "Sponsor — needs proactive portfolio alerting" },
        { role: "CCO", stance: "Evaluator — compliance monitoring requirements" },
        { role: "COO", stance: "Economic buyer — operational efficiency mandate" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "8 quants running daily risk reports manually. Custom Python scripts for alerting — fragile and poorly maintained. Bloomberg terminal alerts are too noisy.", status: "strong" },
        { criterion: "Problem", finding: "Risk reports delivered by 10am — too late for Asian market events. Alert fatigue: 200+ alerts/day, 5% actionable. No automated compliance monitoring.", status: "strong" },
        { criterion: "Implication", finding: "Missed a $15M exposure event last quarter (detected 6 hours late). Quant team spends 60% on recurring monitoring. Compliance audit found gaps in surveillance.", status: "strong" },
        { criterion: "Need-Payoff", finding: "Head of Risk: 'An AI agent that monitors exposure 24/7 and alerts with context — not just threshold breaches — would be transformational.' CIO wants proactive alpha insights.", status: "strong" },
      ],
      outcome: "Closed-won in 45 days. Risk monitoring agents deployed first, compliance agents in month 2. Full ROI realized in 4 months.",
      lessonsLearned: [
        "The $15M incident was the catalyst — always look for a recent painful event to anchor urgency",
        "Guardrails and audit trail were critical for compliance approval",
        "Quant team became champions once they saw how agents freed them for strategic work",
      ],
    },
    healthcare: {
      companyProfile: "Large health system, 20 hospitals, 8,000 beds, Epic EHR, dedicated quality and performance teams",
      industry: "Healthcare",
      dealSize: "$300K ARR",
      timeline: "120-day evaluation, 60-day implementation",
      stakeholders: [
        { role: "VP of Quality & Patient Safety", stance: "Champion — needs proactive quality monitoring" },
        { role: "CMO", stance: "Sponsor — accountable for clinical outcomes" },
        { role: "VP Analytics", stance: "Evaluator — technical assessment" },
        { role: "CFO", stance: "Economic buyer — value-based care contract risk" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "Quality team runs manual reviews weekly. No real-time monitoring for readmission trends or infection rates. Analysts produce 50+ recurring reports monthly.", status: "strong" },
        { criterion: "Problem", finding: "Sepsis mortality trend detected 3 weeks late last year. Readmission patterns only visible in monthly reports. Quality team overwhelmed with manual monitoring.", status: "strong" },
        { criterion: "Implication", finding: "Late detection of sepsis trend affected 30+ patients. CMS penalties for preventable readmissions: $2.5M risk. Quality team can't focus on improvement programs.", status: "strong" },
        { criterion: "Need-Payoff", finding: "VP Quality: 'AI agents that monitor quality continuously and alert us before trends become crises would save lives and money.' CMO wants proactive clinical quality management.", status: "strong" },
      ],
      outcome: "Closed-won in 100 days. Quality monitoring agents deployed first. Operational agents (bed management, staffing) added in Phase 2.",
      lessonsLearned: [
        "Patient safety angle elevated the conversation from IT project to clinical imperative",
        "HIPAA compliance and on-prem deployment were prerequisites for clinical data agents",
        "Starting with quality monitoring (not clinical decision support) avoided regulatory complexity",
      ],
    },
    retail: {
      companyProfile: "Omnichannel retailer, 200 stores + e-commerce, $1B revenue, Shopify + SAP + Salesforce, 6-person analytics team",
      industry: "Retail & E-Commerce",
      dealSize: "$175K ARR",
      timeline: "60-day evaluation, 30-day implementation",
      stakeholders: [
        { role: "VP of Retail Operations", stance: "Champion — wants proactive store performance monitoring" },
        { role: "Chief Merchandising Officer", stance: "Sponsor — needs early trend detection" },
        { role: "VP E-Commerce", stance: "Evaluator — wants automated performance alerting" },
        { role: "CFO", stance: "Economic buyer — margin improvement funding" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "Manual weekly reports for store and e-commerce performance. Basic Shopify alerts for stockouts. No proactive trend detection. 6 analysts running recurring reports.", status: "strong" },
        { criterion: "Problem", finding: "Black Friday stockout detected 6 hours late (missed $500K in revenue). Pricing errors take 24+ hours to identify. No early warning for demand shifts.", status: "strong" },
        { criterion: "Implication", finding: "Estimated $3M annual impact from reactive operations. Analysts spend 70% on monitoring vs. strategic analysis. Competitive response time is too slow.", status: "strong" },
        { criterion: "Need-Payoff", finding: "VP Ops: 'Agents that watch every store and alert managers before issues hit customers would be game-changing.' CMO wants early trend detection to adjust promotions in real-time.", status: "strong" },
      ],
      outcome: "Closed-won in 50 days. Inventory and pricing monitoring agents deployed first. Marketing performance agents added in month 2.",
      lessonsLearned: [
        "Black Friday incident was the catalyst — quantifiable lost revenue made the business case easy",
        "Federated connection to Shopify + SAP + Salesforce was the technical differentiator",
        "Store manager adoption was driven by Slack integration — insights delivered where they work",
      ],
    },
    manufacturing: {
      companyProfile: "Chemical manufacturer, 3 plants, $600M revenue, SAP + OSIsoft PI + custom MES, 5-person analytics team",
      industry: "Manufacturing",
      dealSize: "$200K ARR",
      timeline: "90-day evaluation, 45-day implementation",
      stakeholders: [
        { role: "VP of Manufacturing", stance: "Champion — wants proactive quality and maintenance monitoring" },
        { role: "COO", stance: "Sponsor — unplanned downtime is the #1 operational issue" },
        { role: "Quality Manager", stance: "Evaluator — needs automated SPC alerting" },
        { role: "VP Finance", stance: "Economic buyer — funding from downtime reduction savings" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "OSIsoft PI for process data, SAP for production orders, custom MES. Manual SPC reviews daily. No predictive quality or maintenance alerting.", status: "strong" },
        { criterion: "Problem", finding: "Batch failure last month went undetected for 4 hours — $800K in waste. Equipment degradation patterns not detected until failure. Manual monitoring can't scale.", status: "strong" },
        { criterion: "Implication", finding: "12 unplanned downtime events last year costing $5M. Annual scrap from late quality detection: $2M. Engineers spend 50% time on monitoring.", status: "strong" },
        { criterion: "Need-Payoff", finding: "COO: 'If agents could detect equipment degradation and quality drift before failures, we'd save millions.' VP Mfg wants autonomous alerts that trigger maintenance work orders.", status: "strong" },
      ],
      outcome: "Closed-won in 75 days. Quality monitoring agents at primary plant first. Predictive maintenance agents in Phase 2. Full rollout to all 3 plants in 6 months.",
      lessonsLearned: [
        "The $800K batch failure incident created executive urgency",
        "Connecting OSIsoft PI + SAP without middleware was the key technical differentiator",
        "Guardrails were important — agents alert and recommend, they don't control processes",
      ],
    },
    government: {
      companyProfile: "State health & human services agency, 3,000 employees, managing $8B in benefit programs",
      industry: "Government",
      dealSize: "$350K ARR (3-year contract)",
      timeline: "180-day procurement, 90-day implementation",
      stakeholders: [
        { role: "Director of Program Integrity", stance: "Champion — mandate to reduce improper payments" },
        { role: "Agency Secretary", stance: "Sponsor — legislative pressure on fraud prevention" },
        { role: "CISO", stance: "Evaluator — citizen data security requirements" },
        { role: "Budget Director", stance: "Economic buyer — ROI must exceed 3:1 for approval" },
      ],
      criteriaMapping: [
        { criterion: "Situation", finding: "Legacy SAS-based fraud detection. Manual reviews for 5% of claims. No proactive monitoring for benefit programs. 20 analysts on manual reporting.", status: "strong" },
        { criterion: "Problem", finding: "Improper payments: $200M+ annually. Fraud patterns detected in annual audit, not real-time. Manual reviews can't keep pace with claims volume.", status: "strong" },
        { criterion: "Implication", finding: "Legislative audit found $200M in improper payments. Public trust declining. Inspector General investigation pending. Recovery rate is only 15% for late-detected fraud.", status: "strong" },
        { criterion: "Need-Payoff", finding: "Director: 'AI agents monitoring claims in real-time could prevent improper payments before they happen.' Secretary needs to show legislature concrete fraud reduction.", status: "strong" },
      ],
      outcome: "Closed-won after 160-day procurement. Claims monitoring agents deployed for largest benefit program. Expanded to all programs over 18 months.",
      lessonsLearned: [
        "Legislative audit finding was the catalyst — timing the proposal to match audit response was key",
        "3:1 ROI requirement was easily met with $200M improper payment baseline",
        "On-prem deployment with citizen data encryption was a mandatory requirement",
      ],
    },
  },
};

export function getSpinExample(
  productId: ProductId,
  industryId: IndustryId
): QualifiedOpportunityExample {
  return spinExamples[productId]?.[industryId] ?? spinExamples["conversational-bi"]["financial-services"];
}
