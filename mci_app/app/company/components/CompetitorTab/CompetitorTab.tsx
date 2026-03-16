'use client';

import React, { useState, useEffect } from 'react';
import { competitors } from '../../data/competitors';
import { wisdomAI } from '../../data/wisdomai';
import CompetitorDropdown from './CompetitorDropdown';
import BattlecardContent from './BattlecardContent';

interface CompetitorTabProps {
  initialCompetitorId?: string;
}

export default function CompetitorTab({ initialCompetitorId }: CompetitorTabProps) {
  const [currentId, setCurrentId] = useState(initialCompetitorId || 'wisdomai');

  useEffect(() => {
    if (initialCompetitorId) {
      setCurrentId(initialCompetitorId);
    }
  }, [initialCompetitorId]);

  const isWisdom = currentId === 'wisdomai';
  const data = isWisdom ? wisdomAI : competitors.find(c => c.id === currentId) || wisdomAI;

  const tierMeta: Record<string, { label: string; bg: string; color: string; border: string }> = {
    tier1: { label: 'T1 — Direct Threat', bg: 'rgba(220,38,38,0.08)', color: '#dc2626', border: 'rgba(220,38,38,0.2)' },
    tier2: { label: 'T2 — Adjacent Player', bg: 'rgba(217,119,6,0.08)', color: '#d97706', border: 'rgba(217,119,6,0.2)' },
    tier3: { label: 'T3 — Emerging', bg: 'rgba(37,99,235,0.08)', color: '#2563eb', border: 'rgba(37,99,235,0.2)' },
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3px' }}>
            <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: '-0.5px', color: 'var(--co-text-primary)' }}>{data.name}</div>
            {!isWisdom && data.threatLevel && (
              <span style={{
                fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', letterSpacing: '0.3px',
                background: tierMeta[data.threatLevel].bg,
                color: tierMeta[data.threatLevel].color,
                border: `1px solid ${tierMeta[data.threatLevel].border}`,
              }}>
                {tierMeta[data.threatLevel].label}
              </span>
            )}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--co-text-muted)' }}>{data.tagline}</div>
        </div>
        <CompetitorDropdown currentId={currentId} onSelect={setCurrentId} />
      </div>

      <BattlecardContent competitor={data} isWisdom={isWisdom} />
    </div>
  );
}
