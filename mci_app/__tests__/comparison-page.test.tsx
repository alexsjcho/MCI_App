import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";

describe("Competitor comparison page", () => {
  it("shows header with title and subtitle", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /competitor comparison matrix/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /feature-level competitive intelligence across 8 competitors/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders nav tabs for Ideal, Real, and Target Release views", () => {
    render(<Home />);

    expect(
      screen.getByRole("tab", { name: /ideal comparison/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /real comparison/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /target release/i }),
    ).toBeInTheDocument();
  });

  it("renders comparison table with WisdomAI and competitor columns", () => {
    render(<Home />);

    const table = screen.getByRole("table", {
      name: /ai analytics comparison matrix/i,
    });

    expect(within(table).getByText("WisdomAI")).toBeInTheDocument();
    expect(
      within(table).getByText("Microsoft Power BI"),
    ).toBeInTheDocument();
    expect(
      within(table).getByText("Snowflake Intelligence"),
    ).toBeInTheDocument();
    expect(
      within(table).getByText("Databricks Genie"),
    ).toBeInTheDocument();
  });

  it("renders category rows and feature rows with score pills", () => {
    render(<Home />);

    const table = screen.getByRole("table", {
      name: /ai analytics comparison matrix/i,
    });

    expect(
      within(table).getByText("Natural Language & Conversational AI"),
    ).toBeInTheDocument();
    expect(
      within(table).getByText("Natural Language Query (NLQ)"),
    ).toBeInTheDocument();

    const scorePills = within(table).getAllByText("5");
    expect(scorePills.length).toBeGreaterThan(0);
  });

  it("renders summary bar with score cards and rank", () => {
    render(<Home />);

    const rankTexts = screen.getAllByText(/place/);
    expect(rankTexts.length).toBeGreaterThan(0);
  });

  it("renders the Feature sets and Competitors filters below the score cards", () => {
    render(<Home />);

    const rankTexts = screen.getAllByText(/place/);
    expect(rankTexts.length).toBeGreaterThan(0);

    const featureButton = screen.getByRole("button", { name: /feature sets/i });
    const competitorsButton = screen.getByRole("button", {
      name: /competitors/i,
    });

    const firstRank = rankTexts[0];

    const featureRelativePosition =
      firstRank.compareDocumentPosition(featureButton);
    const competitorsRelativePosition =
      firstRank.compareDocumentPosition(competitorsButton);

    expect(
      featureRelativePosition & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      competitorsRelativePosition & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders the score legend below the Feature sets and Competitors filters", () => {
    render(<Home />);

    const featureButton = screen.getByRole("button", { name: /feature sets/i });
    const competitorsButton = screen.getByRole("button", {
      name: /competitors/i,
    });
    const legendLabel = screen.getByText(/score legend:/i);

    const featureToLegend =
      featureButton.compareDocumentPosition(legendLabel);
    const competitorsToLegend =
      competitorsButton.compareDocumentPosition(legendLabel);

    expect(
      featureToLegend & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      competitorsToLegend & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("centers feature and competitor description text when only one competitor is visible", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Limit comparison to WisdomAI + Databricks Genie
    const competitorsButton = screen.getByRole("button", {
      name: /competitors/i,
    });
    await user.click(competitorsButton);

    const deselectAll = await screen.findByRole("button", {
      name: /deselect all/i,
    });
    await user.click(deselectAll);

    const databricksOption = await screen.findByText(/databricks genie/i);
    await user.click(databricksOption);

    // Wisdom description
    const wisdomDesc = screen.getByText(/core nlq engine/i);
    expect(wisdomDesc).toHaveStyle("text-align: center");

    // Databricks Genie description
    const genieDesc = screen.getByText(
      /genie spaces with unity catalog context/i,
    );
    expect(genieDesc).toHaveStyle("text-align: center");
  });

  it("lets descriptions use full cell width in two-company comparison", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Limit comparison to WisdomAI + Databricks Genie
    const competitorsButton = screen.getByRole("button", {
      name: /competitors/i,
    });
    await user.click(competitorsButton);

    const deselectAll = await screen.findByRole("button", {
      name: /deselect all/i,
    });
    await user.click(deselectAll);

    const databricksOption = await screen.findByText(/databricks genie/i);
    await user.click(databricksOption);

    const wisdomDesc = screen.getByText(/core nlq engine; llms write queries/i);
    const genieDesc = screen.getByText(
      /genie spaces with unity catalog context/i,
    );

    const wisdomStyle = window.getComputedStyle(wisdomDesc);
    const genieStyle = window.getComputedStyle(genieDesc);

    expect(wisdomStyle.maxWidth).toBe("none");
    expect(genieStyle.maxWidth).toBe("none");
  });

  it("treats WisdomAI beta features as 0 in Real Comparison while still including them in totals", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Switch to Real Comparison (GA view)
    const realTab = screen.getByRole("tab", { name: /real comparison/i });
    await user.click(realTab);

    // API / Embed for External Apps is a beta feature
    const betaRow = screen
      .getByText(/api \/ embed for external apps/i)
      .closest("tr");
    expect(betaRow).not.toBeNull();
    if (!betaRow) return;

    // WisdomAI score pill should show 0 (beta does not get credit in Real view)
    const betaScore = within(betaRow).getByText("0");
    expect(betaScore).toBeInTheDocument();

    // Automation & Self-Service category header should reflect 3 features (max 15)
    const categoryRow = screen
      .getByText(/automation & self-service/i)
      .closest("tr");
    expect(categoryRow).not.toBeNull();
    if (!categoryRow) return;

    const totalText = categoryRow.textContent || "";
    expect(totalText).toMatch(/\/\s*15\b/);
  });

  it("uses all features in category denominators for Real Comparison (e.g. Visualization & Dashboards = 15)", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const realTab = screen.getByRole("tab", { name: /real comparison/i });
    await user.click(realTab);

    const vizRow = screen
      .getByText(/visualization & dashboards/i)
      .closest("tr");
    expect(vizRow).not.toBeNull();
    if (!vizRow) return;

    const totalText = vizRow.textContent || "";
    expect(totalText).toMatch(/\/\s*15\b/);
  });

  it("uses all features in category denominators for Quarterly view (e.g. Visualization & Dashboards = 15) and only scores GA/Beta cells", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const quarterlyTab = screen.getByRole("tab", {
      name: /target release/i,
    });
    await user.click(quarterlyTab);

    const vizRow = screen
      .getByText(/visualization & dashboards/i)
      .closest("tr");
    expect(vizRow).not.toBeNull();
    if (!vizRow) return;

    const totalText = vizRow.textContent || "";
    expect(totalText).toMatch(/\/\s*15\b/);

    // Code-Based Analysis is Planned, so WisdomAI score should be 0 in Quarterly view
    const codeRow = screen
      .getByText(/code-based analysis \(sql\/python\/r\)/i)
      .closest("tr");
    expect(codeRow).not.toBeNull();
    if (!codeRow) return;

    const wisdomScore = within(codeRow).getAllByText("0")[0];
    expect(wisdomScore).toBeInTheDocument();
  });

  it("updates WisdomAI total per quarter in Target Release view based on GA/Beta availability", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const quarterlyTab = screen.getByRole("tab", {
      name: /target release/i,
    });
    await user.click(quarterlyTab);

    const getWisdomTotal = () => {
      const candidates = screen.getAllByText(/wisdomai/i);
      for (const el of candidates) {
        const text = el.parentElement?.textContent || "";
        const match = text.match(/(\d+)\s*\/\s*\d+/);
        if (match) {
          return Number(match[1]);
        }
      }
      throw new Error("WisdomAI total not found");
    };

    const q1Total = getWisdomTotal();

    const q4Button = screen.getByRole("button", { name: "Q4" });
    await user.click(q4Button);

    const q4Total = getWisdomTotal();

    expect(q4Total).toBeGreaterThan(q1Total);
  });

  it("shows Databricks Genie scoring 13 out of 15 in Visualization & Dashboards for Real Comparison", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const realTab = screen.getByRole("tab", { name: /real comparison/i });
    await user.click(realTab);

    const vizRow = screen
      .getByText(/visualization & dashboards/i)
      .closest("tr");
    expect(vizRow).not.toBeNull();
    if (!vizRow) return;

    const text = vizRow.textContent || "";
    expect(text).toMatch(/\b13\s*\/\s*15\b/);
  });

  it("renders the GA readiness tag above the WisdomAI score in the cell", () => {
    render(<Home />);

    const nlqRow = screen
      .getByText(/natural language query \(nlq\)/i)
      .closest("tr");
    expect(nlqRow).not.toBeNull();
    if (!nlqRow) return;

    const gaTag = within(nlqRow)
      .getAllByText("GA")
      .find((el) => el.className.includes("readiness-tag"));
    const scorePill = within(nlqRow)
      .getAllByText("5")
      .find((el) => el.className.includes("score-pill"));

    expect(gaTag).toBeDefined();
    expect(scorePill).toBeDefined();
    if (!gaTag || !scorePill) return;

    const relation = scorePill.compareDocumentPosition(gaTag);
    expect(relation & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
  });

  it("formats planned readiness labels using quarters and year", () => {
    render(<Home />);

    const row = screen
      .getByText(/code-based analysis \(sql\/python\/r\)/i)
      .closest("tr");
    expect(row).not.toBeNull();
    if (!row) return;

    const plannedTag = within(row).getByText(/planned:\s*q3 2026/i);
    expect(plannedTag).toBeInTheDocument();
  });

  it("only mutes WisdomAI and unsupported competitor cells for planned features in non-ideal views", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Switch to Real Comparison (GA-only) so planned features are not included
    const realTab = screen.getByRole("tab", { name: /real comparison/i });
    await user.click(realTab);

    const row = screen
      .getByText(/code-based analysis \(sql\/python\/r\)/i)
      .closest("tr");
    expect(row).not.toBeNull();
    if (!row) return;

    // WisdomAI readiness tag should be muted
    const plannedTag = within(row).getByText(/planned:\s*q3 2026/i);
    const wisdomCell = plannedTag.closest("td");
    expect(wisdomCell).not.toBeNull();
    if (!wisdomCell) return;
    expect(wisdomCell.className).toMatch(/planned-muted/);

    // Databricks Genie supports this feature and should not be muted
    const genieDesc = within(row).getByText(
      /full notebook: sql, python, r, scala/i,
    );
    const genieCell = genieDesc.closest("td");
    expect(genieCell).not.toBeNull();
    if (!genieCell) return;
    expect(genieCell.className).not.toMatch(/planned-muted/);
  });

  it("shows tier info tooltips next to T1, T2, and T3 buttons and removes header tier badges", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Header tier chips above the title should be removed
    expect(
      screen.queryByText(/tier 1 · direct threats/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/tier 2 · adjacent players/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/tier 3 · emerging \/ niche/i),
    ).not.toBeInTheDocument();

    // Hovering the tier info icons should reveal their descriptions
    const t1Info = screen.getByLabelText(/tier 1 - direct threats/i);
    await user.hover(t1Info);
    expect(
      await screen.findByText(/tier 1 - direct threats/i),
    ).toBeInTheDocument();

    const t2Info = screen.getByLabelText(/tier 2 - adjacent players/i);
    await user.hover(t2Info);
    expect(
      await screen.findByText(/tier 2 - adjacent players/i),
    ).toBeInTheDocument();

    const t3Info = screen.getByLabelText(/tier 3 - emerging/i);
    await user.hover(t3Info);
    expect(
      await screen.findByText(/tier 3 - emerging/i),
    ).toBeInTheDocument();
  });

  it("renders a left navigation menu with Diff Comparison marked as the current entry", () => {
    render(<Home />);

    const nav = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    const diffItem = within(nav).getByText(/diff comparison/i);
    expect(diffItem).toBeInTheDocument();
  });

  it("shows view descriptions in tab info tooltips and removes inline description text", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // The inline description text under the tabs should be removed
    expect(
      screen.queryByText(/full-vision wisdomai with all planned capabilities/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/real comparison \(ga only\)/i),
    ).not.toBeInTheDocument();

    // Ideal Comparison info icon shows its description on hover
    const idealInfo = screen.getByLabelText(/ideal comparison info/i);
    await user.hover(idealInfo);
    expect(
      await screen.findByText(/full-vision wisdomai with all planned capabilities/i),
    ).toBeInTheDocument();

    // Real Comparison info icon shows its description on hover
    const realInfo = screen.getByLabelText(/real comparison info/i);
    await user.hover(realInfo);
    expect(
      await screen.findByText(/shows only features where wisdomai has readiness = ga today/i),
    ).toBeInTheDocument();

    // Target Release info icon shows its description on hover (with selected quarter)
    const targetInfo = screen.getByLabelText(/target release info/i);
    await user.hover(targetInfo);
    expect(
      await screen.findByText(/shows wisdomai features available by end of the selected quarter/i),
    ).toBeInTheDocument();
  });

  it("allows filtering visible feature categories via the Feature sets dropdown", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Feature sets dropdown should be present
    const featureButton = screen.getByRole("button", { name: /feature sets/i });
    expect(featureButton).toBeInTheDocument();

    // Open menu and deselect a known category
    await user.click(featureButton);
    const categoryOption = await screen.findByText(
      /natural language & conversational ai/i,
    );
    await user.click(categoryOption);

    // That category header should no longer appear in the table
    expect(
      screen.queryByText(/natural language & conversational ai/i),
    ).not.toBeInTheDocument();
  });

  it("recalculates summary scores when feature sets change", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const getWisdomTotal = () => {
      const candidates = screen.getAllByText(/wisdomai/i);
      for (const el of candidates) {
        const text = el.parentElement?.textContent || "";
        const match = text.match(/(\d+)\s*\/\s*\d+/);
        if (match) {
          return Number(match[1]);
        }
      }
      throw new Error("WisdomAI total not found");
    };

    const before = getWisdomTotal();

    const featureButton = screen.getByRole("button", { name: /feature sets/i });
    await user.click(featureButton);
    const categoryOption = await screen.findByText(
      /natural language & conversational ai/i,
    );
    await user.click(categoryOption);

    const after = getWisdomTotal();
    expect(after).toBeLessThan(before);

    // Re-select the category and ensure the score returns to the original value
    await user.click(categoryOption);
    const back = getWisdomTotal();
    expect(back).toBe(before);
  });

  it("renders category percentage scores with a gradient class for styling", () => {
    render(<Home />);

    const cell = screen.getByText(/natural language & conversational ai/i)
      .closest("tr");
    expect(cell).not.toBeNull();

    if (!cell) return;

    const percentSpans = within(cell).getAllByText(/%/i);
    expect(percentSpans.length).toBeGreaterThan(0);
    expect(percentSpans[0].className).toMatch(/pct-gradient-text/);
  });

  it("shows feature category descriptions in info tooltips instead of inline text", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Category row header should still be visible
    expect(
      screen.getByText(/natural language & conversational ai/i),
    ).toBeInTheDocument();

    // The inline description text should not be rendered directly in the table
    expect(
      screen.queryByText(
        /nlq, multi-turn conversation, and agentic capabilities/i,
      ),
    ).not.toBeInTheDocument();

    // Hover the info icon next to the category name to reveal the description
    const infoIcon = screen.getByLabelText(
      /more details about natural language & conversational ai/i,
    );
    await user.hover(infoIcon);

    expect(
      await screen.findByText(
        /nlq, multi-turn conversation, and agentic capabilities/i,
      ),
    ).toBeInTheDocument();
  });

  it("provides a toggle to collapse and expand all feature categories from the header", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // A known feature row should be visible initially
    expect(
      screen.getByText(/natural language query \(nlq\)/i),
    ).toBeInTheDocument();

    const toggleButton = screen.getByLabelText(
      /collapse all feature categories/i,
    );

    await user.click(toggleButton);

    // Feature rows should be hidden when all categories are collapsed
    expect(
      screen.queryByText(/natural language query \(nlq\)/i),
    ).not.toBeInTheDocument();

    // Clicking again should expand all categories and show the feature row again
    await user.click(toggleButton);
    expect(
      await screen.findByText(/natural language query \(nlq\)/i),
    ).toBeInTheDocument();
  });

  it("filters competitors by tier inside the Competitors dropdown", async () => {
    const user = userEvent.setup();
    render(<Home />);

    // Open competitors menu
    const competitorsButton = screen.getByRole("button", {
      name: /competitors/i,
    });
    await user.click(competitorsButton);

    // Tier 1 filter should be present and work
    const t1Button = await screen.findByRole("button", { name: /t1/i });
    await user.click(t1Button);

    // After choosing T1, only tier 1 competitors should remain visible in the menu list
    expect(
      screen.getByText("Microsoft Power BI"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Sigma Computing"),
    ).not.toBeInTheDocument();
  });
});
