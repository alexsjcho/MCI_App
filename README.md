# MCI_App

## How to run the app

The primary app is a Next.js app in the `mci_app` directory.

1. **Install dependencies**

   ```bash
   cd mci_app
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Other commands**

   - **Build for production:** `npm run build`
   - **Start production server:** `npm start` (run after `npm run build`)
   - **Run tests:** `npm test`
   - **Lint:** `npm run lint`

## Competitor Comparison Matrix — Business Logic

The Competitor Comparison Matrix visualizes feature-level parity between WisdomAI and a fixed set of competitors.

### Views & inclusion logic

- **Ideal Comparison**
  - Uses the feature's authored score (`wisdom.score`).
  - All WisdomAI features are included regardless of readiness.
- **Real Comparison (GA view)**
  - Only features where `readiness = GA` are included.
  - GA features use their base score; Beta/Planned features count as 0.
- **Target Release (Quarterly view)**
  - Includes only GA or Beta features whose `expectedDate` is on or before the selected quarter end.
  - Those features use their base score; everything else is treated as 0.

### Scoring model

- Each feature has a WisdomAI score from **0–5**.
- Per category and per competitor totals are sums of feature scores:
  - **WisdomAI category total**: sum of `getWisdomScore(feature, view, quarter)` for all included features in that category.
  - **Competitor category total**: sum of the competitor's 0–5 scores for all included features in that category.
- **Overall totals** (summary cards at the top):
  - WisdomAI and each competitor's total is the sum of their category totals, restricted to the currently visible feature categories.
  - `maxPossible` is computed as `5 * number_of_included_features`, so the summary shows `total / max` and a percentage.

### Score legend & pill colors

Individual 0–5 scores use a discrete color scale (`--score-1` … `--score-5`):

- **5 — Strong**: `#22C55E`
- **4 — Good**: `#166534`
- **3 — Moderate**: `#FBBF24`
- **2 — Weak**: `#F97316`
- **1 — Minimal**: `#EF4444`

### Percentage bar color logic

Category percentage badges (e.g. `15 / 20 · 75%`) use a banded color function based on the total percentage:

- **1–20%**: Red `#EF4444`
- **21–40%**: Red‑Orange `#F15A24`
- **41–60%**: Orange `#F97316`
- **61–70%**: Yellow‑Orange `#FBBF24`
- **71–80%**: Interpolated between Blue `#3B82F6` and Dark Green `#166534`
- **81–90%**: Dark Green `#166534`
- **91–100%**: Light Green `#4ADE80`

### Tiering & filters

- Each competitor is assigned a **tier** (`Tier 1`, `Tier 2`, `Tier 3`).
- **Tier filters** (T1, T2, T3) drive which competitors are visible:
  - Selecting T1, T2, or T3 in the Competitors menu auto-selects all competitors in that tier and hides others.
  - Toggling the active tier off returns to the "all tiers" state.
- **Feature sets filter** allows hiding entire feature categories; this also recalculates summary scores and percentages based only on the visible categories.

