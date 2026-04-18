"use client";

import { useState } from "react";

type Vertical = {
  id: string;
  label: string;
  title: string;
  body: string;
  note: string;
};

const VERTICALS: Vertical[] = [
  {
    id: "agencias",
    label: "Agencias",
    title: "Agencias de marketing",
    body: "Brief en CRM → proyecto en Work → horas por rol en People → factura recurrente mensual.",
    note: "Sin perder horas facturables ni retrabajos entre PM y finanzas.",
  },
  {
    id: "consultoras",
    label: "Consultoras",
    title: "Consultoras",
    body: "Lead LinkedIn → propuesta PDF firmada → proyecto con tareas → reporte mensual al cliente.",
    note: "Forecast claro, entregables rastreables y reportes que el cliente ya recibía.",
  },
  {
    id: "saas",
    label: "SaaS B2B",
    title: "SaaS B2B",
    body: "Lead en Apollo → MQL scoring → demo → deal → Zentral Pay para suscripción → renovación automática.",
    note: "Pipeline predecible, churn bajo control y cobranza sin intervención.",
  },
  {
    id: "distri",
    label: "Distribuidoras",
    title: "Distribuidoras",
    body: "Cotización por WhatsApp → deal ganado → orden en Stock → factura SUNAT + inventario actualizado.",
    note: "Sin quiebres de stock, con trazabilidad desde el chat del cliente al almacén.",
  },
];

export function VerticalsTabs() {
  const [active, setActive] = useState(VERTICALS[0].id);
  const current = VERTICALS.find((v) => v.id === active)!;
  return (
    <>
      <div className="flex gap-6 border-b border-[#E5E7EB] mb-8 overflow-x-auto">
        {VERTICALS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v.id)}
            className={`pb-3 pt-2 px-1 font-semibold text-sm whitespace-nowrap border-b-2 transition ${
              active === v.id ? "border-[#111] text-[#111]" : "border-transparent text-[#555]"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-display text-2xl font-medium mb-3">{current.title}</h3>
          <p className="text-[#111]/80 mb-3">{current.body}</p>
          <p className="text-[#555] text-sm">{current.note}</p>
        </div>
        <div className="card-light p-6">
          <div className="text-xs text-[#555] mb-3">DASHBOARD CONFIGURADO · {current.label.toUpperCase()}</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#FAFAFA] rounded-lg p-3"><div className="text-xs text-[#555]">Pipeline</div><div className="font-display text-xl">$268K</div></div>
            <div className="bg-[#FAFAFA] rounded-lg p-3"><div className="text-xs text-[#555]">Deals abiertos</div><div className="font-display text-xl">34</div></div>
            <div className="bg-[#FAFAFA] rounded-lg p-3"><div className="text-xs text-[#555]">Proyectos activos</div><div className="font-display text-xl">12</div></div>
            <div className="bg-[#FAFAFA] rounded-lg p-3"><div className="text-xs text-[#555]">MRR</div><div className="font-display text-xl text-[#9333EA]">$24.8K</div></div>
          </div>
          <div className="h-28 bg-gradient-to-t from-[#F3F0FF] to-white rounded-lg grid place-items-center text-[#555] text-xs border border-[#E5E7EB]">
            Revenue run-rate 2026
          </div>
        </div>
      </div>
    </>
  );
}
