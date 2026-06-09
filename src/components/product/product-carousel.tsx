"use client";

import { useCallback, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import dashboard from "@/assets/erp-pics/01-dashboard.png";
import crm from "@/assets/erp-pics/02-crm-pipeline.png";
import ventas from "@/assets/erp-pics/03-ventas-facturacion.png";
import cobranzas from "@/assets/erp-pics/04-cobranzas.png";
import proyectos from "@/assets/erp-pics/05-proyectos.png";
import rrhh from "@/assets/erp-pics/06-recursos-humanos.png";
import tesoreria from "@/assets/erp-pics/07-tesoreria.png";
import contabilidad from "@/assets/erp-pics/08-contabilidad.png";
import okrs from "@/assets/erp-pics/09-okrs-kpis.png";
import activos from "@/assets/erp-pics/10-activos.png";
import tareas from "@/assets/erp-pics/11-tareas.png";

const IMAGES: Record<string, StaticImageData> = {
  dashboard, crm, ventas, cobranzas, proyectos, rrhh,
  tesoreria, contabilidad, okrs, activos, tareas,
};

export type Slide = {
  key: string;
  tab: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  url: string;
  bullets: string[];
};

const AUTOPLAY_MS = 7000;

export function ProductCarousel({ slides }: { slides: Slide[] }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number, direction: number) => {
      setState([(next + count) % count, direction]);
    },
    [count]
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, next]);

  const slide = slides[index];
  const img = IMAGES[slide.key];

  return (
    <div
      className="pcar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Tab strip */}
      <div className="pcar-tabs" role="tablist" aria-label="Módulos de Zentral">
        {slides.map((s, i) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={i === index}
            className={`pcar-tab ${i === index ? "is-active" : ""}`}
            onClick={() => go(i, i > index ? 1 : -1)}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="pcar-stage-row">
        {/* Screenshot stage */}
        <div className="pcar-stage">
          <div className="pcar-frame">
            <div className="mock-chrome">
              <div className="mock-dots"><span /><span /><span /></div>
              <div className="mock-url">{slide.url}</div>
              <div style={{ width: 48 }} />
            </div>
            <div className="pcar-screen">
              <motion.div
                key={slide.key}
                className="pcar-screen-inner"
                initial={{ opacity: 0, x: dir > 0 ? 48 : -48 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={img}
                  alt={slide.title}
                  placeholder="blur"
                  sizes="(max-width: 980px) 100vw, 760px"
                  priority={index === 0}
                />
              </motion.div>
            </div>
          </div>

          <button className="pcar-nav prev" onClick={prev} aria-label="Anterior">
            <ArrowLeft size={18} />
          </button>
          <button className="pcar-nav next" onClick={next} aria-label="Siguiente">
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Copy panel */}
        <div className="pcar-copy">
          <motion.div
            key={slide.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow"><span className="pulse" />{slide.eyebrow}</span>
            <h3 className="pcar-title">{slide.title}</h3>
            <p className="pcar-sub">{slide.subtitle}</p>
            <ul className="pcar-bullets">
              {slide.bullets.map((b) => (
                <li key={b}><Check size={15} />{b}</li>
              ))}
            </ul>
          </motion.div>

          <div className="pcar-dots" aria-hidden>
            {slides.map((s, i) => (
              <button
                key={s.key}
                className={`pcar-dot ${i === index ? "is-active" : ""}`}
                onClick={() => go(i, i > index ? 1 : -1)}
                tabIndex={-1}
                aria-label={s.tab}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
