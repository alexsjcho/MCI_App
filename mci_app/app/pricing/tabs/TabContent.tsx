"use client";

import { usePricing } from "../context/PricingContext";
import { OverviewTab } from "./OverviewTab";
import { ValueMapTab } from "./ValueMapTab";
import { TCOTab } from "./TCOTab";
import { TiersTab } from "./TiersTab";
import { MatrixTab } from "./MatrixTab";

export function TabContent() {
  const { activeTab } = usePricing();

  switch (activeTab) {
    case "overview":
      return <OverviewTab />;
    case "valuemap":
      return <ValueMapTab />;
    case "tco":
      return <TCOTab />;
    case "tiers":
      return <TiersTab />;
    case "matrix":
      return <MatrixTab />;
    default:
      return null;
  }
}

