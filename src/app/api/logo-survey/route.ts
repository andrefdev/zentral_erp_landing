// Encuesta de logo: POST guarda una respuesta, GET (con ?code=) devuelve el consolidado.
// Storage = Supabase vía su REST API (PostgREST). Sin SDK: solo fetch.
// Tabla:  create table logo_responses (id bigint generated always as identity primary key,
//                                       created_at timestamptz default now(), data jsonb not null);
//         alter table logo_responses enable row level security;  -- solo la secret key (service_role) accede

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TEAM_CODE = process.env.SURVEY_TEAM_CODE || "zentral2026";
const TABLE = "logo_responses";

function rest(path: string, init?: RequestInit) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY!,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function POST(request: Request) {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return Response.json({ error: "storage no configurado" }, { status: 500 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "json inválido" }, { status: 400 });
  }
  // ponytail: validación mínima — solo que sea un objeto con favorita. El esquema vive en el cliente.
  if (!body || typeof body !== "object" || !(body as { favorite?: unknown }).favorite) {
    return Response.json({ error: "respuesta incompleta" }, { status: 400 });
  }
  try {
    const res = await rest(TABLE, {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ data: body }),
    });
    if (!res.ok) throw new Error("status " + res.status);
  } catch {
    return Response.json({ error: "no se pudo guardar" }, { status: 502 });
  }
  return Response.json({ ok: true });
}

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") || "";
  if (code !== TEAM_CODE) {
    return Response.json({ error: "código incorrecto" }, { status: 401 });
  }
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return Response.json({ error: "storage no configurado" }, { status: 500 });
  }
  let rows: { data: unknown }[];
  try {
    const res = await rest(`${TABLE}?select=data&order=created_at.asc`);
    if (!res.ok) throw new Error("status " + res.status);
    rows = await res.json();
  } catch {
    return Response.json({ error: "no se pudo leer" }, { status: 502 });
  }
  // El dashboard espera el array de objetos resp tal cual.
  return Response.json(rows.map((r) => r.data));
}
