"use client";

import { useState, useMemo, useCallback } from "react";
import {
  TIERS,
  COMPETITORS,
  PERSONAS,
  INDUSTRIES,
  CHALLENGES,
  OUTCOME_CATEGORIES,
  KEY_METRICS,
  USE_CASES,
} from "./use-case-data";

const scoreColor = (s: number) =>
  s >= 5 ? "#16a34a" : s >= 4 ? "#65a30d" : s >= 3 ? "#ca8a04" : s >= 2 ? "#ea580c" : "#dc2626";

const scoreBg = (s: number) =>
  s >= 5 ? "#dcfce7" : s >= 4 ? "#ecfccb" : s >= 3 ? "#fef9c3" : s >= 2 ? "#ffedd5" : "#fee2e2";

const scoreLabel = (s: number) =>
  s >= 5 ? "Leader" : s >= 4 ? "Strong" : s >= 3 ? "Adequate" : s >= 2 ? "Limited" : "Absent";

type ScoreBarProps = {
  score: number;
  maxWidth?: number;
};

const ScoreBar = ({ score, maxWidth = 60 }: ScoreBarProps) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
    <div style={{ width: maxWidth, height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
      <div
        style={{
          width: `${(score / 5) * 100}%`,
          height: "100%",
          background: scoreColor(score),
          borderRadius: 4,
          transition: "width .3s ease",
        }}
      />
    </div>
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: scoreColor(score),
        minWidth: 14,
        textAlign: "center",
      }}
    >
      {score}
    </span>
  </div>
);

type FilterPillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
};

const FilterPill = ({ label, active, onClick, count }: FilterPillProps) => (
  <button
    onClick={onClick}
    type="button"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "4px 12px",
      borderRadius: 16,
      border: "1px solid",
      borderColor: active ? "#6366f1" : "#e2e8f0",
      background: active ? "#eef2ff" : "#fff",
      color: active ? "#4338ca" : "#64748b",
      fontWeight: active ? 600 : 400,
      fontSize: 12,
      cursor: "pointer",
      transition: "all .15s",
    }}
  >
    {label}
    {count !== undefined && (
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          background: active ? "#c7d2fe" : "#f1f5f9",
          color: active ? "#4338ca" : "#94a3b8",
          borderRadius: 8,
          padding: "0 5px",
          minWidth: 16,
          textAlign: "center",
        }}
      >
        {count}
      </span>
    )}
  </button>
);

type TierTooltipProps = {
  tier: (typeof TIERS)[number];
  visible: boolean;
};

const TierTooltip = ({ tier, visible }: TierTooltipProps) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(100% + 6px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#1e293b",
        color: "#fff",
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 6,
        whiteSpace: "nowrap",
        zIndex: 20,
        pointerEvents: "none",
      }}
    >
      {tier.fullLabel}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid #1e293b",
        }}
      />
    </div>
  );
};

type CompetitorDropdownProps = {
  selectedCompetitors: string[];
  setSelectedCompetitors: (ids: string[]) => void;
};

