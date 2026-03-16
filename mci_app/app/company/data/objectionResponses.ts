export const objectionResponses: Record<string, string[]> = {
  databricks: [
    "Totally fair — you're already invested in Databricks for data engineering and ML. WisdomAI lives on top of your Databricks tables without moving a byte. The difference is the end-user: Genie is built for data engineers; WisdomAI is built for the VP of Sales asking 'why did revenue drop last week?' Ask yourself — how many of your business users actually open a Databricks notebook today?",
    "Free is a compelling price. But free-and-wrong is expensive. Genie's NLQ accuracy degrades sharply outside Unity Catalog governed tables. Run a side-by-side: ask the same five business questions in Genie and WisdomAI. The hallucination rate delta will make the conversation easy. WisdomAI's Enterprise Context Layer is what Genie's 'verified answers' are trying to approximate.",
    "Great — that semantic layer work is real value, and WisdomAI doesn't replace it. We sit on top of it. Your data team keeps owning governance; WisdomAI gives business users a conversational interface over what your data team already built. It's additive, not duplicative.",
  ],
  powerbi: [
    "I hear that a lot. Here's the honest answer: Power BI is a dashboard tool that added AI. WisdomAI is an AI tool that happens to surface data. The test is your VP of Marketing — can they ask 'which campaigns drove pipeline last quarter?' and get a trusted answer without a BI dev building a report first? That's the gap we close.",
    "Copilot is improving, but it's improving from a standing start on hallucination risk. It has no enterprise context layer — it's autocomplete on DAX. Ask your team how many Copilot answers they've had to fact-check. We'd love to run that benchmark together.",
    "WisdomAI is a SaaS layer, not an IT infrastructure replacement. We have pre-built connectors for your existing data sources and SSO/SAML integrations that take days, not months. Your IT team stays in control — we just give the business a front door they'll actually use.",
  ],
  sigma: [
    "Sigma is a great tool for analysts who think in spreadsheets — it's not going away. WisdomAI is for the executives and business users above them who don't want to build workbooks. We're typically deployed side-by-side: analysts use Sigma to model, executives ask WisdomAI for answers. Different personas, no conflict.",
    "Exactly right, and we respect that. The question is whether your CFO, your Head of Sales, your CEO can get answers from Sigma today — or whether they still need an analyst to build a view for them first. WisdomAI closes that last mile without touching what your finance team already built.",
  ],
  omni: [
    "If your data team is the buyer, Omni is a genuine contender. But WisdomAI is bought by the business — the CDO, the VP of Analytics, the CMO who needs answers on Monday morning. Ask who's actually requesting this purchase. If it's the business, that's our home.",
    "Omni's dbt integration is strong — we actually connect to the same semantic layer. The difference is the end-user experience: Omni is SQL-first with a no-code veneer; WisdomAI is conversational-first with hallucination protection. For non-technical users, that's the whole game.",
  ],
  hex: [
    "Completely different use cases — HEX is for data scientists building reproducible analyses; WisdomAI is for business users asking questions. They're both valuable and they don't compete. The question is whether you also need business users to get answers without filing a ticket to the data team.",
    "That framing is exactly right — HEX is an exploration tool. WisdomAI is a decision-support tool. If your data team uses HEX, your business leaders should use WisdomAI. They complement each other in the modern data stack.",
  ],
  thoughtspot: [
    "ThoughtSpot pioneered search-based analytics — respect where it's due. The shift is from search to conversation. Search requires you to know what to ask; conversational AI meets you where you are. And critically, SpotIQ auto-insights is reactive; WisdomAI's agentic layer is proactive — it surfaces what you should know before you ask.",
    "18 months of implementation is exactly the problem we solve for the next account. But for you, we're not asking you to rip it out. We can co-exist on the same data layer. What we'd like to show is how WisdomAI handles the use cases that still require a ThoughtSpot analyst to build a pinboard — the ad-hoc questions that never get answered.",
    "ThoughtSpot Everywhere is a strong embedded play. WisdomAI has an embedded tier too — but more importantly, we're talking about your internal users, not your customers' users. Different motion.",
  ],
  gooddata: [
    "GoodData is purpose-built for customer-facing embedded analytics — that's their home turf. WisdomAI is internal analytics: your business teams asking questions of your own data. These are different buyers, different use cases, and they don't compete.",
    "Completely different problem. GoodData helps you deliver analytics to your customers. WisdomAI helps your team understand your own business. If your product team needs embedded analytics, keep GoodData. Then have this conversation with your CDO about the internal side.",
  ],
  snowflake: [
    "Snowflake is your data foundation — WisdomAI has no interest in replacing it. We live on top of Snowflake Cortex and your existing tables. Intelligence is Snowflake's attempt to build an analytics layer, but it's warehouse-first, not user-first. Ask your business analysts to use Cortex Analyst for a week and report back. WisdomAI is what happens when you design for the business user, not the data engineer.",
    "That contract is a feature, not a moat. Intelligence being bundled means it gets used whether or not it delivers value. WisdomAI earns its place by actually being used — run a 30-day POC alongside Intelligence with 10 business users and measure question volume and answer accuracy.",
    "Trusted governance is a Snowflake platform strength, and we leverage it — WisdomAI reads from the same governed tables, respects the same row-level security. We don't bypass governance; we expose it conversationally.",
  ],
  wisdomai: [
    "Acknowledge the concern directly: we're earlier stage than the incumbents. Then reframe: 'That's exactly why you're talking to us and not just renewing your Power BI contract. We're purpose-built for this problem, and we move faster. Here's what our customers say after 90 days.' Lead with customer proof points and a low-risk POC offer.",
    "Yes, and we have pre-built connectors for Snowflake, BigQuery, Databricks, Redshift, and more. Walk them through the integration checklist — it's typically a 2–4 hour setup. Offer to run a technical discovery call with your solutions engineer in the next 48 hours.",
    "Copilot is autocomplete on your BI layer. WisdomAI has an Enterprise Context Layer — we understand your business metrics, your naming conventions, your KPIs. Ask them to test: run the same question in Copilot and in WisdomAI and verify the answer against your source data. The accuracy difference speaks for itself.",
  ],
};
