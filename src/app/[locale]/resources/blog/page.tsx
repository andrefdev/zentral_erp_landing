import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Blog({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = t.raw("posts") as { tag: string; title: string; excerpt: string; date: string; read: string }[];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="eyebrow text-[#9333EA]">{t("eyebrow")}</span>
            <h1 className="font-display text-5xl md:text-6xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              {t("titleLine1")}<br />
              <span className="text-[#A3A3A3]">{t("titleLine2")}</span>
            </h1>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p) => (
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
