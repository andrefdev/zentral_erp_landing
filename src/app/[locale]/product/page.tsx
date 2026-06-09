import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ProductCarousel, type Slide } from "@/components/product/product-carousel";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function Product({ params }: { params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "productPage" });

  const slides = t.raw("slides") as Slide[];

  return (
    <>
      <Navbar />
      <main>
        <section className="psec">
          <div className="psec-head">
            <span className="eyebrow"><span className="pulse" />{t("eyebrow")}</span>
            <h1 className="psec-h">{t("title")}</h1>
            <p className="psec-sub">{t("subtitle")}</p>
          </div>
          <div className="psec-body">
            <ProductCarousel slides={slides} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
