import type { AnswerMap, Question, Verdict } from './types';

export function computeScore(answers: AnswerMap, questions: Question[]) {
  let score = 0;
  let max = 0;
  for (const q of questions) {
    if (q.kind === 'single') {
      max += 3;
      const sel = answers[q.id] as string | undefined;
      const opt = q.options.find((o) => o.id === sel);
      if (opt?.weight != null) score += opt.weight;
    } else if (q.kind === 'slider') {
      max += 3;
      const v = answers[q.id] as number | undefined;
      if (v != null && q.scoreFn) score += q.scoreFn(v);
    } else if (q.kind === 'multi') {
      max += 3;
      const arr = (answers[q.id] as string[] | undefined) ?? [];
      if (q.scoreFn) score += q.scoreFn(arr);
    }
  }
  return { score, max, ratio: max ? score / max : 0 };
}

export function verdictKey(ratio: number): Verdict {
  if (ratio >= 0.7) return 'high';
  if (ratio >= 0.45) return 'mid';
  return 'fit';
}
