"use client";

import { Box } from "@mui/material";
import { useSelectedCompetitors } from "../../hooks/useSelectedCompetitors";
import { SectionHeader } from "../../components/SectionHeader";
import { InsightBox } from "../../components/InsightBox";
import { PanelCard } from "../../components/PanelCard";
import { TCOSummaryBar } from "./TCOSummaryBar";
import { TCOBarChart } from "./TCOBarChart";
import { TCODonutChart } from "./TCODonutChart";
import { TCOTable } from "./TCOTable";

export function TCOTab() {
  const { selected, competitors } = useSelectedCompetitors();

  return (
    <Box>
      <SectionHeader
        title="TCO Breakdown"
        description="3-year Total Cost of Ownership for a 50-user enterprise team including licenses, implementation, training, storage/compute, and support."
      />

      <InsightBox variant="success">
        <strong>WisdomAI implementation advantage:</strong> Average 2–4 week deployment vs. 3–6 months for Snowflake
        Intelligence and Databricks Genie — translating to $40–80K in reduced professional services.
      </InsightBox>

      <TCOSummaryBar competitors={competitors} />

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", mb: "20px" }}>
        <PanelCard title="3-Year TCO Comparison" subtitle="50-user enterprise deployment ($000s)">
          <TCOBarChart competitors={selected} />
        </PanelCard>

        <PanelCard title="TCO Component Breakdown" subtitle="WisdomAI vs. selected average">
          <TCODonutChart competitors={competitors} />
        </PanelCard>
      </Box>

      <PanelCard title="Detailed Cost Breakdown" subtitle="USD/year for 50 users. Green = cost-effective, red = high-cost item.">
        <TCOTable competitors={selected} />
      </PanelCard>
    </Box>
  );
}

