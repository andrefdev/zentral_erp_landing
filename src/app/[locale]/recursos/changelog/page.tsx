import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type Entry = { date: string; version: string; tag: "Feature" | "Improvement" | "Fix"; title: string; items: string[] };

const ENTRIES: Entry[] = [
  {
    date: "15 abr 2026", version: "v3.8.0", tag: "Feature", title: "Atribución multi-touch en Insights",
    items: [
      "Nuevo modelo de atribución data-driven basado en el deal cerrado.",
      "Visualización por canal, campaña y fase del funnel.",
      "Export a CSV y Looker Studio desde el dashboard.",
    ],
  },
  {
    date: "08 abr 2026", version: "v3.7.2", tag: "Improvement", title: "Zentral Capture soporta Instagram DMs",
    items: [
      "Ingesta automática de DMs desde cuentas Business.",
      "Scoring inicial con IA basado en el primer mensaje.",
      "Asignación round-robin configurable por equipo.",
    ],
  },
  {
    date: "01 abr 2026", version: "v3.7.1", tag: "Fix", title: "Conciliación bancaria — edge cases BCP",
    items: [
      "Corregido el parseo de extractos con múltiples monedas.",
      "Reintento automático ante timeouts del banco.",
    ],
  },
  {
    date: "25 mar 2026", version: "v3.7.0", tag: "Feature", title: "Zentral AI · Playbook dinámico",
    items: [
      "El asistente de Chrome ahora personaliza respuestas por fase del deal.",
      "Biblioteca de playbooks compartida por equipo.",
      "Métricas de uso y adopción por rep.",
    ],
  },
  {
    date: "18 mar 2026", version: "v3.6.4", tag: "Improvement", title: "Finance — cierre contable 40% más rápido",
    items: [
      "Agrupación de asientos por centro de costo.",
      "Nuevo reporte de antigüedad de saldos.",
    ],
  },
  {
    date: "11 mar 2026", version: "v3.6.3", tag: "Fix", title: "Work · drag & drop en tableros grandes",
    items: [
      "Performance mejorada para tableros con >500 tareas.",
      "Estado del drag restaurado tras refresh.",
    ],
  },
];

const TAG_STYLE: Record<Entry["tag"], string> = {
  Feature: "bg-[#F3F0FF] text-[#9333EA]",
  Improvement: "bg-[#E6F7EC] text-[#067F3B]",
  Fix: "bg-[#FFF7E6] text-[#B26A00]",
};

export default async function Changelog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="eyebrow text-[#9333EA]">Changelog</span>
            <h1 className="font-display text-5xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              Qué lanzamos<br />
              <span className="text-[#A3A3A3]">cada semana.</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl">
              Construimos rápido. Esta es la bitácora pública del equipo de producto.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-5">
            {ENTRIES.map((e) => (
              <article key={e.version} className="card-light p-7">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className={`badge ${TAG_STYLE[e.tag]}`} style={{ background: "transparent" }}>
                    <span className={`${TAG_STYLE[e.tag]} px-2 py-0.5 rounded-md`}>{e.tag}</span>
                  </span>
                  <span className="text-xs text-[#888]">{e.date}</span>
                  <span className="text-xs text-[#888]">·</span>
                  <span className="text-xs font-mono text-[#9333EA]">{e.version}</span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-[#111] mb-3">{e.title}</h2>
                <ul className="space-y-2 text-[#555] text-sm">
                  {e.items.map((it) => (
                    <li key={it} className="flex gap-2"><span className="text-[#9333EA] flex-shrink-0">→</span>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
