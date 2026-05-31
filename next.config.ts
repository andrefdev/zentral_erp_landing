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

const nextConfig: NextConfig = {
  async redirects() {
    const locales = ["es", "en"];
    const legacy = Object.entries(LEGACY_VS_MAP).flatMap(([from, to]) =>
      locales.map((l) => ({
        source: `/${l}/${from}`,
        destination: `/${l}/comparativas/${to}`,
        permanent: true,
      }))
    );

    return [
      ...legacy,
      {
        source: "/:locale(es|en)/comparativa",
        destination: "/:locale/comparativas",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
