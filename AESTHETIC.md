# Ordinal visual aesthetic

Status: specification, not implementation. Nothing in `index.html`, `styles.css` or
`script.js` was changed to write this.

Chosen direction: **Recorded Run**, with grafts from the four runners up where they
genuinely strengthen it. Recorded Run was the only one of the five candidate directions
with no lens scoring below 7 (7 / 8 / 7, average 7.3). The Ledger tied on average but
scored 6 on fit. Machine Hall scored 5.5 and Chart Recorder 5.

Two things were verified directly while writing this, and both change decisions the
judges made without them. They are called out in section 2 and section 3.

---

## 1. The aesthetic in one sentence, then one paragraph

**The site is a light, ruled sheet replaying one real recorded job, where every number on
screen is a measurement with provenance and the only things allowed to be dark are the
numbers that matter most.**

Ordinal's whole product is a claim about time. Today the site makes that claim in
adjectives: "Infinite compute", "a fraction of the time", "thousands of cloud machines",
none of which a reader can check. The aesthetic inverts that. The page picks one job that
actually ran, prints its name and its command and its date at the top, and then spends the
rest of the scroll paying out that one run's real figures in order: what went up, what came
back, what it cost to run again. The visual language is taken from the product itself
rather than from a reference site, because the app already has one: light warm-neutral
ground, soft cards, strictly monochrome, monospace for every quantity and sans for every
claim, and one device for emphasis, which is inversion. The app puts its single most
important number ("17.9x faster today") on a black tile in a field of white cards. That is
the page's contrast system too. Restraint everywhere, mass exactly where a number earns it.

---

## 2. What it is not

### Not the four rejected hero directions

All four were the same bet in four materials: a rendered object floating in the middle of
undrawn white.

| Rejected | Verdict | Why this is not that |
|---|---|---|
| A plane of dots | "placeless dust" | No particles anywhere. Every mark is anchored to a labelled axis at a coordinate that carries a value. |
| An omega built from points | "dust" | Same. The omega is not in the hero in any form. It returns at 20px in the header, which is where the app puts it. |
| A glossy 3D omega | "balloon" | No object, no volume, no silhouette. Nothing to read as inflated. |
| A satin 3D omega | "this looks so bad" | No material, no specular, no lighting model. The page has no renderer. |

The common diagnosis, which The Ledger and Machined Ground both reached independently and
which is the most portable idea in the whole review set: **those four failed on ground, not
on material.** An object on undrawn white has nothing to be a figure against, which is
literally what "placeless" means. So this direction builds the ground first: a paper value
that is not pure white, continuous drawn column rules, section identifiers hanging off
them, and only then puts anything on it.

### Not a re-skin of the current page

The current fold carries four elements and zero checkable facts. Measured in the audit: the
union of every text line box and control above y=900 at 1440x900 is 183,184 px², which is
14.1% of the first screen. The proposed fold carries roughly twenty discrete pieces of
information, of which at least seven are figures a stranger could dispute.

### Not the near-black instrument-panel look

Three of the five candidate directions proposed inverting the whole site to near-black with
mono small caps, bracketed identifiers, hairline tick axes and an acid accent. Two judges
argued Recorded Run should have done the same, on the grounds that its white ground is the
one property it drops from its own strongest reference, geometric-art.com.

**Call: stay light.** Three reasons, in order of weight.

1. Direct evidence. `app-shots/overview.png`, `usage.png` and `tasks.png` show a high-key,
   warm-neutral, near-white app with soft rounded cards and generous space. A near-black
   site would put five near-white screenshots on a dark ground as glare blocks, in a frame
   that argues against them. One judge verified this independently against Machine Hall and
   called it that direction's fatal flaw. It applies identically to Chart Recorder and The
   Ledger.
2. `direction-approved.md` records the owner choosing the light register in his own words.
   The register is legitimately re-open because he has since called the result abysmal, but
   reversing it is his call, not a default. It is listed in section 9.
3. The complaint being answered is emptiness. Near-black is one way to fix emptiness and it
   is not the only one, and it is the expensive one: it forces a rebuild of all nine
   sections at once with no shippable intermediate state.

**But the criticism underneath is correct and is not dismissed.** White on this site is
currently absence, not surface, and a ruled white page made of 1px grey strokes would
invite the same verdict from the opposite direction. The fix is not a different ground
colour. It is the app's own inversion device: black tiles carrying the numbers that matter,
sitting on paper. That gives the fold real visual mass without repainting the site and
without a second design language. See section 3.

### Not the stock 2024 SaaS kit

The audit enumerated it on the current page: pill CTAs at `border-radius: 999px` in eight
places, identical `translateY(-1px)` plus soft shadow hover on all three button variants
(`styles.css:79`, `:82`, `:85`), a monthly/annual sliding thumb, an edge-faded logo
marquee, a three-up pricing grid with an ink-bordered featured card and a "MOST POPULAR"
flag, and a near-black rounded CTA card with a violet radial bloom. All of that goes.

**But not by banning pills outright.** The Ledger proposed "an editorial sheet does not have
pills". The product's central control, the thing `DESIGN-REFERENCES.md` calls "our one idea
is the switch", is a 999px pill toggle labelled Boost, and the app uses pill chips
everywhere: Beta, Connected, On Ordinal, Cached. A system that forbids pills cannot draw
its own product. **Call: pills survive as state chips only, never as buttons.** A pill on
this site always carries a status, never an action. That kills the template read, which
comes from pill CTAs and lift-hovers, while keeping the vocabulary the product owns.

### Not a render farm

The sharpest sentence on the site is currently buried as FAQ answer two
(`index.html:334`): "A render farm is a place. You package a job, upload it, wait in a
queue. Ordinal is a switch you leave on." Machine Hall was marked down to 5.5 for spending
nine viewports rendering an aisle of machine racks against that line. The lesson transfers:
the fold's chart plots **time**, not machines. Machine count appears once, as a figure in
the run strip. There is no fleet visualisation anywhere on the site.

