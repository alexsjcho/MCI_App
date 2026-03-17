import type { ProductId } from "./products";
import type { IndustryId } from "./industries";
import type { FrameworkCriterion, QualifiedOpportunityExample } from "./types";

// ─── MEDDPICC Criteria Definitions ───

const meddpiccBase: Pick<FrameworkCriterion, "id" | "name" | "abbreviation" | "definition">[] = [
  {
    id: "metrics",
    name: "Metrics",
    abbreviation: "M",
    definition:
      "The quantifiable measures of value the customer will gain from your solution. Strong metrics connect your solution to their business objectives with specific, measurable outcomes.",
  },
  {
    id: "economic-buyer",
    name: "Economic Buyer",
    abbreviation: "E",
    definition:
      "The individual with the authority to approve the budget and make the final purchasing decision. Identifying and engaging the economic buyer early is critical to deal velocity.",
  },
  {
    id: "decision-criteria",
    name: "Decision Criteria",
    abbreviation: "D",
    definition:
      "The formal and informal standards the organization uses to evaluate and compare solutions. Understanding and influencing these criteria ensures your solution is positioned favorably.",
  },
  {
    id: "decision-process",
    name: "Decision Process",
    abbreviation: "D",
    definition:
      "The steps, timeline, stakeholders, and approvals required to make a purchasing decision. Mapping this process helps you forecast accurately and avoid surprises.",
  },
  {
    id: "paper-process",
    name: "Paper Process",
    abbreviation: "P",
    definition:
      "The legal, procurement, and administrative steps required to finalize a contract after a decision is made. Understanding the paper process prevents deal slippage at the finish line.",
  },
  {
    id: "identify-pain",
    name: "Identify Pain",
    abbreviation: "I",
    definition:
      "The specific, compelling business pain that creates urgency to act. Pain should be tied to measurable business impact and felt by someone with influence to drive change.",
  },
  {
    id: "champion",
    name: "Champion",
    abbreviation: "C",
    definition:
      "An internal advocate with power and influence who actively sells on your behalf within the organization. A true champion has access, credibility, and personal motivation to see the deal succeed.",
  },
  {
    id: "competition",
    name: "Competition",
    abbreviation: "C",
    definition:
      "Any alternative the customer is considering, including direct competitors, status quo, internal builds, and doing nothing. Understanding competition helps you differentiate and position strategically.",
  },
];

// ─── Product + Industry specific MEDDPICC content ───

type MeddpiccContent = {
  howToQualify: string;
  discoveryQuestions: string[];
  redFlags: string[];
};

type MeddpiccMap = Record<ProductId, Record<IndustryId, Record<string, MeddpiccContent>>>;

