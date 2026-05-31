import { getTranslations } from "next-intl/server";

type Stat = { value: string; emValue?: string; unit?: string; label: string };

export async function Stats() {
  const t = await getTranslations("landing");
  const stats = t.raw("stats") as Stat[];
  return (
    <section className="section--tight section--sunken" style={{ padding: "64px 0" }}>
      <div className="stats">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-n">
              {s.emValue ? <em>{s.emValue}</em> : s.value}
              {s.unit && <span className="unit">{s.unit}</span>}
            </div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
