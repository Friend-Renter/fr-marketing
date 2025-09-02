"use client";

import { useState } from "react";

export default function Accordion({ items = [] }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {items.map((it, idx) => {
        const expanded = open === idx;
        return (
          <div key={idx}>
            <button
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              onClick={() => setOpen(expanded ? null : idx)}
              aria-expanded={expanded}
            >
              <span className="font-medium text-gray-900">{it.q}</span>
              <span className="text-gray-500">{expanded ? "–" : "+"}</span>
            </button>
            {expanded && <div className="px-4 pb-4 text-sm text-gray-700">{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
