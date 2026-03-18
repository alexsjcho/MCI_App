import Box from "@mui/material/Box";
import { ProductMarketingNav } from "../ProductMarketingNav";
import { PricingComparisonApp } from "./PricingComparisonApp";

export default function PricingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <ProductMarketingNav active="pricing" />
      <Box sx={{ flex: 1, overflowX: "auto" }}>
        <PricingComparisonApp />
      </Box>
    </Box>
  );
}

