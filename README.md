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

**Newsletter signup is live.** Both signup forms (`index.html` hero, and `contact.html`
"Join the Newsletter") post directly to Silas's Mailchimp audience via the
`mailchimp_form()` helper in `build_site.py` — real submissions land in Mailchimp now.

Still to do in Mailchimp itself:
1. Set up an automation so the free Introduction + Chapter One PDF is emailed
   automatically on signup (Mailchimp: Automations → a "welcome new subscribers"
   journey with the PDF attached or linked).
2. Style the confirmation/thank-you page Mailchimp shows after signup (it opens in a
   new tab by default — cosmetic only, doesn't need to match the site exactly).

The separate contact **message** form on `contact.html` (name/email/message, for direct
enquiries — not the newsletter) is still a placeholder with no backend. Wire it up with
a simple form backend like Formspree, or a small server-side endpoint, then remove the
no-op handling in `assets/js/main.js` (the `form[data-signup]` submit listener).

## Outstanding items (flagged inline with `<!-- TODO -->` comments in the HTML)

1. ~~**Praise quotes**~~ — Done. All 8 real quotes are live: 4 front-matter blurbs
   (Aleks Mikic, Suzy El-Shazly, Craig Gravil, Dawattie Basdeo) in full on
   `the-book.html` (short pulls on `index.html`/`buy.html`), plus 4 verified Amazon
   reviews (Jo Lomax, Suzy, Alex, emmacam3) under "What Readers Are Saying." No
   placeholder quotes remain.
2. **My Story page** — built from the arc and verbatim fragments in the outline brief
   (`my-story.html`), not the full manuscript Introduction. If there's a complete essay
   text meant to be used verbatim, send it and it will replace the current draft.
3. **US Amazon ASIN** — `buy.html` US tab is a placeholder. Send the ASIN/link once confirmed.
   UK Kindle and paperback links are both live (see item 8 in chat history — 29 Aug).
4. **Signed-copy flow** — `buy.html` has a "coming soon" card; needs a real fulfilment
   link/process once decided.
5. **Press kit real files** — ~~Author Bio~~ is finalized and live (no draft marker) at
   `assets/img/press/author-bio.txt`. Sample Q&A is still drafted and marked DRAFT in
   `assets/img/press/sample-qa.txt` — needs Silas's review/edit before use with press.
   The Book One-Sheet PDF still needs to be produced; its download tile on `press.html`
   still points at a placeholder file.
6. ~~**Press "in-action" photo**~~ — Confirmed fine to use; the photo of Silas reading
   the book is now the official press headshot, no longer flagged as a stand-in.
7. **Character art** — referenced by the reserved `/characters` page; not yet supplied.
8. **Journal content** — three post titles exist, all marked "Coming soon."
9. ~~**Newsletter email provider**~~ — Done, Mailchimp is live (see "Wiring up email"
   above). The `love@loveisthenewreligion.com` mailbox itself is a separate, still-open
   item — needs a mail host chosen and set up (see chat history, 29 Aug) before Spark/iPhone
   can be configured. The contact **message** form (separate from the newsletter) still
   needs its own backend.
10. **Social links** — footer has a placeholder; add real profile links once active on any platform.

## Image assets

`assets/img/` holds web-sized copies (resized/compressed) of the logo, book cover, and
author photography supplied for the build. `assets/img/press/` holds larger versions of
the same files for press downloads. Original full-resolution files aren't stored in this
repo — ask Silas directly if a higher resolution than what's in `press/` is ever needed
(e.g. true print-resolution cover art for a physical one-sheet).
