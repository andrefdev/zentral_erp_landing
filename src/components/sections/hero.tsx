"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-xs font-medium tracking-[3px] uppercase text-[#A3A3A3] border border-[#262626] rounded-full px-5 py-2 mb-8">
            Plataforma operativa para empresas
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-medium text-white leading-[1.1] tracking-[-0.02em] mb-6"
        >
          Tu empresa entera,
          <br />
          en un solo lugar.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed max-w-2xl mx-auto mb-10"
        >
          RRHH, tareas, documentos, inventario, contabilidad e IA.
          <br className="hidden sm:block" />
          Todo conectado. Sin Excel. Sin WhatsApp. Sin caos.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="#precios"
            className="bg-white text-black font-medium px-8 py-3.5 rounded-lg text-base hover:bg-[#9333EA] hover:text-white transition-all duration-200 w-full sm:w-auto text-center"
          >
            Empieza gratis
          </a>
          <a
            href="#solucion"
            className="border border-[#262626] text-white font-medium px-8 py-3.5 rounded-lg text-base hover:border-[#9333EA] hover:text-[#9333EA] transition-all duration-200 w-full sm:w-auto text-center"
          >
            Ver demo
          </a>
        </motion.div>

        {/* Micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-[13px] text-[#737373]"
        >
          Sin tarjeta de crédito. Listo en 5 minutos.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce-down">
          <ChevronDown className="text-[#737373]" size={24} />
        </div>
      </motion.div>
    </section>
  );
}
