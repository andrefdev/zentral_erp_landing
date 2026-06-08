import { getTranslations } from "next-intl/server";

type Col = { h: string; links: { label: string; href: string }[] };

export async function Footer(_props: { locale?: string } = {}) {
  const t = await getTranslations("footerSite");
  const cols = t.raw("cols") as Col[];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="logo" href="#top" aria-label={t("ariaLogo")}>
            <span className="logo-mark" aria-hidden="true" />
            <span>zentral</span>
          </a>
          <p>{t("tagline")}</p>
        </div>
        <div className="footer-cols">
          {cols.map((c) => (
            <div className="footer-col" key={c.h}>
              <div className="footer-h">{c.h}</div>
              {c.links.map((l) => (
                <a key={l.label} href={l.href}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-badges">
        <a
          href="https://dang.ai"
          target="_blank"
          rel="dofollow noopener"
          aria-label="Verified on DANG!"
        >
          <img
            src="https://assets.dang.ai/badges/dang-verified-dark.png"
            alt="Verified on DANG!"
            width={260}
            height={94}
            loading="lazy"
          />
        </a>
        <a
          href="https://twelve.tools"
          target="_blank"
          rel="dofollow noopener"
          aria-label="Featured on Twelve Tools"
        >
          <img
            src="https://twelve.tools/badge1-white.svg"
            alt="Featured on Twelve Tools"
            width={200}
            height={54}
            loading="lazy"
          />
        </a>
        <a
          href="https://wired.business"
          target="_blank"
          rel="dofollow noopener"
          aria-label="Featured on Wired Business"
        >
          <img
            src="https://wired.business/badge0-white.svg"
            alt="Featured on Wired Business"
            width={200}
            height={54}
            loading="lazy"
          />
        </a>
      </div>
      <div className="footer-bottom">
        <span>{t("copyright")}</span>
        <span>{t("madeIn")}</span>
      </div>
    </footer>
  );
}
