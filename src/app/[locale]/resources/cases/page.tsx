import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type Case = {
  vertical: string;
  company: string;
  metric: string;
  metricLabel: string;
  quote: string;
  stack: string[];
};

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Cases({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cases" });
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  const cases = t.raw("cases") as Case[];

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
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {cases.map((c) => (
              <article key={c.company} className="card-light p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge">{c.vertical}</span>
                  <div className="font-display text-[#111] font-semibold">{c.company}</div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-4xl font-medium text-[#9333EA]">{c.metric}</span>
                  <span className="text-sm text-[#555]">{c.metricLabel}</span>
                </div>
                <blockquote className="text-[#111]/80 italic mt-3 border-l-2 border-[#E5E7EB] pl-4">“{c.quote}”</blockquote>
                <div className="flex flex-wrap gap-2 mt-5">
                  {c.stack.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full border border-[#E5E7EB] text-xs font-medium">{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-t border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#111]">{t("ctaTitle")}</h2>
            <p className="text-[#555] mt-4 max-w-xl mx-auto">{t("ctaSubtitle")}</p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link href={L("/pricing")} className="btn-primary">{t("ctaPrimary")}</Link>
              <a href="https://indrox.com/es/contact" className="btn-ghost on-light text-[#111]">{t("ctaSecondary")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
