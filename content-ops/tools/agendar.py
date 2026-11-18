"""Coloca uma peça na fila de publicação (content-ops/fila.json).

Exemplos:
  # carrossel já renderizado por render.py, legenda tirada do POST do script
  python3 content-ops/tools/agendar.py --quando "2026-12-03 19:00" --tipo carrossel \
      --legenda-de content-ops/posts/2026-12-03_sozinha.py \
      client/public/ig/posts/2026-12-03_sozinha_*.png

  # story
  python3 content-ops/tools/agendar.py --quando "2026-12-03 19:05" --tipo story \
      content-ops/tools/stories/2026-12-07_serieb_b1.png

Arquivos fora de client/public são copiados para client/public/ig/fila/<id>/.
O horário é sempre o de Salvador (UTC-3).
"""
import argparse, importlib.util, json, shutil
from datetime import datetime
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
FILA = RAIZ / "content-ops" / "fila.json"
PUBLIC = RAIZ / "client" / "public"


def legenda_de(script):
    spec = importlib.util.spec_from_file_location("post", script)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.POST["caption"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quando", required=True, help='"AAAA-MM-DD HH:MM", horário de Salvador')
    ap.add_argument("--tipo", required=True, choices=["carrossel", "imagem", "story", "reel"])
    ap.add_argument("--id", help="identificador; padrão: data + nome do primeiro arquivo")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--legenda")
    g.add_argument("--legenda-de", help="script de post com POST['caption']")
    ap.add_argument("midia", nargs="+")
    a = ap.parse_args()

    quando = datetime.strptime(a.quando, "%Y-%m-%d %H:%M").strftime("%Y-%m-%dT%H:%M:00-03:00")
    arquivos = sorted(Path(m).resolve() for m in a.midia)
    ident = a.id or f"{a.quando[:10]}_{a.tipo}_{arquivos[0].stem}"
    legenda = legenda_de(a.legenda_de) if a.legenda_de else (a.legenda or "")

    midia = []
    for f in arquivos:
        if not f.is_file():
            raise SystemExit(f"arquivo não encontrado: {f}")
        try:
            midia.append(str(f.relative_to(PUBLIC)))
        except ValueError:
            destino = PUBLIC / "ig" / "fila" / ident / f.name
            destino.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, destino)
            midia.append(str(destino.relative_to(PUBLIC)))

    fila = json.loads(FILA.read_text(encoding="utf-8"))
    if any(i["id"] == ident for i in fila["itens"]):
        raise SystemExit(f"já existe item com id {ident}; use --id")
    fila["itens"].append({"id": ident, "quando": quando, "tipo": a.tipo, "midia": midia,
                          "legenda": legenda, "status": "pendente"})
    fila["itens"].sort(key=lambda i: i["quando"])
    FILA.write_text(json.dumps(fila, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"na fila: {ident} ({a.tipo}, {quando}, {len(midia)} mídia(s))")


if __name__ == "__main__":
    main()
