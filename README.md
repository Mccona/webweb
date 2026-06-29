# Photography Portfolio

Personal photography portfolio website for `mccona.com`.

This is currently a pure static website: no React, no Vite, no database, and no build step. It can be deployed by copying `index.html` and `assets/` to the website root directory on the server.

## Local Preview

From this directory:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Project Structure

```text
.
├── index.html
├── assets/
│   ├── styles.css
│   ├── main.js
│   └── images/
└── PROJECT_CONTEXT.md
```

## Deployment

Upload these items to the BaoTa website root:

```text
index.html
assets/
```

Expected server path:

```text
/www/wwwroot/www.mccona.com/
```

The deployed structure should be:

```text
/www/wwwroot/www.mccona.com/index.html
/www/wwwroot/www.mccona.com/assets/styles.css
/www/wwwroot/www.mccona.com/assets/main.js
/www/wwwroot/www.mccona.com/assets/images/
```

