# References

Everything handed over as inspiration or as a candidate dependency, with what it
actually is and whether it can be used here. Append to this as more arrives.

`DESIGN-REFERENCES.md` is the taste file: sites and principles the design answers to.
This file is the inbox: concrete repos, libraries and tools, plus the verdict on each.

## The constraint every entry is judged against

The site is static: no build step, no npm, no framework. `three.js r128` is loaded as a
global `<script>` from cdnjs. So a library only "fits" if it ships a plain script or ESM
build usable straight from a CDN. Anything that needs a bundler, npm install, or React is
a real architecture change, not a drop-in.

| Library | Fits as-is? | Why |
|---|---|---|
| GSAP | yes | ships a UMD build for a plain `<script>` |
| Lenis | yes | ships a UMD/ESM build, framework agnostic |
| Vanta | yes | plain script, but it wants its own three.js global |
| three.js r184 + TSL | yes, verified | bare specifiers resolved by an import map, no bundler |
| react-bits | no | React components; this site has no React |
| vgpu, as a dependency | no | npm + bundler, and WebGPU only with no WebGL fallback |
| vgpu, as a CLI tool | **yes** | `npx vgpu` needs no install and ships nothing to the site |
| Animista | yes | generates plain CSS, nothing to install |
| Skiper UI | no | React + shadcn CLI + Motion.dev, and mostly paid |

---

## Sent over

### lenis
<https://github.com/darkroomengineering/lenis> — MIT, ~16k stars. "Smooth scroll as it should be."

Smooth/normalised scrolling, framework agnostic, used across most of the current award-site
crop. **Note the conflict:** `DESIGN-REFERENCES.md` currently records Lenis as deliberately
*not* adopted, on the grounds that the pinned sections read scroll position directly and
native scroll keeps them honest on trackpads. Re-sending it suggests that call is being
reversed. If we adopt it, the pinned `.demo` and `.how` maths has to be re-checked against
Lenis' virtual scroll, because they currently read `window.scrollY` every frame.

### GSAP
<https://github.com/greensock/GSAP> — ~29k stars. Animation platform for the web.

The industry standard for timeline-based animation, and its ScrollTrigger is what most of
the reference sites use for exactly the pinned/scrubbed sections we hand-rolled. Ships a
UMD build, so it works from a CDN with no build step. Worth a licence check before shipping
commercially (GitHub reports a non-standard licence on the repo).

Relevant because the scroll choreography in `script.js` is hand-rolled `pinProgress()` maths.
ScrollTrigger would replace it with something far more maintainable.

### vanta
<https://github.com/tengbao/vanta> — MIT, ~7k stars. "Animated 3D backgrounds for your website."

Drop-in animated backgrounds (birds, fog, waves, net, globe) on top of three.js. Honest read:
it is the fastest way to get *an* animated background, but the effects are recognisable and
widely used, so it reads as a template rather than a bespoke identity. Useful as a menu of
effect ideas; risky as the actual hero of a product site.

### react-bits
<https://github.com/DavidHDev/react-bits> — ~48k stars. Animated, interactive, customisable React components.

A large catalogue of polished UI/motion components. **Does not drop in:** this site is vanilla
HTML/CSS/JS with no React. Its value here is as a pattern library to copy *ideas* and easing
from, not code.

### Skiper UI
<https://skiper-ui.com> — 106+ "uncommon" components for shadcn/ui, built on Next.js,
Tailwind and Motion.dev. Components are pulled in with `npx shadcn add @skiper-ui/skiperNN`.

**Does not drop in**, for two reasons: it is React/shadcn and this site is vanilla, and most
of it is paid (one-time Premium $129, Exclusive $549 with Figma files). Free examples exist
but the catalogue is the product.

Still the most directly useful *taste* reference in this list, because it is UI motion rather
than background art: Dynamic Island, Image Reveal, Image Cursor Trail, Vercel Tooltip,
Devouring Details Sign In. It also credits Rauno Freiberg as an influence, who is already in
`DESIGN-REFERENCES.md`, so it is pulling from the same well the site already aims at.

### Animista
<https://animista.net> — interactive CSS animation playground. FreeBSD licence, free for
commercial use.

Browse a catalogue of pre-made CSS animations, tweak duration/easing/delay/direction, copy
out the generated CSS. **Pure CSS, no dependency, no build step**, so it is the one item in
this list that is usable here with zero friction.

Its ceiling is low (entrance/exit/text effects, not scene work) but it is the right tool for
the small stuff the site currently hand-rolls: section reveals, text staggers, button states.

