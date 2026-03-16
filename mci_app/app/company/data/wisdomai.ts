import { Competitor } from './competitors';

export const wisdomAI: Competitor = {
  id: 'wisdomai', name: 'WisdomAI', shortName: 'WisdomAI',
  tagline: 'The AI-native analytics platform — accurate answers, no hallucinations',
  color: '#6D28D9', bg: 'rgba(109,40,217,0.08)', threatLevel: null,
  threatLabel: null, emoji: 'WA',
  profile: {
    stage: 'Growth-stage, Series B (est.)', headcount: '~50–100 employees',
    arr: 'Est. early ARR / scaling', targetMarket: 'Enterprise data & business teams',
    ics: 'CDOs, VPs of Analytics, Business Analysts, Data Engineers',
    verticals: 'FS, Healthcare, Retail, SaaS, Tech',
    coreOffering: 'Conversational AI analytics with Enterprise Context Layer and anti-hallucination architecture.',
    delivery: 'Cloud SaaS — connects to existing data stacks (Snowflake, BigQuery, Databricks, etc.)',
    businessModel: 'Annual SaaS license; platform + per-seat tiers',
  },
  positioning: {
    tagline: '"Accurate answers from your data — guaranteed"',
    headline: 'Ask any data question. Get a trusted answer.',
    differentiators: [
      'Enterprise Context Layer — semantic understanding of your business',
      'Anti-hallucination architecture — verified answers only',
      'Works on your existing data stack — no migration required',
      'Conversational AI built for business users, not engineers',
    ],
    tone: 'Confident, enterprise-safe, accuracy-first, non-technical buyer-friendly',
    analystPerception: 'Emerging AI-native analytics vendor; positioned as the accuracy-first alternative to Copilot/Sage/Genie',
  },
  strengths: [
    'Best-in-class NLQ accuracy — Enterprise Context Layer prevents hallucinations',
    'Non-disruptive — plugs into existing warehouse, no data movement',
    'Fastest time-to-value for business users vs any competing tool',
    'Agentic analytics layer — can trigger actions, not just answer questions',
    'Purpose-built for enterprise governance and compliance',
  ],
  weaknesses: [
    'Brand awareness lags ThoughtSpot, Power BI in large enterprises',
    'Earlier stage — smaller customer base for proof points',
    'BI surface area lighter than legacy platforms (by design)',
    'Partner/channel ecosystem still being built',
  ],
  winConditions: [
    'Business buyer (VP/Director) is the champion — not IT',
    'Customer has been burned by hallucinations from Copilot/Genie/Sage',
    'Org wants AI analytics without ripping out their warehouse',
    'Deal is with a data-savvy but non-technical executive team',
  ],
  loseConditions: [
    'IT controls budget and is deeply committed to Microsoft stack',
    'Customer is Databricks all-in and wants bundled Genie',
    'Finance team wants spreadsheet-style exploration (Sigma territory)',
  ],
  objections: [
    'We haven\'t heard of WisdomAI — how long have you been around?',
    'Can you integrate with our existing Snowflake/Databricks setup?',
    'How is this different from what Copilot already does?',
  ],
  salesMotion: ['Top-down enterprise', 'CDO / VP Analytics champion', 'POC-led land and expand'],
};
