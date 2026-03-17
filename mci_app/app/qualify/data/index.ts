export { products, productList, type ProductId } from "./products";
export { industries, industryList, type IndustryId } from "./industries";
export type { FrameworkId, FrameworkCriterion, QualifiedOpportunityExample } from "./types";
export { getSpinCriteria, getSpinExample } from "./spin-framework";
export { getMeddpiccCriteria, getMeddpiccExample } from "./meddpicc-framework";

import type { ProductId } from "./products";
import type { IndustryId } from "./industries";
import type { FrameworkId, FrameworkCriterion, QualifiedOpportunityExample } from "./types";
import { getSpinCriteria, getSpinExample } from "./spin-framework";
import { getMeddpiccCriteria, getMeddpiccExample } from "./meddpicc-framework";

export function getFrameworkCriteria(
  framework: FrameworkId,
  product: ProductId,
  industry: IndustryId
): FrameworkCriterion[] {
  return framework === "spin"
    ? getSpinCriteria(product, industry)
    : getMeddpiccCriteria(product, industry);
}

export function getFrameworkExample(
  framework: FrameworkId,
  product: ProductId,
  industry: IndustryId
): QualifiedOpportunityExample {
  return framework === "spin"
    ? getSpinExample(product, industry)
    : getMeddpiccExample(product, industry);
}

export const frameworkOptions = [
  { id: "spin" as FrameworkId, name: "SPIN Selling", description: "Situation, Problem, Implication, Need-Payoff" },
  { id: "meddpicc" as FrameworkId, name: "MEDDPICC", description: "Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identify Pain, Champion, Competition" },
];
