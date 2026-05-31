import { ArrowDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HeroMock } from "./hero-mock";
import { Waitlist } from "./waitlist";

export async function Hero() {
  const t = await getTranslations("landing.hero");
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow"><span className="pulse" />{t("eyebrow")}</span>
          <h1 className="hero-h">
            {t("titleStart")} <span className="hi">{t("titleHighlight")}</span>
            <br />{t("titleEnd")}
          </h1>
          <p className="hero-sub">{t("subtitle")}</p>
          <Waitlist />
          <div className="hero-cta">
            <a className="btn btn--ghost btn--lg" href="#solucion">
              {t("ctaHowItWorks")} <ArrowDown size={16} />
            </a>
            <a className="btn btn--ghost btn--lg" href="https://indrox.com/contact" target="_blank" rel="noopener noreferrer">
              {t("ctaDemo")}
            </a>
          </div>
          <div className="hero-trust">
            <span>{t("trust1")}</span><span className="dot" />
            <span>{t("trust2")}</span><span className="dot" />
            <span>{t("trust3")}</span>
          </div>
        </div>
        <HeroMock />
      </div>
    </section>
  );
}
