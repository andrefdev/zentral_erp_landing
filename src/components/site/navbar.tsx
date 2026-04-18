"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const ERP_MODULES = [
  { name: "Zentral People", desc: "RRHH y nóminas" },
  { name: "Zentral Work", desc: "Tareas y proyectos" },
  { name: "Zentral Docs", desc: "Docs y firma" },
  { name: "Zentral Drive", desc: "Almacenamiento" },
  { name: "Zentral Stock", desc: "Inventario" },
  { name: "Zentral Finance", desc: "Contabilidad · SUNAT" },
  { name: "Zentral Pay", desc: "Pagos recurrentes" },
  { name: "Zentral AI", desc: "Agentes operativos" },
];

const CRM_MODULES = [
  { name: "Captura", desc: "WhatsApp, LinkedIn, IG, Twitter, Facebook" },
  { name: "Pipeline", desc: "Deals, lead scoring, funnel 12 fases" },
  { name: "Outreach", desc: "Secuencias email · Apollo · Chrome IA" },
  { name: "Insights", desc: "Dashboard · atribución · smart lists" },
];

const RESOURCES = [
  { name: "Blog", desc: "Guías y casos LATAM", href: "/recursos/blog" },
  { name: "Casos de éxito", desc: "Clientes migrados", href: "/recursos/casos" },
  { name: "Documentación", desc: "Para tu equipo", href: "/recursos/documentacion" },
  { name: "Changelog", desc: "Qué lanzamos cada semana", href: "/recursos/changelog" },
];

