'use client';

import React from 'react';
import { Competitor } from '../../data/competitors';
import { objectionResponses } from '../../data/objectionResponses';
import Card from '../ui/Card';
import FieldRow from '../ui/FieldRow';
import ObjectionAccordion from './ObjectionAccordion';

interface PositioningProps {
  competitor: Competitor;
  isWisdom: boolean;
}

export default function Positioning({ competitor: c, isWisdom }: PositioningProps) {
  const responses = objectionResponses[c.id] || [];

  return (
    <div>
      <Card title="Stated Positioning">
        <div className="positioning-quote">{c.positioning.tagline} — {c.positioning.headline}</div>
        <FieldRow label="Brand Tone">{c.positioning.tone}</FieldRow>
        <FieldRow label="Analyst View">{c.positioning.analystPerception}</FieldRow>
      </Card>
      <Card title="Key Differentiators They Claim">
        {c.positioning.differentiators.map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            padding: '7px 0', borderBottom: '1px solid var(--co-border)',
            fontSize: '13px', color: 'var(--co-text-secondary)',
          }}>
            <span style={{ color: c.color, fontWeight: 700, flexShrink: 0 }}>→</span>{d}
          </div>
        ))}
      </Card>
      <Card title={isWisdom ? "Objections you'll face" : "Common Objections You'll Hear"}>
        {c.objections.map((o, idx) => (
          <ObjectionAccordion
            key={idx}
            objection={o}
            response={responses[idx] || null}
          />
        ))}
      </Card>
    </div>
  );
}
