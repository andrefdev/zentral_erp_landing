"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface RoadmapDict {
  title: string;
  sprints: {
    date: string;
    label: string;
    features: string[];
  }[];
}

function TimelineDot({ index }: { index: number }) {
  return (
    <motion.div
      className="relative z-10 w-[15px] h-[15px] rounded-full border-4 border-black shrink-0"
      initial={{ scale: 0, backgroundColor: "#262626" }}
      whileInView={{ scale: 1, backgroundColor: "#9333EA" }}
      viewport={{ once: true }}
      transition={{
        scale: { duration: 0.4, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] },
        backgroundColor: { duration: 0.3, delay: index * 0.15 + 0.2 },
      }}
    />
  );
}

export function Roadmap({ dict }: { dict: RoadmapDict }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section id="roadmap" className="bg-black py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="07" />
        <SplitWords text={dict.title} className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16" />

        <div ref={containerRef} className="relative">
          <div className="absolute left-[7px] lg:left-[140px] top-0 bottom-0 w-px bg-[#1A1A1A]" />
          <motion.div className="absolute left-[7px] lg:left-[140px] top-0 w-px bg-gradient-to-b from-[#9333EA] to-[#06B6D4] origin-top" style={{ height: lineHeight }} />

          <div className="flex flex-col gap-12 lg:gap-16">
            {dict.sprints.map((sprint, i) => (
              <motion.div key={sprint.label} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }} className="relative flex flex-col lg:flex-row gap-4 lg:gap-12">
                <div className="lg:w-[140px] flex items-start gap-4 lg:block">
                  <TimelineDot index={i} />
                  <div className="lg:pr-8 lg:text-right lg:absolute lg:left-0 lg:top-0">
                    <span className="text-[#737373] text-sm font-medium">{sprint.date}</span>
                  </div>
                </div>
                <div className="pl-8 lg:pl-12 flex-1">
                  <span className="inline-block text-xs font-medium tracking-wider uppercase text-[#9333EA] mb-3">{sprint.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {sprint.features.map((feature, fi) => (
                      <motion.span key={feature} className="bg-[#1A1A1A] border border-[#262626] text-white text-sm px-4 py-2 rounded-lg hover:border-[#9333EA] hover:bg-[#9333EA]/5 transition-all duration-300 cursor-default" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 + fi * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] }} whileHover={{ scale: 1.05, y: -2 }}>
                        {feature}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
