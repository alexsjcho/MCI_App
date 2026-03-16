import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  QUADRANTS,
  type QuadrantConfig,
  type QuadrantPoint,
} from "./company-data";

const CHART_W = 480;
const CHART_H = 340;
const PAD_LEFT = 48;
const PAD_RIGHT = 16;
const PAD_TOP = 30;
const PAD_BOTTOM = 42;
const PLOT_W = CHART_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = CHART_H - PAD_TOP - PAD_BOTTOM;

function toSvg(p: QuadrantPoint) {
  return {
    x: PAD_LEFT + (p.x / 100) * PLOT_W,
    y: PAD_TOP + ((100 - p.y) / 100) * PLOT_H,
  };
}

function QuadrantLabelPill({
  x,
  y,
  text,
  anchor,
  isWinZone,
}: {
  x: number;
  y: number;
  text: string;
  anchor: "start" | "end";
  isWinZone: boolean;
}) {
  const bg = isWinZone ? "#d1e9d5" : "#e8e5dc";
  const fg = isWinZone ? "#1a5c2e" : "#5a5750";
  const border = isWinZone ? "#90ccaa" : "#ccc9be";
  const px = 6;
  const py = 3;
  const fs = 8.5;

  return (
    <g>
      <rect
        x={anchor === "end" ? x - text.length * fs * 0.52 - px * 2 : x}
        y={y - fs / 2 - py}
        width={text.length * fs * 0.52 + px * 2}
        height={fs + py * 2}
        rx={4}
        fill={bg}
        stroke={border}
        strokeWidth={0.5}
      />
      <text
        x={
          anchor === "end"
            ? x - text.length * fs * 0.52 - px * 2 + px
            : x + px
        }
        y={y + fs * 0.33}
        fontSize={fs}
        fontWeight={600}
        fill={fg}
        fontFamily="'DM Sans', sans-serif"
      >
        {text}
      </text>
    </g>
  );
}

