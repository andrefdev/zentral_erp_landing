"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/config/faq";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">Preguntas frecuentes</span>
          <h2 className="h2">Lo que la gente nos pregunta antes de empezar.</h2>
        </div>

        <div className="faq">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                  <Plus size={20} />
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
