# Project Context

## Current Status

This repository contains Mccona's personal cosplay/anime convention field-photography portfolio website.

Current production site:

```text
https://mccona.com
https://www.mccona.com
```

Current Git remote:

```text
git@github.com:Mccona/webweb.git
```

Current branch:

```text
main
```

Latest known deployed website-code commit:

```text
4310598 Add subtle portfolio motion effects
```

The site is already deployed on the BaoTa/Nginx server. HTTPS and forced HTTPS are enabled.
Context-only commits may exist after this deployed website-code commit.

## Product Direction

The site is for a non-studio, interest-driven cosplay/convention photographer.

Primary visitor flow:

1. Land on a dark, restrained hero page.
2. Browse example photos quickly on mobile.
3. Check pricing.
4. Check convention booking slots.
5. Jump to contact QR codes and contact via QQ/WeChat.

Current copy:

- Hero title: `搞点场照拍拍`
- Hero subtitle: `不是全职摄影工作室，只是兴趣使然。`
- Gallery title: `例图展示`
- Gallery note: `作品默认宣传，介意请告知。`
- Contact title: `预约联系`
- Contact text: `QQ 453194285 / 微信 Mccoonnaa`
- Footer text: `Mccona / QQ 453194285 / 微信 Mccoonnaa`

Do not reintroduce `tencent://message` links by default. They caused PC/browser external-app prompts such as `xdg-open`. The current preferred behavior is:

```text
预约 / QQ 预约 buttons -> #contact
QQ / WeChat buttons in contact section -> open full-size QR code in lightbox
```

## Implementation

This is intentionally a pure static website:

- Static `index.html`
- Static `assets/styles.css`
- Static `assets/main.js`
- No React
- No Vite
- No package manager
- No build step
- No database
- No backend

Core files:

```text
index.html
assets/styles.css
assets/main.js
README.md
PROJECT_CONTEXT.md
```

Current page sections:

- Full-screen hero
- Fixed navigation
- Masonry-style example photo grid
- Lightbox image preview
- Original-image link inside photo lightbox
- Pricing cards
- Before-shoot notes
- Expandable convention booking slots
- Contact panel with avatar and QR-code buttons
- Footer

Motion effects are intentionally subtle:

- Hero text/header/meta fade in.
- Hero image settles slightly.
- Sections/cards/photos reveal as they enter viewport.
- Gallery hover slightly lifts/highlights images.
- Lightbox has a short entrance animation.
- `prefers-reduced-motion: reduce` is respected.

Cache-busting query strings are used for CSS/JS. Current version:

```text
assets/styles.css?v=20260630-5
assets/main.js?v=20260630-5
```

When changing CSS/JS for production, bump these query strings.

## Content And Assets

### Contact Assets

Committed contact assets:

```text
assets/images/contact/avatar.jpg
assets/images/contact/qq-qr.png
assets/images/contact/wechat-qr.png
```

Source files for these came from ignored local `IMAGE/`:

```text
IMAGE/Icon.jpg
IMAGE/QQ_QR_code.png
IMAGE/Wechat_QR_code.png
```

### Gallery Assets

Committed gallery previews:

```text
assets/images/gallery/shot-001.webp
assets/images/gallery/shot-001-full.webp
...
assets/images/gallery/shot-032.webp
assets/images/gallery/shot-032-full.webp
```

Important exception:

```text
shot-005
```

`shot-005` was removed because the source image was a damaged/duplicate image. Do not re-add it unless the source is intentionally replaced.

Current public gallery count:

```text
31 photos
```

Ignored original folders:

```text
IMAGE/
originals/
```

Rules:

- `IMAGE/` is the local source-photo folder. It is ignored by Git.
- `originals/` is generated/deploy-only and ignored by Git.
- `assets/images/gallery/shot-*.webp` and `shot-*-full.webp` are committed to Git.
- `originals/shot-*.jpg` must be deployed to the server if the "查看原图" links should work.
- Do not commit full-size originals to GitHub.
- Do not use Git LFS for this site unless the deployment workflow is redesigned. Current workflow keeps GitHub light and uploads originals directly to the server.

### Current Local Source Images

`IMAGE/` currently includes the original photo sources plus avatar/QR assets. Four latest additions were processed into:

```text
shot-029
shot-030
shot-031
shot-032
```

## Gallery Generation Workflow

When new source photos are added to `IMAGE/`:

1. Keep `IMAGE/` ignored.
2. Generate one thumbnail and one lightbox preview per photo:
   - `assets/images/gallery/shot-NNN.webp`
   - `assets/images/gallery/shot-NNN-full.webp`
3. Copy the full original into:
   - `originals/shot-NNN.jpg`
4. Add corresponding `<button class="work-thumb"...>` entries in `index.html`.
5. Keep `data-full` pointing at the committed lightbox preview.
6. Keep `data-original` pointing at the deploy-only original:

