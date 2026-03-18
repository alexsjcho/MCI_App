import "@testing-library/jest-dom";

// The pricing reference implementation initializes Chart.js charts in `useEffect`.
// In Jest/jsdom, `HTMLCanvasElement#getContext` is not implemented, so Chart.js
// would normally throw during tests that render those tabs.
//
// We provide a minimal mock that preserves the named exports the components
// import, while making `new Chart(...)` a no-op.
jest.mock("chart.js", () => {
  class MockChart {
    // Called by chart components to register controllers/scales once.
    static register(..._args: unknown[]) {
      // no-op
    }

    // Called by chart components to create/draw a chart.
    constructor(_canvas: unknown, _config: unknown) {
      // no-op
    }

    // Called on cleanup.
    destroy() {
      // no-op
    }
  }

  const stub = {};

  return {
    __esModule: true,
    Chart: MockChart,

    // Controllers / elements / scales used across reference charts
    BarController: stub,
    CategoryScale: stub,
    LinearScale: stub,
    BarElement: stub,
    Tooltip: stub,
    Legend: stub,
    DoughnutController: stub,
    ArcElement: stub,
    BubbleController: stub,
    PointElement: stub,
  };
});

