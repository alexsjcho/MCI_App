import { render, screen, within } from "@testing-library/react";
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

    expect(screen.getByRole("tab", { name: /ideal comparison/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /real comparison/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /target release/i })).toBeInTheDocument();
  });

  it("renders comparison table with WisdomAI and competitor columns", () => {
    render(<Home />);

    const table = screen.getByRole("table", {
      name: /ai analytics comparison matrix/i,
    });

    expect(within(table).getByText("WisdomAI")).toBeInTheDocument();
    expect(within(table).getByText("Microsoft Power BI")).toBeInTheDocument();
    expect(within(table).getByText("Snowflake Intelligence")).toBeInTheDocument();
    expect(within(table).getByText("Databricks Genie")).toBeInTheDocument();
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

  it("renders Export CSV button", () => {
    render(<Home />);

    expect(
      screen.getByRole("button", { name: /export csv/i }),
    ).toBeInTheDocument();
  });
});
