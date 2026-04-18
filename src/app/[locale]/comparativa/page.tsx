import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, Minus } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type Cell = true | false | "partial" | string;

const COLS = ["Zentral Suite", "Odoo", "Zoho One", "HubSpot", "Defontana"] as const;

const ROWS: { label: string; cells: [Cell, Cell, Cell, Cell, Cell] }[] = [
  { label: "ERP + CRM nativo (misma DB)", cells: [true, "partial", "partial", false, false] },
  { label: "Captura WhatsApp nativa", cells: [true, false, false, false, false] },
  { label: "Captura LinkedIn / IG / FB / X", cells: [true, false, false, "partial", false] },
  { label: "SUNAT electrónica (PE)", cells: [true, "Plugin", false, false, true] },
  { label: "IA operativa (ERP)", cells: [true, "partial", false, false, false] },
  { label: "IA conversacional (CRM)", cells: [true, false, false, "partial", false] },
  { label: "Asistente IA en Chrome", cells: [true, false, false, false, false] },
  { label: "Onboarding incluido", cells: [true, false, false, false, "partial"] },
  { label: "Tiempo de implementación", cells: ["< 3 sem", "3–6 meses", "1–2 meses", "2–4 sem", "1–3 meses"] },
  { label: "Precio 10 usuarios / mes", cells: ["$199", "$311+", "$370", "$800+", "$250"] },
  { label: "Personalización visual", cells: [true, "partial", false, false, false] },
  { label: "API + webhooks abiertos", cells: [true, true, true, true, "partial"] },
  { label: "Soporte en español LATAM", cells: [true, "partial", "partial", "partial", true] },
];

function renderCell(v: Cell, highlight: boolean) {
  const tone = highlight ? "text-[#9333EA]" : "text-[#555]";
  if (v === true) return <Check size={18} className={`mx-auto ${highlight ? "text-[#9333EA]" : "text-[#111]"}`} />;
  if (v === false) return <Minus size={18} className="mx-auto text-[#bbb]" />;
  if (v === "partial") return <span className="text-[#555] text-xs">Parcial</span>;
  return <span className={`text-sm ${highlight ? "text-[#9333EA] font-semibold" : "text-[#555]"}`}>{v}</span>;
}

export default async function Comparativa({
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
            <span className="eyebrow text-[#9333EA]">Comparativa</span>
            <h1 className="font-display text-5xl md:text-7xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              Zentral vs.<br /><span className="text-[#A3A3A3]">las alternativas.</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl mx-auto">
              Comparamos de frente. Si hay algo que Zentral no hace, lo decimos.
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-4 pr-4 font-medium text-[#555]">Funcionalidad</th>
                    {COLS.map((c, i) => (
                      <th
                        key={c}
                        className={`py-4 px-3 font-semibold ${
                          i === 0 ? "bg-[#F3F0FF] text-[#9333EA] rounded-t-lg" : "text-[#555]"
                        }`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r, idx) => (
                    <tr key={r.label} className={`border-t border-[#E5E7EB] ${idx % 2 === 1 ? "bg-[#FAFAFA]" : ""}`}>
                      <td className="text-left py-3 pr-4 text-[#111]">{r.label}</td>
                      {r.cells.map((c, i) => (
                        <td key={i} className={`py-3 px-3 text-center ${i === 0 ? "bg-[#F3F0FF]/40" : ""}`}>
                          {renderCell(c, i === 0)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-[#555] mt-6">
              USD $199/mes con 10 usuarios — <span className="text-[#111] font-medium">
                20% más barato que Odoo, 46% más barato que Zoho, 34% más barato que HubSpot.
              </span>
            </p>
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">Duelos 1 a 1</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">Cuándo Zentral gana.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  t: "vs. Odoo",
                  b: "Odoo es poderoso pero necesita consultoras y 3–6 meses. Zentral levanta en <3 semanas con onboarding incluido y precio 20% menor para 10 usuarios.",
                },
                {
                  t: "vs. Zoho One",
                  b: "Zoho tiene más apps pero cobra por usuario ($37/u) y la integración ERP-CRM no es nativa. Zentral cuesta $19.9/usuario y todo vive en la misma DB.",
                },
                {
                  t: "vs. HubSpot",
                  b: "HubSpot brilla en CRM pero no tiene ERP. Zentral te da ambos + IA en Chrome por un tercio del precio del Professional Hub.",
                },
                {
                  t: "vs. Defontana",
                  b: "Defontana resuelve contabilidad y SUNAT, pero no tiene CRM ni captura de leads ni IA. Zentral lo reemplaza y agrega la parte comercial.",
                },
                {
                  t: "vs. SAP Business One",
                  b: "SAP B1 arranca en USD $3K+ por licencia y requiere partners. Zentral cubre 80% de los procesos de una mype B2B a 5% del costo.",
                },
                {
                  t: "vs. Excel + WhatsApp",
                  b: "Gratis pero frágil. Zentral elimina el doble tipeo y las horas perdidas migrando datos entre hojas y chats.",
                },
              ].map((x) => (
                <div key={x.t} className="card-light p-6">
                  <div className="font-display font-semibold text-lg text-[#111] mb-2">{x.t}</div>
                  <p className="text-sm text-[#555]">{x.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black text-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-medium">¿Migrando desde otro sistema?</h2>
            <p className="text-lg text-[#A3A3A3] mt-5 max-w-2xl mx-auto">
              Tenemos importadores para Defontana, HubSpot, Pipedrive y Excel. Tu data entra limpia las primeras 2 semanas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link href={L("/precios")} className="btn-primary">Ver planes</Link>
              <a href="https://indrox.com/es/contact" className="btn-ghost text-white">Agendar demo</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
