import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { StructuredData } from "@/components/structured-data";

import { Hero } from "@/components/sections/hero";
import { LogoBar } from "@/components/sections/logo-bar";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Features } from "@/components/sections/features";
import { Stats } from "@/components/sections/stats";
import { AiHighlight } from "@/components/sections/ai-highlight";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { BeforeAfter } from "@/components/sections/before-after";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/cta-footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Problem />
        <Solution />
        <Features />
        <Stats />
        <AiHighlight />
        <Comparison />
        <Pricing />
        <BeforeAfter />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
