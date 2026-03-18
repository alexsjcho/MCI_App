import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { CompetitorBadge } from "../../components/CompetitorBadge";
import type { Competitor, TierData } from "../../types";

interface TierBlockProps {
  competitor: Competitor;
  tierData: TierData;
}

export function TierBlock({ competitor: c, tierData }: TierBlockProps) {
  const isWisdom = c.id === "wisdom";

  return (
    <Box sx={{ mb: "20px", border: `1px solid ${isWisdom ? c.color : tokens.border}`, borderRadius: "16px", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          p: "13px 20px",
          background: isWisdom ? "rgba(91,77,232,0.07)" : tokens.surface2,
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <Box sx={{ width: 9, height: 9, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
        <Typography
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontSize: "14px",
            fontWeight: 700,
            color: isWisdom ? c.color : tokens.text,
          }}
        >
          {c.name}
        </Typography>
        <Box sx={{ ml: "auto" }}>
          <CompetitorBadge variant={c.badge} label={c.badgeText} />
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        {tierData.tiers.map((t, i) => (
          <Box
            key={t.n}
            sx={{
              p: "20px",
              borderRight: i < tierData.tiers.length - 1 ? `1px solid ${tokens.border}` : "none",
              background: i === 2 && isWisdom ? "rgba(91,77,232,0.03)" : tokens.surface,
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                fontFamily: '"DM Mono", monospace',
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: tokens.text3,
                mb: "10px",
              }}
            >
              {t.n}
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Syne", sans-serif',
                fontSize: "22px",
                fontWeight: 700,
                lineHeight: 1,
                color: isWisdom ? c.color : tokens.text,
              }}
            >
              {t.p}
            </Typography>

            <Typography
              sx={{
                fontSize: "11px",
                color: tokens.text3,
                m: "4px 0 14px",
                fontFamily: '"DM Mono", monospace',
              }}
            >
              {t.d}
            </Typography>

            {t.f.map((feat) => (
              <Box key={feat} sx={{ display: "flex", gap: "7px", alignItems: "flex-start", mb: "5px" }}>
                <Box component="span" sx={{ flexShrink: 0, mt: "2px", fontSize: "11px", color: c.color }}>
                  ✓
                </Box>
                <Typography sx={{ fontSize: "12px", color: tokens.text3 }}>{feat}</Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

