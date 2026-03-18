import { Box, Paper, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { ScoreBar } from "../../components/ScoreBar";

const QUADRANTS = [
  { color: tokens.success, title: "High Value, Low Price (Ideal)", desc: "WisdomAI · Hex · Power BI (entry)" },
  { color: "#2563eb", title: "High Value, High Price (Premium)", desc: "Snowflake · Databricks · ThoughtSpot" },
  { color: tokens.warn, title: "Mid Value, Mid Price", desc: "Sigma · GoodData · Omni" },
  { color: tokens.danger, title: "Low Value, High Price (Vulnerable)", desc: "Aging tools with legacy pricing models" },
];

const SCORE_WEIGHTS = [
  { label: "AI/NL capabilities", pct: 35, color: tokens.wisdom },
  { label: "Ease of use", pct: 25, color: "#2563eb" },
  { label: "Data connectivity", pct: 20, color: tokens.warn },
  { label: "Enterprise features", pct: 12, color: tokens.success },
  { label: "Support & SLA", pct: 8, color: tokens.text3 },
];

export function QuadrantBreakdown() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      <Paper sx={{ p: "24px" }}>
        <Typography sx={{ fontFamily: '"Syne", sans-serif', fontSize: "15px", fontWeight: 600, color: tokens.text, mb: "4px" }}>
          Quadrant breakdown
        </Typography>
        <Typography sx={{ fontSize: "12px", color: tokens.text3, mb: "18px" }}>
          Competitive positioning by value-price quadrant
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: "6px" }}>
          {QUADRANTS.map((q) => (
            <Box key={q.title} sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Box sx={{ width: 9, height: 9, borderRadius: "2px", background: q.color, flexShrink: 0 }} />
              <Box>
                <Typography sx={{ fontSize: "13px", fontWeight: 500, color: tokens.text }}>{q.title}</Typography>
                <Typography sx={{ fontSize: "12px", color: tokens.text3 }}>{q.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper sx={{ p: "24px" }}>
        <Typography sx={{ fontFamily: '"Syne", sans-serif', fontSize: "15px", fontWeight: 600, color: tokens.text, mb: "4px" }}>
          Value score methodology
        </Typography>
        <Typography sx={{ fontSize: "12px", color: tokens.text3, mb: "18px" }}>Composite score weights</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", mt: "8px" }}>
          {SCORE_WEIGHTS.map((w) => (
            <ScoreBar key={w.label} label={w.label} value={w.pct} color={w.color} labelWidth={130} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

