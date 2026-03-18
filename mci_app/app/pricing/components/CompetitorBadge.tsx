import { Box } from "@mui/material";
import { badgeStyles } from "../theme";
import type { BadgeVariant } from "../types";

interface CompetitorBadgeProps {
  variant: BadgeVariant;
  label: string;
}

export function CompetitorBadge({ variant, label }: CompetitorBadgeProps) {
  const s = badgeStyles[variant];

  return (
    <Box
      component="span"
      sx={{
        fontSize: "10px",
        px: "8px",
        py: "3px",
        borderRadius: "20px",
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontFamily: '"DM Mono", monospace',
        fontWeight: 500,
        whiteSpace: "nowrap",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </Box>
  );
}

