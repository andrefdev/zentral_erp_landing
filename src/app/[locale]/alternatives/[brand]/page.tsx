import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getCompetitor,
  getCompetitorSlugs,
  getZentral,
  type Locale,
} from "@/lib/competitors";

const BASE_URL = "https://zentral.indrox.com";

type Params = Promise<{ locale: string; brand: string }>;

export function generateStaticParams() {
  const slugs = getCompetitorSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((brand) => ({ locale, brand }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, brand } = await params;
  const c = getCompetitor(brand, locale as Locale);
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "alternativeDetail" });
  const z = getZentral(locale as Locale);
  const year = new Date().getFullYear();
  const title = t("metaTitle", { name: c.name, year });
  const description = t("metaDescription", { name: c.name, price: z.priceFromUsd });
  const canonical = `${BASE_URL}/${locale}/alternatives/${c.slug}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}/alternatives/${c.slug}`])
      ),
    },
    openGraph: { title, description, url: canonical, type: "article" },
    robots: { index: true, follow: true },
  };
}

export default async function AlternativeDetail({ params }: { params: Params }) {
  const { locale, brand } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const c = getCompetitor(brand, locale as Locale);
  if (!c) notFound();
  const t = await getTranslations({ locale, namespace: "alternativeDetail" });
  const z = getZentral(locale as Locale);
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  const canonical = `${BASE_URL}/${locale}/alternatives/${c.slug}`;
  const year = new Date().getFullYear();

  const reasonTemplates = t.raw("reasons") as string[];
  const fmt = (s: string) =>
    s
      .replace("{zentralWeeks}", z.implementationWeeks)
      .replace("{weeks}", c.implementationWeeks)
      .replace("{name}", c.name)
      .replace("{price}", String(z.priceFromUsd))
      .replace("{priceNote}", c.priceNote);
  const reasons = reasonTemplates.map(fmt);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: t("metaTitle", { name: c.name, year }),
      description: c.oneLiner,
      author: { "@type": "Organization", name: "Zentral Suite", url: z.homepage },
      publisher: { "@type": "Organization", name: "Indrox", url: z.homepage },
      mainEntityOfPage: canonical,
      datePublished: `${year}-01-01`,
      dateModified: new Date().toISOString().slice(0, 10),
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.slice(0, 3).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="eyebrow text-[#9333EA]">{t("eyebrow", { name: c.name })}</span>
            <h1 className="font-display text-4xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em] text-white">
              {t("title", { name: c.name, year })}
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6">{t("subtitle", { name: c.name })}</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href={L("/pricing")} className="btn-primary">{t("primaryCta")}</Link>
              <Link href={L(`/comparisons/${c.slug}`)} className="btn-ghost text-white">
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="eyebrow text-[#9333EA]">{t("reasonsEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                {t("reasonsTitle", { name: c.name })}
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasons.map((r) => (
                <li key={r} className="card-light p-5 flex gap-3">
                  <Check size={20} className="text-[#9333EA] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#111]">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="eyebrow text-[#9333EA]">{t("migrationEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                {t("migrationTitle", { name: c.name })}
              </h2>
              <p className="text-lg text-[#555] mt-5">{c.migrationNote}</p>
              <Link
                href={L(`/comparisons/${c.slug}`)}
                className="mt-8 inline-flex items-center gap-2 text-[#9333EA] font-medium"
              >
                {t("migrationCta")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="eyebrow text-[#9333EA]">{t("faqEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                {t("faqTitle", { name: c.name })}
              </h2>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              {c.faqs.slice(0, 3).map((f) => (
                <details key={f.q} className="card-light p-5 group">
                  <summary className="cursor-pointer font-display font-semibold text-[#111] list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-[#9333EA] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-[#555] mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black text-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-medium">{t("finalTitle", { name: c.name })}</h2>
            <p className="text-lg text-[#A3A3A3] mt-5 max-w-2xl mx-auto">
              {t("finalSubtitle", { price: z.priceFromUsd })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href={L("/pricing")} className="btn-primary">{t("finalPrimary")}</Link>
              <a href="https://indrox.com/es/contact" className="btn-ghost text-white">{t("finalSecondary")}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
