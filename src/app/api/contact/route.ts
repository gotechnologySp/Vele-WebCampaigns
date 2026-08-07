import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/form-schema";

const submissions = new Map<string, number>();
const COOLDOWN_MS = 30_000;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  if (now - (submissions.get(ip) ?? 0) < COOLDOWN_MS) return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  const body: unknown = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "invalid_data" }, { status: 400 });
  submissions.set(ip, now);
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
  if (!portalId || !formId) {
    if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "integration_not_configured" }, { status: 503 });
    return NextResponse.json({ ok: true, developmentMode: true });
  }
  const { consent, ...values } = parsed.data;
  const fields = Object.entries(values).map(([name, value]) => ({ name: name === "phone" ? "phone" : name, value }));
  const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fields, legalConsentOptions: { consent: { consentToProcess: consent, text: "Concordo com o processamento dos dados para retorno do contato.", communications: [] } } }), signal: AbortSignal.timeout(10_000) });
  if (!response.ok) return NextResponse.json({ error: "provider_error" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