---

## 3. The concrete system

### Colour tokens

The app is strictly monochrome. It has no accent colour at all. Its one emphasis device is
inversion. The site adopts that exactly.

```css
:root {
  /* ground */
  --paper:      #f6f5f3;  /* page ground. not #ffffff. white must stop being absence */
  --surface:    #ffffff;  /* cards, panels, app windows: the lit things on the sheet */
  --invert:     #101010;  /* inverted tiles: the numbers that matter */

  /* ink on paper */
  --ink:        #0f0f0e;  /* headlines, figures.            17.6:1 on paper */
  --body:       #55534e;  /* body copy.                      7.0:1 on paper */
  --dim:        #86837c;  /* labels, captions, axis text.    3.3:1 on paper */

  /* ink on invert */
  --ink-inv:    #f6f5f3;  /* figures on a dark tile.        16.8:1 on invert */
  --body-inv:   #a8a49c;  /* secondary on a dark tile.       7.1:1 on invert */
  --dim-inv:    #6e6b65;  /* axis text on a dark tile.       3.2:1 on invert */

  /* rules */
  --rule:       #dedbd4;  /* structural hairlines, the drawn column */
  --rule-soft:  #e9e7e1;  /* row separators */
  --rule-inv:   rgba(246,245,243,.16);

  /* interaction chrome only, never brand */
  --focus:      #7c5cff;
}
```

Deleted: `--orange`, `--teal`, `--blue`, `--green`. The audit found `--green` referenced
zero times and the other three once each, and I confirmed `var(--green)` appears zero times
in `styles.css`. All three surviving uses are `.chip.orange/.teal/.blue` inside
`.marquees`, which carries `aria-hidden="true"` at `index.html:136`. The entire colour
story currently lives inside a decoration the eye is trained to skip.

Also deleted: `--violet` as a brand colour, including the hardcoded
`rgba(124,92,255,.16)` CTA bloom at `styles.css:810`. Violet survives only as `::selection`
and the focus ring, where it is interaction chrome.

One judge argued for keeping violet as a single accent meaning "work running on Ordinal".
Reasonable, and the product does not support it: the app signals that state with a filled
dot and the words "On Ordinal", in black. Going monochrome is both stricter and more
faithful.

One judge argued the marquee chips are semantic, not decoration, because they encode job
class (RENDER, ENCODE, BUILD, TEST), and that collapsing them loses the breadth claim.
Correct that it is semantic. **Call: keep the distinction, drop the colour.** Job class
becomes a mono label in `--dim`, which is exactly how the app draws it.

### The rule for where colour is permitted

There is no colour. There is contrast, and it has one rule:

> **A surface may be inverted only when it carries a quantity that is the point of the
> section it sits in. Everything else is ink on paper.**

The site should end up with roughly five inverted tiles across nine sections. If a sixth
appears, one of them is not carrying a number worth the mass. This is the page's only
dramatic device, so it has to stay scarce to keep working.

### Type scale

Six sizes plus one display clamp, replacing the 31 the audit counted (21 fixed sizes plus
10 clamp heads, sixteen of them between 8.5px and 17px in half-pixel steps).

| Token | Size | Role |
|---|---|---|
| `--t-display` | `clamp(40px, 5.4vw, 72px)` | h1 only |
| `--t-1` | 40px | section heads |
| `--t-2` | 24px | sub-heads, figure callouts |
| `--t-3` | 17px | body, hero sub |
| `--t-4` | 13px | secondary body, captions |
| `--t-5` | 11px | mono labels, axis text, identifiers |

Two weights, 400 and 500. The current 460 / 470 / 480 (`styles.css:189`, `:413`, `:51`) are
three variable-font weights inside twenty units and are visually identical.

Both faces are already loaded at `index.html:27`, so this costs no new request.

**The one typographic law, and it is transcribed from the product rather than invented:**

> **If it is a quantity you could check, it is Google Sans Code with
> `font-variant-numeric: tabular-nums`. If it is a claim, it is Google Sans Flex. Nothing
> that is not a quantity, a unit, a filename, a command or an identifier may be
> monospace.**

`app-shots/tasks.png` follows this rule strictly: job names in sans, `blender -b scene.blend
-a` and `frame 214 / 240` and `0.4s` in mono. Today the site does the opposite. `--mono` is
bound to exactly two rules (`styles.css:47`, `:275`) and all 32 of its uses in
`index.html` are decoration: sixteen marquee durations, eight hand-drawn window title bars,
three feature numerals, a scroll pill, a "MOST POPULAR" flag. The face is doing costume
work. After this rule, the presence of mono means "this is checkable", and the rule is
verifiable by grep.

### Grid

One gutter, one column, and the column is drawn.

- Gutter: 32px, 20px below 760px. Replaces the three competing gutters the audit found:
  16px on `.demo-pin` (`styles.css:300`), 24px on `.container` (`:57`), 28px on
  `.site-header` (`:99`).
- Column: `max-width: 1240px`. Replaces the 14 distinct `max-width` values, no two sections
  sharing a measure.
- Text measure: 66ch maximum, which retires the 460px hero sub cap at `styles.css:243`.
- **The column's two vertical edges render as continuous `--rule` hairlines running the
  entire document**, with a mono section identifier and a measurement hanging off them at
  every section boundary: `[ 02 / UPLOAD ]` at the left, `2.1 MB` at the right.

That persistent frame is the single highest-leverage change in the whole specification. It
is what converts white from absence into ruled paper, and it is pure CSS with no data
dependency and no library risk. It also improves whatever hero eventually wins, so it can
ship before any decision about the fold.

