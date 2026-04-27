'use client';
import { useEffect, useState, type ReactNode } from 'react';

export default function PanelHost({ step, children }: { step: number; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(false);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      if (r2) cancelAnimationFrame(r2);
    };
  }, [step]);
  return (
    <div key={step} className={`panel ${mounted ? 'active' : ''}`}>
      {children}
    </div>
  );
}
