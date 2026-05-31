import {
  Sheet, MessageCircle, Cloud, Calculator, Search,
  Users, Wallet, ShoppingCart, Package, Folder, Sparkles,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

const BEFORE_ICONS = [Sheet, MessageCircle, Cloud, Calculator, Search];
const AFTER_ICONS = [Users, Wallet, ShoppingCart, Package, Folder, Sparkles];

type Tool = { label: string; count?: string };
type Row = { label: string; value: string };
type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  stats: { n: string; l: string }[];
};

export async function BeforeAfter() {
  const t = await getTranslations("landing.beforeAfter");
  const beforeTools = t.raw("beforeTools") as Tool[];
  const afterRows = t.raw("afterRows") as Row[];
  const testimonials = t.raw("testimonials") as Testimonial[];

  return (
    <section className="section section--sunken" id="casos">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">{t("eyebrow")}</span>
          <h2 className="h2">{t("title")}</h2>
        </div>

        <div className="ba">
          <div className="ba-card">
            <div className="ba-side before">
              <div className="ba-tag"><span className="dot" />{t("beforeBadge")}</div>
              <h3>{t("beforeTitle")}</h3>
              <div className="ba-list-chaos">
                {beforeTools.map((tool, i) => {
                  const Icon = BEFORE_ICONS[i] ?? Sheet;
                  return (
                    <div className="ba-tool-row" key={tool.label}>
                      <Icon size={16} />
                      {tool.label}
                      {tool.count && <span className="count">{tool.count}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ba-side after">
              <div className="ba-tag after"><span className="dot" />{t("afterBadge")}</div>
              <h3>{t("afterTitle")}</h3>
              <div className="ba-after-card">
                <div className="ba-after-card-h"><span className="pulse" />{t("afterCardHead")}</div>
                {afterRows.map((row, i) => {
                  const Icon = AFTER_ICONS[i] ?? Users;
                  return (
                    <div className="ba-after-card-row" key={row.label}>
                      <Icon size={16} />
                      <span>{row.label}</span>
                      <span className="v">{row.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="testis">
            {testimonials.map((x) => (
              <article className="testi" key={x.name}>
                <p className="testi-quote">{x.quote}</p>
                <div className="testi-meta">
                  <div className="testi-avatar">{x.initials}</div>
                  <div>
                    <div className="testi-name">{x.name}</div>
                    <div className="testi-role">{x.role}</div>
                  </div>
                  <div className="testi-stats">
                    {x.stats.map((s) => (
                      <div className="testi-stat" key={s.n}>
                        <div className="testi-stat-n">{s.n}</div>
                        <div className="testi-stat-l" style={{ whiteSpace: "pre-line" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
