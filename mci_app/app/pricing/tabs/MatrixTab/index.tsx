"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelectedCompetitors } from "../../hooks/useSelectedCompetitors";
import { tokens } from "../../theme";
import { SectionHeader } from "../../components/SectionHeader";
import { FilterBar } from "../../components/FilterBar";
import { FeatureMatrix } from "./FeatureMatrix";

const MATRIX_FILTERS = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI & NLP" },
  { key: "analytics", label: "Analytics" },
  { key: "governance", label: "Governance" },
  { key: "integration", label: "Integrations" },
  { key: "deployment", label: "Deployment" },
];

const LEGEND = [
  { icon: "●", color: tokens.success, label: "Full support" },
  { icon: "◐", color: tokens.warn, label: "Partial / limited" },
  { icon: "○", color: "#d0ccf0", label: "Not available" },
  { icon: "+add-on", color: "#2563eb", label: "Paid add-on" },
];

export function MatrixTab() {
  const [catFilter, setCatFilter] = useState("all");
  const { selected } = useSelectedCompetitors();

  return (
    <Box>
      <SectionHeader
        title="Feature Matrix"
        description="Capability comparison across AI, analytics, governance, integrations, and deployment for selected competitors."
      />

      <FilterBar label="Category:" options={MATRIX_FILTERS} active={catFilter} onChange={setCatFilter} />

      {/* Legend directly under the category filter (before the matrix table). */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "14px", mt: 0, alignItems: "center" }}>
        {LEGEND.map((item) => (
          <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Box component="span" sx={{ color: item.color, fontSize: item.icon.length > 1 ? "11px" : "14px" }}>
              {item.icon}
            </Box>
            <Typography sx={{ fontSize: "12px", color: tokens.text3 }}>
              &nbsp;{item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <FeatureMatrix competitors={selected} categoryFilter={catFilter} />
    </Box>
  );
}