### Spacing rhythm

One 8px unit. Section padding resolves to exactly four values: 64 / 96 / 128 / 160.
Replaces the current 200 / 160 / 140 / 120 / 90 / 80 / 40 / 24, the 16 distinct `gap`
values and the 14 distinct `margin-bottom` values, none of which resolve to a common step.

### Border and radius language

Four radii, every one justified by the app rather than by taste.

| Token | Value | Applies to | Source |
|---|---|---|---|
| `--r-0` | `0` | rules, axes, bars, table rows, chart ink | instrument surfaces have no corners |
| `--r-win` | `14px` | app window chrome we draw | existing token, matches shot chrome |
| `--r-card` | `20px` | cards, panels, inverted tiles | the app's own card radius |
| `--r-chip` | `999px` | state chips only | the app's Beta / Connected / Cached / On Ordinal |

Replaces the 14 distinct radii currently shipping (999, 50%, 2, 4, 12, 14, 16, 18, 20, 22,
28, 40), where `--r-panel: 28px` and `--r-win: 14px` are declared and then contradicted by
`.plan { 22px }`, `.cta-card { 40px }`, `.how-app { 16px }` and `.folder-pop { 12px }`.

Buttons are `--r-0` with a 1px `--ink` border, not pills. Hover changes the border and
brightens the label. No `translateY`, no shadow. That single change does more to break the
template read than anything else on the list.

Elevation: one shadow, `--shadow-win`, for app windows only, because a window is a lit
object on a sheet. Everything else separates by rule, not by shadow. This retires 21 shadow
declarations.

---

## 4. The first screen

This is the part the owner is angriest about, so it is specified to the pixel and then
specified again for the case where it does not fit.

### What a visitor learns in the first three seconds

1. This is **Ordinal**, a **desktop app**, for **macOS and Linux**. (None of those three
   facts is currently above the fold. The audit found the header renders exactly one word,
   "Menu", centred, both corners empty, and that the word "app" never appears above the
   fold despite Download being the primary CTA.)
2. A named Blender job that took **about an hour and a half on a laptop** finished in
   **about twelve minutes** with Boost on, and there is a date and a command printed above
   the claim so it is clearly a replay of something that happened rather than a boast.
3. The local run **has not finished yet**. The grey lane is still drawing when the animation
   stops.
4. Three numbered facts are waiting below: what went up, what came back, what a rerun cost.

### Layout at 1440x900, one 1240px column, 32px gutters

**y 0 to 64. A real header, on a hairline rule.**
Left: the omega mark at 20px plus the `Ordinal` wordmark, then a `Beta` state chip, exactly
as the app's own sidebar draws it. Then mono 11px `MACOS · LINUX`.
Right: `Download` and `Book a demo` as square-cornered controls, then `Menu`.
Both corners occupied. The rule runs gutter to gutter.

This alone fixes four audited failures: the absent brand, the one-word header, the
invisible `.header-demo` (`opacity: 0; pointer-events: none !important` until `.scrolled`,
`styles.css:153-162`), and the fact that nothing above the fold says this is an app.

**y 88 to 112. The run strip, hanging off the header rule with a tick at the column edge.**
Mono 11px, `--dim`:

```
RECORDED RUN · 21 SEP 2026 · scene.blend · blender -b scene.blend -a · 240 frames
```

The word RECORDED is load-bearing and deliberate. It is honest about being a replay rather
than live telemetry, and on a page whose problem is that nothing is checkable, printing the
provenance reads as confidence rather than as a hedge.

**y 130 to 290. The headline. Two lines, `--t-display`, one ink value throughout.**

```
94 minutes on this Mac.
12 minutes with Boost on.
```

Both figures in mono tabular, the rest in sans. That one sentence teaches the entire page's
voice in its largest type: sans says things, mono measures them.

`.dim` is deleted. The audit measured `.hero h1 .dim { color: #b9b9b6 }` (`styles.css:242`)
at 1.97:1 against white, below the 3:1 floor for large text, which means the current
headline delivers roughly half the ink mass its markup implies. That is a direct
contributor to the screen feeling empty and it is a one-line fix.

**y 306 to 336. One sub line, `--t-3`, 66ch.**

> Ordinal is a desktop app for macOS and Linux. Flip Boost on and your renders, exports,
> builds and tests run on a fleet of machines, then land back in the folder you already
> work in.

This replaces the 35-word grey paragraph. One judge killed Chart Recorder for a fold that
"carries eight facts and no proposition", and the catch applies to any measurement-led
hero: a stranger reading two durations over a chart still does not know what the product
is. This line is the answer and it is not optional.

**y 356 to 400. Two controls.** `Download` and `Book a demo`, square corners.

The primary one must stop lying. `index.html:71` currently points at `#pricing`, which sits
at y=9,931 in a 13,640px document. The word Download appears four times on the page
(`:54`, `:71`, `:278`, `:397`) and never downloads anything, and the fifth path,
`Start free trial` at `:295`, leads to a section whose only button books a call. Either a
real release URL, or the button says `Join the waitlist`.

**y 424 to 768. The race. One inverted tile, full column width, 344px tall, `--r-card`.**

This is the centrepiece and the inversion is the point. One judge's strongest objection to
Recorded Run as proposed was that the chart is about 85% blank paper by area, with the
information living in 11px mono that reads as sparse from a metre away, so removing the
dark 3D object strips the only visual mass on the screen. That objection is correct against
a white chart. It does not survive against a black one. The app already does exactly this:
in `app-shots/overview.png`, twelve near-white cards and one black tile, and the black tile
is the one carrying "17.9x Faster today".

Inside the tile, in `--ink-inv` and `--dim-inv`:

