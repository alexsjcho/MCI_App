import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QualificationPage from "../app/qualify/QualificationPage";

describe("Qualify page - framework selection", () => {
  it("offers METTRIC in the Framework dropdown and updates the Strategy tab", async () => {
    const user = userEvent.setup();
    render(<QualificationPage />);

    // Dropdown is custom, but the selected value is rendered as the button label.
    await user.click(screen.getByRole("button", { name: /spin selling/i }));

    await user.click(screen.getByRole("button", { name: /mettric/i }));

    expect(screen.getByText(/mettric qualification strategy/i)).toBeInTheDocument();

    // Measure Outcomes is the first METTRIC criterion and should be expanded by default.
    expect(screen.getAllByText(/monetization use case/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/embedded analytics/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/b2b2c/i).length).toBeGreaterThan(0);
  });

  it("shows METTRIC Criteria Assessment in the Example tab with the Monetization Use Case scenario", async () => {
    const user = userEvent.setup();
    render(<QualificationPage />);

    await user.click(screen.getByRole("button", { name: /spin selling/i }));
    await user.click(screen.getByRole("button", { name: /mettric/i }));

    await user.click(screen.getByRole("button", { name: /^example$/i }));

    expect(
      screen.getByText(/mettric criteria assessment/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/measure outcomes/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/monetization use case/i).length).toBeGreaterThan(0);
  });
});

