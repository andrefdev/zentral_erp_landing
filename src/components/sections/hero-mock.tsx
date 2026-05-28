import {
  LayoutDashboard, Users, Wallet, Package, ShoppingCart, Wrench, Folder, Sparkles, Bell,
} from "lucide-react";

const sideItems = [
  { Icon: LayoutDashboard, title: "Insights", active: true },
  { Icon: Users, title: "People" },
  { Icon: Wallet, title: "Finance" },
  { Icon: Package, title: "Supply" },
  { Icon: ShoppingCart, title: "Commerce" },
  { Icon: Wrench, title: "Assets" },
  { Icon: Folder, title: "Workplace" },
  { Icon: Sparkles, title: "IA" },
];

const chartBars = [
  { h: 38, lime: false },
  { h: 52, lime: false },
  { h: 46, lime: false },
  { h: 64, lime: false },
  { h: 82, lime: true },
  { h: 58, lime: false },
  { h: 44, lime: false },
];

const activity = [
  { dot: "green", label: "Factura F001-00428 cobrada", badge: "Pagado", badgeCls: "ok" },
  { dot: "amber", label: "Compra a Andina Ltda. por aprobar", badge: "Pendiente", badgeCls: "warn" },
  { dot: "lime", label: "Zentral IA generó informe semanal", badge: "IA", badgeCls: "lime" },
  { dot: "blue", label: "Ana subió plan de inventario Q3", badge: "Drive", badgeCls: "" },
  { dot: "red", label: "3 tareas vencidas en Operaciones", badge: "Acción", badgeCls: "warn" },
];

export function HeroMock() {
  return (
    <div className="mock-wrap" aria-hidden>
      <div className="mock">
        <div className="mock-chrome">
          <div className="mock-dots"><span /><span /><span /></div>
          <div className="mock-url">app.zentral.io / dashboard</div>
          <div style={{ width: 48 }} />
        </div>
        <div className="mock-body">
          <div className="mock-side">
            <div className="mock-side-logo" />
            {sideItems.map(({ Icon, title, active }) => (
              <div key={title} className={`mock-side-item ${active ? "is-active" : ""}`} title={title}>
                <Icon size={16} />
              </div>
            ))}
          </div>

          <div className="mock-main">
            <div className="mock-topline">
              <div>
                <div className="mock-topline-h">Hola, Carlos</div>
                <div style={{ font: "400 11px/1.2 var(--font-sans)", color: "#6A685F", marginTop: 2 }}>
                  Esto pasó hoy en tu empresa
                </div>
              </div>
              <div className="mock-topline-meta">
                <span>Lun · 27 may</span>
                <div className="mock-topline-bell"><Bell size={14} /></div>
                <div className="mock-avatar">CM</div>
              </div>
            </div>

            <div className="mock-kpis">
              <div className="mock-kpi accent">
                <div className="mock-kpi-lbl">Ventas del mes</div>
                <div className="mock-kpi-val"><em>S/</em>48,200</div>
                <div className="mock-kpi-delta up">▲ 12% vs mes anterior</div>
              </div>
              <div className="mock-kpi">
                <div className="mock-kpi-lbl">Tareas activas</div>
                <div className="mock-kpi-val">23</div>
                <div className="mock-kpi-delta up">▲ 4 nuevas hoy</div>
              </div>
              <div className="mock-kpi">
                <div className="mock-kpi-lbl">Equipo online</div>
                <div className="mock-kpi-val">8<em style={{ fontSize: "0.55em", paddingLeft: 6 }}>/ 12</em></div>
                <div className="mock-kpi-delta up">● operando</div>
              </div>
            </div>

            <div className="mock-chart">
              <div className="mock-chart-head">
                <div className="mock-chart-h">Ventas semana</div>
                <div className="mock-chart-meta">S/ 48,200</div>
              </div>
              <div className="mock-chart-bars">
                {chartBars.map((b, i) => (
                  <div key={i} className={`mock-chart-bar ${b.lime ? "lime" : "lime-dim"}`} style={{ height: `${b.h}%` }} />
                ))}
              </div>
              <div className="mock-chart-labels">
                {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i}>{d}</span>)}
              </div>
            </div>

            <div className="mock-activity">
              <div className="mock-activity-h">Actividad reciente</div>
              {activity.map((a, i) => (
                <div className="mock-row" key={i}>
                  <div className="mock-row-l">
                    <span className={`dot ${a.dot}`} />
                    <span className="label">{a.label}</span>
                  </div>
                  <div className={`badge ${a.badgeCls}`}>{a.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mock-ai" role="complementary" aria-label="Demo de Zentral IA">
        <div className="mock-ai-head"><span className="pulse" />Zentral IA</div>
        <div className="mock-ai-q">¿Cuánto vendimos esta semana?</div>
        <div className="mock-ai-a">
          <strong>S/ 48,200</strong> · ▲ 12% vs semana anterior. Tu mejor día fue el viernes.
        </div>
      </div>
    </div>
  );
}
