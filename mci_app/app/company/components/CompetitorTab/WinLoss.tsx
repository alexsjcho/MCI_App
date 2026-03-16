'use client';

import React from 'react';
import { Competitor } from '../../data/competitors';
import Card from '../ui/Card';

interface WinLossProps {
  competitor: Competitor;
  isWisdom: boolean;
}

export default function WinLoss({ competitor: c, isWisdom }: WinLossProps) {
  return (
    <div>
      <div className="win-lose-grid" style={{ marginBottom: '16px' }}>
        <div className="win-block">
          <div className="wl-title">{isWisdom ? 'WisdomAI wins when...' : 'They win when...'}</div>
          {c.winConditions.map((w, i) => (
            <div key={i} className="wl-item">{w}</div>
          ))}
        </div>
        <div className="lose-block">
          <div className="wl-title">{isWisdom ? 'WisdomAI loses when...' : 'They lose when...'}</div>
          {c.loseConditions.map((l, i) => (
            <div key={i} className="wl-item">{l}</div>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <Card title={isWisdom ? 'Strengths' : 'Where They Genuinely Win'}>
          <ul className="strengths-list">
            {c.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Card>
        <Card title="Known Weaknesses">
          <ul className="weaknesses-list">
            {c.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </Card>
      </div>
    </div>
  );
}
