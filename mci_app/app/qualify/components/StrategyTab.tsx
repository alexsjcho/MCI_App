"use client";

import type { FrameworkCriterion } from "../data/types";
import type { FrameworkId } from "../data";
import CriterionCard from "./CriterionCard";

interface StrategyTabProps {
  criteria: FrameworkCriterion[];
  frameworkId: FrameworkId;
  productName: string;
  industryName: string;
}

export default function StrategyTab({
  criteria,
  frameworkId,
  productName,
  industryName,
}: StrategyTabProps) {
  const frameworkLabel = frameworkId === "spin" ? "SPIN Selling" : "MEDDPICC";

  return (
    <div>
      <div className="strategy-header">
        <div className="strategy-title">{frameworkLabel} Qualification Strategy</div>
        <div className="strategy-context">{productName} · {industryName}</div>
        <p className="strategy-desc">
          {frameworkId === "spin"
            ? "Use the SPIN framework to systematically uncover the prospect's situation, identify problems, explore implications, and establish need-payoff. Each criterion below includes tailored discovery questions and red flags specific to this product and industry."
            : "Use MEDDPICC to rigorously qualify every aspect of the deal. Each criterion below provides guidance on how to qualify, discovery questions tailored to this product and industry, and red flags that signal a deal at risk."}
        </p>
      </div>

      {criteria.map((criterion, index) => (
        <CriterionCard key={criterion.id} criterion={criterion} index={index} />
      ))}
    </div>
  );
}
