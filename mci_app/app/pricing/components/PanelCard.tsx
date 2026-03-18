import { Box, Paper, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { tokens } from "../theme";

interface PanelCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Reusable panel card: a Paper wrapper with a consistent title + optional
 * subtitle header above any chart or content.
 */
export function PanelCard({ title, subtitle, children, sx }: PanelCardProps) {
  return (
    <Paper sx={{ p: "24px", ...sx }}>
      <Typography
        sx={{
          fontFamily: '"Syne", sans-serif',
          fontSize: "15px",
          fontWeight: 600,
          color: tokens.text,
          mb: subtitle ? "4px" : "18px",
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography sx={{ fontSize: "12px", color: tokens.text3, mb: "18px" }}>{subtitle}</Typography>
      )}

      <Box>{children}</Box>
    </Paper>
  );
}

