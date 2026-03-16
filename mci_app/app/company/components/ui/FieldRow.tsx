'use client';

import React from 'react';

interface FieldRowProps {
  label: string;
  children: React.ReactNode;
}

export default function FieldRow({ label, children }: FieldRowProps) {
  return (
    <div className="field-row">
      <div className="field-label">{label}</div>
      <div className="field-value">{children}</div>
    </div>
  );
}
