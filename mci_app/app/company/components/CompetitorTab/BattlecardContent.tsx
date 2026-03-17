'use client';

import React, { useState } from 'react';
import { Competitor } from '../../data/competitors';
import Badge from '../ui/Badge';
import CompanyProfile from './CompanyProfile';
import Positioning from './Positioning';
import WinLoss from './WinLoss';
import Battlecard from './Battlecard';

interface BattlecardContentProps {
  competitor: Competitor;
  isWisdom: boolean;
}

type BcTab = 'profile' | 'positioning' | 'compete' | 'battlecard';

export default function BattlecardContent({ competitor: c, isWisdom }: BattlecardContentProps) {
  const [activeTab, setActiveTab] = useState<BcTab>('profile');

  const threatBadge = c.threatLabel
    ? (() => {
        const tc: Record<string, { bg: string; color: string; border: string }> = {
          tier1: { bg: 'rgba(220,38,38,0.08)', color: '#dc2626', border: 'rgba(220,38,38,0.2)' },
          tier2: { bg: 'rgba(217,119,6,0.08)', color: '#d97706', border: 'rgba(217,119,6,0.2)' },
          tier3: { bg: 'rgba(37,99,235,0.08)', color: '#2563eb', border: 'rgba(37,99,235,0.2)' },
        };
        const t = tc[c.threatLevel || 'tier3'];
        return (
            <span className="threat-badge" style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}` }}>
            {c.threatLabel.replace(/^Tier \d+ — /, '')}
          </span>
        );
      })()
    : <span className="threat-badge" style={{ background: 'var(--co-wisdom-bg)', color: 'var(--co-wisdom)', border: '1px solid rgba(109,40,217,0.2)' }}>Home — WisdomAI</span>;

  return (
    <div>
      <div className="comp-header">
        <div className="comp-logo-circle" style={{ background: c.bg, color: c.color }}>{c.emoji}</div>
        <div className="comp-header-info">
          <div className="comp-header-name" style={{ color: c.color }}>{c.name}</div>
          <div className="comp-header-tagline">{c.tagline}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {threatBadge}
            <Badge variant="gray">{c.profile.stage}</Badge>
            <Badge variant="gray">{c.profile.arr}</Badge>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Company Profile</button>
        <button className={`tab ${activeTab === 'positioning' ? 'active' : ''}`} onClick={() => setActiveTab('positioning')}>Positioning</button>
        <button className={`tab ${activeTab === 'compete' ? 'active' : ''}`} onClick={() => setActiveTab('compete')}>Win/Loss</button>
        <button className={`tab ${activeTab === 'battlecard' ? 'active' : ''}`} onClick={() => setActiveTab('battlecard')}>Battlecard</button>
      </div>

      {activeTab === 'profile' && <CompanyProfile competitor={c} />}
      {activeTab === 'positioning' && <Positioning competitor={c} isWisdom={isWisdom} />}
      {activeTab === 'compete' && <WinLoss competitor={c} isWisdom={isWisdom} />}
      {activeTab === 'battlecard' && <Battlecard competitor={c} isWisdom={isWisdom} />}
    </div>
  );
}
