import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const CASES = [
  {
    vertical: "Agencia digital",
    company: "Tripel",
    metric: "+47%",
    metricLabel: "productividad equipo PM",
    quote: "Reemplazamos 5 herramientas con Zentral. Los PMs recuperaron 22h/semana que se iban copiando data.",
    stack: ["Work", "People", "Finance", "CRM"],
  },
  {
    vertical: "Consultora",
    company: "Consultora Andina",
    metric: "$12.4K",
    metricLabel: "primer deal cerrado desde WhatsApp",
    quote: "Zentral Capture nos convirtió conversaciones de WhatsApp en deals reales. El onboarding tomó 11 días.",
    stack: ["CRM", "Docs", "Finance"],
  },
  {
    vertical: "Distribuidora B2B",
    company: "Molina & Co.",
    metric: "−78%",
    metricLabel: "errores de inventario",
    quote: "La factura SUNAT se genera automática cuando el deal cierra. Stock y contabilidad al día sin data entry.",
    stack: ["Stock", "Finance", "CRM"],
  },
  {
    vertical: "SaaS B2B",
    company: "Conecta+",
    metric: "3.2x",
    metricLabel: "velocidad de cobranza",
    quote: "Zentral Pay corre las suscripciones solas. Pasamos de cobrar en 45 días a 14 días promedio.",
    stack: ["Pay", "Finance", "CRM"],
  },
  {
    vertical: "Agencia boutique",
    company: "Indrox",
    metric: "100%",
    metricLabel: "horas facturables trackeadas",
    quote: "El tiempo de consultor entra al proyecto en Work y sale directo en la factura mensual. Cero fugas.",
    stack: ["Work", "People", "Finance"],
  },
  {
    vertical: "Retail B2B",
    company: "Andina Co.",
    metric: "< 3 sem",
    metricLabel: "onboarding completo",
    quote: "Migramos desde Defontana + HubSpot + Excel sin perder cierres contables ni histórico de deals.",
    stack: ["ERP", "CRM", "Capture"],
  },
];

export default async function Casos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="eyebrow text-[#9333EA]">Casos de éxito</span>
            <h1 className="font-display text-5xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              Historias reales.<br />
              <span className="text-[#A3A3A3]">Números reales.</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl">
              120+ empresas LATAM dejaron Excel, Odoo, Defontana y HubSpot por Zentral. Estos son algunos.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {CASES.map((c) => (
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
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#111]">¿Quieres ser el próximo caso?</h2>
            <p className="text-[#555] mt-4 max-w-xl mx-auto">
              Los primeros 50 clientes tienen 25% off el primer año y onboarding prioritario con el equipo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link href={L("/precios")} className="btn-primary">Ver planes</Link>
              <a href="https://indrox.com/es/contact" className="btn-ghost on-light text-[#111]">Agendar demo</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
