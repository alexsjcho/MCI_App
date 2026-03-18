import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { tokens } from "../theme";

type InsightVariant = "default" | "warn" | "success";

interface InsightBoxProps {
  children: ReactNode;
  variant?: InsightVariant;
}

const variantColors: Record<InsightVariant, string> = {
  default: tokens.wisdomDim,
  warn: tokens.warn,
  success: tokens.success,
};

export function InsightBox({ children, variant = "default" }: InsightBoxProps) {
  const color = variantColors[variant];

  return (
    <Box
      sx={{
        background: tokens.surface2,
        border: `1px solid ${tokens.border}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 10px 10px 0",
        px: "16px",
        py: "12px",
        mb: "12px",
        fontSize: "13px",
        color: tokens.text2,
        lineHeight: 1.6,
        "& strong": { color: tokens.text },
      }}
    >
      {children}
    </Box>
  );
}

