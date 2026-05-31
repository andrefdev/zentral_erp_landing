export type FeatureValue = boolean | "partial" | string | { es: string; en: string };
export type Locale = "es" | "en";

type LStr = { es: string; en: string };

type LocalizedFeature = {
  label: LStr;
  competitor: FeatureValue;
  zentral: FeatureValue;
};

type LocalizedFaq = { q: LStr; a: LStr };

export type RawCompetitor = {
  slug: string;
  name: string;
  legalName: string;
  homepage: string;
  logoHint: string;
  country: string;
  category: LStr;
  priceFromUsd: number;
  priceNote: LStr;
  implementationWeeks: LStr;
  shortPitch: LStr;
  oneLiner: LStr;
  whenTheyWin: LStr;
  whenZentralWins: LStr;
  migrationNote: LStr;
  strengths: LStr[];
  weaknesses: LStr[];
  features: LocalizedFeature[];
  faqs: LocalizedFaq[];
  searchVolume: "high" | "medium" | "low";
};

export type Competitor = {
  slug: string;
  name: string;
  legalName: string;
  homepage: string;
  logoHint: string;
  country: string;
  category: string;
  priceFromUsd: number;
  priceNote: string;
  implementationWeeks: string;
  shortPitch: string;
  oneLiner: string;
  whenTheyWin: string;
  whenZentralWins: string;
  migrationNote: string;
  strengths: string[];
  weaknesses: string[];
  features: {
    label: string;
    competitor: true | false | "partial" | string;
    zentral: true | false | "partial" | string;
  }[];
  faqs: { q: string; a: string }[];
  searchVolume: "high" | "medium" | "low";
};

export const ZENTRAL = {
  name: "Zentral Suite",
  legalName: "Zentral by Indrox",
  homepage: "https://zentral.indrox.com",
  priceFromUsd: 199,
  priceNote: { es: "USD $199/mes para 10 usuarios", en: "USD $199/month for 10 users" },
  implementationWeeks: { es: "< 3 semanas", en: "< 3 weeks" },
};

function resolveFeatureValue(v: FeatureValue, l: Locale): true | false | "partial" | string {
  if (typeof v === "object") return v[l];
  return v;
}