- Top left, mono 11px: `TIME TO FINISH`. Top right: `scene.blend · 240 frames`.
- A horizontal time axis along the bottom, mono ticks at `0 / 15m / 30m / 45m / 60m / 75m /
  90m`, in `--dim-inv`.
- Lane A, labelled `THIS MAC · 1 machine`. A single 3px `--dim-inv` line that draws across
  the full width over 4.5 seconds and **does not finish**. It runs off the right edge of the
  tile, and a label hangs where it exits: `still running`.
- Lane B, labelled `ON ORDINAL · N machines`. N hairlines at 1px, stacked, all drawing at
  once, each a slightly different length because frames differ, all terminating in a ragged
  vertical edge at about 13% of the axis, with `12m 04s` set in mono at that edge.

**The lane that runs off the edge is grafted from Chart Recorder** and it is the single best
device in the entire review set. A chart with a trace leaving the frame is an unfinished
statement, and an unfinished statement is the only thing on a fold that actually makes
someone scroll. It also makes the point about the local machine without a word of marketing
copy. It is form-agnostic and costs nothing.

The image is a ragged white block that stops dead in the first eighth of a chart a grey line
never finishes crossing. That is the whole product as one drawing, made of nothing but
lines, on a surface with real mass.

**y 792 to 848. The agenda. Three readouts on a hairline rule.**

```
[01] UPLOADED   2.1 MB      of a 4.8 GB project
[02] RETURNED   240 frames  into ./renders
[03] RERUN      0.4 s       nothing uploaded
```

**Grafted from Machined Ground**, and it is the most valuable graft in the document for one
reason: **these three numbers need no measurement.** They exist today, invisible, in `alt`
attributes at `index.html:222`, `:230` and `:238`, while the visible paragraph beside each
says the hedged version ("Usually a few megabytes. Sometimes nothing."). And `2.1 MB` is not
just written, it is real: `app-shots/tasks.png` shows the app's own detail panel for
scene.blend reading `Uploaded  2.1 MB`.

It also turns the fold from a slogan into a contract with three numbered clauses, which
sections 4, 5 and 6 then honour in that exact order. And it is the insurance policy: if the
race figure never lands, the fold still carries three real numbers.

### Below 1240px, and the compact fold

The current hero has no visual at all below 1240px. `styles.css:930-933` sets
`.hero-field { display: none }`, verified in source. That is not an edge case. It is any
non-maximised window, a 1280-logical laptop in a split, an iPad in landscape. Those
visitors get a text document.

The race panel is DOM and SVG in the flow, so it has no such breakpoint. But "responsive by
construction" was overstated in the original proposal and two judges caught it, so:

- **1366x768 and any short viewport.** The agenda readouts fall below the fold. That is the
  intended degradation, because they are the least load-bearing element and they are
  repeated at full size in section 4. The tile shrinks to 260px and keeps both lanes.
- **Below 900px wide.** Axis ticks drop from seven to three (`0 / 45m / 90m`). Lane labels
  move above their lanes.
- **Below 640px.** The boosted lane collapses from N hairlines at 1px pitch to a single
  filled bar with the count printed on it. At 375px, N lanes inside a 45px-wide block resolve
  to a solid slab and the ragged edge, which carries the entire meaning of the drawing, is
  gone. This is a designed variant, not something the SVG gives for free.
- **Text is never inside a scaled viewBox.** Lane and axis labels are DOM positioned over
  the SVG, or the SVG is drawn in pixel coordinates computed at container size and re-emitted
  on resize. A uniform viewBox scaled to a 343px column renders 11px labels at about 3px.

---

## 5. Motion

**The governing rule: nothing eases on its own timer.** Everything is either a function of
scroll position or a replay of recorded time.

### Library

**GSAP 3 core plus ScrollTrigger, UMD from cdnjs.** Both are plain `<script>` tags, no
build step, and `REFERENCES.md` already clears GSAP as fitting as-is.

ScrollTrigger replaces the hand-rolled `pinProgress()` at `script.js:139-143`, which I read
and which returns a single clamped ratio that is only ever compared against the literals
0.02 / 0.38 / 0.78 or floored by `Math.floor(p * n)` at `script.js:172`. Seven things that
function structurally cannot do:

1. **Scrub.** 1,587 of the demo pin's 1,620 progress pixels currently move nothing.
2. **Derive pin length from content.** `pin: el, end: "+=" + computed` retires the four
   hardcoded constants I confirmed at `styles.css:289` (280vh), `:514` (480vh), `:962`
   (240vh) and `:969` (420vh), duplicated across two media queries.
3. **Snap**, so a reader cannot park mid-crossfade.
4. **Unequal beat durations**, so a step carrying a real number owns more scroll than a
   filler step. This is the specific fix for the metronome.
5. **`toggleActions: "play none none reverse"`**, fixing the one-shot reveals that
   `revealIO.unobserve()` at `script.js:61` currently kills on the way back up.
6. **`direction` and `getVelocity()`**, replacing the hand-tuned 6px deadband and the
   `y > innerHeight * 0.9` header tuck at `script.js:89-97`.
7. **`invalidateOnRefresh`**, so a resize mid-pin recomputes rather than teleporting.

Every one of the five candidate directions independently reached the same conclusion, and
one judge called this swap the best direction-independent move available. It ships on its
own.

### Lenis: no, not in v1

Recorded Run as proposed adopted Lenis. Three other directions declined it.
`DESIGN-REFERENCES.md` records it as deliberately not adopted because the pins read
`window.scrollY` directly, and the proposal argued that objection dissolves once
ScrollTrigger owns the pins. That argument is sound as far as it goes.

**Call: defer.** One judge found the concrete cost: ScrollTrigger's `snap` tweens window
scroll directly and fights Lenis unless you register a `scrollerProxy` or route snap through
`lenis.scrollTo`, which is a real half day, and `gsap.ticker.lagSmoothing(0)` is a third
required wiring line whose absence produces stutter that is annoying to diagnose. That is
meaningful cost for easing on a page that is about to get scrub everywhere. Revisit only if
the scrubbed sections judder on real hardware.

