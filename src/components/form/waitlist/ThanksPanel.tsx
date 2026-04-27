'use client';
import { useTranslations } from 'next-intl';
import type { Verdict } from '../primitives/types';
import type { CaptureData } from './CapturePanel';

export default function ThanksPanel({
  verdict, position, capture, moduleLabel,
}: {
  verdict: Verdict;
  position: number;
  capture: CaptureData;
  moduleLabel: string | null;
}) {
  const t = useTranslations('waitlist.thanks');
  const v = t.raw(`verdict.${verdict}`) as { chip: string; h1Pre: string; h1Grad: string; sub: string };
  const summary = t.raw('summary') as Record<string, string>;
  const cohort = verdict === 'high' ? '01 · ALPHA' : verdict === 'mid' ? '02 · BETA' : '03 · ROLLING';
  const eta = verdict === 'high' ? '< 24H' : verdict === 'mid' ? '< 48H' : 'Q3 · 2026';
  const ctaCommunityHref = t('ctaCommunityHref');

  return (
    <div className="panel-inner wide">
      <div className={`verdict-chip ${verdict}`}><span>{v.chip}</span></div>
      <h1 className="thanks-h1">
        {v.h1Pre}<br />
        <span className="grad">{v.h1Grad}</span>
      </h1>
      <p className="thanks-sub">{v.sub}</p>

      <div className="position-card">
        <div className="position-num-side">
          <div className="position-label">{summary.position}</div>
          <div className="position-num">#{position.toLocaleString()}</div>
          <div className="position-label" style={{ marginTop: 14 }}>
            {capture.name?.toUpperCase() || '—'}
          </div>
        </div>
        <div className="position-summary">
          <div className="summary-line"><span className="k">{summary.cohort}</span><span className="v">{cohort}</span></div>
          <div className="summary-line"><span className="k">{summary.module}</span><span className="v">{moduleLabel || '—'}</span></div>
          <div className="summary-line"><span className="k">{summary.eta}</span><span className="v">{eta}</span></div>
          <div className="summary-line">
            <span className="k">{summary.email}</span>
            <span className="v" style={{ fontFamily: 'var(--f-font-mono)', fontSize: 12 }}>{capture.email || '—'}</span>
          </div>
        </div>
      </div>

      <div className="cta-row">
        <a className="cta" href={ctaCommunityHref} target="_blank" rel="noopener noreferrer">
          → {t('ctaCommunity')}
        </a>
      </div>
      <div className="thanks-meta">{t('meta')}</div>
    </div>
  );
}
