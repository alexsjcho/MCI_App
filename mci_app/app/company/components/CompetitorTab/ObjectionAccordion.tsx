'use client';

import React, { useState } from 'react';

interface ObjectionAccordionProps {
  objection: string;
  response: string | null;
}

export default function ObjectionAccordion({ objection, response }: ObjectionAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="objection-accordion">
      <button
        className={`objection-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <div className="objection-trigger-icon">!</div>
        <span className="objection-trigger-text">{objection}</span>
        <span className={`objection-chevron ${open ? 'open' : ''}`}>▼</span>
      </button>
      {response && (
        <div className={`objection-response ${open ? 'open' : ''}`}>
          <div className="objection-response-label">How to respond</div>
          <div className="objection-response-body">{response}</div>
        </div>
      )}
    </div>
  );
}
