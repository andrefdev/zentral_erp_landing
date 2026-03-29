"use client";

import { useState } from "react";
import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const colors = ["#E11D48", "#2563EB", "#16A34A", "#EA580C"];

function MockupUI({ color, label, isLarge = false }: { color: string; label: string; isLarge?: boolean }) {
  return (
    <div className="bg-[#111111] rounded-xl border border-[#262626] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1A1A]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        </div>
        <span className="text-[11px] text-[#737373] ml-2">{label}</span>
      </div>
      <div className={`p-4 ${isLarge ? "p-5" : ""}`}>
        <div className="flex gap-3">
          <div className={`${isLarge ? "w-20" : "w-16"} flex flex-col gap-2`}>
            <div className="h-7 rounded-md" style={{ backgroundColor: color + "20" }}>
              <div className="h-full w-full rounded-md flex items-center justify-center" style={{ borderLeft: `2px solid ${color}` }}>
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
              </div>
            </div>
            {[1, 2, 3, 4].map((n) => (<div key={n} className="h-7 rounded-md bg-[#1A1A1A]" />))}
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-[#262626] rounded" />
              <div className="h-6 w-16 rounded-md text-[10px] text-white flex items-center justify-center font-medium" style={{ backgroundColor: color }}>+ Nuevo</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[{ v: "24" }, { v: "89%" }, { v: "$12K" }].map((item, n) => (
                <div key={n} className="bg-[#1A1A1A] rounded-lg p-2.5">
                  <div className="h-2.5 w-8 bg-[#262626] rounded mb-1.5" />
                  <div className="h-4 w-10 rounded font-bold text-[11px] flex items-center" style={{ color }}>{item.v}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-8 bg-[#1A1A1A] rounded-lg flex items-center px-3 gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: n === 1 ? color : n === 2 ? "#737373" : "#404040" }} />
                  <div className="h-2 flex-1 bg-[#262626] rounded" />
                  <div className="h-2 w-8 bg-[#262626] rounded" />
                </div>
              ))}
            </div>
            {isLarge && (
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="h-16 bg-[#1A1A1A] rounded-lg p-3 flex flex-col justify-between">
                  <div className="h-2 w-12 bg-[#262626] rounded" />
                  <div className="h-6 w-full rounded-md" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
                </div>
                <div className="h-16 bg-[#1A1A1A] rounded-lg p-3 flex flex-col justify-between">
                  <div className="h-2 w-10 bg-[#262626] rounded" />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex-1 h-4 rounded-sm" style={{ backgroundColor: n <= 3 ? color + "60" : "#262626" }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Customization() {
  const t = useTranslations("customization");
  const themes = t.raw("themes") as { label: string; name: string }[];
  const [selected, setSelected] = useState(0);

  return (
    <section id="personalizacion" className="bg-[#0A0A0A] py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="04" />
        <SplitWords text={t("title")} className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-4" />
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-lg text-[#A3A3A3] leading-relaxed max-w-2xl mb-12">{t("subtitle")}</motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-center gap-4 mb-10">
          {themes.map((theme, i) => (
            <motion.button key={colors[i]} onClick={() => setSelected(i)} className="relative w-12 h-12 rounded-full" style={{ backgroundColor: colors[i] }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} aria-label={theme.name}>
              {selected === i && (<motion.div layoutId="color-ring" className="absolute inset-[-4px] rounded-full border-2 border-white" transition={{ type: "spring", stiffness: 300, damping: 25 }} />)}
            </motion.button>
          ))}
          <AnimatePresence mode="wait">
            <motion.span key={selected} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="text-sm text-[#737373] ml-2">{themes[selected].label}</motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div key={selected} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <MockupUI color={colors[selected]} label={themes[selected].label} isLarge />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {themes.filter((_, i) => i !== selected).slice(0, 2).map((theme) => {
                const idx = themes.findIndex((t) => t.name === theme.name);
                return (
                  <motion.div key={colors[idx]} className="cursor-pointer opacity-50 hover:opacity-80 transition-opacity" onClick={() => setSelected(idx)}>
                    <MockupUI color={colors[idx]} label={theme.label} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
