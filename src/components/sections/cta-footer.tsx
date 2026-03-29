"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import logo from "@/assets/logo.png";

export function CTAFooter() {
  const tCta = useTranslations("cta");
  const tFooter = useTranslations("footer");
  const locale = useLocale();

  const otherLang = locale === "es" ? "en" : "es";
  const otherLangLabel = locale === "es" ? "English" : "Español";

  const productLinks = tFooter.raw("links.product") as string[];
  const companyLinks = tFooter.raw("links.company") as string[];
  const legalLinks = tFooter.raw("links.legal") as string[];

  const footerSections = [
    { title: tFooter("product"), links: productLinks },
    { title: tFooter("company"), links: companyLinks },
    { title: tFooter("legal"), links: legalLinks },
  ];

  return (
    <>
      <section className="bg-black py-32 lg:py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(147,51,234,0.08)_0%,_transparent_60%)]" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <SectionNumber number="10" />
          <div className="text-center max-w-3xl mx-auto">
            <SplitWords text={tCta("title")} as="h2" className="text-[28px] sm:text-[36px] lg:text-[44px] font-medium text-white leading-[1.15] tracking-[-0.015em] mb-6" />
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="text-lg text-[#A3A3A3] leading-relaxed mb-10">{tCta("subtitle")}</motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
              <a href="#precios" className="inline-block bg-white text-black font-medium px-10 py-4 rounded-lg text-base hover:bg-[#9333EA] hover:text-white transition-all duration-300">{tCta("button")}</a>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }} className="text-sm text-[#737373] mt-6">
              {tCta("contact")}{" "}
              <a href="mailto:hello@indrox.com" className="text-[#06B6D4] hover:underline transition-colors">hello@indrox.com</a>
            </motion.p>
          </div>
        </div>
      </section>

      <footer className="bg-[#0A0A0A] border-t border-[#262626] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={logo}
                  alt="Zentral"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-white font-semibold text-lg tracking-tight">Zentral</span>
              </div>
              <p className="text-sm text-[#737373] leading-relaxed mb-4">{tFooter("tagline")}</p>
              <a href={`/${otherLang}`} className="text-sm text-[#A3A3A3] hover:text-white transition-colors">
                {otherLangLabel}
              </a>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-medium tracking-wider uppercase text-[#737373] mb-4">{section.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[#A3A3A3] hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#262626] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#737373]">&copy; 2026 Zentral. {tFooter("copyright")}</p>
            <p className="text-xs text-[#737373]">
              by{" "}
              <a href="https://indrox.com" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-white transition-colors">Indrox</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
