import { ArrowDown } from "lucide-react";
import { HeroMock } from "./hero-mock";
import { Waitlist } from "./waitlist";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow"><span className="pulse" />Suite empresarial con IA para LATAM</span>
          <h1 className="hero-h">
            El ERP que <span className="hi">trabaja</span>
            <br />por ti.
          </h1>
          <p className="hero-sub">
            Más rápido de implementar que SAP. Más moderno que Odoo. Hecho a medida para tu operación real.
          </p>
          <Waitlist />
          <div className="hero-cta">
            <a className="btn btn--ghost btn--lg" href="#solucion">
              Ver cómo funciona <ArrowDown size={16} />
            </a>
            <a className="btn btn--ghost btn--lg" href="https://indrox.com/contact" target="_blank" rel="noopener noreferrer">
              Agendar demo
            </a>
          </div>
          <div className="hero-trust">
            <span>Sin permanencia</span><span className="dot" />
            <span>Implementación en 3 semanas</span><span className="dot" />
            <span>Soporte en español</span>
          </div>
        </div>
        <HeroMock />
      </div>
    </section>
  );
}
