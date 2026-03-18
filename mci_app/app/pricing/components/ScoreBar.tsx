import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";

interface ScoreBarProps {
  label: string;
  value: number; // 0-100
  color: string;
  opacity?: number;
  labelWidth?: number | string;
  bold?: boolean;
}

export function ScoreBar({
  label,
  value,
  color,
  opacity = 1,
  labelWidth = 68,
  bold = false,
}: ScoreBarProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Typography
        sx={{
          fontSize: "11px",
          color: tokens.text3,
          width: labelWidth,
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          flex: 1,
          height: "4px",
          background: tokens.surface3,
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${value}%`,
            background: color,
            opacity,
            borderRadius: "4px",
            transition: "width 0.4s ease",
          }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: "11px",
          color: bold ? color : tokens.text2,
          fontWeight: bold ? 600 : 400,
          width: "26px",
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

