"use client";

import { useEffect, useRef } from "react";
import { Sora, DM_Sans } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm",
  display: "swap",
});

const SORA = "var(--font-sora), sans-serif";

const LEAF_PATHS = [
  "M387.87,795.78c23.43-8.95,78.47-52.16,100.35-63.26c53.38-27.08,109.88-40.85,169.85-37.48c40.77,2.29,79.67,11.86,115.01,33.67c38.3,23.64,77.67,45.28,121.15,58.19c26.9,7.99,54.38,11.3,85.39,8.01c-69.76,96.81-158.75,157.52-277.71,164.05C565.84,966.42,464.33,903.89,387.87,795.78",
  "M587.21,629.58c7.95-23.78,9.5-93.74,14.81-117.7c12.95-58.44,38.17-110.84,78.83-155.04c27.65-30.05,59.73-54.04,99.02-67.51c42.57-14.59,84.29-31.28,121.86-56.69c23.24-15.72,43.24-34.85,60.39-60.9c30.54,115.35,20.97,222.65-49.49,318.72C832.02,600.35,719.28,639.12,587.21,629.58",
  "M692.58,289.08c-23.57,8.56-79.32,50.85-101.38,61.6c-53.82,26.2-110.53,39.04-170.44,34.68c-40.73-2.96-79.46-13.17-114.44-35.57c-37.9-24.27-76.91-46.56-120.17-60.18c-26.76-8.43-54.19-12.19-85.25-9.42c71.35-95.65,161.33-154.88,280.38-159.44C517.46,115.53,617.92,179.72,692.58,289.08",
  "M494.94,448.15c-8.18,23.7-10.39,93.65-15.92,117.55c-13.5,58.31-39.22,110.47-80.3,154.29c-27.93,29.79-60.24,53.47-99.65,66.56c-42.71,14.19-84.58,30.48-122.39,55.53c-23.39,15.5-43.57,34.44-60.96,60.33c-29.44-115.64-18.85-222.84,52.51-318.24C249.86,475.05,362.97,437.36,494.94,448.15",
];

function LogoMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="80 90 900 900" fill="none" style={{ display: "block" }}>
      {LEAF_PATHS.map((d, i) => (
        <path key={i} d={d} fill="#FF6B35" />
      ))}
    </svg>
  );
}

