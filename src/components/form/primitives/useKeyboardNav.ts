'use client';
import { useEffect } from 'react';
import type { Question } from './types';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export function useKeyboardNav({
  goNext, goPrev, activeQuestion, currentValue, onSelect,
}: {
  goNext: () => void;
  goPrev: () => void;
  activeQuestion: Question | null;
  currentValue: unknown;
  onSelect: (qid: string, value: unknown) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = ((e.target as HTMLElement | null)?.tagName ?? '').toLowerCase();
      const inField = tag === 'input' || tag === 'textarea';

      if (e.key === 'Enter') { e.preventDefault(); goNext(); return; }
      if (inField) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); goNext(); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); goPrev(); return; }

      if (!activeQuestion) return;
      const q = activeQuestion;
      if (q.kind === 'slider') return;
      const idx = LETTERS.indexOf(e.key.toLowerCase());
      if (idx === -1) return;
      const opt = q.options[idx];
      if (!opt) return;

      if (q.kind === 'single' || q.kind === 'card') {
        onSelect(q.id, opt.id);
      } else if (q.kind === 'multi') {
        const arr = (currentValue as string[] | undefined) ?? [];
        const s = new Set(arr);
        if (s.has(opt.id)) s.delete(opt.id);
        else s.add(opt.id);
        onSelect(q.id, [...s]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, activeQuestion, currentValue, onSelect]);
}
