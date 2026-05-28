import { ArrowRight } from "lucide-react";
import { competitors, comparisonRows, comparisonChips, type Cell } from "@/config/comparison";

function cellFor(v: Cell | string, isMine: boolean) {
  const mine = isMine ? "mine " : "";
  if (v === "yes") return { cls: mine + "cmp-yes", text: "✓" };
  if (v === "no") return { cls: mine + "cmp-no", text: "✕" };
  if (v === "partial") return { cls: mine + "cmp-partial", text: "Parcial" };
  return { cls: mine, text: String(v) };
}

export function Comparison() {
  return (
    <section className="section section--ink" id="comparativa" style={{ borderTop: "1px solid rgba(250,250,246,.06)", paddingTop: 96 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">Comparativa</span>
          <h2 className="h2">No tendrías que elegir entre simplicidad y potencia.</h2>
          <p className="h2-sub">Con Zentral, tienes los dos.</p>
        </div>

        <div className="cmp-table" role="table" aria-label="Comparativa de ERPs">
          <div className="cmp-row h" role="row">
            <span className="cmp-feature" role="columnheader">Capacidad</span>
            {competitors.map((c, i) => (
              <span key={c} className={i === 0 ? "mine" : ""} role="columnheader">{c}</span>
            ))}
          </div>
          {comparisonRows.map((row) => (
            <div className="cmp-row" role="row" key={row.feature}>
              <span className="cmp-feature" role="cell">{row.feature}</span>
              {row.values.map((v, i) => {
                const c = cellFor(v, i === 0);
                return <span key={i} className={c.cls} role="cell">{c.text}</span>;
              })}
            </div>
          ))}
        </div>

        <div className="cmp-chips">
          {comparisonChips.map((c) => (
            <a className="cmp-chip" href={c.href} key={c.label}>
              {c.label} <ArrowRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
