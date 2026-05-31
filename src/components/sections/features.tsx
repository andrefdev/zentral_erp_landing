import {
  Check, Sparkles, MessageCircle, SendHorizontal, Building2,
  Users, Wallet, ShoppingCart, Package, Wrench, Folder, BarChart3, ShieldCheck,
} from "lucide-react";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="bullets" role="list">
      {items.map((it) => (
        <li key={it}><Check size={18} />{it}</li>
      ))}
    </ul>
  );
}

function AiChatMock() {
  return (
    <div className="aichat" aria-hidden>
      <div className="aichat-head">
        <div className="aichat-head-l"><Sparkles size={16} style={{ color: "var(--z-lime)" }} />Zentral IA</div>
        <div className="aichat-online"><span className="pulse" />online</div>
      </div>
      <div className="aichat-msg">
        <div className="aichat-bubble user">¿Quién tiene tareas vencidas hoy?</div>
        <div className="aichat-bubble bot">
          <strong>3 personas</strong> con tareas vencidas:
          <div className="aichat-list" style={{ marginTop: 6 }}>
            <div>• Ana P. — <span>Cierre de caja jueves</span></div>
            <div>• Diego R. — <span>Revisar inventario almacén 2</span></div>
            <div>• María L. — <span>Aprobar compra Andina</span></div>
          </div>
        </div>
      </div>
      <div className="aichat-msg">
        <div className="aichat-bubble user">Resumen de caja esta semana</div>
        <div className="aichat-bubble bot">
          <strong>Semana del 20–27 may</strong>
          <div className="aichat-table" style={{ marginTop: 8 }}>
            <span className="l">Ingresos</span><span className="v">S/ 62,400</span>
            <span className="l">Egresos</span><span className="v">S/ 18,150</span>
            <span className="l total">Saldo</span><span className="v total">S/ 44,250</span>
          </div>
        </div>
      </div>
      <div className="aichat-input">
        <MessageCircle size={14} style={{ color: "#6A685F" }} />
        <span>Pregúntale a Zentral...</span>
        <SendHorizontal size={14} className="send" />
      </div>
    </div>
  );
}

function MiniDashboard() {
  const bars = [42, 58, 50, 74, 88, 62, 48];
  return (
    <div className="minidash" aria-hidden>
      <div className="minidash-head">
        <h4>Operación · esta semana</h4>
        <div className="meta">en vivo</div>
      </div>
      <div className="minidash-kpis">
        <div className="mock-kpi accent">
          <div className="mock-kpi-lbl">Ventas</div>
          <div className="mock-kpi-val"><em>S/</em>48,200</div>
          <div className="mock-kpi-delta up">▲ 12%</div>
        </div>
        <div className="mock-kpi">
          <div className="mock-kpi-lbl">Caja</div>
          <div className="mock-kpi-val"><em>S/</em>44,250</div>
          <div className="mock-kpi-delta up">▲ 4.8%</div>
        </div>
        <div className="mock-kpi">
          <div className="mock-kpi-lbl">Tareas</div>
          <div className="mock-kpi-val">23<em style={{ fontSize: "0.55em", paddingLeft: 6 }}>/ 34</em></div>
          <div className="mock-kpi-delta down">▼ 3 vencidas</div>
        </div>
      </div>
      <div className="mock-chart">
        <div className="mock-chart-head">
          <div className="mock-chart-h">Ventas vs meta</div>
          <div className="mock-chart-meta">82% cumplida</div>
        </div>
        <div className="mock-chart-bars">
          {bars.map((h, i) => (
            <div key={i} className={`mock-chart-bar ${h >= 70 ? "lime" : "lime-dim"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mock-chart-labels">
          {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i}>{d}</span>)}
        </div>
      </div>
    </div>
  );
}

const settingsRows = [
  { Icon: Users, name: "Zentral People", sub: "Personal · asistencia · nómina", on: true },
  { Icon: Wallet, name: "Zentral Finance", sub: "Cobros, pagos, tesorería y activos", on: true },
  { Icon: ShoppingCart, name: "Zentral Commerce", sub: "POS · clientes · fidelidad · campañas", on: true },
  { Icon: Package, name: "Zentral Supply", sub: "Catálogo, inventario y compras", on: true },
  { Icon: Wrench, name: "Zentral Assets", sub: "Equipos, mantenimiento y órdenes", on: false },
  { Icon: Folder, name: "Zentral Workplace", sub: "Drive, tareas y formularios", on: true },
  { Icon: BarChart3, name: "Zentral Insights", sub: "Dashboards y reportes ejecutivos", on: true },
  { Icon: ShieldCheck, name: "Zentral Admin", sub: "Usuarios, roles, MFA y auditoría", on: false },
];

function SettingsMock() {
  const onCount = settingsRows.filter((r) => r.on).length;
  return (
    <div className="settings" aria-hidden>
      <div className="settings-h">
        <h4>Soluciones activas</h4>
        <div className="meta">{onCount} / {settingsRows.length} activos</div>
      </div>
      <div className="settings-list">
        {settingsRows.map(({ Icon, name, sub, on }) => (
          <div key={name} className={`settings-row ${on ? "is-on" : ""}`}>
            <Icon size={18} />
            <div>
              <div className="settings-row-name">{name}</div>
              <div className="settings-row-sub">{sub}</div>
            </div>
            <div className="toggle" aria-hidden />
          </div>
        ))}
      </div>
      <div className="settings-brand">
        <div className="settings-brand-h">Personalización de marca</div>
        <div className="settings-input">
          <Building2 size={16} style={{ color: "var(--z-n-500)" }} />
          <span>Distribuidora Norte SAC</span>
          <span className="caret" />
        </div>
      </div>
    </div>
  );
}

import { getTranslations } from "next-intl/server";

export async function Features() {
  const t = await getTranslations("landing.features");
  return (
    <section className="section" style={{ paddingTop: 32 }}>
      <div className="wrap">
        <div className="split">
          <div className="split-copy">
            <span className="eyebrow plain">{t("ai.eyebrow")}</span>
            <h3 className="split-h">{t("ai.title")}</h3>
            <p className="split-body">{t("ai.body")}</p>
            <Bullets items={t.raw("ai.bullets") as string[]} />
          </div>
          <div className="split-vis"><AiChatMock /></div>
        </div>

        <div className="split is-reverse">
          <div className="split-copy">
            <span className="eyebrow plain">{t("vis.eyebrow")}</span>
            <h3 className="split-h">{t("vis.title")}</h3>
            <p className="split-body">{t("vis.body")}</p>
            <Bullets items={t.raw("vis.bullets") as string[]} />
          </div>
          <div className="split-vis"><MiniDashboard /></div>
        </div>

        <div className="split">
          <div className="split-copy">
            <span className="eyebrow plain">{t("impl.eyebrow")}</span>
            <h3 className="split-h">{t("impl.title")}</h3>
            <p className="split-body">{t("impl.body")}</p>
            <Bullets items={t.raw("impl.bullets") as string[]} />
          </div>
          <div className="split-vis"><SettingsMock /></div>
        </div>
      </div>
    </section>
  );
}
