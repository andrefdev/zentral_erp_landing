import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const POSTS = [
  { tag: "Guía", title: "Cómo migrar de Defontana a Zentral en 2 semanas", excerpt: "Los 6 pasos que seguimos con +30 empresas para migrar contabilidad y maestros sin romper cierres.", date: "10 abr 2026", read: "8 min" },
  { tag: "Caso", title: "Consultora Andina: +47% productividad con Zentral Suite", excerpt: "Cómo reemplazaron HubSpot + Excel + Drive con un solo sistema y recuperaron 22 horas/semana.", date: "03 abr 2026", read: "6 min" },
  { tag: "Opinión", title: "Por qué un ERP sin CRM ya no tiene sentido en 2026", excerpt: "La venta es parte de la operación. Partir los datos entre sistemas es la raíz de 80% de los problemas operativos.", date: "27 mar 2026", read: "5 min" },
  { tag: "Guía", title: "SUNAT sin dolor: checklist para emisión electrónica", excerpt: "Todo lo que tu empresa necesita validar antes de activar facturación electrónica — probado en 120+ mypes.", date: "20 mar 2026", read: "10 min" },
  { tag: "Producto", title: "Zentral Capture ahora soporta Instagram DMs", excerpt: "Cómo funciona la nueva ingesta, qué datos capturamos y cómo se asignan leads automáticamente.", date: "14 mar 2026", read: "4 min" },
  { tag: "Benchmarks", title: "Cuánto tarda implementar un ERP en LATAM (2026)", excerpt: "Comparamos Odoo, SAP B1, Defontana y Zentral. Spoiler: la varianza es de 3 semanas a 6 meses.", date: "06 mar 2026", read: "7 min" },
];

export default async function Blog({
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
            <span className="eyebrow text-[#9333EA]">Blog</span>
            <h1 className="font-display text-5xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              Ideas, guías y benchmarks<br />
              <span className="text-[#A3A3A3]">para mypes B2B de LATAM.</span>
            </h1>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSTS.map((p) => (
              <article key={p.title} className="card-light p-7 flex flex-col">
                <span className="badge self-start">{p.tag}</span>
                <h2 className="font-display text-xl font-semibold text-[#111] mt-4 mb-3 leading-snug">{p.title}</h2>
                <p className="text-sm text-[#555] flex-1">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-[#888]">
                  <span>{p.date}</span>
                  <span>{p.read}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
