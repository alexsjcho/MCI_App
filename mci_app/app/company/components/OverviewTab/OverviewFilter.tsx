'use client';

import React, { useState, useRef, useEffect } from 'react';
import { competitors } from '../../data/competitors';

interface OverviewFilterProps {
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onFilterByTier: (tier: string) => void;
  activeTier: string | null;
}

export default function OverviewFilter({
  selected, onToggle, onSelectAll, onDeselectAll, onFilterByTier, activeTier
}: OverviewFilterProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const total = competitors.length;
  const sel = selected.size;
  const label = sel === total ? 'All competitors' : sel === 0 ? 'WisdomAI only' : `${sel} of ${total} selected`;

  const tierColors: Record<string, { bg: string; color: string }> = {
    '1': { bg: 'rgba(220,38,38,0.08)', color: '#dc2626' },
    '2': { bg: 'rgba(217,119,6,0.08)', color: '#d97706' },
    '3': { bg: 'rgba(37,99,235,0.08)', color: '#2563eb' },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
      <p style={{ fontSize: '12px', color: 'var(--co-text-muted)', margin: 0 }}>
        WisdomAI always shown. Click any row to open the full battlecard.
      </p>
      <div style={{ position: 'relative' }} ref={wrapRef}>
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 12px',
            border: '1px solid var(--co-border-strong)', background: 'var(--co-surface)',
            borderRadius: '8px', fontFamily: 'inherit', fontSize: '13px', fontWeight: 500,
            color: 'var(--co-text-primary)', cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 4h12M4 8h8M6 12h4"/>
          </svg>
          <span>{label}</span>
          <span style={{ fontSize: '10px', color: 'var(--co-text-muted)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : '' }}>▼</span>
        </button>

        {open && (
          <div style={{
            position: 'absolute', right: 0, top: 'calc(100% + 6px)', width: '270px',
            background: 'var(--co-surface)', border: '1px solid var(--co-border-strong)',
            borderRadius: 'var(--co-radius-lg)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 50, overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', borderBottom: '1px solid var(--co-border)' }}>
              {(['tier1', 'tier2', 'tier3'] as const).map((tier, i) => {
                const num = String(i + 1);
                const isActive = activeTier === tier;
                const activeClass = isActive ? `active-t${num}` : '';
                return (
                  <button
                    key={tier}
                    className={`ov-tier-btn ${activeClass}`}
                    onClick={(e) => { e.stopPropagation(); onFilterByTier(tier); }}
                  >
                    T{num}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', borderBottom: '1px solid var(--co-border)' }}>
              <button
                onClick={(e) => { e.stopPropagation(); onSelectAll(); }}
                style={{ flex: 1, padding: '5px 0', border: '1px solid var(--co-border-strong)', background: 'var(--co-wisdom-bg)', color: 'var(--co-wisdom)', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer' }}
              >Select all</button>
              <button
                onClick={(e) => { e.stopPropagation(); onDeselectAll(); }}
                style={{ flex: 1, padding: '5px 0', border: '1px solid var(--co-border-strong)', background: 'var(--co-surface2)', color: 'var(--co-text-secondary)', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600, borderRadius: '6px', cursor: 'pointer' }}
              >Deselect all</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', borderBottom: '1px solid var(--co-border)', background: 'var(--co-wisdom-bg)' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--co-wisdom)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2"><polyline points="2,6 5,9 10,3"/></svg>
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6D28D9', flexShrink: 0 }}></div>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--co-wisdom)', flex: 1 }}>WisdomAI</span>
              <span style={{ fontSize: '10px', color: 'var(--co-wisdom)', background: 'rgba(109,40,217,0.15)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Always on</span>
            </div>
            <div style={{ maxHeight: '260px', overflowY: 'auto', padding: '4px 0' }}>
              {competitors.map(c => {
                const checked = selected.has(c.id);
                const tierNum = c.threatLevel === 'tier1' ? '1' : c.threatLevel === 'tier2' ? '2' : '3';
                const tc = tierColors[tierNum];
                return (
                  <div
                    key={c.id}
                    onClick={(e) => { e.stopPropagation(); onToggle(c.id); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px', cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'var(--co-surface2)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: checked ? c.color : 'transparent',
                      border: `1.5px solid ${checked ? c.color : 'var(--co-border-strong)'}`,
                      transition: 'all 0.15s',
                    }}>
                      {checked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.2"><polyline points="2,6 5,9 10,3"/></svg>}
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color, flexShrink: 0 }}></div>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--co-text-primary)', flex: 1 }}>{c.shortName}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px', background: tc.bg, color: tc.color }}>T{tierNum}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
