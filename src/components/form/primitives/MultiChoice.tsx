'use client';
import QuestionTitle from './QuestionTitle';
import type { MultiQuestion } from './types';

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function MultiChoice({
  q, value, onChange, idx, total,
}: {
  q: MultiQuestion;
  value: string[] | undefined;
  onChange: (ids: string[]) => void;
  idx: number;
  total: number;
}) {
  const arr = value ?? [];
  const toggle = (id: string) => {
    const s = new Set(arr);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    onChange([...s]);
  };
  return (
    <div className="panel-inner">
      <div className="q-num">
        <span>{q.eyebrow}</span>
        <span className="arrow">·</span>
        <span>{String(idx).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
      </div>
      <QuestionTitle parts={q.title} />
      {q.help && <p className="q-help">{q.help}</p>}
      <div className="choices">
        {q.options.map((opt, i) => {
          const selected = arr.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              className={`choice ${selected ? 'selected' : ''}`}
              onClick={() => toggle(opt.id)}
              aria-pressed={selected}
            >
              <span className="key">{KEYS[i] ?? ''}</span>
              <span className="label">{opt.label}</span>
              <span className="check">✓</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
