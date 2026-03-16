'use client';

import React from 'react';

type TabName = 'overview' | 'competitor' | 'quadrants';

interface TabBarProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="tabs-bar">
      <button
        className={`ltab ${activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => onTabChange('overview')}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginRight: '5px', verticalAlign: '-1px' }}>
          <rect x="1" y="1" width="6" height="6" rx="1.5"/>
          <rect x="9" y="1" width="6" height="6" rx="1.5"/>
          <rect x="1" y="9" width="6" height="6" rx="1.5"/>
          <rect x="9" y="9" width="6" height="6" rx="1.5"/>
        </svg>
        Overview
      </button>
      <button
        className={`ltab ${activeTab === 'competitor' ? 'active' : ''}`}
        onClick={() => onTabChange('competitor')}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginRight: '5px', verticalAlign: '-1px' }}>
          <circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
        </svg>
        Competitor
      </button>
      <button
        className={`ltab ${activeTab === 'quadrants' ? 'active' : ''}`}
        onClick={() => onTabChange('quadrants')}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginRight: '5px', verticalAlign: '-1px' }}>
          <circle cx="8" cy="8" r="6"/><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/>
        </svg>
        Quadrant Maps
      </button>
    </div>
  );
}
