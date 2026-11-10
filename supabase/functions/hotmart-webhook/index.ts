// Edge Function: recebe o webhook da Hotmart e libera ou bloqueia o acesso ao app.
// Configuração:
//   supabase secrets set HOTMART_HOTOK=<token do painel da Hotmart>
//   supabase secrets set HOTMART_PRODUCT_IDS=<id numérico do produto Mapa Afetivo; vários separados por vírgula>
//   supabase functions deploy hotmart-webhook --no-verify-jwt
// Na Hotmart: Ferramentas > Webhook, apontar para https://<projeto>.supabase.co/functions/v1/hotmart-webhook
// Confira os nomes dos eventos no painel antes de ativar; a Hotmart muda a versão do webhook de tempos em tempos.
//
// Regras:
//   - Com HOTMART_PRODUCT_IDS definido, só eventos desses produtos mexem no acesso. Sem ele, qualquer produto da conta libera.
//   - Cancelamento, reembolso ou chargeback só desligam o acesso se forem da mesma transação que liberou.
//     Assim, uma tentativa de pagamento que falhou não derruba quem pagou em outra tentativa.

import { createClient } from "jsr:@supabase/supabase-js@2";

const LIBERA = new Set(["PURCHASE_APPROVED", "PURCHASE_COMPLETE"]);
const BLOQUEIA = new Set(["PURCHASE_REFUNDED", "PURCHASE_CHARGEBACK", "PURCHASE_CANCELED"]);
const ok = () => new Response("ok", { status: 200 });

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
  const rawProduct = body?.data?.product?.id;
  const productId: string | undefined = rawProduct != null ? String(rawProduct) : undefined;
  if (!event || !email) return new Response("Payload sem evento ou e-mail", { status: 400 });

  // eventos que não mexem no acesso também recebem 200, para a Hotmart não reenviar
  if (!LIBERA.has(event) && !BLOQUEIA.has(event)) return ok();

  const permitidos = (Deno.env.get("HOTMART_PRODUCT_IDS") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (permitidos.length && (!productId || !permitidos.includes(productId))) {
    console.log(`ignorado: ${event} do produto ${productId ?? "sem id"}, fora de HOTMART_PRODUCT_IDS`);
    return ok();
  }

  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  if (LIBERA.has(event)) {
    const { error } = await db.from("entitlements").upsert({
      email,
      product: productId ? `hotmart:${productId}` : "mapa-afetivo",
      source: "hotmart",
      external_id: transaction ?? null,
      active: true,
    });
    if (error) return new Response(error.message, { status: 500 });
    console.log(`liberado: ${event}, produto ${productId ?? "sem id"}`);
    return ok();
  }

  // bloqueio: só da transação que liberou o acesso
  if (!transaction) {
    console.log(`ignorado: ${event} sem código de transação`);
    return ok();
  }
  const { data, error } = await db.from("entitlements")
    .update({ active: false })
    .eq("email", email)
    .eq("external_id", transaction)
    .select("email");
  if (error) return new Response(error.message, { status: 500 });
  console.log(`${event}: ${data?.length ? "acesso desligado" : "outra transação, acesso mantido"}`);
  return ok();
});
