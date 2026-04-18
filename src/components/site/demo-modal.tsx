"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";

const VIDEOS = {
  erp: { title: "Zentral ERP", id: "JAI3aTO52Bc" },
  crm: { title: "Zentral CRM", id: "ktPh_nyFKQw" },
};

export function DemoButton({
  variant = "ghost",
  label = "Ver demo en vivo",
}: {
  variant?: "ghost" | "primary";
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"erp" | "crm">("erp");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = VIDEOS[tab];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={variant === "primary" ? "btn-primary" : "btn-ghost text-white"}
      >
        <Play size={14} /> {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0A0A0A] border border-[#262626] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#262626]">
              <div className="flex gap-1 bg-[#141414] rounded-lg p-1">
                {(["erp", "crm"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                      tab === k ? "bg-[#9333EA] text-white" : "text-[#A3A3A3] hover:text-white"
                    }`}
                  >
                    {VIDEOS[k].title}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#A3A3A3] hover:text-white transition"
                aria-label="Cerrar"
              >
                <X size={22} />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                key={current.id}
                src={`https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0`}
                title={current.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