```html
data-full="assets/images/gallery/shot-NNN-full.webp"
data-original="originals/shot-NNN.jpg"
```

The previous implementation generated the gallery block from the actual files in `assets/images/gallery/`; this is safer than hand-editing a long repeated block.

## Current Schedule

Current convention schedule:

```text
2026.07.25 常熟 CDW
11:00 - 12:00 可约
12:00 - 13:00 可约
13:00 - 14:00 可约
14:00 - 15:00 可约
15:00 - 16:00 可约
16:00 - 17:00 可约

2026.07.26 常熟 CDW
11:00 - 12:00 可约
12:00 - 13:00 可约
13:00 - 14:00 可约
14:00 - 15:00 可约
15:00 - 16:00 可约
16:00 - 17:00 可约
```

The booking cards are expandable. The first day is expanded by default; the second day is collapsed by default.

## Pricing And Notes

Current pricing:

```text
场照
¥ 50 / 四图
¥ 100 / 九图
随抽卡情况附带神秘小特效。

大合成
¥ 88 / 四张
有素材和策划可约。
```

Before-shoot notes:

```text
底片要就给，默认使用百度网盘。
包后期，默认液化磨皮。本人 AI 工具享受者，如介意可以提前沟通。
```

## Local Development

Run local preview:

```bash
cd /home/mccona/Project/GITGIT/WEB
python3 -m http.server 4173
```

Preview:

```text
http://127.0.0.1:4173/
```

Useful checks:

```bash
node --check assets/main.js
git status --short --branch
```

HTML/reference check pattern used previously:

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for k in ("src", "href", "data-full", "data-original", "data-qr"):
            v = d.get(k)
            if v and not v.startswith(("http", "#", "mailto:", "tencent:")):
                self.refs.append(v.split("?")[0])
p = P()
html = Path("index.html").read_text()
p.feed(html)
missing = [r for r in p.refs if not Path(r).exists()]
print("missing", len(missing), missing[:10])
print("thumbs", html.count('class="work-thumb'))
print("tencent", "tencent://" in html)
PY
```

## Deployment

Server:

```text
38.22.235.226
root user
BaoTa site root: /www/wwwroot/www.mccona.com/
```

Do not write server passwords into this repository.

Deployment command shape:

```bash
cd /home/mccona/Project/GITGIT/WEB
rsync -az --delete -e 'ssh -o StrictHostKeyChecking=accept-new' \
  index.html assets originals \
  root@38.22.235.226:/www/wwwroot/www.mccona.com/
```

Then fix ownership/permissions:

```bash
ssh -o StrictHostKeyChecking=accept-new root@38.22.235.226 '
  chown -R www:www /www/wwwroot/www.mccona.com/index.html /www/wwwroot/www.mccona.com/assets /www/wwwroot/www.mccona.com/originals 2>/dev/null || true
  find /www/wwwroot/www.mccona.com/assets /www/wwwroot/www.mccona.com/originals -type d -exec chmod 755 {} \;
  find /www/wwwroot/www.mccona.com/assets /www/wwwroot/www.mccona.com/originals -type f -exec chmod 644 {} \;
'
```

Production verification examples:

```bash
curl -L https://mccona.com | rg -n 'styles.css\?v=|main.js\?v=|搞点场照拍拍'
curl -I 'https://mccona.com/assets/styles.css?v=20260630-5'
curl -I https://mccona.com/assets/images/gallery/shot-032.webp
curl -I https://mccona.com/originals/shot-032.jpg
```

## Git Notes

This workspace uses a local workaround:

```text
.repo-git/
```

It is ignored by Git. Normal clones from GitHub will use a standard `.git`.

Current relevant commits:

```text
4310598 Add subtle portfolio motion effects
7094848 Add latest gallery images and use contact anchors
110f8d1 Fix gallery display and contact QR interactions
de09c5d Use real gallery images and fix portfolio interactions
10d93f3 Refine cosplay portfolio and booking schedule
406a929 Initial photography portfolio site
```

## Known Issues / Future Optimization

- Gallery block in `index.html` is long and repeated. Next optimization could move photo metadata into a small JS array or generated JSON, while still keeping the site static.
- Current QR code buttons use the shared lightbox. This is simple and works, but future UI could use a smaller QR-specific modal.
- Original images are served directly from the Hong Kong server and can be large. If traffic increases, consider:
  - Smaller "original" export size,
  - CDN/object storage,
  - Or disabling original links for public visitors.
- BaoTa/Nginx cache may keep CSS/JS for a while. Bump query-string versions after CSS/JS changes.
- Keep the mobile-first design. Desktop should remain clean but should not drive layout decisions.
- Avoid reintroducing template-like marketing sections.
- Avoid adding frontend frameworks unless content management becomes painful.

## Security / Privacy

Do not commit:

- Server passwords
- BaoTa panel credentials
- SSH private keys
- Domain registrar passwords
- API keys
- Full-size original photos
- Private contact details unless intended to be public on the website
