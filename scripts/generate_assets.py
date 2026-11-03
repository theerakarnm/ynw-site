#!/usr/bin/env python3
"""Regenerate brand assets (favicons, PWA icons, OG image) from the reference
dot-grid geometry and the self-hosted Geist fonts. Run from the repo root:
  python3 scripts/generate_assets.py
Requires: pillow, fonttools, brotli  (uv pip install pillow fonttools brotli)
Outputs into public/: favicon.svg, favicon.ico, apple-touch-icon.png,
icon-192.png, icon-512.png, icon-512-maskable.png, og.png
"""
from pathlib import Path

from fontTools import ttLib
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "src/assets/fonts"
PUBLIC = ROOT / "public"

BG = "#0b0a0b"
INK = "#090b0f"
BORDER = "#3d3637"
TEXT = "#f4efec"
SECONDARY = "#b9afab"
MUTED = "#948a86"
ACCENT = "#ed662e"
ACCENT_TEXT = "#f59a68"

# Lockup tile: 63x63 rounded square, 6x6 dot grid, r=3.1
GRID_XY = [9.0, 18.2, 27.4, 36.6, 45.8, 55.0]
DOT_R = 3.1
ROWS = [
    ["#30151a", "#30151a", "#eab46c", "#eab46c", "#eab46c", "#30151a"],
    ["#30151a", "#ec9141", "#ec9141", "#30151a", "#ec9141", "#ec9141"],
    ["#30151a", "#ed662e", "#30151a", "#30151a", "#30151a", "#ed662e"],
    ["#ee4821", "#ee4821", "#30151a", "#30151a", "#30151a", "#30151a"],
    ["#eb1515", "#eb1515", "#eb1515", "#eb1515", "#30151a", "#30151a"],
    ["#b01f2c", "#b01f2c", "#b01f2c", "#b01f2c", "#b01f2c", "#b01f2c"],
]

# Canvas wave palette, far -> near
WAVE = ["#30151a", "#eb1515", "#ee4821", "#ed662e", "#ec9141", "#eab46c"]


def font_at(path: Path, wght: int, size: int) -> ImageFont.FreeTypeFont:
    f = ttLib.TTFont(str(path))
    instantiateVariableFont(f, {"wght": wght}, inplace=True)
    f.flavor = None
    tmp = Path("/tmp") / f"{path.stem}-{wght}.ttf"
    f.save(str(tmp))
    return ImageFont.truetype(str(tmp), size)


def draw_tile(draw: ImageDraw.ImageDraw, x: float, y: float, size: float, scale_maskable: float = 1.0) -> None:
    s = size / 63.0
    draw.rounded_rectangle(
        [x, y, x + size, y + size],
        radius=7.5 * s,
        fill=INK,
        outline=BORDER,
        width=max(1, round(1 * s)),
    )
    cx, cy = 32.0, 32.0
    for row, gy in enumerate(GRID_XY):
        for col, gx in enumerate(GRID_XY):
            px = x + (cx + (gx - cx) * scale_maskable) * s
            py = y + (cy + (gy - cy) * scale_maskable) * s
            r = DOT_R * s * scale_maskable
            draw.ellipse([px - r, py - r, px + r, py + r], fill=ROWS[row][col])


def make_icons() -> None:
    PUBLIC.mkdir(exist_ok=True)

    # favicon.svg (tile only)
    circles = []
    for row, gy in enumerate(GRID_XY):
        for col, gx in enumerate(GRID_XY):
            circles.append(f'<circle cx="{gx}" cy="{gy}" r="{DOT_R}" fill="{ROWS[row][col]}"/>')
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63 63">'
        f'<rect x="0.5" y="0.5" width="62" height="62" rx="7.5" fill="{INK}" stroke="{BORDER}"/>'
        + "".join(circles)
        + "</svg>"
    )
    (PUBLIC / "favicon.svg").write_text(svg)

    for out, size, maskable in [
        ("icon-512.png", 512, False),
        ("icon-192.png", 192, False),
        ("icon-512-maskable.png", 512, True),
        ("apple-touch-icon.png", 180, False),
    ]:
        img = Image.new("RGB", (size, size), INK)
        d = ImageDraw.Draw(img)
        scale = 0.62 if maskable else 1.0
        tile = size * (0.94 if not maskable else 1.0)
        offset = (size - tile) / 2
        draw_tile(d, offset, offset, tile, scale_maskable=scale)
        img.save(PUBLIC / out)

    img = Image.new("RGB", (512, 512), INK)
    draw_tile(ImageDraw.Draw(img), 4, 4, 504)
    img.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])


def draw_wave(d: ImageDraw.ImageDraw, w: int, h: int, top: int, pitch: int, dot: int, t: float) -> None:
    import math

    cols = w // pitch + 2
    rows = (h - top) // pitch + 2
    area_h = h - top

    def crest(x: float) -> float:
        y = math.sin(x * 0.0052 - t * 0.9) * 0.55 + math.sin(x * 0.0121 - t * 1.4 + 1.7) * 0.3 + math.sin(x * 0.0243 - t * 2.1 + 0.6) * 0.15
        return area_h * 0.46 - y * area_h * 0.2

    for c in range(cols):
        x = c * pitch + pitch / 2
        cy = crest(x)
        for r in range(rows):
            y = top + r * pitch + pitch / 2
            dist = (y - top) - cy
            if dist < 0:
                idx = math.floor(-dist / (pitch * 0.9))
                if idx > 1:
                    continue
                color = WAVE[1 - idx]
            else:
                idx = math.floor(dist / (pitch * 1.7))
                if idx > 5:
                    continue
                color = WAVE[idx]
            d.rectangle([x - dot / 2, y - dot / 2, x + dot / 2, y + dot / 2], fill=color)


def make_og() -> None:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    sans640 = font_at(FONTS / "geist-latin-wght-normal.woff2", 640, 112)
    sans600 = font_at(FONTS / "geist-latin-wght-normal.woff2", 600, 58)
    sans400 = font_at(FONTS / "geist-latin-wght-normal.woff2", 400, 30)
    mono500 = font_at(FONTS / "geist-mono-latin-wght-normal.woff2", 500, 26)

    draw_tile(d, 80, 72, 84)
    d.text((196, 84), "YNW", font=sans640, fill=TEXT)
    d.text((84, 208), "AGENTIC CHAT - COMING SOON", font=mono500, fill=ACCENT_TEXT)
    d.text((84, 268), "One chat app for your life,", font=sans600, fill=TEXT)
    d.text((84, 340), "your team and your business.", font=sans600, fill=TEXT)
    d.text((84, 428), "Your AI agents plan, use tools and reply for you.", font=sans400, fill=SECONDARY)

    draw_wave(d, W, H, top=500, pitch=14, dot=6, t=2.2)
    img.save(PUBLIC / "og.png")


if __name__ == "__main__":
    make_icons()
    make_og()
    print("assets regenerated in", PUBLIC)
