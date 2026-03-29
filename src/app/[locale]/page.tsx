import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { StructuredData } from "@/components/structured-data";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Customization } from "@/components/sections/customization";
import { Comparison } from "@/components/sections/comparison";
import { Pricing } from "@/components/sections/pricing";
import { Roadmap } from "@/components/sections/roadmap";
import { WhyZentral } from "@/components/sections/why-zentral";
import { Trust } from "@/components/sections/trust";
import { CTAFooter } from "@/components/sections/cta-footer";

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
      <main>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <Problem />
        <Solution />
        <Customization />
        <Comparison />
        <Pricing />
        <Roadmap />
        <WhyZentral />
        <Trust />
        <CTAFooter />
      </main>
    </>
  );
}
