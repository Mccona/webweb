# Project Context

## Purpose

This repository contains the first version of a personal photography portfolio website. The site is meant to present:

- Photographer identity
- Selected photography works
- Upcoming exhibition information
- Same-day event schedule
- Contact entry point

The current visual direction is dark, restrained, premium, and slightly technological, without using a generic template-site look.

## Current Implementation

The site is intentionally simple:

- Static HTML/CSS/JavaScript
- No frontend framework
- No package manager
- No build pipeline
- No database
- No backend

Core files:

- `index.html`: page content and sections
- `assets/styles.css`: layout, typography, responsive design, visual system
- `assets/main.js`: small scroll behavior for the fixed header
- `assets/images/`: image assets

The page currently includes:

- Full-screen hero section
- Fixed navigation
- Contact button
- Photo grid
- Schedule/timeline section
- Footer contact link

## Local Development

Run a local static server:

```bash
python3 -m http.server 4173
```

Preview:

```text
http://127.0.0.1:4173/
```

Directly opening `index.html` in a browser may work, but using a local server is closer to real deployment.

## Deployment Notes

The domain is:

```text
mccona.com
www.mccona.com
```

DNS should contain:

```text
A    @      <server_public_ip>
A    www    <server_public_ip>
```

BaoTa site root currently expected:

```text
/www/wwwroot/www.mccona.com/
```

Upload only the website files to the site root:

```text
index.html
assets/
```

Do not upload the parent `WEB/` directory as an extra nested folder. The server should not look like:

```text
/www/wwwroot/www.mccona.com/WEB/index.html
```

After HTTP works, configure Let's Encrypt SSL in BaoTa and enable forced HTTPS.

## Content To Replace Later

Current images are generated placeholders. Replace them with real photography works when available:

- `assets/images/hero.webp`
- `assets/images/work-street.webp`
- `assets/images/work-architecture.webp`
- `assets/images/work-gallery.webp`

The `.png` versions are retained as source/reference copies. The site currently references `.webp` files for lighter loading.

Text placeholders to update:

- `YOUR NAME`
- `hello@example.com`
- Hero headline and description
- Exhibition date and city
- Schedule items
- Work titles and captions

## Design Rules For Future Iterations

- Keep the site dark, restrained, and image-led.
- Avoid generic template sections and decorative filler.
- Use real photography as the main visual material.
- Keep pages fast: prefer WebP/AVIF and avoid uploading full camera originals.
- Keep the first version static unless content management becomes painful.
- If a framework is introduced later, document the reason and update this file.

## Security And Privacy

Do not commit:

- Server passwords
- BaoTa panel credentials
- SSH private keys
- Domain registrar passwords
- API keys
- Private contact details unless intended to be public on the website

