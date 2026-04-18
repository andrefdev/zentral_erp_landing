import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Trophy, FileCode2, GitCommit, ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export default async function Recursos({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;

  const HUBS = [
    {
      href: L("/recursos/blog"),
      Icon: BookOpen,
      title: "Blog",
      desc: "Guías prácticas, tendencias de ERP y CRM en LATAM, y mejores prácticas para mypes B2B.",
      cta: "Ver artículos",
    },
    {
      href: L("/recursos/casos"),
      Icon: Trophy,
      title: "Casos de éxito",
      desc: "Cómo agencias, consultoras y distribuidoras migraron a Zentral y qué resultados obtuvieron.",
      cta: "Ver casos",
    },
    {
      href: L("/recursos/documentacion"),
      Icon: FileCode2,
      title: "Documentación",
      desc: "Guías paso a paso para cada módulo del ERP y CRM, referencia de API y flujos recomendados.",
      cta: "Ir a docs",
    },
    {
      href: L("/recursos/changelog"),
      Icon: GitCommit,
      title: "Changelog",
      desc: "Qué lanzamos cada semana: nuevas features, mejoras y fixes del equipo de producto.",
      cta: "Ver cambios",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <span className="eyebrow text-[#9333EA]">Recursos</span>
            <h1 className="font-display text-5xl md:text-7xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              Aprende, explora,<br /><span className="text-[#A3A3A3]">implementa.</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl mx-auto">
              Todo lo que necesitas para sacar el máximo provecho de Zentral — desde guías para arrancar hasta casos reales de mypes LATAM.
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {HUBS.map(({ href, Icon, title, desc, cta }) => (
              <Link key={title} href={href} className="card-light p-8 flex flex-col group">
                <div className="w-12 h-12 rounded-xl bg-[#F3F0FF] text-[#9333EA] grid place-items-center mb-5">
                  <Icon size={22} />
                </div>
                <div className="font-display text-2xl font-semibold text-[#111] mb-2">{title}</div>
                <p className="text-[#555] mb-6 flex-1">{desc}</p>
                <span className="text-[#9333EA] font-medium text-sm flex items-center gap-1">
                  {cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">Recién publicado</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">Lo último del equipo.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { tag: "Blog", title: "Cómo migrar de Defontana a Zentral en 2 semanas", date: "10 abr 2026" },
                { tag: "Caso", title: "Consultora Andina: +47% productividad con Zentral Suite", date: "03 abr 2026" },
                { tag: "Changelog", title: "Nuevo: atribución multi-touch en Insights", date: "28 mar 2026" },
              ].map((p) => (
                <div key={p.title} className="card-light p-6">
                  <span className="badge">{p.tag}</span>
                  <h3 className="font-display text-xl font-semibold text-[#111] mt-4 mb-2">{p.title}</h3>
                  <div className="text-xs text-[#555]">{p.date}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
