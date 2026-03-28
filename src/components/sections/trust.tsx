"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { Counter } from "@/components/animations/counter";
import { motion } from "framer-motion";

interface TrustDict {
  metrics: { value: number; prefix?: string; label: string }[];
  quote: string;
  quoteAuthor: string;
}

export function Trust({ dict }: { dict: TrustDict }) {
  return (
    <section id="confianza" className="bg-black py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="09" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {dict.metrics.map((metric, i) => (
            <motion.div key={metric.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} className="text-center sm:text-left">
              <div className="text-[56px] lg:text-[72px] font-semibold text-white tracking-tight leading-none">
                {metric.prefix && <span>{metric.prefix}</span>}
                <Counter value={metric.value} duration={1.5} />
              </div>
              <p className="text-[#A3A3A3] text-base mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="border-t border-[#262626] pt-12">
            <blockquote className="max-w-3xl">
              <p className="text-[22px] sm:text-[28px] lg:text-[32px] text-white font-light leading-[1.4] tracking-[-0.01em] italic">
                &ldquo;{dict.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <span className="text-[#737373] text-sm">{dict.quoteAuthor}</span>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
