import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import {
  Users, Calendar, FileText, HardDrive, Package, DollarSign,
  CreditCard, Sparkles, MessageSquare, BarChart3, Code2, Webhook,
} from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const SECTION_ICONS: (typeof Users)[][] = [
  [],
  [Users, Calendar, FileText, HardDrive, Package, DollarSign, CreditCard, Sparkles],
  [MessageSquare, BarChart3, MessageSquare, BarChart3, Sparkles, Sparkles],
  [Code2, Webhook, Code2, Code2, Code2, Code2],
];

type Section = { title: string; items: string[] };
type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Docs({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });
  const sections = t.raw("sections") as Section[];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="eyebrow text-[#9333EA]">{t("eyebrow")}</span>
            <h1 className="font-display text-5xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              {t("titleLine1")}<br />
              <span className="text-[#A3A3A3]">{t("titleLine2")}</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl">{t("subtitle")}</p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((s, si) => (
              <div key={s.title} className="card-light p-7">
                <div className="font-display text-2xl font-semibold text-[#111] mb-5">{s.title}</div>
                <ul className="space-y-2">
                  {s.items.map((it, i) => {
                    const Ico = SECTION_ICONS[si]?.[i];
                    return (
                      <li key={it}>
                        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F3F0FF] text-[#111] text-sm transition">
                          {Ico ? <Ico size={16} className="text-[#9333EA]" /> : <span className="text-[#9333EA]">●</span>}
                          {it}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-t border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-medium text-[#111]">{t("ctaTitle")}</h2>
            <p className="text-[#555] mt-3 max-w-xl mx-auto">{t("ctaSubtitle")}</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a href="#" className="btn-primary">{t("ctaPrimary")}</a>
              <a href="#" className="btn-ghost on-light text-[#111]">{t("ctaSecondary")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
