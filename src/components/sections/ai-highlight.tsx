import { Sun, BellRing, BarChart3, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICONS = [Sun, BellRing, BarChart3, Users];

type Card = { title: string; body: string };

export async function AiHighlight() {
  const t = await getTranslations("landing.aiHighlight");
  const cards = t.raw("cards") as Card[];
  return (
    <section className="section section--ink" id="ia">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">{t("eyebrow")}</span>
          <h2 className="h2">{t("title")}</h2>
        </div>

        <div className="ai-cards">
          {cards.map((c, i) => {
            const Icon = ICONS[i] ?? Sun;
            return (
              <article className="ai-card" key={c.title}>
                <div className="ai-card-icon"><Icon size={20} /></div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
