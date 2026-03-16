import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { CompanyOverview } from "./CompanyOverview";
import { CompanyBattlecard } from "./CompanyBattlecard";
import { CompanyQuadrants } from "./CompanyQuadrants";
import { WISDOM_COMPANY } from "./company-data";

type TabKey = "overview" | "competitor" | "quadrants";

export function CompanyPageContent() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    WISDOM_COMPANY.id,
  );

  return (
    <Box sx={{ flex: 1 }}>
      <Paper
        elevation={0}
        sx={{
          px: { xs: 2.5, md: 5 },
          pt: 4,
          pb: 2.5,
          borderBottom: 1,
          borderColor: "divider",
          borderRadius: 0,
          background:
            "linear-gradient(180deg, rgba(42, 79, 62, 0.06) 0%, transparent 100%)",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "1.75rem", fontWeight: 700 }}
        >
          Company Comparison
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.8125rem" }}
        >
          WisdomAI vs 8 competitors
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 0,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ px: { xs: 2.5, md: 5 } }}>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value as TabKey)}
            aria-label="Company comparison views"
            sx={{
              minHeight: 48,
              "& .MuiTab-root": {
                minHeight: 48,
                py: 1.5,
                px: 2.75,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
              },
              "& .MuiTabs-indicator": {
                bgcolor: "primary.main",
              },
            }}
          >
            <Tab value="overview" label="Overview" />
            <Tab value="competitor" label="Competitor" />
            <Tab value="quadrants" label="Quadrant Maps" />
          </Tabs>
        </Box>
      </Paper>

      {tab === "overview" && <CompanyOverview />}
      {tab === "competitor" && (
        <CompanyBattlecard
          selectedId={selectedCompanyId}
          onChange={setSelectedCompanyId}
        />
      )}
      {tab === "quadrants" && <CompanyQuadrants />}
    </Box>
  );
}