const CompetitorDropdown = ({
  selectedCompetitors,
  setSelectedCompetitors,
}: CompetitorDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const filtered = COMPETITORS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.short.toLowerCase().includes(search.toLowerCase());
    const matchesTier = !activeTier || c.tier === activeTier;
    return matchesSearch && matchesTier;
  });

  const toggleComp = (id: string) => {
    setSelectedCompetitors(
      selectedCompetitors.includes(id)
        ? selectedCompetitors.filter((v) => v !== id)
        : [...selectedCompetitors, id],
    );
  };

  const selectAll = () => {
    setSelectedCompetitors(COMPETITORS.map((c) => c.id));
    setActiveTier(null);
  };
  const deselectAll = () => {
    setSelectedCompetitors([]);
    setActiveTier(null);
  };

  const count = selectedCompetitors.length;
  const label =
    count === 0
      ? "No competitors"
      : count === COMPETITORS.length
        ? "All competitors"
        : `${count} competitor${count > 1 ? "s" : ""}`;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          borderRadius: 6,
          fontSize: 12,
          cursor: "pointer",
          border: "1px solid #e2e8f0",
          background: "#fff",
          color: "#334155",
          fontWeight: 500,
          minWidth: 160,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>{label}</span>
          {count > 0 && count < COMPETITORS.length && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: "#eef2ff",
                color: "#4338ca",
                borderRadius: 8,
                padding: "0 5px",
              }}
            >
              {count}
            </span>
          )}
        </div>
        <span
          aria-hidden="true"
          style={{
            fontSize: 10,
            color: "#94a3b8",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .15s",
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <>
          <div
            onClick={() => {
              setOpen(false);
              setSearch("");
              setActiveTier(null);
            }}
            style={{ position: "fixed", inset: 0, zIndex: 9 }}
          />

          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              zIndex: 10,
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,.1)",
              width: 280,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "8px 10px", borderBottom: "1px solid #f1f5f9" }}>
              <input
                type="text"
                placeholder="Search competitors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                style={{
                  width: "100%",
                  padding: "5px 8px",
                  border: "1px solid #e2e8f0",
                  borderRadius: 5,
                  fontSize: 12,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                padding: "6px 10px",
                borderBottom: "1px solid #f1f5f9",
                gap: 0,
              }}
            >
              {TIERS.map((t) => {
                const isActive = activeTier === t.id;
                return (
                  <div
                    key={t.id}
                    style={{
                      position: "relative",
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TierTooltip tier={t} visible={hoveredTier === t.id} />
                    <button
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          setActiveTier(null);
                          setSelectedCompetitors(COMPETITORS.map((c) => c.id));
                        } else {
                          setActiveTier(t.id);
                          setSelectedCompetitors(
                            COMPETITORS.filter((c) => c.tier === t.id).map((c) => c.id),
                          );
                        }
                      }}
                      onMouseEnter={() => setHoveredTier(t.id)}
                      onMouseLeave={() => setHoveredTier(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        width: "100%",
                        padding: "5px 8px",
                        border: "1px solid",
                        borderColor: isActive ? t.color : "#e2e8f0",
                        borderRadius: 6,
                        fontSize: 12,
                        cursor: "pointer",
                        background: isActive ? t.bg : "#fff",
                        color: isActive ? t.color : "#64748b",
                        fontWeight: isActive ? 700 : 600,
                        margin: "0 2px",
                        transition: "all .12s",
                      }}
                    >
                      {t.label}
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          border: `1.5px solid ${isActive ? t.color : "#cbd5e1"}`,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          fontWeight: 700,
                          color: isActive ? t.color : "#94a3b8",
                          lineHeight: 1,
                        }}
                      >
                        i
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 6,
                padding: "6px 10px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <button
                type="button"
                onClick={selectAll}
                style={{
                  flex: 1,
                  padding: "5px 0",
                  borderRadius: 6,
                  fontSize: 11,
                  cursor: "pointer",
                  fontWeight: 600,
                  border: "1px solid #e2e8f0",
                  background: selectedCompetitors.length === COMPETITORS.length ? "#eef2ff" : "#fff",
                  color: selectedCompetitors.length === COMPETITORS.length ? "#4338ca" : "#6366f1",
                  transition: "all .12s",
                }}
              >
                Select All
              </button>
              <button
                type="button"
                onClick={deselectAll}
                style={{
                  flex: 1,
                  padding: "5px 0",
                  borderRadius: 6,
                  fontSize: 11,
                  cursor: "pointer",
                  fontWeight: 600,
                  border: "1px solid #e2e8f0",
                  background: selectedCompetitors.length === 0 ? "#fef2f2" : "#fff",
                  color: selectedCompetitors.length === 0 ? "#dc2626" : "#94a3b8",
                  transition: "all .12s",
                }}
              >
                Deselect All
              </button>
            </div>

            <div style={{ maxHeight: 240, overflowY: "auto" }}>
              {filtered.length === 0 && (
                <div
                  style={{
                    padding: "12px 10px",
                    fontSize: 12,
                    color: "#94a3b8",
                    textAlign: "center",
                  }}
                >
                  No matches
                </div>
              )}
              {filtered.map((c) => {
                const checked = selectedCompetitors.includes(c.id);
                const tierObj = TIERS.find((t) => t.id === c.tier)!;
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleComp(c.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleComp(c.id);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 10px",
                      cursor: "pointer",
                      background: checked ? "#fafbff" : "#fff",
                      transition: "background .1s",
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 3,
                        flexShrink: 0,
                        border: `1.5px solid ${checked ? c.color : "#cbd5e1"}`,
                        background: checked ? c.color : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all .12s",
                      }}
                    >
                      {checked && (
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: c.color,
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#334155",
                      }}
                    >
                      {c.name}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: tierObj.color,
                        background: tierObj.bg,
                        padding: "1px 6px",
                        borderRadius: 6,
                        flexShrink: 0,
                      }}
                    >
                      {tierObj.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

type UseCase = (typeof USE_CASES)[number];

type UseCaseDetailProps = {
  uc: UseCase;
  selectedCompetitors: string[];
  result: "win" | "tie" | "trail" | null;
};

const UseCaseDetail = ({ uc, selectedCompetitors, result }: UseCaseDetailProps) => {
  const visibleComps = COMPETITORS.filter((c) => selectedCompetitors.includes(c.id));
  const personaObj = PERSONAS.find((p) => p.id === uc.persona);
  const challengeObj = CHALLENGES.find((ch) => ch.id === uc.challenge);
  const resultStyles = {
    win: { bg: "#dcfce7", color: "#16a34a", label: "WIN" },
    tie: { bg: "#f1f5f9", color: "#64748b", label: "TIE" },
    trail: { bg: "#fee2e2", color: "#dc2626", label: "TRAIL" },
  } as const;
  const rs = result ? resultStyles[result] : null;

  return (
    <div
      style={{
        background: "#f8fafc",
        borderTop: "2px solid #6366f1",
        padding: "20px 24px",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#6366f1",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            Use Case Details
          </div>
          {rs && (
            <div
              style={{
                fontSize: 12,
                color: "#64748b",
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <strong>Competitive Standing:</strong>
              <span
                style={{
                  fontSize: 10,
                  background: rs.bg,
                  color: rs.color,
                  padding: "2px 8px",
                  borderRadius: 6,
                  fontWeight: 700,
                }}
              >
                {rs.label}
              </span>
            </div>
          )}
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
            <strong>Persona:</strong> {personaObj?.label}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
            <strong>Challenge:</strong> {challengeObj?.label}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
            <strong>Product:</strong> {uc.relatedProduct}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#64748b",
              marginBottom: 4,
              marginTop: 8,
            }}
          >
            <strong>Related Features:</strong>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {uc.features.map((f) => (
              <span
                key={f}
                style={{
                  fontSize: 10,
                  background: "#e0e7ff",
                  color: "#3730a3",
                  padding: "2px 7px",
                  borderRadius: 8,
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#6366f1",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            Expected Outcome
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#334155",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {uc.expectedOutcome}
          </p>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#6366f1",
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            Improvement Metric
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
            <div
              style={{
                flex: 1,
                background: "#fee2e2",
                borderRadius: 8,
                padding: 10,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "#991b1b",
                  fontWeight: 700,
                  marginBottom: 2,
                }}
              >
                BEFORE
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#64748b",
                  marginBottom: 1,
                }}
              >
                {uc.before.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#dc2626",
                }}
              >
                {uc.before.value}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 18,
                color: "#cbd5e1",
              }}
            >
              →
            </div>
            <div
              style={{
                flex: 1,
                background: "#dcfce7",
                borderRadius: 8,
                padding: 10,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "#166534",
                  fontWeight: 700,
                  marginBottom: 2,
                }}
              >
                AFTER
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#64748b",
                  marginBottom: 1,
                }}
              >
                {uc.after.label}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#16a34a",
                }}
              >
                {uc.after.value}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          borderRadius: 8,
          padding: "10px 14px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#6366f1",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#4338ca",
            }}
          >
            WisdomAI
          </span>
          <ScoreBar score={uc.scores.wisdomai} maxWidth={50} />
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: "#475569",
            lineHeight: 1.5,
          }}
        >
          {uc.notes.wisdomai}
        </p>
      </div>

      {visibleComps.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {visibleComps.map((c) => {
            const delta = uc.scores.wisdomai - uc.scores[c.id];
            return (
              <div
                key={c.id}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  padding: "10px 14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c.color,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {c.name}
                  </span>
                  <ScoreBar score={uc.scores[c.id]} maxWidth={40} />
                  {delta !== 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: delta > 0 ? "#16a34a" : "#dc2626",
                        marginLeft: "auto",
                      }}
                    >
                      WisdomAI {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                  {delta === 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        color: "#94a3b8",
                        marginLeft: "auto",
                      }}
                    >
                      TIE
                    </span>
                  )}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "#64748b",
                    lineHeight: 1.4,
                  }}
                >
                  {uc.notes[c.id]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function UseCaseMatrix() {
  const [activePersonas, setActivePersonas] = useState<string[]>([]);
  const [activeIndustries, setActiveIndustries] = useState<string[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<string[]>([]);
  const [activeOutcomes, setActiveOutcomes] = useState<string[]>([]);
  const [activeMetrics, setActiveMetrics] = useState<string[]>([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(
    COMPETITORS.map((c) => c.id),
  );
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [filterResult, setFilterResult] = useState<"win" | "tie" | "trail" | null>(null);

  const toggle = useCallback(
    (arr: string[], setArr: (next: string[]) => void, val: string) => {
      setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
    },
    [],
  );

  const visibleComps = useMemo(
    () => COMPETITORS.filter((c) => selectedCompetitors.includes(c.id)),
    [selectedCompetitors],
  );

  const baseFiltered = useMemo(
    () =>
      USE_CASES.filter((uc) => {
        if (activePersonas.length && !activePersonas.includes(uc.persona)) return false;
        if (
          activeIndustries.length &&
          !activeIndustries.some((i) => uc.industries.includes(i))
        ) {
          return false;
        }
        if (activeChallenges.length && !activeChallenges.includes(uc.challenge)) return false;
        if (
          activeOutcomes.length &&
          !activeOutcomes.includes(uc.outcomeCategory)
        ) {
          return false;
        }
        if (activeMetrics.length && !activeMetrics.includes(uc.keyMetric)) return false;
        return true;
      }),
    [activePersonas, activeIndustries, activeChallenges, activeOutcomes, activeMetrics],
  );

  const getResult = useCallback(
    (uc: UseCase): "win" | "tie" | "trail" | null => {
      if (!visibleComps.length) return null;
      const bestComp = Math.max(...visibleComps.map((c) => uc.scores[c.id]));
      if (uc.scores.wisdomai > bestComp) return "win";
      if (uc.scores.wisdomai === bestComp) return "tie";
      return "trail";
    },
    [visibleComps],
  );

  const winsCount = baseFiltered.filter((uc) => getResult(uc) === "win").length;
  const tiesCount = baseFiltered.filter((uc) => getResult(uc) === "tie").length;
  const trailsCount = baseFiltered.filter((uc) => getResult(uc) === "trail").length;

  const filtered = useMemo(() => {
    if (!filterResult) return baseFiltered;
    return baseFiltered.filter((uc) => getResult(uc) === filterResult);
  }, [baseFiltered, filterResult, getResult]);

  const personaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    USE_CASES.forEach((uc) => {
      counts[uc.persona] = (counts[uc.persona] || 0) + 1;
    });
    return counts;
  }, []);

  const challengeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    USE_CASES.forEach((uc) => {
      counts[uc.challenge] = (counts[uc.challenge] || 0) + 1;
    });
    return counts;
  }, []);

  const outcomeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    USE_CASES.forEach((uc) => {
      counts[uc.outcomeCategory] = (counts[uc.outcomeCategory] || 0) + 1;
    });
    return counts;
  }, []);

  const metricCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    USE_CASES.forEach((uc) => {
      counts[uc.keyMetric] = (counts[uc.keyMetric] || 0) + 1;
    });
    return counts;
  }, []);

  const sortedColumns = useMemo(() => {
    const allPlayers = [
      {
        id: "wisdomai" as const,
        name: "WisdomAI",
        short: "WisdomAI",
        color: "#6366f1",
        isWisdomAI: true,
      },
      ...visibleComps.map((c) => ({ ...c, isWisdomAI: false as const })),
    ];
    if (!filtered.length) return allPlayers;
    const avgScores = allPlayers.map((p) => {
      const total = filtered.reduce((sum, uc) => sum + (uc.scores[p.id] || 0), 0);
      return { ...p, avg: total / filtered.length };
    });
    avgScores.sort((a, b) => b.avg - a.avg);
    return avgScores;
  }, [visibleComps, filtered]);

  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        width: "86vw", // 7% whitespace on left and right
        margin: "0 auto",
        padding: "20px 8px",
        color: "#1e293b",
      }}
    >
      <style>
        {`@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}
      </style>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Use Case Comparison
          </h1>
          <p
            style={{
              margin: "4px 0 0",
              color: "#64748b",
              fontSize: 13,
            }}
          >
            {filtered.length} use case
            {filtered.length !== 1 ? "s" : ""} across {PERSONAS.length} personas — click
            any row to expand details
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          padding: "14px 16px",
          marginBottom: 14,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              marginRight: 8,
              display: "inline-block",
              width: 70,
            }}
          >
            Persona
          </span>
          <div
            style={{
              display: "inline-flex",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            {PERSONAS.map((p) => (
              <FilterPill
                key={p.id}
                label={p.label}
                count={personaCounts[p.id] || 0}
                active={activePersonas.includes(p.id)}
                onClick={() =>
                  toggle(activePersonas, setActivePersonas, p.id)
                }
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              marginRight: 8,
              display: "inline-block",
              width: 70,
            }}
          >
            Industry
          </span>
          <div
            style={{
              display: "inline-flex",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            {INDUSTRIES.map((i) => (
              <FilterPill
                key={i.id}
                label={i.label}
                active={activeIndustries.includes(i.id)}
                onClick={() =>
                  toggle(activeIndustries, setActiveIndustries, i.id)
                }
              />
            ))}
          </div>
        </div>

        <div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              marginRight: 8,
              display: "inline-block",
              width: 70,
            }}
          >
            Challenge
          </span>
          <div
            style={{
              display: "inline-flex",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            {CHALLENGES.map((ch) => (
              <FilterPill
                key={ch.id}
                label={ch.label}
                count={challengeCounts[ch.id] || 0}
                active={activeChallenges.includes(ch.id)}
                onClick={() =>
                  toggle(activeChallenges, setActiveChallenges, ch.id)
                }
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              marginRight: 8,
              display: "inline-block",
              width: 70,
            }}
          >
            Outcome
          </span>
          <div
            style={{
              display: "inline-flex",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            {OUTCOME_CATEGORIES.map((o) => (
              <FilterPill
                key={o.id}
                label={o.label}
                count={outcomeCounts[o.id] || 0}
                active={activeOutcomes.includes(o.id)}
                onClick={() =>
                  toggle(activeOutcomes, setActiveOutcomes, o.id)
                }
              />
            ))}
          </div>
        </div>

        <div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              marginRight: 8,
              display: "inline-block",
              width: 70,
            }}
          >
            Key Metric
          </span>
          <div
            style={{
              display: "inline-flex",
              gap: 5,
              flexWrap: "wrap",
            }}
          >
            {KEY_METRICS.map((m) => (
              <FilterPill
                key={m.id}
                label={m.label}
                count={metricCounts[m.id] || 0}
                active={activeMetrics.includes(m.id)}
                onClick={() =>
                  toggle(activeMetrics, setActiveMetrics, m.id)
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Competitors
          </span>
          <CompetitorDropdown
            selectedCompetitors={selectedCompetitors}
            setSelectedCompetitors={setSelectedCompetitors}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Show
          </span>
          {[
            {
              val: "win" as const,
              label: "Wins",
              count: winsCount,
              activeColor: "#16a34a",
              activeBg: "#dcfce7",
              activeBorder: "#16a34a",
            },
            {
              val: "tie" as const,
              label: "Ties",
              count: tiesCount,
              activeColor: "#64748b",
              activeBg: "#f1f5f9",
              activeBorder: "#94a3b8",
            },
            {
              val: "trail" as const,
              label: "Trails",
              count: trailsCount,
              activeColor: "#dc2626",
              activeBg: "#fee2e2",
              activeBorder: "#dc2626",
            },
          ].map((s) => {
            const isActive = filterResult === s.val;
            return (
              <button
                key={s.val}
                type="button"
                onClick={() =>
                  setFilterResult(isActive ? null : s.val)
                }
                style={{
                  padding: "3px 10px",
                  borderRadius: 5,
                  fontSize: 11,
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: isActive ? s.activeBorder : "#e2e8f0",
                  background: isActive ? s.activeBg : "#fff",
                  color: isActive ? s.activeColor : "#64748b",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {`${s.label} (${s.count})`}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          fontSize: 10,
          color: "#94a3b8",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 700 }}>Score:</span>
          {[5, 4, 3, 2, 1].map((s) => (
            <span
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: scoreBg(s),
                  color: scoreColor(s),
                  fontSize: 9,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {s}
              </div>
              {scoreLabel(s)}
            </span>
          ))}
        </div>
        <div>
          <span
            style={{
              color: "#16a34a",
              fontWeight: 600,
            }}
          >
            +N
          </span>{" "}
          = WisdomAI leads &nbsp;
          <span
            style={{
              color: "#dc2626",
              fontWeight: 600,
            }}
          >
            -N
          </span>{" "}
          = WisdomAI trails
        </div>
      </div>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `1fr 130px 140px 160px ${sortedColumns
              .map(() => "72px")
              .join(" ")}`,
            padding: "8px 14px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
            }}
          >
            Use Case
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Challenge
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Outcome
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Key Metric
          </div>
          {sortedColumns.map((col) => (
            <div
              key={col.id}
              style={{
                textAlign: "center",
                fontSize: 10,
                fontWeight: col.isWisdomAI ? 700 : 600,
                color: col.color,
              }}
            >
              {col.short}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              padding: 40,
              textAlign: "center",
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            No use cases match the current filters.
          </div>
        )}

        {filtered.map((uc, idx) => {
          const isExpanded = expandedRow === uc.id;
          const challengeObj = CHALLENGES.find(
            (ch) => ch.id === uc.challenge,
          );
          const outcomeObj = OUTCOME_CATEGORIES.find(
            (o) => o.id === uc.outcomeCategory,
          );
          const metricObj = KEY_METRICS.find((m) => m.id === uc.keyMetric);
          const bestComp = visibleComps.length
            ? Math.max(...visibleComps.map((c) => uc.scores[c.id]))
            : 0;
          const isWin =
            uc.scores.wisdomai > bestComp && visibleComps.length > 0;
          const isTie =
            uc.scores.wisdomai === bestComp && visibleComps.length > 0;

          return (
            <div key={uc.id}>
              <div
                onClick={() =>
                  setExpandedRow(isExpanded ? null : uc.id)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedRow(isExpanded ? null : uc.id);
                  }
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: `1fr 130px 140px 160px ${sortedColumns
                    .map(() => "72px")
                    .join(" ")}`,
                  padding: "10px 14px",
                  cursor: "pointer",
                  borderBottom: isExpanded
                    ? "none"
                    : "1px solid #f1f5f9",
                  background: isExpanded
                    ? "#fafbff"
                    : idx % 2 === 0
                      ? "#fff"
                      : "#fafafa",
                  transition: "background .12s",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: isExpanded ? "#6366f1" : "#94a3b8",
                      transition: "transform .2s",
                      transform: isExpanded ? "rotate(90deg)" : "none",
                      marginTop: 3,
                      flexShrink: 0,
                    }}
                  >
                    ▶
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#1e293b",
                        lineHeight: 1.3,
                      }}
                    >
                      {uc.title}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#92400e",
                      background: "#fef3c7",
                      padding: "2px 8px",
                      borderRadius: 8,
                      fontWeight: 500,
                    }}
                  >
                    {challengeObj?.label}
                  </span>
                </div>

                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#7c3aed",
                      background: "#ede9fe",
                      padding: "2px 8px",
                      borderRadius: 8,
                      fontWeight: 500,
                    }}
                  >
                    {outcomeObj?.label}
                  </span>
                </div>

                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontSize: 9,
                      color: "#0369a1",
                      background: "#e0f2fe",
                      padding: "2px 8px",
                      borderRadius: 8,
                      fontWeight: 500,
                    }}
                  >
                    {metricObj?.label}
                  </span>
                </div>

                {sortedColumns.map((col) => {
                  const score = uc.scores[col.id];
                  const isW = col.isWisdomAI;
                  const d = isW ? 0 : uc.scores.wisdomai - score;
                  return (
                    <div key={col.id} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: isW ? 32 : 28,
                          height: isW ? 32 : 28,
                          borderRadius: "50%",
                          background: scoreBg(score),
                          color: scoreColor(score),
                          fontWeight: isW ? 800 : 700,
                          fontSize: isW ? 14 : 12,
                          border: isW
                            ? `2px solid ${scoreColor(score)}`
                            : "none",
                        }}
                      >
                        {score}
                      </div>
                      {!isW && d !== 0 && (
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: d > 0 ? "#16a34a" : "#dc2626",
                            marginTop: 1,
                          }}
                        >
                          {d > 0 ? `+${d}` : d}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {isExpanded && (
                <UseCaseDetail
                  uc={uc}
                  selectedCompetitors={selectedCompetitors}
                  result={isWin ? "win" : isTie ? "tie" : "trail"}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

