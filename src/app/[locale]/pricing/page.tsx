import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PricingTabs } from "@/components/site/pricing-tabs";
import { FAQ } from "@/components/site/faq";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function Pricing({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;

  const included = t.raw("included") as { t: string; d: string }[];
  const faqs = t.raw("faqs") as { q: string; a: string }[];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full px-4 py-1.5 text-xs text-[#A3A3A3] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
              {t("heroBadge")}
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.05] tracking-[-0.02em]">
              {t("heroTitleLine1")}<br />
              <span className="text-[#A3A3A3]">{t("heroTitleLine2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#A3A3A3] mt-6 max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <PricingTabs />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#555]">
              <span><span className="text-[#111] font-medium">{t("promo1")}</span> {t("promo1Text")}</span><span>·</span>
              <span><span className="text-[#9333EA] font-medium">{t("promo2")}</span> {t("promo2Text")}</span><span>·</span>
              <span><span className="text-[#111] font-medium">{t("promo3")}</span> {t("promo3Text")}</span>
            </div>
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">{t("includedEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">{t("includedTitle")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {included.map((f) => (
                <div key={f.t} className="card-light p-6">
                  <div className="font-display font-semibold text-[#111] mb-1">{f.t}</div>
                  <p className="text-sm text-[#555]">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="mb-10">
              <span className="eyebrow text-[#9333EA]">{t("faqEyebrow")}</span>
              <h2 className="font-display text-3xl font-medium mt-3 text-[#111]">{t("faqTitle")}</h2>
            </div>
            <FAQ items={faqs} />
          </div>
        </section>

        <section className="bg-black text-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-medium">{t("customTitle")}</h2>
            <p className="text-lg text-[#A3A3A3] mt-5 max-w-2xl mx-auto">{t("customSubtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a href="#" className="btn-primary">{t("customPrimary")}</a>
              <Link href={L("/comparisons")} className="btn-ghost text-white">{t("customSecondary")}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
