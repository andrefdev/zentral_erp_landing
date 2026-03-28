"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { Counter } from "@/components/animations/counter";
import { Marquee } from "@/components/animations/marquee";
import { motion } from "framer-motion";

const metrics = [
  { value: 7, suffix: "", label: "módulos disponibles" },
  { value: 3, suffix: "", label: "planes desde $79/mes" },
  { value: 4, prefix: "<", suffix: "", label: "semanas de implementación" },
];

const capabilities = [
  "RRHH", "Nóminas", "Tareas", "Proyectos", "Documentos", "Drive",
  "Inventario", "Contabilidad", "IA", "Reportes", "Facturación", "CRM",
];

export function Trust() {
  return (
    <section id="confianza" className="bg-black py-32 lg:py-40 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="09" />

        {/* Metrics with animated counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-center sm:text-left"
            >
              <div className="text-[56px] lg:text-[72px] font-semibold text-white tracking-tight leading-none">
                {metric.prefix && <span>{metric.prefix}</span>}
                <Counter value={metric.value} className="" duration={1.5} />
                {metric.suffix && <span>{metric.suffix}</span>}
              </div>
              <p className="text-[#A3A3A3] text-base mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Capability marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <Marquee speed={35} direction="right" className="py-4">
            {capabilities.map((cap) => (
              <span
                key={cap}
                className="text-[#262626] text-2xl sm:text-3xl font-semibold tracking-tight whitespace-nowrap hover:text-[#9333EA] transition-colors duration-300 cursor-default"
              >
                {cap}
              </span>
            ))}
          </Marquee>
        </motion.div>

        {/* Founder quote */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left"
        >
          <div className="border-t border-[#262626] pt-12">
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="text-[22px] sm:text-[28px] lg:text-[32px] text-white font-light leading-[1.4] tracking-[-0.01em] italic">
                &ldquo;Construimos Zentral porque las PYMES merecen herramientas
                tan potentes como las de las grandes empresas, pero sin la
                complejidad ni el precio.&rdquo;
              </p>
              <footer className="mt-6">
                <span className="text-[#737373] text-sm">— Equipo fundador, Indrox</span>
              </footer>
            </motion.blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
