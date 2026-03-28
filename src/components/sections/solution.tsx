"use client";

import { ScrollReveal, SectionNumber } from "@/components/scroll-reveal";
import {
  Users,
  CheckSquare,
  FileText,
  Package,
  Calculator,
  Brain,
  FolderOpen,
  Wallet,
} from "lucide-react";

const modules = [
  {
    name: "Zentral People",
    description: "Gestión de RRHH, nóminas y equipos",
    icon: Users,
    status: "available" as const,
  },
  {
    name: "Zentral Work",
    description: "Tareas, proyectos y productividad",
    icon: CheckSquare,
    status: "available" as const,
  },
  {
    name: "Zentral Docs",
    description: "Documentos y firma electrónica",
    icon: FileText,
    status: "available" as const,
  },
  {
    name: "Zentral Drive",
    description: "Almacenamiento cloud integrado",
    icon: FolderOpen,
    status: "available" as const,
  },
  {
    name: "Zentral Inventory",
    description: "Control de stock y almacenes",
    icon: Package,
    status: "available" as const,
  },
  {
    name: "Zentral Accounting",
    description: "Contabilidad y facturación SUNAT",
    icon: Calculator,
    status: "coming" as const,
  },
  {
    name: "Zentral AI",
    description: "Agentes IA para análisis operativo",
    icon: Brain,
    status: "coming" as const,
  },
  {
    name: "Zentral Pay",
    description: "Suscripciones y pagos recurrentes",
    icon: Wallet,
    status: "coming" as const,
  },
];

export function Solution() {
  return (
    <section id="solucion" className="bg-black py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="03" />

        <ScrollReveal>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-4">
            Una sola plataforma para toda tu operación.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-[#A3A3A3] leading-relaxed max-w-2xl mb-16">
            Zentral integra en un solo lugar todo lo que tu empresa necesita
            para operar, crecer y competir.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <ScrollReveal key={mod.name} delay={i * 0.08}>
              <div className="group bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 hover:border-[#9333EA] transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-start justify-between mb-4">
                  <mod.icon
                    className="text-[#A3A3A3] group-hover:text-[#9333EA] transition-colors duration-300"
                    size={22}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${
                      mod.status === "available"
                        ? "text-emerald-400 bg-emerald-400/10"
                        : "text-[#9333EA] bg-[#9333EA]/10"
                    }`}
                  >
                    {mod.status === "available" ? "Disponible" : "Próximamente"}
                  </span>
                </div>
                <h3 className="text-white font-medium text-base mb-1.5">
                  {mod.name}
                </h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
