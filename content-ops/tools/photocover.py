# Capa com foto (ensaio Andreia Moura Fotografia) para carrosséis já agendados
from PIL import Image, ImageDraw, ImageOps
from render import font, wrap, BG, INK, BLUE, MUTED, W, H, M

def photo_cover(photo, pillar, title, en, idx_total, focus_y=0.35, credit="Foto: Andreia Moura Fotografia"):
    ph = ImageOps.exif_transpose(Image.open(photo)).convert("RGB")
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im, "RGBA")
    ft = font(70, 900); fe = font(36, 400)
    tl = wrap(d, title, ft, W - 2 * M); el = wrap(d, en, fe, W - 2 * M)
    block_h = 60 + 46 + len(tl) * 84 + 24 + len(el) * 48 + 150
    top = H - block_h
    im.paste(ImageOps.fit(ph, (W, top + 60), centering=(0.5, focus_y)), (0, 0))
    d = ImageDraw.Draw(im, "RGBA")
    r, g, b = Image.new("RGB", (1, 1), BG).getpixel((0, 0))
    grad = 90
    for i in range(grad):
        d.rectangle((0, top - grad + i, W, top - grad + i + 1), fill=(r, g, b, int(255 * i / grad)))
    d.rectangle((0, top, W, H), fill=(r, g, b, 255))
    y = top + 10
    d.text((M, y), pillar, font=font(30, 700), fill=BLUE); y += 46
    d.rectangle((M, y, M + 120, y + 7), fill=BLUE); y += 34
    for ln in tl: d.text((M, y), ln, font=ft, fill=INK); y += 84
    y += 24
    for ln in el: d.text((M, y), ln, font=fe, fill=MUTED); y += 48
    f = font(28, 400)
    d.text((M, H - 92), "@psicologoafetivo", font=f, fill=MUTED)
    d.text((W - M - d.textlength(idx_total, font=f), H - 92), idx_total, font=f, fill=MUTED)
    sw = "Arraste / Swipe  →"; fs = font(30, 700)
    d.text((W - M - d.textlength(sw, font=fs), top + 10), sw, font=fs, fill=BLUE)
    fc = font(22, 400); tw = d.textlength(credit, font=fc)
    d.rounded_rectangle((24, 24, 24 + tw + 20, 24 + 38), 8, fill=(0, 0, 0, 110))
    d.text((34, 31), credit, font=fc, fill=(255, 255, 255))
    return im
