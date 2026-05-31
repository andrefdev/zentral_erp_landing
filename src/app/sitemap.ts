import type { MetadataRoute } from "next";
import { getCompetitorSlugs } from "@/lib/competitors";

const BASE_URL = "https://zentral.indrox.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const locales = ["es", "en"];
  const slugs = getCompetitorSlugs();

  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/pricing", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/comparisons", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/resources", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/resources/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/resources/cases", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/resources/docs", changeFrequency: "weekly" as const, priority: 0.6 },
    { path: "/resources/changelog", changeFrequency: "weekly" as const, priority: 0.6 },
  ];

  const comparisonPages = slugs.map((slug) => ({
    path: `/comparisons/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const alternativePages = slugs.map((slug) => ({
    path: `/alternatives/${slug}`,
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
