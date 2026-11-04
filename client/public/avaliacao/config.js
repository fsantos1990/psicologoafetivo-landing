/* Preencha com os dados do seu projeto Supabase:
   Supabase > Project Settings > API > Project URL e anon public key.
   A anon key é pública por desenho; quem protege os dados são as regras RLS do arquivo supabase/avaliacao.sql. */
window.AVALIACAO_CONFIG = {
  SUPABASE_URL: "https://SEU-PROJETO.supabase.co",
  SUPABASE_ANON_KEY: "COLE_AQUI_A_ANON_KEY",
  // E-mail autorizado a entrar no painel (precisa ser igual ao do arquivo SQL)
  EMAIL_TERAPEUTA: "psicologoafetivo@gmail.com"
};
