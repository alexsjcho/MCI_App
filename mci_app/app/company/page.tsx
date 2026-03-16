"use client";

import Box from "@mui/material/Box";
import { ProductMarketingNav } from "../ProductMarketingNav";
import CompanyPageContent from "./CompanyPageContent";

export default function CompanyPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <ProductMarketingNav active="company" />
      <CompanyPageContent />
    </Box>
  );
}
