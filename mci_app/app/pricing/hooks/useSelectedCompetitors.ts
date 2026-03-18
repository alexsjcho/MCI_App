import { useMemo } from "react";
import { usePricing } from "../context/PricingContext";
import { COMPETITORS } from "../data/competitors";
import { getNonWisdom, getSelectedComps } from "../utils/calculations";
import type { Competitor } from "../types";

/**
 * Returns the currently selected competitors, split into two arrays:
 *   - `selected`     — all selected competitors (including WisdomAI)
 *   - `competitors`  — selected competitors excluding WisdomAI
 */
export function useSelectedCompetitors(): {
  selected: Competitor[];
  competitors: Competitor[];
  wisdomComp: Competitor;
} {
  const { selectedIds } = usePricing();

  return useMemo(() => {
    const selected = getSelectedComps(COMPETITORS, selectedIds);
    const competitors = getNonWisdom(selected);
    const wisdomComp = COMPETITORS.find((c) => c.id === "wisdom")!;

    return { selected, competitors, wisdomComp };
  }, [selectedIds]);
}

