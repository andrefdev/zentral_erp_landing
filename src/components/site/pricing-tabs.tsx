"use client";

import { useState } from "react";
import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  unit?: string;
  users: string;
  features: { label: string; included: boolean }[];
  cta: string;
  highlight?: boolean;
  href: string;
};

const SUITE: Plan[] = [
  {
    name: "Starter Suite",
    price: "$79",
    unit: "/mes",
    users: "3 usuarios",
    features: [
      { label: "ERP básico", included: true },
      { label: "CRM básico", included: true },
      { label: "Captura limitada", included: true },
      { label: "IA dual", included: false },
      { label: "Playbook", included: false },
    ],
    cta: "Empezar",
    href: "#",
  },
  {
    name: "Professional Suite",
    price: "$199",
    unit: "/mes",
    users: "10 usuarios",
    features: [
      { label: "ERP completo (8 módulos)", included: true },
      { label: "CRM completo (15 módulos)", included: true },
      { label: "Captura de 5 redes", included: true },
      { label: "IA dual + Playbook", included: true },
      { label: "Onboarding prioritario", included: true },
    ],
    cta: "Empezar free trial",
    highlight: true,
    href: "#",
  },
  {
    name: "Enterprise Suite",
    price: "A medida",
    users: "25+ usuarios",
    features: [
      { label: "Todo en Professional", included: true },
      { label: "SSO + SAML", included: true },
      { label: "API premium + SLA", included: true },
      { label: "Soporte 24/7 dedicado", included: true },
      { label: "Customización sin límite", included: true },
    ],
    cta: "Contactar ventas",
    href: "#",
  },
];

const ERP: Plan[] = [
  {
    name: "ERP Starter",
    price: "$49",
    unit: "/mes",
    users: "3 usuarios",
    features: [
      { label: "People, Work, Docs", included: true },
      { label: "Drive 50GB", included: true },
      { label: "Stock básico", included: true },
      { label: "Finance + SUNAT", included: false },
      { label: "IA operativa", included: false },
    ],
    cta: "Empezar",
    href: "#",
  },
  {
    name: "ERP Pro",
    price: "$129",
    unit: "/mes",
    users: "10 usuarios",
    features: [
      { label: "8 módulos completos", included: true },
      { label: "Drive 1TB", included: true },
      { label: "Finance + SUNAT nativa", included: true },
      { label: "Zentral Pay recurrentes", included: true },
      { label: "IA operativa", included: true },
    ],
    cta: "Empezar free trial",
    highlight: true,
    href: "#",
  },
  {
    name: "ERP Enterprise",
    price: "A medida",
    users: "25+ usuarios",
    features: [
      { label: "Todo en Pro", included: true },
      { label: "Multi-empresa", included: true },
      { label: "API + webhooks premium", included: true },
      { label: "SLA 99.99%", included: true },
      { label: "Onboarding white-glove", included: true },
    ],
    cta: "Contactar ventas",
    href: "#",
  },
];

const CRM: Plan[] = [
  {
    name: "CRM Starter",
    price: "$39",
    unit: "/mes",
    users: "3 usuarios",
    features: [
      { label: "Pipeline 3 fases", included: true },
      { label: "Captura WhatsApp", included: true },
      { label: "1,000 contactos", included: true },
      { label: "Outreach email", included: false },
      { label: "IA conversacional", included: false },
    ],
    cta: "Empezar",
    href: "#",
  },
  {
    name: "CRM Pro",
    price: "$99",
    unit: "/mes",
    users: "10 usuarios",
    features: [
      { label: "15 módulos CRM", included: true },
      { label: "Captura 5 redes", included: true },
      { label: "50,000 contactos", included: true },
      { label: "Outreach + Apollo", included: true },
      { label: "IA conversacional + Chrome", included: true },
    ],
    cta: "Empezar free trial",
    highlight: true,
    href: "#",
  },
  {
    name: "CRM Enterprise",
    price: "A medida",
    users: "25+ usuarios",
    features: [
      { label: "Todo en Pro", included: true },
      { label: "Contactos ilimitados", included: true },
      { label: "Atribución avanzada", included: true },
      { label: "Smart lists ilimitadas", included: true },
      { label: "SLA dedicado", included: true },
    ],
    cta: "Contactar ventas",
    href: "#",
  },
];

export function PricingTabs() {
  const [tab, setTab] = useState<"suite" | "erp" | "crm">("suite");
  const plans = tab === "suite" ? SUITE : tab === "erp" ? ERP : CRM;
  const TabBtn = ({ id, label }: { id: typeof tab; label: string }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        tab === id ? "bg-[#111] text-white" : "border border-[#E5E7EB] text-[#555] hover:text-[#111]"
      }`}
    >
      {label}
    </button>
  );
  return (
    <>
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        <TabBtn id="suite" label="Zentral Suite" />
        <TabBtn id="erp" label="Solo ERP" />
        <TabBtn id="crm" label="Solo CRM" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`card-light p-8 relative ${
              p.highlight ? "border-2 border-[#9333EA] shadow-[0_10px_40px_rgba(147,51,234,0.08)]" : ""
            }`}
          >
            {p.highlight && <span className="badge absolute -top-3 left-8">Más popular</span>}
            <div className={`text-sm font-semibold uppercase tracking-wider ${p.highlight ? "text-[#9333EA]" : "text-[#555]"}`}>
              {p.name}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl font-medium">{p.price}</span>
              {p.unit && <span className="text-[#555]">{p.unit}</span>}
            </div>
            <div className="text-sm text-[#555] mt-1">{p.users}</div>
            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f.label} className={`flex gap-2 ${f.included ? "" : "text-[#555]"}`}>
                  <span className={f.included ? "text-[#9333EA]" : ""}>{f.included ? "✓" : "—"}</span>
                  {f.label}
                </li>
              ))}
            </ul>
            <Link
              href={p.href}
              className={`block text-center mt-7 ${p.highlight ? "btn-primary" : "btn-ghost on-light text-[#111]"}`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
