import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { calcTCO } from "../../utils/calculations";
import { COMPETITORS } from "../../data/competitors";
import type { Competitor } from "../../types";

// Resolve WisdomAI by ID — safe against reordering in the data array
const WISDOM_COMP = COMPETITORS.find((c) => c.id === "wisdom")!;
const WISDOM_TCO = calcTCO(WISDOM_COMP.tco);

interface TCOSummaryBarProps {
  competitors: Competitor[]; // non-wisdom selected
}

function SumCell({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <Box sx={{ background: tokens.surface2, p: "14px 20px", textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: "10px",
          color: tokens.text3,
          fontFamily: '"DM Mono", monospace',
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          mb: "5px",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Syne", sans-serif',
          fontSize: "20px",
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export function TCOSummaryBar({ competitors }: TCOSummaryBarProps) {
  const avgTCO = competitors.length ? Math.round(competitors.reduce((s, c) => s + calcTCO(c.tco), 0) / competitors.length) : 0;
  const savings = avgTCO - WISDOM_TCO;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "1px",
        background: tokens.border,
        borderRadius: "10px",
        overflow: "hidden",
        mb: "20px",
      }}
    >
      <SumCell label="WisdomAI 3-yr TCO" value={`$${WISDOM_TCO}K`} color={tokens.success} />
      <SumCell
        label="Selected Avg. 3-yr TCO"
        value={competitors.length ? `$${avgTCO}K` : "—"}
        color={tokens.warn}
      />
      <SumCell
        label="WisdomAI Savings vs. Avg."
        value={competitors.length ? `$${savings}K` : "—"}
        color={tokens.wisdom}
      />
    </Box>
  );
}

