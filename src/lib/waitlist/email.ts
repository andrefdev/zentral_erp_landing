import type { AnswerMap, Verdict } from '@/components/form/primitives/types';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

interface Submission {
  name: string;
  email: string;
  role: string;
  locale: string;
  answers: AnswerMap;
  verdict: Verdict;
  score: number;
  scoreMax: number;
  position: number;
}

export function adminNotificationHtml(s: Submission): string {
  const rows = Object.entries(s.answers)
    .map(([k, v]) => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;font-family:monospace;font-size:12px;">${escape(k)}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;font-family:monospace;font-size:12px;">${escape(JSON.stringify(v))}</td>
      </tr>`)
    .join('');
  return `<!doctype html><html><body style="font-family:'DM Sans',Inter,system-ui,sans-serif;background:#FAFAFA;padding:24px;color:#111;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:28px;">
    <h2 style="margin:0 0 4px;font-size:20px;">New Zentral waitlist submission</h2>
    <p style="margin:0 0 20px;color:#555;font-size:13px;">verdict <b>${s.verdict.toUpperCase()}</b> · score ${s.score}/${s.scoreMax} · position #${s.position}</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;">Name</td><td style="padding:6px 12px;border-bottom:1px solid #eee;"><b>${escape(s.name)}</b></td></tr>
      <tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escape(s.email)}</td></tr>
      <tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;">Role</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escape(s.role || '—')}</td></tr>
      <tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;">Locale</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${escape(s.locale)}</td></tr>
      ${rows}
    </table>
  </div>
</body></html>`;
}

export function userWelcomeHtml(args: { name: string; locale: string; verdict: Verdict; position: number }) {
  const isEs = args.locale === 'es';
  const eta = args.verdict === 'high' ? 24 : args.verdict === 'mid' ? 48 : 168;
  const cohort =
    args.verdict === 'high' ? '01 · ALPHA' :
    args.verdict === 'mid'  ? '02 · BETA'  : '03 · ROLLING';
  const etaLabel =
    args.verdict === 'high' ? '< 24H' :
    args.verdict === 'mid'  ? '< 48H' : 'Q3 · 2026';
  const firstName = args.name.split(/\s+/)[0] || args.name;

  const t = isEs ? {
    preheader: 'Estás en la waitlist de Zentral. Bienvenido al pre-launch.',
    eyebrow: 'PRE-LAUNCH · COHORTE 01',
    greet: `Hola ${firstName},`,
    headline1: 'Bienvenido al',
    headlineGrad: 'futuro de la operación PYME.',
    intro: `Recibimos las respuestas de tu empresa. Tu perfil entra en el batch <b>${cohort}</b> y te escribimos en menos de <b>${eta} horas</b> con tu acceso a la beta de Zentral Suite.`,
    summaryTitle: 'TU LUGAR EN LA LISTA',
    posLabel: 'POSICIÓN',
    cohortLabel: 'COHORTE',
    etaLabel: 'INVITACIÓN ESTIMADA',
    nextTitle: '¿Qué pasa ahora?',
    steps: [
      { n: '01', t: 'Te escribimos pronto', d: `En las próximas ${eta} horas recibirás un correo con tu invitación y la propuesta para tu empresa.` },
      { n: '02', t: 'Onboarding migrado', d: 'Migramos tu data desde Excel, Defontana, HubSpot o tu sistema actual sin costo durante las primeras 2 semanas.' },
      { n: '03', t: 'Empiezas a operar', d: 'ERP + CRM + IA listo en menos de 3 semanas. Sin Zapier. Sin consultoras. Sin Excel.' },
    ],
    cta: 'Visitar Zentral',
    closer: 'Mientras tanto — gracias por confiar en lo que estamos construyendo. Zentral nace para empresas como la tuya: PYMES B2B de LATAM que merecen herramientas serias sin precio enterprise.',
    sign: '— El equipo de Zentral · Indrox',
    footerLine1: 'Zentral · Plataforma operativa para PYMES en LATAM',
    footerLine2: '© 2026 · LIMA · ZENTRAL · INDROX',
    unsub: 'Recibiste este correo porque te uniste al pre-launch de Zentral.',
  } : {
    preheader: "You're on the Zentral waitlist. Welcome to the pre-launch.",
    eyebrow: 'PRE-LAUNCH · COHORT 01',
    greet: `Hi ${firstName},`,
    headline1: 'Welcome to the',
    headlineGrad: 'future of SMB operations.',
    intro: `We received your company's answers. Your profile is in batch <b>${cohort}</b> and we'll write you in under <b>${eta} hours</b> with your access to the Zentral Suite beta.`,
    summaryTitle: 'YOUR SPOT ON THE LIST',
    posLabel: 'POSITION',
    cohortLabel: 'COHORT',
    etaLabel: 'ESTIMATED INVITE',
    nextTitle: 'What happens next?',
    steps: [
      { n: '01', t: "We'll be in touch", d: `In the next ${eta} hours you'll receive an email with your invite and a proposal tailored to your company.` },
      { n: '02', t: 'Migrated onboarding', d: 'We migrate your data from Excel, Defontana, HubSpot or your current system at no extra cost in the first 2 weeks.' },
      { n: '03', t: 'You start operating', d: 'ERP + CRM + AI ready in under 3 weeks. No Zapier. No consultants. No Excel.' },
    ],
    cta: 'Visit Zentral',
    closer: "In the meantime — thanks for trusting what we're building. Zentral exists for companies like yours: LATAM B2B SMBs that deserve serious tools without enterprise pricing.",
    sign: '— The Zentral team · Indrox',
    footerLine1: 'Zentral · Operational platform for SMBs in LATAM',
    footerLine2: '© 2026 · LIMA · ZENTRAL · INDROX',
    unsub: 'You received this email because you joined the Zentral pre-launch.',
  };

  const stepRows = t.steps.map((s) => `
    <tr>
      <td style="padding:0 0 22px;vertical-align:top;width:56px;">
        <div style="display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;border-radius:10px;background:#F3F0FF;color:#9333EA;font-family:ui-monospace,monospace;font-size:13px;font-weight:600;letter-spacing:0.04em;">${s.n}</div>
      </td>
      <td style="padding:0 0 22px;vertical-align:top;">
        <div style="font-size:17px;font-weight:600;color:#111;letter-spacing:-0.01em;margin:0 0 4px;">${escape(s.t)}</div>
        <div style="font-size:14px;color:#555;line-height:1.55;">${escape(s.d)}</div>
      </td>
    </tr>`).join('');

  return `<!doctype html>
<html lang="${isEs ? 'es' : 'en'}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>Zentral</title>
</head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:'DM Sans',Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escape(t.preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#FAFAFA;padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">

      <!-- Brand bar -->
      <tr><td style="padding:0 0 24px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="vertical-align:middle;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
                <td style="vertical-align:middle;padding-right:10px;">
                  <div style="width:28px;height:28px;border-radius:8px;background:#111;color:#fff;display:inline-block;line-height:28px;text-align:center;font-weight:700;font-family:'DM Sans',sans-serif;">Z</div>
                </td>
                <td style="vertical-align:middle;font-size:17px;font-weight:700;letter-spacing:-0.01em;color:#111;">Zentral</td>
              </tr></table>
            </td>
            <td align="right" style="vertical-align:middle;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.16em;color:#737373;text-transform:uppercase;">${escape(t.eyebrow)}</td>
          </tr>
        </table>
      </td></tr>

      <!-- Card -->
      <tr><td style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:20px;padding:48px 44px 40px;box-shadow:0 24px 60px -28px rgba(147,51,234,0.20);">

        <!-- Hero -->
        <div style="font-size:14px;color:#555;margin:0 0 18px;">${escape(t.greet)}</div>
        <h1 style="margin:0 0 18px;font-size:38px;font-weight:600;letter-spacing:-0.02em;line-height:1.08;color:#111;">
          ${escape(t.headline1)}<br />
          <span style="background:linear-gradient(135deg,#9333EA,#7E22CE,#9333EA);-webkit-background-clip:text;background-clip:text;color:transparent;">${escape(t.headlineGrad)}</span>
        </h1>
        <p style="margin:0 0 32px;font-size:17px;line-height:1.6;color:#333;">${t.intro}</p>

        <!-- Position card -->
        <div style="background:linear-gradient(135deg,#FAF5FF 0%,#F3F0FF 100%);border:1px solid #E9D8FD;border-radius:16px;padding:24px 26px;margin:0 0 36px;">
          <div style="font-family:ui-monospace,monospace;font-size:10px;letter-spacing:0.18em;color:#737373;text-transform:uppercase;margin:0 0 14px;">${escape(t.summaryTitle)}</div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="vertical-align:bottom;">
                <div style="font-family:ui-monospace,monospace;font-size:10px;letter-spacing:0.16em;color:#737373;text-transform:uppercase;margin:0 0 6px;">${escape(t.posLabel)}</div>
                <div style="font-size:48px;font-weight:700;letter-spacing:-0.04em;line-height:1;background:linear-gradient(135deg,#9333EA,#7E22CE);-webkit-background-clip:text;background-clip:text;color:transparent;">#${args.position.toLocaleString()}</div>
              </td>
              <td align="right" style="vertical-align:bottom;">
                <div style="font-family:ui-monospace,monospace;font-size:10px;letter-spacing:0.16em;color:#737373;text-transform:uppercase;margin:0 0 6px;">${escape(t.cohortLabel)}</div>
                <div style="font-size:14px;font-weight:600;color:#111;letter-spacing:-0.01em;margin:0 0 12px;">${escape(cohort)}</div>
                <div style="font-family:ui-monospace,monospace;font-size:10px;letter-spacing:0.16em;color:#737373;text-transform:uppercase;margin:0 0 6px;">${escape(t.etaLabel)}</div>
                <div style="font-size:14px;font-weight:600;color:#9333EA;letter-spacing:-0.01em;">${escape(etaLabel)}</div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Next -->
        <h2 style="margin:0 0 22px;font-size:22px;font-weight:600;letter-spacing:-0.02em;color:#111;">${escape(t.nextTitle)}</h2>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${stepRows}</table>

        <!-- CTA -->
        <div style="margin:8px 0 28px;">
          <a href="https://zentral.indrox.com" style="display:inline-block;background:#9333EA;color:#FFFFFF;text-decoration:none;padding:15px 28px;border-radius:10px;font-weight:600;font-size:15px;letter-spacing:-0.01em;box-shadow:0 12px 28px -10px rgba(147,51,234,0.45);">${escape(t.cta)} →</a>
        </div>

        <!-- Closer -->
        <p style="margin:24px 0 0;padding-top:24px;border-top:1px solid #E5E7EB;font-size:15px;line-height:1.6;color:#333;">${escape(t.closer)}</p>
        <p style="margin:14px 0 0;font-size:14px;color:#555;font-style:italic;">${escape(t.sign)}</p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:28px 8px 0;text-align:center;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.1em;color:#888;text-transform:uppercase;line-height:1.7;">
        ${escape(t.footerLine1)}<br />
        ${escape(t.footerLine2)}
        <div style="margin-top:14px;font-family:'DM Sans',sans-serif;text-transform:none;letter-spacing:0;font-size:12px;color:#888;">${escape(t.unsub)}</div>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
