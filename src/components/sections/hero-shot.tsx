import Image from "next/image";
import dashboard from "@/assets/erp-pics/01-dashboard.png";

export function HeroShot() {
  return (
    <div className="mock-wrap" aria-hidden>
      <figure className="shot">
        <div className="mock-chrome">
          <div className="mock-dots"><span /><span /><span /></div>
          <div className="mock-url">erp.zentral.so / dashboard</div>
          <div style={{ width: 48 }} />
        </div>
        <Image
          className="shot-img"
          src={dashboard}
          alt="Panel de control de Zentral con KPIs en tiempo real"
          placeholder="blur"
          priority
          sizes="(max-width: 980px) 100vw, 660px"
        />
      </figure>

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
