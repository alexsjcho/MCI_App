"use client";

import { useState } from "react";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { tokens } from "../theme";
import { usePricing } from "../context/PricingContext";
import { COMPETITORS } from "../data/competitors";
import { competitors as companyCompetitors } from "../../company/data/competitors";

type TierFilter = "all" | "Tier 1" | "Tier 2" | "Tier 3";

const tierInfoLabels: Record<Exclude<TierFilter, "all">, string> = {
  "Tier 1": "Tier 1 - Direct Threats",
  "Tier 2": "Tier 2 - Adjacent Players",
  "Tier 3": "Tier 3 - Emerging",
};

const tierFromThreatLevel = (tierLevel: string): Exclude<TierFilter, "all"> => {
  if (tierLevel === "tier1") return "Tier 1";
  if (tierLevel === "tier2") return "Tier 2";
  return "Tier 3";
};

const getTierForCompetitorId = (competitorId: string): Exclude<TierFilter, "all"> | null => {
  const match = companyCompetitors.find((c) => c.id === competitorId);
  if (!match) return null;
  // Pricing module uses the same threatLevel labels from the company module.
  return tierFromThreatLevel(match.threatLevel);
};

export function CompetitorDropdown() {
  const [open, setOpen] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState<TierFilter>("all");
  const { selectedIds, toggleComp, selectAll, clearAll, replaceSelectedIds } = usePricing();

  const nonWisdomTotal = COMPETITORS.length - 1;
  const nonWisdomSelected = selectedIds.size - 1; // wisdom is always selected

  const triggerText =
    nonWisdomSelected === nonWisdomTotal
      ? `All ${nonWisdomSelected} selected`
      : nonWisdomSelected === 1
        ? "1 competitor selected"
        : `${nonWisdomSelected} competitors selected`;

  const competitorIdsForTier = (tier: Exclude<TierFilter, "all">): string[] => {
    return COMPETITORS.filter((c) => {
      if (c.id === "wisdom") return false;
      const compTier = getTierForCompetitorId(c.id);
      return compTier === tier;
    }).map((c) => c.id);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: "relative", flexShrink: 0 }}>
        <ButtonBase
          onClick={() => setOpen((v) => !v)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            px: "12px",
            py: "6px",
            background: tokens.surface,
            border: `1px solid ${open ? tokens.wisdom : tokens.border2}`,
            borderRadius: "10px",
            cursor: "pointer",
            fontFamily: '"Inter", sans-serif',
            fontSize: "12px",
            color: tokens.text2,
            minWidth: 210,
            userSelect: "none",
            transition: "border-color 0.15s, background 0.15s",
            "&:hover": { borderColor: tokens.wisdom },
          }}
        >
          <span>{triggerText}</span>
          <Box
            component="span"
            sx={{
              ml: "auto",
              fontSize: "9px",
              color: tokens.text3,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.15s",
              display: "inline-block",
            }}
          >
            ▼
          </Box>
        </ButtonBase>

        {open && (
          <Paper
            sx={{
              position: "absolute",
              top: "calc(100% + 5px)",
              left: 0,
              minWidth: 270,
              zIndex: 300,
              borderRadius: "16px",
              border: `1px solid ${tokens.border2}`,
              boxShadow:
                "0 8px 32px rgba(91,77,232,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                px: "14px",
                py: "10px",
                borderBottom: `1px solid ${tokens.border}`,
                background: tokens.surface2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontFamily: '"DM Mono", monospace',
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: tokens.text3,
                }}
              >
                Select competitors to compare
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                {[{ label: "All", fn: selectAll }, { label: "Clear", fn: clearAll }].map(
                  ({ label, fn }) => (
                    <ButtonBase
                      key={label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTierFilter("all");
                        fn();
                      }}
                      sx={{
                        fontSize: "11px",
                        color: tokens.wisdom,
                        fontFamily: '"Inter", sans-serif',
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {label}
                    </ButtonBase>
                  ),
                )}
              </Box>
            </Box>

            <Box
              sx={{
                px: "14px",
                py: "10px",
                borderBottom: `1px solid ${tokens.border}`,
                background: tokens.surface,
              }}
            >
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {(["Tier 1", "Tier 2", "Tier 3"] as const).map((tier) => {
                  const isActive = activeTierFilter === tier;
                  const short = tier === "Tier 1" ? "T1" : tier === "Tier 2" ? "T2" : "T3";

                  return (
                    <ButtonBase
                      key={tier}
                      aria-label={short}
                      onClick={(e) => {
                        e.stopPropagation();
                        const next: TierFilter = activeTierFilter === tier ? "all" : tier;
                        setActiveTierFilter(next);

                        // Important: never cause parent state updates from inside a
                        // state updater function, because React may execute the updater
                        // during rendering (leading to "Cannot update ... while rendering ...").
                        if (next === "all") {
                          selectAll();
                        } else {
                          replaceSelectedIds(
                            new Set(["wisdom", ...competitorIdsForTier(next)])
                          );
                        }
                      }}
                      sx={{
                        px: "12px",
                        py: "6px",
                        borderRadius: "12px",
                        border: `1px solid ${
                          isActive ? tokens.wisdom : tokens.border2
                        }`,
                        background: isActive ? "rgba(91,77,232,0.08)" : tokens.surface2,
                        color: isActive ? tokens.wisdom : tokens.text2,
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "12px",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Box component="span">{short}</Box>
                      <Box
                        component="span"
                        aria-hidden="true"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                      >
                        <InfoOutlinedIcon
                          fontSize="small"
                          sx={{ fontSize: 14, opacity: 0.9 }}
                        />
                      </Box>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>

            <Box
              data-testid="competitor-dropdown-options"
              sx={{ maxHeight: 300, overflowY: "auto", py: "4px" }}
            >
              {COMPETITORS.filter((c) => {
                if (c.id === "wisdom") return true;
                if (activeTierFilter === "all") return true;
                const tier = getTierForCompetitorId(c.id);
                return tier ? tier === activeTierFilter : true;
              }).map((c) => {
                const isWisdom = c.id === "wisdom";
                const checked = selectedIds.has(c.id);

                return (
                  <Box
                    key={c.id}
                    onClick={() => {
                      if (isWisdom) return;
                      toggleComp(c.id);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      px: "14px",
                      py: "8px",
                      cursor: isWisdom ? "default" : "pointer",
                      background: isWisdom ? tokens.wisdomDim : "transparent",
                      transition: "background 0.1s",
                      "&:hover": {
                        background: isWisdom
                          ? "rgba(91,77,232,0.10)"
                          : tokens.surface2,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 15,
                        height: 15,
                        borderRadius: "4px",
                        border: `1.5px solid ${
                          checked ? tokens.wisdom : tokens.border2
                        }`,
                        background: checked ? tokens.wisdom : tokens.surface,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        color: "#fff",
                        fontWeight: 700,
                        transition: "all 0.1s",
                      }}
                    >
                      {checked ? "✓" : ""}
                    </Box>

                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: c.color,
                        flexShrink: 0,
                      }}
                    />

                    <Typography sx={{ fontSize: "13px", color: tokens.text, flex: 1 }}>
                      {c.name}
                      {isWisdom ? (
                        <Box
                          component="span"
                          sx={{ fontSize: "10px", color: tokens.wisdom, ml: "4px" }}
                        >
                          (you)
                        </Box>
                      ) : null}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "10px",
                        color: tokens.text3,
                        fontFamily: '"DM Mono", monospace',
                      }}
                    >
                      {c.category}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}

