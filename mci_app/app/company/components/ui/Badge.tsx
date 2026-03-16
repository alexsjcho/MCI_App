'use client';

import React from 'react';

type BadgeVariant = 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'gray' | 'wisdom';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Badge({ variant = 'gray', children, style }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`} style={style}>
      {children}
    </span>
  );
}
