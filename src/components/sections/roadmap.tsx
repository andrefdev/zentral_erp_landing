"use client";

import { ScrollReveal, SectionNumber } from "@/components/scroll-reveal";

const sprints = [
  {
    date: "Abril 2026",
    label: "Sprint 1",
    features: [
      "Contabilidad + SUNAT",
      "Activos Fijos",
      "Suscripciones y pagos recurrentes",
    ],
  },
  {
    date: "Mayo 2026",
    label: "Sprint 2",
    features: ["CRM de ventas", "Módulo de Compras", "Correo Corporativo"],
  },
  {
    date: "Junio 2026",
    label: "Sprint 3",
    features: ["Agentes IA avanzados", "OCR para documentos", "Dashboards BI"],
  },
  {
    date: "Julio 2026",
    label: "Sprint 4",
    features: [
      "Gantt y planificación",
      "OKRs y metas",
      "Wiki interno",
      "POS",
      "Multi-Almacén",
    ],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="bg-black py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="07" />

        <ScrollReveal>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16">
            Lo que viene.
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] lg:left-[140px] top-0 bottom-0 w-px bg-[#262626]" />

          <div className="flex flex-col gap-12 lg:gap-16">
            {sprints.map((sprint, i) => (
              <ScrollReveal key={sprint.label} delay={i * 0.1}>
                <div className="relative flex flex-col lg:flex-row gap-4 lg:gap-12">
                  {/* Date column */}
                  <div className="lg:w-[140px] flex items-start gap-4 lg:block">
                    {/* Dot */}
                    <div className="relative z-10 w-[15px] h-[15px] rounded-full bg-[#9333EA] border-4 border-black lg:absolute lg:right-[-7.5px] lg:top-1 shrink-0" />
                    <div className="lg:pr-8 lg:text-right">
                      <span className="text-[#737373] text-sm font-medium">
                        {sprint.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pl-8 lg:pl-12 flex-1">
                    <span className="inline-block text-xs font-medium tracking-wider uppercase text-[#9333EA] mb-3">
                      {sprint.label}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {sprint.features.map((feature) => (
                        <span
                          key={feature}
                          className="bg-[#1A1A1A] border border-[#262626] text-white text-sm px-4 py-2 rounded-lg"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
