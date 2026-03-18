import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompanyPage from "../app/company/page";

describe("Competitor comparison page", () => {
  it("renders a header with the Competitor Comparison title and subtitle", () => {
    render(<CompanyPage />);

    expect(
      screen.getByRole("heading", { name: /competitor comparison/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/wisdomai vs 8 competitors/i),
    ).toBeInTheDocument();
  });

  it("renders a left navigation menu for Product Marketing with Competitor, Features, and Use Cases entries and icons", () => {
    render(<CompanyPage />);

    const nav = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    expect(
      within(nav).getByText(/product marketing/i),
    ).toBeInTheDocument();

    const competitorLink = within(nav).getByRole("link", {
      name: /competitor/i,
    });
    const featuresLink = within(nav).getByRole("link", {
      name: /features/i,
    });
    const useCasesLink = within(nav).getByRole("link", {
      name: /use cases/i,
    });

    expect(within(competitorLink).getByTestId("company-icon")).toBeInTheDocument();
    expect(
      within(featuresLink).getByTestId("features-icon"),
    ).toBeInTheDocument();
    expect(
      within(useCasesLink).getByTestId("use-cases-icon"),
    ).toBeInTheDocument();
  });

  it("shows the Overview tab and overview helper text by default", () => {
    render(<CompanyPage />);

    expect(
      screen.getByRole("button", { name: /overview/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /wisdomai always shown\. click any row to open the full battlecard\./i,
      ),
    ).toBeInTheDocument();
  });

  it("switches between Overview and Competitor tabs", async () => {
    const user = userEvent.setup();
    render(<CompanyPage />);

    const competitorTab = screen.getByRole("button", {
      name: /^competitor$/i,
    });

    await user.click(competitorTab);

    expect(
      screen.getByRole("button", { name: /company profile/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        /wisdomai always shown\. click any row to open the full battlecard\./i,
      ),
    ).not.toBeInTheDocument();
  });

  it("shows quadrant map cards when Quadrant Maps tab is selected", async () => {
    const user = userEvent.setup();
    render(<CompanyPage />);

    const quadrantsTab = screen.getByRole("button", {
      name: /quadrant maps/i,
    });

    await user.click(quadrantsTab);

    expect(
      screen.getByText(/q1 — ai depth vs bi maturity/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/q2 — stack ownership vs sales motion/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/q3 — ease of use vs analytical power/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/q4 — deal overlap vs difficulty to displace/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/q5 — time-to-value vs sales complexity/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /q6 — nlq accuracy vs proactive \/ agentic insight/i,
      ),
    ).toBeInTheDocument();
  });

  it("allows selecting a competitor in the battlecard view", async () => {
    const user = userEvent.setup();
    render(<CompanyPage />);

    const competitorTab = screen.getByRole("button", {
      name: /^competitor$/i,
    });
    await user.click(competitorTab);

    // Default to WisdomAI card (competitor selector toggle shows the current selection)
    const competitorDropdownButton = screen.getByRole("button", {
      name: /wisdomai\s*▼/i,
    });
    expect(competitorDropdownButton).toBeInTheDocument();

    // Open the custom dropdown, then choose Databricks Genie
    await user.click(competitorDropdownButton);
    await user.click(screen.getByText(/databricks genie/i));

    // The toggle should update to Databricks (short name)
    expect(
      screen.getByRole("button", { name: /databricks\s*▼/i }),
    ).toBeInTheDocument();
  });
});

