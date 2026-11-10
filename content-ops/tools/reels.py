"""Gera Reels 1080x1920 (texto animado + trilha ambiente sintetizada) para @psicologoafetivo.

Uso (dentro de content-ops/tools):  python3 reels.py            # todos
                                    python3 reels.py padrao     # só um
Saída: out/reels/<chave>.mp4 e <chave>.txt (legenda).
"""
import os, sys, subprocess
from PIL import Image, ImageDraw
from render import font, wrap, BG, INK, BLUE, MUTED, WM, AVISO_IMG, AVISO_CAP, checar_texto, checar_aviso

W, H = 1080, 1920
M = 96
FPS = 30
TOPO, BASE = 300, 1480          # área segura: o Instagram cobre o rodapé e a lateral direita
FADE = 0.35                     # segundos de entrada de cada linha
CTA = "Comece pelo diagnóstico gratuito do casal.\nDepois, o livro Mapa Afetivo.\nLink na bio."

# Cada cena: (rótulo, [(texto, tamanho, peso, cor, atraso_s)], duração_s)
# Cada reel: dict com cenas e legenda (PT primeiro, depois —, depois EN).
REELS = {
 "padrao": {
  "cenas": [
   ("", [("Vocês brigam por louça,\ndinheiro, horário…", 76, 800, INK, 0.0),
         ("mas a briga é sempre igual?", 76, 800, BLUE, 0.9)], 3.2),
   ("O PADRÃO", [("Um cobra.", 72, 800, INK, 0.0),
                 ("O outro se fecha.", 72, 800, INK, 0.7),
                 ("Quanto mais um cobra, mais o outro se fecha.", 50, 400, MUTED, 1.5),
                 ("E vice-versa.", 50, 400, MUTED, 2.3)], 4.6),
   ("O PONTO", [("O problema raramente é o tema.", 64, 800, INK, 0.0),
                ("É o ciclo que vocês repetem\nem qualquer tema.", 54, 400, INK, 1.0)], 3.8),
   ("EXPERIMENTE", [("Na próxima vez, pare e nomeie:", 54, 400, INK, 0.0),
                    ("“Estamos no nosso ciclo de novo.”", 68, 800, BLUE, 0.9),
                    ("Vocês dois contra o ciclo,\nnão um contra o outro.", 50, 400, MUTED, 2.0)], 4.6),
  ],
  "legenda": ("Quase todo casal tem um ciclo: um cobra, o outro se fecha, e cada reação alimenta a outra. "
              "O tema muda (louça, dinheiro, família), mas a dança é a mesma. "
              "Dar nome ao ciclo é o primeiro passo para sair dele juntos.\n\n"
              "Comece pelo diagnóstico gratuito do casal: 23 perguntas, resultado na hora. Depois, o livro Mapa Afetivo. Link na bio.\n\n"
              + AVISO_CAP +
              "\n\n—\n\n"
              "Most couples have a cycle: one pursues, the other withdraws, and each reaction feeds the other. "
              "The topic changes, the dance stays the same. Naming the cycle is the first step to stepping out of it together. "
              "Free couple assessment (educational, not a psychological diagnosis): link in bio.\n\n"
              "#casal #relacionamento #terapiadecasal #psicologia #comunicacaonocasal"),
 },
 "perpetuos": {
  "cenas": [
   ("", [("Aquela briga que\nnunca se resolve…", 80, 800, INK, 0.0),
         ("talvez não precise se resolver.", 66, 800, BLUE, 1.0)], 3.4),
   ("A PESQUISA", [("Nos estudos de John Gottman,", 52, 400, INK, 0.0),
                   ("69%", 200, 900, BLUE, 0.7),
                   ("dos conflitos dos casais são perpétuos:\nvoltam ao longo de toda a relação.", 50, 400, INK, 1.4)], 5.0),
   ("O QUE MUDA", [("Casais que vão bem não eliminam\nessas diferenças.", 56, 800, INK, 0.0),
                   ("Eles aprendem a conversar sobre elas\nsem se ferir.", 56, 400, INK, 1.2)], 4.2),
   ("PERGUNTE", [("Em vez de “quem está certo?”,", 54, 400, MUTED, 0.0),
                 ("“o que isso significa para você?”", 66, 800, BLUE, 1.0)], 3.8),
  ],
  "legenda": ("Segundo a pesquisa de John Gottman, cerca de 69% dos conflitos de um casal são perpétuos: "
              "nascem de diferenças de personalidade e de valores e voltam ao longo dos anos. "
              "O objetivo não é zerar essas brigas, é conseguir falar delas com curiosidade em vez de ataque.\n\n"
              "Comece pelo diagnóstico gratuito do casal: 23 perguntas, resultado na hora. Depois, o livro Mapa Afetivo. Link na bio.\n\n"
              + AVISO_CAP +
              "\n\n—\n\n"
              "According to John Gottman's research, about 69% of couple conflicts are perpetual. "
              "The goal isn't to end them, but to talk about them with curiosity instead of attack. "
              "Free couple assessment (educational, not a psychological diagnosis): link in bio.\n\n"
              "#casal #relacionamento #gottman #terapiadecasal #psicologia"),
 },
 "aceitacao": {
  "cenas": [
   ("", [("Você está tentando\nmudar quem você ama?", 80, 800, INK, 0.0)], 2.8),
   ("O PARADOXO", [("Quanto mais a gente pressiona\no outro a mudar,", 56, 400, INK, 0.0),
                   ("mais ele se defende\ne fica igual.", 66, 800, BLUE, 1.2)], 4.2),
   ("O QUE AJUDA", [("Entender de onde vem\no jeito do outro.", 58, 800, INK, 0.0),
                    ("Quando a pessoa se sente aceita,\nfica mais fácil mudar.", 52, 400, INK, 1.2),
                    ("Aceitar não é se conformar.", 52, 400, MUTED, 2.4)], 5.0),
   ("PARA HOJE", [("Complete a frase:", 54, 400, INK, 0.0),
                  ("“Ele/ela é assim porque…”", 68, 800, BLUE, 0.8),
                  ("e veja se a raiva muda de tamanho.", 50, 400, MUTED, 1.8)], 4.2),
  ],
  "legenda": ("Na Terapia Comportamental Integrativa de Casal, a aceitação vem junto com a mudança: "
              "quando paramos de transformar cada diferença em batalha, o outro tem espaço para se mexer. "
              "Aceitar não é se conformar com tudo; é entender antes de exigir.\n\n"
              "Comece pelo diagnóstico gratuito do casal: 23 perguntas, resultado na hora. Depois, o livro Mapa Afetivo. Link na bio.\n\n"
              + AVISO_CAP +
              "\n\n—\n\n"
              "In Integrative Behavioral Couple Therapy, acceptance and change go together: "
              "when differences stop being battles, your partner has room to move. Acceptance isn't resignation. "
              "Free couple assessment (educational, not a psychological diagnosis): link in bio.\n\n"
              "#casal #relacionamento #terapiadecasal #ibct #psicologia"),
 },
}

