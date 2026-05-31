import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Trophy, FileCode2, GitCommit, ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const HUB_HREF: Record<string, string> = {
  blog: "/resources/blog",
  cases: "/resources/cases",
  docs: "/resources/docs",
  changelog: "/resources/changelog",
};
const HUB_ICON = { blog: BookOpen, cases: Trophy, docs: FileCode2, changelog: GitCommit };

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resourcesHub" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ResourcesHub({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "resourcesHub" });
  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;
  const hubs = t.raw("hubs") as { key: keyof typeof HUB_ICON; title: string; desc: string; cta: string }[];
  const recent = t.raw("recent") as { tag: string; title: string; date: string }[];

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-black text-white pt-32 pb-16 border-b border-[#262626]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <span className="eyebrow text-[#9333EA]">{t("eyebrow")}</span>
            <h1 className="font-display text-5xl md:text-7xl font-medium mt-4 leading-[1.05] tracking-[-0.02em]">
              {t("titleLine1")}<br /><span className="text-[#A3A3A3]">{t("titleLine2")}</span>
            </h1>
            <p className="text-lg text-[#A3A3A3] mt-6 max-w-2xl mx-auto">{t("subtitle")}</p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {hubs.map((h) => {
              const Icon = HUB_ICON[h.key];
              return (
                <Link key={h.key} href={L(HUB_HREF[h.key])} className="card-light p-8 flex flex-col group">
                  <div className="w-12 h-12 rounded-xl bg-[#F3F0FF] text-[#9333EA] grid place-items-center mb-5">
                    <Icon size={22} />
                  </div>
                  <div className="font-display text-2xl font-semibold text-[#111] mb-2">{h.title}</div>
                  <p className="text-[#555] mb-6 flex-1">{h.desc}</p>
                  <span className="text-[#9333EA] font-medium text-sm flex items-center gap-1">
                    {h.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="bg-[#FAFAFA] py-20 border-y border-[#E5E7EB]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="eyebrow text-[#9333EA]">{t("recentEyebrow")}</span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 text-[#111]">{t("recentTitle")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recent.map((p) => (
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
