import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { calcTCO, fmtUSD } from "../../utils/calculations";
import { COMPETITORS } from "../../data/competitors";
import type { Competitor } from "../../types";

// Resolve WisdomAI by ID — safe against reordering in the data array
const WISDOM_COMP = COMPETITORS.find((c) => c.id === "wisdom")!;
const WISDOM_TCO = calcTCO(WISDOM_COMP.tco);

const TH_STYLE = {
  p: "10px 14px",
  textAlign: "left" as const,
  fontSize: "10px",
  fontFamily: '"DM Mono", monospace',
  textTransform: "uppercase" as const,
  letterSpacing: "0.07em",
  color: tokens.text3,
  background: tokens.surface2,
  borderBottom: `1px solid ${tokens.border}`,
  whiteSpace: "nowrap" as const,
};

const TABLE_HEADERS = [
  "Vendor",
  "License (Y1)",
  "Implementation",
  "Training",
  "Storage / Compute",
  "Support",
  "3-Yr Total",
  "vs. WisdomAI",
];

interface TCOTableProps {
  competitors: Competitor[]; // all selected (including wisdom)
}

export function TCOTable({ competitors }: TCOTableProps) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <Box component="thead">
          <Box component="tr">
            {TABLE_HEADERS.map((h) => (
              <Box component="th" key={h} sx={TH_STYLE}>
                {h}
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="tbody">
          {competitors.map((c) => {
            const t = c.tco;
            const total = calcTCO(t);
            const diff = total - WISDOM_TCO;
            const isW = c.id === "wisdom";

            return (
              <Box
                component="tr"
                key={c.id}
                sx={{
                  background: isW ? tokens.wisdomDim : "transparent",
                  "&:hover td": { background: isW ? "rgba(91,77,232,0.07)" : tokens.surface2 },
                  "& td": { borderBottom: `1px solid ${tokens.border}`, p: "10px 14px", color: tokens.text2, verticalAlign: "middle" },
                  "&:last-child td": { borderBottom: "none" },
                }}
              >
                <Box component="td" sx={{ fontWeight: 500, color: isW ? `${tokens.wisdom} !important` : `${tokens.text} !important` }}>
                  {c.name}
                </Box>

                <Box component="td">{fmtUSD(t.license)}</Box>

                <Box component="td" sx={{ color: t.impl > 30000 ? `${tokens.danger} !important` : t.impl < 12000 ? `${tokens.success} !important` : undefined }}>
                  {fmtUSD(t.impl)}
                </Box>

                <Box component="td">{fmtUSD(t.training)}</Box>

                <Box component="td" sx={{ color: t.compute > 30000 ? `${tokens.danger} !important` : undefined }}>
                  {fmtUSD(t.compute)}/yr
                </Box>

                <Box component="td">{fmtUSD(t.support)}/yr</Box>

                <Box component="td" sx={{ fontWeight: 500, color: `${tokens.text} !important` }}>
                  ${total}K
                </Box>

                <Box component="td">
                  {isW ? (
                    <Box component="span" sx={{ color: tokens.wisdom, fontWeight: 600 }}>
                      Baseline
                    </Box>
                  ) : diff > 0 ? (
                    <Box component="span" sx={{ color: tokens.danger }}>
                      +${diff}K
                    </Box>
                  ) : (
                    <Box component="span" sx={{ color: tokens.success, fontWeight: 500 }}>
                      -${Math.abs(diff)}K
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

