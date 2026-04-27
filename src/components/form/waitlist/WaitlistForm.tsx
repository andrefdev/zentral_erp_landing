'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';

import '../form.css';

import PanelHost from '../primitives/PanelHost';
import ProgressRail from '../primitives/ProgressRail';
import NavBar from '../primitives/NavBar';
import StepBar from '../primitives/StepBar';
import SingleChoice from '../primitives/SingleChoice';
import MultiChoice from '../primitives/MultiChoice';
import Slider from '../primitives/Slider';
import CardGrid from '../primitives/CardGrid';
import { useKeyboardNav } from '../primitives/useKeyboardNav';
import { computeScore, verdictKey } from '../primitives/scoring';
import type { AnswerMap, Question } from '../primitives/types';

import { WAITLIST_QUESTIONS } from './questions-config';
import GlowOrbs from './GlowOrbs';
import WelcomePanel from './WelcomePanel';
import CapturePanel, { type CaptureData } from './CapturePanel';
import ThanksPanel from './ThanksPanel';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export default function WaitlistForm({
  initialCount,
  locale,
}: {
  initialCount: number;
  locale: 'es' | 'en';
}) {
  const t = useTranslations('waitlist');
  const tBottom = useTranslations('waitlist.bottom');
  const tCapture = useTranslations('waitlist.capture');

  const questions: Question[] = useMemo(() => {
    return WAITLIST_QUESTIONS.map((cfg) => {
      const k = `questions.${cfg.id}`;
      const eyebrow = t(`${k}.eyebrow`);
      const titlePre = t(`${k}.titlePre`);
      const titleGrad = t(`${k}.titleGrad`);
      const titlePost = t(`${k}.titlePost`);
      const help = t(`${k}.help`);
      const title = [titlePre, { grad: titleGrad }, titlePost];

      if (cfg.kind === 'single') {
        return {
          id: cfg.id, kind: 'single', eyebrow, title, help,
          options: cfg.options.map((o) => ({
            id: o.id, weight: o.weight,
            label: t(`${k}.options.${o.id}`),
          })),
        };
      }
      if (cfg.kind === 'multi') {
        return {
          id: cfg.id, kind: 'multi', eyebrow, title, help,
          options: cfg.options.map((o) => ({
            id: o.id, label: t(`${k}.options.${o.id}`),
          })),
          scoreFn: cfg.scoreFn,
        };
      }
      if (cfg.kind === 'slider') {
        return {
          id: cfg.id, kind: 'slider', eyebrow, title, help,
          min: cfg.min, max: cfg.max, step: cfg.step,
          defaultValue: cfg.defaultValue, ticks: cfg.ticks,
          unit: t(`${k}.unit`),
          scoreFn: cfg.scoreFn,
        };
      }
      // card
      return {
        id: cfg.id, kind: 'card', eyebrow, title, help,
        options: cfg.options.map((o) => ({
          id: o.id,
          name: t(`${k}.options.${o.id}.name`),
          meta: t(`${k}.options.${o.id}.meta`),
        })),
      };
    });
  }, [t]);

  const totalQ = questions.length;
  const totalSteps = 1 + totalQ + 1; // welcome + Q + capture (thanks not in count)

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [capture, setCapture] = useState<CaptureData>({ name: '', email: '', role: '', honeypot: '' });
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedPosition, setSubmittedPosition] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(initialCount > 0 ? initialCount : null);

  const isWelcome = step === 0;
  const qIdx = step - 1;
  const isQuestion = step > 0 && step <= totalQ;
  const isCapture = step === totalQ + 1;
  const isThanks = step === totalQ + 2;

  useEffect(() => {
    let cancelled = false;
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((d: { count?: number }) => {
        if (!cancelled && typeof d.count === 'number') setCount(d.count);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const { ratio } = useMemo(() => computeScore(answers, questions), [answers, questions]);
  const verdict = verdictKey(ratio);
  const position = useMemo(() => {
    if (submittedPosition != null) return submittedPosition;
    const total = count ?? 1247;
    if (verdict === 'high') return Math.round(40 + ratio * 80);
    if (verdict === 'mid') return Math.round(180 + (1 - ratio) * 400);
    return Math.max(1, total - 50);
  }, [submittedPosition, count, verdict, ratio]);

  const moduleLabel = useMemo(() => {
    const sel = answers['priority-module'] as string | undefined;
    if (!sel) return null;
    const q = questions.find((qq) => qq.id === 'priority-module');
    if (!q || q.kind !== 'card') return null;
    return q.options.find((o) => o.id === sel)?.name ?? null;
  }, [answers, questions]);

  const setAnswer = useCallback((qid: string, val: unknown, autoAdvance = false) => {
    setAnswers((prev) => ({ ...prev, [qid]: val as AnswerMap[string] }));
    if (autoAdvance) setTimeout(() => setStep((s) => s + 1), 280);
  }, []);

  const canProceed = useMemo(() => {
    if (isWelcome) return true;
    if (isQuestion) {
      const q = questions[qIdx];
      const v = answers[q.id];
      if (q.kind === 'single' || q.kind === 'card') return !!v;
      if (q.kind === 'slider') return v != null;
      if (q.kind === 'multi') return Array.isArray(v) && v.length > 0;
      return false;
    }
    if (isCapture) return capture.name.trim().length > 0 && isEmail(capture.email);
    return false;
  }, [isWelcome, isQuestion, isCapture, qIdx, questions, answers, capture]);

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: capture.name.trim(),
          email: capture.email.trim().toLowerCase(),
          role: capture.role.trim(),
          answers,
          locale,
          honeypot: capture.honeypot ?? '',
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'submit_failed');
      }
      const data = (await res.json()) as { ok: true; position: number };
      setSubmittedPosition(data.position);
      setCount(data.position);
      setStep((s) => s + 1);
    } catch {
      setSubmitError(tCapture('errors.submit'));
    } finally {
      setSubmitting(false);
    }
  }, [submitting, capture, answers, locale, tCapture]);

  const goNext = useCallback(() => {
    if (isThanks) return;
    if (isCapture) {
      const errs: { name?: boolean; email?: boolean } = {};
      if (!capture.name.trim()) errs.name = true;
      if (!isEmail(capture.email)) errs.email = true;
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      void submit();
      return;
    }
    if (!canProceed && !isWelcome) return;
    setStep((s) => s + 1);
  }, [isThanks, isCapture, isWelcome, canProceed, capture, submit]);

  const goPrev = useCallback(() => {
    if (step === 0 || isThanks) return;
    setStep((s) => Math.max(0, s - 1));
  }, [step, isThanks]);

  const activeQuestion = isQuestion ? questions[qIdx] : null;
  const activeValue = activeQuestion ? answers[activeQuestion.id] : undefined;

  useKeyboardNav({
    goNext, goPrev,
    activeQuestion,
    currentValue: activeValue,
    onSelect: (qid, val) => setAnswer(qid, val, false),
  });

  const renderPanel = (idx: number) => {
    if (idx === 0) return <WelcomePanel onStart={goNext} count={count} />;
    if (idx > 0 && idx <= totalQ) {
      const q = questions[idx - 1];
      const v = answers[q.id];
      const auto = q.kind === 'single' || q.kind === 'card';
      const onChange = (val: unknown) => setAnswer(q.id, val, auto);
      const meta = { idx, total: totalQ };
      if (q.kind === 'single') return <SingleChoice q={q} value={v as string | undefined} onChange={onChange as (s: string) => void} {...meta} />;
      if (q.kind === 'multi')  return <MultiChoice  q={q} value={v as string[] | undefined} onChange={onChange as (s: string[]) => void} {...meta} />;
      if (q.kind === 'slider') return <Slider       q={q} value={v as number | undefined} onChange={onChange as (n: number) => void} {...meta} />;
      if (q.kind === 'card')   return <CardGrid     q={q} value={v as string | undefined} onChange={onChange as (s: string) => void} {...meta} />;
    }
    if (idx === totalQ + 1) {
      return <CapturePanel data={capture} setData={setCapture} errors={errors} submitError={submitError} />;
    }
    return <ThanksPanel verdict={verdict} position={position} capture={capture} moduleLabel={moduleLabel} />;
  };

  const progressPct = isThanks ? 100 : Math.round((step / totalSteps) * 100);
  const stepDisplay = isThanks ? totalSteps : step;
  const homeHref = `/${locale}`;

  return (
    <div className="zen-form">
      <ProgressRail pct={progressPct} />
      <NavBar
        brand={
          <Link href={homeHref} className="brand" style={{ color: 'inherit' }}>
            <Image src={logo} alt="Zentral" width={22} height={22} className="rounded-md" priority />
            <span className="brand-name">Zentral</span>
          </Link>
        }
        right={<Link href={homeHref} className="exit-link">{t('nav.exit')} ↗</Link>}
      />
      <div className="stage">
        <GlowOrbs />
        <div className="panel-track">
          <PanelHost step={step}>{renderPanel(step)}</PanelHost>
        </div>
      </div>
      {!isThanks && (
        <StepBar
          stepIdx={stepDisplay}
          totalSteps={totalSteps}
          onPrev={goPrev}
          onNext={goNext}
          canGoNext={canProceed && !submitting}
          showShortcuts
          labels={{
            step: tBottom('step'),
            of: tBottom('of'),
            back: tBottom('back'),
            next: submitting ? tCapture('submitting') : tBottom('next'),
            enterAction: submitting ? tCapture('submitting') : tBottom('enterAction'),
          }}
        />
      )}
    </div>
  );
}
