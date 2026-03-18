export { products, productList, type ProductId } from "./products";
export { industries, industryList, type IndustryId } from "./industries";
export type { FrameworkId, FrameworkCriterion, QualifiedOpportunityExample } from "./types";
export { getSpinCriteria, getSpinExample } from "./spin-framework";
export { getMeddpiccCriteria, getMeddpiccExample } from "./meddpicc-framework";
export { getMettricCriteria, getMettricExample } from "./mettric-framework";

import type { ProductId } from "./products";
import type { IndustryId } from "./industries";
import type { FrameworkId, FrameworkCriterion, QualifiedOpportunityExample } from "./types";
import { getSpinCriteria, getSpinExample } from "./spin-framework";
import { getMeddpiccCriteria, getMeddpiccExample } from "./meddpicc-framework";
import { getMettricCriteria, getMettricExample } from "./mettric-framework";

export function getFrameworkCriteria(
  framework: FrameworkId,
  product: ProductId,
  industry: IndustryId
): FrameworkCriterion[] {
  if (framework === "spin") return getSpinCriteria(product, industry);
  if (framework === "meddpicc") return getMeddpiccCriteria(product, industry);
  return getMettricCriteria(product, industry);
}

export function getFrameworkExample(
  framework: FrameworkId,
  product: ProductId,
  industry: IndustryId
): QualifiedOpportunityExample {
  if (framework === "spin") return getSpinExample(product, industry);
  if (framework === "meddpicc") return getMeddpiccExample(product, industry);
  return getMettricExample(product, industry);
}

export const frameworkOptions = [
  { id: "spin" as FrameworkId, name: "SPIN Selling", description: "Situation, Problem, Implication, Need-Payoff" },
  { id: "meddpicc" as FrameworkId, name: "MEDDPICC", description: "Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition" },
  { id: "mettric" as FrameworkId, name: "METTRIC", description: "Measure Outcomes, Identify Challenges & Rewards, Test Feasibility, Timeline, ROI vs Cost, Executive Buy-In, Commitment to Change" },
];
