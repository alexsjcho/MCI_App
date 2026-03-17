"use client";

import { useState } from "react";
import type { FrameworkCriterion } from "../data/types";

interface CriterionCardProps {
  criterion: FrameworkCriterion;
  index: number;
}

export default function CriterionCard({ criterion, index }: CriterionCardProps) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div className="criterion-item">
      <button
        onClick={() => setExpanded(!expanded)}
        className="criterion-trigger"
      >
        {criterion.abbreviation && (
          <span className="criterion-abbr">{criterion.abbreviation}</span>
        )}
        <div className="criterion-info">
          <div className="criterion-name">{criterion.name}</div>
          <div className="criterion-def-preview">{criterion.definition}</div>
        </div>
        <span className={`criterion-chevron ${expanded ? "open" : ""}`}>▾</span>
      </button>

      {expanded && (
        <div className="criterion-body">
          <p className="criterion-definition">{criterion.definition}</p>

          <div className="criterion-section-label csl-qualify">How to Qualify</div>
          <div className="qualify-text">{criterion.howToQualify}</div>

          <div className="criterion-section-label csl-questions">Discovery Questions</div>
          <ul className="question-list">
            {criterion.discoveryQuestions.map((q, i) => (
              <li key={i} className="question-item">
                <span className="question-num">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>

          <div className="criterion-section-label csl-redflags">Red Flags &amp; Disqualifiers</div>
          <ul className="redflag-list">
            {criterion.redFlags.map((flag, i) => (
              <li key={i} className="redflag-item">
                <span className="redflag-icon">✗</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
