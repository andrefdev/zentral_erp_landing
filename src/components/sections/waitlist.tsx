"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function Waitlist() {
  const t = useTranslations("landing.waitlist");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="waitlist waitlist--success" role="status">
        <Check size={16} />
        <span>{t("successMsg")}</span>
      </div>
    );
  }

  return (
    <form className="waitlist" onSubmit={onSubmit} noValidate>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("ariaInput")}
        className="waitlist-input"
      />
      <button type="submit" className="btn btn--primary waitlist-btn">
        {t("button")} <ArrowRight size={16} />
      </button>
    </form>
  );
}
