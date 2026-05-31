import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  impl: string;
  for: string;
  features: string[];
  cta: string;
  featured?: boolean;
  ctaVariant: "primary" | "ghost";
};

export async function Pricing() {
  const t = await getTranslations("landing.pricingSection");
  const plans = t.raw("plans") as Plan[];
  const trust = t.raw("trust") as string[];

  return (
    <section className="section" id="precios">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">{t("eyebrow")}</span>
          <h2 className="h2 h2--lg">{t("title")}</h2>
        </div>

        <div className="plans">
          {plans.map((p) => {
            const isText = !p.priceSuffix;
            return (
              <article className={`plan ${p.featured ? "is-featured" : ""}`} key={p.name}>
                {p.featured && <span className="plan-tag">{t("mostPopular")}</span>}
                <div className="plan-name">{p.name}</div>
                <div className={`plan-price ${isText ? "is-text" : ""}`}>
                  {p.price}
                  {p.priceSuffix && <span className="cad">{p.priceSuffix}</span>}
                </div>
                <div className="plan-impl">{p.impl}</div>
                <p className="plan-for">{p.for}</p>
                <ul className="plan-feats" role="list">
                  {p.features.map((f) => (
                    <li key={f}><Check size={14} />{f}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${p.ctaVariant === "primary" ? "btn--primary" : "btn--ghost"}`}
                  href="https://indrox.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.cta}
                </a>
              </article>
            );
          })}
        </div>

        <div className="price-trust">
          {trust.map((x) => (
            <span key={x}><Check size={14} />{x}</span>
          ))}
        </div>
        <p className="price-addons">{t("addons")}</p>
      </div>
    </section>
  );
}
