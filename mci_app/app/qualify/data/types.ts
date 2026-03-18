import type { ProductId } from "./products";
import type { IndustryId } from "./industries";

export type FrameworkId = "spin" | "meddpicc" | "mettric";

export interface FrameworkCriterion {
  id: string;
  name: string;
  abbreviation?: string;
  definition: string;
  howToQualify: string;
  discoveryQuestions: string[];
  redFlags: string[];
}

export interface QualifiedOpportunityExample {
  companyProfile: string;
  industry: string;
  dealSize: string;
  timeline: string;
  stakeholders: { role: string; stance: string }[];
  criteriaMapping: { criterion: string; finding: string; status: "strong" | "moderate" | "weak" }[];
  outcome: string;
  lessonsLearned: string[];
}

export interface FrameworkContent {
  criteria: FrameworkCriterion[];
  example: QualifiedOpportunityExample;
}

export type FrameworkDataMap = Record<
  ProductId,
  Record<IndustryId, Record<FrameworkId, FrameworkContent>>
>;
