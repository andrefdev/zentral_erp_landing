import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const LEGACY_VS_MAP: Record<string, string> = {
  "vs-odoo": "odoo",
  "vs-defontana": "defontana",
  "vs-zoho": "zoho",
  "vs-nubox": "nubox",
  "vs-manager": "manager",
  "vs-bsale": "bsale",
  "vs-sap": "sap-business-one",
  "vs-sap-business-one": "sap-business-one",
  "vs-siigo": "siigo",
  "vs-excel": "odoo",
  "vs-monday": "odoo",
};

const SECTION_MAP: Record<string, string> = {
  comparativas: "comparisons",
  alternativas: "alternatives",
  precios: "pricing",
  recursos: "resources",
};

const nextConfig: NextConfig = {
  async redirects() {
    const locales = ["es", "en"];

    const legacyVs = Object.entries(LEGACY_VS_MAP).flatMap(([from, to]) =>
      locales.map((l) => ({
        source: `/${l}/${from}`,
        destination: `/${l}/comparisons/${to}`,
        permanent: true,
      }))
    );

    const legacyComparativaSingular = locales.map((l) => ({
      source: `/${l}/comparativa`,
      destination: `/${l}/comparisons`,
      permanent: true,
    }));

    const resourcesRenames = locales.flatMap((l) => [
      { source: `/${l}/recursos/casos`, destination: `/${l}/resources/cases`, permanent: true },
      { source: `/${l}/recursos/documentacion`, destination: `/${l}/resources/docs`, permanent: true },
    ]);

    const sectionChildren = Object.entries(SECTION_MAP).flatMap(([es, en]) =>
      locales.map((l) => ({
        source: `/${l}/${es}/:slug*`,
        destination: `/${l}/${en}/:slug*`,
        permanent: true,
      }))
    );

    const sectionRoots = Object.entries(SECTION_MAP).flatMap(([es, en]) =>
      locales.map((l) => ({
        source: `/${l}/${es}`,
        destination: `/${l}/${en}`,
        permanent: true,
      }))
    );

    return [
      ...legacyVs,
      ...legacyComparativaSingular,
      ...resourcesRenames,
      ...sectionChildren,
      ...sectionRoots,
    ];
  },
};

export default withNextIntl(nextConfig);
