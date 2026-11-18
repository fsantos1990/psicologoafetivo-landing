"""Publica no Instagram os itens vencidos de content-ops/fila.json (Instagram API with Instagram Login).

Uso:
  python3 content-ops/tools/publicar.py            # publica o que estiver vencido
  python3 content-ops/tools/publicar.py --teste    # só valida a fila e as URLs, não publica

Variáveis de ambiente: IG_ACCESS_TOKEN, IG_USER_ID, IG_API_VERSION (opcional).
As mídias ficam em client/public/... e são lidas pela URL pública do site.
"""
import json, os, sys, time, urllib.parse, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
FILA = RAIZ / "content-ops" / "fila.json"
PUBLIC = RAIZ / "client" / "public"
SITE = "https://www.psicologoafetivo.com.br/"
API = f"https://graph.instagram.com/{os.environ.get('IG_API_VERSION', 'v24.0')}"
TIPOS = {"carrossel", "imagem", "story", "reel"}
MAX_TENTATIVAS = 3


def carregar():
    return json.loads(FILA.read_text(encoding="utf-8"))


def salvar(fila):
    FILA.write_text(json.dumps(fila, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def url_de(caminho):
    return SITE + urllib.parse.quote(caminho.lstrip("/"))


def validar(item):
    """Lista de problemas do item; vazia se estiver tudo certo."""
    erros = []
    tipo = item.get("tipo")
    midia = item.get("midia") or []
    leg = item.get("legenda") or ""
    if tipo not in TIPOS:
        erros.append(f"tipo inválido: {tipo}")
    try:
        datetime.fromisoformat(item["quando"])
    except Exception:
        erros.append("campo 'quando' precisa estar no formato 2026-12-03T19:00:00-03:00")
    if tipo == "carrossel" and not 2 <= len(midia) <= 10:
        erros.append("carrossel precisa de 2 a 10 mídias")
    if tipo in {"imagem", "story", "reel"} and len(midia) != 1:
        erros.append(f"{tipo} precisa de exatamente 1 mídia")
    for m in midia:
        if not (PUBLIC / m).is_file():
            erros.append(f"arquivo não encontrado em client/public: {m}")
    if tipo == "reel" and midia and not midia[0].lower().endswith(".mp4"):
        erros.append("reel precisa de .mp4")
    if len(leg) > 2200:
        erros.append(f"legenda com {len(leg)} caracteres (máximo 2200)")
    if leg.count("#") > 30:
        erros.append("mais de 30 hashtags")
    t = leg.lower()
    if "diagnóstico" in t and "avaliação educativa" not in t:
        erros.append("legenda cita o diagnóstico sem o aviso de avaliação educativa (AVISO_CAP)")
    return erros


def checar_url(url):
    req = urllib.request.Request(url, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            tipo = r.headers.get("Content-Type", "")
            return r.status == 200 and not tipo.startswith("text/html")
    except Exception:
        return False


def api(metodo, caminho, **params):
    params["access_token"] = os.environ["IG_ACCESS_TOKEN"]
    dados = urllib.parse.urlencode(params).encode()
    if metodo == "GET":
        req = urllib.request.Request(f"{API}/{caminho}?{dados.decode()}")
    else:
        req = urllib.request.Request(f"{API}/{caminho}", data=dados, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        corpo = e.read().decode(errors="replace")
        raise RuntimeError(f"{metodo} {caminho}: HTTP {e.code} {corpo[:500]}") from None


def esperar(container, limite=300):
    inicio = time.time()
    while time.time() - inicio < limite:
        st = api("GET", container, fields="status_code").get("status_code")
        if st == "FINISHED":
            return
        if st in {"ERROR", "EXPIRED"}:
            raise RuntimeError(f"container {container} terminou com status {st}")
        time.sleep(5)
    raise RuntimeError(f"container {container} não ficou pronto em {limite}s")


def publicar(item, ig):
    tipo, leg = item["tipo"], item.get("legenda", "")
    urls = [url_de(m) for m in item["midia"]]
    if tipo == "carrossel":
        filhos = []
        for u in urls:
            c = api("POST", f"{ig}/media", image_url=u, is_carousel_item="true")["id"]
            esperar(c)
            filhos.append(c)
        cont = api("POST", f"{ig}/media", media_type="CAROUSEL", children=",".join(filhos), caption=leg)["id"]
    elif tipo == "imagem":
        cont = api("POST", f"{ig}/media", image_url=urls[0], caption=leg)["id"]
    elif tipo == "story":
        campo = "video_url" if urls[0].lower().endswith(".mp4") else "image_url"
        cont = api("POST", f"{ig}/media", media_type="STORIES", **{campo: urls[0]})["id"]
    else:
        cont = api("POST", f"{ig}/media", media_type="REELS", video_url=urls[0], caption=leg, share_to_feed="true")["id"]
    esperar(cont, limite=600 if tipo in {"reel", "story"} else 300)
    midia_id = api("POST", f"{ig}/media_publish", creation_id=cont)["id"]
    try:
        link = api("GET", midia_id, fields="permalink").get("permalink")
    except RuntimeError:
        link = None
    return midia_id, link


def main():
    teste = "--teste" in sys.argv
    fila = carregar()
    agora = datetime.now(timezone.utc)
    problemas = 0

    if teste:
        for it in fila["itens"]:
            if it.get("status") != "pendente":
                continue
            erros = validar(it)
            if not erros:
                for m in it["midia"]:
                    if not checar_url(url_de(m)):
                        erros.append(f"URL ainda não está no ar (falta deploy?): {url_de(m)}")
            print(f"{'OK ' if not erros else 'ERRO'} {it['id']} ({it['tipo']}, {it['quando']})")
            for e in erros:
                print(f"     - {e}")
            problemas += bool(erros)
        sys.exit(1 if problemas else 0)

    ig = os.environ["IG_USER_ID"]
    mudou = False
    for it in sorted(fila["itens"], key=lambda x: x["quando"]):
        if it.get("status") != "pendente" or datetime.fromisoformat(it["quando"]) > agora:
            continue
        erros = validar(it) + [f"URL fora do ar: {url_de(m)}" for m in it["midia"] if not checar_url(url_de(m))]
        try:
            if erros:
                raise RuntimeError("; ".join(erros))
            midia_id, link = publicar(it, ig)
            it.update(status="publicado", ig_id=midia_id, link=link, erro=None,
                      publicado_em=datetime.now(timezone.utc).isoformat(timespec="seconds"))
            print(f"publicado {it['id']}: {link}")
        except Exception as e:
            it["tentativas"] = it.get("tentativas", 0) + 1
            it["erro"] = str(e)[:800]
            if it["tentativas"] >= MAX_TENTATIVAS:
                it["status"] = "falhou"
            print(f"erro em {it['id']} (tentativa {it['tentativas']}): {e}")
            problemas += 1
        mudou = True
    if mudou:
        salvar(fila)
    sys.exit(1 if problemas else 0)


if __name__ == "__main__":
    main()
