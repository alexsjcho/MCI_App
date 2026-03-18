import React from "react";
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { FEATURES } from "../../data/features";
import { shortName } from "../../utils/calculations";
import type { Competitor, FeatureStatus } from "../../types";

interface FeatureMatrixProps {
  competitors: Competitor[];
  categoryFilter: string;
}

const CAT_MAP: Record<string, string> = {
  ai: "AI & NLP",
  analytics: "Analytics",
  governance: "Governance",
  integration: "Integrations",
  deployment: "Deployment",
};

function StatusIcon({ status }: { status: FeatureStatus }) {
  switch (status) {
    case "full":
      return <Box component="span" sx={{ color: tokens.success, fontSize: "15px" }}>●</Box>;
    case "partial":
      return <Box component="span" sx={{ color: tokens.warn, fontSize: "13px" }}>◐</Box>;
    case "addon":
      return <Box component="span" sx={{ color: "#2563eb", fontSize: "11px" }}>+add-on</Box>;
    default:
      return <Box component="span" sx={{ color: "#d0ccf0", fontSize: "15px" }}>○</Box>;
  }
}

export function FeatureMatrix({ competitors, categoryFilter }: FeatureMatrixProps) {
  const activeCat = categoryFilter !== "all" ? (CAT_MAP[categoryFilter] ?? categoryFilter) : null;
  const rows = activeCat ? FEATURES.filter((f) => f.cat === activeCat) : FEATURES;

  const TH = {
    p: "13px 10px",
    textAlign: "center" as const,
    fontSize: "11px",
    fontFamily: '"Syne", sans-serif',
    fontWeight: 600,
    color: tokens.text,
    background: tokens.surface2,
    borderBottom: `1px solid ${tokens.border}`,
    borderRight: `1px solid ${tokens.border}`,
    whiteSpace: "nowrap" as const,
  };

  const TD = {
    p: "10px",
    textAlign: "center" as const,
    borderBottom: `1px solid ${tokens.border}`,
    borderRight: `1px solid ${tokens.border}`,
  };

  return (
    <Box sx={{ overflowX: "auto", borderRadius: "16px", border: `1px solid ${tokens.border}` }}>
      <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", minWidth: 860 }}>
        <Box component="thead">
          <Box component="tr">
            <Box component="th" sx={{ ...TH, textAlign: "left", pl: "18px", width: 210, minWidth: 210 }}>
              Feature
            </Box>
            {competitors.map((c) => (
              <Box
                component="th"
                key={c.id}
                sx={{
                  ...TH,
                  background: c.id === "wisdom" ? tokens.wisdomDim : tokens.surface2,
                  color: c.color,
                  borderBottom: c.id === "wisdom" ? `1px solid ${tokens.wisdom}` : `1px solid ${tokens.border}`,
                }}
              >
                {shortName(c.name)}
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="tbody">
          {rows.map((feature, idx) => {
            const prev = idx > 0 ? rows[idx - 1] : null;
            const showCatRow = !prev || feature.cat !== prev.cat;

            return (
              <React.Fragment key={feature.label}>
                {showCatRow && (
                  <Box
                    component="tr"
                    sx={{
                      "& td": {
                        background: "#eeecfa !important",
                        color: `${tokens.text3} !important`,
                        fontFamily: '"DM Mono", monospace',
                        fontSize: "10px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        p: "7px 10px 7px 18px",
                        fontWeight: 500,
                        borderBottom: `1px solid ${tokens.border}`,
                      },
                    }}
                  >
                    <Box component="td" colSpan={competitors.length + 1}>
                      {feature.cat}
                    </Box>
                  </Box>
                )}

                <Box
                  component="tr"
                  sx={{
                    "&:hover td": { background: "rgba(91,77,232,0.025)" },
                    "&:hover td.wcol": { background: "rgba(91,77,232,0.07)" },
                  }}
                >
                  <Box
                    component="td"
                    sx={{
                      ...TD,
                      textAlign: "left",
                      pl: "18px",
                      color: tokens.text2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {feature.label}
                  </Box>

                  {competitors.map((c) => {
                    const status = (feature[c.id] ?? "no") as FeatureStatus;

                    return (
                      <Box
                        component="td"
                        key={c.id}
                        className={c.id === "wisdom" ? "wcol" : ""}
                        sx={{
                          ...TD,
                          background: c.id === "wisdom" ? "rgba(91,77,232,0.04)" : "transparent",
                        }}
                      >
                        <StatusIcon status={status} />
                      </Box>
                    );
                  })}
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

