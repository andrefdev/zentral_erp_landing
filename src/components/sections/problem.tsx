"use client";

import { ScrollReveal, SectionNumber } from "@/components/scroll-reveal";
import { FileSpreadsheet, Calculator, Server, Unplug } from "lucide-react";

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Excel + WhatsApp + Drive",
    description:
      "Datos dispersos, errores manuales, horas perdidas copiando información entre herramientas.",
  },
  {
    icon: Calculator,
    title: "Software contable limitado",
    description:
      "Solo resuelve facturación, pero no gestiona tareas, equipos, documentos ni operaciones.",
  },
  {
    icon: Server,
    title: "ERPs complejos y caros",
    description:
      "Odoo tarda 3-6 meses en implementar. SAP cuesta +$40K al año. Necesitan consultoras.",
  },
  {
    icon: Unplug,
    title: "Herramientas desconectadas",
    description:
      "Un CRM aquí, un gestor de tareas allá, nómina en otro lado. Nada se habla entre sí.",
  },
];

export function Problem() {
  return (
    <section id="problema" className="bg-[#0A0A0A] py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="02" />

        <ScrollReveal>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16">
            El 68% de las PYMES operan con herramientas rotas.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-16">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.title} delay={i * 0.1}>
              <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 lg:p-8 hover:border-[#9333EA] transition-all duration-300 hover:-translate-y-1 h-full">
                <problem.icon
                  className="text-[#9333EA] mb-4"
                  size={24}
                  strokeWidth={1.5}
                />
                <h3 className="text-white font-medium text-lg mb-2">
                  {problem.title}
                </h3>
                <p className="text-[#A3A3A3] text-base leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="border-t border-[#262626] pt-6">
            <p className="text-sm text-[#737373]">
              El mercado ERP cloud para PYMES en LATAM alcanza USD $2.81B
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
