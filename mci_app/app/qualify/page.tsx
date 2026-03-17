"use client";

import Box from "@mui/material/Box";
import { ProductMarketingNav } from "../ProductMarketingNav";
import QualificationPage from "./QualificationPage";

export default function QualifyPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <ProductMarketingNav active="qualify" />
      <QualificationPage />
    </Box>
  );
}
