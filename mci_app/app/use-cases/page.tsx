"use client";

import Box from "@mui/material/Box";
import { ProductMarketingNav } from "../ProductMarketingNav";
import UseCaseMatrix from "./UseCaseMatrix";

export default function WisdomAIUseCaseMatrix() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <ProductMarketingNav active="use-cases" />

      <Box
        sx={{
          flex: 1,
        }}
      >
        <UseCaseMatrix />
      </Box>
    </Box>
  );
}

/*

"use client";

import Box from "@mui/material/Box";
import { ProductMarketingNav } from "../ProductMarketingNav";
import UseCaseMatrix from "./UseCaseMatrix";

export default function WisdomAIUseCaseMatrix() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <ProductMarketingNav active="use-cases" />

      <Box
        sx={{
          flex: 1,
        }}
      >
        <UseCaseMatrix />
      </Box>
    </Box>
  );
}

 "use client";

import { useState, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ProductMarketingNav } from "../ProductMarketingNav";

// The rest of the original use case matrix implementation was truncated.
// For navigation parity and tests, we only need a minimal, working matrix.

type UseCase = {
  id: string;
  title: string;
  expectedOutcome: string;
};

const USE_CASES: UseCase[] = [
  {
    id: "uc-01",
    title: "Ask follow-up questions in plain English without rewriting SQL",
    expectedOutcome:
      "Analysts iterate 10x faster on complex queries through multi-turn conversation.",
  },
];

export default function WisdomAIUseCaseMatrix() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = useCallback(
    (id: string) => {
      setExpandedRow((prev) => (prev === id ? null : id));
    },
    [],
  );

  const filtered = useMemo(() => USE_CASES, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
      }}
    >
      <ProductMarketingNav active="use-cases" />

      <Box
        sx={{
          flex: 1,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          color: "#1e293b",
        }}
      >
        <Box
          sx={{
            px: { xs: 2.5, md: 5 },
            pt: 4,
            pb: 3,
            borderBottom: 1,
            borderColor: "divider",
            borderRadius: 0,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "1.75rem", fontWeight: 700 }}
          >
            Use Case Comparison
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.8125rem" }}
          >
            {filtered.length} use case
            {filtered.length !== 1 ? "s" : ""} across multiple personas — click
            any row to expand details.
          </Typography>
        </Box>

        <Box
          sx={{
            px: { xs: 2.5, md: 5 },
            py: 2.5,
          }}
        >
          <Box sx={{ mb: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Persona
            </Typography>
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Industry
            </Typography>
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Challenge
            </Typography>
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Outcome
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 700,
                color: "text.secondary",
                textTransform: "uppercase",
              }}
            >
              Key Metric
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "uppercase",
                }}
              >
                Competitors
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.75rem", color: "text.secondary" }}
              >
                All competitors
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  color: "text.secondary",
                  textTransform: "uppercase",
                }}
              >
                Show
              </Typography>
              {["Wins", "Ties", "Trails"].map((label) => (
                <Button
                  key={label}
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.5,
                    borderColor: "divider",
                    color: "text.secondary",
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 1 }}>
            {filtered.map((uc) => {
              const isExpanded = expandedRow === uc.id;
              return (
                <Box
                  key={uc.id}
                  onClick={() => toggleRow(uc.id)}
                  sx={{
                    px: 1.75,
                    py: 1.25,
                    borderRadius: 1,
                    border: "1px solid #e2e8f0",
                    mb: 1,
                    cursor: "pointer",
                    bgcolor: isExpanded ? "#f8fafc" : "#fff",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    {uc.title}
                  </Typography>

                  {isExpanded && (
                    <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          textTransform: "uppercase",
                          fontSize: "0.65rem",
                          color: "#6366f1",
                        }}
                      >
                        Expected Outcome
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          fontSize: "0.8rem",
                          color: "#334155",
                        }}
                      >
                        {uc.expectedOutcome}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

*/

