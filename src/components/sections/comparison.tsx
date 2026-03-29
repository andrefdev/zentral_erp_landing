"use client";

import { SectionNumber } from "@/components/scroll-reveal";
import { SplitWords } from "@/components/animations/split-text";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

const featureData = [
  { zentral: true, odoo: true, defontana: false, monday: false, zoho: "partial" },
  { zentral: true, odoo: true, defontana: false, monday: true, zoho: true },
  { zentral: true, odoo: "partial", defontana: false, monday: false, zoho: "partial" },
  { zentral: true, odoo: true, defontana: false, monday: false, zoho: true },
  { zentral: true, odoo: "partial", defontana: true, monday: false, zoho: false },
  { zentral: true, odoo: false, defontana: false, monday: "partial", zoho: false },
  { zentral: true, odoo: false, defontana: false, monday: "partial", zoho: false },
  { zentral: true, odoo: false, defontana: "partial", monday: true, zoho: "partial" },
];

function CellValue({ value, partialLabel }: { value: boolean | string; partialLabel: string }) {
  if (value === true) return <Check size={16} className="text-white" strokeWidth={2.5} />;
  if (value === "partial") return <span className="text-amber-400 text-xs font-medium">{partialLabel}</span>;
  return <Minus size={16} className="text-[#404040]" />;
}

export function Comparison() {
  const t = useTranslations("comparison");
  const features = t.raw("features") as string[];

  return (
    <section id="comparativa" className="bg-black py-32 lg:py-40 px-6">
      <div className="max-w-[1200px] mx-auto">
        <SectionNumber number="05" />
        <SplitWords text={t("title")} className="text-[28px] sm:text-[36px] lg:text-[40px] font-medium text-white leading-[1.15] tracking-[-0.015em] max-w-3xl mb-16" />

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#262626]">
                  <th className="text-left text-sm text-[#737373] font-normal pb-4 pr-4 w-[200px]">{t("feature")}</th>
                  <th className="text-center text-sm font-medium text-white pb-4 px-4 border-t-2 border-[#9333EA] pt-3 bg-[#9333EA]/5 rounded-t-lg">Zentral</th>
                  <th className="text-center text-sm text-[#737373] font-normal pb-4 px-4">Odoo</th>
                  <th className="text-center text-sm text-[#737373] font-normal pb-4 px-4">Defontana</th>
                  <th className="text-center text-sm text-[#737373] font-normal pb-4 px-4">Monday</th>
                  <th className="text-center text-sm text-[#737373] font-normal pb-4 px-4">Zoho</th>
                </tr>
              </thead>
              <tbody>
                {features.map((name, i) => (
                  <tr key={name} className={`border-b border-[#1A1A1A] ${i % 2 === 0 ? "" : "bg-[#0A0A0A]/50"}`}>
                    <td className="text-sm text-[#A3A3A3] py-4 pr-4">{name}</td>
                    <td className="text-center py-4 px-4 bg-[#9333EA]/5"><div className="flex justify-center"><CellValue value={featureData[i].zentral} partialLabel={t("partial")} /></div></td>
                    <td className="text-center py-4 px-4"><div className="flex justify-center"><CellValue value={featureData[i].odoo} partialLabel={t("partial")} /></div></td>
                    <td className="text-center py-4 px-4"><div className="flex justify-center"><CellValue value={featureData[i].defontana} partialLabel={t("partial")} /></div></td>
                    <td className="text-center py-4 px-4"><div className="flex justify-center"><CellValue value={featureData[i].monday} partialLabel={t("partial")} /></div></td>
                    <td className="text-center py-4 px-4"><div className="flex justify-center"><CellValue value={featureData[i].zoho} partialLabel={t("partial")} /></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base text-[#A3A3A3] mt-10">
          <span className="text-white font-medium">$199/mes</span> {t("footer").split("$199/mes")[1] || t("footer").split("$199/month")[1]}
        </motion.p>
      </div>
    </section>
  );
}
