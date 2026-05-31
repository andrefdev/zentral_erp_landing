import type { MetadataRoute } from "next";
import { getCompetitorSlugs } from "@/lib/competitors";

const BASE_URL = "https://zentral.indrox.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const locales = ["es", "en"];
  const slugs = getCompetitorSlugs();

  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/precios", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/comparativas", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/recursos", changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const comparisonPages = slugs.map((slug) => ({
    path: `/comparativas/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const alternativePages = slugs.map((slug) => ({
    path: `/alternativas/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pages = [...staticPages, ...comparisonPages, ...alternativePages];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${page.path}`])
        ),
      },
    }))
  );
}
