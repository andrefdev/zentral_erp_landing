import { ImageResponse } from "next/og";
import { getCompetitor, getCompetitorSlugs, ZENTRAL } from "@/lib/competitors";

export const alt = "Zentral vs competidor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({
  params,
}: {
  params: { locale: string; competitor: string };
}) {
  const c = getCompetitor(params.competitor);
  return [{ id: "card", alt: c ? `Zentral vs ${c.name}` : alt, size, contentType }];
}

export async function generateStaticParams() {
  const slugs = getCompetitorSlugs();
  return ["es", "en"].flatMap((locale) =>
    slugs.map((competitor) => ({ locale, competitor }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; competitor: string }>;
}) {
  const { competitor } = await params;
  const c = getCompetitor(competitor);
  const competitorName = c?.name ?? "Alternativa";
  const tagline = c?.oneLiner ?? "Compara y decide.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              background: "#9333EA",
            }}
          />
          <div style={{ fontSize: 26, color: "#A3A3A3", letterSpacing: 1 }}>
            ZENTRAL · COMPARATIVA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 110,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Zentral</span>
            <span style={{ color: "#9333EA" }}>vs {competitorName}.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#A3A3A3",
              maxWidth: 1000,
              lineHeight: 1.3,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #262626",
            paddingTop: 24,
            fontSize: 24,
            color: "#A3A3A3",
          }}
        >
          <span>ERP + CRM + IA</span>
          <span>USD ${ZENTRAL.priceFromUsd}/mes · 10 usuarios</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
