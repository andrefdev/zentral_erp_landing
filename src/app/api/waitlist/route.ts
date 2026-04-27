import { NextResponse, type NextRequest } from 'next/server';
import { addContact, getWaitlistCount, sendEmail } from '@/lib/resend';
import { WAITLIST_QUESTIONS } from '@/components/form/waitlist/questions-config';
import { computeScore, verdictKey } from '@/components/form/primitives/scoring';
import { adminNotificationHtml, userWelcomeHtml } from '@/lib/waitlist/email';
import type { AnswerMap, Question, TitlePart } from '@/components/form/primitives/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const ipHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) {
    ipHits.set(ip, arr);
    return true;
  }
  arr.push(now);
  ipHits.set(ip, arr);
  return false;
}

/** Build a Question[] for server-side scoring. Locale-agnostic — labels not needed. */
function serverQuestions(): Question[] {
  return WAITLIST_QUESTIONS.map((cfg) => {
    const base = { id: cfg.id, eyebrow: '', title: [] as TitlePart[], help: '' };
    if (cfg.kind === 'single')
      return { ...base, kind: 'single', options: cfg.options.map((o) => ({ id: o.id, label: o.id, weight: o.weight })) };
    if (cfg.kind === 'multi')
      return { ...base, kind: 'multi', options: cfg.options.map((o) => ({ id: o.id, label: o.id })), scoreFn: cfg.scoreFn };
    if (cfg.kind === 'slider')
      return { ...base, kind: 'slider', min: cfg.min, max: cfg.max, step: cfg.step, defaultValue: cfg.defaultValue, ticks: cfg.ticks, unit: '', scoreFn: cfg.scoreFn };
    return { ...base, kind: 'card', options: cfg.options.map((o) => ({ id: o.id, name: o.id })) };
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  let body: {
    name?: string; email?: string; role?: string;
    answers?: AnswerMap; locale?: string; honeypot?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  if (body.honeypot && body.honeypot.length > 0) {
    return NextResponse.json({ ok: true, position: 0 });
  }

  const name = (body.name ?? '').trim().slice(0, 120);
  const email = (body.email ?? '').trim().toLowerCase().slice(0, 200);
  const role = (body.role ?? '').trim().slice(0, 200);
  const locale = body.locale === 'en' ? 'en' : 'es';
  const answers = (body.answers && typeof body.answers === 'object') ? body.answers : {};

  if (!name) return NextResponse.json({ error: 'name_required' }, { status: 400 });
  if (!isEmail(email)) return NextResponse.json({ error: 'email_invalid' }, { status: 400 });

  const questions = serverQuestions();
  const { score, max, ratio } = computeScore(answers, questions);
  const verdict = verdictKey(ratio);

  const [firstName, ...rest] = name.split(/\s+/);
  let created = true;
  try {
    const r = await addContact({ email, firstName, lastName: rest.join(' ') || undefined });
    created = r.created;
  } catch (e) {
    console.error('addContact failed', e);
    return NextResponse.json({ error: 'storage_failed' }, { status: 502 });
  }

  let position = 0;
  try { position = await getWaitlistCount(); } catch { position = 0; }

  const from = process.env.RESEND_FROM ?? 'Zentral <noreply@zentral.indrox.com>';
  const adminTo = process.env.WAITLIST_NOTIFY_EMAIL ?? 'admin@indrox.com';
  const subjectAdmin = `[zentral-waitlist] ${name} · ${verdict.toUpperCase()} · #${position}`;
  const subjectUser = locale === 'es'
    ? 'Estás en la waitlist de Zentral'
    : "You're on the Zentral waitlist";

  const submission = { name, email, role, locale, answers, verdict, score, scoreMax: max, position };

  await Promise.allSettled([
    sendEmail({ from, to: adminTo, subject: subjectAdmin, html: adminNotificationHtml(submission), reply_to: email }),
    created
      ? sendEmail({ from, to: email, subject: subjectUser, html: userWelcomeHtml({ name, locale, verdict, position }) })
      : Promise.resolve(),
  ]);

  return NextResponse.json({ ok: true, position, verdict });
}
