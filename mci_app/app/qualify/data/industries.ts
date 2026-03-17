export type IndustryId =
  | "financial-services"
  | "healthcare"
  | "retail"
  | "manufacturing"
  | "government";

export interface Industry {
  id: IndustryId;
  name: string;
  icon: string;
  keyRegulations: string[];
  commonDataSources: string[];
  topPriorities: string[];
}

export const industries: Record<IndustryId, Industry> = {
  "financial-services": {
    id: "financial-services",
    name: "Financial Services",
    icon: "landmark",
    keyRegulations: ["SOX", "Basel III/IV", "Dodd-Frank", "SEC reporting", "AML/KYC"],
    commonDataSources: [
      "Core banking systems",
      "Trading platforms",
      "Risk management systems",
      "CRM (Salesforce)",
      "Bloomberg/market data feeds",
    ],
    topPriorities: [
      "Real-time risk monitoring and compliance",
      "Fraud detection and prevention",
      "Client portfolio analytics",
      "Regulatory reporting automation",
      "Operational efficiency in middle/back office",
    ],
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    icon: "heart-pulse",
    keyRegulations: ["HIPAA", "HITECH", "CMS requirements", "FDA 21 CFR Part 11", "State privacy laws"],
    commonDataSources: [
      "EHR/EMR systems (Epic, Cerner)",
      "Claims databases",
      "Clinical trial data",
      "Patient portals",
      "Supply chain / inventory systems",
    ],
    topPriorities: [
      "Patient outcome optimization",
      "Operational efficiency and cost reduction",
      "Revenue cycle management",
      "Clinical quality reporting",
      "Supply chain visibility",
    ],
  },
  retail: {
    id: "retail",
    name: "Retail & E-Commerce",
    icon: "shopping-cart",
    keyRegulations: ["PCI-DSS", "CCPA/CPRA", "GDPR (EU operations)", "FTC guidelines"],
    commonDataSources: [
      "POS systems",
      "E-commerce platforms (Shopify, Magento)",
      "Inventory management",
      "CRM/CDP",
      "Marketing analytics (Google, Meta)",
    ],
    topPriorities: [
      "Customer lifetime value optimization",
      "Inventory and demand forecasting",
      "Omnichannel performance visibility",
      "Personalization and conversion optimization",
      "Supply chain and fulfillment efficiency",
    ],
  },
  manufacturing: {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    keyRegulations: ["ISO 9001", "OSHA", "EPA compliance", "Industry 4.0 standards"],
    commonDataSources: [
      "ERP systems (SAP, Oracle)",
      "MES (Manufacturing Execution Systems)",
      "IoT/sensor data",
      "Quality management systems",
      "Supply chain platforms",
    ],
    topPriorities: [
      "Predictive maintenance and downtime reduction",
      "Supply chain resilience and visibility",
      "Quality control and defect reduction",
      "Production efficiency optimization",
      "Cost management and margin analysis",
    ],
  },
  government: {
    id: "government",
    name: "Government",
    icon: "building-2",
    keyRegulations: ["FedRAMP", "FISMA", "FOIA", "Section 508", "State/local procurement rules"],
    commonDataSources: [
      "Legacy mainframe systems",
      "GIS and spatial data",
      "Citizen service portals",
      "Budget and financial systems",
      "HR and workforce management",
    ],
    topPriorities: [
      "Citizen service delivery improvement",
      "Budget transparency and fiscal accountability",
      "Cross-agency data sharing",
      "Fraud, waste, and abuse detection",
      "Workforce analytics and planning",
    ],
  },
};

export const industryList = Object.values(industries);
