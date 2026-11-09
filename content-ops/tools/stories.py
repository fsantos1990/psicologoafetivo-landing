import os
from PIL import Image, ImageDraw
from render import font, wrap, BG, INK, BLUE, MUTED, WM, checar_texto

W, H = 1080, 1920
M = 96

def block(d, y, text, f, color, lh):
    for ln in wrap(d, text, f, W - 2 * M):
        d.text((M, y), ln, font=f, fill=color)
        y += lh if ln else lh // 2
    return y

def watermark(d):
    f = font(30, 400)
    for row in range(120, H, 480):
        x0 = 40 + (row // 480 % 2) * 300
        for col in range(x0, W, 640):
            d.text((col, row), "@psicologoafetivo", font=f, fill=WM)

# (data, tema_feed, teaser_pt, teaser_en, label2, pergunta_pt, instrucao_pt, en2)
S = [
 ("2026-11-07", "demanda",
  "Por que seu parceiro se cala quando você cobra?", "Why does your partner shut down when you push?",
  "E NA SUA RELAÇÃO?",
  "Quem costuma cobrar e quem costuma se calar?",
  "Responda este story com “eu cobro” ou “eu me calo”.",
  "Who usually pushes and who usually goes quiet? Reply to this story."),
 ("2026-11-10", "bids",
  "Quando o seu par diz “olha isso”, o que você faz?", "When your partner says “look at this”, what do you do?",
  "COMPARTILHE",
  "Quem para o que está fazendo quando você diz “olha isso”?",
  "Mande o post do feed para essa pessoa.",
  "Who stops what they're doing when you say “look at this”? Send them the post."),
 ("2026-11-12", "ideal",
  "A lista do parceiro ideal prevê pouco da sua satisfação.", "Your ideal-partner checklist predicts little of your satisfaction.",
  "CONTA PRA GENTE",
  "Qual item da sua lista de parceiro ideal você descobriu que não importava?",
  "Responda este story.",
  "Which item on your ideal-partner list turned out not to matter? Reply to this story."),
 ("2026-11-17", "preditores",
  "O que mais prevê a satisfação de um casal?", "What best predicts a couple's satisfaction?",
  "DESAFIO DE HOJE",
  "Agradeça uma ação concreta do seu parceiro e diga o efeito dela.",
  "Exemplo: “Obrigado por buscar as crianças, isso me deu uma hora livre.” Depois, responda este story contando a reação.",
  "Thank your partner for one concrete action and say what it changed for you. Then reply with their reaction."),
 ("2026-11-19", "sternberg",
  "“Virou amizade” não quer dizer que o amor acabou.", "“We became friends” does not mean love is over.",
  "OPINIÃO",
  "Muita intimidade, muito compromisso e pouca paixão: é um casamento bom ou um casamento que acabou?",
  "Responda este story com a sua opinião.",
  "High intimacy and commitment, low passion: a good marriage or one that ended? Reply with your opinion."),
 ("2026-11-24", "curva",
  "A satisfação do casal costuma cair até perto dos 10 anos de relação.", "Couple satisfaction usually drops until around year 10.",
  "COMPARTILHE",
  "Conhece um casal perto dos 10 anos de relação?",
  "Mande o post do feed para eles. A pesquisa mostra que a satisfação costuma voltar a subir depois desse ponto.",
  "Know a couple close to year 10? Send them the post: satisfaction usually rises again after that point."),
 ("2026-11-26", "gottman94",
  "“Pesquisador prevê divórcio com 94% de acerto.” O número tem um problema.", "“Researcher predicts divorce with 94% accuracy.” The number has a problem.",
  "E VOCÊ?",
  "Se um teste dissesse que seu casamento vai acabar, você acreditaria?",
  "Responda este story com “sim” ou “não” e o motivo.",
  "If a test said your marriage would end, would you believe it? Reply with yes or no and why."),
 ("2026-11-14", "pesquisa192",
  "Pesquisei 192 pessoas em relacionamentos. A paixão não explicou a satisfação.", "I studied 192 people in relationships. Passion did not explain satisfaction.",
  "E NA SUA RELAÇÃO?",
  "Vocês ainda contam um ao outro o que aconteceu no dia?",
  "Responda este story com “sim” ou “não”.",
  "Do you still tell each other what happened in your day? Reply with yes or no."),
 ("2026-11-28", "parceiroideal",
  "Seu parceiro é comparado a um modelo que você montou antes de conhecê-lo.", "Your partner is being compared with a model you built before you met.",
  "CONTA PRA GENTE",
  "O item da sua lista que mais gera briga veio de onde?",
  "Responda este story com “filmes”, “família” ou “amigos”.",
  "Where did the list item that causes most of your fights come from? Reply: films, family or friends."),
 ("2026-12-01", "desejo",
  "Se você precisa de clima para ter vontade, o desejo não acabou.", "If you need the right context to feel like it, desire is not gone.",
  "E NA SUA RELAÇÃO?",
  "O que costuma vir antes dos momentos em que a vontade aparece?",
  "Responda este story com uma palavra.",
  "What usually comes before the moments when desire shows up? Reply with one word."),
]

def teaser(t_pt, t_en):
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im); watermark(d)
    d.text((M, 300), "POST NOVO NO FEED · NEW POST", font=font(36, 700), fill=BLUE)
    d.rectangle((M, 366, M + 140, 375), fill=BLUE)
    y = block(d, 560, t_pt, font(92, 900), INK, 110)
    y = block(d, y + 50, t_en, font(44, 400), MUTED, 58)
    d.rectangle((M, H - 460, W - M, H - 300), outline=BLUE, width=4)
    f = font(42, 700)
    d.text((M + 48, H - 420), "Toque no perfil para ler o post", font=f, fill=BLUE)
    d.text((M + 48, H - 360), "Tap the profile to read the post", font=font(34, 400), fill=MUTED)
    d.text((M, H - 200), "@psicologoafetivo", font=font(32, 400), fill=MUTED)
    return im

