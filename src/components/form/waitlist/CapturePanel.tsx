'use client';
import { useTranslations } from 'next-intl';
import TextField from '../primitives/TextField';

export interface CaptureData { name: string; email: string; role: string; honeypot?: string }

export default function CapturePanel({
  data, setData, errors, submitError,
}: {
  data: CaptureData;
  setData: (d: CaptureData) => void;
  errors: { name?: boolean; email?: boolean };
  submitError?: string | null;
}) {
  const t = useTranslations('waitlist.capture');
  const labels = t.raw('labels') as Record<string, string>;
  const placeholders = t.raw('placeholders') as Record<string, string>;
  const errs = t.raw('errors') as Record<string, string>;

  return (
    <div className="panel-inner">
      <div className="q-num">
        <span>{t('eyebrow')}</span>
      </div>
      <h1 className="q-title">
        {t('titlePre')} <span className="grad">{t('titleGrad')}</span>{t('titlePost')}
      </h1>
      <p className="q-help">{t('help')}</p>
      <div className="input-row">
        <TextField
          label={labels.name}
          placeholder={placeholders.name}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          error={errors.name ? errs.name : null}
          autoFocus
          autoComplete="name"
        />
        <TextField
          label={labels.email}
          type="email"
          placeholder={placeholders.email}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          error={errors.email ? errs.email : null}
          autoComplete="email"
          inputMode="email"
        />
        <TextField
          label={labels.role}
          placeholder={placeholders.role}
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          autoComplete="organization-title"
        />
        {/* Honeypot — hidden from real users, bots fill it */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hp-field"
          aria-hidden="true"
          value={data.honeypot ?? ''}
          onChange={(e) => setData({ ...data, honeypot: e.target.value })}
          name="company_url"
        />
      </div>
      {submitError && <div className="submit-error">{submitError}</div>}
    </div>
  );
}