export function Navbar() {
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "producto" | "recursos">(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const scheduleOpen = (m: "producto" | "recursos") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpenMenu(m), 120);
  };
  const scheduleClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpenMenu(null), 200);
  };
  const cancelClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const L = (p: string) => `/${locale}${p === "/" ? "" : p}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[#262626]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={L("/")} className="flex items-center gap-2.5 text-white">
            <Image src={logo} alt="Zentral" width={32} height={32} className="rounded-lg" priority />
            <span className="font-semibold text-lg tracking-tight">Zentral</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <div
              className="relative"
              onMouseEnter={() => scheduleOpen("producto")}
              onMouseLeave={scheduleClose}
            >
              <button className="text-sm text-[#A3A3A3] hover:text-white flex items-center gap-1 transition-colors">
                Producto <ChevronDown size={12} />
              </button>
            </div>
            <div
              className="relative"
              onMouseEnter={() => scheduleOpen("recursos")}
              onMouseLeave={scheduleClose}
            >
              <button className="text-sm text-[#A3A3A3] hover:text-white flex items-center gap-1 transition-colors">
                Recursos <ChevronDown size={12} />
              </button>
            </div>
            <Link href={L("/precios")} className="text-sm text-[#A3A3A3] hover:text-white transition-colors">Precios</Link>
            <Link href={L("/comparativa")} className="text-sm text-[#A3A3A3] hover:text-white transition-colors">Comparativa</Link>
          </nav>

          <div className="flex items-center gap-3">
            <a href="https://indrox.com/es/contact" className="btn-primary hidden md:inline-flex">Empieza gratis</a>
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Megamenu Producto */}
      <div
        className={`absolute left-0 right-0 top-full bg-white border-t border-[#E5E7EB] shadow-2xl transition-all duration-200 ${
          openMenu === "producto" ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
        }`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2 mb-4 text-[#111]">
              <div className="w-8 h-8 rounded-lg bg-[#111] text-white grid place-items-center text-sm font-bold">E</div>
              <div>
                <div className="font-display font-semibold">Zentral ERP</div>
                <div className="text-xs text-[#555]">La operación conectada</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {ERP_MODULES.map((m) => (
                <Link key={m.name} href={L("/#erp")} className="module-item">
                  <span className="text-[#9333EA]">●</span>
                  <div>
                    <div className="text-sm font-medium text-[#111]">{m.name}</div>
                    <div className="text-xs text-[#555]">{m.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex gap-4 text-sm">
              <Link href={L("/#erp")} className="text-[#9333EA] font-medium hover:underline">Ver todos los módulos del ERP →</Link>
              <Link href={L("/comparativa")} className="text-[#555] hover:text-[#111]">vs. Odoo / Defontana</Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 mb-4 text-[#111]">
              <div className="w-8 h-8 rounded-lg bg-[#111] text-white grid place-items-center text-sm font-bold">C</div>
              <div>
                <div className="font-display font-semibold">Zentral CRM</div>
                <div className="text-xs text-[#555]">La venta conectada</div>
              </div>
            </div>
            <div className="space-y-1">
              {CRM_MODULES.map((m) => (
                <Link key={m.name} href={L("/#crm")} className="module-item">
                  <span className="text-[#9333EA]">●</span>
                  <div>
                    <div className="text-sm font-medium text-[#111]">{m.name}</div>
                    <div className="text-xs text-[#555]">{m.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-sm">
              <Link href={L("/#crm")} className="text-[#9333EA] font-medium hover:underline">Ver los 15 módulos del CRM →</Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="bg-[#F3F0FF] rounded-xl p-5 h-full flex flex-col">
              <span className="badge mb-3 self-start">Recomendado</span>
              <div className="font-display text-xl font-semibold text-[#111] mb-1">Zentral Suite</div>
              <p className="text-sm text-[#555] mb-4">ERP + CRM en un solo login, sin integradores.</p>
              <ul className="space-y-2 text-sm text-[#111] mb-5 flex-1">
                <li className="flex gap-2"><span className="text-[#9333EA]">✓</span> Onboarding gratis &lt; 3 semanas</li>
                <li className="flex gap-2"><span className="text-[#9333EA]">✓</span> Desde USD $199/mes · 10 usuarios</li>
                <li className="flex gap-2"><span className="text-[#9333EA]">✓</span> 25% off primeros 50 clientes</li>
              </ul>
              <Link href={L("/precios")} className="btn-primary w-full">Ver Suite completa</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Megamenu Recursos */}
      <div
        className={`absolute left-0 right-0 top-full bg-white border-t border-[#E5E7EB] shadow-2xl transition-all duration-200 ${
          openMenu === "recursos" ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
        }`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {RESOURCES.map((r) => (
            <Link key={r.name} href={L(r.href)} className="module-item">
              <span className="text-[#9333EA]">●</span>
              <div>
                <div className="text-sm font-medium text-[#111]">{r.name}</div>
                <div className="text-xs text-[#555]">{r.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-[#262626]">
          <div className="px-6 py-6 space-y-4 text-white">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer py-2 list-none">
                <span className="font-medium">Producto</span>
                <ChevronDown size={16} className="group-open:rotate-180 transition" />
              </summary>
              <div className="mt-2 pl-3 space-y-2 text-sm text-[#A3A3A3]">
                <div className="font-semibold text-white mt-2">Zentral ERP</div>
                <Link href={L("/#erp")} className="block">People · Work · Docs · Drive · Stock · Finance · Pay · AI</Link>
                <div className="font-semibold text-white mt-3">Zentral CRM</div>
                <Link href={L("/#crm")} className="block">Captura · Pipeline · Outreach · Insights</Link>
                <Link href={L("/precios")} className="block text-[#9333EA] mt-3">Ver Suite completa →</Link>
              </div>
            </details>
            <Link href={L("/precios")} className="block py-2 font-medium">Precios</Link>
            <Link href={L("/comparativa")} className="block py-2 font-medium">Comparativa</Link>
            <Link href={L("/recursos")} className="block py-2 font-medium">Recursos</Link>
            <a href="https://indrox.com/es/contact" className="btn-primary w-full justify-center mt-2">Empieza gratis</a>
          </div>
        </div>
      )}
    </header>
  );
}
