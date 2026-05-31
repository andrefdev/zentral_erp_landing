import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getCompetitor,
  getCompetitors,
  getCompetitorSlugs,
  getZentral,
  type Locale,
} from "@/lib/competitors";

const BASE_URL = "https://zentral.indrox.com";

type Params = Promise<{ locale: string; competitor: string }>;

export function generateStaticParams() {
  const slugs = getCompetitorSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((competitor) => ({ locale, competitor }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, competitor } = await params;
  const c = getCompetitor(competitor, locale as Locale);
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "compareDetail" });
  const year = new Date().getFullYear();

  const title = t("metaTitle", { name: c.name, year });
  const description = `${t("metaDescriptionLead", { name: c.name })} ${c.oneLiner}`;
  const canonical = `${BASE_URL}/${locale}/comparisons/${c.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}/comparisons/${c.slug}`])
      ),
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: "Zentral Suite",
      locale: locale === "es" ? "es_LA" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

function renderCell(v: true | false | "partial" | string, accent: boolean, partialLabel: string) {
  if (v === true)
    return <Check size={18} className={`mx-auto ${accent ? "text-[#9333EA]" : "text-[#111]"}`} />;
  if (v === false) return <X size={18} className="mx-auto text-[#bbb]" />;
  if (v === "partial") return <span className="text-[#555] text-xs">{partialLabel}</span>;
  return (
    <span className={`text-sm ${accent ? "text-[#9333EA] font-semibold" : "text-[#555]"}`}>
      {v}
    </span>
  );
}

export default async function ComparisonDetail({ params }: { params: Params }) {
  const { locale, competitor } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const c = getCompetitor(competitor, locale as Locale);
  if (!c) notFound();
  const t = await getTranslations({ locale, namespace: "compareDetail" });
  const z = getZentral(locale as Locale);
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  const canonical = `${BASE_URL}/${locale}/comparisons/${c.slug}`;
  const year = new Date().getFullYear();
  const allCompetitors = getCompetitors(locale as Locale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: z.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: String(z.priceFromUsd),
        priceCurrency: "USD",
        url: `${BASE_URL}/${locale}/pricing`,
        availability: "https://schema.org/InStock",
      },
      url: z.homepage,
      description: `ERP + CRM con IA, alternativa moderna a ${c.name}.`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
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
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="eyebrow text-[#9333EA]">{t("eyebrow", { year })}</span>
              <h1 className="font-display text-4xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em] text-white">
                {t("title", { name: c.name })}
              </h1>
              <p className="text-lg text-[#A3A3A3] mt-6">{c.oneLiner}</p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link href={L("/pricing")} className="btn-primary">{t("primaryCta")}</Link>
                <a href="https://indrox.com/es/contact" className="btn-ghost text-white">
                  {t("secondaryCta")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 border-b border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-wider text-[#555] mb-2">{t("kpiPrice")}</div>
                <div className="font-display text-3xl text-[#111] font-medium">USD ${z.priceFromUsd}</div>
                <div className="text-sm text-[#555] mt-1">{t("kpiPriceVs", { priceNote: c.priceNote })}</div>
              </div>
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-wider text-[#555] mb-2">{t("kpiImpl")}</div>
                <div className="font-display text-3xl text-[#111] font-medium">{z.implementationWeeks}</div>
                <div className="text-sm text-[#555] mt-1">{t("kpiImplVs", { weeks: c.implementationWeeks })}</div>
              </div>
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-wider text-[#555] mb-2">{t("kpiSuite")}</div>
                <div className="font-display text-3xl text-[#9333EA] font-medium">{t("kpiSuiteValue")}</div>
                <div className="text-sm text-[#555] mt-1">{t("kpiSuiteVs", { name: c.name })}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="eyebrow text-[#9333EA]">{t("compareEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                {t("compareTitle", { name: c.name })}
              </h2>
            </div>
            <div className="overflow-x-auto md:overflow-visible">
              <table className="w-full border-collapse text-sm min-w-[560px] md:min-w-0">
                <thead>
                  <tr>
                    <th className="text-left py-4 pr-4 font-medium text-[#555]">{t("tableFeature")}</th>
                    <th className="py-4 px-3 font-semibold bg-[#F3F0FF] text-[#9333EA] rounded-t-lg">Zentral Suite</th>
                    <th className="py-4 px-3 font-semibold text-[#555]">{c.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.features.map((f, idx) => (
                    <tr key={f.label} className={`border-t border-[#E5E7EB] ${idx % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}>
                      <td className="text-left py-3 pr-4 text-[#111]">{f.label}</td>
                      <td className="py-3 px-3 text-center bg-[#F3F0FF]/40">{renderCell(f.zentral, true, t("tablePartial"))}</td>
                      <td className="py-3 px-3 text-center">{renderCell(f.competitor, false, t("tablePartial"))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card-light p-6">
                <div className="font-display font-semibold text-lg text-[#111] mb-2">
                  {t("winsTheyTitle", { name: c.name })}
                </div>
                <p className="text-sm text-[#555] mb-4">{c.whenTheyWin}</p>
                <ul className="text-sm text-[#555] space-y-1.5">
                  {c.strengths.map((s) => (
                    <li key={s} className="flex gap-2">
                      <Check size={16} className="text-[#111] shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-light p-6 border-[#9333EA]/30">
                <div className="font-display font-semibold text-lg text-[#9333EA] mb-2">
                  {t("winsZentralTitle")}
                </div>
                <p className="text-sm text-[#555] mb-4">{c.whenZentralWins}</p>
                <ul className="text-sm text-[#555] space-y-1.5">
                  {c.weaknesses.map((w) => (
                    <li key={w} className="flex gap-2">
                      <Minus size={16} className="text-[#9333EA] shrink-0 mt-0.5" />{" "}
                      {t("doesNotSolve", { name: c.name, item: w.toLowerCase() })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="eyebrow text-[#9333EA]">{t("migrationEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                {t("migrationTitle", { name: c.name })}
              </h2>
              <p className="text-lg text-[#555] mt-5">{c.migrationNote}</p>
              <Link href={L("/pricing")} className="mt-8 inline-flex items-center gap-2 text-[#9333EA] font-medium">
                {t("migrationCta")} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-t border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="eyebrow text-[#9333EA]">{t("faqEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                {t("faqTitle", { name: c.name })}
              </h2>
            </div>
            <div className="space-y-4 max-w-3xl mx-auto">
              {c.faqs.map((f) => (
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

        <section className="bg-white py-16 border-t border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="mb-6">
              <span className="eyebrow text-[#9333EA]">{t("otherEyebrow")}</span>
              <h2 className="font-display text-2xl md:text-3xl font-medium mt-2 text-[#111]">
                {t("otherTitle")}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {allCompetitors.filter((x) => x.slug !== c.slug).map((x) => (
                <Link
                  key={x.slug}
                  href={L(`/comparisons/${x.slug}`)}
                  className="text-sm px-4 py-2 rounded-full border border-[#E5E7EB] text-[#111] hover:border-[#9333EA] hover:text-[#9333EA] transition"
                >
                  {t("otherChip", { name: x.name })}
                </Link>
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
