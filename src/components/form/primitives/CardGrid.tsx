'use client';
import QuestionTitle from './QuestionTitle';
import type { CardQuestion } from './types';

export default function CardGrid({
  q, value, onChange, idx, total,
}: {
  q: CardQuestion;
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
      <div className="card-grid">
        {q.options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`card-cell ${value === o.id ? 'selected' : ''}`}
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
          >
            <div className="card-name">{o.name}</div>
            {o.meta && <div className="card-meta">{o.meta}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
