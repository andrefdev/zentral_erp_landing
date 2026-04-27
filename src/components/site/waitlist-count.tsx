"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";

interface Props {
  /** Optional SSR seed so first paint isn't empty. */
  initialCount?: number | null;
}

/**
 * Hero pill that shows how many people are already on the Zentral waitlist.
 * Polls /api/waitlist/count on mount; failures are silent (the pill just
 * shows the seed or the empty-state copy).
 */
export function WaitlistCount({ initialCount = null }: Props) {
  const t = useTranslations("waitlistCount");
  const locale = useLocale();
  const [count, setCount] = useState<number | null>(initialCount);
  const [loading, setLoading] = useState(initialCount == null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d: { count?: number }) => {
        if (cancelled) return;
        if (typeof d.count === "number") setCount(d.count);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mt-7"
    >
      <Link
        href={`/${locale}/waitlist`}
        className="inline-flex items-center gap-3 rounded-full border border-[#262626] bg-[#141414]/70 backdrop-blur px-4 py-1.5 text-xs text-[#A3A3A3] hover:border-[#9333EA]/60 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          <Users size={13} className="text-[#9333EA]" />
          {loading ? (
            <span className="font-mono tracking-wider">{t("loading")}</span>
          ) : count != null && count > 0 ? (
            <>
              <span className="font-mono tabular-nums text-white font-semibold">
                {count.toLocaleString()}
              </span>
              <span>{t("label")}</span>
            </>
          ) : (
            <span>{t("labelEmpty")}</span>
          )}
        </span>
        <span className="w-px h-3 bg-[#262626]" />
        <span className="inline-flex items-center gap-1 text-[#9333EA] font-medium">
          Únete <ArrowRight size={11} />
        </span>
      </Link>
    </motion.div>
  );
}
