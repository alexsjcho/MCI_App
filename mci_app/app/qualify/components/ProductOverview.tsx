"use client";

import type { Product } from "../data/products";
import Badge from "./Badge";

interface ProductOverviewProps {
  product: Product;
}

export default function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <div className="q-card product-overview">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
        <span className="product-name">{product.name}</span>
        <Badge variant="info">{product.tagline}</Badge>
      </div>
      <p className="product-desc">{product.description}</p>

      <div className="product-grid">
        <div>
          <div className="section-label">Key Capabilities</div>
          <ul className="cap-list">
            {product.keyCapabilities.map((cap, i) => (
              <li key={i}>{cap}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="section-label">Differentiators</div>
          <ul className="diff-list">
            {product.differentiators.map((diff, i) => (
              <li key={i}>{diff}</li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="product-divider" />
      <div className="section-label">Typical Customer Pain Points</div>
      <div className="pain-tags">
        {product.typicalPainPoints.map((pain, i) => (
          <span key={i} className="pain-tag">⚠ {pain}</span>
        ))}
      </div>

      <hr className="product-divider" />
      <div className="section-label">Ideal Buyer Persona</div>
      <p className="buyer-persona">{product.idealBuyer}</p>
    </div>
  );
}
