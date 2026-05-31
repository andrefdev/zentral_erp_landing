import { getTranslations } from "next-intl/server";

export async function LogoBar() {
  const t = await getTranslations("landing.logoBar");
  const customers = t.raw("customers") as string[];
  const loop = [...customers, ...customers];
  return (
    <section className="logobar" aria-label={t("ariaLabel")}>
      <div className="logobar-inner">
        <div className="logobar-label">{t("label")}</div>
        <div className="logobar-track">
          <div className="logobar-marquee">
            {loop.map((name, i) => (
              <span key={i} className="logobar-org" aria-hidden={i >= customers.length}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
