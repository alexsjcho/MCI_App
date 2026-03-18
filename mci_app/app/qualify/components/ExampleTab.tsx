"use client";

import type { QualifiedOpportunityExample } from "../data/types";
import type { FrameworkId } from "../data";
import Badge from "./Badge";

interface ExampleTabProps {
  example: QualifiedOpportunityExample;
  frameworkId: FrameworkId;
  productName: string;
  industryName: string;
}

export default function ExampleTab({
  example,
  frameworkId,
  productName,
  industryName,
}: ExampleTabProps) {
  const frameworkLabel =
    frameworkId === "spin" ? "SPIN" : frameworkId === "meddpicc" ? "MEDDPICC" : "METTRIC";

  return (
    <div>
      <div className="example-header">
        <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
          <Badge variant="success">Qualified — Won</Badge>
          <Badge variant="info">{frameworkLabel}</Badge>
        </div>
        <div className="example-header-title">Example Qualified Opportunity</div>
        <div className="example-header-context">{productName} · {industryName}</div>
      </div>

      {/* Company Profile */}
      <div className="example-section">
        <div className="example-section-head">Company Profile</div>
        <div className="example-section-body">
          <p className="example-text">{example.companyProfile}</p>
          <div className="example-meta">
            <div className="example-meta-item">
              <div className="example-meta-label">Industry</div>
              <div className="example-meta-value">{example.industry}</div>
            </div>
            <div className="example-meta-item">
              <div className="example-meta-label">Deal Size</div>
              <div className="example-meta-value deal">{example.dealSize}</div>
            </div>
            <div className="example-meta-item">
              <div className="example-meta-label">Timeline</div>
              <div className="example-meta-value">{example.timeline}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholders */}
      <div className="example-section">
        <div className="example-section-head">Key Stakeholders</div>
        <div className="example-section-body">
          {example.stakeholders.map((s, i) => (
            <div key={i} className="stakeholder-row">
              <span className="stakeholder-avatar">{s.role.charAt(0)}</span>
              <div>
                <div className="stakeholder-role">{s.role}</div>
                <div className="stakeholder-stance">{s.stance}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Criteria Mapping */}
      <div className="example-section">
        <div className="example-section-head">{frameworkLabel} Criteria Assessment</div>
        <div className="example-section-body">
          {example.criteriaMapping.map((cm, i) => (
            <div key={i} className="criteria-row">
              <div className="criteria-row-head">
                <span className="criteria-row-name">{cm.criterion}</span>
                <Badge
                  variant={
                    cm.status === "strong"
                      ? "success"
                      : cm.status === "moderate"
                      ? "warning"
                      : "danger"
                  }
                >
                  {cm.status === "strong" ? "Strong" : cm.status === "moderate" ? "Moderate" : "Weak"}
                </Badge>
              </div>
              <p className="criteria-row-finding">{cm.finding}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Outcome */}
      <div className="example-section">
        <div className="example-section-head outcome-head">Outcome</div>
        <div className="example-section-body">
          <p className="example-text">{example.outcome}</p>
        </div>
      </div>

      {/* Lessons Learned */}
      <div className="example-section">
        <div className="example-section-head lessons-head">Lessons Learned</div>
        <div className="example-section-body">
          {example.lessonsLearned.map((lesson, i) => (
            <div key={i} className="lesson-item">
              <span className="lesson-icon">→</span>
              <span>{lesson}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
