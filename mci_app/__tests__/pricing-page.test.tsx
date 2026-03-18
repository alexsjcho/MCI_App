import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PricingPage from "@/app/pricing/page";

describe("Pricing comparison page", () => {
  it("renders the Pricing Comparison header and default Overview tab", () => {
    render(<PricingPage />);

    expect(screen.getByText(/pricing comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/ai data analytics market/i)).toBeInTheDocument();

    // Default tab panel (reference uses OverviewTab by default)
    expect(screen.getByText(/market landscape/i)).toBeInTheDocument();
    expect(
      screen.getByText(/snapshot of pricing, positioning, and competitive intensity/i),
    ).toBeInTheDocument();
  });

  it("renders the competitor selector trigger and switches tabs", async () => {
    const user = userEvent.setup();
    render(<PricingPage />);

    // Reference default selection is "WisdomAI + all 8 competitors"
    expect(screen.getByRole("button", { name: /all 8 selected/i })).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /tco breakdown/i }),
    );

    expect(
      screen.getByRole("heading", { name: /tco breakdown/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/3-year tco comparison/i)).toBeInTheDocument();
  });

  it("updates the competitor selector count when deselecting a competitor", async () => {
    const user = userEvent.setup();
    render(<PricingPage />);

    expect(screen.getByRole("button", { name: /all 8 selected/i })).toBeInTheDocument();

    // Open dropdown and toggle Snowflake Intelligence off
    await user.click(screen.getByRole("button", { name: /all 8 selected/i }));
    const options = within(screen.getByTestId("competitor-dropdown-options"));
    await user.click(options.getByText(/snowflake intelligence/i));

    // WisdomAI stays selected; non-wisdom count decreases from 8 -> 7.
    expect(
      screen.getByRole("button", { name: /7 competitors selected/i }),
    ).toBeInTheDocument();
  });

  it("filters competitor dropdown options by T1/T2/T3 tier buttons", async () => {
    const user = userEvent.setup();
    render(<PricingPage />);

    await user.click(screen.getByRole("button", { name: /all 8 selected/i }));

    // Regression: React warns when a state update happens during render.
    // Clicking a tier filter should never trigger that warning.
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Tier 1 includes Snowflake Intelligence and ThoughtSpot.
    const t1Button = screen.getByRole("button", { name: /^t1$/i });
    await user.click(t1Button);

    const hadSetStateInRenderWarning = errorSpy.mock.calls.some((call) => {
      const firstArg = call[0];
      return typeof firstArg === "string" && firstArg.includes("Cannot update a component");
    });
    expect(hadSetStateInRenderWarning).toBe(false);
    errorSpy.mockRestore();

    const options = within(screen.getByTestId("competitor-dropdown-options"));
    expect(options.getByText(/snowflake intelligence/i)).toBeInTheDocument();
    expect(options.queryByText(/gooddata/i)).not.toBeInTheDocument();
    // And the selected competitor set driving tabs should update too.
    expect(screen.queryByText(/gooddata/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/snowflake intelligence/i).length).toBeGreaterThan(0);

    // Trigger text should reflect the selected tier (4 Tier 1 competitors).
    expect(screen.getByRole("button", { name: /4 competitors selected/i })).toBeInTheDocument();

    // Clicking T1 again should return to "All".
    await user.click(screen.getByRole("button", { name: /^t1$/i }));
    expect(options.getByText(/gooddata/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /all 8 selected/i })).toBeInTheDocument();
  });

  it("renders the left Product Marketing navigation with a Pricing entry", () => {
    render(<PricingPage />);

    const nav = screen.getByRole("navigation", { name: /primary navigation/i });
    const pricingLink = screen.getByRole("link", { name: /pricing/i });

    expect(nav).toBeInTheDocument();
    expect(pricingLink).toBeInTheDocument();
    expect(
      // nav uses icons when collapsed; test id exists regardless
      // eslint-disable-next-line testing-library/no-node-access
      pricingLink.querySelector('[data-testid="pricing-icon"]'),
    ).toBeTruthy();
  });

  it("places highlight cards under Market Landscape before competitor cards", () => {
    render(<PricingPage />);

    const highlight = screen.getByText(/key positioning opportunity/i);
    const competitor = screen.getByText(/snowflake intelligence/i);

    const relation = (highlight as HTMLElement).compareDocumentPosition(
      competitor as HTMLElement,
    );
    expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("renders TierValueChart under Tier Analysis before tier blocks", async () => {
    const user = userEvent.setup();
    render(<PricingPage />);

    // Switch to Tier Analysis tab.
    const tierAnalysisTab = screen.getByRole("button", { name: /tier analysis/i });
    await user.click(tierAnalysisTab);

    const chartTitle = await screen.findByText(/value score vs\. deploy ease/i);
    const tierBlock = screen.getByText(/snowflake intelligence/i);

    const relation = (chartTitle as HTMLElement).compareDocumentPosition(tierBlock as HTMLElement);
    expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("places the Feature Matrix legend under the category filter before the matrix table", async () => {
    const user = userEvent.setup();
    render(<PricingPage />);

    const matrixTab = screen.getByRole("button", { name: /feature matrix/i });
    await user.click(matrixTab);

    const legendItem = await screen.findByText(/full support/i);
    const featureHeader = await screen.findByRole("columnheader", { name: /^feature$/i });

    const relation = (legendItem as HTMLElement).compareDocumentPosition(
      featureHeader as HTMLElement,
    );
    expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("places the WisdomAI implementation advantage highlight under TCO Breakdown before the summary bar", async () => {
    const user = userEvent.setup();
    render(<PricingPage />);

    const tcoTab = screen.getByRole("button", { name: /tco breakdown/i });
    await user.click(tcoTab);

    const highlight = await screen.findByText(/wisdomai implementation advantage/i);
    const summaryLabel = await screen.findByText(/wisdomai 3-yr tco/i);

    const relation = (highlight as HTMLElement).compareDocumentPosition(
      summaryLabel as HTMLElement,
    );
    expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

