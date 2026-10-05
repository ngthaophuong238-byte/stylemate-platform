"""
Builds the STYLEMATE Fit Studio avatar layers.

Every output PNG uses the SAME canvas (373 x 568, the native art size of the
reference model), so all layers can be stacked with identical x/y/width/height
inside the avatar SVG stage (see src/avatar/avatarCanvas.ts).

Outputs (public/models/avatar/):
  base.png            full body, transparent background
  arms.png            forearms + hands only (drawn ABOVE skirts/trousers)
  hair/<shade>.png    recoloured hair-only layer for each of the 13 shades

Usage: python3 scripts/build_avatar_layers.py <reference_model.png>
"""
import os
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1] if len(sys.argv) > 1 else 'public/models/source_model.png'
OUT = 'public/models/avatar'
os.makedirs(f'{OUT}/hair', exist_ok=True)

img = Image.open(SRC).convert('RGB')
arr = np.array(img).astype(np.float32)
h, w, _ = arr.shape
R, G, B = arr[..., 0], arr[..., 1], arr[..., 2]
yy, xx = np.indices((h, w))

# ---------- 1. background (flood fill from borders) ----------
is_bg = np.zeros((h, w), bool)
q = deque()
seen = np.zeros((h, w), bool)
for x in range(w):
    q.extend([(0, x), (h - 1, x)])
for y in range(h):
    q.extend([(y, 0), (y, w - 1)])
for y, x in q:
    seen[y, x] = True
while q:
    cy, cx = q.popleft()
    r, g, b = arr[cy, cx]
    if r >= 246 and g >= 245 and b >= 245:
        is_bg[cy, cx] = True
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx))

# soft edge: pixels touching the background fade by lightness
fg = ~is_bg
edge = fg & (np.array(Image.fromarray((is_bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 0)
alpha = np.where(fg, 255.0, 0.0)
min_rgb = np.minimum(R, np.minimum(G, B))
alpha[edge] = np.clip((255 - min_rgb[edge]) * 9, 60, 255)
alpha[yy >= 560] = 0  # strip the bottom scan-line artefact
# Remove white background trapped between the legs
between_legs = (yy > 290) & (yy < 515) & (xx > 174) & (xx < 198) & (R > 240) & (G > 240) & (B > 240)
alpha[between_legs] = 0


def save(mask_alpha, rgb, path):
    out = np.zeros((h, w, 4), np.uint8)
    out[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    out[..., 3] = np.clip(mask_alpha, 0, 255).astype(np.uint8)
    Image.fromarray(out).save(path, optimize=True)


save(alpha, arr, f'{OUT}/base.png')

# ---------- 2. hands layer (hands + wrists only, drawn ABOVE bag handle) ----------
skin = (R > 180) & (R - B >= 4) & ~((R > 235) & (G > 235) & (B > 235)) & fg
hands = np.zeros((h, w), bool)
# Left hand (holds bag): y between 260 and 315, x between 112 and 138
hands[(yy >= 260) & (yy <= 315) & (xx >= 112) & (xx <= 138) & skin] = True
# Right hand: y between 260 and 315, x between 235 and 255 & skin
hands[(yy >= 260) & (yy <= 315) & (xx >= 235) & (xx <= 255) & skin] = True

hands_alpha = np.where(hands, alpha, 0)
# soft top fade at wrist
fade_top = np.clip((yy - 260.0) / 4.0, 0.0, 1.0)
hands_alpha *= fade_top
hands_alpha = np.array(Image.fromarray(hands_alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.5))).astype(np.float32)
hands_alpha[~(hands | (np.array(Image.fromarray((hands * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 0))] = 0
hands_alpha[:, 138:235] = 0  # strictly exclude any pelvis/torso/shorts
save(hands_alpha, arr, f'{OUT}/arms.png')

# ---------- 3. hair mask ----------
lum = 0.299 * R + 0.587 * G + 0.114 * B
body_core = np.zeros((h, w), bool)
body_core[145:231, 152:223] = True   # camisole / chest
body_core[205:313, 140:235] = True   # waist / shorts
body_core[313:, :] = True            # legs & feet
chest_skin = (yy >= 115) & (yy < 148) & (xx >= 158) & (xx <= 214)
sunglasses = (yy < 42) & (xx >= 155) & (xx <= 218) & (R < 80) & (G < 80) & (B < 80)

hair = fg & (yy <= 272) & (min_rgb > 70) & (lum < 251) & (R - B <= 6) & ~body_core & ~chest_skin & ~sunglasses
# thin front strands that fall over the chest/cami edges (strongly cool pixels only)
front = fg & (yy >= 95) & (yy <= 200) & (((xx >= 148) & (xx <= 160)) | ((xx >= 212) & (xx <= 224))) & (R - B <= -8)
hair |= front

# soft weight: very light strand highlights get partial recolour
hair_w = np.where(hair, 1.0, 0.0)
light_hair = fg & ~hair & (yy <= 272) & ~body_core & ~chest_skin & ~sunglasses & (R - B <= 3) & (lum >= 251) & (lum < 254)
hair_w[light_hair] = 0.45

SHADES = [
    ('ice-blue-silver', (220, 231, 245), 'light'),
    ('platinum-blonde', (250, 238, 205), 'light'),
    ('chestnut-brown', (139, 90, 62), 'mid'),
    ('midnight-raven', (45, 50, 66), 'dark'),
    ('cherry-wine', (142, 42, 67), 'mid'),
    ('lilac-mist', (196, 181, 253), 'light'),
    ('strawberry-milk', (251, 200, 225), 'light'),
    ('soft-pink', (244, 114, 182), 'mid'),
    ('rose-brown', (156, 107, 102), 'mid'),
    ('honey-blonde', (236, 160, 50), 'mid'),
    ('lavender', (167, 139, 250), 'mid'),
    ('ash-gray', (148, 163, 184), 'mid'),
    ('black', (32, 30, 34), 'dark'),
]

norm = lum / 215.0
for sid, rgb, tone in SHADES:
    c = np.array(rgb, np.float32)
    if tone == 'dark':
        k = 0.55 + 0.75 * norm
    elif tone == 'light':
        k = 0.62 + 0.42 * norm
    else:
        k = 0.38 + 0.82 * norm
    col = np.clip(c[None, None, :] * k[..., None], 0, 255)
    if sid == 'ice-blue-silver':
        col = arr.copy()  # original artwork colour
    a_out = np.where(hair_w > 0, alpha * hair_w, 0)
    save(a_out, col, f'{OUT}/hair/{sid}.png')

print('avatar layers written to', OUT)
