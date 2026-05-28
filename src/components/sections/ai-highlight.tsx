import { aiCards } from "@/config/content";

export function AiHighlight() {
  return (
    <section className="section section--ink" id="ia">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">Zentral IA</span>
          <h2 className="h2">No es un chatbot. Es un copiloto que opera sobre las 8 soluciones.</h2>
        </div>

        <div className="ai-cards">
          {aiCards.map(({ icon: Icon, title, body }) => (
            <article className="ai-card" key={title}>
              <div className="ai-card-icon"><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