function Leaf({ size, color, rotate = 0, opacity = 1 }: { size: number; color: string; rotate?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.47)}
      viewBox="95 110 605 285"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)`, opacity, display: "block" }}
    >
      <path d={LEAF_PATHS[2]} fill={color} />
    </svg>
  );
}

const PARTICLES = [
  { top: "12%", left: "6%", s: 16, c: "rgba(255,107,53,0.5)", dur: 16, delay: 0, r: 30 },
  { top: "28%", left: "90%", s: 12, c: "rgba(109,40,217,0.35)", dur: 20, delay: 2, r: -40 },
  { top: "46%", left: "4%", s: 10, c: "rgba(109,40,217,0.3)", dur: 18, delay: 5, r: 100 },
  { top: "55%", left: "94%", s: 18, c: "rgba(255,107,53,0.4)", dur: 22, delay: 1, r: -80 },
  { top: "68%", left: "10%", s: 13, c: "rgba(255,107,53,0.35)", dur: 19, delay: 7, r: 200 },
  { top: "80%", left: "88%", s: 11, c: "rgba(109,40,217,0.32)", dur: 17, delay: 4, r: 140 },
  { top: "90%", left: "48%", s: 14, c: "rgba(255,107,53,0.3)", dur: 21, delay: 3, r: -20 },
  { top: "35%", left: "50%", s: 9, c: "rgba(168,85,247,0.3)", dur: 24, delay: 6, r: 60 },
];

const PROBLEMS = [
  { glyph: "XLS", iconBg: "rgba(16,122,87,0.1)", iconColor: "#107A57", title: "Excel infinitos", desc: "Versiones duplicadas y fórmulas que solo una persona entiende.", delay: 0 },
  { glyph: "WA", iconBg: "rgba(37,150,90,0.1)", iconColor: "#25965A", title: "Pedidos por WhatsApp", desc: "Ventas que viven en chats y se pierden entre mensajes.", delay: 80 },
  { glyph: "FAC", iconBg: "rgba(109,40,217,0.1)", iconColor: "#6D28D9", title: "Facturas a mano", desc: "Emitir, cobrar y conciliar consume horas cada semana.", delay: 160 },
  { glyph: "INV", iconBg: "rgba(255,107,53,0.12)", iconColor: "#E5551F", title: "Inventario desordenado", desc: "Nadie sabe con certeza qué hay ni cuánto queda.", delay: 240 },
  { glyph: "OPS", iconBg: "rgba(15,23,42,0.07)", iconColor: "#0F172A", title: "Procesos manuales", desc: "Cada tarea depende de la memoria de alguien.", delay: 320 },
];

const SIDEBAR = [
  { label: "Panel general", weight: 600, color: "#6D28D9", bg: "rgba(109,40,217,0.08)", dot: "#6D28D9" },
  { label: "Ventas", weight: 500, color: "#47546A", bg: "transparent", dot: "#CBD5E1" },
  { label: "Inventario", weight: 500, color: "#47546A", bg: "transparent", dot: "#CBD5E1" },
  { label: "Caja", weight: 500, color: "#47546A", bg: "transparent", dot: "#CBD5E1" },
  { label: "Facturación", weight: 500, color: "#47546A", bg: "transparent", dot: "#CBD5E1" },
];

const KPIS = [
  { label: "Ventas del mes", value: "$1,284,500", trend: "+18% vs. mes anterior", trendColor: "#16A34A" },
  { label: "Órdenes activas", value: "132", trend: "24 por despachar", trendColor: "#6D28D9" },
  { label: "Stock crítico", value: "6 productos", trend: "Reorden sugerido por IA", trendColor: "#E5551F" },
];

const BAR_HEIGHTS = [34, 48, 40, 62, 55, 70, 58, 78, 66, 84, 72, 90, 80, 68, 88, 95, 82, 100];

const MODULE_CHIPS = [
  { label: "Ventas", dot: "#6D28D9", border: "rgba(109,40,217,0.15)", shadow: "0 16px 36px rgba(76, 29, 149, 0.14)", pos: { top: -26, left: -18 } as const, anim: "zlFloatY 6s ease-in-out infinite", r: "-3deg" },
  { label: "Inventario", dot: "#FF6B35", border: "rgba(255,107,53,0.22)", shadow: "0 16px 36px rgba(255, 107, 53, 0.14)", pos: { top: 40, right: -26 } as const, anim: "zlFloatY 7s ease-in-out infinite .8s", r: "2deg" },
  { label: "Caja", dot: "#A855F7", border: "rgba(109,40,217,0.15)", shadow: "0 16px 36px rgba(76, 29, 149, 0.14)", pos: { bottom: 70, left: -34 } as const, anim: "zlFloatY 8s ease-in-out infinite 1.5s", r: "2deg" },
  { label: "Facturación", dot: "#FF8A5C", border: "rgba(255,107,53,0.22)", shadow: "0 16px 36px rgba(255, 107, 53, 0.14)", pos: { bottom: -20, right: 60 } as const, anim: "zlFloatY 6.5s ease-in-out infinite 2.2s", r: "-2deg" },
];

const DIFFERENTIATORS = [
  {
    title: "Personalizado con IA",
    desc: "No compras un sistema genérico. Obtienes una versión adaptada a tu negocio: tus flujos, tus reglas, tu forma de operar.",
    bg: "linear-gradient(160deg, #4C1D95, #6D28D9)", border: "rgba(109,40,217,0.3)", iconBg: "rgba(255,255,255,0.14)",
    titleColor: "#fff", textColor: "rgba(241,234,254,0.85)", delay: 0, leaf: { color: "#FF6B35", rotate: -20 },
  },
  {
    title: "Implementación rápida",
    desc: "Vivo y facturando en semanas, no en meses. Sin consultorías eternas ni proyectos que nunca terminan.",
    bg: "rgba(255,255,255,0.8)", border: "rgba(15,23,42,0.08)", iconBg: "rgba(255,107,53,0.12)",
    titleColor: "#0F172A", textColor: "#47546A", delay: 100, leaf: { color: "#FF6B35", rotate: 70 },
  },
  {
    title: "Hecho para PYMEs",
    desc: "Diseñado para empresas que ya superaron la gestión manual y necesitan orden sin burocracia corporativa.",
    bg: "rgba(255,255,255,0.8)", border: "rgba(15,23,42,0.08)", iconBg: "rgba(109,40,217,0.1)",
    titleColor: "#0F172A", textColor: "#47546A", delay: 200, leaf: { color: "#6D28D9", rotate: 160 },
  },
];

const BENEFITS = [
  { label: "Menos estrés operativo", delay: 0, leaf: { color: "#FF6B35", rotate: -20 } },
  { label: "Menos retrabajo", delay: 70, leaf: { color: "#FFB38A", rotate: 70 } },
  { label: "Más control", delay: 140, leaf: { color: "#FF6B35", rotate: 160 } },
  { label: "Más tiempo para crecer", delay: 210, leaf: { color: "#FFB38A", rotate: 250 } },
  { label: "Decisiones más claras", delay: 280, leaf: { color: "#FF6B35", rotate: 40 } },
];

const NOISE_BG =
  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/%3E%3CfeColorMatrix values=%220 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0%22/%3E%3C/filter%3E%3Crect width=%22160%22 height=%22160%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')";

const CSS = `
@keyframes zlLeafDescend {
  0%   { transform: translate(-60px, -8vh) rotate(-20deg); }
  25%  { transform: translate(70px, 16vh) rotate(15deg); }
  50%  { transform: translate(-70px, 40vh) rotate(-15deg); }
  75%  { transform: translate(60px, 64vh) rotate(20deg); }
  100% { transform: translate(-60px, 88vh) rotate(-20deg); }
}
@keyframes zlFloatY {
  0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
  50% { transform: translateY(-16px) rotate(var(--r, 0deg)); }
}
@keyframes zlDrift {
  0%   { transform: translate(0, 0) rotate(0deg); }
  33%  { transform: translate(24px, -30px) rotate(8deg); }
  66%  { transform: translate(-18px, -60px) rotate(-6deg); }
  100% { transform: translate(0, -90px) rotate(0deg); }
}
@keyframes zlSpinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes zlPulseSoft { 0%,100% { opacity: .55; } 50% { opacity: 1; } }

