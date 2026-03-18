"use client";

import { Box, Typography } from "@mui/material";
import { useSelectedCompetitors } from "../../hooks/useSelectedCompetitors";
import { tokens } from "../../theme";
import { SectionHeader } from "../../components/SectionHeader";
import { PanelCard } from "../../components/PanelCard";
import { ValueBubbleChart } from "./ValueBubbleChart";
import { QuadrantBreakdown } from "./QuadrantBreakdown";

const LEGEND_ITEMS = [
  { color: tokens.wisdom, label: "WisdomAI" },
  { color: "#2563eb", label: "Platform / Warehouse" },
  { color: tokens.warn, label: "BI / Analytics" },
  { color: tokens.danger, label: "Enterprise Legacy" },
  { color: tokens.success, label: "Developer / Notebook" },
];

export function ValueMapTab() {
  const { selected } = useSelectedCompetitors();

  return (
    <Box>
      <SectionHeader
        title="Value / Price Map"
        description="Bubble size = estimated ACV. X = entry price. Y = composite value score (AI maturity, ease of use, connectivity, enterprise, support)."
      />

      <PanelCard
        title="Value vs. Price Position"
        subtitle="Higher Y = more value. Lower X = more accessible entry price. Best position: top-left."
        sx={{ mb: "20px" }}
      >
        <ValueBubbleChart competitors={selected} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "14px", mt: "12px", alignItems: "center" }}>
          {LEGEND_ITEMS.map((item) => (
            <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Box sx={{ width: 10, height: 10, borderRadius: "2px", background: item.color }} />
              <Typography sx={{ fontSize: "12px", color: tokens.text3 }}>{item.label}</Typography>
            </Box>
          ))}

          <Typography sx={{ ml: "auto", fontSize: "11px", color: tokens.text3 }}>Bubble size ∝ avg. contract value</Typography>
        </Box>
      </PanelCard>

      <QuadrantBreakdown />
    </Box>
  );
}

