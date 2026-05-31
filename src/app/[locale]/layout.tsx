import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { SmoothScroll } from "@/components/site/smooth-scroll";

const BASE_URL = "https://zentral.indrox.com";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(BASE_URL),
    title: { default: title, template: t("titleTemplate") },
    description,
    keywords: t.raw("keywords") as string[],
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
      locale: t("ogLocale"),
      alternateLocale: locale === "es" ? ["en_US"] : ["es_PE", "es_LA"],
      url: `${BASE_URL}/${locale}`,
      siteName: "Zentral",
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@indrox",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/es`,
      },
    },
    category: "technology",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/es`} />
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/es`} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
