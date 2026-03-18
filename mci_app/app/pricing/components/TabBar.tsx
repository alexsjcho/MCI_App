"use client";

import { Box, ButtonBase } from "@mui/material";
import { tokens } from "../theme";
import { usePricing } from "../context/PricingContext";
import type { TabId } from "../types";
import { TAB_LABELS } from "../types";

const TABS = Object.entries(TAB_LABELS) as [TabId, string][];

export function TabBar() {
  const { activeTab, setActiveTab } = usePricing();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        px: 0,
        overflowX: "auto",
      }}
    >
      {TABS.map(([id, label]) => {
        const isActive = id === activeTab;

        return (
          <ButtonBase
            key={id}
            onClick={() => setActiveTab(id)}
            sx={{
              px: "18px",
              py: "10px",
              fontSize: "13px",
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              color: isActive ? tokens.wisdom : tokens.text3,
              borderBottom: `2px solid ${isActive ? tokens.wisdom : "transparent"}`,
              mb: "-1px",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
              "&:hover": { color: isActive ? tokens.wisdom : tokens.text2 },
            }}
          >
            {label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

