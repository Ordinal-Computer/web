# web

Marketing site for Ordinal.

Static HTML, CSS, and JS. No build step and no framework. Serve the directory and open it:

```bash
python3 -m http.server 4173
```

## Files

- `index.html`: every section, in the order it renders
- `styles.css`: tokens at the top, then sections in the same order as the markup
- `script.js`: scroll choreography, menu, pricing toggle, FAQ, 3D logo
- `og-image.png`: 1200x630 link preview card, pointed at by the og:image and twitter:image tags
- `app-shots/`: real screenshots of the desktop app (Overview, Tasks, Usage, and two Tasks
  detail states) used in the demo, the how-it-works walkthrough, and the app showcase
- `ordinal-logo.png`: the mark on transparent background, 2048px, three-quarter view, for decks and social
- `ordinal-logo-front.png`: the same mark head on; this is what `og-image.png` is built from

## Design

`DESIGN-REFERENCES.md` is the taste file: the sites and repos this design answers
to, what each one teaches, and which decisions here trace back to which entry.
Read it before changing how anything looks or moves.

## Notes

Fonts load from Google Fonts and three.js from cdnjs, so the page needs network access to
look right.

The header mark is a WebGL render of the omega curve. If WebGL or the CDN is unavailable it
falls back to the flat SVG sitting underneath it, so the header never ends up empty.

The pinned sections (the console demo and the dark walkthrough) get their scroll length from
their `height` in `vh`. Changing that height changes how long they stay pinned and how fast
the steps advance, so adjust it there rather than in the JS.

The header has no backdrop, so it tucks out of view while you scroll down and comes back on
any upward move. Without that, the centred menu pill cuts through whatever headline happens
to be passing under it. Under `prefers-reduced-motion` it goes `position: absolute` instead
and simply leaves with the page.

Everything animated is behind `prefers-reduced-motion`, which swaps the pinned sections for
a plain stacked layout.
