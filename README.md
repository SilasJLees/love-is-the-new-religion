# Love Is The New Religion — Author Website

Static site for Silas J. Lees's novel *Love Is The New Religion*. Plain HTML/CSS/JS —
no build step, no framework, no dependencies. Every page is a self-contained `.html`
file that links to the shared `assets/css/style.css` and `assets/js/main.js`.

## Structure

```
index.html         Home
the-book.html       The Book (synopsis, praise, editions)
my-story.html       My Story (Silas's personal essay)
buy.html            Buy the Book (region toggle, Amazon links)
press.html          Press & Media Kit
journal.html        Journal / Updates
contact.html        Contact / Newsletter
characters.html     Reserved stub for future character-art page (not linked in nav)
film.html           Reserved stub for future film-development page (not linked in nav)
assets/css/style.css
assets/js/main.js
assets/img/         Web-optimised images used across the site
assets/img/press/   Higher-resolution versions of the same images, for press downloads
```

## Hosting on Hetzner

This is static output — any web server that can serve files works. Two easy options:

**Option A — Caddy (simplest, free HTTPS out of the box)**

```
sudo apt install caddy
sudo mkdir -p /var/www/litnr
sudo cp -r /path/to/this/repo/* /var/www/litnr/
```

`/etc/caddy/Caddyfile`:
```
loveisthenewreligion.com {
    root * /var/www/litnr
    file_server
    try_files {path} /index.html
}
```
`sudo systemctl reload caddy`

**Option B — nginx**

```
sudo mkdir -p /var/www/litnr
sudo cp -r /path/to/this/repo/* /var/www/litnr/
```

`/etc/nginx/sites-available/litnr`:
```
server {
    listen 80;
    server_name loveisthenewreligion.com www.loveisthenewreligion.com;
    root /var/www/litnr;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```
Then `sudo ln -s /etc/nginx/sites-available/litnr /etc/nginx/sites-enabled/`, `sudo nginx -t`,
`sudo systemctl reload nginx`, and use `certbot --nginx` for HTTPS.

Either way: point the domain's DNS A record at the Hetzner server's IP, then deploy by pulling
this repo onto the server (`git clone`/`git pull`) into the web root — no build command needed.

## Wiring up email (newsletter + lead magnet)

No email provider is connected yet. Recommended: **Mailchimp** — generous free tier,
simple embedded-form integration, good for a single lead magnet (the free Introduction +
Chapter One). ConvertKit/Kit is a solid alternative if more author-focused automation
(tagging, sequences) is wanted later.

Once you have an account:
1. Create an audience and an embedded signup form in Mailchimp.
2. Replace the `<form data-signup>` markup on `index.html` and `contact.html` with
   Mailchimp's generated form `action`/fields, or call their API from a small backend.
3. Remove the corresponding no-op handling in `assets/js/main.js` (the `form[data-signup]`
   submit listener currently just shows a local success message and does not send anywhere).
4. Set up the actual delivery of the Introduction + Chapter One PDF (Mailchimp's automation
   can email it automatically on signup).

The contact form on `contact.html` has the same placeholder behaviour and needs the same
kind of wiring (a simple form backend like Formspree, or a small server-side endpoint).

## Outstanding items (flagged inline with `<!-- TODO -->` comments in the HTML)

1. **Praise quotes** — Aleks Mikic's front-matter quote plus all 4 Amazon reviews (Jo
   Lomax, Suzy, Alex, emmacam3) are now live on `index.html`, `the-book.html`, and
   `buy.html`. Only 2 front-matter blurbs are still placeholders — send the exact
   wording and they can be dropped straight in.
2. **My Story page** — built from the arc and verbatim fragments in the outline brief
   (`my-story.html`), not the full manuscript Introduction. If there's a complete essay
   text meant to be used verbatim, send it and it will replace the current draft.
3. **US Amazon ASIN** — `buy.html` US tab is a placeholder. Send the ASIN/link once confirmed.
4. **Signed-copy flow** — `buy.html` has a "coming soon" card; needs a real fulfilment
   link/process once decided.
5. **Press kit real files** — Author Bio and Sample Q&A are now drafted (see
   `assets/img/press/author-bio.txt` and `sample-qa.txt`) — both are marked DRAFT and
   need Silas's review/edit before use with press. The Book One-Sheet PDF still needs
   to be produced; its download tile on `press.html` still points at a placeholder file.
6. **Press "in-action" photo** — currently reusing a Story-page-style photo as a stand-in.
7. **Character art** — referenced by the reserved `/characters` page; not yet supplied.
8. **Journal content** — three post titles exist, all marked "Coming soon."
9. **Newsletter/contact email provider** — see "Wiring up email" above.
10. **Social links** — footer has a placeholder; add real profile links once active on any platform.

## Image assets

`assets/img/` holds web-sized copies (resized/compressed) of the logo, book cover, and
author photography supplied for the build. `assets/img/press/` holds larger versions of
the same files for press downloads. Original full-resolution files aren't stored in this
repo — ask Silas directly if a higher resolution than what's in `press/` is ever needed
(e.g. true print-resolution cover art for a physical one-sheet).
