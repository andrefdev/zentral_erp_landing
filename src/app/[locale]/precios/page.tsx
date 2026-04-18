import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { PricingTabs } from "@/components/site/pricing-tabs";
import { FAQ } from "@/components/site/faq";

const FAQ_ITEMS = [
  { q: "¿Puedo cambiar de plan cuando quiera?", a: "Sí. Puedes hacer upgrade o downgrade en cualquier momento desde el panel de facturación. El cambio se prorratea al día." },
  { q: "¿Qué incluye el onboarding gratis?", a: "Migración de datos desde tu sistema actual (Excel, Defontana, HubSpot, Pipedrive), configuración inicial de módulos, 4 sesiones de training para tu equipo y 2 semanas de soporte dedicado." },
  { q: "¿El precio incluye IVA/IGV?", a: "No. Los precios están en USD sin impuestos. Si tu empresa está en Perú facturamos en PEN con IGV; en otros países facturamos USD." },
  { q: "¿Hay período de prueba?", a: "14 días de trial gratuito del plan Professional Suite sin tarjeta de crédito. Al terminar eliges plan o cancelas sin cargos." },
  { q: "¿Cómo se cuentan los usuarios?", a: "Por usuario activo en el mes. Usuarios solo-lectura o bots no cuentan. Puedes agregar más usuarios prorrateados." },
  { q: "¿Qué pasa con mis datos si cancelo?", a: "Tus datos se exportan en formato estándar (CSV + JSON) y quedan disponibles 90 días. Nunca compartimos tu información." },
];

export default async function Precios({
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
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] rounded-full px-4 py-1.5 text-xs text-[#A3A3A3] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
              Onboarding gratis incluido · 14 días de trial
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-medium leading-[1.05] tracking-[-0.02em]">
              Precios claros.<br /><span className="text-[#A3A3A3]">Sin letras chicas.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#A3A3A3] mt-6 max-w-2xl mx-auto">
              Empieza con la Suite o compra solo lo que necesitas. Todos los planes incluyen onboarding gratis y soporte en español.
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <PricingTabs />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#555]">
              <span><span className="text-[#111] font-medium">20% off</span> pago anual</span><span>·</span>
              <span><span className="text-[#9333EA] font-medium">25% off</span> primeros 50 clientes</span><span>·</span>
              <span><span className="text-[#111] font-medium">20% off</span> cross-sell ERP + CRM</span>
            </div>
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">Todo incluido</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">Lo que viene con cualquier plan.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { t: "Onboarding gratis", d: "Migración de datos, configuración inicial y training de tu equipo sin costo adicional." },
                { t: "Infraestructura AWS", d: "São Paulo (sa-east-1), backups diarios, 99.9% uptime y encriptación AES-256." },
                { t: "Soporte en español", d: "Chat y email de 9:00 a 19:00 GMT-5. Slack compartido desde el plan Professional." },
                { t: "SUNAT nativa (Perú)", d: "Emisión electrónica sin integradores. Boletas, facturas, NC/ND y envío automático." },
                { t: "Actualizaciones incluidas", d: "Lanzamos semanal. Lo nuevo llega automáticamente a tu cuenta, sin costos extra." },
                { t: "Sin downgrade fee", d: "Cambia de plan cuando quieras. Prorrateo al día; sin penalidades ni letra chica." },
              ].map((f) => (
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
              <span className="eyebrow text-[#9333EA]">FAQ precios</span>
              <h2 className="font-display text-3xl font-medium mt-3 text-[#111]">Preguntas de facturación.</h2>
            </div>
            <FAQ items={FAQ_ITEMS} />
          </div>
        </section>

        <section className="bg-black text-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-medium">¿Necesitas un plan a medida?</h2>
            <p className="text-lg text-[#A3A3A3] mt-5 max-w-2xl mx-auto">
              Para 25+ usuarios, multi-empresa o requisitos especiales (SSO, SLA premium, customización), hablamos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a href="#" className="btn-primary">Contactar ventas</a>
              <Link href={L("/comparativa")} className="btn-ghost text-white">Ver comparativa</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