.zl ::selection { background: #6D28D9; color: #fff; }
.zl a { text-decoration: none; }
.zl-navlink { color: #47546A; transition: color .3s; white-space: nowrap; }
.zl-navlink:hover { color: #0F172A; }
.zl-cta-dark { transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s; }
.zl-cta-dark:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(15,23,42,.25); }
.zl-btn-primary { transition: transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s; }
.zl-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 22px 48px rgba(109, 40, 217, 0.45); }
.zl-btn-ghost { transition: transform .4s cubic-bezier(.2,.8,.2,1), background .4s, box-shadow .4s; }
.zl-btn-ghost:hover { transform: translateY(-3px); background: #fff; box-shadow: 0 14px 32px rgba(15, 23, 42, 0.1); }
.zl-card { transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s; }
.zl-card:hover { transform: translateY(-8px) rotate(-0.5deg); box-shadow: 0 26px 50px rgba(15, 23, 42, 0.11); }
.zl-diff { transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s; }
.zl-diff:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(76, 29, 149, 0.13); }
.zl-benefit { transition: transform .4s cubic-bezier(.2,.8,.2,1), background .4s; }
.zl-benefit:hover { transform: translateY(-4px); background: rgba(255,255,255,0.16); }
.zl-cta-final { transition: transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s; }
.zl-cta-final:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 26px 56px rgba(109, 40, 217, 0.45); }

