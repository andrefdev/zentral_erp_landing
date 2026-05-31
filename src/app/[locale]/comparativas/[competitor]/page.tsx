import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, Minus, ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  COMPETITORS,
  ZENTRAL,
  getCompetitor,
  getCompetitorSlugs,
  type FeatureValue,
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
  const c = getCompetitor(competitor);
  if (!c) return {};

  const title = `Zentral vs ${c.name}: comparativa ${new Date().getFullYear()}`;
  const description = `Compara Zentral y ${c.name} lado a lado: precio, funcionalidades, IA, CRM e implementación. ${c.oneLiner}`;
  const canonical = `${BASE_URL}/${locale}/comparativas/${c.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}/comparativas/${c.slug}`])
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

function renderCell(v: FeatureValue, accent: boolean) {
  if (v === true)
    return (
      <Check
        size={18}
        className={`mx-auto ${accent ? "text-[#9333EA]" : "text-[#111]"}`}
      />
    );
  if (v === false) return <X size={18} className="mx-auto text-[#bbb]" />;
  if (v === "partial")
    return <span className="text-[#555] text-xs">Parcial</span>;
  return (
    <span
      className={`text-sm ${accent ? "text-[#9333EA] font-semibold" : "text-[#555]"}`}
    >
      {v}
    </span>
  );
}

export default async function ComparativaCompetidor({ params }: { params: Params }) {
  const { locale, competitor } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const c = getCompetitor(competitor);
  if (!c) notFound();
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  const canonical = `${BASE_URL}/${locale}/comparativas/${c.slug}`;
  const year = new Date().getFullYear();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/${locale}` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Comparativas",
          item: `${BASE_URL}/${locale}/comparativas`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `Zentral vs ${c.name}`,
          item: canonical,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: ZENTRAL.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: String(ZENTRAL.priceFromUsd),
        priceCurrency: "USD",
        url: `${BASE_URL}/${locale}/precios`,
        availability: "https://schema.org/InStock",
      },
      url: ZENTRAL.homepage,
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
      headline: `Zentral vs ${c.name}: comparativa ${year}`,
      description: c.oneLiner,
      author: { "@type": "Organization", name: "Zentral Suite", url: ZENTRAL.homepage },
      publisher: {
        "@type": "Organization",
        name: "Indrox",
        url: ZENTRAL.homepage,
      },
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
            <nav aria-label="Breadcrumb" className="text-sm text-[#A3A3A3] mb-6">
              <ol className="flex flex-wrap gap-2 items-center">
                <li>
                  <Link href={L("/")} className="hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li>
                  <Link href={L("/comparativas")} className="hover:text-white">
                    Comparativas
                  </Link>
                </li>
                <li aria-hidden>›</li>
                <li className="text-white">Zentral vs {c.name}</li>
              </ol>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              <span className="eyebrow text-[#9333EA]">Comparativa {year}</span>
              <h1 className="font-display text-4xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
                Zentral vs {c.name}
              </h1>
              <p className="text-lg text-[#A3A3A3] mt-6">{c.oneLiner}</p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link href={L("/precios")} className="btn-primary">
                  Ver planes Zentral
                </Link>
                <a
                  href="https://indrox.com/es/contact"
                  className="btn-ghost text-white"
                >
                  Agendar demo
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 border-b border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-wider text-[#555] mb-2">
                  Precio (10 usuarios)
                </div>
                <div className="font-display text-3xl text-[#111] font-medium">
                  USD ${ZENTRAL.priceFromUsd}
                </div>
                <div className="text-sm text-[#555] mt-1">vs {c.priceNote}</div>
              </div>
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-wider text-[#555] mb-2">
                  Implementación
                </div>
                <div className="font-display text-3xl text-[#111] font-medium">
                  {ZENTRAL.implementationWeeks}
                </div>
                <div className="text-sm text-[#555] mt-1">vs {c.implementationWeeks}</div>
              </div>
              <div className="card-light p-6">
                <div className="text-xs uppercase tracking-wider text-[#555] mb-2">
                  ERP + CRM + IA
                </div>
                <div className="font-display text-3xl text-[#9333EA] font-medium">
                  Sí, nativo
                </div>
                <div className="text-sm text-[#555] mt-1">{c.name}: no integrado</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">Comparación funcional</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                {c.name} vs Zentral, feature por feature.
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-4 pr-4 font-medium text-[#555]">
                      Funcionalidad
                    </th>
                    <th className="py-4 px-3 font-semibold bg-[#F3F0FF] text-[#9333EA] rounded-t-lg">
                      Zentral Suite
                    </th>
                    <th className="py-4 px-3 font-semibold text-[#555]">{c.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.features.map((f, idx) => (
                    <tr
                      key={f.label}
                      className={`border-t border-[#E5E7EB] ${idx % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}
                    >
                      <td className="text-left py-3 pr-4 text-[#111]">{f.label}</td>
                      <td className="py-3 px-3 text-center bg-[#F3F0FF]/40">
                        {renderCell(f.zentral, true)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {renderCell(f.competitor, false)}
                      </td>
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
                  Cuándo gana {c.name}
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
                  Cuándo gana Zentral
                </div>
                <p className="text-sm text-[#555] mb-4">{c.whenZentralWins}</p>
                <ul className="text-sm text-[#555] space-y-1.5">
                  {c.weaknesses.map((w) => (
                    <li key={w} className="flex gap-2">
                      <Minus size={16} className="text-[#9333EA] shrink-0 mt-0.5" />{" "}
                      {c.name} no resuelve: {w.toLowerCase()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="eyebrow text-[#9333EA]">Migración</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                Migrar de {c.name} a Zentral
              </h2>
              <p className="text-lg text-[#555] mt-5">{c.migrationNote}</p>
              <Link
                href={L("/precios")}
                className="mt-8 inline-flex items-center gap-2 text-[#9333EA] font-medium"
              >
                Ver planes y empezar migración <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-t border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">Preguntas frecuentes</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                Zentral vs {c.name} — preguntas frecuentes.
              </h2>
            </div>
            <div className="space-y-4 max-w-3xl">
              {c.faqs.map((f) => (
                <details
                  key={f.q}
                  className="card-light p-5 group"
                >
                  <summary className="cursor-pointer font-display font-semibold text-[#111] list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-[#9333EA] group-open:rotate-45 transition-transform">
                      +
                    </span>
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
              <span className="eyebrow text-[#9333EA]">Otras comparativas</span>
              <h2 className="font-display text-2xl md:text-3xl font-medium mt-2 text-[#111]">
                Compara Zentral con otras alternativas
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {COMPETITORS.filter((x) => x.slug !== c.slug).map((x) => (
                <Link
                  key={x.slug}
                  href={L(`/comparativas/${x.slug}`)}
                  className="text-sm px-4 py-2 rounded-full border border-[#E5E7EB] text-[#111] hover:border-[#9333EA] hover:text-[#9333EA] transition"
                >
                  Zentral vs {x.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black text-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-medium">
              ¿Listo para dejar {c.name}?
            </h2>
            <p className="text-lg text-[#A3A3A3] mt-5 max-w-2xl mx-auto">
              Onboarding incluido, migración asistida y plan único de USD $
              {ZENTRAL.priceFromUsd}/mes para 10 usuarios.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href={L("/precios")} className="btn-primary">
                Ver planes
              </Link>
              <a
                href="https://indrox.com/es/contact"
                className="btn-ghost text-white"
              >
                Agendar demo
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
