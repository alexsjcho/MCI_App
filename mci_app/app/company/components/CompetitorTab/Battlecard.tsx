'use client';

import React, { useState } from 'react';
import { Competitor } from '../../data/competitors';
import {
  battlecardDataMap,
  BattlecardData,
  BattlecardObjection,
} from '../../data/battlecardData';

interface BattlecardProps {
  competitor: Competitor;
  isWisdom: boolean;
}

function BcObjectionItem({ obj }: { obj: BattlecardObjection }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bc-obj-item ${open ? 'open' : ''}`}>
      <button className="bc-obj-q" onClick={() => setOpen(!open)}>
        <span className="bc-obj-q-text">&ldquo;{obj.question}&rdquo;</span>
        <span className={`bc-obj-chevron ${open ? 'open' : ''}`}>&#x2304;</span>
      </button>
      {open && (
        <div className="bc-obj-a">
          <strong>{obj.response.split(':')[0]}:</strong>
          {obj.response.substring(obj.response.indexOf(':') + 1)}
        </div>
      )}
    </div>
  );
}

export default function Battlecard({ competitor: c, isWisdom }: BattlecardProps) {
  const data = battlecardDataMap[c.id];

  if (!data) {
    return (
      <div className="bc-empty">
        <div className="bc-empty-icon">📋</div>
        <div className="bc-empty-title">Battlecard Coming Soon</div>
        <div className="bc-empty-desc">
          The competitive battlecard for {c.name} is currently being developed.
          Check the Win/Loss and Positioning tabs for existing competitive intel.
        </div>
      </div>
    );
  }

  return (
    <div className="bc-wrap">
      {/* HEADER */}
      <div className="bc-header">
        <div className="bc-brand">
          <span className="bc-brand-label">Our Product</span>
          <span className="bc-brand-name" style={{ color: 'var(--co-wisdom)' }}>WisdomAI</span>
          <span className="bc-brand-sub">Enterprise AI Data Analyst · Founded 2023</span>
        </div>
        <div className="bc-vs">VS</div>
        <div className="bc-brand bc-brand-right">
          <span className="bc-brand-label">Competitor</span>
          <span className="bc-brand-name" style={{ color: c.color }}>{c.name}</span>
          <span className="bc-brand-sub">{c.tagline}</span>
        </div>
      </div>

      {/* META BAR */}
      <div className="bc-meta-bar">
        {Object.entries(data.meta).map(([key, val]) => {
          const labels: Record<string, string> = {
            category: 'Category',
            dealStage: 'Deal Stage',
            icp: 'ICP',
            updated: 'Updated',
            owner: 'Owner',
          };
          return (
            <div className="bc-meta-chip" key={key}>
              {labels[key]}: <span>{val}</span>
            </div>
          );
        })}
      </div>

      {/* POSITIONING */}
      <SectionTitle>Positioning Summary</SectionTitle>
      <div className="bc-positioning">
        <div className="bc-pos-card bc-pos-wisdom">
          <div className="bc-pos-title" style={{ color: 'var(--co-wisdom)' }}>
            {data.positioning.wisdom.title}
          </div>
          <p>{data.positioning.wisdom.description}</p>
        </div>
        <div className="bc-pos-card bc-pos-comp" style={{ borderColor: `${c.color}33` }}>
          <div className="bc-pos-title" style={{ color: c.color }}>
            {data.positioning.competitor.title}
          </div>
          <p>{data.positioning.competitor.description}</p>
        </div>
      </div>

      {/* PROOF POINTS */}
      <SectionTitle>WisdomAI Key Proof Points</SectionTitle>
      <div className="bc-proof-list">
        {data.proofPoints.map((p, i) => (
          <div className="bc-proof-card" key={i}>
            <div className="bc-proof-stat">{p.stat}</div>
            <div className="bc-proof-desc">{p.description}</div>
          </div>
        ))}
      </div>

      {/* FEATURE COMPARISON TABLE */}
      <SectionTitle>Head-to-Head Feature Comparison</SectionTitle>
      <div className="bc-table-wrap">
        <table className="bc-compare-table">
          <thead>
            <tr>
              <th style={{ width: 160 }}>Dimension</th>
              <th className="bc-th-wisdom">WisdomAI</th>
              <th className="bc-th-comp">{ c.name }</th>
            </tr>
          </thead>
          <tbody>
            {data.featureComparison.map((row, i) => (
              <tr key={i}>
                <td className="bc-td-criterion">{row.dimension}</td>
                <td className={cellClass('wisdom', row.winner)}>
                  {row.wisdom}
                  {row.winner === 'wisdom' && <span className="bc-win-badge">✓ Win</span>}
                </td>
                <td className={cellClass('competitor', row.winner)}>
                  {row.competitor}
                  {row.winner === 'competitor' && (
                    <span className="bc-win-badge bc-win-badge-comp">{c.shortName} Edge</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CAPABILITY RATINGS */}
      <SectionTitle>Capability Ratings</SectionTitle>
      <div className="bc-scorecards">
        <ScoreCard
          name="WisdomAI"
          dotColor="var(--co-wisdom)"
          barClass="bc-bar-wisdom"
          ratings={data.wisdomRatings}
        />
        <ScoreCard
          name={c.name}
          dotColor={c.color}
          barClass="bc-bar-comp"
          barColor={c.color}
          ratings={data.competitorRatings}
        />
      </div>

      {/* WIN / LOSS */}
      <SectionTitle>When We Win / When We Lose</SectionTitle>
      <div className="bc-win-loss">
        <div className="bc-wl-card">
          <div className="bc-wl-title">
            <span className="bc-wl-icon bc-wl-icon-win">✓</span>
            WisdomAI wins when…
          </div>
          <ul className="bc-wl-list">
            {c.winConditions.map((w, i) => (
              <li key={i}><span className="bc-bullet bc-bullet-win">▲</span>{w}</li>
            ))}
          </ul>
        </div>
        <div className="bc-wl-card">
          <div className="bc-wl-title">
            <span className="bc-wl-icon bc-wl-icon-lose">✕</span>
            {c.name} wins when…
          </div>
          <ul className="bc-wl-list">
            {c.loseConditions.map((l, i) => (
              <li key={i}><span className="bc-bullet bc-bullet-lose">▼</span>{l}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* OBJECTION HANDLING */}
      <SectionTitle>Objection Handling</SectionTitle>
      <div className="bc-objections">
        {data.objections.map((obj, i) => (
          <BcObjectionItem key={i} obj={obj} />
        ))}
      </div>

      {/* DISCOVERY QUESTIONS */}
      <SectionTitle>Discovery Questions to Expose {c.name} Gaps</SectionTitle>
      <div className="bc-disc-grid">
        {data.discoveryQuestions.map((q, i) => (
          <div className="bc-disc-q" key={i}>
            <span className="bc-q-num">Q{i + 1}</span>
            <span>{q}</span>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="bc-footer">
        <span className="bc-footer-left">WISDOMAI SALES ENABLEMENT · BATTLECARD v2.1 · {data.meta.updated}</span>
        <span className="bc-confidential">INTERNAL USE ONLY — DO NOT DISTRIBUTE</span>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="bc-section-title">{children}</div>;
}

function cellClass(side: 'wisdom' | 'competitor', winner: string): string {
  const base = side === 'wisdom' ? 'bc-td-wisdom' : 'bc-td-comp';
  if (winner === side) return `${base} bc-cell-win`;
  if (winner !== 'neutral' && winner !== side) return `${base} bc-cell-lose`;
  return base;
}

function ScoreCard({
  name,
  dotColor,
  barClass,
  barColor,
  ratings,
}: {
  name: string;
  dotColor: string;
  barClass: string;
  barColor?: string;
  ratings: { label: string; score: number }[];
}) {
  return (
    <div className="bc-scorecard">
      <div className="bc-scorecard-header">
        <span className="bc-scorecard-dot" style={{ background: dotColor }} />
        <span className="bc-scorecard-name">{name}</span>
      </div>
      {ratings.map((r, i) => (
        <div className="bc-score-row" key={i}>
          <span className="bc-score-label">{r.label}</span>
          <div className="bc-score-bar-wrap">
            <div
              className={`bc-score-bar ${barClass}`}
              style={{
                width: `${r.score * 10}%`,
                ...(barColor ? { background: barColor } : {}),
              }}
            />
          </div>
          <span className="bc-score-val">{r.score === 0 ? 'N/A' : r.score.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}
