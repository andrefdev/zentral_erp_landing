import {
  Copy, Search, Clock, Puzzle,
  Sheet, MessageCircle, Cloud, Calendar, Calculator, Package, ListTodo, BarChart3, Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const PAIN_ICONS = [Copy, Search, Clock, Puzzle];
const TOOL_ICONS = [Sheet, MessageCircle, Cloud, Calendar, Calculator, Users, ListTodo, Package, BarChart3];

export async function Problem() {
  const t = await getTranslations("landing.problem");
  const tools = t.raw("tools") as string[];
  const pains = t.raw("pains") as { title: string; body: string }[];

  return (
    <section className="section section--sunken" id="problema">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">{t("eyebrow")}</span>
          <h2 className="h2">{t("title")}</h2>
          <p className="h2-sub">{t("subtitle")}</p>
        </div>

        <div className="prob-vis">
          <div className="prob-tools" aria-label={t("toolsAria")}>
            {tools.map((title, i) => {
              const Icon = TOOL_ICONS[i] ?? Sheet;
              return (
                <div className="prob-tool" key={title} title={title}>
                  <Icon size={26} />
                </div>
              );
            })}
          </div>
          <div className="prob-arrow">
            → {t("arrowText")} <strong>{t("arrowStrong")}</strong>.
          </div>
        </div>

        <div className="pain-grid">
          {pains.map((p, i) => {
            const Icon = PAIN_ICONS[i] ?? Copy;
            return (
              <article className="pain" key={p.title}>
                <div className="pain-icon"><Icon size={18} /></div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
