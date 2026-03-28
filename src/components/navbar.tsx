"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavDict {
  product: string;
  pricing: string;
  comparison: string;
  roadmap: string;
  cta: string;
}

export function Navbar({ dict, lang }: { dict: NavDict; lang: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: dict.product, href: "#solucion" },
    { label: dict.pricing, href: "#precios" },
    { label: dict.comparison, href: "#comparativa" },
    { label: dict.roadmap, href: "#roadmap" },
  ];

  const otherLang = lang === "es" ? "en" : "es";
  const otherLangLabel = lang === "es" ? "EN" : "ES";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-[#262626]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href={`/${lang}`} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">Z</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight hidden sm:block">
              Zentral
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#A3A3A3] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <a
              href={`/${otherLang}`}
              className="flex items-center gap-1.5 text-sm text-[#A3A3A3] hover:text-white transition-colors duration-200"
              aria-label={`Switch to ${otherLangLabel}`}
            >
              <Globe size={14} />
              <span className="hidden sm:inline">{otherLangLabel}</span>
            </a>

            <a
              href="#precios"
              className="bg-white text-black text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#9333EA] hover:text-white transition-all duration-300"
            >
              {dict.cta}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-[#262626]"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#A3A3A3] hover:text-white transition-colors text-base"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`/${otherLang}`}
                className="flex items-center gap-2 text-[#A3A3A3] hover:text-white transition-colors text-base"
              >
                <Globe size={16} />
                {otherLang === "en" ? "English" : "Español"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
