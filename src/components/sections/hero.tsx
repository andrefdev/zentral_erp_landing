"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { SplitText } from "@/components/animations/split-text";
import { MagneticButton } from "@/components/animations/magnetic-button";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-black px-6 overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.08)_0%,_transparent_70%)]" />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      <motion.div style={{ opacity, scale, y }} className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-xs font-medium tracking-[3px] uppercase text-[#A3A3A3] border border-[#262626] rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
            Plataforma operativa para empresas
          </span>
        </motion.div>

        {/* H1 with letter-by-letter animation */}
        <div className="mb-6">
          <SplitText
            text="Tu empresa entera,"
            as="h1"
            className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-medium text-white leading-[1.1] tracking-[-0.02em]"
            delay={0.2}
          />
          <SplitText
            text="en un solo lugar."
            as="span"
            className="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-medium text-white leading-[1.1] tracking-[-0.02em] block"
            delay={0.6}
          />
        </div>

        {/* Subtitle with blur-in */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed max-w-2xl mx-auto mb-10"
        >
          RRHH, tareas, documentos, inventario, contabilidad e IA.
          <br className="hidden sm:block" />
          Todo conectado. Sin Excel. Sin WhatsApp. Sin caos.
        </motion.p>

        {/* CTAs with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <MagneticButton
            href="#precios"
            className="bg-white text-black font-medium px-8 py-3.5 rounded-lg text-base hover:bg-[#9333EA] hover:text-white transition-all duration-300 w-full sm:w-auto text-center inline-block"
            strength={0.2}
          >
            Empieza gratis
          </MagneticButton>
          <MagneticButton
            href="#solucion"
            className="border border-[#262626] text-white font-medium px-8 py-3.5 rounded-lg text-base hover:border-[#9333EA] hover:text-[#9333EA] transition-all duration-300 w-full sm:w-auto text-center inline-block"
            strength={0.2}
          >
            Ver demo
          </MagneticButton>
        </motion.div>

        {/* Micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-[13px] text-[#737373]"
        >
          Sin tarjeta de crédito. Listo en 5 minutos.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-[#737373]" size={24} />
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-1 h-1 rounded-full bg-[#9333EA]/40"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 right-[15%] w-1.5 h-1.5 rounded-full bg-[#06B6D4]/30"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[20%] w-1 h-1 rounded-full bg-white/20"
        animate={{
          y: [0, -12, 0],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </section>
  );
}
