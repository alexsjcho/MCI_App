export interface QuadrantPoint {
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  isWisdom?: boolean;
}

export interface QuadrantConfig {
  id: string;
  xLabel: string;
  yLabel: string;
  quadrantLabels: string[];
  points: QuadrantPoint[];
}

export const quadrantConfigs: Record<string, QuadrantConfig> = {
  q1: {
    id: 'q1chart', xLabel: 'BI Maturity →', yLabel: 'AI Depth →',
    quadrantLabels: ['AI-first, BI light', 'AI-first + full BI ← ideal', 'Legacy BI, low AI', 'BI mature, AI catching up'],
    points: [
      { label: 'WisdomAI', x: 38, y: 75, r: 9, color: '#6D28D9', isWisdom: true },
      { label: 'Databricks', x: 22, y: 62, r: 12, color: '#c0392b' },
      { label: 'HEX', x: 18, y: 42, r: 7, color: '#534AB7' },
      { label: 'ThoughtSpot', x: 62, y: 68, r: 10, color: '#b7660d' },
      { label: 'Snowflake Intel.', x: 78, y: 80, r: 11, color: '#888' },
      { label: 'Power BI', x: 82, y: 32, r: 14, color: '#f2a900' },
      { label: 'Sigma', x: 70, y: 28, r: 8, color: '#1a4a7a' },
      { label: 'Omni', x: 58, y: 26, r: 6, color: '#0f6e56' },
      { label: 'GoodData', x: 52, y: 18, r: 7, color: '#444' },
    ]
  },
  q2: {
    id: 'q2chart', xLabel: 'Stack Ownership →', yLabel: 'Enterprise Sales Motion →',
    quadrantLabels: ['Connector, enterprise', 'Platform owner, enterprise ← win zone', 'Connector, PLG', 'Platform owner, PLG'],
    points: [
      { label: 'WisdomAI', x: 28, y: 78, r: 9, color: '#6D28D9', isWisdom: true },
      { label: 'Databricks', x: 72, y: 68, r: 12, color: '#c0392b' },
      { label: 'Power BI', x: 42, y: 72, r: 14, color: '#f2a900' },
      { label: 'ThoughtSpot', x: 28, y: 62, r: 10, color: '#b7660d' },
      { label: 'Snowflake Intel.', x: 82, y: 78, r: 11, color: '#888' },
      { label: 'Sigma', x: 68, y: 32, r: 8, color: '#1a4a7a' },
      { label: 'Omni', x: 38, y: 28, r: 6, color: '#0f6e56' },
      { label: 'HEX', x: 18, y: 22, r: 7, color: '#534AB7' },
      { label: 'GoodData', x: 48, y: 20, r: 7, color: '#444' },
    ]
  },
  q3: {
    id: 'q3chart', xLabel: 'Ease of Use →', yLabel: 'Analytical Power →',
    quadrantLabels: ['Powerful but complex', 'Powerful + easy ← win zone', 'Limited + complex', 'Easy but limited'],
    points: [
      { label: 'WisdomAI', x: 82, y: 82, r: 9, color: '#6D28D9', isWisdom: true },
      { label: 'Databricks', x: 22, y: 85, r: 18, color: '#c0392b' },
      { label: 'HEX', x: 30, y: 55, r: 8, color: '#534AB7' },
      { label: 'ThoughtSpot', x: 65, y: 70, r: 12, color: '#b7660d' },
      { label: 'Snowflake Intel.', x: 62, y: 78, r: 14, color: '#888' },
      { label: 'Power BI', x: 72, y: 68, r: 18, color: '#f2a900' },
      { label: 'Sigma', x: 78, y: 42, r: 9, color: '#1a4a7a' },
      { label: 'Omni', x: 60, y: 38, r: 7, color: '#0f6e56' },
      { label: 'GoodData', x: 62, y: 22, r: 7, color: '#444' },
    ]
  },
  q4: {
    id: 'q4chart', xLabel: 'Deal Overlap Frequency →', yLabel: 'Difficulty to Displace →',
    quadrantLabels: ['Rare + hard — monitor', 'Frequent + hard — full battlecard', 'Rare + easy — deprioritize', 'Common + beatable — light battlecard'],
    points: [
      { label: 'Snowflake Intel.', x: 82, y: 88, r: 11, color: '#c0392b' },
      { label: 'Databricks', x: 68, y: 78, r: 12, color: '#e05540' },
      { label: 'ThoughtSpot', x: 65, y: 65, r: 10, color: '#b7660d' },
      { label: 'Power BI', x: 88, y: 68, r: 14, color: '#f2a900' },
      { label: 'Sigma', x: 75, y: 35, r: 8, color: '#1a4a7a' },
      { label: 'Omni', x: 62, y: 28, r: 6, color: '#0f6e56' },
      { label: 'HEX', x: 28, y: 32, r: 7, color: '#534AB7' },
      { label: 'GoodData', x: 15, y: 22, r: 7, color: '#444' },
    ]
  },
  q5: {
    id: 'q5chart', xLabel: 'Fast time-to-value (days) →', yLabel: 'Complex buy (long cycle) →',
    quadrantLabels: ['Slow value, hard to buy — danger zone', 'Fast value, hard buy — prove it first', 'Slow value, easy buy', 'Fast value + simple buy ← ideal'],
    points: [
      { label: 'WisdomAI', x: 78, y: 32, r: 10, color: '#6D28D9', isWisdom: true },
      { label: 'Databricks', x: 18, y: 82, r: 14, color: '#c0392b' },
      { label: 'Snowflake Intel.', x: 28, y: 75, r: 12, color: '#29b5e8' },
      { label: 'ThoughtSpot', x: 42, y: 72, r: 10, color: '#b7660d' },
      { label: 'Power BI', x: 72, y: 62, r: 15, color: '#f2a900' },
      { label: 'HEX', x: 78, y: 22, r: 8, color: '#534AB7' },
      { label: 'Sigma', x: 82, y: 28, r: 9, color: '#1a4a7a' },
      { label: 'Omni', x: 85, y: 24, r: 7, color: '#0f6e56' },
      { label: 'GoodData', x: 52, y: 28, r: 8, color: '#444' },
    ]
  },
  q6: {
    id: 'q6chart', xLabel: 'Trusted NLQ →', yLabel: 'Proactive / agentic alerting →',
    quadrantLabels: ['Agentic but untrustworthy', "Trusted + proactive ← WisdomAI's claim", 'Static + unreliable', 'Trusted but reactive'],
    points: [
      { label: 'WisdomAI', x: 88, y: 82, r: 10, color: '#6D28D9', isWisdom: true },
      { label: 'Databricks', x: 58, y: 68, r: 12, color: '#c0392b' },
      { label: 'Snowflake Intel.', x: 72, y: 60, r: 12, color: '#29b5e8' },
      { label: 'ThoughtSpot', x: 68, y: 48, r: 10, color: '#b7660d' },
      { label: 'Power BI', x: 60, y: 22, r: 14, color: '#f2a900' },
      { label: 'HEX', x: 28, y: 28, r: 7, color: '#534AB7' },
      { label: 'Sigma', x: 62, y: 18, r: 8, color: '#1a4a7a' },
      { label: 'Omni', x: 66, y: 22, r: 6, color: '#0f6e56' },
      { label: 'GoodData', x: 55, y: 15, r: 7, color: '#444' },
    ]
  }
};
