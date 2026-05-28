import { site } from "@/config/site";

const cols = [
  {
    h: "Producto",
    links: [
      { label: "Las 8 soluciones", href: "#solucion" },
      { label: "Precios", href: "#precios" },
      { label: "Comparativas", href: "#comparativa" },
      { label: "Casos", href: "#casos" },
    ],
  },
  {
    h: "Empresa",
    links: [
      { label: "Sobre Zentral", href: "#" },
      { label: "Indrox", href: "#" },
      { label: "Trabaja con nosotros", href: "#" },
      { label: "Contacto", href: "#" },
    ],
  },
  {
    h: "Legal",
    links: [
      { label: "Términos", href: "#" },
      { label: "Privacidad", href: "#" },
      { label: "Seguridad", href: "#" },
    ],
  },
  {
    h: "Contacto",
    links: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: "WhatsApp", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Lima, Perú", href: "#" },
    ],
  },
];

export function Footer(_props: { locale?: string } = {}) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="logo" href="#top" aria-label="Zentral · Inicio">
            <span className="logo-mark" aria-hidden="true" />
            <span>zentral</span>
          </a>
          <p>El ERP que trabaja por ti. Operación, IA y customización en un solo lugar.</p>
        </div>
        <div className="footer-cols">
          {cols.map((c) => (
            <div className="footer-col" key={c.h}>
              <div className="footer-h">{c.h}</div>
              {c.links.map((l) => (
                <a key={l.label} href={l.href}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Zentral · Un producto de Indrox</span>
        <span>Hecho en Perú 🇵🇪</span>
      </div>
    </footer>
  );
}
