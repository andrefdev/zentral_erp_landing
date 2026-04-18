"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type QA = { q: string; a: string };

export function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-0">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-[#E5E7EB]">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left py-5 flex justify-between items-center font-medium text-[15px]"
            >
              <span>{it.q}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300 text-[#555]"
              style={{ maxHeight: isOpen ? 400 : 0 }}
            >
              <div className="pb-5">{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