def expand(label, q, instr, en):
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im); watermark(d)
    d.text((M, 300), label, font=font(36, 700), fill=BLUE)
    d.rectangle((M, 366, M + 140, 375), fill=BLUE)
    y = block(d, 520, q, font(84, 900), INK, 100)
    y += 50
    d.line((M, y, M + 100, y), fill="#C9C1B6", width=4)
    y = block(d, y + 50, instr, font(50, 700), BLUE, 66)
    y = block(d, y + 40, en, font(40, 400), MUTED, 54)
    assert y < H - 260, ("overflow", label, y)
    d.text((M, H - 200), "@psicologoafetivo", font=font(32, 400), fill=MUTED)
    return im

# Lembrete de domingo (15/11, 22/11, 29/11). O diagnóstico mostra o plano na tela; não envia por e-mail.
DOMINGO = ("MAPA AFETIVO", "Faça o seu diagnóstico.",
           "No fim, você destrava um plano de 7 dias para o seu pilar mais baixo.",
           "Free couple assessment, in Portuguese.")

def domingo():
    lab, tit, corpo, en = DOMINGO
    checar_texto(*DOMINGO)
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im); watermark(d)
    d.text((M, 300), lab, font=font(36, 700), fill=BLUE)
    d.rectangle((M, 366, M + 140, 375), fill=BLUE)
    y = block(d, 420, tit, font(110, 900), INK, 124)
    y = block(d, y + 30, corpo, font(52, 400), INK, 70)
    y = block(d, y + 20, en, font(38, 400), MUTED, 52)
    cx, ay = W // 2, y + 120  # seta para baixo, onde entra o link
    d.line((cx, ay, cx, ay + 70), fill=BLUE, width=8)
    d.line((cx - 30, ay + 40, cx, ay + 72), fill=BLUE, width=8)
    d.line((cx + 30, ay + 40, cx, ay + 72), fill=BLUE, width=8)
    f, fb = font(36, 400), font(36, 700)
    x = M
    for t, ff, c in (("Para aprofundar: livro ", f, MUTED), ("Mapa Afetivo", fb, INK), (", R$ 39, link na bio.", f, MUTED)):
        d.text((x, H - 330), t, font=ff, fill=c); x += d.textlength(t, font=ff)
    d.text((M, H - 260), "@psicologoafetivo", font=font(32, 400), fill=MUTED)
    return im

if __name__ == "__main__":
    os.makedirs("stories", exist_ok=True)
    for (dt, key, tpt, ten, lab, q, ins, en) in S:
        checar_texto(tpt, ten, lab, q, ins, en)
        teaser(tpt, ten).save(f"stories/{dt}_{key}_a.png", optimize=True)
        expand(lab, q, ins, en).save(f"stories/{dt}_{key}_b.png", optimize=True)
    domingo().save("stories/domingo_diagnostico_v2.png", optimize=True)
    print(sorted(os.listdir("stories")))
