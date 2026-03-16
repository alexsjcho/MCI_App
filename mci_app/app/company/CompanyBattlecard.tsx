import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import type { CompanySummary } from "./company-data";
import {
  COMPETITORS,
  WISDOM_COMPANY,
  COMPANY_PROFILES,
  COMPANY_POSITIONING,
  COMPANY_COMPETE,
  COMPANY_OBJECTIONS,
} from "./company-data";

type CompanyBattlecardProps = {
  selectedId: string;
  onChange: (id: string) => void;
};

function findCompanyById(id: string): CompanySummary {
  if (id === WISDOM_COMPANY.id) return WISDOM_COMPANY;
  return COMPETITORS.find((c) => c.id === id) ?? WISDOM_COMPANY;
}

export function CompanyBattlecard({
  selectedId,
  onChange,
}: CompanyBattlecardProps) {
  const company = findCompanyById(selectedId);
  const [section, setSection] = useState<"profile" | "positioning" | "compete">(
    "profile",
  );
  const profile = COMPANY_PROFILES[company.id] ?? COMPANY_PROFILES.wisdomai;
  const pos =
    COMPANY_POSITIONING[company.id] ?? COMPANY_POSITIONING.wisdomai;
  const compete = COMPANY_COMPETE[company.id] ?? COMPANY_COMPETE.wisdomai;
  const objections =
    COMPANY_OBJECTIONS[company.id] ?? COMPANY_OBJECTIONS.wisdomai;

  return (
    <Box sx={{ px: { xs: 2.5, md: 5 }, pb: 4, pt: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 1, color: "text.secondary" }}
          >
            Competitor Battlecard
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            {company.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: "text.secondary" }}
          >
            {company.tagline}
          </Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={
                company.id === WISDOM_COMPANY.id
                  ? "Home — WisdomAI"
                  : company.threatLabel
              }
              size="small"
              sx={{
                fontSize: "0.6875rem",
                height: 22,
                bgcolor:
                  company.id === "databricks" || company.id === "snowflake"
                    ? "rgba(248, 113, 113, 0.12)"
                    : "rgba(148, 163, 184, 0.12)",
              }}
            />
            <Chip
              label={profile.stage}
              size="small"
              sx={{ fontSize: "0.6875rem", height: 22 }}
            />
            <Chip
              label={profile.arr}
              size="small"
              sx={{ fontSize: "0.6875rem", height: 22 }}
            />
          </Box>
        </Box>

        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="company-selector-label">Select competitor</InputLabel>
          <Select
            labelId="company-selector-label"
            aria-label="Select competitor"
            role="combobox"
            value={selectedId}
            label="Select competitor"
            onChange={(event) => onChange(event.target.value)}
          >
            <MenuItem value={WISDOM_COMPANY.id}>{WISDOM_COMPANY.name}</MenuItem>
            {COMPETITORS.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper
        elevation={0}
        sx={{
          mt: 1,
          px: 1,
          borderRadius: 999,
          border: 1,
          borderColor: "divider",
          display: "inline-flex",
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={section}
          onChange={(_, value) =>
            setSection(value as "profile" | "positioning" | "compete")
          }
          aria-label="Battlecard sections"
          sx={{
            minHeight: 40,
            "& .MuiTab-root": {
              minHeight: 40,
              textTransform: "none",
              fontSize: "0.8rem",
              px: 2.5,
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab value="profile" label="Company Profile" />
          <Tab value="positioning" label="Positioning" />
          <Tab value="compete" label="Win/Loss" />
        </Tabs>
      </Paper>

      {section === "profile" && (
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Size &amp; Stage
            </Typography>
            <Box sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              <Box sx={{ display: "flex", mb: 0.75 }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Stage</Box>
                <Box>{profile.stage}</Box>
              </Box>
              <Box sx={{ display: "flex", mb: 0.75 }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Headcount</Box>
                <Box>{profile.headcount}</Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>ARR / Revenue</Box>
                <Box>{profile.arr}</Box>
              </Box>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Target Market
            </Typography>
            <Box sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              <Box sx={{ display: "flex", mb: 0.75 }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>ICP Roles</Box>
                <Box>{profile.icpRoles}</Box>
              </Box>
              <Box sx={{ display: "flex", mb: 0.75 }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Verticals</Box>
                <Box>{profile.verticals}</Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Delivery</Box>
                <Box>{profile.delivery}</Box>
              </Box>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Core Offering
            </Typography>
            <Box sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              <Box sx={{ display: "flex", mb: 0.75 }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Product</Box>
                <Box>{company.tagline}</Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Delivery</Box>
                <Box>{profile.delivery}</Box>
              </Box>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Business Model
            </Typography>
            <Box sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              <Box sx={{ display: "flex", mb: 0.75 }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Pricing</Box>
                <Box>{profile.businessModel}</Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ width: 120, fontWeight: 500 }}>Sales Motion</Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {profile.salesMotion.map((motion) => (
                    <Chip
                      key={motion}
                      label={motion}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        height: 22,
                        bgcolor: "rgba(37, 99, 235, 0.06)",
                        color: "primary.main",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}

      {section === "positioning" && (
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Stated Positioning
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontStyle: "italic",
                color: "success.dark",
              }}
            >
              {pos.tagline} — {pos.headline}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Brand tone: {pos.tone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyst view: {pos.analystPerception}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Key Differentiators They Claim
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {pos.differentiators.map((item) => (
                <Box
                  key={item}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    fontSize: "0.8rem",
                    color: "text.secondary",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    →
                  </Box>
                  <Box>{item}</Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Objections you&apos;ll face
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {objections.map((text) => (
                <Box
                  key={text}
                  sx={{
                    borderRadius: 1,
                    bgcolor: "rgba(251, 191, 36, 0.08)",
                    border: "1px solid rgba(251, 191, 36, 0.35)",
                    px: 1.25,
                    py: 0.75,
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 0.75,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: "rgba(251, 191, 36, 0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#fff",
                      mt: "2px",
                      flexShrink: 0,
                    }}
                  >
                    !
                  </Box>
                  <Box>{text}</Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      )}

      {section === "compete" && (
        <Box sx={{ mt: 3, display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              bgcolor: "rgba(16, 185, 129, 0.04)",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "success.main",
                display: "block",
              }}
            >
              They win when...
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2, fontSize: "0.8rem" }}>
              {compete.winConditions.map((item) => (
                <li key={item} style={{ marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              bgcolor: "rgba(248, 250, 252, 1)",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "warning.main",
                display: "block",
              }}
            >
              They lose when...
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2, fontSize: "0.8rem" }}>
              {compete.loseConditions.map((item) => (
                <li key={item} style={{ marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Strengths
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2, fontSize: "0.8rem" }}>
              {compete.strengths.map((item) => (
                <li key={item} style={{ marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 2.25,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                mb: 1,
                fontSize: "0.625rem",
                letterSpacing: 1,
                color: "text.secondary",
                display: "block",
              }}
            >
              Weaknesses
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2, fontSize: "0.8rem" }}>
              {compete.weaknesses.map((item) => (
                <li key={item} style={{ marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

