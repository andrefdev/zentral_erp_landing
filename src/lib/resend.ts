/**
 * Minimal Resend REST client (no SDK dep).
 *
 * Resend covers three needs:
 *   1. transactional email (admin notification + user welcome)
 *   2. contact storage (audiences)
 *   3. waitlist count (audience size)
 */

const API = 'https://api.resend.com';

function authHeaders(): Record<string, string> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY missing');
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

export interface SendEmailInput {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  reply_to?: string;
}

export async function sendEmail(input: SendEmailInput) {
  const res = await fetch(`${API}/emails`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`resend.sendEmail ${res.status}: ${txt}`);
  }
  return (await res.json()) as { id: string };
}

interface CreateContactResult { ok: true; created: boolean }

/**
 * Create a contact in the configured audience. Returns `created: false`
 * if the email is already on the list (Resend returns 422 in that case).
 */
export async function addContact(input: {
  email: string;
  firstName?: string;
  lastName?: string;
}): Promise<CreateContactResult> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) throw new Error('RESEND_AUDIENCE_ID missing');

  const res = await fetch(`${API}/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      unsubscribed: false,
    }),
  });
  if (res.ok) return { ok: true, created: true };
  if (res.status === 409 || res.status === 422) {
    return { ok: true, created: false };
  }
  const txt = await res.text().catch(() => '');
  throw new Error(`resend.addContact ${res.status}: ${txt}`);
}

/**
 * Count contacts in the audience.
 */
export async function getWaitlistCount(): Promise<number> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) return 0;

  let total = 0;
  let cursor: string | null = null;
  for (let page = 0; page < 100; page++) {
    const url = new URL(`${API}/audiences/${audienceId}/contacts`);
    url.searchParams.set('limit', '100');
    if (cursor) url.searchParams.set('after', cursor);
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`resend.list ${res.status}: ${txt}`);
    }
    const json = (await res.json()) as { data?: Array<{ id: string }> };
    const rows = json.data ?? [];
    total += rows.length;
    if (rows.length < 100) break;
    cursor = rows[rows.length - 1]?.id ?? null;
    if (!cursor) break;
  }
  return total;
}
