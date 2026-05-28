export const site = {
  name: "Zentral",
  brand: "zentral",
  tagline: "El ERP que trabaja por ti.",
  description:
    "ERP modular con IA nativa para empresas latinoamericanas. Centraliza ventas, personal, tesorería, tareas y más en una sola plataforma.",
  email: "hola@zentral.so",
  whatsapp: "#",
  demoUrl: "https://indrox.com/contact",
} as const;

export const nav = {
  links: [
    { href: "#solucion", label: "Soluciones" },
    { href: "#precios", label: "Precios" },
    { href: "#casos", label: "Casos" },
  ],
  ctaHref: "https://indrox.com/contact",
  ctaLabel: "Agendar demo",
} as const;

export const customers = [
  "Distribuidora Norte",
  "Grupo Villena",
  "TechRetail",
  "LogiPyme",
  "ConsultExpress",
  "Importadora Andina",
] as const;
