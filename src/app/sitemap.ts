import type { MetadataRoute } from "next";

const BASE_URL = "https://zentral.indrox.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const locales = ["es", "en"];

  const pages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/vs-odoo", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/vs-defontana", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/vs-excel", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/vs-monday", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/vs-zoho", changeFrequency: "monthly" as const, priority: 0.8 },
  ];

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
