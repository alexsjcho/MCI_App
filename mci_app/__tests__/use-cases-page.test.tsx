import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UseCasesPage from "@/app/use-cases/page";

describe("Use Cases comparison page", () => {
  it("renders a header with the Use Case Comparison title and summary text", () => {
    render(<UseCasesPage />);

    expect(
      screen.getByRole("heading", { name: /use case comparison/i }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(/use case/i)[0],
    ).toBeInTheDocument();
  });

  it("renders persona, industry, challenge, outcome, and key metric filters", () => {
    render(<UseCasesPage />);

    expect(screen.getAllByText(/persona/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/industry/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/challenge/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/outcome/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/key metric/i)[0]).toBeInTheDocument();
  });

  it("shows a competitors dropdown control", () => {
    render(<UseCasesPage />);

    expect(
      screen.getAllByText(/competitors/i)[0],
    ).toBeInTheDocument();
  });

  it("renders at least one use case row and allows expanding it for details", async () => {
    const user = userEvent.setup();
    render(<UseCasesPage />);

    const rowTitle = await screen.findByText(
      /ask follow-up questions in plain english/i,
    );

    expect(rowTitle).toBeInTheDocument();

    const row = rowTitle.closest("div");
    expect(row).not.toBeNull();
    if (!row) return;

    await user.click(row);

    expect(
      await screen.findByText(/expected outcome/i),
    ).toBeInTheDocument();
  });

  it("renders a left navigation menu for Product Marketing with Features and Use Cases entries and icons", () => {
    render(<UseCasesPage />);

    const nav = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    expect(
      within(nav).getByText(/product marketing/i),
    ).toBeInTheDocument();

    const featuresButton = within(nav).getByRole("link", {
      name: /features/i,
    });
    const useCasesButton = within(nav).getByRole("link", {
      name: /use cases/i,
    });
    const pricingButton = within(nav).getByRole("link", {
      name: /pricing/i,
    });

    expect(
      within(featuresButton).getByTestId("features-icon"),
    ).toBeInTheDocument();
    expect(
      within(useCasesButton).getByTestId("use-cases-icon"),
    ).toBeInTheDocument();
    expect(
      within(pricingButton).getByTestId("pricing-icon"),
    ).toBeInTheDocument();
  });

  it("allows collapsing and expanding the left navigation from the toggle icon", async () => {
    const user = userEvent.setup();
    render(<UseCasesPage />);

    const nav = screen.getByRole("navigation", {
      name: /primary navigation/i,
    });

    // Initially expanded, main label and items visible
    expect(within(nav).getByText(/product marketing/i)).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /features/i })).toBeInTheDocument();

    const collapseButton = screen.getByRole("button", {
      name: /collapse navigation/i,
    });
    await user.click(collapseButton);

    // When collapsed, the toggle changes label but menu item icons remain visible
    expect(
      within(nav).getByTestId("features-icon"),
    ).toBeInTheDocument();
    expect(
      within(nav).getByTestId("use-cases-icon"),
    ).toBeInTheDocument();
    expect(
      within(nav).getByTestId("pricing-icon"),
    ).toBeInTheDocument();

    // Toggle label should change to "Expand navigation"
    const expandButton = screen.getByRole("button", {
      name: /expand navigation/i,
    });
    await user.click(expandButton);

    // Content should be visible again after expanding
    expect(within(nav).getByText(/product marketing/i)).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /features/i })).toBeInTheDocument();
    expect(
      within(nav).getByRole("link", { name: /pricing/i }),
    ).toBeInTheDocument();
  });

  it("styles the left navigation to span the full viewport height", () => {
    render(<UseCasesPage />);

    const nav = screen.getByRole("navigation", {
      name: /primary navigation/i,
    }) as HTMLElement;

    expect(nav).toHaveStyle("height: 100vh");
  });

  it("shows Wins, Ties, and Trails counts inside the Show filters instead of separate metric cards", () => {
    render(<UseCasesPage />);

    const winsButton = screen.getByRole("button", { name: /wins/i });
    const tiesButton = screen.getByRole("button", { name: /ties/i });
    const trailsButton = screen.getByRole("button", { name: /trails/i });

    expect(winsButton.textContent).toMatch(/wins\s*\(\d+\)/i);
    expect(tiesButton.textContent).toMatch(/ties\s*\(\d+\)/i);
    expect(trailsButton.textContent).toMatch(/trails\s*\(\d+\)/i);
  });
});

