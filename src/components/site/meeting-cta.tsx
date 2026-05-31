import { ArrowRight, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

type MeetingCtaProps = {
  id?: string;
  namespace?: string;
  href?: string;
  variant?: "ink" | "paper";
  className?: string;
};

const DEFAULT_HREF = "https://indrox.com/contact";

export async function MeetingCta({
  id = "cta",
  namespace = "landing.finalCta",
  href = DEFAULT_HREF,
  variant = "ink",
  className,
}: MeetingCtaProps) {
  const t = await getTranslations(namespace);

  const sectionClass = [
    "section",
    variant === "ink" ? "section--ink" : "section--paper",
    "final-cta",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sectionClass} id={id} style={{ padding: "120px 0" }}>
      <div className="final-cta-inner">
        <span
          className="eyebrow plain"
          style={{ color: "var(--z-lime)" }}
        >
          {t("eyebrow")}
        </span>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
        <div className="final-cta-actions">
          <a
            className="btn btn--primary btn--lg"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("primary")} <ArrowRight size={16} />
          </a>
          <a
            className={`btn btn--lg ${variant === "ink" ? "btn--inverse-ghost" : "btn--ghost"}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            {t("secondary")}
          </a>
        </div>
        <div className="final-cta-foot">
          <span>{t("foot1")}</span>
          <span className="dot" />
          <span>{t("foot2")}</span>
          <span className="dot" />
          <span>{t("foot3")}</span>
        </div>
      </div>
    </section>
  );
}