const meddpiccContent: MeddpiccMap = {
  "conversational-bi": {
    "financial-services": {
      metrics: {
        howToQualify: "Quantify the current cost of BI operations (analyst salaries, tool licenses) and the business impact of slow reporting. Key metrics: report turnaround time, analyst utilization, number of ad-hoc requests per month, compliance reporting accuracy.",
        discoveryQuestions: [
          "What's the average turnaround time for an ad-hoc data request, and how many do you get per month?",
          "How many FTE analysts are dedicated to recurring reporting vs. strategic analysis?",
          "What's the annual cost of your BI operations (people, tools, infrastructure)?",
          "Have you quantified the business impact of delayed or inaccurate reporting?",
        ],
        redFlags: [
          "They can't quantify the cost of the status quo — no baseline metrics exist",
          "The expected ROI is too small to justify a new platform (<$100K annual value)",
          "They want to measure success by 'adoption rates' only, not business outcomes",
        ],
      },
      "economic-buyer": {
        howToQualify: "In financial services, the economic buyer for analytics is typically the CFO, CDO, or COO. Identify who controls the analytics/BI budget and who has the authority to approve a platform purchase. Ensure they have a direct connection to the pain.",
        discoveryQuestions: [
          "Who ultimately approves budget for analytics and BI platform investments?",
          "Does this person experience the pain of slow reporting directly or through their team?",
          "What other initiatives are competing for this budget this quarter?",
          "What's the approval threshold before this needs board or committee sign-off?",
        ],
        redFlags: [
          "No access to the economic buyer — blocked by middle management",
          "The economic buyer has no awareness of or interest in the analytics problem",
          "Budget is controlled by IT/procurement with no line-of-business influence",
          "The economic buyer just approved a competing solution within the last 12 months",
        ],
      },
      "decision-criteria": {
        howToQualify: "Financial services organizations typically evaluate on: accuracy/trust, security/compliance (SOC 2, HIPAA), data federation capability, governance/RBAC, scalability, and total cost of ownership. Map their formal evaluation criteria and identify areas where WisdomAI has an advantage.",
        discoveryQuestions: [
          "What criteria will you use to evaluate analytics platforms — is there a formal scorecard?",
          "How important is security certification (SOC 2 Type II, HIPAA) in your evaluation?",
          "Is the ability to query data without moving it to a central warehouse important to you?",
          "How will you evaluate accuracy and trustworthiness of AI-generated answers?",
        ],
        redFlags: [
          "Decision criteria are heavily weighted toward features WisdomAI doesn't excel at (e.g., pixel-perfect report design)",
          "They require certifications WisdomAI doesn't yet have",
          "Criteria were written by a competitor or incumbent to favor their solution",
          "No formal evaluation criteria exist — the decision will be purely political",
        ],
      },
      "decision-process": {
        howToQualify: "Map the complete decision journey: who evaluates, who recommends, who approves, and what committees or reviews are required. In financial services, expect IT security review, compliance review, and potentially board approval for larger deals.",
        discoveryQuestions: [
          "Can you walk me through the steps from today to a signed contract?",
          "Who needs to be involved in the evaluation, and what's each person's role?",
          "Are there any committee reviews or board approvals required?",
          "What's your target timeline for making a decision, and what could delay it?",
        ],
        redFlags: [
          "No clear process — 'we'll figure it out as we go'",
          "The process includes steps that will take longer than their stated timeline",
          "Key stakeholders haven't been identified or engaged yet",
          "There's a formal RFP requirement they haven't disclosed",
        ],
      },
      "paper-process": {
        howToQualify: "Understand procurement, legal, and compliance review requirements. Financial services firms often have extensive vendor onboarding, due diligence, and contract review processes.",
        discoveryQuestions: [
          "What does your vendor onboarding and due diligence process look like?",
          "How long does a typical contract review take with your legal team?",
          "Are there specific procurement rules or preferred vendor requirements?",
          "Who signs the contract, and is that the same person who approves the budget?",
        ],
        redFlags: [
          "Procurement requires a formal RFP that hasn't started",
          "Legal review typically takes 60+ days and they want to deploy in 30",
          "They can't describe the paper process — nobody has gone through it recently",
          "Vendor onboarding includes requirements (e.g., insurance levels) that may cause delays",
        ],
      },
      "identify-pain": {
        howToQualify: "Uncover specific, urgent pain tied to business outcomes. The best pains are ones with a recent triggering event: a compliance failure, a missed market opportunity due to slow data, or a key executive frustrated enough to sponsor change.",
        discoveryQuestions: [
          "What specific event or situation made you start looking for a new analytics approach?",
          "Who is feeling this pain most acutely — and what does it cost them personally?",
          "What happens if you don't solve this problem in the next 6 months?",
          "Is this pain getting worse, stable, or improving on its own?",
        ],
        redFlags: [
          "No specific triggering event — this is a 'nice to have' exploration",
          "The pain is felt only by analysts, not by business leaders with budget authority",
          "The pain could be solved by hiring more analysts or upgrading existing tools",
          "They've been 'looking' for over a year with no urgency to decide",
        ],
      },
      champion: {
        howToQualify: "A true champion has three qualities: access to the economic buyer, credibility within the organization, and personal motivation to see this succeed. Test their championship by asking them to take specific actions (schedule meetings, share internal documents, advocate in meetings).",
        discoveryQuestions: [
          "How would this solution's success impact your role and career goals?",
          "Can you help us understand the internal dynamics — who supports this and who might resist?",
          "Would you be willing to introduce us to [economic buyer] and advocate for this approach?",
          "If there's internal pushback, how would you handle it?",
        ],
        redFlags: [
          "They can't or won't schedule a meeting with the economic buyer",
          "They don't have organizational credibility (too junior, too new, wrong department)",
          "No personal stake in the outcome — 'it's my boss who wants this'",
          "They agree to everything but never follow through on action items",
        ],
      },
      competition: {
        howToQualify: "Identify all alternatives: Power BI Copilot, Tableau Pulse/Einstein, ThoughtSpot, internal builds on existing DW, and the most common competitor — status quo / doing nothing. Position WisdomAI's Adaptive Context Engine and federated architecture as differentiators.",
        discoveryQuestions: [
          "What other solutions are you evaluating, and where are you in those evaluations?",
          "Have you considered expanding your current BI platform (e.g., Power BI Copilot, Tableau Pulse)?",
          "Is 'do nothing and hire more analysts' a realistic alternative in this budget cycle?",
          "What would make you choose one solution over another — what's the single most important factor?",
        ],
        redFlags: [
          "Strong incumbent with a Copilot/AI add-on that's 'good enough'",
          "They're in a late-stage evaluation with a competitor and we're being brought in as leverage",
          "The RFP criteria were written by or with heavy influence from a competitor",
          "Internal team is building a custom solution and has executive support",
        ],
      },
    },
    healthcare: {
      metrics: {
        howToQualify: "Quantify BI team cost, report turnaround time, quality measure compilation time, and the financial impact of delayed reporting. Healthcare-specific metrics include CMS penalty risk, value-based care contract performance, and analyst FTE cost.",
        discoveryQuestions: [
          "How many analyst FTEs are dedicated to recurring reporting, and what's the fully loaded cost?",
          "What's the turnaround time for quality measure compilation, and what's the CMS penalty risk?",
          "How many ad-hoc data requests does your analytics team handle per month?",
          "What's the financial impact of your value-based care contracts, and how does analytics performance affect them?",
        ],
        redFlags: [
          "No baseline metrics on BI team cost or report turnaround time",
          "Expected value is too small relative to implementation effort",
          "They measure success only by 'user satisfaction' with no business outcome metrics",
        ],
      },
      "economic-buyer": {
        howToQualify: "In healthcare, the economic buyer is typically the CFO, CIO, or COO. For clinical use cases, the CMO may co-sponsor. Identify who controls the analytics budget and confirm they feel the pain.",
        discoveryQuestions: [
          "Who approves analytics platform investments — is it your CFO, CIO, or a committee?",
          "Does this person directly feel the impact of slow or inaccurate reporting?",
          "What's the budget approval process for a platform of this size?",
          "Are there competing priorities for this budget (e.g., EHR upgrades, clinical systems)?",
        ],
        redFlags: [
          "Economic buyer is fully focused on EHR investment with no bandwidth for analytics",
          "Budget is controlled by IT with no clinical or operational influence",
          "The economic buyer hasn't been briefed on the initiative",
          "Budget is frozen due to financial pressures or merger activity",
        ],
      },
      "decision-criteria": {
        howToQualify: "Healthcare evaluations prioritize: HIPAA compliance, EHR integration, data accuracy, deployment flexibility (on-prem/VPC), and ability to work across clinical and operational data. Map the formal evaluation criteria.",
        discoveryQuestions: [
          "What are your mandatory requirements for a healthcare analytics platform?",
          "How important is HIPAA compliance and on-premise deployment capability?",
          "Will you evaluate the platform's ability to integrate with your EHR and other clinical systems?",
          "How will you test accuracy — will there be a formal benchmarking process?",
        ],
        redFlags: [
          "Mandatory requirement for EHR-native integration that WisdomAI doesn't currently support",
          "Evaluation criteria heavily weighted toward features like clinical decision support",
          "No formal evaluation criteria — decision will be based on relationships",
          "Criteria require certifications or compliance standards WisdomAI hasn't achieved",
        ],
      },
      "decision-process": {
        howToQualify: "Map the evaluation process including IT review, clinical governance, HIPAA/security review, and budget approval. Healthcare typically involves more stakeholders and longer cycles than other industries.",
        discoveryQuestions: [
          "What are the steps from evaluation to deployment, and who's involved at each step?",
          "Is there a clinical governance or HIPAA review required for new analytics platforms?",
          "What's the IT security review process, and how long does it typically take?",
          "Are there any committee approvals required (e.g., IT governance, clinical informatics)?",
        ],
        redFlags: [
          "They haven't engaged IT security or clinical governance yet",
          "The process requires committee approvals that only meet quarterly",
          "No clear decision timeline or owner",
          "They're mid-EHR migration with a freeze on new platform evaluations",
        ],
      },
      "paper-process": {
        howToQualify: "Healthcare procurement involves BAA (Business Associate Agreement) for HIPAA, vendor security assessments, legal review, and potentially GPO (Group Purchasing Organization) requirements.",
        discoveryQuestions: [
          "Do you require a Business Associate Agreement (BAA) for analytics vendors?",
          "What does your vendor security assessment process involve?",
          "Is your organization part of a GPO that has preferred analytics vendors?",
          "How long does a typical contract negotiation take for a platform of this nature?",
        ],
        redFlags: [
          "GPO contract requirement that excludes WisdomAI",
          "BAA requirements that go beyond standard HIPAA terms",
          "Legal review backlog of 90+ days",
          "Procurement requires a formal RFI/RFP process that hasn't begun",
        ],
      },
      "identify-pain": {
        howToQualify: "Look for specific, urgent pain: CMS quality penalty risk, analyst team overwhelmed, clinical leaders making decisions on stale data, or a recent incident where delayed analytics caused problems.",
        discoveryQuestions: [
          "What event or situation triggered this analytics initiative?",
          "Who is most affected by the current analytics gaps — and what does it cost them?",
          "What's at risk if you don't improve your analytics capabilities in the next 6-12 months?",
          "Is this pain getting worse — are new quality measures, growth, or regulations making it harder?",
        ],
        redFlags: [
          "No triggering event — this is an exploratory initiative with no urgency",
          "The pain is limited to the analytics team, not felt by clinical or operational leaders",
          "The problem could be solved by expanding their EHR analytics module",
          "They've been evaluating for over a year with no decision timeline",
        ],
      },
      champion: {
        howToQualify: "The ideal healthcare champion is a VP of Analytics, CMO, or operational leader with budget influence and frustration with the status quo. Test their championship through specific actions.",
        discoveryQuestions: [
          "How does solving this analytics challenge impact your team and your goals?",
          "Would you be willing to advocate for this approach in your governance committees?",
          "Can you help us navigate the clinical and IT stakeholders who need to be involved?",
          "If we do a pilot, would you commit your team's time and data access to make it succeed?",
        ],
        redFlags: [
          "The champion is an analyst with no budget authority or executive access",
          "They agree to advocate but never take action",
          "They're new to the organization and haven't built credibility yet",
          "Their motivation is personal (resume building) not organizational",
        ],
      },
      competition: {
        howToQualify: "Healthcare competition includes: Epic Cogito/Caboodle expansion, Tableau/Power BI in healthcare, Health Catalyst, Arcadia, internal data warehouse builds, and status quo. Position WisdomAI's federated architecture and contextual accuracy.",
        discoveryQuestions: [
          "Are you considering expanding your EHR's native analytics capabilities (e.g., Epic Cogito)?",
          "What other analytics platforms are in your evaluation, and how far along are those discussions?",
          "Have you considered a healthcare-specific analytics vendor like Health Catalyst?",
          "Is building a custom solution on your data warehouse a realistic alternative?",
        ],
        redFlags: [
          "Strong Epic partnership and Cogito expansion is the preferred path",
          "They're in a late-stage evaluation with Health Catalyst or similar healthcare-specific vendor",
          "IT is building a custom analytics layer and has executive support",
          "They view AI analytics as too risky for clinical data",
        ],
      },
    },
    retail: {
      metrics: {
        howToQualify: "Quantify metrics around: report turnaround time, analyst cost, time to merchandising insights, impact of data-driven vs. intuition-based decisions on sales and margins.",
        discoveryQuestions: [
          "What's the average time for a category manager to get an ad-hoc analysis?",
          "How many analyst FTEs support merchandising, marketing, and operations reporting?",
          "Can you quantify the margin impact of faster vs. slower merchandising decisions?",
          "What's the annual cost of your analytics operations?",
        ],
        redFlags: ["No baseline metrics exist", "Expected ROI is marginal for a mid-market retailer", "They only care about dashboard count, not business outcome metrics"],
      },
      "economic-buyer": {
        howToQualify: "Retail economic buyers are typically the CFO, CTO, or Chief Merchandising Officer. Identify who controls analytics budget and has urgency around data-driven decisions.",
        discoveryQuestions: ["Who approves analytics platform investments?", "Does this person directly feel the pain of slow or siloed data?", "What budget does this come from — IT, merchandising, or corporate?", "What other investments are competing for this budget?"],
        redFlags: ["Economic buyer is focused on store operations/supply chain tech, not analytics", "No executive champion for data democratization", "Budget is frozen or committed to other platforms"],
      },
      "decision-criteria": {
        howToQualify: "Retail evaluations prioritize: speed of deployment, ability to unify online/offline data, business user usability, and integration with e-commerce/ERP/marketing platforms.",
        discoveryQuestions: ["What are your must-have criteria for an analytics platform?", "How important is the ability to query across online and offline data without consolidation?", "Will you evaluate business user usability — not just IT technical requirements?", "How will you benchmark accuracy for retail-specific metrics?"],
        redFlags: ["Criteria favor a specific vendor (e.g., Looker required by Google Cloud commitment)", "They need capabilities WisdomAI doesn't offer (e.g., demand forecasting engine)", "No formal evaluation criteria"],
      },
      "decision-process": {
        howToQualify: "Map the retail evaluation process. Retail tends to have faster procurement cycles than financial services or healthcare, but may involve merchandising, marketing, IT, and finance stakeholders.",
        discoveryQuestions: ["What are the steps to go from evaluation to deployment?", "Who are the key stakeholders and what's each person's role?", "What's your target timeline for a decision?", "Is there a POC or pilot phase required before purchase?"],
        redFlags: ["No clear decision process or timeline", "Too many stakeholders with conflicting priorities", "They want a 'free trial' with no commitment to evaluate"],
      },
      "paper-process": {
        howToQualify: "Retail procurement is typically faster than healthcare or government. Understand standard contract terms, IT security review, and any preferred vendor list requirements.",
        discoveryQuestions: ["What does your standard vendor contract process look like?", "How long does IT security review typically take?", "Are there preferred vendor list requirements?", "Who signs the contract?"],
        redFlags: ["Complex procurement process unexpected for the deal size", "Legal review backlog", "Preferred vendor requirement that excludes WisdomAI"],
      },
      "identify-pain": {
        howToQualify: "Look for specific retail pain: missed merchandising opportunities due to slow data, inventory decisions on stale information, marketing teams unable to self-serve, or a recent event (seasonal miss, stockout) that created urgency.",
        discoveryQuestions: ["What triggered this search for a new analytics approach?", "Who feels this pain most — merchandising, marketing, operations?", "What's the cost of the status quo for the next 12 months?", "Has a recent event (seasonal miss, stockout, campaign failure) increased urgency?"],
        redFlags: ["No triggering event — browsing", "Pain is minor — could be solved with a small improvement to existing tools", "Only analysts feel the pain, not business leaders", "They've been looking for 12+ months with no decision"],
      },
      champion: {
        howToQualify: "Ideal retail champion is a VP of Analytics, Head of Merchandising, or similar business leader who is frustrated with the status quo and has executive access.",
        discoveryQuestions: ["How does solving this affect your team's performance and your goals?", "Would you advocate for this in your leadership meetings?", "Can you introduce us to the economic buyer?", "If we pilot, will you dedicate resources to make it succeed?"],
        redFlags: ["Champion is too junior to influence the decision", "They won't take action beyond attending demos", "No personal stake in the outcome", "They're leaving the company soon"],
      },
      competition: {
        howToQualify: "Retail competition includes: Looker (Google Cloud aligned), Tableau/Power BI, ThoughtSpot, Domo, and internal builds. Status quo (manual Excel/existing BI) is the most common competitor.",
        discoveryQuestions: ["What other solutions are you evaluating?", "Are you considering expanding your current BI platform?", "Is building a custom solution on your data platform realistic?", "What would make you choose one solution over another?"],
        redFlags: ["Strong Google Cloud partnership locking them into Looker", "Late-stage competitor evaluation", "Internal data team building custom solution", "Status quo is 'good enough' with no urgency to change"],
      },
    },
    manufacturing: {
      metrics: {
        howToQualify: "Quantify: analyst time on recurring reports, time to root cause analysis, cost of unplanned downtime, scrap/rework costs from late quality detection. Manufacturing metrics are often highly tangible and measurable.",
        discoveryQuestions: ["What's the average time for a root cause analysis, and how many does your team conduct per month?", "How much do your analysts cost annually for recurring operational reporting?", "Can you quantify the cost of unplanned downtime and preventable scrap?", "What's the annual cost of your analytics and reporting infrastructure?"],
        redFlags: ["Can't quantify operational costs — no baseline", "Expected ROI is too small for the plant scale", "They measure success by reports generated, not operational outcomes"],
      },
      "economic-buyer": {
        howToQualify: "Manufacturing economic buyers are typically the COO, VP of Operations, or CIO. Identify who controls the operational technology/analytics budget.",
        discoveryQuestions: ["Who approves investments in operational analytics?", "Does this person feel the pain of slow reporting or reactive operations?", "What budget pool does analytics come from — IT, operations, or excellence?", "What competing investments exist?"],
        redFlags: ["Economic buyer focused on capex (equipment), not analytics", "Budget controlled by IT with no operations input", "No executive sponsor for analytics modernization"],
      },
      "decision-criteria": {
        howToQualify: "Manufacturing evaluations prioritize: ability to connect ERP + MES + IoT data, real-time capability, plant floor usability, and deployment options. Map their formal criteria.",
        discoveryQuestions: ["What are your must-have requirements?", "How important is connecting ERP, MES, and sensor data in one platform?", "Will plant managers be evaluating usability?", "Do you require on-premise deployment?"],
        redFlags: ["Criteria favor MES vendors with embedded analytics", "They need real-time process control, not analytics", "Criteria written by IT without operations input"],
      },
      "decision-process": {
        howToQualify: "Map the manufacturing evaluation process. Expect operations, quality, IT, and finance involvement. Plant-level pilots are common before enterprise commitment.",
        discoveryQuestions: ["What's the evaluation process from here to deployment?", "Will there be a plant-level pilot before enterprise commitment?", "Who are the key stakeholders?", "What's the target timeline?"],
        redFlags: ["No clear process or timeline", "Pilot requires 6+ months before any purchase decision", "Too many stakeholders with no clear owner"],
      },
      "paper-process": {
        howToQualify: "Understand procurement requirements, IT security review, and any preferred vendor or approved technology list constraints.",
        discoveryQuestions: ["What's your standard procurement process?", "How long does IT security review take?", "Are there approved vendor list requirements?", "Who signs the contract?"],
        redFlags: ["Complex procurement for deal size", "Preferred vendor list excludes new entrants", "Legal review backlog"],
      },
      "identify-pain": {
        howToQualify: "Look for specific manufacturing pain: recent quality incident, costly unplanned downtime, supply chain disruption, or engineers overwhelmed with manual reporting.",
        discoveryQuestions: ["What triggered this initiative?", "Who feels this pain most — plant managers, quality, supply chain?", "What's the cost of the status quo annually?", "Has a recent incident increased urgency?"],
        redFlags: ["No triggering event", "Pain is minor — existing tools are 'good enough'", "Only IT cares, not operations", "Evaluating for 12+ months with no decision"],
      },
      champion: {
        howToQualify: "Ideal manufacturing champion is VP of Operations, Operations Excellence leader, or Quality Director with executive access and operational credibility.",
        discoveryQuestions: ["How does this impact your operational goals?", "Would you advocate for this with the COO?", "Can you sponsor a plant-level pilot?", "What internal resistance do you anticipate?"],
        redFlags: ["Champion is an IT analyst, not an operations leader", "No credibility with plant operations", "Agrees to everything but takes no action", "No personal stake in operational improvement"],
      },
      competition: {
        howToQualify: "Manufacturing competition includes: SAP Analytics Cloud, Tableau/Power BI, Seeq (process analytics), TrendMiner, internal builds on data lakes, and status quo.",
        discoveryQuestions: ["What other solutions are you evaluating?", "Are you considering expanding SAP Analytics Cloud?", "Is your IT team building custom analytics on your data lake?", "What's the single most important differentiator for your decision?"],
        redFlags: ["Strong SAP partnership locking them into SAP Analytics Cloud", "Late-stage evaluation with process analytics vendor", "Internal team building custom solution", "Status quo accepted as adequate"],
      },
    },
    government: {
      metrics: {
        howToQualify: "Quantify: analyst cost for recurring reports, legislative request response time, FOIA compliance metrics, and cross-agency data assembly costs. Government metrics often include compliance and transparency measures.",
        discoveryQuestions: ["How many FTEs are dedicated to recurring legislative and compliance reports?", "What's the average response time for a legislative data request?", "What's the annual cost of maintaining legacy reporting systems?", "Can you quantify the cost of cross-agency data assembly?"],
        redFlags: ["No baseline metrics exist", "ROI is hard to quantify in government terms", "Success is measured by compliance alone, not efficiency"],
      },
      "economic-buyer": {
        howToQualify: "Government economic buyers are typically the agency head, deputy secretary, or CFO/budget director. Political appointees may change, so build relationships at multiple levels.",
        discoveryQuestions: ["Who approves technology investments of this nature?", "Is budget allocated for analytics modernization?", "Does this require legislative or committee approval?", "What budget cycle are we working within?"],
        redFlags: ["No budget allocated — waiting for next fiscal year", "Political leadership transition pending", "Budget requires legislative approval that's uncertain", "Economic buyer is a political appointee with 6 months left in term"],
      },
      "decision-criteria": {
        howToQualify: "Government evaluations prioritize: security compliance (FedRAMP, StateRAMP), on-prem/VPC deployment, accessibility (Section 508), and vendor stability. Map the formal RFP criteria.",
        discoveryQuestions: ["Is FedRAMP or equivalent certification required?", "What security and compliance standards must be met?", "Is Section 508 accessibility a requirement?", "Will there be a formal RFP, and what are the key evaluation criteria?"],
        redFlags: ["FedRAMP certification required and WisdomAI doesn't have it (verify current status)", "Criteria favor an incumbent", "RFP criteria written by a competitor", "No formal criteria — political decision"],
      },
      "decision-process": {
        howToQualify: "Government decision processes are typically longer and more structured. Map the full procurement lifecycle: RFI, RFP, evaluation, vendor selection, contract negotiation, and deployment authorization.",
        discoveryQuestions: ["What's the procurement vehicle — open RFP, sole source, or existing contract vehicle?", "What are the evaluation steps and timeline?", "Who sits on the evaluation committee?", "Are there any pre-qualification requirements?"],
        redFlags: ["Full RFP process that takes 12+ months", "Procurement vehicle doesn't accommodate new vendors", "Evaluation committee stacked with incumbent supporters", "No clear timeline or procurement authority"],
      },
      "paper-process": {
        howToQualify: "Government contracting involves unique requirements: contract vehicles (GSA Schedule, GWACs), terms and conditions, insurance and bonding, and lengthy legal review.",
        discoveryQuestions: ["What contract vehicle will be used?", "Is GSA Schedule or a GWAC available?", "What are the standard terms and conditions for your agency?", "How long does contract negotiation typically take?"],
        redFlags: ["GSA Schedule required and WisdomAI isn't on it", "Contract negotiation typically takes 6+ months", "Unique government terms that will be difficult to agree to", "No clear procurement authority or contracting officer engaged"],
      },
      "identify-pain": {
        howToQualify: "Look for specific government pain: legislative audit findings, FOIA compliance issues, failed transparency initiatives, or a mandate from political leadership to modernize data capabilities.",
        discoveryQuestions: ["What triggered this analytics modernization initiative?", "Is there a legislative mandate or audit finding driving urgency?", "What's the cost of the status quo — both financial and reputational?", "What happens if you don't modernize analytics in the next 12 months?"],
        redFlags: ["No legislative mandate or audit finding — discretionary initiative", "Pain is abstract — 'we should modernize'", "No specific event creating urgency", "Leadership change could eliminate the mandate"],
      },
      champion: {
        howToQualify: "Government champions need both organizational credibility and political awareness. The ideal champion is a CDO, senior career official, or program director who will survive leadership transitions.",
        discoveryQuestions: ["How does this initiative align with your agency's strategic plan?", "Would you advocate for this through the procurement process?", "Can you help navigate the political and bureaucratic landscape?", "How long have you been in this role, and what's your tenure outlook?"],
        redFlags: ["Champion is a political appointee with uncertain tenure", "They have organizational credibility but no procurement influence", "They won't navigate internal politics", "Champion is new and hasn't built relationships"],
      },
      competition: {
        howToQualify: "Government competition includes: existing legacy BI (Cognos, MicroStrategy, Oracle BI), Tableau/Power BI (with government contracts), Palantir, custom builds, and status quo.",
        discoveryQuestions: ["What incumbent analytics platforms exist?", "Are there existing government contract vehicles favoring specific vendors?", "Is Palantir or similar government-focused vendor being considered?", "What would it take to displace the incumbent?"],
        redFlags: ["Strong incumbent with existing contract and political support", "Palantir has a pre-existing relationship and contract vehicle", "RFP criteria favor the incumbent", "Internal IT building custom solution on existing data platform"],
      },
    },
  },
  "ai-dashboards": {
    "financial-services": {
      metrics: { howToQualify: "Quantify: dashboard development time, BI team utilization on maintenance, executive reporting delays, number of unused dashboards, and cost of inconsistent metrics.", discoveryQuestions: ["How many dashboards exist and what percentage are actively used?", "What's the average development time for a new executive dashboard?", "How much of your BI team's time goes to dashboard maintenance vs. new development?", "What's the cost when board reports are late or contain inconsistent metrics?"], redFlags: ["No baseline metrics on dashboard operations", "Small number of dashboards — not enough pain to justify a platform", "Dashboard quality isn't a priority"] },
      "economic-buyer": { howToQualify: "CFO or CTO typically owns dashboard/BI budget in financial services. CFO may be personally affected if board reports are problematic.", discoveryQuestions: ["Who approves dashboard/BI platform investments?", "Is the executive who consumes dashboards also the budget holder?", "What competing priorities exist for this budget?", "What's the approval threshold?"], redFlags: ["Economic buyer satisfied with current dashboards", "Budget committed to other BI initiatives", "No executive dissatisfaction with current reporting"] },
      "decision-criteria": { howToQualify: "Evaluation criteria for dashboards focus on: visual quality, ease of creation, data accuracy, real-time refresh, governance, and executive usability.", discoveryQuestions: ["What criteria will you evaluate dashboard platforms on?", "How important is AI-generated vs. manually designed dashboards?", "Will executives participate in the evaluation?", "How will you benchmark dashboard accuracy and timeliness?"], redFlags: ["Criteria heavily weight design customization over AI generation", "Evaluation run by IT without executive input", "Criteria favor embedded BI in existing platforms"] },
      "decision-process": { howToQualify: "Map the evaluation: who evaluates, who decides, what reviews are required. Executive dashboard tools often have shorter cycles if CFO/CTO is the sponsor.", discoveryQuestions: ["What are the evaluation steps and timeline?", "Will executives test the platform personally?", "Are there committee approvals required?", "What could delay the decision?"], redFlags: ["No clear process", "Executive won't participate in evaluation", "IT controls the decision with no business input"] },
      "paper-process": { howToQualify: "Standard financial services procurement. May be simpler than a full analytics platform purchase if positioned as a dashboard/reporting tool.", discoveryQuestions: ["What's the standard procurement process?", "How long does legal review take?", "Are there preferred vendor requirements?", "Who signs the contract?"], redFlags: ["Complex procurement for deal size", "Legal review takes 60+ days", "Preferred vendor list issue"] },
      "identify-pain": { howToQualify: "Look for: board report quality issues, CFO frustrated with reporting delays, BI team overwhelmed, dashboard sprawl with inconsistent metrics.", discoveryQuestions: ["What triggered this search?", "Who feels dashboard pain most — executives, BI team, or business users?", "What's the cost of the current state?", "Has a specific incident increased urgency?"], redFlags: ["No triggering event", "Pain is minor", "Only BI team cares", "Evaluating for 12+ months"] },
      champion: { howToQualify: "Ideal champion is SVP of BI, CFO's chief of staff, or similar with executive access and frustration with dashboard status quo.", discoveryQuestions: ["How does this impact your goals?", "Would you advocate with the CFO/CTO?", "Can you demonstrate the problem to executives?", "Will you commit to a pilot?"], redFlags: ["Champion is junior BI analyst", "No executive access", "Agrees but doesn't act", "No personal motivation"] },
      competition: { howToQualify: "Competition: Tableau Pulse, Power BI Copilot dashboards, Sigma Computing, ThoughtSpot, and status quo (manual dashboard building).", discoveryQuestions: ["What other dashboard solutions are you evaluating?", "Are you considering AI features in your existing BI platform?", "Is 'keep building manually' a realistic option?", "What's the single most important factor in your decision?"], redFlags: ["Heavy investment in existing platform's AI features", "Late-stage competitor evaluation", "Internal team building dashboards and proud of their work", "Status quo is acceptable"] },
    },
    healthcare: {
      metrics: { howToQualify: "Quantify: dashboard backlog, time to build quality measure dashboards, BI team maintenance cost, number of stale/unused dashboards, and impact of delayed operational visibility.", discoveryQuestions: ["How many dashboard requests are in your backlog?", "What's the time to create a new quality measure dashboard?", "What percentage of dashboards are actively used?", "What's the annual cost of dashboard development and maintenance?"], redFlags: ["No baseline metrics", "Small dashboard footprint", "Dashboard quality not a leadership priority"] },
      "economic-buyer": { howToQualify: "COO or CIO in healthcare. CMO may co-sponsor for clinical quality dashboards.", discoveryQuestions: ["Who approves analytics platform investments?", "Does the COO/CMO consume dashboards personally?", "What budget pool covers this?", "What competing priorities exist?"], redFlags: ["Economic buyer focused on EHR, not analytics", "No budget for analytics tools", "Economic buyer not engaged"] },
      "decision-criteria": { howToQualify: "Healthcare dashboard evaluation criteria: HIPAA compliance, EHR data integration, clinical metric accuracy, real-time capability, and on-prem deployment.", discoveryQuestions: ["What are mandatory requirements?", "Is HIPAA compliance and on-prem deployment required?", "How will you evaluate clinical metric accuracy?", "Will clinical leaders participate in evaluation?"], redFlags: ["EHR-native dashboards required", "Criteria favor a specific vendor", "Clinical governance won't approve external dashboards"] },
      "decision-process": { howToQualify: "Map healthcare evaluation: IT review, clinical governance, HIPAA review, budget approval. Expect longer cycles.", discoveryQuestions: ["What are the evaluation steps?", "Is clinical governance review required?", "What's the HIPAA review process?", "What's the target timeline?"], redFlags: ["No process defined", "Clinical governance meets quarterly", "HIPAA review takes 6+ months"] },
      "paper-process": { howToQualify: "Healthcare procurement: BAA required, vendor security assessment, legal review, potential GPO involvement.", discoveryQuestions: ["Is a BAA required?", "What's the vendor security assessment process?", "Are you part of a GPO?", "How long does contracting take?"], redFlags: ["GPO restricts vendor choice", "BAA requirements beyond standard", "Legal review backlog"] },
      "identify-pain": { howToQualify: "Look for: operational leaders frustrated with stale dashboards, quality team can't track new measures, BI team overwhelmed with maintenance, CMS penalty risk.", discoveryQuestions: ["What triggered this initiative?", "Who feels the dashboard pain most?", "What's at risk if dashboards don't improve?", "Has a specific event increased urgency?"], redFlags: ["No triggering event", "Only BI team cares", "Pain is minor", "No timeline pressure"] },
      champion: { howToQualify: "Ideal champion: Director of BI, COO, or VP Quality with dashboard frustration and executive access.", discoveryQuestions: ["How does this impact your goals?", "Would you advocate in governance committees?", "Can you sponsor a pilot?", "What resistance do you anticipate?"], redFlags: ["Champion too junior", "No executive access", "Won't take action", "No personal stake"] },
      competition: { howToQualify: "Competition: Epic Cogito dashboards, Tableau in healthcare, Health Catalyst, Qlik, and status quo.", discoveryQuestions: ["What other solutions are you considering?", "Is Epic expanding its dashboard capabilities for your needs?", "Are healthcare-specific vendors in the mix?", "What's the most important factor?"], redFlags: ["Epic dashboards preferred", "Late-stage competitor evaluation", "Internal build underway"] },
    },
    retail: {
      metrics: { howToQualify: "Quantify: dashboard build time, BI team cost, executive reporting delays, and business impact of stale dashboards on merchandising decisions.", discoveryQuestions: ["How long does it take to build a new dashboard?", "What's the cost of your BI team on dashboard work?", "How does stale dashboard data affect merchandising decisions?", "What's the annual cost of dashboard operations?"], redFlags: ["No baseline metrics", "Small dashboard footprint", "Not a priority"] },
      "economic-buyer": { howToQualify: "CTO, CFO, or Chief Merchandising Officer typically. Identify who controls analytics budget.", discoveryQuestions: ["Who approves this budget?", "Does this person consume dashboards?", "What competing priorities exist?", "What's the approval process?"], redFlags: ["No executive cares about dashboards", "Budget committed elsewhere", "Economic buyer not engaged"] },
      "decision-criteria": { howToQualify: "Retail dashboard evaluations: speed of creation, cross-channel data unification, business user usability, mobile access, and integration with e-commerce/ERP.", discoveryQuestions: ["What are your must-have criteria?", "How important is cross-channel data in dashboards?", "Will business users evaluate usability?", "Do you need mobile dashboard access?"], redFlags: ["Criteria favor specific vendor", "Need capabilities WisdomAI doesn't offer", "No formal criteria"] },
      "decision-process": { howToQualify: "Map retail evaluation process. Typically faster than healthcare/government. May involve merchandising, marketing, IT, finance.", discoveryQuestions: ["What are the evaluation steps?", "Who's involved?", "What's the timeline?", "Is a pilot required?"], redFlags: ["No clear process", "Too many stakeholders", "No timeline"] },
      "paper-process": { howToQualify: "Retail procurement is typically straightforward. Standard contract, IT security review, potential preferred vendor requirements.", discoveryQuestions: ["What's your procurement process?", "How long does legal review take?", "Preferred vendor requirements?", "Who signs?"], redFlags: ["Unexpected complexity", "Legal backlog", "Preferred vendor issue"] },
      "identify-pain": { howToQualify: "Look for: category managers without self-serve dashboards, stale reports affecting decisions, BI team overwhelmed, executive frustration with reporting.", discoveryQuestions: ["What triggered this search?", "Who feels dashboard pain most?", "What's the cost of the status quo?", "Has a recent event increased urgency?"], redFlags: ["No trigger", "Minor pain", "Only BI team cares", "Looking for 12+ months"] },
      champion: { howToQualify: "Ideal champion: VP Analytics, Head of Merchandising, or similar with executive access and dashboard frustration.", discoveryQuestions: ["How does this impact your goals?", "Would you advocate with leadership?", "Can you sponsor a pilot?", "What resistance exists?"], redFlags: ["Too junior", "No executive access", "Won't act", "No personal stake"] },
      competition: { howToQualify: "Competition: Looker, Tableau, Power BI, Domo, Sigma, and status quo.", discoveryQuestions: ["What else are you evaluating?", "Considering expanding current BI?", "Is internal build realistic?", "What's the key differentiator?"], redFlags: ["Locked into vendor ecosystem", "Late-stage competitor", "Internal build preferred", "Status quo acceptable"] },
    },
    manufacturing: {
      metrics: { howToQualify: "Quantify: dashboard build time, cross-plant visibility gaps, BI team cost, and operational impact of delayed dashboard data.", discoveryQuestions: ["How long to build a new operational dashboard?", "What's the cost of BI team on dashboard maintenance?", "Can you quantify the impact of delayed operational visibility?", "How many dashboards exist and what percentage are used?"], redFlags: ["No metrics baseline", "Simple dashboard needs", "Not a priority"] },
      "economic-buyer": { howToQualify: "COO or VP Operations typically. May be CIO if analytics is IT-driven.", discoveryQuestions: ["Who approves this investment?", "Does this person use dashboards?", "What budget pool?", "Competing priorities?"], redFlags: ["Focused on capex", "IT-controlled with no ops input", "Not engaged"] },
      "decision-criteria": { howToQualify: "Manufacturing dashboard evaluation: real-time data, cross-system integration (ERP+MES+IoT), plant floor usability, on-prem deployment.", discoveryQuestions: ["Must-have requirements?", "Is real-time data required?", "Will plant managers evaluate?", "On-prem required?"], redFlags: ["MES vendor dashboards preferred", "Need process control features", "Criteria by IT only"] },
      "decision-process": { howToQualify: "Map evaluation: operations, quality, IT, finance involvement. Plant pilot before enterprise typical.", discoveryQuestions: ["Evaluation steps?", "Plant pilot first?", "Key stakeholders?", "Timeline?"], redFlags: ["No process", "6+ month pilot required", "No clear owner"] },
      "paper-process": { howToQualify: "Manufacturing procurement is typically straightforward but may involve IT security and approved vendor list.", discoveryQuestions: ["Procurement process?", "IT security review timeline?", "Approved vendor list?", "Who signs?"], redFlags: ["Complex for deal size", "Vendor list issue", "Legal backlog"] },
      "identify-pain": { howToQualify: "Look for: disconnected plant dashboards, no cross-plant comparison, stale data, manual Excel reporting, operational improvement mandate.", discoveryQuestions: ["What triggered this?", "Who feels pain most?", "Cost of status quo?", "Recent incident?"], redFlags: ["No trigger", "Minor pain", "Only IT cares", "Looking 12+ months"] },
      champion: { howToQualify: "Ideal: VP Operations Excellence, Quality Director, or Plant Manager with executive access.", discoveryQuestions: ["Impact on your goals?", "Would you advocate with COO?", "Sponsor pilot?", "Resistance expected?"], redFlags: ["IT analyst champion", "No ops credibility", "Won't act", "No stake"] },
      competition: { howToQualify: "Competition: SAP Analytics Cloud, Grafana, Tableau, Seeq, custom builds, status quo.", discoveryQuestions: ["Other solutions?", "SAP Analytics Cloud considered?", "Internal build?", "Key differentiator?"], redFlags: ["SAP lock-in", "Late-stage competitor", "Internal build preferred", "Status quo OK"] },
    },
    government: {
      metrics: { howToQualify: "Quantify: dashboard creation time, legacy system maintenance cost, legislative report response time, public transparency gaps.", discoveryQuestions: ["Time to create a new dashboard?", "Annual cost of legacy reporting systems?", "Legislative data request response time?", "How many dashboards exist and are used?"], redFlags: ["No metrics baseline", "Small reporting footprint", "Not a priority"] },
      "economic-buyer": { howToQualify: "Agency head, deputy secretary, or budget director. Political appointees may change.", discoveryQuestions: ["Who approves this investment?", "Budget allocated?", "Legislative approval needed?", "Budget cycle?"], redFlags: ["No budget", "Political transition", "Legislative approval uncertain", "Short appointee tenure"] },
      "decision-criteria": { howToQualify: "Government dashboard evaluation: security compliance, on-prem deployment, accessibility (508), vendor stability, FedRAMP.", discoveryQuestions: ["FedRAMP required?", "Security standards?", "508 accessibility required?", "Formal RFP criteria?"], redFlags: ["FedRAMP required and not available", "Criteria favor incumbent", "No formal criteria"] },
      "decision-process": { howToQualify: "Government procurement lifecycle: RFI, RFP, evaluation, selection, contract negotiation.", discoveryQuestions: ["Procurement vehicle?", "Evaluation steps and timeline?", "Committee?", "Pre-qualification?"], redFlags: ["12+ month RFP", "Vehicle excludes new vendors", "Committee favors incumbent", "No timeline"] },
      "paper-process": { howToQualify: "Government contracting: contract vehicles, GSA Schedule, terms and conditions, legal review.", discoveryQuestions: ["Contract vehicle?", "GSA Schedule available?", "Standard T&Cs?", "Contracting timeline?"], redFlags: ["GSA required but not available", "6+ month negotiation", "Difficult terms", "No contracting officer"] },
      "identify-pain": { howToQualify: "Look for: legislative mandate, audit findings, transparency requirements, legacy system frustration.", discoveryQuestions: ["Triggering event?", "Legislative mandate?", "Cost of status quo?", "What happens without improvement?"], redFlags: ["No mandate", "Abstract pain", "No urgency", "Leadership may change"] },
      champion: { howToQualify: "Career official (CDO, Director) who survives transitions and has procurement influence.", discoveryQuestions: ["Alignment with strategic plan?", "Advocate through procurement?", "Navigate politics?", "Tenure outlook?"], redFlags: ["Political appointee", "No procurement influence", "Won't navigate politics", "New to role"] },
      competition: { howToQualify: "Competition: legacy BI (Cognos, MicroStrategy), Tableau/Power BI with gov contracts, Palantir, custom builds.", discoveryQuestions: ["Incumbent platforms?", "Existing contract vehicles favoring vendors?", "Palantir considered?", "Displace incumbent how?"], redFlags: ["Strong incumbent contract", "Palantir pre-positioned", "RFP favors incumbent", "Internal build underway"] },
    },
  },
  "proactive-agents": {
    "financial-services": {
      metrics: { howToQualify: "Quantify: cost of delayed risk detection, analyst time on monitoring, alert actionability rate, and impact of missed events.", discoveryQuestions: ["What's the cost of your last delayed risk detection event?", "How many hours/week do analysts spend on recurring monitoring?", "What percentage of current alerts are actionable?", "What's the financial exposure from detection gaps?"], redFlags: ["No quantifiable incidents", "Very small monitoring footprint", "Can't measure alert effectiveness"] },
      "economic-buyer": { howToQualify: "COO, CRO, or Head of Technology. Must have urgency around monitoring and detection.", discoveryQuestions: ["Who approves monitoring/alerting investments?", "Does this person feel detection gaps?", "Budget source?", "Competing priorities?"], redFlags: ["Not a priority", "Budget committed elsewhere", "Not engaged"] },
      "decision-criteria": { howToQualify: "Financial services agent evaluations: accuracy, false positive rate, audit trail, guardrails, speed of detection, integration with existing systems.", discoveryQuestions: ["Must-have requirements?", "How important are guardrails and audit trails?", "What integration requirements exist?", "How will you evaluate false positive rates?"], redFlags: ["Require real-time trading actions (beyond monitoring)", "Criteria favor incumbent alerting", "Need capabilities not offered"] },
      "decision-process": { howToQualify: "Map: risk/compliance review, IT security, budget approval, POC phase. Financial services may require compliance sign-off.", discoveryQuestions: ["Evaluation steps?", "Compliance review required?", "IT security timeline?", "Target decision date?"], redFlags: ["No process", "Compliance won't approve AI monitoring", "No timeline"] },
      "paper-process": { howToQualify: "Standard financial services procurement. May involve additional compliance and risk vendor due diligence.", discoveryQuestions: ["Procurement process?", "Compliance vendor requirements?", "Legal review timeline?", "Who signs?"], redFlags: ["Complex compliance requirements", "Legal review 60+ days", "Vendor risk assessment issue"] },
      "identify-pain": { howToQualify: "Look for: recent missed risk event, compliance audit finding on monitoring, alert fatigue, analyst burnout from manual monitoring.", discoveryQuestions: ["What triggered this initiative?", "Recent missed event or audit finding?", "Cost of current monitoring gaps?", "Is the problem getting worse?"], redFlags: ["No triggering event", "Monitoring is 'good enough'", "Only IT interested", "No urgency"] },
      champion: { howToQualify: "Ideal: Head of Risk Analytics, CCO, or VP Risk Technology with detection gap frustration and executive access.", discoveryQuestions: ["Impact on your role?", "Advocate with CRO/COO?", "Sponsor pilot?", "Resistance expected?"], redFlags: ["Too junior", "No executive access", "Won't act", "No personal stake"] },
      competition: { howToQualify: "Competition: custom Python scripts, Splunk, Datadog, Bloomberg alerts, vendor-specific monitoring, status quo.", discoveryQuestions: ["Current alerting tools?", "Evaluating other platforms?", "Internal build considered?", "Key differentiator?"], redFlags: ["Recent major investment in alerting", "Internal quant team building custom", "Status quo acceptable"] },
    },
    healthcare: {
      metrics: { howToQualify: "Quantify: impact of late quality detection, CMS penalties, analyst time on monitoring, and patient safety event costs.", discoveryQuestions: ["Cost of last late-detected quality trend?", "CMS penalty risk from monitoring gaps?", "Analyst hours on recurring monitoring?", "Patient safety event costs?"], redFlags: ["No quantifiable incidents", "Small quality team", "Can't measure monitoring gaps"] },
      "economic-buyer": { howToQualify: "CMO, COO, or VP Quality. Must have urgency around quality monitoring and patient safety.", discoveryQuestions: ["Who approves this investment?", "Does this person feel quality monitoring gaps?", "Budget source?", "Competing priorities?"], redFlags: ["Focused on clinical technology", "No budget for monitoring", "Not engaged"] },
      "decision-criteria": { howToQualify: "Healthcare agent evaluation: HIPAA compliance, clinical accuracy, guardrails, on-prem deployment, EHR integration.", discoveryQuestions: ["Mandatory requirements?", "HIPAA and on-prem required?", "How will clinical accuracy be evaluated?", "Guardrail requirements?"], redFlags: ["EHR-native required", "Clinical governance won't approve AI agents", "Criteria beyond scope"] },
      "decision-process": { howToQualify: "Map: clinical governance, HIPAA review, IT security, budget approval. Healthcare has longer cycles.", discoveryQuestions: ["Evaluation steps?", "Clinical governance required?", "HIPAA review timeline?", "Target decision date?"], redFlags: ["No process", "Clinical governance quarterly", "HIPAA review 6+ months"] },
      "paper-process": { howToQualify: "Healthcare procurement: BAA, vendor security assessment, clinical governance approval, legal review.", discoveryQuestions: ["BAA required?", "Security assessment?", "GPO requirements?", "Contracting timeline?"], redFlags: ["GPO restricts choice", "BAA beyond standard", "Legal backlog"] },
      "identify-pain": { howToQualify: "Look for: recent patient safety event detected late, CMS quality penalties, quality team overwhelmed, accreditation findings.", discoveryQuestions: ["Triggering event?", "Recent safety or quality incident?", "Cost of current gaps?", "Getting worse?"], redFlags: ["No trigger", "Minor gaps", "Only quality team cares", "No urgency"] },
      champion: { howToQualify: "Ideal: VP Quality, CMO, or operational leader with patient safety urgency and executive access.", discoveryQuestions: ["Impact on your goals?", "Advocate with CMO/COO?", "Sponsor pilot?", "Resistance?"], redFlags: ["Too junior", "No clinical credibility", "Won't act", "No personal stake"] },
      competition: { howToQualify: "Competition: EHR-embedded surveillance, Vizient, Premier, custom clinical monitoring, status quo.", discoveryQuestions: ["Current monitoring tools?", "EHR surveillance expanding?", "Healthcare-specific vendors?", "Key differentiator?"], redFlags: ["EHR surveillance preferred", "Vizient/Premier in place", "Internal build", "Status quo OK"] },
    },
    retail: {
      metrics: { howToQualify: "Quantify: cost of reactive detection (stockouts, pricing errors), analyst time on monitoring, and revenue impact of slow response.", discoveryQuestions: ["Cost of last major stockout or pricing error?", "Analyst hours on recurring monitoring?", "Revenue impact of reactive vs. proactive operations?", "Current alert actionability rate?"], redFlags: ["No quantifiable incidents", "Small operation", "Can't measure impact"] },
      "economic-buyer": { howToQualify: "VP Operations, Chief Merchandising Officer, or CFO with urgency around proactive operations.", discoveryQuestions: ["Who approves this investment?", "Does this person feel reactive operations pain?", "Budget source?", "Competing priorities?"], redFlags: ["Not a priority", "Budget committed", "Not engaged"] },
      "decision-criteria": { howToQualify: "Retail agent evaluation: speed of detection, cross-channel coverage, integration with Slack/Teams, false positive rate, ease of configuration.", discoveryQuestions: ["Must-have requirements?", "Cross-channel monitoring needed?", "Integration requirements?", "How evaluate false positive rates?"], redFlags: ["Need demand forecasting engine", "Criteria favor supply chain tools", "Beyond scope"] },
      "decision-process": { howToQualify: "Map retail evaluation. Typically faster cycles. Operations, merchandising, IT, finance involvement.", discoveryQuestions: ["Evaluation steps?", "Key stakeholders?", "Timeline?", "Pilot required?"], redFlags: ["No process", "Too many stakeholders", "No timeline"] },
      "paper-process": { howToQualify: "Retail procurement is typically straightforward. Standard contract and IT security.", discoveryQuestions: ["Procurement process?", "Legal timeline?", "Vendor requirements?", "Who signs?"], redFlags: ["Unexpected complexity", "Legal backlog", "Vendor list issue"] },
      "identify-pain": { howToQualify: "Look for: major stockout event, pricing error incident, missed seasonal opportunity, analyst burnout.", discoveryQuestions: ["Triggering event?", "Recent incident (stockout, pricing error)?", "Cost of reactive operations?", "Getting worse?"], redFlags: ["No trigger", "Minor pain", "Only analytics team cares", "Looking 12+ months"] },
      champion: { howToQualify: "Ideal: VP Operations, Head of Merchandising, or analytics leader with operational frustration and executive access.", discoveryQuestions: ["Impact on your goals?", "Advocate with CMO/COO?", "Sponsor pilot?", "Resistance?"], redFlags: ["Too junior", "No ops access", "Won't act", "No stake"] },
      competition: { howToQualify: "Competition: supply chain alerting tools, custom scripts, Datadog for e-commerce, vendor-specific monitoring, status quo.", discoveryQuestions: ["Current alerting?", "Other platforms evaluated?", "Internal build?", "Key differentiator?"], redFlags: ["Recent alerting investment", "Internal build preferred", "Status quo acceptable"] },
    },
    manufacturing: {
      metrics: { howToQualify: "Quantify: unplanned downtime cost, scrap from late quality detection, engineer time on monitoring, and supply chain disruption impact.", discoveryQuestions: ["Annual cost of unplanned downtime?", "Scrap cost from late quality detection?", "Engineer hours on manual monitoring?", "Supply chain disruption cost?"], redFlags: ["Can't quantify costs", "Small operation", "Monitoring not measured"] },
      "economic-buyer": { howToQualify: "COO or VP Manufacturing with urgency around downtime reduction and quality improvement.", discoveryQuestions: ["Who approves this investment?", "Downtime reduction a priority?", "Budget source?", "Competing priorities?"], redFlags: ["Focused on equipment capex", "No ops analytics budget", "Not engaged"] },
      "decision-criteria": { howToQualify: "Manufacturing agent evaluation: real-time detection, IoT/MES integration, guardrails (alert vs. control), accuracy, and on-prem deployment.", discoveryQuestions: ["Must-have requirements?", "IoT/MES integration required?", "Alert-only or process control needed?", "On-prem required?"], redFlags: ["Need process control", "MES vendor preferred", "Beyond scope"] },
      "decision-process": { howToQualify: "Map: operations, quality, IT, finance. Plant pilot before enterprise commitment typical.", discoveryQuestions: ["Evaluation steps?", "Plant pilot first?", "Stakeholders?", "Timeline?"], redFlags: ["No process", "6+ month pilot", "No owner"] },
      "paper-process": { howToQualify: "Manufacturing procurement: standard process, IT security, possible approved vendor list.", discoveryQuestions: ["Procurement process?", "IT security?", "Vendor list?", "Who signs?"], redFlags: ["Complex for deal size", "Vendor list issue", "Legal backlog"] },
      "identify-pain": { howToQualify: "Look for: recent costly downtime, batch failure, quality incident, or supply chain disruption that created executive urgency.", discoveryQuestions: ["Triggering event?", "Recent costly incident?", "Annual cost of reactive operations?", "Getting worse?"], redFlags: ["No trigger", "Minor pain", "Only IT cares", "No urgency"] },
      champion: { howToQualify: "Ideal: VP Manufacturing, Plant Manager, or Quality Director with operational credibility and executive access.", discoveryQuestions: ["Impact on your goals?", "Advocate with COO?", "Sponsor plant pilot?", "Resistance?"], redFlags: ["IT champion only", "No ops credibility", "Won't act", "No stake"] },
      competition: { howToQualify: "Competition: OSIsoft/AVEVA, Seeq, custom Python, MES vendor alerting, predictive maintenance vendors, status quo.", discoveryQuestions: ["Current monitoring tools?", "Other platforms?", "Internal build?", "Key differentiator?"], redFlags: ["AVEVA invested", "Predictive maintenance vendor in place", "Internal build", "Status quo OK"] },
    },
    government: {
      metrics: { howToQualify: "Quantify: improper payment costs, fraud detection rate, analyst time on manual monitoring, and legislative/audit finding costs.", discoveryQuestions: ["Annual improper payment cost?", "Current fraud detection rate?", "Staff hours on manual monitoring?", "Cost of audit findings?"], redFlags: ["Can't quantify fraud losses", "Small programs", "Not measured"] },
      "economic-buyer": { howToQualify: "Agency head or budget director with mandate or audit finding driving urgency.", discoveryQuestions: ["Who approves this?", "Budget allocated?", "Legislative approval needed?", "Budget cycle?"], redFlags: ["No budget", "Political transition", "Approval uncertain", "Short tenure"] },
      "decision-criteria": { howToQualify: "Government agent evaluation: security (FedRAMP), on-prem, audit trails, citizen data protection, accessibility.", discoveryQuestions: ["FedRAMP required?", "Security standards?", "Audit trail requirements?", "Formal RFP criteria?"], redFlags: ["FedRAMP gap", "Criteria favor incumbent", "Beyond compliance"] },
      "decision-process": { howToQualify: "Government procurement: RFI, RFP, evaluation, selection, contracting. Longer cycles.", discoveryQuestions: ["Procurement vehicle?", "Evaluation steps?", "Committee?", "Timeline?"], redFlags: ["12+ month RFP", "Vehicle excludes new vendors", "Committee bias", "No timeline"] },
      "paper-process": { howToQualify: "Government contracting: contract vehicles, GSA, T&Cs, legal review.", discoveryQuestions: ["Contract vehicle?", "GSA available?", "T&Cs?", "Timeline?"], redFlags: ["GSA required not available", "6+ months negotiation", "Difficult terms"] },
      "identify-pain": { howToQualify: "Look for: legislative audit finding on fraud/waste, IG investigation, mandate for improved monitoring, public trust crisis.", discoveryQuestions: ["Triggering event?", "Audit finding or IG investigation?", "Cost of status quo?", "What happens without improvement?"], redFlags: ["No mandate", "Abstract pain", "No urgency", "Leadership may change"] },
      champion: { howToQualify: "Career official (Director of Program Integrity, CDO) with procurement influence and audit finding urgency.", discoveryQuestions: ["Alignment with strategic plan?", "Navigate procurement?", "Navigate politics?", "Tenure?"], redFlags: ["Political appointee", "No procurement influence", "Won't navigate", "New to role"] },
      competition: { howToQualify: "Competition: SAS fraud detection, Palantir, custom builds, legacy monitoring, status quo.", discoveryQuestions: ["Current tools?", "Other vendors?", "Palantir?", "Displace incumbent?"], redFlags: ["SAS entrenched", "Palantir positioned", "Internal build", "Status quo OK"] },
    },
  },
};

