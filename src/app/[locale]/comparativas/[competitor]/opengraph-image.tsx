import { ImageResponse } from "next/og";
import { getCompetitor, getCompetitorSlugs, ZENTRAL } from "@/lib/competitors";

export const alt = "Zentral vs competidor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 4,
              background: "#9333EA",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#A3A3A3",
              letterSpacing: 1,
            }}
          >
            ZENTRAL · COMPARATIVA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 110,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            <div style={{ display: "flex" }}>Zentral</div>
            <div style={{ display: "flex", color: "#9333EA" }}>
              {`vs ${competitorName}.`}
            </div>
          </div>
          <div
            style={{
              display: "flex",
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
          <div style={{ display: "flex" }}>ERP + CRM + IA</div>
          <div style={{ display: "flex" }}>
            {`USD $${ZENTRAL.priceFromUsd}/mes · 10 usuarios`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
