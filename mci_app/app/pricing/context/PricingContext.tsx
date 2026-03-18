"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { TabId } from "../types";
import { COMPETITORS } from "../data/competitors";

interface PricingContextValue {
  selectedIds: Set<string>;
  activeTab: TabId;
  toggleComp: (id: string) => void;
  selectAll: () => void;
  clearAll: () => void;
  replaceSelectedIds: (next: Set<string>) => void;
  setActiveTab: (tab: TabId) => void;
}

const PricingContext = createContext<PricingContextValue | null>(null);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(COMPETITORS.map((c) => c.id)));
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const toggleComp = useCallback((id: string) => {
    if (id === "wisdom") return;

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        // Keep at least WisdomAI + one competitor.
        if (next.size <= 2) return prev;
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(COMPETITORS.map((c) => c.id)));
  }, []);

  const clearAll = useCallback(() => {
    // Keep WisdomAI + Snowflake by default for deterministic UX.
    setSelectedIds(new Set(["wisdom", COMPETITORS[1].id]));
  }, []);

  const replaceSelectedIds = useCallback((next: Set<string>) => {
    // Normalize to a new Set instance to keep React state updates predictable.
    setSelectedIds(new Set(next));
  }, []);

  const value = useMemo<PricingContextValue>(
    () => ({
      selectedIds,
      activeTab,
      toggleComp,
      selectAll,
      clearAll,
      replaceSelectedIds,
      setActiveTab,
    }),
    [selectedIds, activeTab, toggleComp, selectAll, clearAll, replaceSelectedIds],
  );

  return <PricingContext.Provider value={value}>{children}</PricingContext.Provider>;
}

export function usePricing(): PricingContextValue {
  const ctx = useContext(PricingContext);
  if (!ctx) throw new Error("usePricing must be used within <PricingProvider>");
  return ctx;
}

