"use client";

import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { DATA, COMP_NAMES, COMP_TIERS } from "@/lib/comparison-data";
import type { ViewMode } from "@/lib/helpers";
import {
  catCompTotal,
  catWisdomTotal,
  getVisibleCompetitors,
  getWisdomScore,
  isFeatureNewInQuarter,
  isIncluded,
  scoreClass,
  tierClass,
  trunc,
} from "@/lib/helpers";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const VIEW_DESCRIPTIONS: Record<ViewMode, string> = {
  ideal:
    "Ideal Comparison — Full-vision WisdomAI with all planned capabilities scored against competitors. Evaluates competitive positioning at full product maturity including GA, Beta, and Planned features.",
  real:
    "Real Comparison (GA Only) — Shows only features where WisdomAI has Readiness = GA today. Competitors are scored on their full capabilities. Brutal facts — no roadmap assumptions.",
  quarterly:
    "Target Release Comparison — Shows WisdomAI features available by end of the selected quarter (based on Expected Date). Competitor scores remain constant — only WisdomAI's inclusion scope changes per quarter.",
};

function getViewDescription(view: ViewMode, quarter: string): string {
  if (view === "quarterly") {
    return VIEW_DESCRIPTIONS.quarterly.replace(
      "selected quarter",
      `${quarter} 2026`
    );
  }
  return VIEW_DESCRIPTIONS[view];
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>("ideal");
  const [currentQuarter, setCurrentQuarter] = useState("Q1");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    () => new Set(DATA.categories.map((cat) => cat.name))
  );
  const [activeTierFilter, setActiveTierFilter] = useState("all");
  const [visibleCompetitors, setVisibleCompetitors] = useState<
    Record<ViewMode, Set<string>>
  >({
    ideal: new Set(COMP_NAMES),
    real: new Set(COMP_NAMES),
    quarterly: new Set(COMP_NAMES),
  });
  const [compAnchorEl, setCompAnchorEl] = useState<null | HTMLElement>(null);
  const compMenuOpen = Boolean(compAnchorEl);
  const [featureAnchorEl, setFeatureAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const featureMenuOpen = Boolean(featureAnchorEl);

  const visible = getVisibleCompetitors(
    visibleCompetitors[currentView],
    activeTierFilter
  );

  const toggleCategory = useCallback((name: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const toggleCompetitor = useCallback((name: string) => {
    setVisibleCompetitors((prev) => {
      const next = { ...prev };
      const set = new Set(next[currentView]);
      if (set.has(name)) set.delete(name);
      else set.add(name);
      next[currentView] = set;
      return next;
    });
  }, [currentView]);

  const compSelectAll = useCallback(() => {
    setVisibleCompetitors((prev) => ({
      ...prev,
      [currentView]: new Set(COMP_NAMES),
    }));
  }, [currentView]);

  const compDeselectAll = useCallback(() => {
    setVisibleCompetitors((prev) => ({
      ...prev,
      [currentView]: new Set(),
    }));
  }, [currentView]);

  const handleCompMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCompAnchorEl(event.currentTarget);
  };
  const handleCompMenuClose = () => {
    setCompAnchorEl(null);
  };

  const handleFeatureMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFeatureAnchorEl(event.currentTarget);
  };
  const handleFeatureMenuClose = () => {
    setFeatureAnchorEl(null);
  };

  const toggleCategoryVisibility = useCallback((name: string) => {
    setVisibleCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const featureSelectAll = useCallback(() => {
    setVisibleCategories(new Set(DATA.categories.map((cat) => cat.name)));
  }, []);

  const featureDeselectAll = useCallback(() => {
    setVisibleCategories(new Set());
  }, []);

  const totalFor = (isWisdom: boolean, comp: string | null): number => {
    let t = 0;
    DATA.categories.forEach((cat) => {
      if (!visibleCategories.has(cat.name)) return;
      t += isWisdom
        ? catWisdomTotal(cat, currentView, currentQuarter)
        : comp
          ? catCompTotal(cat, comp, currentView, currentQuarter)
          : 0;
    });
    return t;
  };

  const maxPossibleForVisible = (): number => {
    let m = 0;
    DATA.categories.forEach((cat) => {
      if (!visibleCategories.has(cat.name)) return;
      cat.features.forEach((f) => {
        if (isIncluded(f, currentView, currentQuarter)) {
          m += 5;
        }
      });
    });
    return m;
  };

  const wTotal = totalFor(true, null);
  const mp = maxPossibleForVisible();
  const scores = [
    { name: "WisdomAI", total: wTotal, isWisdom: true as const },
    ...visible.map((c) => ({
      name: c,
      total: totalFor(false, c),
      isWisdom: false as const,
    })),
  ].sort((a, b) => b.total - a.total);
  const leaderTotal = scores[0]?.total ?? 0;

  const exportCSV = useCallback(() => {
    let csv =
      "Category,Feature,What,WisdomAI Score,Readiness,Expected Date";
    visible.forEach((c) => (csv += `,"${c} Score","${c} Tier"`));
    csv += "\n";
    DATA.categories.forEach((cat) => {
      cat.features.forEach((f) => {
        const ws = getWisdomScore(f, currentView, currentQuarter);
        csv += `"${cat.name}","${f.name}","${(f.what || "").replace(/"/g, '""')}",${ws},${f.wisdom.readiness},${f.wisdom.expectedDate}`;
        visible.forEach((c) => {
          csv += `,${f.competitors[c]?.score ?? 0},"${COMP_TIERS[c]}"`;
        });
        csv += "\n";
      });
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wisdomai-comparison-${currentView}${currentView === "quarterly" ? `-${currentQuarter}` : ""}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [currentView, currentQuarter, visible]);

  const readinessLabel = (r: string, d: string) =>
    r === "GA" ? "GA" : r === "Beta" ? "Beta" : d ? d.substring(0, 7) : "TBD";

  const tierFilterTier = (tier: string) =>
    tier === "all" ? "all" : tier === "Tier 1" ? "t1" : tier === "Tier 2" ? "t2" : "t3";

  const tierInfoLabels: Record<string, string> = {
    "Tier 1": "Tier 1 - Direct Threats",
    "Tier 2": "Tier 2 - Adjacent Players",
    "Tier 3": "Tier 3 - Emerging",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <Box
        component="nav"
        aria-label="Primary navigation"
        sx={{
          width: 220,
          borderRight: 1,
          borderColor: "divider",
          px: 2,
          py: 3,
          display: { xs: "none", md: "block" },
        }}
      >
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ mb: 1, display: "block", letterSpacing: 0.8 }}
        >
          Views
        </Typography>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            fontSize: "0.8125rem",
            fontWeight: 600,
            borderRadius: 999,
          }}
        >
          Diff Comparison
        </Button>
      </Box>

      <Box sx={{ flex: 1 }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            px: { xs: 2.5, md: 5 },
            pt: 4,
            pb: 3,
            borderBottom: 1,
            borderColor: "divider",
            borderRadius: 0,
            background:
              "linear-gradient(180deg, rgba(109, 40, 217, 0.08) 0%, transparent 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label="◆ WisdomAI"
              size="small"
              sx={{
                background: "linear-gradient(135deg, #6D28D9, #0EA5E9)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.6875rem",
                letterSpacing: 0.5,
                "& .MuiChip-label": { px: 1.5 },
              }}
            />
          </Box>
          <Typography
            variant="h1"
            className="header-title"
            sx={{ fontSize: "1.75rem", fontWeight: 700 }}
          >
            Competitor Comparison Matrix
          </Typography>
        </Paper>

        {/* Nav */}
        <Paper
          elevation={0}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            borderBottom: 1,
            borderColor: "divider",
            borderRadius: 0,
            px: { xs: 2.5, md: 5 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
            <Tabs
              value={currentView}
              onChange={(_, v) => setCurrentView(v as ViewMode)}
              sx={{
                minHeight: 48,
                "& .MuiTab-root": { minHeight: 48, py: 1.75, px: 3 },
                "& .MuiTabs-indicator": { bgcolor: "primary.main" },
              }}
            >
              <Tab
                value="ideal"
                label={
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    Ideal Comparison
                    <Chip
                      label="Full"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.625rem",
                        bgcolor: "rgba(109, 40, 217, 0.15)",
                        color: "primary.main",
                      }}
                    />
                    <Tooltip title={getViewDescription("ideal", currentQuarter)}>
                      <Box
                        component="span"
                        aria-label="Ideal Comparison info"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Tooltip>
                  </Box>
                }
              />
              <Tab
                value="real"
                label={
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    Real Comparison
                    <Chip
                      label="GA"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.625rem",
                        bgcolor: "rgba(109, 40, 217, 0.15)",
                        color: "primary.main",
                      }}
                    />
                    <Tooltip title={getViewDescription("real", currentQuarter)}>
                      <Box
                        component="span"
                        aria-label="Real Comparison info"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Tooltip>
                  </Box>
                }
              />
              <Tab
                value="quarterly"
                label={
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.75,
                    }}
                  >
                    Target Release
                    <Chip
                      label="QTR"
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.625rem",
                        bgcolor: "rgba(109, 40, 217, 0.15)",
                        color: "primary.main",
                      }}
                    />
                    <Tooltip
                      title={getViewDescription("quarterly", currentQuarter)}
                    >
                      <Box
                        component="span"
                        aria-label="Target Release info"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Tooltip>
                  </Box>
                }
              />
            </Tabs>
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1, py: 1 }}>
              <ButtonGroup size="small" sx={{ borderColor: "divider", bgcolor: "#F4F2F8", "& .MuiButton-root": { borderColor: "divider" } }}>
                {(["all", "Tier 1", "Tier 2", "Tier 3"] as const).map((tier) => (
                  <Button
                    key={tier}
                    onClick={() => setActiveTierFilter(tier)}
                    className={`tier-filter-btn ${tierFilterTier(tier)} ${activeTierFilter === tier ? "active" : ""}`}
                    sx={{
                      textTransform: "none",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      px: 1.25,
                      py: 0.625,
                    }}
                  >
                    {tier === "all" ? (
                      "All"
                    ) : (
                      <Box
                        component="span"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        {tier === "Tier 1" ? "T1" : tier === "Tier 2" ? "T2" : "T3"}
                        <Tooltip title={tierInfoLabels[tier]}>
                          <Box
                            component="span"
                            aria-label={tierInfoLabels[tier]}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                          </Box>
                        </Tooltip>
                      </Box>
                    )}
                  </Button>
                ))}
              </ButtonGroup>

              <Button
                size="small"
                variant="outlined"
                onClick={handleFeatureMenuOpen}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 16,
                      transform: featureMenuOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                }
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  borderColor: "divider",
                  color: "text.secondary",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "text.primary",
                    bgcolor: "action.hover",
                  },
              }}
            >
              Feature sets
            </Button>
              <Menu
                anchorEl={featureAnchorEl}
                open={featureMenuOpen}
                onClose={handleFeatureMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: { mt: 1.5, minWidth: 280, maxHeight: 380 },
                  },
                }}
              >
                <Box
                  sx={{
                    px: 1.75,
                    py: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    fontWeight={600}
                  >
                    Show / Hide Feature Categories
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    px: 1.75,
                    py: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Button
                    size="small"
                    onClick={featureSelectAll}
                    sx={{ textTransform: "none", fontSize: "0.6875rem" }}
                  >
                    Select All
                  </Button>
                  <Button
                    size="small"
                    onClick={featureDeselectAll}
                    sx={{ textTransform: "none", fontSize: "0.6875rem" }}
                  >
                    Deselect All
                  </Button>
                </Box>
                {DATA.categories.map((cat) => {
                  const checked = visibleCategories.has(cat.name);
                  return (
                    <MenuItem
                      key={cat.name}
                      onClick={() => toggleCategoryVisibility(cat.name)}
                      sx={{ py: 0.75 }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Checkbox
                          checked={checked}
                          size="small"
                          sx={{
                            color: "primary.main",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={cat.name}
                        primaryTypographyProps={{
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </Menu>

              <Button
                size="small"
                variant="outlined"
                onClick={handleCompMenuOpen}
                endIcon={<ExpandMoreIcon sx={{ fontSize: 16, transform: compMenuOpen ? "rotate(180deg)" : "none" }} />}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  borderColor: "divider",
                  color: "text.secondary",
                  "&:hover": { borderColor: "primary.main", color: "text.primary", bgcolor: "action.hover" },
                }}
              >
                Competitors
                <Chip
                  label={visibleCompetitors[currentView].size}
                  size="small"
                  sx={{
                    ml: 0.75,
                    height: 18,
                    minWidth: 18,
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    bgcolor: "primary.main",
                    color: "#fff",
                    "& .MuiChip-label": { px: 0.75 },
                  }}
                />
              </Button>
              <Menu
                anchorEl={compAnchorEl}
                open={compMenuOpen}
                onClose={handleCompMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: { mt: 1.5, minWidth: 280, maxHeight: 380 },
                  },
                }}
              >
                <Box sx={{ px: 1.75, py: 1, borderBottom: 1, borderColor: "divider" }}>
                  <Typography variant="caption" color="text.disabled" fontWeight={600}>
                    Show / Hide Competitors
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, px: 1.75, py: 1, borderBottom: 1, borderColor: "divider" }}>
                  <Button size="small" onClick={compSelectAll} sx={{ textTransform: "none", fontSize: "0.6875rem" }}>
                    Select All
                  </Button>
                  <Button size="small" onClick={compDeselectAll} sx={{ textTransform: "none", fontSize: "0.6875rem" }}>
                    Deselect All
                  </Button>
                </Box>
                <MenuItem disabled sx={{ opacity: 0.85 }}>
                  <ListItemIcon>
                    <Checkbox checked size="small" sx={{ color: "primary.dark", "&.Mui-checked": { color: "primary.dark" } }} />
                  </ListItemIcon>
                  <ListItemText primary="WisdomAI" primaryTypographyProps={{ fontWeight: 600, color: "primary.dark" }} />
                  <LockIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                </MenuItem>
                {COMP_NAMES.map((c) => {
                  const checked = visibleCompetitors[currentView].has(c);
                  const tc = tierClass(c);
                  return (
                    <MenuItem
                      key={c}
                      onClick={() => toggleCompetitor(c)}
                      sx={{ py: 0.75 }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Checkbox
                          checked={checked}
                          size="small"
                          sx={{ color: "primary.main", "&.Mui-checked": { color: "primary.main" } }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={c} primaryTypographyProps={{ fontSize: "0.8125rem", fontWeight: 500 }} />
                      <Chip label={COMP_TIERS[c]} size="small" className={`comp-tier-tag ${tc}`} sx={{ height: 18, fontSize: "0.5625rem" }} />
                    </MenuItem>
                  );
                })}
              </Menu>

              {currentView === "quarterly" && (
                <ButtonGroup size="small" sx={{ borderColor: "divider", bgcolor: "#F4F2F8" }}>
                  {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                    <Button
                      key={q}
                      onClick={() => setCurrentQuarter(q)}
                      variant={currentQuarter === q ? "contained" : "text"}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        px: 1.75,
                        py: 0.75,
                        ...(currentQuarter === q && { boxShadow: "0 2px 8px rgba(109, 40, 217, 0.25)" }),
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </ButtonGroup>
              )}

              <Button
                size="small"
                variant="outlined"
                startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
                onClick={exportCSV}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  borderColor: "divider",
                  color: "text.secondary",
                  "&:hover": {
                    borderColor: "primary.main",
                    color: "text.primary",
                    bgcolor: "#EBE8F1",
                  },
                }}
              >
                Export CSV
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
            px: { xs: 2.5, md: 5 },
            py: 1.5,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Score Legend:
          </Typography>
          {[5, 4, 3, 2, 1, 0].map((s) => (
            <Box key={s} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: 0.375,
                  bgcolor: `var(--score-${s})`,
                }}
              />
              <Typography variant="caption" color="text.disabled">
                {s} —{" "}
                {s >= 5
                  ? "Strong"
                  : s >= 4
                    ? "Good"
                    : s >= 3
                      ? "Moderate"
                      : s >= 2
                        ? "Weak"
                        : s >= 1
                          ? "Minimal"
                          : "None"}
              </Typography>
            </Box>
          ))}
          <Typography
            variant="caption"
            fontWeight={600}
            color="text.secondary"
            sx={{ ml: 1 }}
          >
            Readiness:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <span className="readiness-tag readiness-ga">GA</span>
            <Typography variant="caption" color="text.disabled">
              Generally Available
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <span className="readiness-tag readiness-beta">Beta</span>
            <Typography variant="caption" color="text.disabled">
              Public Beta
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <span className="readiness-tag readiness-planned">Planned</span>
            <Typography variant="caption" color="text.disabled">
              On Roadmap
            </Typography>
          </Box>
        </Box>

        {/* Summary bar */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            px: { xs: 2.5, md: 5 },
            py: 2,
            borderBottom: 1,
            borderColor: "divider",
            overflowX: "auto",
          }}
        >
          {scores.map((s) => {
            const isLeader = s.total === leaderTotal && !s.isWisdom;
            const rank = scores.indexOf(s) + 1;
            const suf = rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th";
            const pct = mp > 0 ? Math.round((s.total / mp) * 100) : 0;
            return (
              <Paper
                key={s.name}
                elevation={0}
                sx={{
                  flexShrink: 0,
                  minWidth: 140,
                  p: 1.5,
                  border: 1,
                  borderColor: s.isWisdom ? "primary.main" : "divider",
                  bgcolor: s.isWisdom
                    ? "transparent"
                    : "#F4F2F8",
                  background: s.isWisdom
                    ? "linear-gradient(135deg, rgba(109, 40, 217, 0.06), rgba(14, 165, 233, 0.04))"
                    : undefined,
                  ...(isLeader && { borderColor: "success.main", borderWidth: 1 }),
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color={s.isWisdom ? "primary.dark" : "text.secondary"}
                  sx={{ textTransform: "uppercase", letterSpacing: 0.5, display: "block", mb: 0.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}
                >
                  {s.name}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  {s.total}
                  <Typography component="span" variant="body2" color="text.disabled" sx={{ fontSize: "0.8125rem", fontWeight: 400 }}>
                    {" "}/ {mp}
                  </Typography>
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.625rem", mt: 0.25, display: "block" }}>
                  {rank}{suf} place · {pct}%
                </Typography>
                {!s.isWisdom && (
                  <Chip
                    label={COMP_TIERS[s.name]}
                    size="small"
                    className={`summary-tier ${tierClass(s.name)}`}
                    sx={{ mt: 0.375, height: 18, fontSize: "0.5625rem" }}
                  />
                )}
              </Paper>
            );
          })}
        </Box>

        {/* Table */}
        <TableContainer sx={{ overflowX: "auto", pb: 5 }}>
          <Table
            sx={{ minWidth: 1400 }}
            aria-label="AI analytics comparison matrix"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 260, position: "sticky", left: 0, zIndex: 60, bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}>
                  Feature
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: 180,
                    bgcolor: "linear-gradient(180deg, rgba(109, 40, 217, 0.07), #fff)",
                    background: "linear-gradient(180deg, rgba(109, 40, 217, 0.07), #fff)",
                    color: "primary.dark",
                    fontWeight: 600,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  WisdomAI
                </TableCell>
                {visible.map((c) => (
                  <TableCell
                    key={c}
                    sx={{ minWidth: 160, borderBottom: 1, borderColor: "divider" }}
                    align="left"
                  >
                    {c}
                    <br />
                    <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.5625rem" }}>
                      {COMP_TIERS[c]}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {DATA.categories.filter((cat) =>
                visibleCategories.has(cat.name)
              ).map((cat) => {
                const isCol = collapsedCategories.has(cat.name);
                const wCat = catWisdomTotal(cat, currentView, currentQuarter);
                const incCount = cat.features.filter((f) =>
                  isIncluded(f, currentView, currentQuarter)
                ).length;
                const maxCat = incCount * 5;
                const pctCat = maxCat > 0 ? Math.round((wCat / maxCat) * 100) : 0;

                return (
                  <React.Fragment key={cat.name}>
                    <TableRow
                      className={`cat-row ${isCol ? "collapsed" : ""}`}
                      onClick={() => toggleCategory(cat.name)}
                      sx={{
                        cursor: "pointer",
                        userSelect: "none",
                        bgcolor: "#F4F2F8",
                        "&:hover": { bgcolor: "#EBE8F1" },
                        "& td": {
                          py: 1.25,
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          borderBottom: 1,
                          borderColor: "divider",
                          verticalAlign: "middle",
                        },
                        "& td:first-of-type": {
                          position: "sticky",
                          left: 0,
                          zIndex: 40,
                          bgcolor: "#F4F2F8",
                        },
                      }}
                    >
                      <TableCell>
                        <span className="cat-toggle">▼</span>
                        {cat.name}
                        {cat.description && (
                          <Typography component="span" variant="caption" color="text.disabled" sx={{ ml: 0.5, fontWeight: 400, textTransform: "none" }}>
                            · {trunc(cat.description, 55)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell className="cat-score-cell wisdom-col" sx={{ fontFamily: "monospace" }}>
                        {wCat}
                        <Typography component="span" variant="caption" color="text.disabled" sx={{ fontSize: "0.625rem", ml: 0.75 }}>
                          / {maxCat}
                          {maxCat > 0 ? ` · ${pctCat}%` : ""}
                        </Typography>
                      </TableCell>
                      {visible.map((c) => {
                        const ct = catCompTotal(cat, c, currentView, currentQuarter);
                        const pct = maxCat > 0 ? Math.round((ct / maxCat) * 100) : 0;
                        return (
                          <TableCell key={c} className="cat-score-cell" sx={{ fontFamily: "monospace" }}>
                            {ct}
                            <Typography component="span" variant="caption" color="text.disabled" sx={{ fontSize: "0.625rem", ml: 0.75 }}>
                              / {maxCat}
                              {maxCat > 0 ? ` · ${pct}%` : ""}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {cat.features.map((f) => {
                      const inc = isIncluded(f, currentView, currentQuarter);
                      const wScore = getWisdomScore(f, currentView, currentQuarter);
                      const isNew =
                        currentView === "quarterly" &&
                        isFeatureNewInQuarter(f, currentQuarter) &&
                        inc;
                      const rdClass =
                        f.wisdom.readiness === "GA"
                          ? "readiness-ga"
                          : f.wisdom.readiness === "Beta"
                            ? "readiness-beta"
                            : "readiness-planned";
                      const rdLabel = readinessLabel(
                        f.wisdom.readiness,
                        f.wisdom.expectedDate
                      );

                      return (
                        <TableRow
                          key={`${cat.name}-${f.name}`}
                          sx={{
                            display: isCol ? "none" : "table-row",
                            bgcolor: "background.default",
                            "& td": {
                              py: 1.25,
                              borderBottom: "1px solid rgba(109, 40, 217, 0.06)",
                              verticalAlign: "top",
                              fontSize: "0.8125rem",
                            },
                            "& td:first-of-type": {
                              position: "sticky",
                              left: 0,
                              zIndex: 30,
                              bgcolor: "background.default",
                            },
                            ...((!inc && currentView !== "ideal") && { opacity: 0.35 }),
                          }}
                          className={`${!inc && currentView !== "ideal" ? "not-included" : ""} ${isNew ? "new-in-quarter" : ""}`}
                        >
                          <TableCell>
                            <div className="feat-name">{f.name}</div>
                            <div className="feat-what">{trunc(f.what, 80)}</div>
                          </TableCell>
                          <TableCell align="center" sx={{ bgcolor: "rgba(109, 40, 217, 0.03)" }}>
                            <span className={`score-pill ${scoreClass(wScore)}`}>{wScore}</span>
                            <Typography variant="caption" display="block" color="text.disabled" sx={{ fontSize: "0.625rem", mt: 0.5, maxWidth: 160, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {trunc(f.wisdom.description, 60)}
                            </Typography>
                            <span className={`readiness-tag ${rdClass}`}>{rdLabel}</span>
                          </TableCell>
                          {visible.map((c) => {
                            const cd = f.competitors[c];
                            const cs = cd?.score ?? 0;
                            return (
                              <TableCell key={c} align="center">
                                <span className={`score-pill ${scoreClass(cs)}`}>{cs}</span>
                                <Typography variant="caption" display="block" color="text.disabled" sx={{ fontSize: "0.625rem", mt: 0.5, maxWidth: 160, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                  {trunc(cd?.description ?? "", 55)}
                                </Typography>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
