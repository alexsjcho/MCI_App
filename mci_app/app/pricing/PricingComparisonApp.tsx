"use client";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { PricingProvider } from "./context/PricingContext";
import { Header } from "./components/Header";
import { TabContent } from "./tabs/TabContent";
import { theme } from "./theme";

export function PricingComparisonApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PricingProvider>
        <Header />
        <Box
          component="main"
          sx={{
            p: "28px 32px",
            maxWidth: 1400,
          }}
        >
          <TabContent />
        </Box>
      </PricingProvider>
    </ThemeProvider>
  );
}