const RAW: RawCompetitor[] = [
  {
    slug: "defontana",
    name: "Defontana",
    legalName: "Defontana S.A.",
    homepage: "https://www.defontana.com",
    logoHint: "Defontana",
    country: "Chile",
    searchVolume: "high",
    category: { es: "ERP contable", en: "Accounting ERP" },
    priceFromUsd: 250,
    priceNote: { es: "Desde USD $250/mes con módulos básicos", en: "From USD $250/month with basic modules" },
    implementationWeeks: { es: "1–3 meses", en: "1–3 months" },
    shortPitch: {
      es: "ERP contable líder en Chile, fuerte en facturación electrónica SII.",
      en: "Leading accounting ERP in Chile, strong on SII electronic invoicing.",
    },
    oneLiner: {
      es: "Resuelve contabilidad y SII, pero no tiene CRM ni captura de leads ni IA.",
      en: "Solves accounting and SII, but lacks CRM, lead capture and AI.",
    },
    whenTheyWin: {
      es: "Empresas contables puras que solo necesitan facturación SII y libros.",
      en: "Accounting-only companies that just need SII invoicing and ledgers.",
    },
    whenZentralWins: {
      es: "Cuando además del ERP necesitas CRM, captura desde WhatsApp/redes y automatización con IA — en un solo sistema y a menor costo.",
      en: "When besides ERP you need CRM, capture from WhatsApp/social and AI automation — in one system and at lower cost.",
    },
    migrationNote: {
      es: "Importador nativo de clientes, productos y facturas Defontana. Migración asistida sin cargo extra.",
      en: "Native importer for Defontana customers, products and invoices. Assisted migration at no extra cost.",
    },
    strengths: [
      { es: "Cumplimiento SII robusto", en: "Robust SII compliance" },
      { es: "Marca consolidada en Chile", en: "Established brand in Chile" },
      { es: "Soporte local en español", en: "Local Spanish-speaking support" },
    ],
    weaknesses: [
      { es: "Sin CRM nativo ni captura de leads", en: "No native CRM or lead capture" },
      { es: "Sin IA operativa ni conversacional", en: "No operational or conversational AI" },
      { es: "Interfaz desactualizada respecto a SaaS modernos", en: "Dated UI compared to modern SaaS" },
      { es: "Personalización visual limitada", en: "Limited visual customization" },
    ],
    features: [
      { label: { es: "ERP + CRM nativo (misma DB)", en: "Native ERP + CRM (same DB)" }, competitor: false, zentral: true },
      { label: { es: "Facturación electrónica SII (CL)", en: "Electronic invoicing SII (CL)" }, competitor: true, zentral: true },
      { label: { es: "SUNAT electrónica (PE)", en: "SUNAT electronic invoicing (PE)" }, competitor: true, zentral: true },
      { label: { es: "Captura WhatsApp nativa", en: "Native WhatsApp capture" }, competitor: false, zentral: true },
      { label: { es: "Captura LinkedIn / IG / FB", en: "LinkedIn / IG / FB capture" }, competitor: false, zentral: true },
      { label: { es: "IA operativa", en: "Operational AI" }, competitor: false, zentral: true },
      { label: { es: "IA conversacional CRM", en: "Conversational CRM AI" }, competitor: false, zentral: true },
      { label: { es: "Asistente IA en Chrome", en: "Chrome AI assistant" }, competitor: false, zentral: true },
      { label: { es: "Onboarding incluido", en: "Onboarding included" }, competitor: "partial", zentral: true },
      { label: { es: "Tiempo de implementación", en: "Implementation time" }, competitor: { es: "1–3 meses", en: "1–3 months" }, zentral: { es: "< 3 semanas", en: "< 3 weeks" } },
      { label: { es: "Precio 10 usuarios / mes", en: "Price 10 users / month" }, competitor: "USD $250+", zentral: "USD $199" },
      { label: { es: "API y webhooks abiertos", en: "Open API and webhooks" }, competitor: "partial", zentral: true },
    ],
    faqs: [
      {
        q: { es: "¿Es Zentral más barato que Defontana?", en: "Is Zentral cheaper than Defontana?" },
        a: {
          es: "Sí. Zentral cuesta USD $199/mes para 10 usuarios incluyendo ERP + CRM + IA. Defontana parte en USD $250/mes solo con módulos contables, sin CRM ni IA.",
          en: "Yes. Zentral costs USD $199/month for 10 users including ERP + CRM + AI. Defontana starts at USD $250/month with accounting modules only, without CRM or AI.",
        },
      },
      {
        q: { es: "¿Puedo migrar mis datos de Defontana a Zentral?", en: "Can I migrate my data from Defontana to Zentral?" },
        a: {
          es: "Sí. Zentral tiene un importador nativo para clientes, productos, facturas y plan de cuentas Defontana. La migración asistida está incluida en el onboarding.",
          en: "Yes. Zentral has a native importer for Defontana customers, products, invoices and chart of accounts. Assisted migration is included in onboarding.",
        },
      },
      {
        q: { es: "¿Zentral emite documentos electrónicos al SII chileno?", en: "Does Zentral issue electronic documents to the Chilean SII?" },
        a: {
          es: "Sí. Zentral está certificado para emitir facturas, boletas, notas de crédito y guías de despacho ante el SII y la SUNAT.",
          en: "Yes. Zentral is certified to issue invoices, receipts, credit notes and dispatch slips for SII and SUNAT.",
        },
      },
      {
        q: { es: "¿Cuánto demora implementar Zentral comparado con Defontana?", en: "How long does it take to implement Zentral versus Defontana?" },
        a: {
          es: "Zentral está operativo en menos de 3 semanas con onboarding incluido. Una implementación típica de Defontana toma entre 1 y 3 meses.",
          en: "Zentral is operational in under 3 weeks with onboarding included. A typical Defontana implementation takes between 1 and 3 months.",
        },
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
    searchVolume: "high",
    category: { es: "ERP modular open source", en: "Modular open source ERP" },
    priceFromUsd: 311,
    priceNote: { es: "Desde USD $311/mes para 10 usuarios (plan Standard)", en: "From USD $311/month for 10 users (Standard plan)" },
    implementationWeeks: { es: "3–6 meses", en: "3–6 months" },
    shortPitch: {
      es: "Suite ERP modular con más de 40 apps, fuerte ecosistema de partners.",
      en: "Modular ERP suite with 40+ apps and a strong partner ecosystem.",
    },
    oneLiner: {
      es: "Muy potente y flexible, pero requiere consultora y 3–6 meses para estar en producción.",
      en: "Powerful and flexible, but needs a consultancy and 3–6 months to be production-ready.",
    },
    whenTheyWin: {
      es: "Empresas medianas con equipo técnico interno o partner dedicado y procesos muy específicos.",
      en: "Mid-market companies with an in-house technical team or dedicated partner and very specific processes.",
    },
    whenZentralWins: {
      es: "Cuando necesitas estar operativo en semanas, no meses, sin depender de un partner ni pagar consultoría aparte.",
      en: "When you need to be operational in weeks, not months, without depending on a partner or paying separate consulting.",
    },
    migrationNote: {
      es: "Importador para módulos Sales, CRM, Inventory e Invoicing de Odoo vía CSV y API.",
      en: "Importer for Odoo's Sales, CRM, Inventory and Invoicing modules via CSV and API.",
    },
    strengths: [
      { es: "Catálogo amplio de módulos", en: "Wide catalog of modules" },
      { es: "Open source con comunidad activa", en: "Open source with active community" },
      { es: "Personalización profunda vía código", en: "Deep code-level customization" },
    ],
    weaknesses: [
      { es: "Dependencia de partners para implementar", en: "Reliance on partners to implement" },
      { es: "Curva de aprendizaje alta", en: "Steep learning curve" },
      { es: "Costos ocultos en customización", en: "Hidden costs in customization" },
      { es: "Soporte LATAM vía terceros", en: "LATAM support through third parties" },
    ],
    features: [
      { label: { es: "ERP + CRM nativo (misma DB)", en: "Native ERP + CRM (same DB)" }, competitor: "partial", zentral: true },
      { label: { es: "Implementación sin partner", en: "Implementation without a partner" }, competitor: false, zentral: true },
      { label: { es: "Captura WhatsApp nativa", en: "Native WhatsApp capture" }, competitor: false, zentral: true },
      { label: { es: "Captura redes sociales", en: "Social media capture" }, competitor: false, zentral: true },
      { label: { es: "IA operativa", en: "Operational AI" }, competitor: "partial", zentral: true },
      { label: { es: "IA conversacional", en: "Conversational AI" }, competitor: false, zentral: true },
      { label: { es: "Asistente IA en Chrome", en: "Chrome AI assistant" }, competitor: false, zentral: true },
      { label: { es: "Onboarding incluido", en: "Onboarding included" }, competitor: false, zentral: true },
      { label: { es: "SII / SUNAT electrónica nativa", en: "Native SII / SUNAT e-invoicing" }, competitor: { es: "Plugin", en: "Plugin" }, zentral: true },
      { label: { es: "Tiempo de implementación", en: "Implementation time" }, competitor: { es: "3–6 meses", en: "3–6 months" }, zentral: { es: "< 3 semanas", en: "< 3 weeks" } },
      { label: { es: "Precio 10 usuarios / mes", en: "Price 10 users / month" }, competitor: "USD $311+", zentral: "USD $199" },
      { label: { es: "Soporte en español LATAM", en: "Spanish LATAM support" }, competitor: "partial", zentral: true },
    ],
    faqs: [
      {
        q: { es: "¿Cuál es la diferencia principal entre Zentral y Odoo?", en: "What's the main difference between Zentral and Odoo?" },
        a: {
          es: "Zentral viene precargado con ERP + CRM + IA listos para LATAM y se implementa en menos de 3 semanas sin partner. Odoo requiere configuración modular y normalmente un partner durante 3–6 meses.",
          en: "Zentral ships preconfigured with ERP + CRM + AI ready for LATAM and is implemented in under 3 weeks without a partner. Odoo requires modular configuration and typically a partner for 3–6 months.",
        },
      },
      {
        q: { es: "¿Es Zentral más barato que Odoo?", en: "Is Zentral cheaper than Odoo?" },
        a: {
          es: "Sí. Zentral cuesta USD $199/mes para 10 usuarios todo incluido. Odoo parte en USD $311/mes y suma costos por módulos premium, hosting y horas de consultora.",
          en: "Yes. Zentral costs USD $199/month for 10 users all-in. Odoo starts at USD $311/month and adds costs for premium modules, hosting and consulting hours.",
        },
      },
      {
        q: { es: "¿Zentral es open source como Odoo?", en: "Is Zentral open source like Odoo?" },
        a: {
          es: "No. Zentral es SaaS propietario, lo que significa actualizaciones automáticas, sin servidores propios, y soporte directo del fabricante incluido en el precio.",
          en: "No. Zentral is proprietary SaaS, which means automatic updates, no self-hosting, and direct vendor support included in the price.",
        },
      },
      {
        q: { es: "¿Cuánto demora migrar de Odoo a Zentral?", en: "How long does it take to migrate from Odoo to Zentral?" },
        a: {
          es: "La migración típica toma 5 a 10 días hábiles. Importamos clientes, productos, facturas e historial de oportunidades vía API y CSV.",
          en: "A typical migration takes 5 to 10 business days. We import customers, products, invoices and opportunity history via API and CSV.",
        },
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
    searchVolume: "high",
    category: { es: "Suite SaaS multi-app", en: "Multi-app SaaS suite" },
    priceFromUsd: 370,
    priceNote: { es: "USD $37/usuario/mes — USD $370/mes para 10 usuarios", en: "USD $37/user/month — USD $370/month for 10 users" },
    implementationWeeks: { es: "1–2 meses", en: "1–2 months" },
    shortPitch: {
      es: "Suite de más de 40 apps SaaS para ventas, marketing, finanzas y operaciones.",
      en: "Suite of 40+ SaaS apps for sales, marketing, finance and operations.",
    },
    oneLiner: {
      es: "Muchas apps pero la integración ERP-CRM no es nativa y el costo escala por usuario.",
      en: "Many apps, but ERP-CRM integration isn't native and cost scales per user.",
    },
    whenTheyWin: {
      es: "Equipos que ya usan varias apps Zoho y quieren consolidar licencias.",
      en: "Teams already using several Zoho apps that want to consolidate licenses.",
    },
    whenZentralWins: {
      es: "Cuando quieres una sola base de datos para ERP + CRM con cumplimiento tributario LATAM y precio fijo por equipo, no por usuario.",
      en: "When you want one database for ERP + CRM with LATAM tax compliance and a fixed team price, not per user.",
    },
    migrationNote: {
      es: "Importador para Zoho CRM (contactos, deals, cuentas) y Zoho Books (facturas, clientes).",
      en: "Importer for Zoho CRM (contacts, deals, accounts) and Zoho Books (invoices, customers).",
    },
    strengths: [
      { es: "Catálogo enorme de apps", en: "Huge app catalog" },
      { es: "CRM maduro", en: "Mature CRM" },
      { es: "Precio competitivo por app individual", en: "Competitive single-app pricing" },
    ],
    weaknesses: [
      { es: "Integración entre apps no es nativa", en: "Inter-app integration isn't native" },
      { es: "UX inconsistente entre módulos", en: "Inconsistent UX between modules" },
      { es: "Sin facturación electrónica SII/SUNAT nativa", en: "No native SII/SUNAT e-invoicing" },
      { es: "IA limitada al asistente Zia", en: "AI limited to Zia assistant" },
    ],
    features: [
      { label: { es: "ERP + CRM nativo (misma DB)", en: "Native ERP + CRM (same DB)" }, competitor: "partial", zentral: true },
      { label: { es: "Precio fijo (no por usuario)", en: "Flat price (not per user)" }, competitor: false, zentral: true },
      { label: { es: "SII / SUNAT electrónica nativa", en: "Native SII / SUNAT e-invoicing" }, competitor: false, zentral: true },
      { label: { es: "Captura WhatsApp nativa", en: "Native WhatsApp capture" }, competitor: "partial", zentral: true },
      { label: { es: "Captura LinkedIn / IG / FB", en: "LinkedIn / IG / FB capture" }, competitor: false, zentral: true },
      { label: { es: "IA operativa", en: "Operational AI" }, competitor: "partial", zentral: true },
      { label: { es: "Asistente IA en Chrome", en: "Chrome AI assistant" }, competitor: false, zentral: true },
      { label: { es: "Tiempo de implementación", en: "Implementation time" }, competitor: { es: "1–2 meses", en: "1–2 months" }, zentral: { es: "< 3 semanas", en: "< 3 weeks" } },
      { label: { es: "Precio 10 usuarios / mes", en: "Price 10 users / month" }, competitor: "USD $370", zentral: "USD $199" },
      { label: { es: "Soporte español LATAM", en: "Spanish LATAM support" }, competitor: "partial", zentral: true },
    ],
    faqs: [
      {
        q: { es: "¿Es Zoho One una alternativa a Zentral?", en: "Is Zoho One an alternative to Zentral?" },
        a: {
          es: "Zoho One ofrece muchas apps separadas con integraciones entre ellas. Zentral ofrece ERP + CRM en una sola base de datos, sin sincronización entre apps.",
          en: "Zoho One offers many separate apps with integrations between them. Zentral offers ERP + CRM in a single database, with no app-to-app sync.",
        },
      },
      {
        q: { es: "¿Cuál es más barato, Zentral o Zoho?", en: "Which is cheaper, Zentral or Zoho?" },
        a: {
          es: "Zentral. Para 10 usuarios Zentral cuesta USD $199/mes vs USD $370/mes de Zoho One. Zentral es ~46% más económico.",
          en: "Zentral. For 10 users, Zentral costs USD $199/month vs USD $370/month for Zoho One. Zentral is ~46% cheaper.",
        },
      },
      {
        q: { es: "¿Zoho emite documentos tributarios en Chile o Perú?", en: "Does Zoho issue tax documents in Chile or Peru?" },
        a: {
          es: "No de forma nativa. Requiere integraciones de terceros. Zentral emite facturas electrónicas SII y SUNAT directamente.",
          en: "Not natively. It requires third-party integrations. Zentral issues SII and SUNAT electronic invoices directly.",
        },
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
    searchVolume: "high",
    category: { es: "Software contable PYME", en: "SMB accounting software" },
    priceFromUsd: 80,
    priceNote: { es: "Desde USD $80/mes según módulos", en: "From USD $80/month depending on modules" },
    implementationWeeks: { es: "1–4 semanas", en: "1–4 weeks" },
    shortPitch: {
      es: "Software contable y de remuneraciones popular en pymes chilenas.",
      en: "Popular accounting and payroll software for Chilean SMBs.",
    },
    oneLiner: {
      es: "Excelente para contabilidad de pyme, pero no es un ERP ni cubre la operación comercial.",
      en: "Great for SMB accounting, but it isn't an ERP and doesn't cover commercial operations.",
    },
    whenTheyWin: {
      es: "Microempresas que solo necesitan facturar, llevar contabilidad y liquidar sueldos.",
      en: "Micro-businesses that only need to invoice, keep accounting and run payroll.",
    },
    whenZentralWins: {
      es: "Cuando creces y necesitas gestionar ventas, postventa, inventario y marketing en el mismo sistema.",
      en: "When you grow and need to manage sales, post-sales, inventory and marketing in one system.",
    },
    migrationNote: {
      es: "Importador para clientes, productos y facturas Nubox. Plan de cuentas estándar.",
      en: "Importer for Nubox customers, products and invoices. Standard chart of accounts.",
    },
    strengths: [
      { es: "Precio accesible", en: "Affordable price" },
      { es: "Contabilidad y remuneraciones bien resueltas", en: "Well-built accounting and payroll" },
      { es: "Soporte chileno", en: "Chilean support" },
    ],
    weaknesses: [
      { es: "No es un ERP completo", en: "Not a full ERP" },
      { es: "Sin CRM ni gestión comercial", en: "No CRM or commercial management" },
      { es: "Sin captura de leads ni IA", en: "No lead capture or AI" },
      { es: "Reporting básico", en: "Basic reporting" },
    ],
    features: [
      { label: { es: "ERP + CRM completo", en: "Full ERP + CRM" }, competitor: false, zentral: true },
      { label: { es: "Gestión de inventario", en: "Inventory management" }, competitor: "partial", zentral: true },
      { label: { es: "Captura WhatsApp / redes", en: "WhatsApp / social capture" }, competitor: false, zentral: true },
      { label: { es: "Pipeline comercial", en: "Sales pipeline" }, competitor: false, zentral: true },
      { label: { es: "IA operativa y conversacional", en: "Operational and conversational AI" }, competitor: false, zentral: true },
      { label: { es: "Facturación SII", en: "SII invoicing" }, competitor: true, zentral: true },
      { label: { es: "Remuneraciones", en: "Payroll" }, competitor: true, zentral: "partial" },
      { label: { es: "Precio 10 usuarios / mes", en: "Price 10 users / month" }, competitor: "USD $80–150", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: { es: "¿Zentral reemplaza a Nubox?", en: "Does Zentral replace Nubox?" },
        a: {
          es: "Para la mayoría de las pymes, sí. Zentral cubre facturación SII, inventario, ventas, CRM y reportes. Si tu necesidad principal son remuneraciones, Nubox sigue siendo fuerte ahí.",
          en: "For most SMBs, yes. Zentral covers SII invoicing, inventory, sales, CRM and reports. If your main need is payroll, Nubox is still strong there.",
        },
      },
      {
        q: { es: "¿Es Zentral más caro que Nubox?", en: "Is Zentral more expensive than Nubox?" },
        a: {
          es: "El precio base es mayor (USD $199 vs USD $80), pero Zentral incluye CRM, captura de leads, IA y pipeline comercial — funcionalidad que con Nubox tendrías que contratar aparte.",
          en: "The base price is higher (USD $199 vs USD $80), but Zentral includes CRM, lead capture, AI and a sales pipeline — features you'd have to buy separately with Nubox.",
        },
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
    searchVolume: "medium",
    category: { es: "ERP empresarial", en: "Enterprise ERP" },
    priceFromUsd: 400,
    priceNote: { es: "Desde USD $400+/mes según módulos y usuarios", en: "From USD $400+/month depending on modules and users" },
    implementationWeeks: { es: "2–6 meses", en: "2–6 months" },
    shortPitch: {
      es: "ERP empresarial de larga trayectoria en Chile, Colombia y Perú.",
      en: "Long-established enterprise ERP in Chile, Colombia and Peru.",
    },
    oneLiner: {
      es: "Robusto pero pesado: implementaciones largas, costos altos y UX legacy.",
      en: "Robust but heavy: long implementations, high costs and legacy UX.",
    },
    whenTheyWin: {
      es: "Empresas grandes (>100 empleados) con procesos industriales complejos.",
      en: "Large companies (>100 employees) with complex industrial processes.",
    },
    whenZentralWins: {
      es: "PYMES y empresas medianas que quieren la potencia de un ERP sin el costo y la lentitud de implementación de Softland.",
      en: "SMBs and mid-market companies that want ERP power without Softland's cost and slow implementation.",
    },
    migrationNote: {
      es: "Migración asistida desde Softland Manager con plantillas CSV y API.",
      en: "Assisted migration from Softland Manager via CSV templates and API.",
    },
    strengths: [
      { es: "Funcionalidad ERP profunda", en: "Deep ERP functionality" },
      { es: "Presencia regional consolidada", en: "Established regional presence" },
      { es: "Módulos verticales (construcción, retail)", en: "Vertical modules (construction, retail)" },
    ],
    weaknesses: [
      { es: "UX legacy", en: "Legacy UX" },
      { es: "Implementaciones largas y costosas", en: "Long, expensive implementations" },
      { es: "Sin CRM moderno ni captura de leads", en: "No modern CRM or lead capture" },
      { es: "IA inexistente o muy limitada", en: "Nonexistent or very limited AI" },
    ],
    features: [
      { label: { es: "Interfaz moderna SaaS", en: "Modern SaaS interface" }, competitor: false, zentral: true },
      { label: { es: "ERP + CRM unificado", en: "Unified ERP + CRM" }, competitor: false, zentral: true },
      { label: { es: "IA operativa", en: "Operational AI" }, competitor: false, zentral: true },
      { label: { es: "Captura WhatsApp / redes", en: "WhatsApp / social capture" }, competitor: false, zentral: true },
      { label: { es: "Implementación sin consultor", en: "Implementation without consultant" }, competitor: false, zentral: true },
      { label: { es: "Tiempo de implementación", en: "Implementation time" }, competitor: { es: "2–6 meses", en: "2–6 months" }, zentral: { es: "< 3 semanas", en: "< 3 weeks" } },
      { label: { es: "Precio 10 usuarios / mes", en: "Price 10 users / month" }, competitor: "USD $400+", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: { es: "¿Zentral reemplaza a Softland Manager?", en: "Does Zentral replace Softland Manager?" },
        a: {
          es: "Para pymes y empresas medianas (hasta ~80 empleados), sí. Zentral cubre los procesos core de Softland (ventas, compras, inventario, contabilidad) con UX moderna y a 1/3 del costo.",
          en: "For SMBs and mid-market companies (up to ~80 employees), yes. Zentral covers Softland's core processes (sales, purchasing, inventory, accounting) with modern UX at 1/3 of the cost.",
        },
      },
      {
        q: { es: "¿Qué pasa con la migración desde Softland?", en: "What about migrating from Softland?" },
        a: {
          es: "Tenemos un proceso de migración asistida de 2 a 4 semanas que importa maestros, saldos contables y operaciones del último ejercicio.",
          en: "We have a 2 to 4 week assisted migration process that imports master data, accounting balances and the latest fiscal-year operations.",
        },
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
    searchVolume: "medium",
    category: { es: "POS + facturación retail", en: "POS + retail invoicing" },
    priceFromUsd: 60,
    priceNote: { es: "Desde USD $60/mes por sucursal", en: "From USD $60/month per branch" },
    implementationWeeks: { es: "1–2 semanas", en: "1–2 weeks" },
    shortPitch: {
      es: "POS y facturación electrónica enfocado en retail físico y e-commerce.",
      en: "POS and e-invoicing focused on physical retail and e-commerce.",
    },
    oneLiner: {
      es: "Excelente POS, pero limitado como ERP/CRM para empresas que no son retail puro.",
      en: "Excellent POS, but limited as ERP/CRM for companies that aren't pure retail.",
    },
    whenTheyWin: {
      es: "Tiendas retail físicas y e-commerce con flujo de venta directa.",
      en: "Physical retail stores and e-commerce with direct sales flow.",
    },
    whenZentralWins: {
      es: "Cuando vendes B2B, servicios o proyectos y necesitas CRM, presupuestos y proceso comercial completo.",
      en: "When you sell B2B, services or projects and need CRM, quotes and a full sales process.",
    },
    migrationNote: {
      es: "Importador para productos, stock y facturas Bsale.",
      en: "Importer for Bsale products, stock and invoices.",
    },
    strengths: [
      { es: "POS muy bien resuelto", en: "Well-built POS" },
      { es: "Integración Shopify, WooCommerce, Jumpseller", en: "Shopify, WooCommerce, Jumpseller integration" },
      { es: "Facturación SII fluida", en: "Smooth SII invoicing" },
    ],
    weaknesses: [
      { es: "No es ERP completo", en: "Not a full ERP" },
      { es: "Sin CRM ni pipeline B2B", en: "No CRM or B2B pipeline" },
      { es: "Sin captura de leads ni IA", en: "No lead capture or AI" },
      { es: "Enfoque retail limita servicios y B2B", en: "Retail focus limits services and B2B" },
    ],
    features: [
      { label: { es: "ERP completo (compras, contabilidad)", en: "Full ERP (purchasing, accounting)" }, competitor: "partial", zentral: true },
      { label: { es: "CRM B2B", en: "B2B CRM" }, competitor: false, zentral: true },
      { label: { es: "Pipeline comercial", en: "Sales pipeline" }, competitor: false, zentral: true },
      { label: { es: "POS retail", en: "Retail POS" }, competitor: true, zentral: "partial" },
      { label: { es: "Captura WhatsApp / redes", en: "WhatsApp / social capture" }, competitor: false, zentral: true },
      { label: { es: "IA operativa", en: "Operational AI" }, competitor: false, zentral: true },
      { label: { es: "Precio 10 usuarios / mes", en: "Price 10 users / month" }, competitor: "USD $60–200", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: { es: "¿Bsale o Zentral para mi tienda?", en: "Bsale or Zentral for my store?" },
        a: {
          es: "Si vendes solo retail físico/online, Bsale puede ser suficiente. Si además vendes B2B, servicios o necesitas CRM y gestión comercial, Zentral es mejor opción.",
          en: "If you only sell physical/online retail, Bsale may be enough. If you also sell B2B, services or need CRM and commercial management, Zentral is a better fit.",
        },
      },
      {
        q: { es: "¿Puedo usar Zentral como POS?", en: "Can I use Zentral as a POS?" },
        a: {
          es: "Zentral incluye módulo de punto de venta básico. Para retail multi-sucursal alto volumen, mantén Bsale y conéctalo a Zentral vía API.",
          en: "Zentral includes a basic point-of-sale module. For high-volume multi-branch retail, keep Bsale and connect it to Zentral via API.",
        },
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
    searchVolume: "medium",
    category: { es: "ERP empresarial", en: "Enterprise ERP" },
    priceFromUsd: 1500,
    priceNote: { es: "Desde USD $1.500+/mes con licencias y partner", en: "From USD $1,500+/month including licenses and partner" },
    implementationWeeks: { es: "3–9 meses", en: "3–9 months" },
    shortPitch: {
      es: "ERP empresarial SAP para empresas medianas.",
      en: "SAP enterprise ERP for mid-market companies.",
    },
    oneLiner: {
      es: "Marca SAP y funcionalidad sólida, pero costo de entrada y dependencia de partner muy altos.",
      en: "SAP brand and solid functionality, but very high entry cost and partner dependency.",
    },
    whenTheyWin: {
      es: "Empresas medianas-grandes con presupuesto >USD $50K/año y procesos industriales o de distribución complejos.",
      en: "Mid-to-large companies with >USD $50K/year budget and complex industrial or distribution processes.",
    },
    whenZentralWins: {
      es: "PYMES y empresas en crecimiento que quieren el 80% de la funcionalidad ERP por el 10% del costo.",
      en: "SMBs and growing companies that want 80% of ERP functionality at 10% of the cost.",
    },
    migrationNote: {
      es: "Migración técnica vía SAP DI API. Recomendado para empresas que sobre-invirtieron en SAP B1.",
      en: "Technical migration via SAP DI API. Recommended for companies that over-invested in SAP B1.",
    },
    strengths: [
      { es: "Marca SAP y trazabilidad para crecer", en: "SAP brand and traceability to scale" },
      { es: "Funcionalidad ERP profunda", en: "Deep ERP functionality" },
      { es: "Reportería avanzada", en: "Advanced reporting" },
    ],
    weaknesses: [
      { es: "Costo de entrada altísimo (licencias + partner)", en: "Very high entry cost (licenses + partner)" },
      { es: "Implementación 3–9 meses", en: "3–9 month implementation" },
      { es: "UX compleja, requiere capacitación", en: "Complex UX, requires training" },
      { es: "Sin CRM moderno ni IA conversacional", en: "No modern CRM or conversational AI" },
    ],
    features: [
      { label: { es: "Implementación sin partner", en: "Implementation without partner" }, competitor: false, zentral: true },
      { label: { es: "Costo total año 1", en: "Year-1 total cost" }, competitor: "USD $50K+", zentral: "USD $2.4K" },
      { label: { es: "CRM moderno + captura leads", en: "Modern CRM + lead capture" }, competitor: false, zentral: true },
      { label: { es: "IA operativa y conversacional", en: "Operational and conversational AI" }, competitor: false, zentral: true },
      { label: { es: "Tiempo de implementación", en: "Implementation time" }, competitor: { es: "3–9 meses", en: "3–9 months" }, zentral: { es: "< 3 semanas", en: "< 3 weeks" } },
    ],
    faqs: [
      {
        q: { es: "¿Es Zentral una alternativa real a SAP Business One?", en: "Is Zentral a real alternative to SAP Business One?" },
        a: {
          es: "Para empresas pequeñas y medianas, sí. Zentral cubre los procesos críticos (ventas, compras, inventario, contabilidad, CRM) sin licencias por usuario ni partner obligatorio.",
          en: "For small and mid-sized companies, yes. Zentral covers critical processes (sales, purchasing, inventory, accounting, CRM) without per-user licenses or a mandatory partner.",
        },
      },
      {
        q: { es: "¿Cuánto puedo ahorrar migrando de SAP B1 a Zentral?", en: "How much can I save migrating from SAP B1 to Zentral?" },
        a: {
          es: "Típicamente entre 70% y 90% del costo total anual (licencias + mantención + partner). Una empresa de 15 usuarios puede pasar de USD $50K/año a USD $3K/año.",
          en: "Typically 70% to 90% of total annual cost (licenses + maintenance + partner). A 15-user company can go from USD $50K/year to USD $3K/year.",
        },
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
    searchVolume: "high",
    category: { es: "Software contable y ERP PYME", en: "SMB accounting and ERP software" },
    priceFromUsd: 90,
    priceNote: { es: "Desde USD $90/mes según plan", en: "From USD $90/month depending on plan" },
    implementationWeeks: { es: "2–6 semanas", en: "2–6 weeks" },
    shortPitch: {
      es: "Software contable y ERP fuerte en Colombia, presente en Chile y México.",
      en: "Accounting and ERP software strong in Colombia, also present in Chile and Mexico.",
    },
    oneLiner: {
      es: "Buena contabilidad y facturación, pero CRM e IA no son su foco.",
      en: "Good accounting and invoicing, but CRM and AI aren't its focus.",
    },
    whenTheyWin: {
      es: "PYMES colombianas con foco contable y cumplimiento DIAN.",
      en: "Colombian SMBs focused on accounting and DIAN compliance.",
    },
    whenZentralWins: {
      es: "Cuando necesitas ERP + CRM + captura comercial + IA, no solo contabilidad.",
      en: "When you need ERP + CRM + commercial capture + AI, not just accounting.",
    },
    migrationNote: {
      es: "Importador para maestros y facturas Siigo vía CSV/API.",
      en: "Importer for Siigo master data and invoices via CSV/API.",
    },
    strengths: [
      { es: "Facturación electrónica DIAN sólida", en: "Solid DIAN electronic invoicing" },
      { es: "Plan contable LATAM bien resuelto", en: "Well-built LATAM chart of accounts" },
      { es: "Adopción amplia en Colombia", en: "Broad adoption in Colombia" },
    ],
    weaknesses: [
      { es: "CRM limitado", en: "Limited CRM" },
      { es: "Sin captura WhatsApp / redes", en: "No WhatsApp / social capture" },
      { es: "Sin IA conversacional", en: "No conversational AI" },
      { es: "Reporting comercial básico", en: "Basic commercial reporting" },
    ],
    features: [
      { label: { es: "CRM moderno", en: "Modern CRM" }, competitor: false, zentral: true },
      { label: { es: "Captura WhatsApp / redes", en: "WhatsApp / social capture" }, competitor: false, zentral: true },
      { label: { es: "IA operativa", en: "Operational AI" }, competitor: false, zentral: true },
      { label: { es: "Pipeline B2B", en: "B2B pipeline" }, competitor: false, zentral: true },
      { label: { es: "Facturación DIAN (CO)", en: "DIAN invoicing (CO)" }, competitor: true, zentral: "partial" },
      { label: { es: "Facturación SII / SUNAT", en: "SII / SUNAT invoicing" }, competitor: "partial", zentral: true },
      { label: { es: "Precio 10 usuarios / mes", en: "Price 10 users / month" }, competitor: "USD $90–250", zentral: "USD $199" },
    ],
    faqs: [
      {
        q: { es: "¿Zentral funciona en Colombia como Siigo?", en: "Does Zentral work in Colombia like Siigo?" },
        a: {
          es: "Zentral está optimizado para Chile y Perú. Para Colombia, evalúa caso a caso o úsalo combinado con un emisor DIAN.",
          en: "Zentral is optimized for Chile and Peru. For Colombia, evaluate case by case or use it combined with a DIAN issuer.",
        },
      },
      {
        q: { es: "¿Cuál tiene mejor CRM, Siigo o Zentral?", en: "Which has the better CRM, Siigo or Zentral?" },
        a: {
          es: "Zentral. El CRM es nativo, incluye captura desde WhatsApp y redes, IA conversacional y pipeline B2B. Siigo se centra en contabilidad.",
          en: "Zentral. The CRM is native, including WhatsApp/social capture, conversational AI and a B2B pipeline. Siigo focuses on accounting.",
        },
      },
    ],
  },
];

function resolveCompetitor(r: RawCompetitor, l: Locale): Competitor {
  return {
    slug: r.slug,
    name: r.name,
    legalName: r.legalName,
    homepage: r.homepage,
    logoHint: r.logoHint,
    country: r.country,
    priceFromUsd: r.priceFromUsd,
    searchVolume: r.searchVolume,
    category: r.category[l],
    priceNote: r.priceNote[l],
    implementationWeeks: r.implementationWeeks[l],
    shortPitch: r.shortPitch[l],
    oneLiner: r.oneLiner[l],
    whenTheyWin: r.whenTheyWin[l],
    whenZentralWins: r.whenZentralWins[l],
    migrationNote: r.migrationNote[l],
    strengths: r.strengths.map((s) => s[l]),
    weaknesses: r.weaknesses.map((s) => s[l]),
    features: r.features.map((f) => ({
      label: f.label[l],
      competitor: resolveFeatureValue(f.competitor, l),
      zentral: resolveFeatureValue(f.zentral, l),
    })),
    faqs: r.faqs.map((f) => ({ q: f.q[l], a: f.a[l] })),
  };
}

export function getCompetitor(slug: string, locale: Locale = "es"): Competitor | undefined {
  const r = RAW.find((c) => c.slug === slug);
  return r ? resolveCompetitor(r, locale) : undefined;
}

export function getCompetitors(locale: Locale = "es"): Competitor[] {
  return RAW.map((r) => resolveCompetitor(r, locale));
}

export function getCompetitorSlugs(): string[] {
  return RAW.map((c) => c.slug);
}

export function getZentral(locale: Locale = "es") {
  return {
    name: ZENTRAL.name,
    legalName: ZENTRAL.legalName,
    homepage: ZENTRAL.homepage,
    priceFromUsd: ZENTRAL.priceFromUsd,
    priceNote: ZENTRAL.priceNote[locale],
    implementationWeeks: ZENTRAL.implementationWeeks[locale],
  };
}
