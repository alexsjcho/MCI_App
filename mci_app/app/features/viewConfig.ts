import type { ViewMode } from "./helpers";

export const VIEW_DESCRIPTIONS: Record<ViewMode, string> = {
  ideal:
    "Ideal Comparison — Full-vision WisdomAI with all planned capabilities scored against competitors. Evaluates competitive positioning at full product maturity including GA, Beta, and Planned features.",
  real:
    "Real Comparison (GA Only) — Shows only features where WisdomAI has Readiness = GA today. Competitors are scored on their full capabilities. Brutal facts — no roadmap assumptions.",
  quarterly:
    "Target Release Comparison — Shows WisdomAI features available by end of the selected quarter (based on Expected Date). Competitor scores remain constant — only WisdomAI's inclusion scope changes per quarter.",
};

export function getViewDescription(view: ViewMode, quarter: string): string {
  if (view === "quarterly") {
    return VIEW_DESCRIPTIONS.quarterly.replace(
      "selected quarter",
      `${quarter} 2026`,
    );
  }
  return VIEW_DESCRIPTIONS[view];
}

