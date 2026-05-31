import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  COMPETITORS,
  ZENTRAL,
  getCompetitor,
  getCompetitorSlugs,
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
  const c = getCompetitor(brand);
  if (!c) return {};
  const title = `Mejor alternativa a ${c.name} en ${new Date().getFullYear()} | Zentral`;
  const description = `¿Buscas una alternativa a ${c.name}? Zentral Suite es un ERP + CRM con IA, listo en menos de 3 semanas, por USD $${ZENTRAL.priceFromUsd}/mes.`;
  const canonical = `${BASE_URL}/${locale}/alternativas/${c.slug}`;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}/alternativas/${c.slug}`])
      ),
    },
    openGraph: { title, description, url: canonical, type: "article" },
    robots: { index: true, follow: true },
  };
}

export default async function AlternativaMarca({ params }: { params: Params }) {
  const { locale, brand } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const c = getCompetitor(brand);
  if (!c) notFound();
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  const canonical = `${BASE_URL}/${locale}/alternativas/${c.slug}`;
  const year = new Date().getFullYear();

  const reasons = [
    `Implementación en ${ZENTRAL.implementationWeeks} vs ${c.implementationWeeks} de ${c.name}.`,
    `Precio fijo USD $${ZENTRAL.priceFromUsd}/mes para 10 usuarios (vs ${c.priceNote}).`,
    `ERP + CRM en la misma base de datos, sin sincronizaciones frágiles.`,
    `IA operativa y conversacional incluidas, no como extra.`,
    `Captura de leads desde WhatsApp y redes sociales nativa.`,
    `Onboarding y migración desde ${c.name} incluidos.`,
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/${locale}` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Alternativas",
          item: `${BASE_URL}/${locale}/alternativas`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `Alternativa a ${c.name}`,
          item: canonical,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Mejor alternativa a ${c.name} en ${year}`,
      description: c.oneLiner,
      author: { "@type": "Organization", name: "Zentral Suite", url: ZENTRAL.homepage },
      publisher: { "@type": "Organization", name: "Indrox", url: ZENTRAL.homepage },
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
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center max-w-3xl">
            <span className="eyebrow text-[#9333EA]">Alternativa a {c.name}</span>
            <h1 className="font-display text-4xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              La mejor alternativa a {c.name} en {year}.
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6">
              Zentral Suite reemplaza a {c.name} con ERP + CRM + IA en una sola plataforma, lista en
              menos de 3 semanas y a menor costo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href={L("/precios")} className="btn-primary">
                Ver planes
              </Link>
              <Link
                href={L(`/comparativas/${c.slug}`)}
                className="btn-ghost text-white"
              >
                Comparativa completa
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">Por qué elegir Zentral</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                6 razones para cambiar {c.name} por Zentral.
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
            <div className="max-w-3xl">
              <span className="eyebrow text-[#9333EA]">Migración</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                Migrar desde {c.name}: qué pasa con tu data.
              </h2>
              <p className="text-lg text-[#555] mt-5">{c.migrationNote}</p>
              <Link
                href={L(`/comparativas/${c.slug}`)}
                className="mt-8 inline-flex items-center gap-2 text-[#9333EA] font-medium"
              >
                Ver comparativa funcional completa <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="eyebrow text-[#9333EA]">Preguntas frecuentes</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">
                Sobre cambiarse desde {c.name}.
              </h2>
            </div>
            <div className="space-y-4 max-w-3xl">
              {c.faqs.slice(0, 3).map((f) => (
                <details key={f.q} className="card-light p-5 group">
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

        <section className="bg-black text-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-medium">
              Migra desde {c.name} este mes.
            </h2>
            <p className="text-lg text-[#A3A3A3] mt-5 max-w-2xl mx-auto">
              Onboarding y migración incluidos. USD ${ZENTRAL.priceFromUsd}/mes para 10 usuarios.
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
