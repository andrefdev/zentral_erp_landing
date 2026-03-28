import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
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
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <StructuredData />
      <main>
        <ScrollProgress />
        <Navbar dict={dict.nav} lang={lang} />
        <Hero dict={dict.hero} />
        <Problem dict={dict.problem} />
        <Solution dict={dict.solution} />
        <Customization dict={dict.customization} />
        <Comparison dict={dict.comparison} />
        <Pricing dict={dict.pricing} />
        <Roadmap dict={dict.roadmap} />
        <WhyZentral dict={dict.whyZentral} />
        <Trust dict={dict.trust} />
        <CTAFooter dict={{ cta: dict.cta, footer: dict.footer }} lang={lang} />
      </main>
    </>
  );
}
