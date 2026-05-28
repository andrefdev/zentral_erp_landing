"use client";

import { useState } from "react";
import { ArrowRight, Check, UserCheck } from "lucide-react";
import { solutions } from "@/config/solutions";

export function Solution() {
  const [activeId, setActiveId] = useState(solutions[0].id);

  return (
    <section className="section" id="solucion">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">La suite</span>
          <h2 className="h2 h2--lg">Una suite empresarial, 8 soluciones.</h2>
          <p className="h2-sub">
            Cada solución resuelve un área completa del negocio, con su propio comprador y propuesta de valor.
            Cómpralas por separado o como suite — entra pequeño, crece grande.
          </p>
        </div>

        <div className="sol-explorer">
          <div className="sol-list" role="tablist" aria-label="Soluciones Zentral">
            {solutions.map((s) => {
              const Icon = s.icon;
              const active = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={s.id}
                  className={`sol-item ${active ? "is-active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                >
                  <span className="sol-item-icon"><Icon size={18} /></span>
                  <span className="sol-item-text">
                    <span className="sol-item-name">{s.name} {s.highlight}</span>
                    <span className="sol-item-tag">{s.tag}</span>
                  </span>
                  <ArrowRight size={14} className="sol-item-arrow" />
                </button>
              );
            })}
          </div>

          <div className="sol-panes">
            {solutions.map((s) => {
              const Icon = s.icon;
              const active = s.id === activeId;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  role="tabpanel"
                  aria-hidden={!active}
                  className={`sol-pane ${active ? "is-active" : ""}`}
                >
                  <div className="sol-pane-head">
                    <div className="sol-pane-icon"><Icon size={24} /></div>
                    <div>
                      <div className="sol-pane-code">{s.code} · {s.submodules.length} submódulos</div>
                      <h3 className="sol-pane-name">{s.name} <em>{s.highlight}</em></h3>
                    </div>
                  </div>
                  <p className="sol-pane-tagline">{s.tagline}</p>
                  <div className="sol-pane-sub-h">Submódulos incluidos</div>
                  <ul className="sol-pane-subs">
                    {s.submodules.map((sub) => (
                      <li key={sub}><Check size={14} />{sub}</li>
                    ))}
                  </ul>
                  <span className="sol-pane-buyer">
                    <UserCheck size={14} />Comprador objetivo · {s.buyer}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
