"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-children";

interface WhyZentralDict {
  title: string;
  reasons: { number: string; title: string; description: string }[];
}

export function WhyZentral({ dict }: { dict: WhyZentralDict }) {
  return (
    <section id="por-que" className="bg-[#0A0A0A] py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="08" />
        <SplitWords text={dict.title} className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16" />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {dict.reasons.map((reason) => (
            <StaggerItem key={reason.number}>
              <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-6 lg:p-8 h-full cursor-default group hover:border-[#9333EA] hover:-translate-y-1 transition-all duration-300">
                <span className="text-[32px] lg:text-[40px] font-semibold text-[#9333EA]/20 leading-none mb-4 block group-hover:text-[#9333EA]/40 transition-colors duration-300">{reason.number}</span>
                <h3 className="text-white font-medium text-lg mb-3">{reason.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{reason.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
