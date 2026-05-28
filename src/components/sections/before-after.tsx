import { beforeTools, afterRows, testimonials } from "@/config/content";

export function BeforeAfter() {
  return (
    <section className="section section--sunken" id="casos">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">Casos de éxito</span>
          <h2 className="h2">Así cambia la operación de una empresa con Zentral.</h2>
        </div>

        <div className="ba">
          <div className="ba-card">
            <div className="ba-side before">
              <div className="ba-tag"><span className="dot" />Antes</div>
              <h3>Operación dispersa en 7 herramientas.</h3>
              <div className="ba-list-chaos">
                {beforeTools.map(({ icon: Icon, label, count }) => (
                  <div className="ba-tool-row" key={label}>
                    <Icon size={16} />
                    {label}
                    {count && <span className="count">{count}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="ba-side after">
              <div className="ba-tag after"><span className="dot" />Después</div>
              <h3>Una sola plataforma. Todo centralizado.</h3>
              <div className="ba-after-card">
                <div className="ba-after-card-h"><span className="pulse" />Zentral · suite operando</div>
                {afterRows.map(({ icon: Icon, label, value }) => (
                  <div className="ba-after-card-row" key={label}>
                    <Icon size={16} />
                    <span>{label}</span>
                    <span className="v">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="testis">
            {testimonials.map((t) => (
              <article className="testi" key={t.name}>
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-meta">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                  <div className="testi-stats">
                    {t.stats.map((s) => (
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
