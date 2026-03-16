'use client';

import React, { useState, useCallback } from 'react';
import { competitors } from '../../data/competitors';
import { quadrantConfigs } from '../../data/quadrantConfigs';
import QuadrantChart from './QuadrantChart';
import QuadrantFilter from './QuadrantFilter';
import ViewToggle from './ViewToggle';

const chartMeta: { key: string; title: string; subtitle: string }[] = [
  { key: 'q1', title: 'Q1 — AI Depth vs BI Maturity', subtitle: "WisdomAI's anti-hallucination architecture places it firmly AI-first with lighter traditional BI surface area" },
  { key: 'q2', title: 'Q2 — Stack Ownership vs Sales Motion', subtitle: 'WisdomAI plugs into existing data stacks — connector with enterprise ambition' },
  { key: 'q3', title: 'Q3 — Ease of Use vs Analytical Power', subtitle: 'Bubble size = perceived market momentum / funding scale' },
  { key: 'q4', title: 'Q4 — Deal Overlap vs Difficulty to Displace', subtitle: 'Threat radar — Snowflake & Databricks are existential; Power BI & ThoughtSpot are common head-to-heads' },
  { key: 'q5', title: 'Q5 — Time-to-Value vs Sales Complexity', subtitle: 'How fast can a customer see ROI, and how painful is the buying process? WisdomAI\'s onboarding speed is a core differentiator against incumbents.' },
  { key: 'q6', title: 'Q6 — NLQ Accuracy vs Proactive / Agentic Insight', subtitle: "WisdomAI's hallucination-free architecture + Enterprise Context Layer is the core claim on both axes simultaneously." },
];

export default function QuadrantTab() {
  const [view, setView] = useState<'grid' | 'stack'>('grid');
  const [selected, setSelected] = useState<Set<string>>(new Set(competitors.map(c => c.id)));

  const handleToggle = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelected(new Set(competitors.map(c => c.id)));
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelected(new Set());
  }, []);

  const chartHeight = view === 'stack' ? '500px' : '330px';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', color: 'var(--co-text-muted)', margin: 0 }}>
          WisdomAI is always shown. Select competitors to compare.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ViewToggle view={view} onChange={setView} />
          <QuadrantFilter
            selected={selected}
            onToggle={handleToggle}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
          />
        </div>
      </div>

      <div className={`quadrant-grid ${view === 'stack' ? 'stacked' : ''}`}>
        {chartMeta.map(cm => (
          <QuadrantChart
            key={cm.key}
            config={quadrantConfigs[cm.key]}
            title={cm.title}
            subtitle={cm.subtitle}
            selectedCompetitors={selected}
            height={chartHeight}
          />
        ))}
      </div>
    </div>
  );
}
