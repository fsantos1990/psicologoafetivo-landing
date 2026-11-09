"""Captação de ideias: o que o Brasil está pesquisando sobre relacionamentos.

Fontes públicas do Google, sem login e sem chave:
  1. Sugestões do autocompletar (o que as pessoas digitam depois de "meu marido", "como saber se"...).
  2. Assuntos em alta no Brasil (Google Trends, últimas ~24 h), filtrados por término, traição,
     casamento etc. É aqui que aparece a "fofoca" do momento.

Uso (de content-ops/tools):
    python3 ideias.py            # rápido, ~1 min
    python3 ideias.py --fundo    # também testa "semente + a..z" (mais ideias, ~5 min)

Gera content-ops/ideias/AAAA-MM-DD.md e marca com 🆕 o que não apareceu em rodadas anteriores
(o histórico fica em content-ops/ideias/historico.json).
"""
import json, os, re, sys, time, unicodedata, urllib.parse, urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, "..", "ideias")
UA = {"User-Agent": "Mozilla/5.0 (Macintosh) ideias-conteudo"}

# Sementes agrupadas por tema. Edite à vontade.
SEMENTES = {
    "Queixas sobre o parceiro": ["meu marido", "minha esposa", "meu namorado", "minha namorada",
                                 "meu marido não", "minha mulher não", "meu namorado não"],
    "Dúvidas (como saber se...)": ["como saber se ele", "como saber se ela", "como saber se o relacionamento",
                                   "é normal no casamento", "é normal o namorado"],
    "Conflito e crise": ["brigas no casamento", "crise no casamento", "como fazer as pazes",
                         "como conversar com o parceiro", "ciúmes no relacionamento"],
    "Traição e término": ["traição", "como superar traição", "como superar término", "vale a pena voltar com ex",
                          "separação", "divórcio"],
    "Desejo e intimidade": ["falta de desejo", "sem vontade de transar", "vida sexual do casal", "libido"],
    "Ajuda": ["terapia de casal", "terapia de casal online", "livro sobre relacionamento"],
}

# Sugestões com estes trechos são descartadas (benefícios, trabalho etc. não são tema do perfil).
DESCARTAR = ["bolsa família", "inss", "aposentad", "carteira assinada", "auxílio", "imposto de renda",
             "loas", "pensão por morte", "bpc", "cifra", "letra", "música", "filme", "série", "novela"]

# Sugestões com estes radicais vão para "dúvidas reais"; o resto (títulos de novela, dorama, música) fica recolhido.
RADICAIS_RELEVANTES = ["o que fazer", "como ", "por que", "porque", "normal", "sinais", "sinal", "desejo", "procura",
                       "respeit", "confi", "ama ", "ama mais", "amor", "celular", "ciúme", "ciume", "trai", "brig",
                       "grit", "separ", "divorc", "divórci", "sexo", "transar", "libido", "conversa", "mentir", "ment",
                       "frio", "distant", "ignor", "carinho", "atenção", "atencao", "casar", "terapia", "voltar",
                       "superar", "ex ", "culpa", "perdo", "vale a pena", "acabou", "acabar", "cansad", "rotina",
                       "filho", "sogr", "bateu", "agred", "agress", "violen", "abus", "mensagem", "whatsapp", "bloque", "gosta", "grávida", "gravida", "dinheiro", "ajuda", "psicólog", "psicolog", "online", "preço", "valor"]

# Assuntos em alta só entram se o título ou as notícias tiverem um destes radicais.
RADICAIS_TRENDS = ["separa", "términ", "termin", "divórci", "divorci", "trai", "namor", "casament", "casou",
                   "casar", "noiv", "affair", "reconcil", "romance", "ciúme", "ciume", "ex-mulher", "ex-marido",
                   "ex-namorad", "assume relação", "fim do relacionamento", "crise", "relacionamento", "casal"]


def norm(t):
    return unicodedata.normalize("NFKD", t.lower()).encode("ascii", "ignore").decode()

def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()

def sugestoes(q):
    url = "https://suggestqueries.google.com/complete/search?" + urllib.parse.urlencode(
        {"client": "firefox", "hl": "pt-BR", "gl": "br", "q": q})
    try:
        return json.loads(get(url).decode("utf-8", "replace"))[1]
    except Exception as e:
        print(f"  aviso: falhou '{q}': {e}", file=sys.stderr)
        return []

