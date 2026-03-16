'use client';

import React, { useState, useRef, useEffect } from 'react';
import { competitors } from '../../data/competitors';
import { wisdomAI } from '../../data/wisdomai';

interface CompetitorDropdownProps {
  currentId: string;
  onSelect: (id: string) => void;
}

export default function CompetitorDropdown({ currentId, onSelect }: CompetitorDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
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

  const current = currentId === 'wisdomai' ? wisdomAI : competitors.find(c => c.id === currentId) || wisdomAI;

  const filtered = competitors.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.shortName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="comp-dropdown-wrap" style={{ marginBottom: 0, paddingBottom: 0, alignSelf: 'center' }} ref={wrapRef}>
      <button
        className={`comp-dropdown-btn ${open ? 'open' : ''}`}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); setSearch(''); }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: current.color, flexShrink: 0 }}></div>
        <span>{current.shortName}</span>
        <span className="chevron">▼</span>
      </button>

      {open && (
        <div className="comp-dropdown-panel open">
          <div className="comp-dd-search">
            <input
              type="text"
              placeholder="Search competitors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="comp-dd-list">
            {search === '' && (
              <div
                className={`comp-dd-item ${currentId === 'wisdomai' ? 'selected' : ''}`}
                onClick={(e) => { e.stopPropagation(); onSelect('wisdomai'); setOpen(false); }}
              >
                <div className="dd-dot" style={{ background: '#6D28D9' }}></div>
                <div className="dd-name">WisdomAI <span style={{ fontSize: '10px', fontWeight: 400, color: 'var(--co-text-muted)' }}>(you)</span></div>
                <span className="dd-tier" style={{ background: 'var(--co-wisdom-bg)', color: 'var(--co-wisdom)' }}>Home</span>
              </div>
            )}
            {filtered.map(c => {
              const tierNum = c.threatLevel === 'tier1' ? '1' : c.threatLevel === 'tier2' ? '2' : '3';
              return (
                <div
                  key={c.id}
                  className={`comp-dd-item ${currentId === c.id ? 'selected' : ''}`}
                  onClick={(e) => { e.stopPropagation(); onSelect(c.id); setOpen(false); }}
                >
                  <div className="dd-dot" style={{ background: c.color }}></div>
                  <div className="dd-name">{c.name}</div>
                  <span className={`dd-tier dd-tier-${tierNum}`}>T{tierNum}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
