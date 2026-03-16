import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  COMPETITORS,
  WISDOM_COMPANY,
  COMPANY_PROFILES,
  type ThreatTier,
} from "./company-data";

export function CompanyOverview() {
  const allIds = useMemo(() => COMPETITORS.map((c) => c.id), []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(allIds),
  );
  const [activeTier, setActiveTier] = useState<ThreatTier | "all">("all");

  const open = Boolean(anchorEl);

  const visibleCompetitors = useMemo(
    () =>
      COMPETITORS.filter((c) => {
        if (!selected.has(c.id)) return false;
        if (activeTier === "all") return true;
        return c.threatLevel === activeTier;
      }),
    [selected, activeTier],
  );

  const label =
    selected.size === allIds.length
      ? "All competitors"
      : `${selected.size} of ${allIds.length} competitors`;

  return (
    <Box sx={{ px: { xs: 2.5, md: 5 }, pb: 4, pt: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.75rem" }}
        >
          WisdomAI always shown. Click any row to open the full battlecard.
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            startIcon={<FilterListIcon fontSize="small" />}
            sx={{
              textTransform: "none",
              fontSize: "0.75rem",
              borderColor: "divider",
              color: "text.secondary",
            }}
          >
            {label}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                setSelected(new Set(allIds));
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Select all
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelected(new Set());
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Deselect all (WisdomAI only)
              </Typography>
            </MenuItem>
            {COMPETITORS.map((c) => (
              <MenuItem
                key={c.id}
                onClick={() =>
                  setSelected((prev) => {
                    const next = new Set(prev);
                    if (next.has(c.id)) next.delete(c.id);
                    else next.add(c.id);
                    return next;
                  })
                }
              >
                <Checkbox
                  checked={selected.has(c.id)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                  {c.name}
                </Typography>
              </MenuItem>
            ))}
            <Box sx={{ borderTop: 1, borderColor: "divider", mt: 0.5, pt: 0.5, px: 1.5, pb: 0.5 }}>
              <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.6875rem", mb: 0.5, display: "block" }}>
                Filter by tier
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  borderRadius: 999,
                  bgcolor: "action.hover",
                  p: 0.25,
                }}
              >
                {(["tier1", "tier2", "tier3"] as ThreatTier[]).map((tier) => {
                  const labelShort =
                    tier === "tier1" ? "T1" : tier === "tier2" ? "T2" : "T3";
                  return (
                    <Button
                      key={tier}
                      size="small"
                      onClick={() =>
                        setActiveTier((prev) => (prev === tier ? "all" : tier))
                      }
                      sx={{
                        textTransform: "none",
                        fontSize: "0.7rem",
                        px: 1.25,
                        minWidth: 0,
                        bgcolor: activeTier === tier ? "background.paper" : "transparent",
                      }}
                    >
                      {labelShort}
                    </Button>
                  );
                })}
              </Box>
            </Box>
          </Menu>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <TableContainer>
          <Table
            stickyHeader
            size="small"
            aria-label="company overview table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Tier</TableCell>
                <TableCell>Stage / Scale</TableCell>
                <TableCell>ARR</TableCell>
                <TableCell>ICP Roles</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Business Model</TableCell>
                <TableCell>Sales Motion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ bgcolor: "action.hover" }}>
                <TableCell>
                  <Typography fontWeight={600}>
                    {WISDOM_COMPANY.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={WISDOM_COMPANY.threatLabel}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.6875rem",
                      bgcolor: "rgba(42,79,62,0.08)",
                      color: "primary.main",
                    }}
                  />
                </TableCell>
                {(() => {
                  const profile = COMPANY_PROFILES.wisdomai;
                  return (
                    <>
                      <TableCell>{profile.stage}</TableCell>
                      <TableCell>{profile.arr}</TableCell>
                      <TableCell>{profile.icpRoles}</TableCell>
                      <TableCell>{profile.delivery}</TableCell>
                      <TableCell>{profile.businessModel}</TableCell>
                      <TableCell>
                        {profile.salesMotion.join(" · ")}
                      </TableCell>
                    </>
                  );
                })()}
              </TableRow>
              {visibleCompetitors.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{c.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={c.threatLabel}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.625rem",
                        textTransform: "none",
                      }}
                    />
                  </TableCell>
                  {(() => {
                    const profile =
                      COMPANY_PROFILES[c.id as keyof typeof COMPANY_PROFILES];
                    return (
                      <>
                        <TableCell>{profile?.stage ?? "-"}</TableCell>
                        <TableCell>{profile?.arr ?? "-"}</TableCell>
                        <TableCell>{profile?.icpRoles ?? "-"}</TableCell>
                        <TableCell>{profile?.delivery ?? "-"}</TableCell>
                        <TableCell>{profile?.businessModel ?? "-"}</TableCell>
                        <TableCell>
                          {profile?.salesMotion?.join(" · ") ?? "-"}
                        </TableCell>
                      </>
                    );
                  })()}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