// ─── Build function ───

export function getMeddpiccCriteria(
  productId: ProductId,
  industryId: IndustryId
): FrameworkCriterion[] {
  const productContent = meddpiccContent[productId]?.[industryId];
  if (!productContent) return [];

  return meddpiccBase.map((base) => {
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

export const meddpiccExamples: ExampleMap = {
  "conversational-bi": {
    "financial-services": {
      companyProfile: "Global investment bank, $50B+ assets, 5,000 employees, Snowflake + Databricks + Power BI + Tableau mix",
      industry: "Financial Services",
      dealSize: "$500K ARR",
      timeline: "120-day evaluation, 60-day implementation",
      stakeholders: [
        { role: "CDO (Chief Data Officer)", stance: "Economic Buyer — owns analytics budget and strategy" },
        { role: "Head of Risk Analytics", stance: "Champion — 25-person team drowning in requests" },
        { role: "CTO", stance: "Technical evaluator — concerned about architecture and security" },
        { role: "CCO", stance: "Compliance evaluator — needs audit trail and governance" },
      ],
      criteriaMapping: [
        { criterion: "Metrics", finding: "$3.5M annual BI cost. 4-week avg. report turnaround. 200+ requests/month. 25 analysts at 70% utilization on recurring reports.", status: "strong" },
        { criterion: "Economic Buyer", finding: "CDO directly sponsors. Reports to CEO. Controls $15M analytics budget. Recently burned by a failed BI modernization.", status: "strong" },
        { criterion: "Decision Criteria", finding: "Accuracy >95%, SOC 2 Type II, federated data access, RBAC, scalability to 2,000+ users, TCO below current state.", status: "strong" },
        { criterion: "Decision Process", finding: "POC (4 weeks) → Technical review → Security review → Budget committee → Legal → Deployment. CDO owns the process.", status: "strong" },
        { criterion: "Paper Process", finding: "Standard vendor onboarding (2 weeks). Legal review (3 weeks). MSA template available. CDO signature authority up to $1M.", status: "strong" },
        { criterion: "Identify Pain", finding: "Risk team missed an exposure concentration that cost $8M. Triggered by board-level review of analytics capabilities. CDO's job depends on fixing this.", status: "strong" },
        { criterion: "Champion", finding: "Head of Risk Analytics. 15-year tenure. Trusted by CDO and CRO. Personally ran the POC. Advocated in 3 internal meetings.", status: "strong" },
        { criterion: "Competition", finding: "Power BI Copilot (incumbent add-on), ThoughtSpot, and internal Databricks notebook approach. WisdomAI won on accuracy and federated architecture.", status: "moderate" },
      ],
      outcome: "Closed-won in 110 days. Deployed to risk and compliance first (200 users). Expansion to trading and operations (2,000 users) planned for Q3.",
      lessonsLearned: [
        "The $8M loss event created undeniable urgency — always look for a costly triggering incident",
        "CDO's personal stakes (failed previous modernization) made this a must-win for them",
        "Competitive displacement required a formal accuracy benchmark — investing in the POC paid off",
        "Paper process was faster because CDO had signature authority — identify this early",
      ],
    },
    healthcare: {
      companyProfile: "Academic medical center network, 5 hospitals, 3,000 beds, Epic EHR, 20-person analytics team",
      industry: "Healthcare",
      dealSize: "$350K ARR",
      timeline: "150-day evaluation, 90-day implementation",
      stakeholders: [
        { role: "CFO", stance: "Economic Buyer — funding from operational efficiency budget" },
        { role: "VP Analytics", stance: "Champion — team at breaking point" },
        { role: "CMO", stance: "Co-sponsor — quality reporting urgency" },
        { role: "CISO", stance: "Technical gate — HIPAA compliance mandatory" },
      ],
      criteriaMapping: [
        { criterion: "Metrics", finding: "$2.5M annual analytics cost. 20 analysts. 300+ monthly reports. Quality measure compilation: 3 weeks. CMS penalty risk: $4M.", status: "strong" },
        { criterion: "Economic Buyer", finding: "CFO approved. Quality penalties are board-level issue. Budget from operational efficiency savings.", status: "strong" },
        { criterion: "Decision Criteria", finding: "HIPAA compliance, on-prem deployment, EHR integration, >95% accuracy, quality measure automation, RBAC.", status: "strong" },
        { criterion: "Decision Process", finding: "Clinical governance → IT security → HIPAA review → CFO budget approval → Legal → BAA → Deploy.", status: "strong" },
        { criterion: "Paper Process", finding: "BAA required (standard). Legal review 4 weeks. Clinical governance meets monthly.", status: "moderate" },
        { criterion: "Identify Pain", finding: "CMS quality penalties increased 40% last year. Quality team can't keep up. CMO cited it as top 3 operational risk.", status: "strong" },
        { criterion: "Champion", finding: "VP Analytics. 8-year tenure. Reports to CFO. Led clinical governance presentation. Committed team to 4-week POC.", status: "strong" },
        { criterion: "Competition", finding: "Epic Cogito expansion (primary), Health Catalyst, Tableau healthcare. Won on cross-system federation and contextual accuracy.", status: "moderate" },
      ],
      outcome: "Closed-won in 130 days. Quality reporting use case first. Expanded to operational analytics within 6 months.",
      lessonsLearned: [
        "CMS penalty escalation created board-level urgency that accelerated all approvals",
        "On-prem VPC deployment was the decisive factor in CISO approval",
        "Competitive win against Epic Cogito was about cross-system data (claims + clinical + operational)",
        "Clinical governance presentation by the champion was the critical internal selling moment",
      ],
    },
    retail: {
      companyProfile: "Multi-brand retailer, 800 stores + e-commerce, $3B revenue, Shopify + SAP + Salesforce, 12-person analytics team",
      industry: "Retail & E-Commerce",
      dealSize: "$280K ARR",
      timeline: "75-day evaluation, 30-day implementation",
      stakeholders: [
        { role: "CTO", stance: "Economic Buyer — data democratization is a board initiative" },
        { role: "VP Merchandising Analytics", stance: "Champion — needs faster category insights" },
        { role: "CMO", stance: "Co-sponsor — marketing self-service" },
        { role: "Head of IT Security", stance: "Technical evaluator" },
      ],
      criteriaMapping: [
        { criterion: "Metrics", finding: "$1.8M annual analytics cost. 12 analysts. Category insights take 5+ days. Marketing can't self-serve. Estimated 3% margin improvement from faster decisions.", status: "strong" },
        { criterion: "Economic Buyer", finding: "CTO has board mandate for data democratization. Budget approved for FY. Reports directly to CEO.", status: "strong" },
        { criterion: "Decision Criteria", finding: "Cross-channel data unification, business user usability, speed of deployment, Shopify/SAP integration, scalability.", status: "strong" },
        { criterion: "Decision Process", finding: "POC with top 5 categories → Business user testing → Security review → CTO approval → Legal. Fast cycle.", status: "strong" },
        { criterion: "Paper Process", finding: "Standard vendor terms. Legal review 2 weeks. CTO signature authority.", status: "strong" },
        { criterion: "Identify Pain", finding: "Missed Q4 seasonal trends in 3 categories — estimated $5M revenue impact. Board mandated data democratization.", status: "strong" },
        { criterion: "Champion", finding: "VP Merch Analytics. 6-year tenure. Strong relationship with CTO and CMO. Ran the category manager pilot personally.", status: "strong" },
        { criterion: "Competition", finding: "Looker (Google Cloud aligned), Tableau, internal Databricks notebooks. Won on federated cross-channel queries and business user experience.", status: "strong" },
      ],
      outcome: "Closed-won in 60 days. Deployed for merchandising and marketing. Full company rollout within 3 months.",
      lessonsLearned: [
        "Board mandate for data democratization created top-down urgency",
        "Q4 seasonal miss was the emotional anchor — used in every internal presentation",
        "Competitive win against Looker by demonstrating no-ETL cross-channel querying",
        "Fast paper process because CTO had pre-approved budget and authority",
      ],
    },
    manufacturing: {
      companyProfile: "Aerospace components manufacturer, 6 plants, $2B revenue, SAP + Siemens MES + OSIsoft PI, 10-person analytics team",
      industry: "Manufacturing",
      dealSize: "$250K ARR",
      timeline: "100-day evaluation, 60-day implementation",
      stakeholders: [
        { role: "COO", stance: "Economic Buyer — operational excellence mandate" },
        { role: "VP Operations Analytics", stance: "Champion — frustrated with disconnected systems" },
        { role: "VP Quality", stance: "Co-sponsor — root cause analysis speed" },
        { role: "CIO", stance: "Technical evaluator — integration requirements" },
      ],
      criteriaMapping: [
        { criterion: "Metrics", finding: "$1.5M analytics cost. Root cause analysis: 5 days avg. $8M annual scrap/rework. 10 analysts at 65% recurring reporting.", status: "strong" },
        { criterion: "Economic Buyer", finding: "COO owns operational excellence budget. Reports to CEO. Board KPI: 20% downtime reduction.", status: "strong" },
        { criterion: "Decision Criteria", finding: "SAP + MES + PI integration, plant floor usability, on-prem deployment, >95% accuracy, sub-minute query response.", status: "strong" },
        { criterion: "Decision Process", finding: "Plant pilot (6 weeks) → Engineering review → IT security → COO budget → Legal → Rollout plan.", status: "strong" },
        { criterion: "Paper Process", finding: "Standard procurement. IT security 3 weeks. COO authority for opex up to $500K.", status: "strong" },
        { criterion: "Identify Pain", finding: "Major quality escape last quarter — 3,000 defective parts shipped to OEM customer. $4M warranty claim + relationship damage.", status: "strong" },
        { criterion: "Champion", finding: "VP Ops Analytics. 12-year tenure. Trusted by COO and plant managers. Led pilot at flagship plant. Presented results to ops leadership.", status: "strong" },
        { criterion: "Competition", finding: "SAP Analytics Cloud, custom Databricks notebooks, Seeq. Won on cross-system federation and business user experience.", status: "moderate" },
      ],
      outcome: "Closed-won in 90 days. Flagship plant first. All 6 plants within 6 months.",
      lessonsLearned: [
        "Quality escape to OEM customer created existential urgency — board demanded root cause analytics improvement",
        "Plant pilot results (40% faster root cause analysis) were the key to enterprise commitment",
        "Competitive displacement of SAP Analytics Cloud by showing better cross-system integration",
        "COO's board KPI alignment made budget approval automatic",
      ],
    },
    government: {
      companyProfile: "Federal civilian agency, 8,000 employees, managing 25 national programs, $20B budget",
      industry: "Government",
      dealSize: "$750K ARR (5-year contract)",
      timeline: "240-day procurement, 120-day implementation",
      stakeholders: [
        { role: "Deputy Administrator", stance: "Economic Buyer — Congressional mandate for transparency" },
        { role: "Chief Data Officer", stance: "Champion — leading modernization initiative" },
        { role: "CIO", stance: "Technical evaluator — architecture and security" },
        { role: "Inspector General", stance: "Stakeholder — data access for oversight" },
      ],
      criteriaMapping: [
        { criterion: "Metrics", finding: "$5M annual legacy BI cost. 40+ analysts on reporting. Congressional data requests: 3+ weeks avg. 500+ recurring reports.", status: "strong" },
        { criterion: "Economic Buyer", finding: "Deputy Administrator with Congressional pressure. Budget from modernization fund. Reports to agency head.", status: "strong" },
        { criterion: "Decision Criteria", finding: "FedRAMP authorization (or path to), on-prem VPC, Section 508, FISMA compliance, vendor stability, scalability to 5,000 users.", status: "moderate" },
        { criterion: "Decision Process", finding: "RFI → RFP → Technical evaluation → Security assessment → Source selection → Contracting → ATO → Deploy.", status: "strong" },
        { criterion: "Paper Process", finding: "Federal procurement. Contract vehicle identified (BPA). Legal review 6+ weeks. Contracting officer assigned.", status: "moderate" },
        { criterion: "Identify Pain", finding: "GAO audit cited data timeliness issues. Congressional committee threatened budget cuts. Agency ranking dropped on FITARA scorecard.", status: "strong" },
        { criterion: "Champion", finding: "CDO. Career SES. 10-year agency tenure. Authored the modernization strategy. Led source selection committee.", status: "strong" },
        { criterion: "Competition", finding: "MicroStrategy (incumbent), Tableau with FedRAMP, Palantir. Won on AI conversational capability and cross-program data federation.", status: "moderate" },
      ],
      outcome: "Closed-won after 210-day procurement. Deployed to 5 largest programs. Full agency rollout over 3 years.",
      lessonsLearned: [
        "GAO audit finding + Congressional pressure created rare procurement urgency in government",
        "CDO as a career SES provided continuity through political transitions",
        "FedRAMP-ready VPC deployment was essential — full FedRAMP would have been a blocker without it",
        "Formal source selection process required extensive documentation — invest in proposal quality",
      ],
    },
  },
  "ai-dashboards": {
    "financial-services": { companyProfile: "Insurance company, $10B premiums, 3,000 employees, Cognos + Excel reporting", industry: "Financial Services", dealSize: "$200K ARR", timeline: "90-day cycle", stakeholders: [{ role: "CFO", stance: "Economic Buyer" }, { role: "VP BI", stance: "Champion" }, { role: "CRO", stance: "Sponsor" }, { role: "CTO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "250+ dashboards, 40% unused. $2M BI team cost. New dashboard: 4 weeks. Board reports: 5 days manual assembly.", status: "strong" }, { criterion: "Economic Buyer", finding: "CFO personally frustrated with board report quality and timeliness.", status: "strong" }, { criterion: "Identify Pain", finding: "Board meeting delayed because actuarial dashboard had incorrect reserve numbers.", status: "strong" }, { criterion: "Champion", finding: "VP BI, 10-year tenure, presented the problem to CFO, ran the evaluation.", status: "strong" }, { criterion: "Competition", finding: "Cognos modernization, Tableau, Power BI. Won on AI-generated dashboards and auto-summaries.", status: "moderate" }, { criterion: "Decision Criteria", finding: "SOC 2, accuracy, executive usability, auto-refresh, anomaly detection.", status: "strong" }, { criterion: "Decision Process", finding: "POC → CFO review → Security → Legal → Deploy. 90-day target.", status: "strong" }, { criterion: "Paper Process", finding: "Standard vendor process. CFO authority. Legal 3 weeks.", status: "strong" }], outcome: "Closed-won in 85 days. Executive dashboards first. Company-wide in 4 months.", lessonsLearned: ["Board meeting incident created CFO urgency", "Auto-generated executive summaries were the 'aha' moment", "Competitive win by eliminating dashboard maintenance burden"] },
    healthcare: { companyProfile: "Children's hospital network, 4 hospitals, 800 beds, Epic, small BI team", industry: "Healthcare", dealSize: "$150K ARR", timeline: "100-day cycle", stakeholders: [{ role: "COO", stance: "Economic Buyer" }, { role: "BI Director", stance: "Champion" }, { role: "CMO", stance: "Sponsor" }, { role: "CISO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "150+ dashboards. BI team of 6, fully consumed. Quality dashboards updated monthly. New dashboard: 6 weeks.", status: "strong" }, { criterion: "Economic Buyer", finding: "COO needs real-time operational visibility. Budget from efficiency fund.", status: "strong" }, { criterion: "Identify Pain", finding: "Failed Joint Commission inspection partly due to outdated quality dashboards.", status: "strong" }, { criterion: "Champion", finding: "BI Director, 7-year tenure, manages dashboard operations, ran POC.", status: "strong" }, { criterion: "Competition", finding: "Epic Cogito dashboards, Tableau. Won on speed of creation and AI insights.", status: "moderate" }, { criterion: "Decision Criteria", finding: "HIPAA, Epic integration, real-time refresh, clinical accuracy, on-prem.", status: "strong" }, { criterion: "Decision Process", finding: "Clinical governance → Security → COO approval → Legal/BAA → Deploy.", status: "strong" }, { criterion: "Paper Process", finding: "BAA required. Legal 4 weeks. Clinical governance monthly.", status: "moderate" }], outcome: "Closed-won in 90 days. Operational dashboards first. Quality dashboards in month 2.", lessonsLearned: ["Joint Commission finding created clinical urgency", "On-prem deployment was non-negotiable", "Quick win: real-time bed management dashboard replaced daily Excel email"] },
    retail: { companyProfile: "Fast-fashion brand, 150 stores + DTC e-commerce, $700M revenue, Shopify + NetSuite", industry: "Retail & E-Commerce", dealSize: "$130K ARR", timeline: "45-day cycle", stakeholders: [{ role: "CEO", stance: "Economic Buyer" }, { role: "Head of Analytics", stance: "Champion" }, { role: "VP Sales", stance: "Sponsor" }, { role: "CTO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "4-person analytics team. 80+ dashboards in Looker. New dashboard: 2 weeks. CEO gets weekly email report, not real-time.", status: "strong" }, { criterion: "Economic Buyer", finding: "CEO wants real-time business pulse. Data-driven growth strategy.", status: "strong" }, { criterion: "Identify Pain", finding: "Missed a viral TikTok product trend — sold out online while stores were overstocked.", status: "strong" }, { criterion: "Champion", finding: "Head of Analytics, 4-year tenure, directly briefed CEO on the gap.", status: "strong" }, { criterion: "Competition", finding: "Looker upgrade, Domo. Won on speed and AI-generated trend detection.", status: "strong" }, { criterion: "Decision Criteria", finding: "Speed of deployment, cross-channel views, mobile access, ease of use.", status: "strong" }, { criterion: "Decision Process", finding: "Demo → CEO pilot → CTO review → Purchase. Very fast.", status: "strong" }, { criterion: "Paper Process", finding: "CEO authority. Standard terms. 1-week legal review.", status: "strong" }], outcome: "Closed-won in 35 days. CEO dashboard first. Full company in 6 weeks.", lessonsLearned: ["CEO involvement made this the fastest deal cycle", "TikTok trend miss was a vivid, specific pain point", "Mobile dashboard demo sealed the deal"] },
    manufacturing: { companyProfile: "Food & beverage manufacturer, 4 plants, $500M revenue, SAP + custom MES", industry: "Manufacturing", dealSize: "$140K ARR", timeline: "75-day cycle", stakeholders: [{ role: "VP Operations", stance: "Economic Buyer" }, { role: "Plant IT Manager", stance: "Champion" }, { role: "Quality Director", stance: "Sponsor" }, { role: "CIO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "Each plant has different dashboards. No cross-plant view. New dashboard: 3+ weeks. Shift reports are manual.", status: "strong" }, { criterion: "Economic Buyer", finding: "VP Ops wants cross-plant standardization. Budget from operational excellence.", status: "strong" }, { criterion: "Identify Pain", finding: "FDA audit found inconsistent quality reporting across plants.", status: "strong" }, { criterion: "Champion", finding: "Plant IT Manager at flagship plant, 9-year tenure, ran the pilot.", status: "moderate" }, { criterion: "Competition", finding: "Grafana, SAP Analytics Cloud. Won on ease of use and AI insights.", status: "moderate" }, { criterion: "Decision Criteria", finding: "Cross-plant standardization, SAP/MES integration, real-time, on-prem option.", status: "strong" }, { criterion: "Decision Process", finding: "Plant pilot → VP Ops review → CIO security → VP Ops approval → Legal.", status: "strong" }, { criterion: "Paper Process", finding: "Standard procurement. VP Ops authority. Legal 2 weeks.", status: "strong" }], outcome: "Closed-won in 65 days. Flagship plant first. All 4 plants in 3 months.", lessonsLearned: ["FDA audit finding created compliance urgency", "Cross-plant standardization was the key value proposition", "Champion was mid-level but had strong credibility with VP Ops"] },
    government: { companyProfile: "City government, 500K population, 12 departments, legacy Oracle reporting", industry: "Government", dealSize: "$200K ARR (3-year)", timeline: "150-day cycle", stakeholders: [{ role: "City Manager", stance: "Economic Buyer" }, { role: "IT Director", stance: "Champion" }, { role: "CFO", stance: "Sponsor" }, { role: "City Attorney", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "Legacy Oracle BI. 100+ reports. IT team maintains all. New dashboard: 2 months. Council data requests: 3 weeks.", status: "strong" }, { criterion: "Economic Buyer", finding: "City Manager mandated by Council to improve transparency. Budget from IT modernization fund.", status: "strong" }, { criterion: "Identify Pain", finding: "City Council publicly criticized lack of real-time budget transparency dashboards.", status: "strong" }, { criterion: "Champion", finding: "IT Director, 15-year tenure, trusted by City Manager, led evaluation.", status: "strong" }, { criterion: "Competition", finding: "Oracle BI upgrade, Tableau. Won on AI dashboard generation and cost.", status: "moderate" }, { criterion: "Decision Criteria", finding: "Cost, ease of use, security, public-facing capability, on-prem option.", status: "strong" }, { criterion: "Decision Process", finding: "RFP → Evaluation → IT Director recommendation → City Manager approval → Council vote → Contracting.", status: "strong" }, { criterion: "Paper Process", finding: "City procurement process. Council approval for >$100K. Attorney review 4 weeks.", status: "moderate" }], outcome: "Closed-won in 130 days. Internal dashboards first. Public transparency portal in Phase 2.", lessonsLearned: ["Council public criticism created political urgency", "Public transparency use case elevated the initiative beyond IT", "Had to navigate Council vote — IT Director's credibility was critical"] },
  },
  "proactive-agents": {
    "financial-services": { companyProfile: "Multi-strategy hedge fund, $20B AUM, 300 employees, Bloomberg + proprietary systems", industry: "Financial Services", dealSize: "$300K ARR", timeline: "60-day cycle", stakeholders: [{ role: "COO", stance: "Economic Buyer" }, { role: "Head of Risk Technology", stance: "Champion" }, { role: "CRO", stance: "Sponsor" }, { role: "CCO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "8 quants on monitoring. 300+ daily alerts, 3% actionable. $15M missed exposure event. $2M annual monitoring cost.", status: "strong" }, { criterion: "Economic Buyer", finding: "COO, reports to managing partner. Operational efficiency is a fund mandate.", status: "strong" }, { criterion: "Identify Pain", finding: "$15M exposure event detected 6 hours late. Managing partner demanded automated monitoring.", status: "strong" }, { criterion: "Champion", finding: "Head of Risk Tech, 10-year tenure, designed current monitoring. Knows exactly what's broken.", status: "strong" }, { criterion: "Competition", finding: "Custom Python, Bloomberg alerts, Datadog. Won on context-aware detection and guardrails.", status: "strong" }, { criterion: "Decision Criteria", finding: "Detection accuracy, false positive rate, guardrails, audit trail, speed.", status: "strong" }, { criterion: "Decision Process", finding: "POC → Risk committee → COO approval → Legal → Deploy. Fast.", status: "strong" }, { criterion: "Paper Process", finding: "Fund procurement is fast. COO authority. Legal 2 weeks.", status: "strong" }], outcome: "Closed-won in 45 days. Risk monitoring first. Compliance in month 2.", lessonsLearned: ["$15M incident was the catalyst — managing partner mandate overrode all objections", "Context-aware detection (vs. simple thresholds) was the technical differentiator", "Fastest sales cycle because fund decision-making is concentrated"] },
    healthcare: { companyProfile: "Integrated health system, 25 hospitals, 10,000 beds, Epic + multiple operational systems", industry: "Healthcare", dealSize: "$400K ARR", timeline: "130-day cycle", stakeholders: [{ role: "CMO", stance: "Economic Buyer" }, { role: "VP Quality", stance: "Champion" }, { role: "COO", stance: "Sponsor" }, { role: "CISO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "Quality team: 15 FTEs on monitoring. Sepsis trend detected 3 weeks late. CMS penalties: $5M risk. 100+ recurring reports.", status: "strong" }, { criterion: "Economic Buyer", finding: "CMO, reports to CEO. Patient safety is board agenda item. Budget from quality improvement.", status: "strong" }, { criterion: "Identify Pain", finding: "Sepsis mortality trend went undetected for 3 weeks — affected 40+ patients. Board demanded proactive monitoring.", status: "strong" }, { criterion: "Champion", finding: "VP Quality, 12-year tenure, led quality program. Personally affected by late detection.", status: "strong" }, { criterion: "Competition", finding: "Epic surveillance, Vizient, custom builds. Won on cross-system monitoring and contextual alerting.", status: "moderate" }, { criterion: "Decision Criteria", finding: "HIPAA, on-prem, clinical accuracy, guardrails, EHR integration, audit trail.", status: "strong" }, { criterion: "Decision Process", finding: "Clinical governance → Quality committee → HIPAA review → CMO approval → Legal/BAA → Deploy.", status: "strong" }, { criterion: "Paper Process", finding: "BAA required. Clinical governance monthly. Legal 4 weeks.", status: "moderate" }], outcome: "Closed-won in 120 days. Quality monitoring first. Operational agents in Phase 2.", lessonsLearned: ["Patient safety incident elevated to board level — created undeniable urgency", "Clinical governance required the champion to present guardrails and audit capabilities", "On-prem deployment was mandatory for clinical data monitoring"] },
    retail: { companyProfile: "Grocery chain, 300 stores, $4B revenue, SAP + Oracle POS + custom e-commerce", industry: "Retail & E-Commerce", dealSize: "$225K ARR", timeline: "75-day cycle", stakeholders: [{ role: "COO", stance: "Economic Buyer" }, { role: "VP Supply Chain", stance: "Champion" }, { role: "Chief Merchandising Officer", stance: "Sponsor" }, { role: "CTO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "Annual stockout cost: $12M. Pricing errors: $3M. 10 analysts on monitoring. 500+ alerts/day, 8% actionable.", status: "strong" }, { criterion: "Economic Buyer", finding: "COO, reports to CEO. Board KPI: reduce stockout-driven revenue loss by 30%.", status: "strong" }, { criterion: "Identify Pain", finding: "Thanksgiving turkey stockout across 50 stores made local news. CEO demanded proactive monitoring.", status: "strong" }, { criterion: "Champion", finding: "VP Supply Chain, 8-year tenure, operational credibility, ran the pilot across 20 stores.", status: "strong" }, { criterion: "Competition", finding: "Blue Yonder (supply chain), custom alerting, status quo. Won on cross-system intelligence and ease of setup.", status: "strong" }, { criterion: "Decision Criteria", finding: "Cross-system monitoring, false positive rate, Slack integration, speed of setup, accuracy.", status: "strong" }, { criterion: "Decision Process", finding: "20-store pilot → VP review → COO approval → CTO security → Legal → Rollout.", status: "strong" }, { criterion: "Paper Process", finding: "Standard retail procurement. COO authority. Legal 2 weeks.", status: "strong" }], outcome: "Closed-won in 65 days. Inventory agents first. Pricing and promotion agents in month 2. Full rollout in 4 months.", lessonsLearned: ["Thanksgiving stockout was national news — CEO made it personal priority", "20-store pilot proved ROI before enterprise commitment", "Slack integration was what made store managers actually use the alerts"] },
    manufacturing: { companyProfile: "Semiconductor manufacturer, 2 fabs, $3B revenue, Applied Materials + custom SCADA + SAP", industry: "Manufacturing", dealSize: "$275K ARR", timeline: "90-day cycle", stakeholders: [{ role: "SVP Operations", stance: "Economic Buyer" }, { role: "Director of Fab Analytics", stance: "Champion" }, { role: "VP Quality", stance: "Sponsor" }, { role: "CIO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "Unplanned downtime: $50M/year. Yield loss from late detection: $20M. 12 engineers on monitoring. Scrap rate: 4.2% (target: 2%).", status: "strong" }, { criterion: "Economic Buyer", finding: "SVP Ops, reports to CEO. Board mandate: halve unplanned downtime.", status: "strong" }, { criterion: "Identify Pain", finding: "Contamination event shut down Fab 1 for 48 hours — $25M impact. Could have been detected 12 hours earlier.", status: "strong" }, { criterion: "Champion", finding: "Director Fab Analytics, 15-year tenure, semiconductor industry veteran, designed current monitoring.", status: "strong" }, { criterion: "Competition", finding: "AVEVA, custom Python, equipment vendor monitoring. Won on cross-system correlation and contextual detection.", status: "moderate" }, { criterion: "Decision Criteria", finding: "Real-time detection, cross-system correlation, guardrails, on-prem, accuracy >99% for critical alerts.", status: "strong" }, { criterion: "Decision Process", finding: "Fab 1 pilot → Engineering review → SVP approval → CIO security → Legal → Fab 2.", status: "strong" }, { criterion: "Paper Process", finding: "Standard procurement. SVP authority. Legal 3 weeks.", status: "strong" }], outcome: "Closed-won in 80 days. Fab 1 quality and maintenance agents. Fab 2 in month 3.", lessonsLearned: ["$25M contamination event was the undeniable catalyst", "99% accuracy requirement for critical alerts was achievable but required extensive tuning during pilot", "Cross-system correlation (SCADA + SAP + quality data) was the technical differentiator"] },
    government: { companyProfile: "State Medicaid agency, managing $15B in annual benefits, 2,000 employees", industry: "Government", dealSize: "$500K ARR (5-year contract)", timeline: "200-day procurement, 90-day implementation", stakeholders: [{ role: "Agency Director", stance: "Economic Buyer" }, { role: "Director of Program Integrity", stance: "Champion" }, { role: "Inspector General", stance: "Sponsor" }, { role: "CISO", stance: "Evaluator" }], criteriaMapping: [{ criterion: "Metrics", finding: "Improper payments: $450M/year (3% rate). Recovery rate: 12%. 25 investigators. Manual review: 2% of claims.", status: "strong" }, { criterion: "Economic Buyer", finding: "Agency Director, appointed by Governor. Legislative mandate to reduce improper payments by 50%.", status: "strong" }, { criterion: "Identify Pain", finding: "Federal OIG audit found $450M in improper payments. CMS threatened enhanced oversight. Governor demanded action.", status: "strong" }, { criterion: "Champion", finding: "Director of Program Integrity, career official, 20-year tenure, authored the corrective action plan.", status: "strong" }, { criterion: "Competition", finding: "SAS (incumbent), Palantir, IBM. Won on AI agent capability and modern architecture.", status: "moderate" }, { criterion: "Decision Criteria", finding: "On-prem, FedRAMP-ready, audit trail, citizen data encryption, real-time detection, 508 compliance.", status: "strong" }, { criterion: "Decision Process", finding: "RFP → Evaluation → Source selection → Agency Director approval → Governor's office → Contracting → ATO.", status: "strong" }, { criterion: "Paper Process", finding: "State procurement. 5-year contract vehicle. Legal review 8 weeks. Governor's office approval for >$1M.", status: "moderate" }], outcome: "Closed-won in 180 days. Claims monitoring for largest program first. All programs over 3 years.", lessonsLearned: ["Federal OIG audit + CMS threat created existential urgency", "Career champion survived election cycle — essential for government deals", "5-year contract vehicle justified investment in lengthy procurement process", "SAS displacement required proving superior AI detection capability in formal bake-off"] },
  },
};

export function getMeddpiccExample(
  productId: ProductId,
  industryId: IndustryId
): QualifiedOpportunityExample {
  return meddpiccExamples[productId]?.[industryId] ?? meddpiccExamples["conversational-bi"]["financial-services"];
}
