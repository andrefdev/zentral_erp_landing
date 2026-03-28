const BASE_URL = "https://zentral.indrox.com";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zentral",
    legalName: "Indrox",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    email: "hello@indrox.com",
    sameAs: [],
    description:
      "Plataforma operativa todo-en-uno para PYMES en Perú y Latinoamérica. Centraliza RRHH, tareas, documentos, inventario y contabilidad.",
    foundingDate: "2026",
    areaServed: [
      { "@type": "Country", name: "Peru" },
      { "@type": "Country", name: "Colombia" },
      { "@type": "Country", name: "Chile" },
      { "@type": "Country", name: "Mexico" },
      { "@type": "Country", name: "Argentina" },
    ],
    knowsLanguage: "es",
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zentral",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "ERP",
    operatingSystem: "Web",
    url: BASE_URL,
    description:
      "Plataforma operativa todo-en-uno para PYMES. Centraliza RRHH, tareas, documentos, inventario, contabilidad e IA en un solo lugar.",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "79",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        description:
          "Para emprendedores y microempresas. Hasta 3 usuarios, 10 GB Drive.",
        eligibleRegion: {
          "@type": "Place",
          name: "Latin America",
        },
      },
      {
        "@type": "Offer",
        name: "Profesional",
        price: "199",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        description:
          "Para PYMES en crecimiento. Hasta 10 usuarios, 50 GB Drive, todos los módulos.",
        eligibleRegion: {
          "@type": "Place",
          name: "Latin America",
        },
      },
      {
        "@type": "Offer",
        name: "Empresa",
        price: "349",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        description:
          "Para operaciones grandes. Hasta 25 usuarios, 200 GB Drive, todo ilimitado.",
        eligibleRegion: {
          "@type": "Place",
          name: "Latin America",
        },
      },
    ],
    featureList: [
      "Gestión de RRHH y nóminas",
      "Gestión de tareas y proyectos",
      "Documentos y firma electrónica",
      "Almacenamiento cloud integrado",
      "Control de inventario",
      "Contabilidad y facturación SUNAT",
      "Inteligencia artificial operativa",
      "Personalización visual",
    ],
    screenshot: `${BASE_URL}/og-image.png`,
    author: {
      "@type": "Organization",
      name: "Indrox",
      url: "https://indrox.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "5",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es Zentral?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Zentral es una plataforma operativa todo-en-uno para PYMES que centraliza RRHH, tareas, documentos, inventario, contabilidad e inteligencia artificial en un solo lugar. Está diseñada específicamente para empresas en Perú y Latinoamérica.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto cuesta Zentral?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Zentral tiene 3 planes: Starter ($79/mes, hasta 3 usuarios), Profesional ($199/mes, hasta 10 usuarios, más popular) y Empresa ($349/mes, hasta 25 usuarios). Ofrecen 20% de descuento en pago anual y los primeros 50 clientes obtienen 25% off el primer año.",
        },
      },
      {
        "@type": "Question",
        name: "¿Zentral es mejor que Odoo para PYMES?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Zentral es más rápido de implementar (semanas vs 3-6 meses de Odoo), 20% más económico, e incluye funcionalidades como Drive integrado, IA operativa y personalización visual que Odoo no ofrece nativamente. Además no requiere consultoras externas para la implementación.",
        },
      },
      {
        "@type": "Question",
        name: "¿Zentral funciona en Perú?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Zentral está diseñado para el mercado peruano y latinoamericano, con soporte para facturación electrónica SUNAT y cumplimiento fiscal local.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tarda la implementación de Zentral?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Menos de 4 semanas. A diferencia de ERPs como Odoo (3-6 meses) o SAP (más de 6 meses), Zentral se configura rápidamente sin necesidad de consultoras externas. La configuración inicial toma aproximadamente 5 minutos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Zentral tiene inteligencia artificial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Zentral AI es un módulo de IA operativa que analiza datos de la empresa, sugiere mejoras, automatiza tareas repetitivas y genera reportes inteligentes. Es un analista 24/7, no un simple chatbot.",
        },
      },
      {
        "@type": "Question",
        name: "¿Zentral reemplaza a Excel para gestionar mi empresa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Zentral elimina la necesidad de gestionar operaciones en hojas de cálculo. Toda la información vive en módulos conectados con flujos automatizados, eliminando errores manuales y datos dispersos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Necesito tarjeta de crédito para empezar con Zentral?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Puedes empezar gratis sin tarjeta de crédito. La configuración toma aproximadamente 5 minutos y puedes explorar la plataforma antes de elegir un plan.",
        },
      },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Zentral | La plataforma operativa para PYMES en Perú y LATAM",
    description:
      "Centraliza RRHH, tareas, documentos, inventario y contabilidad en una sola plataforma. Sin Excel. Sin caos. Desde $79/mes.",
    url: BASE_URL,
    inLanguage: "es",
    isPartOf: {
      "@type": "WebSite",
      name: "Zentral",
      url: BASE_URL,
    },
    about: {
      "@type": "Thing",
      name: "ERP para PYMES en Latinoamérica",
    },
    mentions: [
      { "@type": "Thing", name: "Odoo" },
      { "@type": "Thing", name: "SAP" },
      { "@type": "Thing", name: "Defontana" },
      { "@type": "Thing", name: "Monday.com" },
      { "@type": "Thing", name: "Zoho" },
    ],
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={software} />
      <JsonLd data={faq} />
      <JsonLd data={webPage} />
    </>
  );
}
