"use client";

import { Box, Paper, Typography } from "@mui/material";
import { tokens } from "../theme";
import { CompetitorDropdown } from "./CompetitorDropdown";
import { TabBar } from "./TabBar";

export function Header() {
  return (
    <Box component="header">
      {/* Page header (matches the gradient + Paper pattern used on other pages). */}
      <Paper
        elevation={0}
        sx={{
          px: { xs: 2.5, md: 5 },
          pt: 4,
          pb: 3,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 0,
          background: "linear-gradient(180deg, rgba(109, 40, 217, 0.08) 0%, transparent 100%)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Syne", sans-serif',
            fontSize: "1.75rem",
            fontWeight: 700,
            color: tokens.text,
            mb: 0.75,
          }}
        >
          Pricing Comparison
        </Typography>
        <Typography sx={{ fontSize: "11px", color: tokens.text3 }}>
          AI data analytics market · 2025
        </Typography>
      </Paper>

      {/* Sticky controls + tabs */}
      <Paper
        elevation={0}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 0,
          px: { xs: 2.5, md: 5 },
          py: 1,
          background: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              color: tokens.text3,
              fontFamily: '"DM Mono", monospace',
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            Competitors
          </Typography>
          <CompetitorDropdown />
        </Box>

        <Box sx={{ borderTop: `1px solid ${tokens.border}` }}>
          <TabBar />
        </Box>
      </Paper>
    </Box>
  );
}

