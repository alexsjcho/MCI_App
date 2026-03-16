/* eslint-disable react/jsx-key */
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
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Link from "@mui/material/Link";
import { ProductMarketingNav } from "../ProductMarketingNav";
import { DATA, COMP_NAMES, COMP_TIERS } from "./comparison-data";
import type { ViewMode } from "./helpers";
import {
  FEATURE_CRITERIA_META,
  catCompTotal,
  catWisdomTotal,
  getCompetitorCriteriaScores,
  getCompetitorCriterionDetail,
  getCriterionDetail,
  getFeatureCriteriaScores,
  getMessagingPositioning,
  getVisibleCompetitors,
  getWisdomScore,
  isFeatureNewInQuarter,
  isIncluded,
  scoreClass,
  tierClass,
  trunc,
} from "./helpers";
import { SwordIcon } from "./SwordIcon";
import { getViewDescription } from "./viewConfig";
import {
  autoCriterionExplanation,
  clamp420,
  formatScore,
  pctColor,
  readinessLabel,
  tierFilterTier,
  tierInfoLabels,
} from "./utils";

export default function FeatureComparisonPage() {
  const [currentView, setCurrentView] = useState<ViewMode>("ideal");
  const [currentQuarter, setCurrentQuarter] = useState("Q1");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    () => new Set(DATA.categories.map((cat) => cat.name)),
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
    null,
  );
  const featureMenuOpen = Boolean(featureAnchorEl);
  const [strengthFilter, setStrengthFilter] = useState<
    "all" | "strong" | "weak"
  >("all");
  const [scoreModalFeature, setScoreModalFeature] = useState<{
    categoryName: string;
    featureName: string;
    competitor?: string;
  } | null>(null);
  const [messagingModal, setMessagingModal] = useState<{
    categoryName: string;
    featureName: string;
    competitorName: string;
  } | null>(null);
  const [responseTab, setResponseTab] = useState<"short" | "medium" | "long">(
    "short",
  );

  useEffect(() => {
    if (messagingModal) setResponseTab("short");
  }, [messagingModal]);

  const visible = getVisibleCompetitors(
    visibleCompetitors[currentView],
    activeTierFilter,
  );

  const toggleCategory = useCallback((name: string) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const toggleCompetitor = useCallback(
    (name: string) => {
      setVisibleCompetitors((prev) => {
        const next = { ...prev };
        const set = new Set(next[currentView]);
        if (set.has(name)) set.delete(name);
        else set.add(name);
        next[currentView] = set;
        return next;
      });
    },
    [currentView],
  );

  const compSelectAll = useCallback(() => {
    setVisibleCompetitors((prev) => ({
      ...prev,
      [currentView]: new Set(COMP_NAMES),
    }));
    setActiveTierFilter("all");
  }, [currentView]);

  const compDeselectAll = useCallback(() => {
    setVisibleCompetitors((prev) => ({
      ...prev,
      [currentView]: new Set(),
    }));
    setActiveTierFilter("all");
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
    setStrengthFilter("all");
  }, []);

  const featureDeselectAll = useCallback(() => {
    setVisibleCategories(new Set());
    setStrengthFilter("all");
  }, []);

  const applyStrengthFilter = useCallback(
    (kind: "strong" | "weak") => {
      setStrengthFilter((prev) => {
        const next = prev === kind ? "all" : kind;

        if (next === "all") {
          setVisibleCategories(
            new Set(DATA.categories.map((cat) => cat.name)),
          );
          return next;
        }

        const filteredNames: string[] = [];
        DATA.categories.forEach((cat) => {
          const wCat = catWisdomTotal(cat, currentView, currentQuarter);
          const includedCount =
            currentView === "real" || currentView === "quarterly"
              ? cat.features.length
              : cat.features.filter((f) =>
                isIncluded(f, currentView, currentQuarter),
              ).length;
          const maxCat = includedCount * 5;
          const pctCat = maxCat > 0 ? Math.round((wCat / maxCat) * 100) : 0;

          const isStrong = pctCat >= 80;
          const isWeak = pctCat < 50;

          if ((next === "strong" && isStrong) || (next === "weak" && isWeak)) {
            filteredNames.push(cat.name);
          }
        });

        setVisibleCategories(new Set(filteredNames));
        return next;
      });
    },
    [currentView, currentQuarter],
  );

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
        if (currentView === "real" || currentView === "quarterly") {
          m += 5;
        } else if (isIncluded(f, currentView, currentQuarter)) {
          m += 5;
        }
      });
    });
    return m;
  };

  const orderedCompetitors = React.useMemo(
    () =>
      [...visible].sort(
        (a, b) => totalFor(false, b) - totalFor(false, a),
      ),
    [visible, currentView, currentQuarter, visibleCategories],
  );
  const wTotal = totalFor(true, null);
  const mp = maxPossibleForVisible();

  const competitorCards = orderedCompetitors.map((c) => ({
    name: c,
    total: totalFor(false, c),
    isWisdom: false as const,
  }));

  const scoreCards = [
    ...competitorCards,
    { name: "WisdomAI", total: wTotal, isWisdom: true as const },
  ].sort((a, b) => {
    if (b.total !== a.total) {
      return b.total - a.total;
    }
    if (a.isWisdom && !b.isWisdom) return 1;
    if (!a.isWisdom && b.isWisdom) return -1;
    return a.name.localeCompare(b.name);
  });
  const leaderTotal = scoreCards[0]?.total ?? 0;
  const isTwoCompanyView = visible.length === 1;

  const exportCSV = useCallback(() => {
    let csv =
      "Category,Feature,What,WisdomAI Score,Readiness,Expected Date";
    orderedCompetitors.forEach((c) => (csv += `,"${c} Score","${c} Tier"`));
    csv += "\n";
    DATA.categories.forEach((cat) => {
      cat.features.forEach((f) => {
        const ws = getWisdomScore(f, currentView, currentQuarter);
        csv += `"${cat.name}","${f.name}","${(f.what || "").replace(/"/g, '""')}",${ws},${f.wisdom.readiness},${f.wisdom.expectedDate}`;
        orderedCompetitors.forEach((c) => {
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
  }, [currentView, currentQuarter, orderedCompetitors]);

  const applyTierSelection = (tier: "Tier 1" | "Tier 2" | "Tier 3") => {
    setVisibleCompetitors((prev) => ({
      ...prev,
      [currentView]: new Set(
        COMP_NAMES.filter((name) => COMP_TIERS[name] === tier),
      ),
    }));
  };

  const toggleAllCategories = () => {
    setCollapsedCategories((prev) => {
      const allNames = DATA.categories.map((cat) => cat.name);
      const allCollapsed = allNames.every((name) => prev.has(name));
      return allCollapsed ? new Set() : new Set(allNames);
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <ProductMarketingNav active="features" />

      <Box sx={{ flex: 1 }}>
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
          <Typography
            variant="h1"
            className="header-title"
            sx={{ fontSize: "1.75rem", fontWeight: 700 }}
          >
            Feature Comparison
          </Typography>
        </Paper>

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
            py: 1,
          }}
        >
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
        </Paper>

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
          {scoreCards.map((s, index) => {
            const isLeader = s.total === leaderTotal && !s.isWisdom;
            const rank = index + 1;
            const suf =
              rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th";
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
                  bgcolor: s.isWisdom ? "transparent" : "#F4F2F8",
                  background: s.isWisdom
                    ? "linear-gradient(135deg, rgba(109, 40, 217, 0.06), rgba(14, 165, 233, 0.04))"
                    : undefined,
                  ...(isLeader && {
                    borderColor: "success.main",
                    borderWidth: 1,
                  }),
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color={s.isWisdom ? "primary.dark" : "text.secondary"}
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    display: "block",
                    mb: 0.5,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 140,
                  }}
                >
                  {s.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.total}
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.disabled"
                    sx={{ fontSize: "0.8125rem", fontWeight: 400 }}
                  >
                    {" "}
                    / {mp}
                  </Typography>
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{
                    fontSize: "0.625rem",
                    mt: 0.25,
                    display: "block",
                  }}
                >
                  {rank}
                  {suf} place · {pct}%
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

        <Box
          sx={{
            position: "sticky",
            top: 64,
            zIndex: 90,
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: { xs: 2.5, md: 5 },
              pb: 1.25,
              pt: 0.75,
            }}
          >
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
              <Chip
                label={visibleCategories.size}
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
              endIcon={
                <ExpandMoreIcon
                  sx={{
                    fontSize: 16,
                    transform: compMenuOpen ? "rotate(180deg)" : "none",
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
                  sx: { mt: 1.5, minWidth: 320, maxHeight: 380 },
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
                  Show / Hide Competitors
                </Typography>
              </Box>

              <Box
                sx={{
                  px: 1.75,
                  py: 1,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <ButtonGroup
                  size="small"
                  sx={{
                    borderColor: "divider",
                    bgcolor: "#F4F2F8",
                    "& .MuiButton-root": { borderColor: "divider" },
                  }}
                >
                  {(["Tier 1", "Tier 2", "Tier 3"] as const).map((tier) => (
                    <Button
                      key={tier}
                      onClick={() => {
                        const next = activeTierFilter === tier ? "all" : tier;
                        setActiveTierFilter(next);
                        if (next !== "all") {
                          applyTierSelection(tier);
                        }
                      }}
                      className={`tier-filter-btn ${tierFilterTier(tier)} ${activeTierFilter === tier ? "active" : ""
                        }`}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        px: 1.25,
                        py: 0.625,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        {tier === "Tier 1"
                          ? "T1"
                          : tier === "Tier 2"
                            ? "T2"
                            : "T3"}
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
                    </Button>
                  ))}
                </ButtonGroup>
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
                  onClick={compSelectAll}
                  sx={{ textTransform: "none", fontSize: "0.6875rem" }}
                >
                  Select All
                </Button>
                <Button
                  size="small"
                  onClick={compDeselectAll}
                  sx={{ textTransform: "none", fontSize: "0.6875rem" }}
                >
                  Deselect All
                </Button>
              </Box>

              <MenuItem disabled sx={{ opacity: 0.85 }}>
                <ListItemIcon>
                  <Checkbox
                    checked
                    size="small"
                    sx={{
                      color: "primary.dark",
                      "&.Mui-checked": { color: "primary.dark" },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="WisdomAI"
                  primaryTypographyProps={{
                    fontWeight: 600,
                    color: "primary.dark",
                  }}
                />
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
                        sx={{
                          color: "primary.main",
                          "&.Mui-checked": { color: "primary.main" },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={c}
                      primaryTypographyProps={{
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                      }}
                    />
                    <Chip
                      label={COMP_TIERS[c]}
                      size="small"
                      className={`comp-tier-tag ${tc}`}
                      sx={{ height: 18, fontSize: "0.5625rem" }}
                    />
                  </MenuItem>
                );
              })}
            </Menu>

            <ButtonGroup
              size="small"
              sx={{ ml: 1, borderColor: "divider", bgcolor: "#F4F2F8" }}
            >
              <Button
                onClick={() => applyStrengthFilter("strong")}
                variant={strengthFilter === "strong" ? "contained" : "text"}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  px: 1.75,
                  py: 0.75,
                }}
              >
                Strong
              </Button>
              <Button
                onClick={() => applyStrengthFilter("weak")}
                variant={strengthFilter === "weak" ? "contained" : "text"}
                sx={{
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  px: 1.75,
                  py: 0.75,
                }}
              >
                Weak
              </Button>
            </ButtonGroup>

            {currentView === "quarterly" && (
              <ButtonGroup
                size="small"
                sx={{ borderColor: "divider", bgcolor: "#F4F2F8" }}
              >
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
                      ...(currentQuarter === q && {
                        boxShadow: "0 2px 8px rgba(109, 40, 217, 0.25)",
                      }),
                    }}
                  >
                    {q}
                  </Button>
                ))}
              </ButtonGroup>
            )}

            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title="Export comparison to CSV">
              <IconButton
                aria-label="Export comparison to CSV"
                size="small"
                onClick={exportCSV}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Search within comparison matrix">
              <span>
                <IconButton
                  aria-label="Search within comparison matrix"
                  size="small"
                  disabled
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
              px: { xs: 2.5, md: 5 },
              pb: 1.25,
            }}
          >
            <Typography
              variant="caption"
              fontWeight={600}
              color="text.secondary"
            >
              Score Legend:
            </Typography>
            {[5, 4, 3, 2, 1].map((s) => (
              <Box
                key={s}
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
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
        </Box>

        <TableContainer
          sx={{
            overflowX: "auto",
            overflowY: "auto",
            pb: 5,
            maxHeight: "calc(100vh - 260px)",
          }}
        >
          <Table
            sx={{ minWidth: 1400 }}
            aria-label="AI analytics comparison matrix"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    minWidth: 260,
                    position: "sticky",
                    left: 0,
                    zIndex: 60,
                    bgcolor: "background.paper",
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Feature
                    <Tooltip title="Collapse or expand all feature categories">
                      <IconButton
                        size="small"
                        aria-label="Collapse all feature categories"
                        onClick={toggleAllCategories}
                        sx={{ ml: 0.5 }}
                      >
                        <UnfoldLessIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
                {scoreCards.map((s) =>
                  s.isWisdom ? (
                    <TableCell
                      key={s.name}
                      sx={{
                        minWidth: 180,
                        bgcolor:
                          "linear-gradient(180deg, rgba(109, 40, 217, 0.07), #fff)",
                        background:
                          "linear-gradient(180deg, rgba(109, 40, 217, 0.07), #fff)",
                        color: "primary.dark",
                        fontWeight: 600,
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                    >
                      WisdomAI
                    </TableCell>
                  ) : (
                    <TableCell
                      key={s.name}
                      sx={{
                        minWidth: 220,
                        borderBottom: 1,
                        borderColor: "divider",
                      }}
                      align="left"
                    >
                      {s.name}
                      <br />
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ fontSize: "0.5625rem" }}
                      >
                        {COMP_TIERS[s.name]}
                      </Typography>
                    </TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {DATA.categories
                .filter((cat) => visibleCategories.has(cat.name))
                .map((cat) => {
                  const isCol = collapsedCategories.has(cat.name);
                  const wCat = catWisdomTotal(
                    cat,
                    currentView,
                    currentQuarter,
                  );
                  const incCount =
                    currentView === "real" || currentView === "quarterly"
                      ? cat.features.length
                      : cat.features.filter((f) =>
                        isIncluded(f, currentView, currentQuarter),
                      ).length;
                  const maxCat = incCount * 5;
                  const pctCat =
                    maxCat > 0 ? Math.round((wCat / maxCat) * 100) : 0;

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
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.75,
                            }}
                          >
                            <span className="cat-toggle">▼</span>
                            <span>{cat.name}</span>
                            {cat.description && (
                              <Tooltip title={cat.description}>
                                <Box
                                  component="span"
                                  aria-label={`More details about ${cat.name}`}
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                                </Box>
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                        {scoreCards.map((s) => {
                          if (s.isWisdom) {
                            return (
                              <TableCell
                                key={s.name}
                                className="cat-score-cell wisdom-col"
                                sx={{ fontFamily: "monospace" }}
                              >
                                <Box
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    px: 0.75,
                                    py: 0.25,
                                    borderRadius: 1,
                                    backgroundColor: pctColor(pctCat),
                                    color: "#fff",
                                    fontSize: "0.75rem",
                                    fontFamily: "inherit",
                                  }}
                                >
                                  {wCat}
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{
                                      fontSize: "0.75rem",
                                      ml: 0.75,
                                      color: "inherit",
                                    }}
                                  >
                                    / {maxCat}
                                    {maxCat > 0 && (
                                      <>
                                        {" · "}
                                        <span className="pct-gradient-text">
                                          {pctCat}%
                                        </span>
                                      </>
                                    )}
                                  </Typography>
                                </Box>
                              </TableCell>
                            );
                          }

                          const c = s.name;
                          const ct = catCompTotal(
                            cat,
                            c,
                            currentView,
                            currentQuarter,
                          );
                          const pct =
                            maxCat > 0 ? Math.round((ct / maxCat) * 100) : 0;

                          return (
                            <TableCell
                              key={c}
                              className="cat-score-cell"
                              sx={{ fontFamily: "monospace" }}
                            >
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  px: 0.75,
                                  py: 0.25,
                                  borderRadius: 1,
                                  backgroundColor: pctColor(pct),
                                  color: "#fff",
                                  fontSize: "0.75rem",
                                  fontFamily: "inherit",
                                }}
                              >
                                {ct}
                                <Typography
                                  component="span"
                                  variant="caption"
                                  sx={{
                                    fontSize: "0.75rem",
                                    ml: 0.75,
                                    color: "inherit",
                                  }}
                                >
                                  / {maxCat}
                                  {maxCat > 0 && (
                                    <>
                                      {" · "}
                                      <span className="pct-gradient-text">
                                        {pct}%
                                      </span>
                                    </>
                                  )}
                                </Typography>
                              </Box>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                      {cat.features.map((f) => {
                        const inc = isIncluded(
                          f,
                          currentView,
                          currentQuarter,
                        );
                        const wScore = getWisdomScore(
                          f,
                          currentView,
                          currentQuarter,
                        );
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
                          f.wisdom.expectedDate,
                        );
                        const isPlannedNotIncluded =
                          !inc &&
                          currentView !== "ideal" &&
                          f.wisdom.readiness === "Planned";

                        return (
                          <TableRow
                            key={`${cat.name}-${f.name}`}
                            sx={{
                              display: isCol ? "none" : "table-row",
                              bgcolor: "background.default",
                              "& td": {
                                py: 1.25,
                                borderBottom:
                                  "1px solid rgba(109, 40, 217, 0.06)",
                                verticalAlign: "top",
                                fontSize: "0.8125rem",
                              },
                              "& td:first-of-type": {
                                position: "sticky",
                                left: 0,
                                zIndex: 30,
                                bgcolor: "background.default",
                              },
                            }}
                            className={`${isNew ? "new-in-quarter" : ""}`}
                          >
                            <TableCell>
                              <div className="feat-name">{f.name}</div>
                              <div className="feat-what">
                                {trunc(f.what, 140)}
                              </div>
                            </TableCell>
                            {scoreCards.map((s) => {
                              if (s.isWisdom) {
                                return (
                                  <TableCell
                                    key={s.name}
                                    align="center"
                                    sx={{
                                      bgcolor: "rgba(109, 40, 217, 0.03)",
                                    }}
                                    className={
                                      isPlannedNotIncluded
                                        ? "planned-muted"
                                        : undefined
                                    }
                                  >
                                    <Box
                                      sx={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 0.5,
                                      }}
                                    >
                                      <IconButton
                                        size="small"
                                        aria-label={`View score breakdown for ${f.name}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setScoreModalFeature({
                                            categoryName: cat.name,
                                            featureName: f.name,
                                            competitor: undefined,
                                          });
                                        }}
                                        sx={{
                                          position: "absolute",
                                          top: -4,
                                          left: -4,
                                          bgcolor: "rgba(255,255,255,0.9)",
                                          boxShadow: 1,
                                          "&:hover": {
                                            bgcolor: "background.paper",
                                          },
                                        }}
                                      >
                                        <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                                      </IconButton>
                                      <Box sx={{ alignSelf: "flex-end" }}>
                                        <Box
                                          component="span"
                                          className={`readiness-tag ${rdClass}`}
                                        >
                                          {rdLabel}
                                        </Box>
                                      </Box>
                                      <span
                                        className={`score-pill ${scoreClass(
                                          wScore,
                                        )}`}
                                      >
                                        {formatScore(wScore)}
                                      </span>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        color="text.disabled"
                                        sx={{
                                          fontSize: "0.625rem",
                                          mt: 0.5,
                                          maxWidth: isTwoCompanyView
                                            ? "none"
                                            : 260,
                                          lineHeight: 1.3,
                                          display: "-webkit-box",
                                          WebkitLineClamp: isTwoCompanyView
                                            ? 6
                                            : 3,
                                          WebkitBoxOrient: "vertical",
                                          overflow: "hidden",
                                          pl: 3,
                                        }}
                                        style={{
                                          textAlign: isTwoCompanyView
                                            ? "center"
                                            : undefined,
                                        }}
                                      >
                                        {trunc(f.wisdom.description, 140)}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                );
                              }

                              const c = s.name;
                              const cd = f.competitors[c];
                              const cs = cd?.score ?? 0;

                              return (
                                <TableCell
                                  key={c}
                                  align="center"
                                  className={
                                    isPlannedNotIncluded && (!cd || cs <= 0)
                                      ? "planned-muted"
                                      : undefined
                                  }
                                >
                                  <Box
                                    sx={{
                                      position: "relative",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    <IconButton
                                      size="small"
                                      aria-label={`View score breakdown for ${f.name} — ${c}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setScoreModalFeature({
                                          categoryName: cat.name,
                                          featureName: f.name,
                                          competitor: c,
                                        });
                                      }}
                                      sx={{
                                        position: "absolute",
                                        top: -4,
                                        left: -4,
                                        bgcolor: "rgba(255,255,255,0.9)",
                                        boxShadow: 1,
                                        "&:hover": {
                                          bgcolor: "background.paper",
                                        },
                                      }}
                                    >
                                      <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                    <Tooltip title="Messaging & Positioning">
                                      <IconButton
                                        size="small"
                                        aria-label={`Messaging and positioning vs ${c} for ${f.name}`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setMessagingModal({
                                            categoryName: cat.name,
                                            featureName: f.name,
                                            competitorName: c,
                                          });
                                        }}
                                        sx={{
                                          position: "absolute",
                                          top: 22,
                                          left: -4,
                                          bgcolor: "rgba(255,255,255,0.9)",
                                          boxShadow: 1,
                                          "&:hover": {
                                            bgcolor: "background.paper",
                                          },
                                        }}
                                      >
                                        <SwordIcon sx={{ fontSize: 14 }} />
                                      </IconButton>
                                    </Tooltip>
                                    <span
                                      className={`score-pill ${scoreClass(cs)}`}
                                    >
                                      {formatScore(cs)}
                                    </span>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      color="text.disabled"
                                      sx={{
                                        fontSize: "0.625rem",
                                        mt: 0.5,
                                        maxWidth: isTwoCompanyView
                                          ? "none"
                                          : 260,
                                        lineHeight: 1.3,
                                        display: "-webkit-box",
                                        WebkitLineClamp: isTwoCompanyView
                                          ? 6
                                          : 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        pl: 3,
                                      }}
                                      style={{
                                        textAlign: isTwoCompanyView
                                          ? "center"
                                          : undefined,
                                      }}
                                    >
                                      {trunc(cd?.description ?? "", 140)}
                                    </Typography>
                                  </Box>
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

      <Dialog
        open={Boolean(scoreModalFeature)}
        onClose={() => setScoreModalFeature(null)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="feature-score-breakdown-title"
      >
        {scoreModalFeature && (() => {
          const category = DATA.categories.find(
            (c) => c.name === scoreModalFeature.categoryName,
          );
          const feature = category?.features.find(
            (ff) => ff.name === scoreModalFeature.featureName,
          );
          if (!category || !feature) return null;

          const isCompetitor = Boolean(scoreModalFeature.competitor);
          const competitorName = scoreModalFeature.competitor;
          const criteria =
            isCompetitor && competitorName
              ? getCompetitorCriteriaScores(feature, competitorName)
              : getFeatureCriteriaScores(feature);
          const score =
            isCompetitor && competitorName
              ? feature.competitors[competitorName]?.score ?? 0
              : getWisdomScore(feature, currentView, currentQuarter);
          const scoreLabel =
            isCompetitor && competitorName
              ? `Total ${competitorName} score`
              : "Total WisdomAI score";

          return (
            <>
              <DialogTitle id="feature-score-breakdown-title">
                {isCompetitor && competitorName
                  ? `Feature Score Breakdown — ${competitorName}`
                  : "Feature Score Breakdown"}
              </DialogTitle>
              <DialogContent dividers>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  {category.name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {feature.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {scoreLabel}: <strong>{formatScore(score)}</strong> / 5
                </Typography>
                {FEATURE_CRITERIA_META.map((meta) => {
                  const rawDetail =
                    isCompetitor && competitorName
                      ? getCompetitorCriterionDetail(
                        category.name,
                        feature.name,
                        competitorName,
                        meta.key,
                      )
                      : getCriterionDetail(category.name, feature.name, meta.key);
                  const scoreVal = criteria[meta.key] ?? 0;
                  const companyName =
                    isCompetitor && competitorName ? competitorName : "WisdomAI";
                  const cellDescription =
                    isCompetitor && competitorName
                      ? feature.competitors[competitorName]?.description ?? ""
                      : feature.wisdom.description;

                  const detail = {
                    ...rawDetail,
                    explanation:
                      rawDetail.explanation ||
                      autoCriterionExplanation({
                        companyName,
                        scoreVal,
                        featureWhat: feature.what,
                        cellDescription,
                      }),
                  };
                  return (
                    <Accordion
                      key={meta.key}
                      disableGutters
                      sx={{
                        boxShadow: "none",
                        "&:before": { display: "none" },
                        borderBottom: 1,
                        borderColor: "divider",
                        "&:last-of-type": { borderBottom: 0 },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`criterion-${meta.key}-content`}
                        id={`criterion-${meta.key}-header`}
                        sx={{
                          "& .MuiAccordionSummary-content": {
                            alignItems: "center",
                            gap: 1,
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "0.875rem", flex: 1 }}
                        >
                          {meta.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: 40,
                            height: 24,
                            borderRadius: 1,
                            bgcolor: "rgba(109, 40, 217, 0.06)",
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                          }}
                        >
                          {formatScore(scoreVal)}
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{ pt: 0, flexDirection: "column" }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.75rem", mb: 1 }}
                        >
                          {meta.description}
                        </Typography>
                        {detail.explanation ? (
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, fontSize: "0.8125rem" }}
                          >
                            {detail.explanation}
                          </Typography>
                        ) : null}
                        {detail.examples && detail.examples.length > 0 ? (
                          <Box component="ul" sx={{ m: 0, pl: 2, mb: 1 }}>
                            {detail.examples.map((ex, i) => (
                              <Typography
                                component="li"
                                key={i}
                                variant="body2"
                                sx={{ fontSize: "0.8125rem", mb: 0.5 }}
                              >
                                {ex}
                              </Typography>
                            ))}
                          </Box>
                        ) : null}
                        {detail.links && detail.links.length > 0 ? (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {detail.links.map((l, i) => (
                              <Link
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="body2"
                                sx={{ fontSize: "0.8125rem" }}
                              >
                                {l.label}
                              </Link>
                            ))}
                          </Box>
                        ) : null}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setScoreModalFeature(null)}>Close</Button>
              </DialogActions>
            </>
          );
        })()}
      </Dialog>

      <Dialog
        open={Boolean(messagingModal)}
        onClose={() => setMessagingModal(null)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="messaging-positioning-title"
      >
        {messagingModal && (() => {
          const mpData = getMessagingPositioning(
            messagingModal.categoryName,
            messagingModal.featureName,
            messagingModal.competitorName,
            (() => {
              const cat = DATA.categories.find(
                (c) => c.name === messagingModal.categoryName,
              );
              const feat = cat?.features.find(
                (f) => f.name === messagingModal.featureName,
              );
              return (
                feat?.competitors[messagingModal.competitorName]?.description ??
                ""
              );
            })(),
          );
          return (
            <>
              <DialogTitle id="messaging-positioning-title">
                Messaging &amp; Positioning
              </DialogTitle>
              <DialogContent dividers>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  {messagingModal.featureName} vs{" "}
                  {messagingModal.competitorName}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Response
                </Typography>
                <Tabs
                  value={responseTab}
                  onChange={(_, v) =>
                    setResponseTab(v as "short" | "medium" | "long")
                  }
                  sx={{
                    minHeight: 36,
                    mb: 1,
                    "& .MuiTab-root": {
                      minHeight: 36,
                      py: 0.5,
                      px: 1.5,
                      fontSize: "0.75rem",
                    },
                    "& .MuiTabs-indicator": { bgcolor: "primary.main" },
                  }}
                >
                  <Tab label="Short (280)" value="short" />
                  <Tab label="Medium (280–560)" value="medium" />
                  <Tab label="Long (560–1000)" value="long" />
                </Tabs>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    p: 1.5,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    fontSize: "0.875rem",
                  }}
                >
                  {responseTab === "short"
                    ? mpData.responseShort
                    : responseTab === "medium"
                      ? mpData.responseMedium
                      : mpData.responseLong}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Messaging &amp; Positioning Framework
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                  }}
                >
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderLeft: 3,
                      borderColor: "info.main",
                      bgcolor: "rgba(59, 130, 246, 0.04)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="info.dark"
                    >
                      The Competitor&apos;s Hook
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8125rem", mt: 0.5 }}
                    >
                      {mpData.hook}
                    </Typography>
                  </Paper>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderLeft: 3,
                      borderColor: "error.main",
                      bgcolor: "rgba(239, 68, 68, 0.04)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="error.dark"
                    >
                      The Flaw in the Logic
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8125rem", mt: 0.5 }}
                    >
                      {mpData.flaw}
                    </Typography>
                  </Paper>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderLeft: 3,
                      borderColor: "info.main",
                      bgcolor: "rgba(14, 165, 233, 0.04)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="info.dark"
                    >
                      Our Counter-Positioning
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8125rem", mt: 0.5 }}
                    >
                      {mpData.counter}
                    </Typography>
                  </Paper>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderLeft: 3,
                      borderColor: "warning.main",
                      bgcolor: "rgba(245, 158, 11, 0.08)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color="warning.dark"
                    >
                      Landmine Question
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8125rem", mt: 0.5 }}
                    >
                      {mpData.landmine}
                    </Typography>
                  </Paper>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setMessagingModal(null)}>Close</Button>
              </DialogActions>
            </>
          );
        })()}
      </Dialog>
    </Box>
  );
}

