"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type NavLink = { label: string; href: string };

function Logo({ ariaLabel }: { ariaLabel: string }) {
  return (
    <a className="logo" href="#top" aria-label={ariaLabel}>
      <span className="logo-mark" aria-hidden="true" />
      <span>zentral</span>
    </a>
  );
}

export function Navbar() {
  const t = useTranslations("navbar");
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 16);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  const links = t.raw("links") as NavLink[];
  const ctaHref = "https://indrox.com/contact";

  return (
    <>
      <nav className={`nav ${stuck ? "is-stuck" : ""}`} aria-label={t("ariaPrimary")}>
        <motion.div
          className="nav-inner"
          layout
          transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
        >
          <Logo ariaLabel={t("ariaLogo")} />
          <ul className="nav-links" role="list">
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
          <div className="nav-cta">
            <a className="btn btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer">{t("ctaLabel")}</a>
          </div>
          <button
            className="hamburger"
            aria-label={t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </motion.div>
      </nav>

      <div className={`mob-scrim ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden />
      <aside className={`mob-drawer ${open ? "is-open" : ""}`} aria-label={t("ariaMenu")} aria-hidden={!open}>
        <div className="mob-drawer-head">
          <Logo ariaLabel={t("ariaLogo")} />
          <button className="hamburger" aria-label={t("closeMenu")} onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <ul className="mob-drawer-links" role="list">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="mob-drawer-cta">
          <a className="btn btn--primary" href={ctaHref} target="_blank" rel="noopener noreferrer" style={{ justifyContent: "center" }}>{t("ctaLabel")}</a>
        </div>
      </aside>
    </>
  );
}
