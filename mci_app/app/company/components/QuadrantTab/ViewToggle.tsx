'use client';

import React from 'react';

interface ViewToggleProps {
  view: 'grid' | 'stack';
  onChange: (view: 'grid' | 'stack') => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  const activeStyle: React.CSSProperties = {
    background: 'var(--co-surface)', color: 'var(--co-text-primary)',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  };
  const inactiveStyle: React.CSSProperties = {
    background: 'transparent', color: 'var(--co-text-muted)',
  };
  const btnBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: '30px', height: '28px', border: 'none', borderRadius: '5px',
    cursor: 'pointer', transition: 'all 0.15s',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--co-surface2)', borderRadius: '7px', padding: '3px', gap: '2px' }}>
      <button
        onClick={() => onChange('grid')}
        title="Grid view (2 columns)"
        style={{ ...btnBase, ...(view === 'grid' ? activeStyle : inactiveStyle) }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
          <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
        </svg>
      </button>
      <button
        onClick={() => onChange('stack')}
        title="Stacked view (1 column)"
        style={{ ...btnBase, ...(view === 'stack' ? activeStyle : inactiveStyle) }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="14" height="4" rx="1"/><rect x="1" y="6.5" width="14" height="4" rx="1"/>
          <rect x="1" y="12" width="14" height="3" rx="1"/>
        </svg>
      </button>
    </div>
  );
}
