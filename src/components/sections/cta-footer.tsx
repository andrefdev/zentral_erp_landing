"use client";

import { ScrollReveal, SectionNumber } from "@/components/scroll-reveal";

const footerLinks = {
  Producto: ["Módulos", "Precios", "Roadmap", "Comparativa"],
  Empresa: ["Sobre nosotros", "Blog", "Carreras", "Contacto"],
  Legal: ["Privacidad", "Términos", "SLA"],
};

export function CTAFooter() {
  return (
    <>
      {/* CTA Section */}
      <section className="bg-black py-32 lg:py-40 px-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionNumber number="10" />

          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-medium text-white leading-[1.15] tracking-[-0.015em] mb-6">
                Tu empresa merece más que herramientas fragmentadas.
              </h2>
              <p className="text-lg text-[#A3A3A3] leading-relaxed mb-10">
                Zentral es la plataforma operativa completa para PYMES en Perú y
                Latinoamérica.
              </p>
              <a
                href="#precios"
                className="inline-block bg-white text-black font-medium px-10 py-4 rounded-lg text-base hover:bg-[#9333EA] hover:text-white transition-all duration-200"
              >
                Empieza gratis
              </a>
              <p className="text-sm text-[#737373] mt-6">
                Contáctanos:{" "}
                <a
                  href="mailto:hello@indrox.com"
                  className="text-[#06B6D4] hover:underline"
                >
                  hello@indrox.com
                </a>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#262626] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">Z</span>
                </div>
                <span className="text-white font-semibold text-lg tracking-tight">
                  Zentral
                </span>
              </div>
              <p className="text-sm text-[#737373] leading-relaxed">
                La plataforma operativa
                <br />
                para PYMES en LATAM.
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-medium tracking-wider uppercase text-[#737373] mb-4">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#A3A3A3] hover:text-white transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#262626] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#737373]">
              &copy; 2026 Zentral. Todos los derechos reservados.
            </p>
            <p className="text-xs text-[#737373]">
              by{" "}
              <a
                href="https://indrox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A3A3A3] hover:text-white transition-colors"
              >
                Indrox
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
