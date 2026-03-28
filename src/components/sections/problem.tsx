"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-children";
import { Marquee } from "@/components/animations/marquee";
import { TiltOnScroll } from "@/components/animations/parallax";
import { motion } from "framer-motion";
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

const brokenTools = [
  "Excel", "WhatsApp", "Google Drive", "Trello", "Monday", "Notion",
  "Odoo", "SAP", "QuickBooks", "Slack", "Asana", "Zoho",
];

export function Problem() {
  return (
    <section id="problema" className="bg-[#0A0A0A] py-32 lg:py-40 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="02" />

        <SplitWords
          text="El 68% de las PYMES operan con herramientas rotas."
          className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-6"
        />

        {/* Marquee of broken tools */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <Marquee speed={25} className="py-4">
            {brokenTools.map((tool) => (
              <span
                key={tool}
                className="text-[#404040] text-sm font-medium tracking-wider uppercase whitespace-nowrap line-through decoration-[#9333EA]/40"
              >
                {tool}
              </span>
            ))}
          </Marquee>
        </motion.div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-16">
          {problems.map((problem) => (
            <StaggerItem key={problem.title}>
              <TiltOnScroll>
                <motion.div
                  className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 lg:p-8 h-full group cursor-default"
                  whileHover={{
                    borderColor: "#9333EA",
                    y: -4,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: -10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <problem.icon
                      className="text-[#737373] group-hover:text-[#9333EA] transition-colors duration-300 mb-4"
                      size={24}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <h3 className="text-white font-medium text-lg mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-[#A3A3A3] text-base leading-relaxed">
                    {problem.description}
                  </p>
                </motion.div>
              </TiltOnScroll>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left"
        >
          <div className="border-t border-[#262626] pt-6">
            <p className="text-sm text-[#737373]">
              El mercado ERP cloud para PYMES en LATAM alcanza USD $2.81B
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
