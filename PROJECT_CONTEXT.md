# Project Context

## Purpose

This repository contains a personal photography portfolio website for Mccona, a cosplay/anime convention field photographer. The site is meant to present:

- Photographer identity
- Selected cosplay convention photos
- Pricing
- Before-shoot notes
- Upcoming convention attendance
- Available booking slots during conventions
- Contact entry point

The current visual direction is dark, restrained, premium, and slightly technological, without using a generic template-site look. Mobile access is the priority.

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
- Thumbnail-based photo grid
- Lightbox preview with original-image link
- Pricing section
- Before-shoot notes
- Convention schedule cards
- Expandable booking slots
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

- `assets/images/cosplay-hero.webp`
- `assets/images/cosplay-portrait.webp`
- `assets/images/cosplay-hall.webp`
- `assets/images/cosplay-detail.webp`

The `.png` versions are retained as temporary original-image targets. The site references `.webp` files for faster thumbnail and hero loading.

Text placeholders to update:

- QQ contact link if the number changes
- WeChat contact if the ID changes
- Convention names, dates, cities, and venues
- Booking slots and slot status

Current contact text:

- QQ: `453194285`
- WeChat: `Mccoonnaa`

Current convention schedule:

- `2026.07.25` 常熟 CDW, slots from `11:00 - 17:00` by hour
- `2026.07.26` 常熟 CDW, slots from `11:00 - 17:00` by hour

## Design Rules For Future Iterations

- Keep the site dark, restrained, and image-led.
- Avoid generic template sections and decorative filler.
- Use real photography as the main visual material.
- Keep mobile browsing dense and fast because most visitors will open it on phones.
- Avoid putting captions under every photo; the current direction is visual-first thumbnails.
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
