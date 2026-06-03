import sys
from PIL import Image

for path in sys.argv[1:]:
    im = Image.open(path)
    print("===", path, "===")
    print("mode:", im.mode, "size:", im.size)
    im = im.convert("RGBA")
    corners = [im.getpixel(p) for p in [(0,0),(im.size[0]-1,0),(0,im.size[1]-1),(im.size[0]-1,im.size[1]-1)]]
    print("corners:", corners)
    a = im.split()[-1]
    print("alpha bbox:", a.getbbox(), "alpha min/max:", a.getextrema())
    # threshold trim against corner color, alpha-aware
    from PIL import Image as I
    bg = im.getpixel((0,0))
    px = im.load()
    W,H = im.size
    minx,miny,maxx,maxy = W,H,0,0
    step = 2
    for y in range(0,H,step):
        for x in range(0,W,step):
            r,g,b,al = px[x,y]
            # content if not transparent AND differs from bg
            if al > 20 and (abs(r-bg[0])+abs(g-bg[1])+abs(b-bg[2]) > 40):
                if x<minx:minx=x
                if x>maxx:maxx=x
                if y<miny:miny=y
                if y>maxy:maxy=y
    print("threshold content bbox:", (minx,miny,maxx,maxy))