def coletar_sugestoes(fundo):
    descartar = [norm(d) for d in DESCARTAR]
    out = {}
    for tema, seeds in SEMENTES.items():
        vistos = set()
        for s in seeds:
            consultas = [s + " "] + ([f"{s} {c}" for c in "abcdefghijlmnopqrstv"] if fundo else [])
            for q in consultas:
                for sug in sugestoes(q):
                    n = norm(sug)
                    if n in vistos or any(d in n for d in descartar) or norm(s) == n.strip():
                        continue
                    vistos.add(n); out.setdefault(tema, []).append(sug)
                time.sleep(0.4)  # ritmo educado para não ser bloqueado
        print(f"  {tema}: {len(out.get(tema, []))} sugestões")
    return out

def coletar_trends():
    ns = {"ht": "https://trends.google.com/trending/rss"}
    try:
        root = ET.fromstring(get("https://trends.google.com/trending/rss?geo=BR"))
    except Exception as e:
        print(f"  aviso: Trends falhou: {e}", file=sys.stderr); return [], 0
    radicais = [norm(r) for r in RADICAIS_TRENDS]
    itens, total = [], 0
    for it in root.iter("item"):
        total += 1
        titulo = it.findtext("title", "")
        trafego = it.findtext("ht:approx_traffic", "", ns)
        noticias = [(n.findtext("ht:news_item_title", "", ns), n.findtext("ht:news_item_url", "", ns))
                    for n in it.findall("ht:news_item", ns)]
        texto = norm(titulo + " " + " ".join(t for t, _ in noticias))
        if any(r in texto for r in radicais):
            itens.append((titulo, trafego, noticias[:2]))
    return itens, total

def main():
    fundo = "--fundo" in sys.argv
    os.makedirs(SAIDA, exist_ok=True)
    hist_p = os.path.join(SAIDA, "historico.json")
    hist = set(json.load(open(hist_p))) if os.path.exists(hist_p) else set()
    primeira = not hist

    print("Assuntos em alta no Brasil (Google Trends)...")
    trends, total = coletar_trends()
    print(f"  {len(trends)} de {total} ligados a relacionamento")
    print("Sugestões do Google" + (" (modo fundo)" if fundo else "") + "...")
    sug = coletar_sugestoes(fundo)

    hoje = datetime.now().strftime("%Y-%m-%d")
    L = [f"# Captação de ideias, {datetime.now():%d/%m/%Y %H:%M}", ""]
    L += ["## Em alta agora no Brasil (fofoca e notícias)", ""]
    if trends:
        for titulo, traf, nots in trends:
            L.append(f"- **{titulo}** ({traf} buscas)")
            for t, u in nots:
                L.append(f"  - [{t}]({u})")
    else:
        L.append(f"_Nenhum dos {total} assuntos em alta tem a ver com relacionamento agora. Rode de novo amanhã._")
    L += ["", "## O que as pessoas digitam no Google", ""]
    if not primeira:
        L += ["🆕 = não apareceu em rodadas anteriores.", ""]
    rel = [norm(r) for r in RADICAIS_RELEVANTES]
    novos, resto = 0, []
    for tema, lista in sug.items():
        L += [f"### {tema}", ""]
        for s in lista:
            if not any(re.search(r"(?<![a-z])" + re.escape(r), norm(s) + " ") for r in rel):
                resto.append(s); continue
            novo = not primeira and norm(s) not in hist
            novos += novo
            L.append(f"- {'🆕 ' if novo else ''}{s}")
        L.append("")
    if resto:
        L += ["<details><summary>Outras sugestões (provável ruído: novelas, doramas, música)</summary>", "",
              ", ".join(resto), "", "</details>", ""]
    L += ["---", "Fontes: sugestões do autocompletar do Google (pt-BR) e Google Trends, assuntos em alta no Brasil.",
          "As sugestões mostram o que é digitado com frequência, não volume exato de buscas."]

    arq = os.path.join(SAIDA, f"{hoje}.md")
    open(arq, "w").write("\n".join(L) + "\n")
    hist |= {norm(s) for lista in sug.values() for s in lista}
    json.dump(sorted(hist), open(hist_p, "w"), ensure_ascii=False, indent=0)
    print(f"\nPronto: {os.path.relpath(arq)}" + ("" if primeira else f"  ({novos} sugestões novas)"))

if __name__ == "__main__":
    main()
