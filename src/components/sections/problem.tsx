import { pains, probTools } from "@/config/content";

export function Problem() {
  return (
    <section className="section section--sunken" id="problema">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow plain">El problema</span>
          <h2 className="h2">¿Tu empresa funciona con 6 herramientas que no se hablan entre sí?</h2>
          <p className="h2-sub">
            Excel, WhatsApp, Drive, sistemas contables, hojas de RR.HH., ventas e inventario por separado.
            Eso tiene un costo que no aparece en ningún reporte: pérdida de control, datos duplicados y horas perdidas en procesos manuales.
          </p>
        </div>

        <div className="prob-vis">
          <div className="prob-tools" aria-label="Herramientas dispersas">
            {probTools.map(({ icon: Icon, title }) => (
              <div className="prob-tool" key={title} title={title}>
                <Icon size={26} />
              </div>
            ))}
          </div>
          <div className="prob-arrow">
            → Todo esto debería estar en <strong>un solo lugar</strong>.
          </div>
        </div>

        <div className="pain-grid">
          {pains.map(({ icon: Icon, title, body }) => (
            <article className="pain" key={title}>
              <div className="pain-icon"><Icon size={18} /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
