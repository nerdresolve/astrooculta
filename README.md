<div align="center">

<img src="docs/brand/banner.svg" alt="Astro Oculta: personality quiz with astrology and numerology" width="100%">

A personality quiz that never asks for your date of birth.
Nine numerology questions, and at the end the sign that matches your choices.

[![License](https://img.shields.io/badge/license-all%20rights%20reserved-c9a86c)](LICENSE.md) ![Tests](https://img.shields.io/badge/tests-22%20passing-b393c6) ![Stack](https://img.shields.io/badge/Next.js%2015-React%2019-08050a) ![Routes](https://img.shields.io/badge/routes-19%20static-241228)

**[Visit the site](https://astrooculta.nerdresolve.com)** · [The screens](#the-screens) · [How it works](#how-the-quiz-works) · [Running it](#running-it) · [License](#license)

</div>

---

## What it is

A complete astrology, numerology and tarot site, built for a tarot reader. At
its center is a **personality quiz**: nine questions, one per numerological
vibration, with twelve options each. Every option belongs to a sign, and the
visitor never sees which one.

The result gives the dominant sign, the percentage for each of the twelve and
a written reading. No login, no sign-up, no database: the result travels in
the URL and the link can be shared.

<div align="center">
<img src="docs/telas/04-resultado-desktop.webp" alt="Quiz result screen" width="88%">
</div>

---

## How the quiz works

The visitor never sees which sign an option belongs to. They pick by the text,
and the tally does the rest.

```
9 questions × 12 options = 108 texts
     │
     ├─ each option belongs to a sign (hidden)
     ├─ each question comes from a numerological vibration (1 to 9)
     │
     ▼
dominant sign · percentages for all twelve · ruling vibration
```

### Three decisions worth writing down

**The percentages add up to exactly 100.** Rounding each part on its own
doesn't balance the books: nine answers split across nine signs would give
11% × 9 = 99%. The tally uses the largest remainder method, and there's a test
for it.

**The options are shuffled with a fixed seed.** They start out in zodiacal
order, and showing them that way would give the game away: the first option
would always be Aries. Shuffling with `Math.random()` would break hydration,
because server and client would draw different orders. The seed is the
question's index.

**The ruling vibration comes out of the tally**, not from an arbitrary number:
it is the sum of the questions where the dominant sign was chosen, reduced to
a single digit (45 → 9). It is the theosophical reduction actually used in
numerology.

---

## The screens

Two themes: **cosmic** (dark, the brand default) and **lunar** (light). The
choice lives in `localStorage` and is applied by a synchronous script in the
`<head>`, before the first paint, so the page doesn't flash.

<table>
<tr>
<td width="50%"><a href="docs/telas/01-home-desktop.webp" title="see the full page"><img src="docs/telas/01-home-desktop-card.webp" alt="Home in the dark theme"></a><br><sub><b>Home</b> · cosmic theme, the brand default</sub></td>
<td width="50%"><a href="docs/telas/02-home-claro-desktop.webp" title="see the full page"><img src="docs/telas/02-home-claro-desktop-card.webp" alt="Home in the light theme"></a><br><sub><b>Home</b> · lunar theme, the same screen</sub></td>
</tr>
<tr>
<td><a href="docs/telas/03-quiz-desktop.webp" title="see the full page"><img src="docs/telas/03-quiz-desktop-card.webp" alt="Quiz opening screen"></a><br><sub><b>Quiz</b> · the name is optional</sub></td>
<td><a href="docs/telas/04-resultado-desktop.webp" title="see the full page"><img src="docs/telas/04-resultado-desktop-card.webp" alt="Quiz result"></a><br><sub><b>Result</b> · percentages that add up to 100</sub></td>
</tr>
<tr>
<td><a href="docs/telas/05-signos-desktop.webp" title="see the full page"><img src="docs/telas/05-signos-desktop-card.webp" alt="Catalogue of the twelve signs"></a><br><sub><b>Signs</b> · all twelve, filterable by element</sub></td>
<td><a href="docs/telas/06-signo-desktop.webp" title="see the full page"><img src="docs/telas/06-signo-desktop-card.webp" alt="Single sign page"></a><br><sub><b>Sign</b> · twelve routes generated at build time</sub></td>
</tr>
<tr>
<td><a href="docs/telas/07-numerologia-desktop.webp" title="see the full page"><img src="docs/telas/07-numerologia-desktop-card.webp" alt="Numerology page"></a><br><sub><b>Numerology</b> · the nine vibrations</sub></td>
<td><a href="docs/telas/08-sobre-desktop.webp" title="see the full page"><img src="docs/telas/08-sobre-desktop-card.webp" alt="About page"></a><br><sub><b>About</b> · lunar theme</sub></td>
</tr>
<tr>
<td><a href="docs/telas/09-blog-desktop.webp" title="see the full page"><img src="docs/telas/09-blog-desktop-card.webp" alt="Blog listing"></a><br><sub><b>Blog</b> · listing of the posts</sub></td>
<td><a href="docs/telas/10-contato-desktop.webp" title="see the full page"><img src="docs/telas/10-contato-desktop-card.webp" alt="Contact page"></a><br><sub><b>Contact</b> · validated form</sub></td>
</tr>
</table>

### On mobile

<table>
<tr>
<td width="25%"><a href="docs/telas/01-home-mobile.webp" title="see the full page"><img src="docs/telas/01-home-mobile-card.webp" alt="Home on mobile"></a><br><sub><b>Home</b></sub></td>
<td width="25%"><a href="docs/telas/03-quiz-mobile.webp" title="see the full page"><img src="docs/telas/03-quiz-mobile-card.webp" alt="Quiz on mobile"></a><br><sub><b>Quiz</b></sub></td>
<td width="25%"><a href="docs/telas/04-resultado-mobile.webp" title="see the full page"><img src="docs/telas/04-resultado-mobile-card.webp" alt="Result on mobile"></a><br><sub><b>Result</b></sub></td>
<td width="25%"><a href="docs/telas/05-signos-mobile.webp" title="see the full page"><img src="docs/telas/05-signos-mobile-card.webp" alt="Signs on mobile"></a><br><sub><b>Signs</b></sub></td>
</tr>
</table>

> These aren't mockups: it's the site running. `npm run shots` opens every
> route in Chromium, at 1440×900 and 390×844, and saves two versions: the full
> page and this crop of the top, all at the same aspect ratio so the grid
> doesn't open up holes. **Click any image** to see the full page.

---

## Under the hood

```
apps/frontend/
  src/
    app/                    routes (App Router). Each page is a thin page.tsx
      quiz/resultado/       result read from the URL, shareable
      signos/[sign]/        twelve routes generated at build time
      api/health/           probe for the compose healthcheck
    components/
      ds/                   design system ported to TypeScript (24 components)
      brand/                logo and brand artwork
    content/                signs, vibrations, questions, site copy
    features/               one folder per screen: view + css
    lib/quiz/               quiz tally: pure logic, tested
    styles/astro-oculta-ds/ design system, faithful copy (do not edit)
infra/                      Dockerfile, compose, Caddyfile
docs/telas/                 the screenshots in this README
```

The pages in `app/` only delegate; the screen itself lives in
`features/*-view.tsx`. Anything interactive (`"use client"`) is confined to
the quiz, the sign filter, the contact form and the frame. Everything else is
a server component.

### Architecture choices

| Decision | Why |
|---|---|
| **No database** | The result travels in the URL. Nothing is stored, so nothing needs protecting. |
| **No Tailwind** | The design system is plain CSS with tokens as custom properties. Tailwind would fight it. |
| **Caddy, not nginx** | Automatic HTTPS through built-in ACME (no certbot, no cron) and a ~40-line Caddyfile where `nginx.conf` would run past 100. |
| **Cloudflare tunnel** | The connection goes out from the machine to the edge: no public IP, no open port, no certificate to manage. |
| **`next/font`** | Fonts arrive preloaded and without layout shift, instead of Google Fonts' `@import`, which blocks the first paint. |

---

## Running it

```bash
npm install
npm run dev            # http://localhost:3000
```

Quality gates, all offline:

```bash
npm run verify         # typecheck + 22 tests + lint
```

### With Docker

`up` brings the app up behind **Caddy**, which terminates HTTP/HTTPS.

```bash
cp infra/.env.local.example infra/.env.local   # once
npm run up                                     # http://localhost:8080
npm run logs
npm run down
```

In production, on a server exposed to the internet:

```bash
cp infra/.env.example infra/.env               # fill in the domain
npm run up:prod                                # ports 80/443, automatic HTTPS
```

### Publishing over a Cloudflare tunnel

No public IP, no open port. Requires `infra/.env.tunnel` with the tunnel
token. The file stays out of Git.

```bash
cp infra/.env.tunnel.example infra/.env.tunnel  # paste the TUNNEL_TOKEN
npm run publish                                 # app + Caddy + tunnel
npm run publish:logs
```

The tunnel sits behind a Compose **profile**: `npm run up` doesn't start it.
Publishing is always an explicit command.

### Generating the assets

```bash
npm run logo    # favicons, header icon and share image
npm run art     # brand illustrations: large PNG → WebP in two sizes
npm run shots   # the screenshots in this README (needs the site running)
```

---

## Configuration

No `.env` goes into the repository. The `.example` files are the template.

| File | What for |
|---|---|
| `infra/.env` | Production: domain, ACME email, ports |
| `infra/.env.local` | Local machine: overrides the above with `:80` |
| `infra/.env.tunnel` | Cloudflare tunnel token. **It's a secret** |

Contact details and social links go into the build through `NEXT_PUBLIC_*`.
Without them the site comes up with example values and works just the same.
That's what this repository shows, since the real phone number belongs to a
person.

---

## Known gaps

- **The contact form doesn't send.** It validates, gives feedback and stops
  there. There is no backend. The send hook is isolated and commented out in
  `features/contact/contact-view.tsx`.
- **Blog without post pages.** The listing uses the four texts in
  `content/site.ts`; `/blog/[slug]` doesn't exist yet.
- **Stand-in fonts.** Cormorant Garamond and Jost in place of the licensed
  families from the original design.
- **`sharp` with a security advisory** (`npm audit`): it is a transitive
  dependency of Next for image optimization. The suggested fix forces Next 16,
  a major break, and is left for a deliberate upgrade.

---

## License

**© 2026 NerdResolve. All rights reserved.** See [LICENSE.md](LICENSE.md).

The repository is public for technical review and portfolio purposes. The
code may be read and studied; no license is granted to use, copy or
redistribute it. The **Astro Oculta** brand and the original content belong to
the owner.

---

<div align="center">

<img src="apps/frontend/public/brand/logo.webp" alt="" width="42">

**Astro Oculta**, built by [NerdResolve](https://nerdresolve.com)

Want a site like this? **contact@nerdresolve.com**

</div>
