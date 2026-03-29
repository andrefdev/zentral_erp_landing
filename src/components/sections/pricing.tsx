"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-children";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function Pricing() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as {
    name: string;
    price: number;
    description: string;
    features: string[];
  }[];
  const featuredIndex = 1;

  return (
    <section id="precios" className="bg-[#FAFAFA] py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="06" />
        <SplitWords text={t("title")} className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-black leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16" />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, i) => {
            const featured = i === featuredIndex;
            return (
              <StaggerItem key={plan.name}>
                <div className={`bg-white rounded-2xl p-8 h-full flex flex-col hover:-translate-y-2 transition-all duration-300 ${featured ? "border-2 border-[#9333EA] relative hover:shadow-xl hover:shadow-[#9333EA]/10" : "border border-[#E5E5E5] hover:shadow-lg"}`}>
                  {featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#9333EA] text-white text-xs font-medium tracking-wider uppercase px-4 py-1.5 rounded-full">{t("popular")}</span>
                  )}
                  <div className="mb-6">
                    <h3 className="text-black font-medium text-xl mb-2">{plan.name}</h3>
                    <p className="text-[#737373] text-sm">{plan.description}</p>
                  </div>
                  <div className="mb-8">
                    <span className="text-[44px] font-semibold text-black tracking-tight">${plan.price}</span>
                    <span className="text-[#737373] text-base">{t("perMonth")}</span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check size={16} className={featured ? "text-[#9333EA]" : "text-black"} strokeWidth={2.5} />
                        <span className="text-[#404040] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#" className={`block text-center font-medium py-3.5 rounded-lg transition-all duration-300 ${featured ? "bg-[#9333EA] text-white hover:bg-[#7e22ce]" : "bg-black text-white hover:bg-[#9333EA]"}`}>{t("cta")}</a>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center text-sm text-[#737373]">{t("promo")}</motion.p>
      </div>
    </section>
  );
}
