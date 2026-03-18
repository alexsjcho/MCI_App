"use client";

import { Box, ButtonBase } from "@mui/material";
import { COMPETITORS } from "../data/competitors";
import { tokens } from "../theme";
import { usePricing } from "../context/PricingContext";
import { shortName } from "../utils/calculations";

export function CompetitorChips() {
  const { selectedIds, toggleComp } = usePricing();

  const visible = COMPETITORS.filter(
    (c) => c.id !== "wisdom" && selectedIds.has(c.id),
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
      {visible.map((c) => (
        <ButtonBase
          key={c.id}
          onClick={() => toggleComp(c.id)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            px: "9px",
            pl: "7px",
            py: "3px",
            borderRadius: "20px",
            border: `1px solid ${c.color}38`,
            background: `${c.color}12`,
            color: c.color,
            fontFamily: '"Inter", sans-serif',
            fontSize: "11px",
            cursor: "pointer",
            transition: "opacity 0.15s",
            "&:hover": { opacity: 0.65 },
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: c.color,
              flexShrink: 0,
            }}
          />
          {shortName(c.name)}
          <Box component="span" sx={{ fontSize: "9px", opacity: 0.55, ml: "1px" }}>
            ✕
          </Box>
        </ButtonBase>
      ))}
    </Box>
  );
}

