// Edge Function: recebe o webhook da Hotmart e libera ou bloqueia o acesso ao app.
// Configuração:
//   supabase secrets set HOTMART_HOTOK=<token do painel da Hotmart>
//   supabase functions deploy hotmart-webhook --no-verify-jwt
// Na Hotmart: Ferramentas > Webhook, apontar para https://<projeto>.supabase.co/functions/v1/hotmart-webhook
// Confira os nomes dos eventos no painel antes de ativar; a Hotmart muda a versão do webhook de tempos em tempos.

import { createClient } from "jsr:@supabase/supabase-js@2";

const LIBERA = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]);
const BLOQUEIA = new Set(["PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK", "PURCHASE_CANCELED"]);

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Método não permitido", { status: 405 });

  const hottok = req.headers.get("x-hotmart-hottok");
  if (!hottok || hottok !== Deno.env.get("HOTMART_HOTOK")) {
    return new Response("Token inválido", { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const event: string | undefined = body?.event;
  const email: string | undefined = body?.data?.buyer?.email?.toLowerCase().trim();
  const transaction: string | undefined = body?.data?.purchase?.transaction;
  if (!event || !email) return new Response("Payload sem evento ou e-mail", { status: 400 });

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  if (LIBERA.has(event) || BLOQUEIA.has(event)) {
    const { error } = await db.from("entitlements").upsert({
      email,
      source: "hotmart",
      external_id: transaction ?? null,
      active: LIBERA.has(event),
    });
    if (error) return new Response(error.message, { status: 500 });
  }

  // eventos que não mexem no acesso também recebem 200, para a Hotmart não reenviar
  return new Response("ok", { status: 200 });
});
