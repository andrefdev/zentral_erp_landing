'use client';
import { useTranslations } from 'next-intl';

export default function WelcomePanel({
  onStart,
  count,
}: {
  onStart: () => void;
  count: number | null;
}) {
  const t = useTranslations('waitlist.welcome');
  const tBottom = useTranslations('waitlist.bottom');
  return (
    <div className="panel-inner">
      <div className="welcome-pill"><span className="pulse" />{t('pill')}</div>
      <h1 className="welcome-h1">
        {t('h1Pre')}<br />
        <span className="grad">{t('h1Grad')}</span>
      </h1>
      <p className="welcome-sub">{t('sub')}</p>
      <div className="cta-row">
        <button type="button" className="cta" onClick={onStart}>
          {t('cta')} <span style={{ fontSize: 16 }}>→</span>
        </button>
        <span className="enter-hint"><kbd>↵</kbd> {tBottom('enter')}</span>
      </div>
      {count != null && count > 0 && (
        <div className="count-line">
          {t('countLine')} <b>{count.toLocaleString()}</b>
        </div>
      )}
      <div className="welcome-meta">{t('meta')}</div>
    </div>
  );
}
