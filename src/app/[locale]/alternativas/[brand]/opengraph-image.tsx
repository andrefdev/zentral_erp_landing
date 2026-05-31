import { ImageResponse } from "next/og";
import { getCompetitor, getCompetitorSlugs, ZENTRAL } from "@/lib/competitors";

export const alt = "Alternativa a competidor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = getCompetitorSlugs();
  return ["es", "en"].flatMap((locale) =>
    slugs.map((brand) => ({ locale, brand }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; brand: string }>;
}) {
  const { brand } = await params;
  const c = getCompetitor(brand);
  const brandName = c?.name ?? "esa marca";

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
            ZENTRAL · ALTERNATIVA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              color: "#A3A3A3",
              lineHeight: 1,
              fontWeight: 500,
            }}
          >
            La mejor alternativa a
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 130,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#9333EA",
            }}
          >
            {`${brandName}.`}
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
          <div style={{ display: "flex" }}>
            {`ERP + CRM + IA · listo en ${ZENTRAL.implementationWeeks}`}
          </div>
          <div style={{ display: "flex" }}>zentral.indrox.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
