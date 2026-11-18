"""Responde por mensagem direta a quem comentou MAPA nos posts recentes.

Para cada comentário novo com a palavra MAPA (últimos 7 dias, limite da Meta para resposta privada):
1. manda uma DM com o link do diagnóstico e o aviso;
2. responde o comentário em público avisando que mandou.
Guarda os IDs já respondidos em content-ops/respostas_mapa.json.

Permissões do token: instagram_business_manage_comments e instagram_business_manage_messages.
"""
import json, os, re, sys, urllib.parse, urllib.request, urllib.error
from datetime import datetime, timedelta, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
ESTADO = RAIZ / "content-ops" / "respostas_mapa.json"
API = f"https://graph.instagram.com/{os.environ.get('IG_API_VERSION', 'v24.0')}"
PALAVRA = re.compile(r"\bmapa\b", re.IGNORECASE)

DM = ("Oi! Aqui está o diagnóstico gratuito do casal: 23 perguntas, cerca de 5 minutos. "
      "O resultado mostra os três pilares (intimidade, paixão e compromisso) e traz um plano de 7 dias "
      "para o mais baixo.\n\nhttps://www.psicologoafetivo.com.br/mapa\n\n"
      "Aviso: o diagnóstico do Mapa Afetivo é uma avaliação educativa. Não é um diagnóstico psicológico "
      "e não substitui avaliação profissional.")
RESPOSTA_PUBLICA = "Te mandei o link por mensagem 📩"


def api(metodo, caminho, json_body=None, **params):
    params["access_token"] = os.environ["IG_ACCESS_TOKEN"]
    url = f"{API}/{caminho}?{urllib.parse.urlencode(params)}"
    if json_body is not None:
        req = urllib.request.Request(url, data=json.dumps(json_body).encode(), method="POST",
                                     headers={"Content-Type": "application/json"})
    else:
        req = urllib.request.Request(url, method=metodo, data=b"" if metodo == "POST" else None)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"{metodo} {caminho}: HTTP {e.code} {e.read().decode(errors='replace')[:400]}") from None


def main():
    ig = os.environ["IG_USER_ID"]
    estado = json.loads(ESTADO.read_text()) if ESTADO.exists() else {"respondidos": []}
    feitos = set(estado["respondidos"])
    limite = datetime.now(timezone.utc) - timedelta(days=7)
    novos, falhas = [], 0

    midias = api("GET", f"{ig}/media", fields="id,timestamp", limit=15).get("data", [])
    for m in midias:
        comentarios = api("GET", f"{m['id']}/comments", fields="id,text,timestamp,username", limit=50).get("data", [])
        for c in comentarios:
            quando = datetime.fromisoformat(c["timestamp"].replace("+0000", "+00:00"))
            if c["id"] in feitos or quando < limite or not PALAVRA.search(c.get("text", "")):
                continue
            try:
                api("POST", f"{ig}/messages", json_body={"recipient": {"comment_id": c["id"]}, "message": {"text": DM}})
                api("POST", f"{c['id']}/replies", message=RESPOSTA_PUBLICA)
                novos.append(c["id"])
                print(f"respondido @{c.get('username')} ({c['id']})")
            except RuntimeError as e:
                falhas += 1
                print(f"falha no comentário {c['id']}: {e}")

    if novos:
        estado["respondidos"] = (estado["respondidos"] + novos)[-3000:]
        ESTADO.write_text(json.dumps(estado, indent=2) + "\n")
    print(f"{len(novos)} resposta(s) enviada(s)")
    sys.exit(1 if falhas else 0)


if __name__ == "__main__":
    main()
