"use client";

import { Box, Typography } from "@mui/material";
import type { Competitor } from "../types/data";
import { tokens } from "../theme";

export function CompetitorCard({ competitor }: { competitor: Competitor }) {
  const c = competitor;
  const isWisdom = c.id === "wisdom";

  return (
    <Box
      sx={{
        border: `1px solid ${isWisdom ? tokens.wisdomDim : tokens.border}`,
        borderRadius: "16px",
        p: "16px",
        background: isWisdom ? `rgba(91,77,232,0.06)` : tokens.surface2,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: tokens.text,
          mb: 0.5,
        }}
      >
        {c.name}
      </Typography>
      <Typography sx={{ fontSize: 12, color: tokens.text3 }}>{c.category}</Typography>
    </Box>
  );
}

