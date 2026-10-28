# Arthamandapam — Events landing page

A standalone React + Tailwind reconstruction of <https://arthamandapam.com/events/>.

Only that one page is reproduced. The remaining outbound links point at the
original site's paths; no other route is implemented.

The body of the page is a close reconstruction of the source. The **header and
footer are deliberately redesigned** for a landing page — see
[Landing-page adaptations](#landing-page-adaptations).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

## Stack

| Piece | Choice |
| --- | --- |
| Build | Vite 6 |
| UI | React 18 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Carousel | Swiper 11, coverflow effect |
| Scroll animation | GSAP 3 + ScrollTrigger |

Design tokens, `@font-face` rules and the icon-font glyph classes live in
[src/index.css](src/index.css). Everything else is Tailwind utilities on the
components, using arbitrary values (`text-[3.3vw]`, `rounded-[1.5vw]`) so the
`vw`-based sizing carries over from the source stylesheet unchanged.

## How the original was matched

Values were taken from the live page's own assets rather than estimated by eye:

- `events.css` (62 KB) — the page-specific stylesheet, section by section
- `qutiiz.min.css` — theme tokens (`--qutiiz-base: #6222cc`), header, FAQ accordion
- `base-styles.min.css` — the footer's type scale, greys and dividers, which the
  redesigned footer reuses so it still reads as the same brand
- the two inline `<style>` blocks — partners grid and testimonial carousel
- `events.js` and the inline scripts — GSAP timings, Swiper options, the counter

### Breakpoints

The source uses `max-width` queries at 480, 600, 768, 992, 1024 and 1200px. Each
Tailwind breakpoint is defined one pixel above its counterpart so the `max-*`
variants line up exactly — `max-sm:` is `@media (max-width: 600px)`. `desk:` and
`nav:` cover the two `min-width` queries the theme uses.

### Assets

Images, the logo and the three icomoon icon fonts are vendored under
`public/assets/`, copied from the origin.

The hero video is **not** vendored — it is a 104 MB MP4, so it streams from
`arthamandapam.com`. Point `HERO_VIDEO` in
[src/data/content.js](src/data/content.js) at a local file to make the page
fully self-hosted.

## Landing-page adaptations

The source page carries the full corporate site's chrome. A single-event page
has one job, so both ends were rebuilt around that.

### Header — [src/components/Header.jsx](src/components/Header.jsx)

Logo and one call to action. The eight-item menu, its Services dropdown, the
search popup and the mobile drawer are gone: a page with one conversion goal has
nowhere to navigate to, so site nav only offers ways to leave before converting.
Removing it also deletes an entire interaction surface to maintain and test.

The bar is now `fixed` rather than `absolute`. It stays transparent over the
black hero so it doesn't compete with the headline, then condenses into a
blurred dark strip once past 40px. On a page this long that keeps the CTA one
tap away from any scroll position — the single highest-leverage change here,
since the original's only persistent action was a phone number.

### Footer — [src/components/Footer.jsx](src/components/Footer.jsx)

The original footer is a sitemap: a Services column, a seven-item "Industries We
Serve" column, a careers link. None of it serves this page. The rebuilt footer
has three zones:

1. **Closing CTA** — a brand-gradient band restating date, venue, the offer and
   both price points, with the primary button. The page ends on the ask rather
   than on an FAQ.
2. **Contact** — logo, positioning line, socials, phone, email and both offices,
   labelled by city. These are the questions that surface right before someone
   commits money: who are you, how do I reach you, are you real.
3. **Legal** — copyright, terms, privacy.

Colours, greys, dividers and the heading rule are carried over from
`base-styles.min.css`, so the new structure still reads as the same brand.

The now-unused `NAV`, `SERVICES`, `FOOTER_SERVICES` and `INDUSTRIES` data and the
`MobileNav` component were deleted rather than left dead in the tree.

## Page rails

Every band used to pick its own ceiling — 1200, 1280, 1400, 1480, 1600 — so
nothing lined up and on a wide monitor the narrowest sections made the page look
like a column floating in an empty window. There are now two widths, defined
once in [src/index.css](src/index.css):

| Class | Max width | Used by |
| --- | --- | --- |
| `.container-page` | 1760px | header, hero, stats, journey, pricing, testimonials, footer |
| `.container-narrow` | 1440px | FAQ rows and the partner logos, which get harder to read or sparser as they widen |

Both share `--page-gutter: clamp(20px, 4vw, 72px)`, so the header, hero and
every section below start on the same vertical line at any width. The speaker
grid also gains a fourth column from 1201px up, which keeps those 335x300
portraits near native size instead of upscaling three wide cards.

## Hero

Rebuilt as a full-bleed editorial composition: the Season 1 footage carries the
stage with the type laid over it, replacing a 60/40 split that read as two
unrelated panels and left the headline smaller than the video.

The clip is 104 MB, so it is no longer load-bearing. A 50 KB still cropped from
it ([hero-poster.jpg](public/assets/images/events/hero-poster.jpg)) paints
first, and under `prefers-reduced-motion` the video is never requested and the
still is the hero image. The photo panel is held to ~74% of the stage rather
than stretched full width: the frame is 1.12:1 with the speaker centred, so
covering the full width would crop his head off and park him behind the copy.

Type is sized with `clamp()` rather than raw `vw`, so the layout stays
composed from 1366 to 2560 instead of scaling linearly.

## Two deliberate differences from the live page

Both are cases where the production page renders differently from what its own
CSS asks for. Each is a one-line change if you want the literal live rendering.

**1. Typography.** `events.css` declares `benzin*` and `bricola*` font families,
but every one of those TTFs returns **404** on the origin
(`/static/assets/fonts/Benzin-Bold.ttf` and friends). Because the declarations
list no fallback, the live page silently renders its headings in the browser's
default serif. This build uses the intended faces instead: Bricolage Grotesque
(the real typeface, from Google Fonts), Archivo standing in for the commercial
Benzin, and Noto Sans Tamil for the hero headline, which neither Latin face
covers. Drop the licensed Benzin TTFs into `public/assets/fonts/` and the
`@font-face` rules pick them up with no other change. To reproduce the serif
fallback exactly, see the commented block above `--font-display` in
[src/index.css](src/index.css).

**2. Premium pass background.** `.dark-card` ships an unrendered Django template
tag as its background URL — `url('{% static "assets/images/events/pri-bg.webp" %}')`
— so the image never loads and the card renders flat. This build matches that
flat rendering. The real image is vendored at
`public/assets/images/events/pri-bg.webp` if you want to switch it on.

## Faithfully reproduced quirks

These look like bugs but are what the source does, so they were kept:

- The hero pitch card reads **black with a purple edge**, not purple. Its
  `::after` plate sits at `z-index: -1` inside the card's own stacking context,
  which paints it over the card's purple background rather than behind it.
- "Create impactful content." is set in brand purple on that card.
- The FAQ answer for the pass comparison names a "Creator Elite Pass", which
  does not match the "Premium Pass" in the pricing section.
- The first marquee starts mid-phrase, because its track animates from
  `translateX(-50%)` to `0` over only two groups of items.
- `.stats-heading` sets no line-height, so it inherits Bootstrap reboot's `1.2`.

## Two small additions

- Entrance animations are skipped under `prefers-reduced-motion: reduce`, and
  every GSAP tween uses `clearProps` so content can never be left stuck at
  `opacity: 0`.
- Speaker filenames with spaces were hyphenated (`Surendar-Gyan.jpg`).
