'use client';
import QuestionTitle from './QuestionTitle';
import type { SingleQuestion } from './types';

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function SingleChoice({
  q, value, onChange, idx, total,
}: {
  q: SingleQuestion;
  value: string | undefined;
  onChange: (id: string) => void;
  idx: number;
  total: number;
}) {
  return (
    <div className="panel-inner">
      <div className="q-num">
        <span>{q.eyebrow}</span>
        <span className="arrow">·</span>
        <span>{String(idx).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
      </div>
      <QuestionTitle parts={q.title} />
      {q.help && <p className="q-help">{q.help}</p>}
      <div className="choices" role="radiogroup">
        {q.options.map((opt, i) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              className={`choice ${selected ? 'selected' : ''}`}
              onClick={() => onChange(opt.id)}
              role="radio"
              aria-checked={selected}
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
