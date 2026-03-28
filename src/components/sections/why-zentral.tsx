"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-children";
import { motion } from "framer-motion";

const reasons = [
  {
    number: "01",
    title: "Todo en uno, de verdad",
    description: "No son 50 apps pegadas con cinta. Es una plataforma unificada donde cada módulo se comunica con los demás.",
  },
  {
    number: "02",
    title: "Drive y documentos integrados",
    description: "Adiós Google Drive externo. Tu almacenamiento vive dentro de Zentral, conectado a cada proceso.",
  },
  {
    number: "03",
    title: "IA operativa",
    description: "Un analista 24/7, no un chatbot. Analiza tu operación, sugiere mejoras y automatiza tareas repetitivas.",
  },
  {
    number: "04",
    title: "Personalizable",
    description: "Tu color, tu Zentral. Cada empresa tiene su identidad. Tu plataforma debería reflejarla.",
  },
  {
    number: "05",
    title: "Implementación rápida",
    description: "Semanas, no meses. Sin consultoras, sin proyectos eternos. Configura y empieza a trabajar.",
  },
  {
    number: "06",
    title: "Precio accesible",
    description: "Funcionalidad enterprise, precio PYME. Desde $79/mes con todo lo que necesitas.",
  },
];

export function WhyZentral() {
  return (
    <section id="por-que" className="bg-[#0A0A0A] py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="08" />

        <SplitWords
          text="Lo que nos hace diferentes."
          className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {reasons.map((reason) => (
            <StaggerItem key={reason.number}>
              <motion.div
                className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 lg:p-8 h-full cursor-default group relative overflow-hidden"
                whileHover={{
                  borderColor: "#9333EA",
                  y: -4,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Gradient hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#9333EA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative z-10">
                  <motion.span
                    className="text-[32px] lg:text-[40px] font-semibold text-[#9333EA]/20 leading-none mb-4 block"
                    whileHover={{ color: "rgba(147, 51, 234, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {reason.number}
                  </motion.span>
                  <h3 className="text-white font-medium text-lg mb-3 group-hover:text-[#9333EA] transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
