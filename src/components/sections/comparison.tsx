import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Cell = "yes" | "no" | "partial";
type Chip = { label: string; href: string };

const ROW_VALUES: Cell[][] = [
  ["yes", "no", "no", "yes"],
  ["yes", "no", "no", "no"],
  ["yes", "partial", "partial", "no"],
  ["yes", "partial", "no", "yes"],
  ["yes", "partial", "no", "no"],
  ["yes", "yes", "yes", "no"],
];

function cellFor(v: Cell, isMine: boolean, partialLabel: string) {
  const mine = isMine ? "mine " : "";
  if (v === "yes") return { cls: mine + "cmp-yes", text: "✓" };
  if (v === "no") return { cls: mine + "cmp-no", text: "✕" };
  return { cls: mine + "cmp-partial", text: partialLabel };
}

export async function Comparison() {
  const t = await getTranslations("landing.compare");
  const competitors = t.raw("competitors") as string[];
  const rows = t.raw("rows") as string[];
  const chips = t.raw("chips") as Chip[];
  const partial = t("partial");

  return (
    <section className="section section--ink" id="comparativa" style={{ borderTop: "1px solid rgba(250,250,246,.06)", paddingTop: 96 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">{t("eyebrow")}</span>
          <h2 className="h2">{t("title")}</h2>
          <p className="h2-sub">{t("subtitle")}</p>
        </div>

        <div className="cmp-table" role="table" aria-label={t("tableAria")}>
          <div className="cmp-row h" role="row">
            <span className="cmp-feature" role="columnheader">{t("capability")}</span>
            {competitors.map((c, i) => (
              <span key={c} className={i === 0 ? "mine" : ""} role="columnheader">{c}</span>
            ))}
          </div>
          {rows.map((feature, ri) => (
            <div className="cmp-row" role="row" key={feature}>
              <span className="cmp-feature" role="cell">{feature}</span>
              {(ROW_VALUES[ri] ?? []).map((v, i) => {
                const c = cellFor(v, i === 0, partial);
                return <span key={i} className={c.cls} role="cell">{c.text}</span>;
              })}
            </div>
          ))}
        </div>

        <div className="cmp-chips">
          {chips.map((c) => (
            <a className="cmp-chip" href={c.href} key={c.label}>
              {c.label} <ArrowRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
