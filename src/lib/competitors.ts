export type FeatureValue = true | false | "partial" | string;

export type Competitor = {
  slug: string;
  name: string;
  legalName: string;
  homepage: string;
  logoHint: string;
  country: string;
  category: string;
  shortPitch: string;
  oneLiner: string;
  priceFromUsd: number;
  priceNote: string;
  implementationWeeks: string;
  strengths: string[];
  weaknesses: string[];
  whenTheyWin: string;
  whenZentralWins: string;
  migrationNote: string;
  features: { label: string; competitor: FeatureValue; zentral: FeatureValue }[];
  faqs: { q: string; a: string }[];
  searchVolume: "high" | "medium" | "low";
};

export const ZENTRAL = {
  name: "Zentral Suite",
  legalName: "Zentral by Indrox",
  homepage: "https://zentral.indrox.com",
  priceFromUsd: 199,
  priceNote: "USD $199/mes para 10 usuarios",
  implementationWeeks: "< 3 semanas",
};

export const COMPETITORS: Competitor[] = [
  {
    slug: "defontana",
    name: "Defontana",
    legalName: "Defontana S.A.",
    homepage: "https://www.defontana.com",
    logoHint: "Defontana",
    country: "Chile",
    category: "ERP contable",
    searchVolume: "high",
    shortPitch: "ERP contable líder en Chile, fuerte en facturación electrónica SII.",
    oneLiner: "Resuelve contabilidad y SII, pero no tiene CRM ni captura de leads ni IA.",
    priceFromUsd: 250,
    priceNote: "Desde USD $250/mes con módulos básicos",
    implementationWeeks: "1–3 meses",
    strengths: [
      "Cumplimiento SII robusto",
      "Marca consolidada en Chile",
      "Soporte local en español",
    ],
    weaknesses: [
      "Sin CRM nativo ni captura de leads",
      "Sin IA operativa ni conversacional",
      "Interfaz desactualizada respecto a SaaS modernos",
      "Personalización visual limitada",
    ],
    whenTheyWin: "Empresas contables puras que solo necesitan facturación SII y libros.",
    whenZentralWins: "Cuando además del ERP necesitas CRM, captura desde WhatsApp/redes y automatización con IA — en un solo sistema y a menor costo.",
    migrationNote: "Importador nativo de clientes, productos y facturas Defontana. Migración asistida sin cargo extra.",
    features: [
      { label: "ERP + CRM nativo (misma DB)", competitor: false, zentral: true },
      { label: "Facturación electrónica SII (CL)", competitor: true, zentral: true },
      { label: "SUNAT electrónica (PE)", competitor: true, zentral: true },
      { label: "Captura WhatsApp nativa", competitor: false, zentral: true },
      { label: "Captura LinkedIn / IG / FB", competitor: false, zentral: true },
      { label: "IA operativa", competitor: false, zentral: true },
      { label: "IA conversacional CRM", competitor: false, zentral: true },
      { label: "Asistente IA en Chrome", competitor: false, zentral: true },
      { label: "Onboarding incluido", competitor: "partial", zentral: true },
      { label: "Tiempo de implementación", competitor: "1–3 meses", zentral: "< 3 semanas" },
      { label: "Precio 10 usuarios / mes", competitor: "USD $250+", zentral: "USD $199" },
      { label: "API y webhooks abiertos", competitor: "partial", zentral: true },
    ],
    faqs: [
      {
        q: "¿Es Zentral más barato que Defontana?",
        a: "Sí. Zentral cuesta USD $199/mes para 10 usuarios incluyendo ERP + CRM + IA. Defontana parte en USD $250/mes solo con módulos contables, sin CRM ni IA.",
      },
      {
        q: "¿Puedo migrar mis datos de Defontana a Zentral?",
        a: "Sí. Zentral tiene un importador nativo para clientes, productos, facturas y plan de cuentas Defontana. La migración asistida está incluida en el onboarding.",
      },
      {
        q: "¿Zentral emite documentos electrónicos al SII chileno?",
        a: "Sí. Zentral está certificado para emitir facturas, boletas, notas de crédito y guías de despacho ante el SII y la SUNAT.",
      },
      {
        q: "¿Cuánto demora implementar Zentral comparado con Defontana?",
        a: "Zentral está operativo en menos de 3 semanas con onboarding incluido. Una implementación típica de Defontana toma entre 1 y 3 meses.",
      },
    ],
  },
  {
    slug: "odoo",
    name: "Odoo",
    legalName: "Odoo S.A.",
    homepage: "https://www.odoo.com",
    logoHint: "Odoo",
    country: "Bélgica / Global",
    category: "ERP modular open source",
    searchVolume: "high",
    shortPitch: "Suite ERP modular con más de 40 apps, fuerte ecosistema de partners.",
    oneLiner: "Muy potente y flexible, pero requiere consultora y 3–6 meses para estar en producción.",
    priceFromUsd: 311,
    priceNote: "Desde USD $311/mes para 10 usuarios (plan Standard)",
    implementationWeeks: "3–6 meses",
    strengths: [
      "Catálogo amplio de módulos",
      "Open source con comunidad activa",
      "Personalización profunda vía código",
    ],
    weaknesses: [
      "Dependencia de partners para implementar",
      "Curva de aprendizaje alta",
      "Costos ocultos en customización",
      "Soporte LATAM vía terceros",
    ],
    whenTheyWin: "Empresas medianas con equipo técnico interno o partner dedicado y procesos muy específicos.",
    whenZentralWins: "Cuando necesitas estar operativo en semanas, no meses, sin depender de un partner ni pagar consultoría aparte.",
    migrationNote: "Importador para módulos Sales, CRM, Inventory e Invoicing de Odoo vía CSV y API.",
    features: [
      { label: "ERP + CRM nativo (misma DB)", competitor: "partial", zentral: true },
      { label: "Implementación sin partner", competitor: false, zentral: true },
      { label: "Captura WhatsApp nativa", competitor: false, zentral: true },
      { label: "Captura redes sociales", competitor: false, zentral: true },
      { label: "IA operativa", competitor: "partial", zentral: true },
      { label: "IA conversacional", competitor: false, zentral: true },
      { label: "Asistente IA en Chrome", competitor: false, zentral: true },
      { label: "Onboarding incluido", competitor: false, zentral: true },
      { label: "SII / SUNAT electrónica nativa", competitor: "Plugin", zentral: true },
      { label: "Tiempo de implementación", competitor: "3–6 meses", zentral: "< 3 semanas" },
      { label: "Precio 10 usuarios / mes", competitor: "USD $311+", zentral: "USD $199" },
      { label: "Soporte en español LATAM", competitor: "partial", zentral: true },
    ],
    faqs: [
      {
        q: "¿Cuál es la diferencia principal entre Zentral y Odoo?",
        a: "Zentral viene precargado con ERP + CRM + IA listos para LATAM y se implementa en menos de 3 semanas sin partner. Odoo requiere configuración modular y normalmente un partner durante 3–6 meses.",
      },
      {
        q: "¿Es Zentral más barato que Odoo?",
        a: "Sí. Zentral cuesta USD $199/mes para 10 usuarios todo incluido. Odoo parte en USD $311/mes y suma costos por módulos premium, hosting y horas de consultora.",
      },
      {
        q: "¿Zentral es open source como Odoo?",
        a: "No. Zentral es SaaS propietario, lo que significa actualizaciones automáticas, sin servidores propios, y soporte directo del fabricante incluido en el precio.",
      },
      {
        q: "¿Cuánto demora migrar de Odoo a Zentral?",
        a: "La migración típica toma 5 a 10 días hábiles. Importamos clientes, productos, facturas e historial de oportunidades vía API y CSV.",
      },
    ],
  },
  {
    slug: "zoho",
    name: "Zoho One",
    legalName: "Zoho Corporation",
    homepage: "https://www.zoho.com/one/",
    logoHint: "Zoho",
    country: "India / Global",
    category: "Suite SaaS multi-app",
    searchVolume: "high",
    shortPitch: "Suite de más de 40 apps SaaS para ventas, marketing, finanzas y operaciones.",
    oneLiner: "Muchas apps pero la integración ERP-CRM no es nativa y el costo escala por usuario.",
    priceFromUsd: 370,
    priceNote: "USD $37/usuario/mes — USD $370/mes para 10 usuarios",
    implementationWeeks: "1–2 meses",
    strengths: [
      "Catálogo enorme de apps",
      "CRM maduro",
      "Precio competitivo por app individual",
    ],
    weaknesses: [
      "Integración entre apps no es nativa",
      "UX inconsistente entre módulos",
      "Sin facturación electrónica SII/SUNAT nativa",
      "IA limitada al asistente Zia",
    ],
    whenTheyWin: "Equipos que ya usan varias apps Zoho y quieren consolidar licencias.",
    whenZentralWins: "Cuando quieres una sola base de datos para ERP + CRM con cumplimiento tributario LATAM y precio fijo por equipo, no por usuario.",
    migrationNote: "Importador para Zoho CRM (contactos, deals, cuentas) y Zoho Books (facturas, clientes).",
    features: [
      { label: "ERP + CRM nativo (misma DB)", competitor: "partial", zentral: true },
      { label: "Precio fijo (no por usuario)", competitor: false, zentral: true },
      { label: "SII / SUNAT electrónica nativa", competitor: false, zentral: true },
      { label: "Captura WhatsApp nativa", competitor: "partial", zentral: true },
      { label: "Captura LinkedIn / IG / FB", competitor: false, zentral: true },
      { label: "IA operativa", competitor: "partial", zentral: true },
      { label: "Asistente IA en Chrome", competitor: false, zentral: true },
      { label: "Tiempo de implementación", competitor: "1–2 meses", zentral: "< 3 semanas" },
      { label: "Precio 10 usuarios / mes", competitor: "USD $370", zentral: "USD $199" },
      { label: "Soporte español LATAM", competitor: "partial", zentral: true },
    ],
    faqs: [
      {
        q: "¿Es Zoho One una alternativa a Zentral?",
        a: "Zoho One ofrece muchas apps separadas con integraciones entre ellas. Zentral ofrece ERP + CRM en una sola base de datos, sin sincronización entre apps.",
      },
      {
        q: "¿Cuál es más barato, Zentral o Zoho?",
        a: "Zentral. Para 10 usuarios Zentral cuesta USD $199/mes vs USD $370/mes de Zoho One. Zentral es ~46% más económico.",
      },
      {
        q: "¿Zoho emite documentos tributarios en Chile o Perú?",
        a: "No de forma nativa. Requiere integraciones de terceros. Zentral emite facturas electrónicas SII y SUNAT directamente.",
      },
    ],
  },
  {
    slug: "nubox",
    name: "Nubox",
    legalName: "Nubox SpA",
    homepage: "https://www.nubox.com",
    logoHint: "Nubox",
    country: "Chile",
    category: "Software contable PYME",
    searchVolume: "high",
    shortPitch: "Software contable y de remuneraciones popular en pymes chilenas.",
    oneLiner: "Excelente para contabilidad de pyme, pero no es un ERP ni cubre la operación comercial.",
    priceFromUsd: 80,
    priceNote: "Desde USD $80/mes según módulos",
    implementationWeeks: "1–4 semanas",
    strengths: [
      "Precio accesible",
      "Contabilidad y remuneraciones bien resueltas",
      "Soporte chileno",
    ],
    weaknesses: [
      "No es un ERP completo",
      "Sin CRM ni gestión comercial",
      "Sin captura de leads ni IA",
      "Reporting básico",
    ],
    whenTheyWin: "Microempresas que solo necesitan facturar, llevar contabilidad y liquidar sueldos.",
    whenZentralWins: "Cuando creces y necesitas gestionar ventas, postventa, inventario y marketing en el mismo sistema.",
    migrationNote: "Importador para clientes, productos y facturas Nubox. Plan de cuentas estándar.",
    features: [
      { label: "ERP + CRM completo", competitor: false, zentral: true },
      { label: "Gestión de inventario", competitor: "partial", zentral: true },
      { label: "Captura WhatsApp / redes", competitor: false, zentral: true },
      { label: "Pipeline comercial", competitor: false, zentral: true },
      { label: "IA operativa y conversacional", competitor: false, zentral: true },
      { label: "Facturación SII", competitor: true, zentral: true },
      { label: "Remuneraciones", competitor: true, zentral: "partial" },
      { label: "Precio 10 usuarios / mes", competitor: "USD $80–150", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: "¿Zentral reemplaza a Nubox?",
        a: "Para la mayoría de las pymes, sí. Zentral cubre facturación SII, inventario, ventas, CRM y reportes. Si tu necesidad principal son remuneraciones, Nubox sigue siendo fuerte ahí.",
      },
      {
        q: "¿Es Zentral más caro que Nubox?",
        a: "El precio base es mayor (USD $199 vs USD $80), pero Zentral incluye CRM, captura de leads, IA y pipeline comercial — funcionalidad que con Nubox tendrías que contratar aparte.",
      },
    ],
  },
  {
    slug: "manager",
    name: "Manager (Softland)",
    legalName: "Softland",
    homepage: "https://www.softland.cl",
    logoHint: "Softland Manager",
    country: "Chile / LATAM",
    category: "ERP empresarial",
    searchVolume: "medium",
    shortPitch: "ERP empresarial de larga trayectoria en Chile, Colombia y Perú.",
    oneLiner: "Robusto pero pesado: implementaciones largas, costos altos y UX legacy.",
    priceFromUsd: 400,
    priceNote: "Desde USD $400+/mes según módulos y usuarios",
    implementationWeeks: "2–6 meses",
    strengths: [
      "Funcionalidad ERP profunda",
      "Presencia regional consolidada",
      "Módulos verticales (construcción, retail)",
    ],
    weaknesses: [
      "UX legacy",
      "Implementaciones largas y costosas",
      "Sin CRM moderno ni captura de leads",
      "IA inexistente o muy limitada",
    ],
    whenTheyWin: "Empresas grandes (>100 empleados) con procesos industriales complejos.",
    whenZentralWins: "PYMES y empresas medianas que quieren la potencia de un ERP sin el costo y la lentitud de implementación de Softland.",
    migrationNote: "Migración asistida desde Softland Manager con plantillas CSV y API.",
    features: [
      { label: "Interfaz moderna SaaS", competitor: false, zentral: true },
      { label: "ERP + CRM unificado", competitor: false, zentral: true },
      { label: "IA operativa", competitor: false, zentral: true },
      { label: "Captura WhatsApp / redes", competitor: false, zentral: true },
      { label: "Implementación sin consultor", competitor: false, zentral: true },
      { label: "Tiempo de implementación", competitor: "2–6 meses", zentral: "< 3 semanas" },
      { label: "Precio 10 usuarios / mes", competitor: "USD $400+", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: "¿Zentral reemplaza a Softland Manager?",
        a: "Para pymes y empresas medianas (hasta ~80 empleados), sí. Zentral cubre los procesos core de Softland (ventas, compras, inventario, contabilidad) con UX moderna y a 1/3 del costo.",
      },
      {
        q: "¿Qué pasa con la migración desde Softland?",
        a: "Tenemos un proceso de migración asistida de 2 a 4 semanas que importa maestros, saldos contables y operaciones del último ejercicio.",
      },
    ],
  },
  {
    slug: "bsale",
    name: "Bsale",
    legalName: "Bsale",
    homepage: "https://www.bsale.cl",
    logoHint: "Bsale",
    country: "Chile",
    category: "POS + facturación retail",
    searchVolume: "medium",
    shortPitch: "POS y facturación electrónica enfocado en retail físico y e-commerce.",
    oneLiner: "Excelente POS, pero limitado como ERP/CRM para empresas que no son retail puro.",
    priceFromUsd: 60,
    priceNote: "Desde USD $60/mes por sucursal",
    implementationWeeks: "1–2 semanas",
    strengths: [
      "POS muy bien resuelto",
      "Integración Shopify, WooCommerce, Jumpseller",
      "Facturación SII fluida",
    ],
    weaknesses: [
      "No es ERP completo",
      "Sin CRM ni pipeline B2B",
      "Sin captura de leads ni IA",
      "Enfoque retail limita servicios y B2B",
    ],
    whenTheyWin: "Tiendas retail físicas y e-commerce con flujo de venta directa.",
    whenZentralWins: "Cuando vendes B2B, servicios o proyectos y necesitas CRM, presupuestos y proceso comercial completo.",
    migrationNote: "Importador para productos, stock y facturas Bsale.",
    features: [
      { label: "ERP completo (compras, contabilidad)", competitor: "partial", zentral: true },
      { label: "CRM B2B", competitor: false, zentral: true },
      { label: "Pipeline comercial", competitor: false, zentral: true },
      { label: "POS retail", competitor: true, zentral: "partial" },
      { label: "Captura WhatsApp / redes", competitor: false, zentral: true },
      { label: "IA operativa", competitor: false, zentral: true },
      { label: "Precio 10 usuarios / mes", competitor: "USD $60–200", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: "¿Bsale o Zentral para mi tienda?",
        a: "Si vendes solo retail físico/online, Bsale puede ser suficiente. Si además vendes B2B, servicios o necesitas CRM y gestión comercial, Zentral es mejor opción.",
      },
      {
        q: "¿Puedo usar Zentral como POS?",
        a: "Zentral incluye módulo de punto de venta básico. Para retail multi-sucursal alto volumen, mantén Bsale y conéctalo a Zentral vía API.",
      },
    ],
  },
  {
    slug: "sap-business-one",
    name: "SAP Business One",
    legalName: "SAP SE",
    homepage: "https://www.sap.com/products/erp/business-one.html",
    logoHint: "SAP B1",
    country: "Alemania / Global",
    category: "ERP empresarial",
    searchVolume: "medium",
    shortPitch: "ERP empresarial SAP para empresas medianas.",
    oneLiner: "Marca SAP y funcionalidad sólida, pero costo de entrada y dependencia de partner muy altos.",
    priceFromUsd: 1500,
    priceNote: "Desde USD $1.500+/mes con licencias y partner",
    implementationWeeks: "3–9 meses",
    strengths: [
      "Marca SAP y trazabilidad para crecer",
      "Funcionalidad ERP profunda",
      "Reportería avanzada",
    ],
    weaknesses: [
      "Costo de entrada altísimo (licencias + partner)",
      "Implementación 3–9 meses",
      "UX compleja, requiere capacitación",
      "Sin CRM moderno ni IA conversacional",
    ],
    whenTheyWin: "Empresas medianas-grandes con presupuesto >USD $50K/año y procesos industriales o de distribución complejos.",
    whenZentralWins: "PYMES y empresas en crecimiento que quieren el 80% de la funcionalidad ERP por el 10% del costo.",
    migrationNote: "Migración técnica vía SAP DI API. Recomendado para empresas que sobre-invirtieron en SAP B1.",
    features: [
      { label: "Implementación sin partner", competitor: false, zentral: true },
      { label: "Costo total año 1", competitor: "USD $50K+", zentral: "USD $2.4K" },
      { label: "CRM moderno + captura leads", competitor: false, zentral: true },
      { label: "IA operativa y conversacional", competitor: false, zentral: true },
      { label: "Tiempo de implementación", competitor: "3–9 meses", zentral: "< 3 semanas" },
    ],
    faqs: [
      {
        q: "¿Es Zentral una alternativa real a SAP Business One?",
        a: "Para empresas pequeñas y medianas, sí. Zentral cubre los procesos críticos (ventas, compras, inventario, contabilidad, CRM) sin licencias por usuario ni partner obligatorio.",
      },
      {
        q: "¿Cuánto puedo ahorrar migrando de SAP B1 a Zentral?",
        a: "Típicamente entre 70% y 90% del costo total anual (licencias + mantención + partner). Una empresa de 15 usuarios puede pasar de USD $50K/año a USD $3K/año.",
      },
    ],
  },
  {
    slug: "siigo",
    name: "Siigo",
    legalName: "Siigo S.A.",
    homepage: "https://www.siigo.com",
    logoHint: "Siigo",
    country: "Colombia / LATAM",
    category: "Software contable y ERP PYME",
    searchVolume: "high",
    shortPitch: "Software contable y ERP fuerte en Colombia, presente en Chile y México.",
    oneLiner: "Buena contabilidad y facturación, pero CRM e IA no son su foco.",
    priceFromUsd: 90,
    priceNote: "Desde USD $90/mes según plan",
    implementationWeeks: "2–6 semanas",
    strengths: [
      "Facturación electrónica DIAN sólida",
      "Plan contable LATAM bien resuelto",
      "Adopción amplia en Colombia",
    ],
    weaknesses: [
      "CRM limitado",
      "Sin captura WhatsApp / redes",
      "Sin IA conversacional",
      "Reporting comercial básico",
    ],
    whenTheyWin: "PYMES colombianas con foco contable y cumplimiento DIAN.",
    whenZentralWins: "Cuando necesitas ERP + CRM + captura comercial + IA, no solo contabilidad.",
    migrationNote: "Importador para maestros y facturas Siigo vía CSV/API.",
    features: [
      { label: "CRM moderno", competitor: false, zentral: true },
      { label: "Captura WhatsApp / redes", competitor: false, zentral: true },
      { label: "IA operativa", competitor: false, zentral: true },
      { label: "Pipeline B2B", competitor: false, zentral: true },
      { label: "Facturación DIAN (CO)", competitor: true, zentral: "partial" },
      { label: "Facturación SII / SUNAT", competitor: "partial", zentral: true },
      { label: "Precio 10 usuarios / mes", competitor: "USD $90–250", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: "¿Zentral funciona en Colombia como Siigo?",
        a: "Zentral está optimizado para Chile y Perú. Para Colombia, evalúa caso a caso o úsalo combinado con un emisor DIAN.",
      },
      {
        q: "¿Cuál tiene mejor CRM, Siigo o Zentral?",
        a: "Zentral. El CRM es nativo, incluye captura desde WhatsApp y redes, IA conversacional y pipeline B2B. Siigo se centra en contabilidad.",
      },
    ],
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

export function getCompetitorSlugs(): string[] {
  return COMPETITORS.map((c) => c.slug);
}
