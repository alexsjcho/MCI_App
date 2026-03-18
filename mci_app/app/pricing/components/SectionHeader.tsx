import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <Box sx={{ mb: "20px" }}>
      <Typography
        variant="h2"
        sx={{ fontSize: "20px", fontWeight: 700, color: tokens.text }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          sx={{ fontSize: "13px", color: tokens.text2, mt: "4px", maxWidth: 640 }}
        >
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}

