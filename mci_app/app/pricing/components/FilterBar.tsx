"use client";

import { Box, ButtonBase, Typography } from "@mui/material";
import { tokens } from "../theme";

export interface FilterOption {
  key: string;
  label: string;
}

interface FilterBarProps {
  label: string;
  options: FilterOption[];
  active: string;
  onChange: (key: string) => void;
}

export function FilterBar({ label, options, active, onChange }: FilterBarProps) {
  return (
    <Box sx={{ display: "flex", gap: "8px", mb: "20px", flexWrap: "wrap", alignItems: "center" }}>
      <Typography sx={{ fontSize: "12px", color: tokens.text3 }}>{label}</Typography>

      {options.map((opt) => {
        const isActive = opt.key === active;
        return (
          <ButtonBase
            key={opt.key}
            onClick={() => onChange(opt.key)}
            sx={{
              fontSize: "12px",
              px: "14px",
              py: "5px",
              borderRadius: "20px",
              border: `1px solid ${isActive ? tokens.wisdom : tokens.border}`,
              background: isActive ? tokens.wisdomDim : tokens.surface2,
              color: isActive ? tokens.wisdom : tokens.text2,
              fontFamily: '"Inter", sans-serif',
              cursor: "pointer",
              transition: "all 0.15s",
              "&:hover": {
                borderColor: isActive ? tokens.wisdom : tokens.border2,
                color: isActive ? tokens.wisdom : tokens.text,
              },
            }}
          >
            {opt.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}

