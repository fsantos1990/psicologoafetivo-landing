import os
from PIL import Image, ImageDraw, ImageFont


W, H = 1080, 1350
BG = "#F7F2EC"; INK = "#1E1E1E"; BLUE = "#235FAA"; MUTED = "#6B6B6B"; WM = "#EDE8E2"
FONT = "Outfit.ttf"
M = 96  # margem lateral

def font(size, weight):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_axes([weight])
    return f

def wrap(draw, text, f, width):
    lines = []
    for para in text.split("\n"):
        if not para.strip():
            lines.append(""); continue
        cur = ""
        for w in para.split(" "):
            t = (cur + " " + w).strip()
            if draw.textlength(t, font=f) <= width:
                cur = t
            else:
                lines.append(cur); cur = w
        lines.append(cur)
    return lines

def block(draw, y, text, f, color, lh, width=W - 2 * M):
    for ln in wrap(draw, text, f, width):
        draw.text((M, y), ln, font=f, fill=color)
        y += lh if ln else lh // 2
    return y

def watermark(draw):
    f = font(30, 400)
    for row in range(60, H, 420):
        x0 = 40 + (row // 420 % 2) * 300
        for col in range(x0, W, 640):
            draw.text((col, row + 40), "@psicologoafetivo", font=f, fill=WM)

def footer(draw, idx, total):
    f = font(28, 400)
    draw.text((M, H - 92), "@psicologoafetivo", font=f, fill=MUTED)
    t = f"{idx}/{total}"
    draw.text((W - M - draw.textlength(t, font=f), H - 92), t, font=f, fill=MUTED)

# Chamado padrão do último slide. A comunicação não oferece mais supervisão para terapeutas (decisão de 09/11/2026).
CTA_PADRAO = "Diagnóstico gratuito do casal: 23 perguntas, resultado na hora.\nLink na bio."
PROIBIDO = ("supervis",)

def checar_texto(*textos):
    """Recusa gerar peças que voltem a citar temas fora do foco atual (ex.: supervisão)."""
    t = " ".join(str(x) for x in textos if x).lower()
    for p in PROIBIDO:
        if p in t:
            raise ValueError(f"Texto contém '{p}', que saiu da comunicação. Revise o post antes de gerar.")

def render(key, post):
    os.makedirs("out", exist_ok=True)
    slides = post["slides"]; n = len(slides)
    checar_texto(post.get("caption"), post.get("refs"), *[x for s in slides for x in s])
    files = []
    for i, (tag, title, body, en) in enumerate(slides, 1):
        im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
        watermark(d)
        if tag == "cover":
            d.text((M, 150), post["pillar"], font=font(32, 700), fill=BLUE)
            d.rectangle((M, 210, M + 120, 218), fill=BLUE)
            y = 380
            y = block(d, y, title, font(84, 900), INK, 100)
            y += 40
            if body:
                y = block(d, y, body, font(48, 400), INK, 64) + 30
            block(d, y, en, font(40, 400), MUTED, 54)
            d.text((M, H - 180), "Arraste / Swipe  →", font=font(34, 700), fill=BLUE)
        elif tag == "cta":
            d.text((M, 150), "PARA VOCÊ · FOR YOU", font=font(32, 700), fill=BLUE)
            d.rectangle((M, 210, M + 120, 218), fill=BLUE)
            # body: "texto principal" ou "texto principal\n\nchamado"; sem chamado, usa CTA_PADRAO
            principal, _, chamado = body.partition("\n\n")
            y = block(d, 290, principal, font(46, 700), INK, 60)
            y += 20
            y = block(d, y, en, font(34, 400), MUTED, 46)
            y += 44
            d.line((M, y, M + 80, y), fill="#C9C1B6", width=3)
            y = block(d, y + 32, chamado or CTA_PADRAO, font(34, 700), BLUE, 48)
            assert y < H - 280, ("overflow", y)
            d.line((M, H - 270, W - M, H - 270), fill="#D9D2C8", width=2)
            block(d, H - 240, "Fontes: " + post["refs"], font(26, 400), MUTED, 36)
        else:
            d.text((M, 150), tag, font=font(32, 700), fill=BLUE)
            d.rectangle((M, 210, M + 120, 218), fill=BLUE)
            y = 300
            if title:
                y = block(d, y, title, font(110, 900), BLUE, 124) + 30
            y = block(d, y, body, font(50, 400), INK, 68)
            y += 50
            d.line((M, y, M + 80, y), fill="#C9C1B6", width=3)
            block(d, y + 36, en, font(36, 400), MUTED, 50)
        footer(d, i, n)
        p = f"out/{key}_{i}.png"; im.save(p, optimize=True); files.append(p)
    return files

if __name__ == "__main__":
    from content import POSTS
    for k, p in POSTS.items():
        print(render(k, p))
