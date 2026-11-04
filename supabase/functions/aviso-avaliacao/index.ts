// Edge Function: envia um e-mail curto ao terapeuta quando chega uma avaliação nova.
// O e-mail NÃO contém respostas clínicas, só o código do casal, o nome e o link do painel.
//
// Disparo: Supabase > Database > Webhooks > Create webhook
//   Tabela: avaliacoes · Evento: Insert · Tipo: Supabase Edge Functions · Função: aviso-avaliacao
//
// Segredos necessários (Edge Functions > Secrets):
//   RESEND_API_KEY   chave da conta Resend (resend.com, plano gratuito basta)
//   AVISO_PARA       e-mail que recebe o aviso (ex.: psicologoafetivo@gmail.com)
//   AVISO_DE         remetente verificado na Resend (ex.: avisos@psicologoafetivo.com.br)

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const r = payload?.record ?? {};
    const casal = String(r.casal ?? "").slice(0, 40);
    const parceiro = String(r.parceiro ?? "").slice(0, 80);
    const painel = "https://www.psicologoafetivo.com.br/avaliacao/painel/";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: Deno.env.get("AVISO_DE"),
        to: [Deno.env.get("AVISO_PARA")],
        subject: `Nova avaliação recebida: ${casal}`,
        text:
          `Chegou uma avaliação nova.\n\nCasal: ${casal}\nParceiro(a): ${parceiro}\n\n` +
          `Abra o painel para ver respostas e escores:\n${painel}?casal=${encodeURIComponent(casal)}`,
      }),
    });
    return new Response(await res.text(), { status: res.ok ? 200 : 500 });
  } catch (e) {
    return new Response(String(e), { status: 500 });
  }
});
