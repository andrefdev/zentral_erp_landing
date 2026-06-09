"use client";

import { useState } from "react";
import { ArrowRight, Check, Users, Wallet, Package, ShoppingCart, Wrench, Folder, BarChart3, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Users, Wallet, Package, ShoppingCart, Wrench, Folder, BarChart3, ShieldCheck];

type Item = {
  id: string;
  code: string;
  highlight: string;
  tag: string;
  tagline: string;
  submodules: string[];
  buyer: string;
};

export function Solution() {
  const t = useTranslations("landing.solution");
  const items = t.raw("items") as Item[];
  const [activeId, setActiveId] = useState(items[0].id);

  return (
    <section className="section" id="solucion">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">{t("eyebrow")}</span>
          <h2 className="h2 h2--lg">{t("title")}</h2>
          <p className="h2-sub">{t("subtitle")}</p>
        </div>

        <div className="sol-explorer">
          <div className="sol-list" role="tablist" aria-label={t("listAria")}>
            {items.map((s, i) => {
              const Icon = ICONS[i] ?? Users;
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
                    <span className="sol-item-name">Zentral {s.highlight}</span>
                    <span className="sol-item-tag">{s.tag}</span>
                  </span>
                  <ArrowRight size={14} className="sol-item-arrow" />
                </button>
              );
            })}
          </div>

          <div className="sol-panes">
            {items.map((s, i) => {
              const Icon = ICONS[i] ?? Users;
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
                      <div className="sol-pane-code">{s.code} · {s.submodules.length} {t("submodulesSuffix")}</div>
                      <h3 className="sol-pane-name">Zentral <em>{s.highlight}</em></h3>
                    </div>
                  </div>
                  <p className="sol-pane-tagline">{s.tagline}</p>
                  <div className="sol-pane-sub-h">{t("submodulesLabel")}</div>
                  <ul className="sol-pane-subs">
                    {s.submodules.map((sub) => (
                      <li key={sub}><Check size={14} />{sub}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
