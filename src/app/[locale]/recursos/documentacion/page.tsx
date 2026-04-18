import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import {
  Users, Calendar, FileText, HardDrive, Package, DollarSign,
  CreditCard, Sparkles, MessageSquare, BarChart3, Code2, Webhook,
} from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const SECTIONS = [
  {
    title: "Primeros pasos",
    items: [
      "Crea tu cuenta y elige plan",
      "Invita a tu equipo y asigna roles",
      "Importa datos desde Excel, Defontana o HubSpot",
      "Configura tu primer flujo ERP + CRM",
      "Integra WhatsApp Business",
    ],
  },
  {
    title: "Módulos ERP",
    items: ["Zentral People", "Zentral Work", "Zentral Docs", "Zentral Drive", "Zentral Stock", "Zentral Finance (SUNAT)", "Zentral Pay", "Zentral AI operativa"],
    icons: [Users, Calendar, FileText, HardDrive, Package, DollarSign, CreditCard, Sparkles],
  },
  {
    title: "Módulos CRM",
    items: ["Captura (WhatsApp, LinkedIn, IG, X, FB)", "Pipeline y deals", "Outreach y secuencias", "Insights y atribución", "Asistente IA en Chrome", "Playbooks y lead scoring"],
    icons: [MessageSquare, BarChart3, MessageSquare, BarChart3, Sparkles, Sparkles],
  },
  {
    title: "Desarrolladores",
    items: ["API REST v1", "Webhooks", "OAuth 2.0", "Eventos y automatizaciones", "Zentral CLI", "Rate limits y sandbox"],
    icons: [Code2, Webhook, Code2, Code2, Code2, Code2],
  },
];

export default async function Documentacion({
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
            <span className="eyebrow text-[#9333EA]">Documentación</span>
            <h1 className="font-display text-5xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              Todo lo que tu equipo<br />
              <span className="text-[#A3A3A3]">necesita aprender.</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl">
              Guías paso a paso, referencia de API y flujos recomendados para cada vertical.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SECTIONS.map((s) => (
              <div key={s.title} className="card-light p-7">
                <div className="font-display text-2xl font-semibold text-[#111] mb-5">{s.title}</div>
                <ul className="space-y-2">
                  {s.items.map((it, i) => {
                    const Ico = s.icons?.[i];
                    return (
                      <li key={it}>
                        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F3F0FF] text-[#111] text-sm transition">
                          {Ico ? <Ico size={16} className="text-[#9333EA]" /> : <span className="text-[#9333EA]">●</span>}
                          {it}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-t border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-medium text-[#111]">¿No encuentras lo que buscas?</h2>
            <p className="text-[#555] mt-3 max-w-xl mx-auto">
              Chat de soporte en español de 9:00 a 19:00 GMT-5. Slack compartido desde Professional.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <a href="#" className="btn-primary">Chat con soporte</a>
              <a href="#" className="btn-ghost on-light text-[#111]">Ver API reference</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