Two things that must change whether or not Lenis ever lands:
`html { scroll-behavior: smooth }` at `styles.css:33` fights ScrollTrigger snap and has to
go, with menu anchors routed explicitly. And `overflow-x: hidden` on `body` at
`styles.css:42` can make body a scroll container and break pin-spacer maths.

### What moves

**One autoplay, on the fold only.** A single GSAP timeline on load draws both lanes,
mapping 94 recorded minutes onto 4.5 seconds. The boosted block completes at about 0.6s.
The grey lane is still drawing when the timeline ends, then holds. It plays once.

One judge noted the weakness: a visitor who scrolls in the first second, or who scrolls back
up, sees only the resting frame. Mitigation, and it is small: the resting frame is already
the argument. A grey line leaving the frame beside a white block that stopped is legible
without having watched it happen. Do not add a loop. A looping hero chart reads as a
screensaver.

**Counting numerals, everywhere else.** Every figure on the site counts into place when it
enters, via a GSAP proxy tween writing a formatted string on `onUpdate`, with
`tabular-nums` so nothing reflows mid-count. **Grafted from The Ledger**, including its best
detail: in the demo section the boosted time counts **down from the local time**. That
dramatizes the entire product proposition with zero graphics, needs no plugin and no canvas,
and it is the one piece of motion that would survive onto any other direction.

**Rules draw, they do not fade.** Section rules and bars arrive by `scaleX` from 0 or by
`stroke-dashoffset`, never by opacity. This replaces the `.reveal` pattern at
`styles.css:213-217`, where the h1, sub and actions all start at `opacity: 0` with delays of
0 / .1s / .2s over a .8s transition. On a page whose problem is that the first screen feels
empty, the current entry animation spends a full second making it literally empty first.

**The header rule carries a scrubbed readout**, `[ 04 / 09 ] MEASUREMENTS · 38%`. The page
measures itself, which is the right behaviour for an instrument and gives the header a left
anchor and a right anchor instead of one floating pill.

### Reduced motion

This has to be **written, not ported**, because the current branch is broken in two ways I
confirmed in source at `script.js:196-203`.

- `howSteps.forEach(s => s.classList.add("active"))` sets all four `.how-step` active at
  once, against `position: absolute; top: 50%` at `styles.css:536-539`. Four headings print
  on top of each other and four screenshots stack.
- The same branch adds only `"live", "info"` to the demo panel and never `"done"`, so
  `.folder-pop` never appears at all and the payoff never fires.

Both pinned sections keep their CSS height, so a reduced-motion visitor still scrolls
2,520px plus 4,320px past two broken frames. That is half the document.

The replacement: pins release into natural document flow, every trace renders at full
length with static figures, every counter renders at its final value, and the fold's race
panel renders both lanes finished with the grey lane still crossing the edge. That is a
correct frame, and it is also the reference frame worth designing first, because everything
else is an animation of it.

---

## 6. The WebGL layer

**There is none. This direction deletes the three.js dependency entirely.**

That means removing the r128 `<script>` tag at `index.html:427`, the hero scene in
`script.js` (roughly 118 lines of TubeGeometry and material code), and the CTA starfield,
which is the rejected dust family shipping on the closing screen.

**This is a deliberate answer to the rejection history, not an evasion of it.** Four hero
directions have been rejected and all four were WebGL objects asked to carry a composition
with no frame to sit in. A fifth object is the same bet with a different material. It is
also the specific reason the fold dies below 1240px: the hero's visual is a canvas, and a
canvas in a right-hand slot is a thing you switch off when the slot gets narrow.

### What carries the weight instead

1. **The inverted race tile.** About 50 SVG `<line>` elements on a black card, drawn by one
   GSAP timeline. That is the visual mass.
2. **The drawn column rules and section identifiers**, which give every section a frame.
3. **The app screenshots**, which are the only photographic surfaces on the page and read
   correctly as lit windows on paper because paper is `#f6f5f3` and they are white.
4. **Counted numerals**, which supply the life the canvas was there to supply.

### No r184 + TSL upgrade

`REFERENCES.md` verifies the import-map route and it is the only path to real bloom. Bloom's
job is to make a bright thing on a dark ground glow, and the same file already records the
right observation about the nights-shader: a dense particle field works on black with bloom
and reads as dust on sparse white. But a particle field is the burned family. Taking the
import-map route here means paying the risk of a renderer swap to improve the two directions
that are already dead. It stays on the shelf.

### The honest counter-argument

The owner's own words this turn: "you now have access to asset libraries that are
incredibly, incredibly powerful. So I would recommend that you use them." This direction
uses GSAP and ScrollTrigger heavily, on every section, and declines three.js, Vanta, Lenis,
react-bits, Skiper and vgpu. That is a real tension with what he asked for and it is listed
in section 9 rather than assumed away. The strongest defence: the powerful library here is
ScrollTrigger, and it is the one that fixes the pacing complaint, which is half the verdict.

---

## 7. Section by section

