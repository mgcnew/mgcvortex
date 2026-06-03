import sys
from PIL import Image

def content_bbox(im):
    px = im.load()
    W, H = im.size
    minx, miny, maxx, maxy = W, H, 0, 0
    found = False
    for y in range(H):
        for x in range(W):
            r, g, b, a = px[x, y]
            # real content = visible enough AND not pure noise
            if a > 32:
                found = True
                if x < minx: minx = x
                if x > maxx: maxx = x
                if y < miny: miny = y
                if y > maxy: maxy = y
    if not found:
        return None
    return (minx, miny, maxx + 1, maxy + 1)

def process(src, dst):
    im = Image.open(src).convert("RGBA")
    orig = im.size
    bbox = content_bbox(im)
    if bbox:
        pad = 12
        x0 = max(0, bbox[0] - pad); y0 = max(0, bbox[1] - pad)
        x1 = min(orig[0], bbox[2] + pad); y1 = min(orig[1], bbox[3] + pad)
        im = im.crop((x0, y0, x1, y1))
    # downscale if very wide (keep crisp but lighter)
    maxw = 900
    if im.size[0] > maxw:
        ratio = maxw / im.size[0]
        im = im.resize((maxw, round(im.size[1] * ratio)), Image.LANCZOS)
    im.save(dst, optimize=True)
    print(f"{dst}: {orig} -> {im.size}")

process("public/logo-dark.orig.png", "public/logo-dark.png")
process("public/logo-light.orig.png", "public/logo-light.png")
