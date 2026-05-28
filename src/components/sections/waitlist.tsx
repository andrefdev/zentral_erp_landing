"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Waitlist() {
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
        <span>¡Listo! Te avisaremos cuando esté disponible para tu empresa.</span>
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
        placeholder="tu@empresa.com"
        aria-label="Correo de trabajo"
        className="waitlist-input"
      />
      <button type="submit" className="btn btn--primary waitlist-btn">
        Unirme a la waitlist <ArrowRight size={16} />
      </button>
    </form>
  );
}
