'use client';

import React, { useState, useCallback } from 'react';
import { competitors } from '../../data/competitors';
import OverviewFilter from './OverviewFilter';
import OverviewTable from './OverviewTable';

interface OverviewTabProps {
  onOpenCompetitor: (id: string) => void;
}

export default function OverviewTab({ onOpenCompetitor }: OverviewTabProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(competitors.map(c => c.id)));
  const [activeTier, setActiveTier] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setActiveTier(null);
    setSelected(new Set(competitors.map(c => c.id)));
  }, []);

  const handleDeselectAll = useCallback(() => {
    setActiveTier(null);
    setSelected(new Set());
  }, []);

  const handleFilterByTier = useCallback((tier: string) => {
    setActiveTier(prev => {
      if (prev === tier) {
        setSelected(new Set(competitors.map(c => c.id)));
        return null;
      }
      setSelected(new Set(competitors.filter(c => c.threatLevel === tier).map(c => c.id)));
      return tier;
    });
  }, []);

  const visibleCompetitors = competitors.filter(c => selected.has(c.id));

  return (
    <div>
      <OverviewFilter
        selected={selected}
        onToggle={handleToggle}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onFilterByTier={handleFilterByTier}
        activeTier={activeTier}
      />
      <OverviewTable
        visibleCompetitors={visibleCompetitors}
        onRowClick={onOpenCompetitor}
      />
    </div>
  );
}
