import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = "https://zentral.indrox.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Zentral | La plataforma operativa para PYMES en Perú y LATAM",
    template: "%s | Zentral",
  },
  description:
    "Centraliza RRHH, tareas, documentos, inventario y contabilidad en una sola plataforma. Sin Excel. Sin caos. Desde $79/mes.",
  keywords: [
    "ERP para PYMES",
    "ERP Perú",
    "ERP LATAM",
    "plataforma operativa",
    "software empresarial",
    "gestión de RRHH",
    "contabilidad SUNAT",
    "inventario",
    "gestión de tareas",
    "alternativa a Odoo",
    "alternativa a SAP",
    "ERP cloud",
    "software para empresas",
    "Zentral",
    "Indrox",
  ],
  authors: [{ name: "Indrox", url: "https://indrox.com" }],
  creator: "Indrox",
  publisher: "Indrox",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    alternateLocale: ["es_CO", "es_CL", "es_MX", "es_AR", "en_US"],
    url: BASE_URL,
    siteName: "Zentral",
    title: "Zentral | La plataforma operativa para PYMES en Perú y LATAM",
    description:
      "Centraliza RRHH, tareas, documentos, inventario y contabilidad en una sola plataforma. Sin Excel. Sin caos. Desde $79/mes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zentral - Plataforma operativa todo-en-uno para PYMES",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentral | La plataforma operativa para PYMES en Perú y LATAM",
    description:
      "Centraliza RRHH, tareas, documentos, inventario y contabilidad en una sola plataforma. Sin Excel. Sin caos.",
    images: ["/og-image.png"],
    creator: "@indrox",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      es: `${BASE_URL}/es`,
      en: `${BASE_URL}/en`,
    },
  },
  category: "technology",
  classification: "Business Software",
  other: {
    "geo.region": "PE",
    "geo.placename": "Peru",
    "ICBM": "-12.0464, -77.0428",
    "dc.language": "es",
    "dc.publisher": "Indrox",
    "dc.subject": "ERP, PYMES, Plataforma operativa, Software empresarial",
    "dc.type": "Software",
    "revisit-after": "7 days",
    "rating": "general",
    "target": "all",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/es`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/es`} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
