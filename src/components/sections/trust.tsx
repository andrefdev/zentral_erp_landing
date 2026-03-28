"use client";

import { ScrollReveal, SectionNumber } from "@/components/scroll-reveal";
import { motion } from "framer-motion";

const metrics = [
  { value: "7", label: "módulos disponibles" },
  { value: "3", label: "planes desde $79/mes" },
  { value: "<4", label: "semanas de implementación" },
];

export function Trust() {
  return (
    <section id="confianza" className="bg-black py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="09" />

        {/* Metrics */}
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 mb-20">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center sm:text-left"
              >
                <span className="text-[56px] lg:text-[72px] font-semibold text-white tracking-tight leading-none">
                  {metric.value}
                </span>
                <p className="text-[#A3A3A3] text-base mt-2">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Founder quote */}
        <ScrollReveal delay={0.3}>
          <div className="border-t border-[#262626] pt-12">
            <blockquote className="max-w-3xl">
              <p className="text-[22px] sm:text-[28px] lg:text-[32px] text-white font-light leading-[1.4] tracking-[-0.01em] italic">
                &ldquo;Construimos Zentral porque las PYMES merecen herramientas
                tan potentes como las de las grandes empresas, pero sin la
                complejidad ni el precio.&rdquo;
              </p>
              <footer className="mt-6">
                <span className="text-[#737373] text-sm">
                  — Equipo fundador, Indrox
                </span>
              </footer>
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
