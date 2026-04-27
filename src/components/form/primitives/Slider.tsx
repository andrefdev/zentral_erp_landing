'use client';
import QuestionTitle from './QuestionTitle';
import type { SliderQuestion } from './types';

export default function Slider({
  q, value, onChange, idx, total,
}: {
  q: SliderQuestion;
  value: number | undefined;
  onChange: (v: number) => void;
  idx: number;
  total: number;
}) {
  const v = value ?? q.defaultValue;
  const pct = ((v - q.min) / (q.max - q.min)) * 100;
  return (
    <div className="panel-inner">
      <div className="q-num">
        <span>{q.eyebrow}</span>
        <span className="arrow">·</span>
        <span>{String(idx).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
      </div>
      <QuestionTitle parts={q.title} />
      {q.help && <p className="q-help">{q.help}</p>}
      <div className="slider-wrap">
        <div className="slider-readout">
          <div className="slider-value">{v % 1 === 0 ? v : v.toFixed(1)}</div>
          <div className="slider-unit">{q.unit}</div>
        </div>
        <div className="slider-track-wrap">
          <div className="slider-track">
            <div className="slider-fill" style={{ width: `${pct}%` }} />
          </div>
          <input
            type="range"
            className="slider-input"
            min={q.min} max={q.max} step={q.step}
            value={v}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            aria-label={q.eyebrow}
          />
        </div>
        <div className="slider-ticks">
          {q.ticks.map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}
