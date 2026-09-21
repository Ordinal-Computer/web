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
- `ordinal-logo.png`: the mark on transparent background, 2048px, for decks and social

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

Everything animated is behind `prefers-reduced-motion`, which swaps the pinned sections for
a plain stacked layout.