function QuadrantChart({
  config,
  stacked,
}: {
  config: QuadrantConfig;
  stacked?: boolean;
}) {
  const midX = PAD_LEFT + PLOT_W / 2;
  const midY = PAD_TOP + PLOT_H / 2;
  const plotRight = PAD_LEFT + PLOT_W;
  const plotBottom = PAD_TOP + PLOT_H;
  const ticks = [0, 50, 100];
  const [tl, tr, bl, br] = config.quadrantLabels;
  const isWin = (label: string) =>
    label.includes("ideal") ||
    label.includes("win zone") ||
    label.includes("claim");

  return (
    <Box sx={{ mt: 1, flex: 1 }}>
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        role="img"
        aria-label={`${config.title} quadrant map`}
        style={{
          width: "100%",
          height: stacked ? "380px" : "auto",
          display: "block",
        }}
      >
        <rect
          x={PAD_LEFT}
          y={PAD_TOP}
          width={PLOT_W}
          height={PLOT_H}
          fill="#fafaf8"
          rx={0}
        />

        {/* Grid lines */}
        {ticks.map((val) => {
          const xPos = PAD_LEFT + (val / 100) * PLOT_W;
          const yPos = PAD_TOP + ((100 - val) / 100) * PLOT_H;
          return (
            <g key={val}>
              <line
                x1={xPos}
                y1={PAD_TOP}
                x2={xPos}
                y2={plotBottom}
                stroke="rgba(0,0,0,0.05)"
                strokeWidth={0.5}
              />
              <line
                x1={PAD_LEFT}
                y1={yPos}
                x2={plotRight}
                y2={yPos}
                stroke="rgba(0,0,0,0.05)"
                strokeWidth={0.5}
              />
            </g>
          );
        })}

        {/* Dashed crosshairs at midpoint */}
        <line
          x1={midX}
          y1={PAD_TOP}
          x2={midX}
          y2={plotBottom}
          stroke="rgba(30,28,24,0.18)"
          strokeWidth={1.2}
          strokeDasharray="5 3"
        />
        <line
          x1={PAD_LEFT}
          y1={midY}
          x2={plotRight}
          y2={midY}
          stroke="rgba(30,28,24,0.18)"
          strokeWidth={1.2}
          strokeDasharray="5 3"
        />

        {/* Axis border lines */}
        <line
          x1={PAD_LEFT}
          y1={plotBottom}
          x2={plotRight}
          y2={plotBottom}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={1}
        />
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP}
          x2={PAD_LEFT}
          y2={plotBottom}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth={1}
        />

        {/* Tick labels — X */}
        {ticks.map((val) => {
          const xPos = PAD_LEFT + (val / 100) * PLOT_W;
          return (
            <text
              key={`xt-${val}`}
              x={xPos}
              y={plotBottom + 14}
              textAnchor="middle"
              fontSize={9}
              fill="#8a8780"
              fontFamily="'DM Sans', sans-serif"
            >
              {val}
            </text>
          );
        })}
        {/* Tick labels — Y */}
        {ticks.map((val) => {
          const yPos = PAD_TOP + ((100 - val) / 100) * PLOT_H;
          return (
            <text
              key={`yt-${val}`}
              x={PAD_LEFT - 8}
              y={yPos + 3}
              textAnchor="end"
              fontSize={9}
              fill="#8a8780"
              fontFamily="'DM Sans', sans-serif"
            >
              {val}
            </text>
          );
        })}

        {/* X axis label */}
        <text
          x={PAD_LEFT + PLOT_W / 2}
          y={CHART_H - 4}
          textAnchor="middle"
          fontSize={9.5}
          fill="#8a8780"
          fontFamily="'DM Sans', sans-serif"
        >
          {config.xLabel}
        </text>
        {/* Y axis label */}
        <text
          x={12}
          y={PAD_TOP + PLOT_H / 2}
          textAnchor="middle"
          fontSize={9.5}
          fill="#8a8780"
          fontFamily="'DM Sans', sans-serif"
          transform={`rotate(-90 12 ${PAD_TOP + PLOT_H / 2})`}
        >
          {config.yLabel}
        </text>

        {/* Quadrant label pills — positioned at corners of chart area */}
        <QuadrantLabelPill
          x={PAD_LEFT + 4}
          y={PAD_TOP - 10}
          text={tl}
          anchor="start"
          isWinZone={isWin(tl)}
        />
        <QuadrantLabelPill
          x={plotRight - 4}
          y={PAD_TOP - 10}
          text={tr}
          anchor="end"
          isWinZone={isWin(tr)}
        />
        <QuadrantLabelPill
          x={PAD_LEFT + 4}
          y={plotBottom + 26}
          text={bl}
          anchor="start"
          isWinZone={isWin(bl)}
        />
        <QuadrantLabelPill
          x={plotRight - 4}
          y={plotBottom + 26}
          text={br}
          anchor="end"
          isWinZone={isWin(br)}
        />

        {/* Bubbles */}
        {config.points.map((p) => {
          const pos = toSvg(p);
          const r = p.r * 1.4;
          return (
            <g key={p.label}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                fill={p.isWisdom ? `${p.color}cc` : `${p.color}44`}
                stroke={p.color}
                strokeWidth={p.isWisdom ? 2.5 : 1.5}
              />
              <text
                x={pos.x}
                y={pos.y - r - 5}
                textAnchor="middle"
                fontSize={9.5}
                fontWeight={p.isWisdom ? 700 : 600}
                fill={p.isWisdom ? "#1a1916" : "#3d3d3a"}
                fontFamily="'DM Sans', sans-serif"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
}

export function CompanyQuadrants() {
  const [viewMode, setViewMode] = useState<"grid" | "stack">("grid");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLabels, setSelectedLabels] = useState<Set<string>>(() => {
    const labels = new Set<string>();
    QUADRANTS.forEach((q) =>
      q.points.forEach((p) => {
        if (!p.isWisdom) labels.add(p.label);
      }),
    );
    return labels;
  });

  const allLabels = useMemo(() => {
    const labels = new Set<string>();
    QUADRANTS.forEach((q) =>
      q.points.forEach((p) => {
        if (!p.isWisdom) labels.add(p.label);
      }),
    );
    return Array.from(labels.values());
  }, []);

  const open = Boolean(anchorEl);

  const handleToggleLabel = (label: string) => {
    setSelectedLabels((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const visibleLabelSummary =
    selectedLabels.size === allLabels.length
      ? "All competitors"
      : `${selectedLabels.size} of ${allLabels.length} competitors`;

  const filteredQuadrants: QuadrantConfig[] = useMemo(
    () =>
      QUADRANTS.map((q) => ({
        ...q,
        points: q.points.filter(
          (p) => p.isWisdom || selectedLabels.has(p.label),
        ),
      })),
    [selectedLabels],
  );

  return (
    <Box sx={{ px: { xs: 2.5, md: 5 }, pb: 4, pt: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.75rem" }}
        >
          WisdomAI is always shown. Select competitors to compare.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "inline-flex",
              borderRadius: 1,
              bgcolor: "action.hover",
              p: 0.25,
            }}
          >
            <IconButton
              size="small"
              aria-label="Grid view"
              onClick={() => setViewMode("grid")}
              sx={{
                borderRadius: 1,
                bgcolor:
                  viewMode === "grid" ? "background.paper" : "transparent",
                boxShadow:
                  viewMode === "grid"
                    ? "0 1px 3px rgba(0,0,0,0.08)"
                    : "none",
              }}
            >
              <ViewModuleIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Stacked view"
              onClick={() => setViewMode("stack")}
              sx={{
                borderRadius: 1,
                bgcolor:
                  viewMode === "stack" ? "background.paper" : "transparent",
                boxShadow:
                  viewMode === "stack"
                    ? "0 1px 3px rgba(0,0,0,0.08)"
                    : "none",
              }}
            >
              <ViewStreamIcon fontSize="small" />
            </IconButton>
          </Box>

          <Button
            size="small"
            variant="outlined"
            startIcon={<FilterListIcon fontSize="small" />}
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              textTransform: "none",
              fontSize: "0.75rem",
              borderColor: "divider",
              color: "text.secondary",
            }}
          >
            {visibleLabelSummary}
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
                setSelectedLabels(new Set(allLabels));
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Select all
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedLabels(new Set());
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                Deselect all (WisdomAI only)
              </Typography>
            </MenuItem>
            {allLabels.map((label) => (
              <MenuItem
                key={label}
                onClick={() => handleToggleLabel(label)}
              >
                <Checkbox
                  checked={selectedLabels.has(label)}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                  {label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            viewMode === "grid"
              ? { xs: "1fr", md: "1fr 1fr" }
              : "1fr",
          gap: 2,
        }}
      >
        {filteredQuadrants.map((q) => (
          <Paper
            key={q.id}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              minHeight: 0,
              ...(viewMode === "stack" && { maxWidth: "100%" }),
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, fontSize: "0.95rem" }}
            >
              {q.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.8125rem",
                lineHeight: 1.5,
                minHeight: 36,
              }}
            >
              {q.subtitle}
            </Typography>

            <QuadrantChart config={q} stacked={viewMode === "stack"} />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
