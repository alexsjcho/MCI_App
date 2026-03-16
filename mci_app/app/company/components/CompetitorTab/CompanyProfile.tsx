'use client';

import React from 'react';
import { Competitor } from '../../data/competitors';
import Card from '../ui/Card';
import FieldRow from '../ui/FieldRow';
import Badge from '../ui/Badge';

interface CompanyProfileProps {
  competitor: Competitor;
}

export default function CompanyProfile({ competitor: c }: CompanyProfileProps) {
  return (
    <div>
      <div className="grid-2">
        <Card title="Size & Stage">
          <FieldRow label="Stage">{c.profile.stage}</FieldRow>
          <FieldRow label="Headcount">{c.profile.headcount}</FieldRow>
          <FieldRow label="ARR / Revenue">{c.profile.arr}</FieldRow>
        </Card>
        <Card title="Target Market">
          <FieldRow label="ICP Roles">{c.profile.ics}</FieldRow>
          <FieldRow label="Verticals">{c.profile.verticals}</FieldRow>
          <FieldRow label="Company Size">{c.profile.targetMarket}</FieldRow>
        </Card>
      </div>
      <div className="grid-2">
        <Card title="Core Offering">
          <FieldRow label="Product">{c.profile.coreOffering}</FieldRow>
          <FieldRow label="Delivery">{c.profile.delivery}</FieldRow>
        </Card>
        <Card title="Business Model">
          <FieldRow label="Pricing">{c.profile.businessModel}</FieldRow>
          <FieldRow label="Sales Motion">
            {c.salesMotion.map((m, i) => (
              <Badge key={i} variant="blue">{m}</Badge>
            ))}
          </FieldRow>
        </Card>
      </div>
    </div>
  );
}