CENA_FINAL = ("PARA VOCÊ", [(CTA, 60, 800, INK, 0.0), (AVISO_IMG, 34, 400, MUTED, 1.0)], 4.5)


def watermark(d):
    f = font(30, 400)
    for row in range(120, H, 480):
        x0 = 40 + (row // 480 % 2) * 300
        for col in range(x0, W, 640):
            d.text((col, row), "@psicologoafetivo", font=f, fill=WM)


def mistura(cor, a):
    """Interpola a cor da linha com o fundo (fade sem canal alfa)."""
    c = tuple(int(cor[i:i + 2], 16) for i in (1, 3, 5))
    b = tuple(int(BG[i:i + 2], 16) for i in (1, 3, 5))
    return tuple(int(b[k] + (c[k] - b[k]) * a) for k in range(3))


def layout(d, linhas):
    """Quebra e mede cada linha; devolve blocos com y inicial, centralizados na área segura."""
    blocos, total = [], 0
    for texto, tam, peso, cor, atraso in linhas:
        f = font(tam, peso)
        ls = wrap(d, texto, f, W - 2 * M)
        lh = int(tam * 1.22)
        alt = sum(lh if l else lh // 2 for l in ls)
        blocos.append([ls, f, lh, cor, atraso, alt]); total += alt + 40
    y = TOPO + max(0, (BASE - TOPO - total) // 2)
    for b in blocos:
        b.append(y); y += b[5] + 40
    return blocos


def frame(base, blocos, t, rotulo, prog):
    im = base.copy(); d = ImageDraw.Draw(im)
    if rotulo:
        d.text((M, TOPO - 110), rotulo, font=font(34, 700), fill=BLUE)
    for ls, f, lh, cor, atraso, alt, y0 in blocos:
        a = min(1.0, max(0.0, (t - atraso) / FADE))
        if a <= 0:
            continue
        a = 1 - (1 - a) ** 3                     # ease-out
        y = y0 + int((1 - a) * 36)
        c = mistura(cor, a)
        for l in ls:
            d.text((M, y), l, font=f, fill=c)
            y += lh if l else lh // 2
    d.rectangle((M, 140, M + int((W - 2 * M) * prog), 146), fill=BLUE)   # barra de progresso
    d.text((M, BASE + 60), "@psicologoafetivo", font=font(30, 400), fill=MUTED)
    return im


def trilha(dur, caminho):
    """Pad suave (acorde Lá maior com tremolo) com fade de entrada e saída."""
    expr = ("0.05*(sin(2*PI*220*t)+0.7*sin(2*PI*277.18*t)+0.6*sin(2*PI*329.63*t)+0.3*sin(2*PI*440*t))"
            "*(0.75+0.25*sin(2*PI*0.25*t))")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi",
                    "-i", f"aevalsrc={expr}:s=44100:d={dur}",
                    "-af", f"lowpass=f=1200,afade=t=in:d=1.5,afade=t=out:st={dur - 2}:d=2",
                    "-c:a", "aac", "-b:a", "128k", caminho], check=True)


LEITURA = 3.2     # palavras por segundo (leitura calma, no celular)
RESPIRO = 1.6     # segundos parados com a cena completa antes de trocar
ESPACO = 0.5      # fator extra no intervalo entre as linhas de uma cena


def com_calma(cena):
    """Espaça as linhas pelo tempo de leitura e garante pausa no fim da cena."""
    rotulo, linhas, dur = cena
    novas, t = [], 0.0
    for texto, tam, peso, cor, _ in linhas:
        novas.append((texto, tam, peso, cor, t))
        t += FADE + len(texto.split()) / LEITURA * ESPACO + 0.4
    ultima = novas[-1]
    fim = ultima[4] + FADE + len(ultima[0].split()) / LEITURA + RESPIRO
    total = max(dur, fim, sum(len(l[0].split()) for l in linhas) / LEITURA + RESPIRO)
    return rotulo, novas, round(total, 1)


def gerar(chave, reel):
    textos = [l[0] for c in reel["cenas"] for l in c[1]] + [reel["legenda"]]
    checar_texto(*textos); checar_aviso(reel["legenda"])
    cenas = [com_calma(c) for c in reel["cenas"] + [CENA_FINAL]]
    dur = sum(c[2] for c in cenas)
    os.makedirs("out/reels", exist_ok=True)
    mp4, aud = f"out/reels/{chave}.mp4", f"out/reels/{chave}_audio.m4a"
    trilha(dur, aud)

    base = Image.new("RGB", (W, H), BG); watermark(ImageDraw.Draw(base))
    enc = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                            "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-i", aud,
                            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
                            "-c:a", "copy", "-shortest", "-movflags", "+faststart", mp4],
                           stdin=subprocess.PIPE)
    decorrido = 0.0
    for rotulo, linhas, d_cena in cenas:
        blocos = layout(ImageDraw.Draw(base), linhas)
        for i in range(int(d_cena * FPS)):
            t = i / FPS
            enc.stdin.write(frame(base, blocos, t, rotulo, (decorrido + t) / dur).tobytes())
        decorrido += d_cena
    enc.stdin.close(); enc.wait(); os.remove(aud)
    with open(f"out/reels/{chave}.txt", "w") as f:
        f.write(reel["legenda"] + "\n")
    return mp4, dur


if __name__ == "__main__":
    for k in (sys.argv[1:] or REELS):
        print(*gerar(k, REELS[k]))