The linear order is kept exactly. The owner explicitly endorsed it ("the progression is very
linear, which is good"). The failure is that each section states a generic capability
instead of a checkable claim, so each section gets one concrete fact and a bracketed
identifier.

Total document goes from 15.2 viewports to about 10, with the word count going up. The
audit's measured map showed 8.4 of 15.2 viewports (55% of the page) spent on two pinned
sections plus the statement, carrying 170 words between them.

Legend: **[HAVE]** the fact is already in the repo or the app. **[NEED]** the owner has to
supply or measure it.

---

### [00] Hero, 1.0vp

Today: `Infinite compute / on any computer`, 78vh ending in a 52px sliver of blank grey
panel.

Claim: `94 minutes on this Mac. 12 minutes with Boost on.`

- **[NEED] The local baseline.** One real wall-clock pair for one named job. This is the
  only genuinely blocking fact on the page and it is discussed in full below.
- **[HAVE]** Job name, command, frame count, upload size: `app-shots/tasks.png` shows
  `scene.blend`, `blender -b scene.blend -a`, `frame 214 / 240`, `Uploaded 2.1 MB`,
  `Started Sep 21, 2026, 11:23 PM`.
- **[NEED] Machine count** for that run, from the app's own Fleet screen. Report the real
  number and delete "thousands of cloud machines" from the copy. A number a reader can
  dispute beats an unfalsifiable superlative, and that is the whole thesis.

---

### [01] The run, was the pinned demo. 2.80vp to 1.6vp, fully scrubbed

Today: 2,520px delivering three boolean class flips, one of which does nothing. The audit
found `.info` at `p > 0.38` matches only `styles.css:358`, a shared selector that fades a
grey scroll pill. The stylesheet still carries the orphan comments the richer version was
built around at `styles.css:335`, `:337`, `:376` and `:378`, every one with nothing under
it. That is the proof the section was sized for a demo with many beats and then stripped.

Claim: one job, end to end, with the numbers visible. As the scroll advances, Boost flips
on, the command types out, `uploading 2.1 MB` resolves against a 4.8 GB project, the frame
counter climbs 1 to 240, and the folder fills to 240 files. The boosted time counts down
from the local time.

- **[HAVE]** Everything except the countdown's starting figure, which is the hero's
  baseline.
- **Delete `US-West · 82% free`** from the hand-drawn window chrome at `index.html:84`. The
  audit called this invented telemetry. That is not quite right and the correction matters:
  `app-shots/overview.png` shows a real Fleet card reading `US-West` and `82% free`, so it
  is transcribed product UI, not fabrication. The reason to remove it is different and still
  good. It is a region name rendered in chrome **we** drew rather than in a screenshot, and
  the standing rule is that no infrastructure naming appears on the public site. Inside an
  actual screenshot it is the app being the app. See section 9.

---

### [02] Statement. 0.73vp to 0.5vp

Today: `Flip one switch. Thousands of machines pick up your work. The results land in your
folder like nothing happened.` The audit counted this as the fourth verbatim restatement of
the hero sentence, in a section that is 655px of which 400px is pure padding
(`styles.css:407`).

Claim, promoted verbatim out of FAQ answer two:

> A render farm is a place. You package a job, upload it, wait in a queue. Ordinal is a
> switch you leave on.

**[HAVE]**, at `index.html:334`. Three separate judges independently identified this as the
single most differentiating sentence anywhere on the site, and it is currently the answer to
a question rather than a statement. It is also the only line on the page a competitor could
not paste onto theirs unchanged.

Keep the word-lighting effect but scrub it so it finishes at the section's exit. Today
`script.js:163` completes the lighting at scrollY 3,197 with the text still 225px from the
top of the viewport, after which roughly 400px of scroll passes with the sentence fully lit
and static.

---

### [03] Features. 1.01vp to 1.4vp. This becomes the page's evidence

Today: three category statements, `It feels local` / `Only changes travel` / `Nothing runs
twice`. The audit's finding: zero of the twelve section-level headings on the page contain a
number, a named tool, or a falsifiable claim.

Each head becomes a figure, and they pay off the fold's agenda in the same order:

```
01 · 2.1 MB       what the second run of a 4.8 GB project uploads
02 · 240 / 240    what lands in your folder, checked bit for bit
03 · 0.4 s        what a repeat build costs, with nothing uploaded
```

Each carries a small readout in the fold's grammar. One of the three is inverted.

**[HAVE]** all three, at `index.html:222`, `:230`, `:238`, currently invisible in `alt`
attributes. `2.1 MB` and `0.4s` are additionally visible in `app-shots/tasks.png` as real
product UI. No new facts required. This is promotion, not research, and it is the cheapest
direct answer to "it doesn't tell you much" available anywhere on the page.

Two copy fixes here. The lead paragraph stops saying "your heaviest work" and names what the
FAQ already names at `index.html:342`: Blender headless, ffmpeg, compilers, test suites. And
the overclaim at `index.html:114`, "anything that runs on your Mac can run there", goes,
because `index.html:342` contradicts it 228 lines later and the specific version is the more
impressive claim anyway.

---

### [04] Showcase. 0.91vp. Becomes the ledger, and the only place output appears

Today: `More of the app`, two screenshots, one of which (`tasks.png`) is the same image used
again 855px later in the walkthrough.

Two changes.

**First, the marquee stops being decoration.** `index.html:136` carries
`aria-hidden="true"`, and inside it are the only real tool names and durations on the page.
Remove the attribute, stop it auto-scrolling, and render it as a readable table in the shape
of the app's own Tasks list: name, command in mono, status, boosted time.

**But replace the rows.** The marquee's current contents are invented marketing strings:
`cathedral_interior.blend 12m 04s` appears nowhere in the app. `app-shots/tasks.png` has
nine real rows with real commands and real times, and they should be used instead:

| Job | Command | Result |
|---|---|---|
| scene.blend | `blender -b scene.blend -a` | frame 214 / 240 |
| master_4k.mov to hevc | `ffmpeg -i master_4k.mov -c:v hevc_nvenc ...` | uploading 12 MB |
| monorepo · release | `bazel build //... --config=release` | Cached, 0.4s |
| pytest · full suite | `pytest -n auto` | 3m 05s |
| cityscape_4k.blend | `blender -b cityscape_4k.blend ...` | 9m 51s |
| dailies_proxy.mov | `ffmpeg -i dailies.mov -s 19...` | 58s |
| llvm · stage2 | `ninja -C build stage2` | 9m 44s |
| integration · api | `go test ./... -run Integrat...` | 2m 44s |

- **[NEED] A local estimate beside each boosted time**, or the ratio column is dropped. A
  duration with no baseline means nothing: 9m 51s versus what?

**Second, and this is a gap in every one of the five directions: show a render.** Half the
audience is creative. Ordinal renders Blender scenes and encodes 4K masters, and across all
five proposals there is not one frame of output anywhere, only app UI and hairlines. Three
separate judges flagged this. One frame from `scene.blend`, captioned with its number, in a
window on the sheet.

- **[NEED] One output frame** from the recorded run, at a resolution we can publish.

---

### [05] How, dark. 4.80vp to 1.7vp. The single biggest cut

Today this is 4,320px, 32% of the entire document, and it restates the features section
one for one. The audit's mapping: `Only what changed goes up` is `Only changes travel`.
`Results land in your folder` is `It feels local`. `Ask twice, compute once` is `Nothing
runs twice`. Step 0, `Turn Boost on`, is the hero sentence for the fifth time. Across 4.8
viewports the only tokens not already on the page are "usually a few megabytes" and "reruns
are free".

Step 0 is deleted. Three unequal scrubbed beats remain, and the section stops restating and
starts demonstrating by becoming the app's own "Why it ran here" panel.

**[HAVE]** The panel is real: `app-shots/tasks.png` shows `Why it ran here / Boost is on, so
it went to the fleet instead of running here`, with Command, Started and Uploaded 2.1 MB
below it, and an Output block reading:

```
Fra:214 Mem:412.68M | Time:00:02.91 | Rendering 214 / 240
```

That line types out as the scrub advances. Raw tool output is the least fakeable thing you
can put on a marketing page, and it is already sitting in the product.

This section keeps its dark ground, which now means something. It is the one register change
on the page and it lands where the page is inside the machine rather than inside your
folder. **Grafted from Machined Ground**, whose two-ground semantic was the most portable
idea in that proposal: the page is on paper when it is about your folder, and inverted when
it is about the machine. That turns the currently arbitrary dark `.how` and dark `.cta` into
structure.

---

### [06] Pricing. 1.3vp

Today: the audit found the arithmetic does not survive thirty seconds. Pro is $24/month
(`index.html:285`) and includes "10 fleet hours included, then $2.40 per hour" (`:289`).
10 x $2.40 = $24.00 exactly, so the included hours are a prepayment at the identical metered
rate Hobby pays anyway, and the headline benefit is worth zero.

The layout shows the arithmetic rather than asserting a total, so it stays legible whatever
the numbers resolve to, and it opens by defining the unit the page has never defined.

- **[NEED] What a fleet hour is.** Wall clock or machine hour. This is used as a unit
  throughout and defined nowhere, which is the reason the numbers read as invented. It is
  also the most interesting concrete story the site is leaving on the floor: a job that
  finishes in twelve minutes while billing several machine hours is the product explaining
  itself.
- **[NEED] Whether the numbers survive review**, which is already in progress separately.
  Nothing in this specification depends on them. If they change, only the digits change.

Copy fixes: delete `Wrap any command from the terminal` (`index.html:272`), which is CLI
language inside a pricing card where a buyer is deciding what they are purchasing. Delete
`MOST POPULAR` (`:282`), a popularity claim from a product whose every purchase path
currently dead-ends at a calendar link. Delete the monthly/annual sliding thumb.

---

### [07] FAQ. 1.2vp, opened

Today: the six most specific and most differentiating facts on the entire site live here,
collapsed, at viewport 12.3, and `script.js:483-487` force-closes every other panel when one
opens, so at most one answer is visible at a time. The audit measured 118 of roughly 640
words rendering on scroll. A motivated reader physically cannot scan for the claim they
want.

Every panel open, no accordion, two ruled columns, mono question numbers. **[HAVE]** all of
it. The strongest, at `index.html:350`, is the best trust claim the product can make and is
currently answer number six:

> Every result is checked bit for bit before it lands in your folder. If a job can't be
> reproduced exactly, it runs locally instead.

Copy fix: `index.html:330` answers the definitional question "What is Ordinal?" and ends
"Power users can still prefix any command with `ordinal --`." The word "still" frames the
CLI as the real product and the app as a wrapper, in the one sentence that defines the
thing. That and the "Terminal adapter" phrasing at `:342`, which is internal implementation
vocabulary showing through, both go.

---

### [08] CTA, inverted. 0.9vp

Today: a near-black rounded card with a hardcoded violet radial bloom, one button reading
`Book a demo` directly under copy saying "Install it, turn on Boost".

The instrument grammar closes on the run's own total. One honest line, one honest button
that does what it says. Drop the violet bloom.

- **[NEED] A real release URL, or the button says `Join the waitlist`.** This is the most
  concrete promise the page makes and it currently cannot keep it. A reader who follows
  Download, then pricing, then Download, then Book a demo learns the product is not actually
  available, which retroactively makes every other claim feel like brochure language.

---

### [09] Footer. 0.7vp

Keep the oversized ghost word. It is one of only two original moves in the entire current
stylesheet and it should be registered to the column rules rather than floating.

Delete `Built for the 5% that matters` (`index.html:421`). It is the last line a reader
sees, and 5% of what is defined nowhere on the page.

Promote the platform fact out of the menu overlay: `macOS on Apple silicon, Linux on x86-64
and ARM. Windows is on the roadmap.` **[HAVE]**, `index.html:354`.

---

### The one blocking fact, stated plainly

Everything above is either already in the repo, already in the app, or a rewrite. **One
thing is not: a real local wall-clock number for one named job.** The site currently carries
sixteen boosted durations and zero local baselines, so nothing on it pairs a before with an
after. Without that pair there is no headline.

Every one of the five directions hit this wall and one judge called it fatal, on the grounds
that it might require product engineering the team does not yet have. **That assessment is
too pessimistic, and the evidence is in the app.** `app-shots/overview.png` shows a black
tile reading:

> **17.9x** faster today, than this PC, across 5 finished tasks

The product already computes the local comparison. The mechanism exists and ships. What is
missing is one recorded instance of it for one named job, printed with its provenance. That
is an afternoon of running one Blender render twice, not a roadmap item.

Until it exists, the fold carries the agenda readouts (2.1 MB, 240 frames, 0.4 s) and the
headline states the product rather than the measurement. **Do not ship a plausible-looking
invented figure.** A page that looks like an instrument and is lying is worse than a page
that is merely boring, and this site already has one fabrication problem in the pricing
section.

---

## 8. Build order

Smallest first. Every step is independently shippable and leaves the site better than it
found it. Nothing below step 7 depends on the blocking measurement, and nothing depends on a
decision about the hero.

**1. Copy promotion. Half a day. Pure text, no CSS, no JS.**
Promote 2.1 MB, 240 frames and 0.4 s from `alt` attributes into visible copy. Replace the
statement section with the render-farm line from FAQ answer two. Delete the four surviving
CLI lines. Delete `Built for the 5% that matters`, `MOST POPULAR`, and "go do something else
for eleven minutes". Fix the Download links to say what they do. This is the single highest
ratio of improvement to risk on the list and it answers half the owner's verdict on its own.

**2. Contrast, brand and header. Two hours.**
Delete `.dim` at `styles.css:242`. Restore the wordmark and the platform line to the header.
Make `.header-demo` visible at rest. Remove `US-West · 82% free` from our own window chrome.

**3. The measure pass. Two to three days. Pure CSS, one commit, not incremental.**
One gutter, one column, the drawn column rules with section identifiers, six type sizes, two
weights, the four radii, the 8px spacing step, delete the four unused accent tokens, delete
the nine off-token greys, kill the pill buttons and the lift-hovers. Do it as one commit: a
half-converted palette is the failure mode here, and there are nine off-token greys that a
find-and-replace will miss.

This is the change that converts "there's not really much on it" into restraint, and it
improves whichever hero eventually wins, so it should land before any hero work.

**4. FAQ and ledger. Half a day.**
Remove the accordion force-close at `script.js:483-487`, open every panel, two columns.
Un-hide the marquee and replace its invented rows with the app's real ones.

**5. GSAP and ScrollTrigger swap. One to two days.**
Delete `pinProgress()` and the literal thresholds. Derive pin length from timelines. Fix the
reduced-motion branch by rewriting it, not porting it. Remove
`html { scroll-behavior: smooth }`. Every judge identified this as worth doing on its own
merits regardless of direction, and it fixes two live bugs.

**6. Section length cuts. Falls out of step 5.**
`.how` from 480vh to about 170vh with step 0 deleted and three unequal beats. `.demo` from
280vh to about 160vh, fully scrubbed. The four hardcoded vh constants across two media
queries disappear rather than getting retuned.

**7. The fold rebuild. Two days.**
Header, run strip, headline, sub, buttons, agenda readouts, and the race tile with a clearly
labelled placeholder where the baseline goes. Build it against a single constants object so
the real figures swap in without touching layout. Design the compact and narrow variants at
the same time, not afterwards.

**8. The race panel's real data. Blocked on the measurement, not on code.**

**9. Delete three.js. One hour.**
Remove the script tag, the hero scene, the CTA starfield. Do this last, once the fold is
proven, so there is always a working page.

---

## 9. Open questions

1. **Ground: is light still the direction?** `direction-approved.md` records you choosing
   the airy light register in your own words, and this specification keeps it, on the
   evidence that the app is light and near-black would put five near-white screenshots on a
   dark page as glare blocks. But you have since called the result abysmal, so the register
   is fairly re-open. If you want dark, say so before step 3, because that is the expensive
   step and it is the one that would change.

2. **The local baseline.** Can someone run one named Blender job twice, once locally and
   once with Boost on, and write down both wall-clock times plus the machine count? The app
   already computes "17.9x faster than this PC", so the mechanism exists. Without this there
   is no measured headline, and the fold falls back to the three agenda numbers.

3. **Is there a binary?** Four Download links and one Start free trial currently lead to a
   demo booking. Either a real release URL, or every one of them changes to "Join the
   waitlist". This is a copy decision that blocks step 1.

4. **What is a fleet hour?** Wall clock, or machine hour. The unit is used throughout the
   pricing section and defined nowhere, which is a large part of why those numbers read as
   invented.

5. **Machine count on the public site.** The hero wants to print the real number of machines
   that ran the recorded job. That is a product figure from the app's own Fleet screen and
   nothing infrastructural is named, but it does sit near the standing rule about
   infrastructure on the public site. Confirm it is allowed, and confirm the same for
   leaving `US-West` visible inside screenshots.

6. **An output frame.** Can we publish one rendered frame from the recorded job? Every
   direction reviewed was marked down for selling a render product without ever showing a
   render, and half the audience is creative.

7. **Removing three.js.** This direction deletes WebGL, which is counter to your note that
   the new asset libraries are powerful and should be used. GSAP and ScrollTrigger are used
   heavily and three.js is not. The reasoning is that four WebGL heroes have now been
   rejected and a fifth is the same bet, but it is your call and it is worth an explicit yes
   before step 9.

8. **The word "thousands".** The hero currently claims thousands of cloud machines and the
   recorded run will show a real, smaller number. Recommendation is to delete the
   superlative and print the real figure everywhere. Confirm, because it reads as a
   reduction in ambition and it is not.
