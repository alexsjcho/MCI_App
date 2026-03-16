'use client';

import React from 'react';
import { Competitor } from '../../data/competitors';
import { wisdomAI } from '../../data/wisdomai';
import { tableColumns } from '../../data/tableColumns';

interface OverviewTableProps {
  visibleCompetitors: Competitor[];
  onRowClick: (id: string) => void;
}

function renderCell(col: { key: string }, c: Competitor, isWisdom: boolean): React.ReactNode {
  switch (col.key) {
    case 'name':
      return (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: c.color, marginRight: '7px', flexShrink: 0 }}></span>
          {c.name}
        </span>
      );
    case 'tier':
      if (isWisdom) return <span className="ov-tier-badge" style={{ background: 'var(--co-wisdom-bg)', color: 'var(--co-wisdom)' }}>Home</span>;
      const meta: Record<string, { bg: string; color: string; label: string }> = {
        tier1: { bg: 'rgba(220,38,38,0.08)', color: '#dc2626', label: 'T1 — Direct Threat' },
        tier2: { bg: 'rgba(217,119,6,0.08)', color: '#d97706', label: 'T2 — Adjacent' },
        tier3: { bg: 'rgba(37,99,235,0.08)', color: '#2563eb', label: 'T3 — Emerging' },
      };
      const t = meta[c.threatLevel || 'tier3'];
      return <span className="ov-tier-badge" style={{ background: t.bg, color: t.color }}>{t.label}</span>;
    case 'stage': return c.profile.stage;
    case 'arr': return c.profile.arr;
    case 'ics': return c.profile.ics;
    case 'delivery': return c.profile.delivery;
    case 'model': return c.profile.businessModel;
    case 'motion':
      return c.salesMotion.map((m, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--co-blue-bg)', color: 'var(--co-blue)', fontSize: '10px', fontWeight: 500, padding: '2px 6px', borderRadius: '4px', margin: '1px 2px 1px 0' }}>{m}</span>
      ));
    default: return null;
  }
}

export default function OverviewTable({ visibleCompetitors, onRowClick }: OverviewTableProps) {
  const allRows = [
    { data: wisdomAI, isWisdom: true },
    ...visibleCompetitors.map(c => ({ data: c, isWisdom: false })),
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table id="ov-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            {tableColumns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allRows.map(({ data: c, isWisdom }) => (
            <tr
              key={c.id}
              className={isWisdom ? 'ov-wisdom-row' : 'ov-competitor-row'}
              onClick={() => onRowClick(c.id)}
            >
              {tableColumns.map(col => (
                <td key={col.key}>{renderCell(col, c, isWisdom)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
