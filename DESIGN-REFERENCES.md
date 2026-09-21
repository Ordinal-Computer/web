# Design references

Sites and repos worth stealing from, with notes on what each one actually teaches
and what it means for this site. Working rule: steal principles, never pixels.
When touching the design, open this file first and say which entry justifies the
change. If no entry does, that's a signal the change is decoration.

## Full sites with public source

- **Bruno Simon, folio 2019** — https://github.com/brunosimon/folio-2019 (live: bruno-simon.com)
  The most famous WebGL portfolio ever shipped; swept the 2019 awards circuit.
  Lesson: one committed idea (drive a car through your resume) beats ten effects.
  The physics isn't decoration, it IS the site.
  For Ordinal: our one idea is the switch. Everything on the page should either
  set up the flip or pay it off. Anything that doesn't is a candidate for deletion.

- **Henry Heffernan, portfolio OS** — https://github.com/henryjeff/portfolio-website
  A working desktop OS in the browser, Awwwards-recognized and endlessly cloned.
  Lesson: total commitment to a metaphor. Nothing on the site breaks character.
  For Ordinal: our metaphor is "a second processor appears in your machine."
  The product window, the telemetry, the job rows all speak processor, never
  "cloud dashboard." Keep it that way.

## Award-tier studio sites (closed source, study the behavior)

- **Lusion** — https://lusion.co
  Awwwards Site of the Year 2023. Watch how motion never blocks reading: heavy
  WebGL, yet text is always still when you need it.
  For Ordinal: the mask that keeps the fleet out of the headline came from this
  principle. Type wins every collision.

- **Igloo Inc** — https://www.igloo.inc
  Awwwards Site of the Year 2024. The reference for restraint in a WebGL-first
  site: one material language, one palette, scroll as the only input.
  For Ordinal: our indigo-on-white with a single accent family follows the same
  discipline. Resist adding a second color story.

- **basement.studio** — https://basement.studio (source: github.com/basementstudio/scrollytelling)
  Studio with award-winning client work that open-sources its scroll machinery.
  Their scrollytelling lib shows how pros structure pinned scenes: explicit
  timelines, not scroll-position spaghetti.
  For Ordinal: our pinned product window and dispatch sequence use the same
  shape (progress in, states out). If those sections grow, adopt their timeline
  model rather than adding more thresholds.

## Libraries and technique repos

- **three.js examples** — https://github.com/mrdoob/three.js
  The instancing examples are the canonical way to draw thousands of things in
  one call. The fleet was written against `webgl_buffergeometry_instancing`
  from the r128 tag, verified before writing.

- **stegu/webgl-noise** — the simplex noise in the fleet's vertex shader (MIT,
  attribution kept in the shader source). Organic motion without per-frame CPU.

- **Lenis** — https://github.com/darkroomengineering/lenis
  Smooth scroll used across half the recent award winners.
  Deliberately NOT adopted here: our pinned sections read scroll position
  directly and native scroll keeps them honest on trackpads. Revisit only if
  the site moves to a timeline-based scroll model.

- **locomotive-scroll** — https://github.com/locomotivemtl/locomotive-scroll
  Same category as Lenis, from the Locomotive studio. Same verdict, same reason.

- **react-three-fiber** — https://github.com/pmndrs/react-three-fiber
  If this site ever becomes an app with routes, this is the migration path for
  the WebGL scenes. Not before.

## Craft guidelines

- **raunofreiberg/interfaces** — https://github.com/raunofreiberg/interfaces
  The most-starred interface craft checklist on GitHub. Already applied here:
  focus-visible rings, ::selection styling (including the gradient-text case),
  anchor scroll offsets, no hover lifts on touch, loops paused offscreen,
  tabular numerals on live numbers.

- **huashu-design** — https://github.com/alchaincyf/huashu-design
  MIT, HTML-native design guidelines. Its bar is the right one: output nobody
  can tell was machine-made, brand assets before invention, three directions
  before committing. Used as the review checklist when judging new sections
  of this site.

## Already applied, reference → decision

| Reference | Decision on this site |
|---|---|
| three.js instancing example | fleet drawn as one instanced call, shader-driven |
| stegu/webgl-noise | fleet swell, pointer ripple, Boost shockwave |
| rauno interfaces | focus rings, selection, scroll margins, touch targets, paused loops |
| Lusion (type vs motion) | headline mask over the fleet |
| Igloo (one palette) | single indigo accent family, semantic color only |
| basement scrollytelling | pinned sections structured as progress → states |
| huashu-design | copy and review bar: nothing that reads machine-made |
