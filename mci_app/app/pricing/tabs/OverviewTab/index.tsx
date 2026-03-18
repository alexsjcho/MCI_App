"use client";

import { Box } from "@mui/material";
import { useSelectedCompetitors } from "../../hooks/useSelectedCompetitors";
import { SectionHeader } from "../../components/SectionHeader";
import { InsightBox } from "../../components/InsightBox";
import { StatChipGrid } from "./StatChipGrid";
import { CompetitorCard } from "./CompetitorCard";

export function OverviewTab() {
  const { selected, competitors } = useSelectedCompetitors();

  return (
    <Box>
      <SectionHeader
        title="Market Landscape"
        description="Snapshot of pricing, positioning, and competitive intensity across selected vendors in the AI data analytics space."
      />

      <StatChipGrid competitors={competitors} />

      <InsightBox>
        <strong>Key positioning opportunity:</strong> Most competitors require a direct sales engagement
        before pricing is disclosed. WisdomAI can win deals faster with clear, value-transparent tiers.
      </InsightBox>

      <InsightBox variant="warn">
        <strong>Watch: Microsoft Power BI</strong> raised Pro prices 40% in April 2025. Enterprise
        customers on renewal cycles are actively seeking alternatives.
      </InsightBox>

      <InsightBox variant="success">
        <strong>TCO advantage:</strong> WisdomAI&apos;s consumption-aligned model avoids the &quot;seat
        tax&quot; that inflates ThoughtSpot and Power BI costs at scale — landing 30–50% lower in 3-year TCO.
      </InsightBox>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
          gap: "16px",
          mb: "24px",
        }}
      >
        {selected.map((c) => (
          <CompetitorCard key={c.id} competitor={c} />
        ))}
      </Box>
    </Box>
  );
}

