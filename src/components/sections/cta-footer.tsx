import { ArrowRight, MessageCircle } from "lucide-react";

export function FinalCta() {
  return (
    <section className="section section--ink final-cta" id="cta" style={{ padding: "120px 0" }}>
      <div className="final-cta-inner">
        <span className="eyebrow plain" style={{ color: "var(--z-lime)" }}>Agenda tu demo</span>
        <h2>Tu empresa ya está lista para operar en un solo lugar.</h2>
        <p>Agenda una demo y en 30 minutos te mostramos cómo Zentral puede ordenar tu operación.</p>
        <div className="final-cta-actions">
          <a className="btn btn--primary btn--lg" href="#">
            Agendar demo gratis <ArrowRight size={16} />
          </a>
          <a className="btn btn--inverse-ghost btn--lg" href="#">
            <MessageCircle size={16} />Hablar por WhatsApp
          </a>
        </div>
        <div className="final-cta-foot">
          <span>30 minutos</span><span className="dot" />
          <span>Sin compromiso</span><span className="dot" />
          <span>En español</span>
        </div>
      </div>
    </section>
  );
}
