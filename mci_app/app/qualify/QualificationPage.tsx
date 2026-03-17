"use client";

import { useState, useMemo } from "react";
import Dropdown from "./components/Dropdown";
import Tabs from "./components/Tabs";
import ProductOverview from "./components/ProductOverview";
import StrategyTab from "./components/StrategyTab";
import ExampleTab from "./components/ExampleTab";
import {
  products,
  productList,
  industries,
  industryList,
  frameworkOptions,
  getFrameworkCriteria,
  getFrameworkExample,
  type ProductId,
  type IndustryId,
  type FrameworkId,
} from "./data";
import "./qualify.css";

const contentTabs = [
  { id: "strategy", label: "Strategy" },
  { id: "example", label: "Example" },
];

export default function QualificationPage() {
  const [productId, setProductId] = useState<ProductId>("conversational-bi");
  const [industryId, setIndustryId] = useState<IndustryId>("financial-services");
  const [frameworkId, setFrameworkId] = useState<FrameworkId>("spin");
  const [activeTab, setActiveTab] = useState("strategy");

  const product = products[productId];
  const industry = industries[industryId];

  const criteria = useMemo(
    () => getFrameworkCriteria(frameworkId, productId, industryId),
    [frameworkId, productId, industryId]
  );

  const example = useMemo(
    () => getFrameworkExample(frameworkId, productId, industryId),
    [frameworkId, productId, industryId]
  );

  const productOptions = productList.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.tagline,
  }));

  const industryOptions = industryList.map((ind) => ({
    id: ind.id,
    name: ind.name,
  }));

  const fwOptions = frameworkOptions.map((f) => ({
    id: f.id,
    name: f.name,
    description: f.description,
  }));

  return (
    <main className="qualify-page">
      <div className="page-header">
        <div className="page-title">Qualification Guide</div>
        <div className="page-subtitle">
          Select a product, industry, and qualification framework to get tailored strategy and examples.
        </div>
      </div>

      <div className="page-body">
        <div className="filters-row">
          <Dropdown
            label="Product"
            options={productOptions}
            value={productId}
            onChange={(id) => setProductId(id as ProductId)}
          />
          <Dropdown
            label="Industry"
            options={industryOptions}
            value={industryId}
            onChange={(id) => setIndustryId(id as IndustryId)}
          />
          <Dropdown
            label="Framework"
            options={fwOptions}
            value={frameworkId}
            onChange={(id) => setFrameworkId(id as FrameworkId)}
          />
        </div>

        <ProductOverview product={product} />

        <div className="q-card" style={{ overflow: "hidden" }}>
          <Tabs tabs={contentTabs} activeTab={activeTab} onChange={setActiveTab} />
          <div className="q-tab-body">
            {activeTab === "strategy" ? (
              <StrategyTab
                criteria={criteria}
                frameworkId={frameworkId}
                productName={product.name}
                industryName={industry.name}
              />
            ) : (
              <ExampleTab
                example={example}
                frameworkId={frameworkId}
                productName={product.name}
                industryName={industry.name}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