*Name check:* sent as "animaster", read as Animista. The other plausible reading is anime.js
(<https://github.com/juliangarnier/anime>, MIT, ~73k stars), a JS animation engine that also
works from a plain script tag. Say which one if this is the wrong guess.

### Vercel WebGPU work
- **vgpu** <https://github.com/vercel-labs/vgpu> — MIT, ~2.3k stars. Cross-runtime WebGPU library (shaders, 3D scenes, GPU tensors).
- **example gallery** <https://vgpu.sh/examples> — the useful part. Entries include Holographic Card (a minimal graphite card with iridescent foil engraving, which is close to the card concept we designed), Triangle LED Hero, Black Hole (raymarching + HDR + bloom), Interactive Fluid, Glass Sculpture, Liquid Glass, Radiance Cascades, Particles Ocean, FFT Ocean, Raymarched/Glass Fractal, Transmission, Lava, Particle Orbit.
- **nextjs-nights-shader** <https://github.com/vercel-labs/nextjs-nights-shader> — MIT. WebGPU galaxy shader, Next.js 16 + three 0.184 + TSL. Live: <https://nextjs-nights-shader.labs.vercel.dev>

**Correction, 23 Sep 2026.** I originally wrote vgpu off entirely. That was right about
shipping it and wrong about using it. As a *dependency* it still cannot be used here: npm,
a bundler, WebGPU only, no WebGL fallback. But it ships a **CLI**, and a CLI is a tool, not
a dependency. `npx vgpu` runs with nothing installed and puts nothing in the site.

What the CLI actually gives us:

- `npx vgpu examples pull <slug> --out <dir>` pulls the full source of any gallery entry.
  The gallery was listed here as our best *look* reference precisely because the code was
  out of reach. It is not out of reach. Verified: pulled `glass-sculpture`, 9 files, 33 KB.
- `npx vgpu check <file.wgsl>` validates and reflects WGSL, with `--require-validation` to
  fail rather than skip when no device is present. Our TSL compiles to WGSL, so this is a
  real checker for the hero's shader path.
- `npx vgpu doctor` reports the local headless rendering environment. Verified on this
  machine: **healthy**, Dawn on Metal, macOS 26.5, arm64 native, and it rendered and read
  back a 16x16 offscreen target. That matters because the browser pane in this environment
  mis-scales screenshots and reports `document.hidden` as true, which throttles rAF and
  lazy loading. Headless rendering is a way to check GPU output that does not depend on it.
- `npx vgpu docs find "<topic>"` and `docs cat <path>`, plus `npx vgpu mcp` which serves
  the docs and examples to an agent over stdio.

**The technique worth taking.** `glass-sculpture` implements real chromatic dispersion in
about six lines: trace the refracted ray three times at slightly different indices of
refraction, one per colour channel, because IOR varies with wavelength.

```wgsl
let spread = 0.008 * params.dispersion;
refracted = vec3f(
  trace_glass(camera_position, ray, sculpture_hit, GLASS_IOR - spread).r,
  trace_glass(camera_position, ray, sculpture_hit, GLASS_IOR).g,
  trace_glass(camera_position, ray, sculpture_hit, GLASS_IOR + spread).b
);
```

That is what a prism physically does. Our hero currently approximates the same idea by
hand: 56 separate tube meshes, each assigned an evenly stepped HSL hue. It reads well, but
it is a drawing of dispersion rather than dispersion. `transmission` has the same idea
applied in screen space, with Snell refraction and a Fresnel-weighted reflection.

The gallery remains the best source of *look* references in this list. It is now also a
source of working code.

One observation worth keeping: the nights-shader is a particle field that forms a logo, which
is the same family rejected twice here. It works there because it sits on black, at very high
density, with bloom. The versions tried here were sparse particles on white with no bloom,
which is why they read as dust. The lever is the ground and the bloom, not more particles.

### geometric-art.com
<https://geometric-art.com> — "GEOMETRIC, Image + Motion Art Studio". A tool, not a repo.

The strongest aesthetic reference in this list. What it is doing:
- near-black ground (`#101214`), essentially monochrome, colour held almost entirely in reserve
- monospace technical labels, small caps, wide letterspacing, bilingual EN/JP
- hairline grid, measurement ticks, labelled axes ("X / FRAME INDEX", "Y / LUMINANCE")
- bracketed identifiers everywhere ("01 / SOURCE", "A-01", "810 × 1440", "FRAME 0001")
- dense instrument-panel layout: it reads as laboratory equipment, not as a marketing page
- the artwork itself is **contour and flow-line engraving**: topographic lines following a
  field ("TOPOGRAPHIC / 光の等高線", "FLOW ENGRAVING / 流線彫刻", "EDGE MAP")

That last point matters most. Lines following a field are a form language that is neither a
particle scatter nor a glossy solid, which are the two families already rejected here.

---

## Verified while researching

**three.js r184 with `WebGPURenderer` + TSL runs with no build step.** Bare specifiers are
resolved by an import map straight from a CDN. Tested locally: `navigator.gpu=true`,
`three.REVISION=184`, `renderer backend=WebGPU`, render loop running. Forcing the fallback
gives `forcedBackend=WebGL2` and still renders. So one TSL source compiles to WGSL on WebGPU
and GLSL on WebGL2, and three picks automatically.

This is the route to real postprocessing (bloom), which r128 core cannot do without
hand-rolled render targets, and bloom is a large part of why the reference demos look good.

**Codrops**, source-available technique write-ups used while exploring the hero:
- Interactive Particles with three.js <https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/>
- Dreamy particle effect with GPGPU <https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/>
- Animating letters with shaders <https://tympanus.net/codrops/2025/03/24/animating-letters-with-shaders-interactive-text-effect-with-three-js-glsl/>

---

## Already in DESIGN-REFERENCES.md

Not repeated in full here: Bruno Simon folio-2019, Henry Heffernan portfolio OS, Lusion,
Igloo Inc, basement.studio scrollytelling, three.js examples, stegu/webgl-noise,
locomotive-scroll, react-three-fiber, raunofreiberg/interfaces, huashu-design.