@media (max-width: 860px) { .zl-navlinks { display: none; } }
@media (max-width: 720px) {
  .zl-dash-grid { grid-template-columns: 1fr !important; }
  .zl-dash-side { display: none !important; }
  .zl-kpis { grid-template-columns: 1fr 1fr !important; }
}
`;

const glassChip: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 9, padding: "12px 18px", borderRadius: 16,
  background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", fontWeight: 600, fontSize: 14,
};

const sectionKicker = (color: string): React.CSSProperties => ({
  fontSize: 13, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color, marginBottom: 18,
});

const sectionH2: React.CSSProperties = {
  fontFamily: SORA, fontWeight: 700, fontSize: "clamp(34px, 4.4vw, 58px)",
  letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 20px", textWrap: "balance",
};

export function ZentralLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealEls = root.querySelectorAll<HTMLElement>("[data-reveal]");
    revealEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.filter = "blur(10px)";
      el.style.transform = "translateY(28px)";
      el.style.transition =
        "opacity .8s cubic-bezier(.2,.8,.2,1), filter .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)";
    });
    const pending = new Set(revealEls);
    const timeouts: number[] = [];
    const checkReveals = () => {
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
          const delay = parseInt(el.getAttribute("data-reveal") || "0", 10);
          timeouts.push(
            window.setTimeout(() => {
              el.style.opacity = "1";
              el.style.filter = "blur(0px)";
              el.style.transform = "translateY(0)";
            }, delay)
          );
          pending.delete(el);
        }
      });
    };

    const pEls = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf: number | null = null;
    const update = () => {
      pEls.forEach((el) => {
        const f = parseFloat(el.getAttribute("data-parallax") || "0");
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${(-center * f * 0.3).toFixed(1)}px)`;
      });
      checkReveals();
      raf = null;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    timeouts.push(window.setTimeout(checkReveals, 400), window.setTimeout(checkReveals, 1200));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      timeouts.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`zl ${sora.variable} ${dmSans.variable}`}
      style={{ fontFamily: "var(--font-dm), sans-serif", color: "#0F172A", background: "#F8FAFC", overflowX: "clip", position: "relative" }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* noise texture overlay */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, opacity: 0.35, backgroundImage: NOISE_BG }} />

      {/* ambient floating leaves */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "clip" }}>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{ position: "absolute", top: p.top, left: p.left, animation: `zlDrift ${p.dur}s ease-in-out ${p.delay}s infinite alternate`, willChange: "transform" }}
          >
            <Leaf size={p.s} color={p.c} rotate={p.r} />
          </div>
        ))}
      </div>

      {/* ============ NAV ============ */}
      <nav
        style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 60,
          display: "flex", alignItems: "center", gap: 28, padding: "10px 12px 10px 18px", borderRadius: 999,
          background: "rgba(248, 250, 252, 0.72)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(15, 23, 42, 0.07)", boxShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
        }}
      >
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 9, color: "#0F172A", whiteSpace: "nowrap", flexShrink: 0 }}>
          <span style={{ display: "inline-flex" }}><LogoMark size={30} /></span>
          <span style={{ fontFamily: SORA, fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>Zentral</span>
        </a>
        <div className="zl-navlinks" style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 14.5, fontWeight: 500 }}>
          <a className="zl-navlink" href="#problema">Problema</a>
          <a className="zl-navlink" href="#solucion">Producto</a>
          <a className="zl-navlink" href="#diferencial">Por qué Zentral</a>
        </div>
        <a
          className="zl-cta-dark"
          href="#cta"
          style={{ display: "inline-flex", alignItems: "center", padding: "9px 18px", borderRadius: 999, background: "#0F172A", color: "#fff", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Agenda una demo
        </a>
      </nav>

      {/* ============ HERO ============ */}
      <header
        id="hero"
        style={{
          position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "flex-start", textAlign: "center", padding: "128px 24px 170px", overflow: "clip", zIndex: 2,
        }}
      >
        <div data-parallax="0.15" style={{ position: "absolute", top: -220, left: "50%", marginLeft: -420, width: 840, height: 620, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(109, 40, 217, 0.16), transparent 70%)", filter: "blur(20px)" }} />
        <div data-parallax="0.25" style={{ position: "absolute", top: "30%", right: -180, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255, 107, 53, 0.14), transparent 70%)" }} />
        <div data-parallax="0.2" style={{ position: "absolute", bottom: -160, left: -160, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(109, 40, 217, 0.10), transparent 70%)" }} />

        {/* guiding orange leaf */}
        <div style={{ position: "absolute", top: 0, left: "50%", zIndex: 3, animation: "zlLeafDescend 14s cubic-bezier(.45,.05,.55,.95) infinite alternate", willChange: "transform" }}>
          <Leaf size={34} color="#FF6B35" opacity={0.95} />
        </div>

        <div data-reveal="0" style={{ position: "relative", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 999, background: "rgba(109, 40, 217, 0.08)", border: "1px solid rgba(109, 40, 217, 0.18)", color: "#6D28D9", fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", marginBottom: 34 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6B35", animation: "zlPulseSoft 2.4s ease-in-out infinite" }} />
            Gestión inteligente para PYMEs
          </div>
          <h1 style={{ fontFamily: SORA, fontWeight: 800, fontSize: "clamp(48px, 7.2vw, 104px)", lineHeight: 1.02, letterSpacing: "-0.04em", margin: 0, maxWidth: 1080, textWrap: "balance" }}>
            Tu empresa ya creció.<br />
            <span style={{ background: "linear-gradient(100deg, #6D28D9 10%, #A855F7 45%, #FF6B35 90%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              Tu gestión también debería hacerlo.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(17px, 1.6vw, 21px)", lineHeight: 1.6, color: "#47546A", maxWidth: 640, margin: "30px 0 44px", textWrap: "pretty" }}>
            Centraliza ventas, inventario, facturación y operaciones en un sistema de gestión que se adapta a tu negocio, no al revés.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              className="zl-btn-primary"
              href="#cta"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "17px 32px", borderRadius: 999, background: "linear-gradient(135deg, #6D28D9, #4C1D95)", color: "#fff", fontSize: 16.5, fontWeight: 600, boxShadow: "0 14px 36px rgba(109, 40, 217, 0.35)" }}
            >
              Agenda una demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a
              className="zl-btn-ghost"
              href="#solucion"
              style={{ display: "inline-flex", alignItems: "center", padding: "17px 32px", borderRadius: 999, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", border: "1px solid rgba(15, 23, 42, 0.1)", color: "#0F172A", fontSize: 16.5, fontWeight: 600 }}
            >
              Ver cómo funciona
            </a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#94A3B8", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", zIndex: 4 }}>
          Desliza
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none"><path d="M7 2v13m0 0l-5-5m5 5l5-5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </header>

      <main>
        {/* ============ PROBLEMA ============ */}
        <section id="problema" style={{ position: "relative", padding: "140px 24px", maxWidth: 1200, margin: "0 auto", zIndex: 2 }}>
          <div data-reveal="0" style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={sectionKicker("#FF6B35")}>El problema</div>
            <h2 style={sectionH2}>Demasiadas herramientas.<br />Cero claridad.</h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#47546A", maxWidth: 520, margin: "0 auto", textWrap: "pretty" }}>
              Cuando todo está separado, la empresa se vuelve más difícil de dirigir.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
            {PROBLEMS.map((p) => (
              <div
                key={p.glyph}
                className="zl-card"
                data-reveal={p.delay}
                style={{ position: "relative", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(15, 23, 42, 0.07)", borderRadius: 26, padding: "30px 26px", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)" }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 14, background: p.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SORA, fontWeight: 700, fontSize: 15, color: p.iconColor }}>
                  {p.glyph}
                </div>
                <div>
                  <div style={{ fontFamily: SORA, fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "#64748B" }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ SOLUCIÓN ============ */}
        <section id="solucion" style={{ position: "relative", padding: "140px 24px", zIndex: 2, overflow: "clip" }}>
          <div data-parallax="0.12" style={{ position: "absolute", top: "10%", left: "50%", marginLeft: -500, width: 1000, height: 700, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(109, 40, 217, 0.10), transparent 70%)" }} />
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div data-reveal="0" style={{ textAlign: "center", marginBottom: 70 }}>
              <div style={sectionKicker("#6D28D9")}>La solución</div>
              <h2 style={sectionH2}>Un sistema que gira<br />alrededor de tu operación.</h2>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: "#47546A", maxWidth: 560, margin: "0 auto", textWrap: "pretty" }}>
                Ventas, inventario, caja y facturación conectados en una sola plataforma.
              </p>
            </div>

            {/* floating ERP mockup */}
            <div data-reveal="100" data-parallax="-0.05" style={{ position: "relative", maxWidth: 980, margin: "0 auto" }}>
              {MODULE_CHIPS.map((c) => (
                <div key={c.label} style={{ position: "absolute", ...c.pos, zIndex: 3, animation: c.anim, ["--r" as string]: c.r }}>
                  <div style={{ ...glassChip, border: `1px solid ${c.border}`, boxShadow: c.shadow }}>
                    <span style={{ width: 9, height: 9, borderRadius: 3, background: c.dot }} />
                    {c.label}
                  </div>
                </div>
              ))}

              {/* dashboard window */}
              <div style={{ borderRadius: 28, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)", border: "1px solid rgba(15, 23, 42, 0.08)", boxShadow: "0 40px 90px rgba(76, 29, 149, 0.16), 0 6px 20px rgba(15,23,42,0.06)", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(15, 23, 42, 0.06)" }}>
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E2E8F0" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E2E8F0" }} />
                  <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E2E8F0" }} />
                  <span style={{ marginLeft: 12, fontSize: 12.5, color: "#94A3B8", fontWeight: 500 }}>app.zentral.io — Panel general</span>
                </div>
                <div className="zl-dash-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 420 }}>
                  <div className="zl-dash-side" style={{ borderRight: "1px solid rgba(15,23,42,0.06)", padding: "22px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {SIDEBAR.map((s) => (
                      <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 11, fontSize: 13.5, fontWeight: s.weight, color: s.color, background: s.bg }}>
                        <span style={{ width: 8, height: 8, borderRadius: 3, background: s.dot }} />
                        {s.label}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 26, display: "flex", flexDirection: "column", gap: 20 }}>
                    <div className="zl-kpis" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                      {KPIS.map((k) => (
                        <div key={k.label} style={{ borderRadius: 16, border: "1px solid rgba(15,23,42,0.06)", background: "#fff", padding: "16px 18px" }}>
                          <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500, marginBottom: 8 }}>{k.label}</div>
                          <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 21, letterSpacing: "-0.02em" }}>{k.value}</div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: k.trendColor, marginTop: 6 }}>{k.trend}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: 1, borderRadius: 16, border: "1px solid rgba(15,23,42,0.06)", background: "#fff", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600 }}>Flujo de ventas · últimos 30 días</span>
                        <span style={{ fontSize: 12, color: "#94A3B8" }}>Actualizado hace 2 min</span>
                      </div>
                      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 7, minHeight: 140 }}>
                        {BAR_HEIGHTS.map((h, i) => (
                          <div
                            key={i}
                            style={{ flex: 1, height: `${h}%`, borderRadius: "6px 6px 3px 3px", background: i === BAR_HEIGHTS.length - 1 ? "linear-gradient(180deg, #FF6B35, #FF8A5C)" : "linear-gradient(180deg, #7C3AED, #6D28D9)" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ DIFERENCIAL ============ */}
        <section id="diferencial" style={{ position: "relative", padding: "140px 24px", maxWidth: 1200, margin: "0 auto", zIndex: 2 }}>
          <div data-reveal="0" style={{ marginBottom: 64, maxWidth: 640 }}>
            <div style={sectionKicker("#6D28D9")}>Por qué Zentral</div>
            <h2 style={{ ...sectionH2, margin: 0 }}>No es un sistema genérico.<br />Es el tuyo.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
            {DIFFERENTIATORS.map((d) => (
              <div
                key={d.title}
                className="zl-diff"
                data-reveal={d.delay}
                style={{ position: "relative", borderRadius: 30, padding: "38px 32px", background: d.bg, border: `1px solid ${d.border}`, boxShadow: "0 12px 34px rgba(15, 23, 42, 0.05)", display: "flex", flexDirection: "column", gap: 18, minHeight: 260, overflow: "clip" }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 16, background: d.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Leaf size={26} color={d.leaf.color} rotate={d.leaf.rotate} />
                </div>
                <div style={{ fontFamily: SORA, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", color: d.titleColor }}>{d.title}</div>
                <div style={{ fontSize: 16, lineHeight: 1.6, color: d.textColor, textWrap: "pretty" }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ BENEFICIOS ============ */}
        <section id="beneficios" style={{ position: "relative", padding: "150px 24px", zIndex: 2, overflow: "clip" }}>
          <div style={{ position: "absolute", inset: "40px 24px", maxWidth: 1200, margin: "0 auto", borderRadius: 44, background: "linear-gradient(150deg, #4C1D95 0%, #6D28D9 55%, #7C3AED 100%)", left: 0, right: 0 }} />
          <div data-parallax="0.1" style={{ position: "absolute", top: "10%", right: "8%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255, 107, 53, 0.28), transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "8%", left: "10%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(168, 85, 247, 0.35), transparent 70%)" }} />

          <div style={{ position: "relative", maxWidth: 1020, margin: "0 auto", textAlign: "center", padding: "60px 0" }}>
            <div data-reveal="0">
              <h2 style={{ fontFamily: SORA, fontWeight: 700, fontSize: "clamp(36px, 5vw, 66px)", letterSpacing: "-0.03em", lineHeight: 1.06, color: "#fff", margin: "0 0 18px", textWrap: "balance" }}>
                No vendemos un sistema.<br />
                <span style={{ background: "linear-gradient(100deg, #FFB38A, #FF6B35)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Vendemos tranquilidad.</span>
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 54 }}>
              {BENEFITS.map((b) => (
                <div
                  key={b.label}
                  className="zl-benefit"
                  data-reveal={b.delay}
                  style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "16px 26px", borderRadius: 999, background: "rgba(255,255,255,0.09)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.16)", color: "#F1EAFE", fontFamily: SORA, fontWeight: 600, fontSize: "clamp(15px, 1.4vw, 18px)", letterSpacing: "-0.01em" }}
                >
                  <span style={{ display: "inline-flex" }}><Leaf size={16} color={b.leaf.color} rotate={b.leaf.rotate} /></span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA FINAL ============ */}
        <section id="cta" style={{ position: "relative", padding: "160px 24px 120px", textAlign: "center", zIndex: 2, overflow: "clip" }}>
          <div data-parallax="0.15" style={{ position: "absolute", top: -100, left: "50%", marginLeft: -400, width: 800, height: 560, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(255, 107, 53, 0.12), transparent 70%)" }} />
          <div data-reveal="0" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ marginBottom: 36, animation: "zlSpinSlow 40s linear infinite" }}><LogoMark size={72} /></div>
            <h2 style={{ fontFamily: SORA, fontWeight: 800, fontSize: "clamp(40px, 5.6vw, 80px)", letterSpacing: "-0.04em", lineHeight: 1.04, margin: "0 0 24px", textWrap: "balance" }}>
              Haz que tu empresa<br />
              <span style={{ background: "linear-gradient(100deg, #6D28D9, #FF6B35)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>fluya.</span>
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "#47546A", maxWidth: 540, margin: "0 0 44px", textWrap: "pretty" }}>
              Agenda una demo y descubre cómo Zentral puede organizar tu operación en semanas.
            </p>
            <a
              className="zl-cta-final"
              href="https://indrox.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "19px 40px", borderRadius: 999, background: "linear-gradient(135deg, #6D28D9, #4C1D95)", color: "#fff", fontSize: 17.5, fontWeight: 600, boxShadow: "0 16px 40px rgba(109, 40, 217, 0.35)" }}
            >
              Agendar demo
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "34px 24px 46px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", borderTop: "1px solid rgba(15, 23, 42, 0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ display: "inline-flex" }}><LogoMark size={30} /></span>
          <span style={{ fontFamily: SORA, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>Zentral</span>
        </div>
        <div style={{ fontSize: 13.5, color: "#94A3B8" }}>© 2026 Zentral · El sistema de gestión que se adapta a tu negocio.</div>
      </footer>
    </div>
  );
}
