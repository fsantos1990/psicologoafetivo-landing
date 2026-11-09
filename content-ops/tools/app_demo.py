"""Gera telas de demonstração do app /app/ (casal fictício, sem banco) para usar em stories.

Usa o HTML real do app e o conteúdo do plano em ~/code/mapa-afetivo-conteudo.sql (fora do repositório).
A página de demonstração e as capturas ficam em out/ e NÃO devem ir para o repositório (contêm texto do livro).

    python3 app_demo.py      # gera out/app_s1.png (Semana 1) e out/app_s2.png (comparação da Semana 2)
"""
import datetime, json, os, re, subprocess

AQUI = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(AQUI, "..", "..", "client", "public", "app", "index.html")
SQL = os.path.expanduser("~/code/mapa-afetivo-conteudo.sql")
OUT = os.path.join(AQUI, "out")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

STUB = '''<script>window.supabase={createClient:()=>({auth:{onAuthStateChange(){},signOut(){},getSession:async()=>({data:{session:null}})},
from:()=>({upsert:async()=>({}),update:()=>({eq:async()=>({})})}),rpc:async()=>({data:null})})};</script>'''

DEMO = '''
/* ---- DEMONSTRAÇÃO: casal fictício, sem banco ---- */
({ itens:ITENS, nomes:NOME_CURTO, semanas:SEMANAS, t:T } = %s);
S.user={id:"a"}; S.members=[{user_id:"a"},{user_id:"b"}];
S.couple={id:"c",invite_code:"DEMO",start_date:"%s"};
S.priv={w1_d1_resp:"Ela contou da reunião difícil; repeti o que entendi e perguntei como podia ajudar.",
 w1_d1_apr:"Obrigado por fazer o jantar, isso me deu um tempo para respirar.",
 w1_d2_resp:"Ouvi a história do irmão dele até o fim, sem dar conselho.",
 w1_d2_apr:"Obrigada por buscar as crianças, isso me deu uma hora livre.",
 w1_d3_apr:"Obrigado por lembrar do meu exame, isso me deixou mais tranquilo."};
const nA={int:7,pai:5,com:9,pcom:8,apr:5,sex:6,psat:8,conf:6,sat:7}, nB={int:8,pai:6,com:9,pcom:9,apr:8,sex:6,psat:6,conf:7,sat:8};
S.ratings=[...Object.entries(nA).map(([item,value])=>({user_id:"a",round:"w2",item,value})),
           ...Object.entries(nB).map(([item,value])=>({user_id:"b",round:"w2",item,value}))];
document.getElementById("btnSair").classList.remove("hidden");
if (location.hash==="#s2"){ S.tab=2; render(h("div",{class:"card"}, h("span",{class:"tag"},"Dia 10 · conversa de comparação"),
  h("h3",{},"Comparação"), comparacao("w2"))); }
else { S.tab=1; desenharPainel(); }
'''

def main():
    os.makedirs(OUT, exist_ok=True)
    src = open(APP).read()
    plano = json.loads(open(SQL).read().split("$json$")[1])
    src = re.sub(r'<script src="https://cdn.jsdelivr.net/npm/@supabase[^>]*></script>', STUB, src)
    ini = (datetime.date.today() - datetime.timedelta(days=2)).isoformat()  # hoje = Dia 3
    src = re.sub(r"const hashErro = [\s\S]*?else iniciar\(\);", lambda _: DEMO % (json.dumps(plano, ensure_ascii=False), ini), src)
    demo = os.path.join(OUT, "app_demo.html")
    open(demo, "w").write(src)
    for v in ("s1", "s2"):
        # o Chrome sem janela não aceita menos de ~500 px de largura
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=520,1000",
                        "--force-device-scale-factor=3", "--virtual-time-budget=4000",
                        f"--screenshot={os.path.join(OUT, 'app_' + v + '.png')}", f"file://{demo}#{v}"],
                       check=True, stderr=subprocess.DEVNULL)
    print("ok:", sorted(f for f in os.listdir(OUT) if f.startswith("app_")))

if __name__ == "__main__":
    main()
