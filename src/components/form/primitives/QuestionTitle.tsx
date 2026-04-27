import type { TitlePart } from './types';

const NO_LEADING_SPACE = '.,;:!?¿¡)';
const getText = (p: TitlePart) => (typeof p === 'string' ? p : p.grad);
const needsLeadingSpace = (s: string) => !!s && !NO_LEADING_SPACE.includes(s[0]);

export default function QuestionTitle({ parts }: { parts: TitlePart[] }) {
  return (
    <h1 className="q-title">
      {parts.map((p, i) => {
        const next = parts[i + 1];
        const sep = i < parts.length - 1 && needsLeadingSpace(next ? getText(next) : '') ? ' ' : '';
        if (typeof p === 'string') return <span key={i}>{p}{sep}</span>;
        return <span key={i}><span className="grad">{p.grad}</span>{sep}</span>;
      })}
    </h1>
  );
}
