import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zentral | La plataforma operativa para PYMES en Perú y LATAM",
  description:
    "Centraliza RRHH, tareas, documentos, inventario y contabilidad en una sola plataforma. Sin Excel. Sin caos. Desde $79/mes.",
  keywords: [
    "ERP",
    "PYMES",
    "Perú",
    "LATAM",
    "plataforma operativa",
    "RRHH",
    "contabilidad",
    "inventario",
  ],
  openGraph: {
    title: "Zentral | La plataforma operativa para PYMES en Perú y LATAM",
    description:
      "Centraliza RRHH, tareas, documentos, inventario y contabilidad en una sola plataforma.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
