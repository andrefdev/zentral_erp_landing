import { Check } from "lucide-react";
import { plans, pricingTrust, pricingAddons } from "@/config/pricing";

export function Pricing() {
  return (
    <section className="section" id="precios">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">Precios</span>
          <h2 className="h2 h2--lg">Inversión que se paga sola.</h2>
        </div>

        <div className="plans">
          {plans.map((p) => {
            const isText = !p.priceSuffix;
            return (
              <article className={`plan ${p.featured ? "is-featured" : ""}`} key={p.name}>
                {p.featured && <span className="plan-tag">Más popular</span>}
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
          {pricingTrust.map((t) => (
            <span key={t}><Check size={14} />{t}</span>
          ))}
        </div>
        <p className="price-addons">{pricingAddons}</p>
      </div>
    </section>
  );
}
