"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useSelectedCompetitors } from "../../hooks/useSelectedCompetitors";
import { TIER_DATA } from "../../data/tiers";
import { tokens } from "../../theme";
import { SectionHeader } from "../../components/SectionHeader";
import { FilterBar } from "../../components/FilterBar";
import { PanelCard } from "../../components/PanelCard";
import { TierBlock } from "./TierBlock";
import { TierValueChart } from "./TierValueChart";

const TIER_FILTERS = [
  { key: "all", label: "All" },
  { key: "starter", label: "Has Free/Starter" },
  { key: "usage", label: "Usage-Based" },
  { key: "user", label: "Per-User" },
  { key: "capacity", label: "Capacity-Based" },
];

export function TiersTab() {
  const [tierFilter, setTierFilter] = useState("all");
  const { selected } = useSelectedCompetitors();

  const filtered = selected.filter((c) => tierFilter === "all" || c.tier.includes(tierFilter));

  return (
    <Box>
      <SectionHeader
        title="Tier Analysis"
        description="Pricing tier structure for selected vendors — Starter, Professional, and Enterprise tiers mapped to buyer profiles."
      />

      <FilterBar label="Model type:" options={TIER_FILTERS} active={tierFilter} onChange={setTierFilter} />

      <PanelCard
        title="Value score vs. deploy ease"
        subtitle="Selected vendors — composite value score and implementation simplicity"
        sx={{ mt: "8px" }}
      >
        <TierValueChart competitors={selected} />
      </PanelCard>

      {filtered.length === 0 ? (
        <Box sx={{ p: "40px 24px", textAlign: "center", color: tokens.text3, fontSize: "13px" }}>
          No vendors match this filter for the current selection.
        </Box>
      ) : (
        filtered.map((c) => (TIER_DATA[c.id] ? <TierBlock key={c.id} competitor={c} tierData={TIER_DATA[c.id]} /> : null))
      )}
    </Box>
  );
}

