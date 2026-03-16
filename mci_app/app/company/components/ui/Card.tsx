'use client';

import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ title, children, style }: CardProps) {
  return (
    <div className="card" style={style}>
      {title && <div className="card-title">{title}</div>}
      {children}
    </div>
  );
}
