export type Plan = {
  name: string;
  price: string;
  priceSuffix?: string;
  impl: string;
  for: string;
  features: string[];
  cta: string;
  featured?: boolean;
  ctaVariant: "primary" | "ghost";
};

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "USD 79",
    priceSuffix: "/ mes",
    impl: "+ USD 2,990 implementación",
    for: "Empresa pequeña que quiere ordenar áreas básicas.",
    features: [
      "Hasta 2 soluciones Zentral",
      "5 usuarios incluidos",
      "Onboarding guiado",
      "Soporte vía email",
      "Dashboard ejecutivo (Insights)",
    ],
    cta: "Empezar con Starter",
    ctaVariant: "ghost",
  },
  {
    name: "Professional",
    price: "USD 199",
    priceSuffix: "/ mes",
    impl: "+ USD 4,990 implementación",
    for: "Empresa en crecimiento que necesita varias soluciones conectadas.",
    features: [
      "Todo lo de Starter",
      "Hasta 4 soluciones",
      "15 usuarios incluidos",
      "IA Zentral cross-solución",
      "Reportes personalizados",
      "Soporte prioritario",
      "Integraciones básicas",
    ],
    cta: "Empezar con Professional",
    featured: true,
    ctaVariant: "primary",
  },
  {
    name: "Enterprise",
    price: "A medida",
    impl: "Desde USD 6,500 implementación",
    for: "Grupos empresariales y operaciones multi-empresa.",
    features: [
      "Todo lo de Professional",
      "Suite completa · 8 soluciones",
      "Multi-empresa y multi-sede",
      "Usuarios ilimitados",
      "Integraciones y módulos a medida",
      "Gerente de cuenta dedicado",
    ],
    cta: "Hablar con ventas",
    ctaVariant: "ghost",
  },
];

export const pricingTrust = [
  "Sin contrato de permanencia",
  "Demo antes de contratar",
  "Soporte durante implementación incluido",
];

export const pricingAddons =
  "Usuarios adicionales USD 15/mes · Módulos extra · Automatizaciones IA · Reportes personalizados";
