"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownOption {
  id: string;
  name: string;
  description?: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (id: string) => void;
}

export default function Dropdown({ label, options, value, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.id === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="q-dropdown">
      <span className="q-dropdown-label">{label}</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="q-dropdown-btn"
      >
        <span className="q-dropdown-text">
          <span className="q-dropdown-name">{selected?.name ?? "Select..."}</span>
          {selected?.description && (
            <span className="q-dropdown-desc">{selected.description}</span>
          )}
        </span>
        <span className={`q-dropdown-chevron ${isOpen ? "open" : ""}`}>▾</span>
      </button>

      {isOpen && (
        <div className="q-dropdown-panel">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => { onChange(option.id); setIsOpen(false); }}
              className={`q-dropdown-option ${option.id === value ? "selected" : ""}`}
            >
              {option.name}
              {option.description && (
                <div className="q-dropdown-option-desc">{option.description}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
