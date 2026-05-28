"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/config/site";

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Zentral · Inicio">
      <span className="logo-mark" aria-hidden="true" />
      <span>zentral</span>
    </a>
  );
}

export function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${stuck ? "is-stuck" : ""}`} aria-label="Principal">
        <div className="nav-inner">
          <Logo />
          <ul className="nav-links" role="list">
            {nav.links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
          <div className="nav-cta">
            <a className="btn btn--ghost" href={nav.loginHref} style={{ borderColor: "transparent" }}>{nav.loginLabel}</a>
            <a className="btn btn--primary" href={nav.ctaHref}>{nav.ctaLabel}</a>
          </div>
          <button
            className="hamburger"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      <div className={`mob-scrim ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden />
      <aside className={`mob-drawer ${open ? "is-open" : ""}`} aria-label="Menú" aria-hidden={!open}>
        <div className="mob-drawer-head">
          <Logo />
          <button className="hamburger" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <ul className="mob-drawer-links" role="list">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mob-drawer-cta">
          <a className="btn btn--ghost" href={nav.loginHref} style={{ justifyContent: "center" }}>{nav.loginLabel}</a>
          <a className="btn btn--primary" href={nav.ctaHref} style={{ justifyContent: "center" }}>{nav.ctaLabel}</a>
        </div>
      </aside>
    </>
  );
}
