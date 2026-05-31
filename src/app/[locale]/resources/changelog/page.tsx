import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

type Tag = "Feature" | "Improvement" | "Fix";
type Entry = { date: string; version: string; tag: Tag; title: string; items: string[] };

const TAG_STYLE: Record<Tag, string> = {
  Feature: "bg-[#F3F0FF] text-[#9333EA]",
  Improvement: "bg-[#E6F7EC] text-[#067F3B]",
  Fix: "bg-[#FFF7E6] text-[#B26A00]",
};

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function Changelog({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "changelog" });
  const entries = t.raw("entries") as Entry[];
  const tagLabel: Record<Tag, string> = {
    Feature: t("tagFeature"),
    Improvement: t("tagImprovement"),
    Fix: t("tagFix"),
  };

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
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl">{t("subtitle")}</p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-5">
            {entries.map((e) => (
              <article key={e.version} className="card-light p-7">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className={`${TAG_STYLE[e.tag]} px-2 py-0.5 rounded-md text-xs font-medium`}>
                    {tagLabel[e.tag]}
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
