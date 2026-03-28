"use client";

import { useState } from "react";
import { ScrollReveal, SectionNumber } from "@/components/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    color: "#E11D48",
    label: "Estudio contable",
    name: "Rojo",
    accent: "rose",
  },
  {
    color: "#2563EB",
    label: "Consultora tech",
    name: "Azul",
    accent: "blue",
  },
  {
    color: "#16A34A",
    label: "Agroexportadora",
    name: "Verde",
    accent: "green",
  },
  {
    color: "#EA580C",
    label: "Restaurante",
    name: "Naranja",
    accent: "orange",
  },
];

function MockupUI({ color, label }: { color: string; label: string }) {
  return (
    <div className="bg-[#111111] rounded-xl border border-[#262626] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#262626]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        </div>
        <span className="text-[11px] text-[#737373] ml-2">{label}</span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Sidebar + Main simulation */}
        <div className="flex gap-3">
          {/* Mini sidebar */}
          <div className="w-16 flex flex-col gap-2">
            <div
              className="h-7 rounded-md"
              style={{ backgroundColor: color + "20" }}
            >
              <div
                className="h-full w-full rounded-md flex items-center justify-center"
                style={{ borderLeft: `2px solid ${color}` }}
              >
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-7 rounded-md bg-[#1A1A1A]" />
            ))}
          </div>

          {/* Main area */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Header bar */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-[#262626] rounded" />
              <div
                className="h-6 w-16 rounded-md text-[10px] text-white flex items-center justify-center font-medium"
                style={{ backgroundColor: color }}
              >
                + Nuevo
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-[#1A1A1A] rounded-lg p-2.5">
                  <div className="h-2.5 w-8 bg-[#262626] rounded mb-1.5" />
                  <div
                    className="h-4 w-10 rounded font-bold text-[11px] flex items-center"
                    style={{ color }}
                  >
                    {n === 1 ? "24" : n === 2 ? "89%" : "$12K"}
                  </div>
                </div>
              ))}
            </div>

            {/* List items */}
            <div className="flex flex-col gap-1.5">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-8 bg-[#1A1A1A] rounded-lg flex items-center px-3 gap-2"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        n === 1 ? color : n === 2 ? "#737373" : "#404040",
                    }}
                  />
                  <div className="h-2 flex-1 bg-[#262626] rounded" />
                  <div className="h-2 w-8 bg-[#262626] rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Customization() {
  const [selected, setSelected] = useState(0);

  return (
    <section id="personalizacion" className="bg-[#0A0A0A] py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="04" />

        <ScrollReveal>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-4">
            Se adapta a tu empresa, no al revés.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-[#A3A3A3] leading-relaxed max-w-2xl mb-12">
            Elige tu color. Personaliza tu interfaz. Zentral se convierte en tu
            plataforma, con tu identidad.
          </p>
        </ScrollReveal>

        {/* Color selector */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center gap-3 mb-10">
            {themes.map((theme, i) => (
              <button
                key={theme.color}
                onClick={() => setSelected(i)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  selected === i
                    ? "border-white scale-110"
                    : "border-transparent hover:border-[#737373]"
                }`}
                style={{ backgroundColor: theme.color }}
                aria-label={theme.name}
              />
            ))}
            <span className="text-sm text-[#737373] ml-4">
              {themes[selected].label}
            </span>
          </div>
        </ScrollReveal>

        {/* Mockups grid */}
        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {/* Featured large mockup */}
            <div className="sm:col-span-2 lg:col-span-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <MockupUI
                    color={themes[selected].color}
                    label={themes[selected].label}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Other mockups */}
            <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-1">
              {themes
                .filter((_, i) => i !== selected)
                .slice(0, 2)
                .map((theme) => (
                  <div
                    key={theme.color}
                    className="opacity-50 hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() =>
                      setSelected(themes.findIndex((t) => t.color === theme.color))
                    }
                  >
                    <MockupUI color={theme.color} label={theme.label} />
                  </div>
                ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
