import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getCompetitors, type Locale } from "@/lib/competitors";

const BASE_URL = "https://zentral.indrox.com";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comparisonsHub" });
  const title = `${t("metaTitle")} (${new Date().getFullYear()})`;
  const description = t("metaDescription");
  const canonical = `${BASE_URL}/${locale}/comparisons`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}/comparisons`])
      ),
    },
    openGraph: { title, description, url: canonical, type: "website" },
    robots: { index: true, follow: true },
  };
}

export default async function ComparisonsHub({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "comparisonsHub" });
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  const competitors = getCompetitors(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("schemaName"),
    url: `${BASE_URL}/${locale}/comparisons`,
    hasPart: competitors.map((c) => ({
      "@type": "Article",
      headline: `Zentral vs ${c.name}`,
      url: `${BASE_URL}/${locale}/comparisons/${c.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <span className="eyebrow text-[#9333EA]">{t("eyebrow")}</span>
            <h1 className="font-display text-5xl md:text-7xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              {t("titleLine1")}<br />
              <span className="text-[#A3A3A3]">{t("titleLine2")}</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl mx-auto">{t("subtitle")}</p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {competitors.map((c) => (
                <Link
                  key={c.slug}
                  href={L(`/comparisons/${c.slug}`)}
                  className="card-light p-6 hover:border-[#9333EA] transition group"
                >
                  <div className="text-xs uppercase tracking-wider text-[#9333EA] mb-2">
                    {c.category}
                  </div>
                  <div className="font-display text-2xl text-[#111] font-medium mb-2">
                    {t("comparativaLabel", { name: c.name })}
                  </div>
                  <p className="text-sm text-[#555] mb-4">{c.shortPitch}</p>
                  <div className="flex items-center gap-1 text-sm text-[#9333EA] font-medium">
                    {t("cardCta")}{" "}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
