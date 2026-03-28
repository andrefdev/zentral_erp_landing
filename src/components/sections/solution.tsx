"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-children";
import { motion } from "framer-motion";
import {
  Users, CheckSquare, FileText, Package,
  Calculator, Brain, FolderOpen, Wallet,
} from "lucide-react";

const icons = [Users, CheckSquare, FileText, FolderOpen, Package, Calculator, Brain, Wallet];
const statuses = ["available", "available", "available", "available", "available", "coming", "coming", "coming"] as const;

interface SolutionDict {
  title: string;
  subtitle: string;
  available: string;
  coming: string;
  modules: { name: string; description: string }[];
}

export function Solution({ dict }: { dict: SolutionDict }) {
  return (
    <section id="solucion" className="bg-black py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="03" />

        <SplitWords
          text={dict.title}
          className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-4"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-[#A3A3A3] leading-relaxed max-w-2xl mb-16"
        >
          {dict.subtitle}
        </motion.p>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dict.modules.map((mod, i) => {
            const Icon = icons[i];
            const status = statuses[i];
            return (
              <StaggerItem key={mod.name}>
                <div className="group bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 h-full cursor-default hover:border-[#9333EA] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <Icon
                      className="text-[#A3A3A3] group-hover:text-[#9333EA] transition-colors duration-300"
                      size={22}
                      strokeWidth={1.5}
                    />
                    <span
                      className={`text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${
                        status === "available"
                          ? "text-emerald-400 bg-emerald-400/10"
                          : "text-[#9333EA] bg-[#9333EA]/10"
                      }`}
                    >
                      {status === "available" ? dict.available : dict.coming}
                    </span>
                  </div>
                  <h3 className="text-white font-medium text-base mb-1.5">{mod.name}</h3>
                  <p className="text-[#A3A3A3] text-sm leading-relaxed">{mod.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
