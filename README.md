# Gap to Career — landing page

Live, 3-hour workshop by Error Makes Clever. ₹101.
Static page: no build step, no package manager. Open `index.html` or serve the folder.

```bash
python3 -m http.server 8787
```

## Files

| | |
|---|---|
| `index.html` | the landing page, 13 sections in the brief's order |
| `styles.css` | tokens + every section. One stylesheet. |
| `app.js` | sticky bar, reveal, timeline fill, FAQ, price count, form |
| `terms.html` `privacy.html` `refund.html` `contact.html` | the four legal pages a gateway asks for |
| `legal.css` | the legal pages (imports `styles.css`) |
| `assets/emc-logo.svg` | the EMC mark, taken from the live EMC sites |

## The design system

Tokens are read off the live EMC family pages (`zerotoshipped`, `aifullstack-bootcamp`)
so this page sits in the same house rather than near it:

paper `#F0F0F0` · ink `#0D1111` · mint `#00FA91` · teal `#022D2C` ·
cream `#FAF5EA` · ice `#EBF9FF` · Zalando Sans + Geist Mono · 8–20px radii.

The accent lives on the action and almost nothing else. The button pair is EMC's own:
mint fill with teal ink on light, teal fill with white ink on mint.

**One visual idea, in every section: a dashed gap that gets stitched closed.**
Dashed hairlines are the gap, a solid mint line is the restart. It is the hero field,
the mark under every eyebrow, the timeline that fills as you scroll, the rule beside
each "is this you" row, and the divider on the before/after profile.

Contrast was run as a build step over every text-on-ground pair, including the
composited ones. Everything is ≥4.5:1 for text and ≥3:1 for icons, strokes and the
focus ring. Re-run it if you change any colour.

---

# Before this page goes live

## 1 · The payment link — the page cannot take money without it

`app.js`, line ~14: `var CHECKOUT_URL = '';`

Paste the Razorpay / Cashfree / Instamojo page URL there. The hero form POSTs
`name`, `email` and `phone` to it. **Until it is set, the form refuses to submit and
logs an error to the console** — it never pretends to have worked. Every CTA on the
page scrolls to that one form, so this is the only place the URL goes.

Then click every button and complete one real ₹101 payment end to end.

## 2 · Mock content — `grep -n MOCK index.html *.html`

Everything below renders filled so the layout can be judged. **None of it can go live.**

| Where | What is mock | Who supplies it |
|---|---|---|
| Hero chips, price card, FAQ, recap | **Date `Sun, 29 Nov 2026` and time `10 AM – 1 PM IST`** | seller |
| Price card, FAQ, recap | **Teaching language** (currently "Tamil and English") | seller |
| Hero panel | **`assets/robin.png`** — cut out on this machine with macOS Vision. Drop your own cutout over this exact filename and it just works | you |
| Hero + mentor marks | **The IIT crest.** Each IIT has its own, and which campus Robin interned at is not confirmed, so a generic academic mark stands in | Robin |
| Stories section (`data-mock="testimonials"`) | **All three student stories** — name, gap, role, quote, photo | real EMC students, with their permission |
| Footer + all four legal pages | **Registered legal name and full postal address** | seller |
| `<meta property="og:image">` | **`assets/og.png`, 1200×630** — the link currently unfurls as a grey box | design |
| Hero mockups | The tracker and before/after profile are built, not screenshots | optional: swap for a real student's |

Dates: **check the day name against the calendar.** 29 November 2026 is a Sunday. If the
date moves, the day name has to move with it — a wrong day on a live session with no
recording produces refunds.

People: every face on this page is an initials disc, on purpose. **Do not put a stock
photo under a real name or a real credential.**

## 3 · Clauses that need the seller's sign-off — `grep -rn "NEEDS SELLER SIGN-OFF" *.html`

Plus `grep -rn "NEEDS MENTOR SIGN-OFF" *.html` — one, in the mentor section.

Three legal ones, all drafted as the gateway-safe option, all commitments someone has to agree to:

1. **If Error Makes Clever cancels or moves the session** → buyer chooses a full refund
   or a seat on the next date. In both `terms.html` and `refund.html`; keep them identical.
2. **If the buyer cannot make it** → seat moves to the next date, asked at least 24 hours
   ahead. A transfer, not a refund.
3. **Refund turnaround** → replied to within 3 working days, 5–7 working days to land.

The Show Up & Build Guarantee itself is the seller's own wording from the brief and is
repeated identically in the hero, the price card, the guarantee section, the FAQ and
`refund.html`. If one changes, all five change.

## 3b · The mentor

**Robin D Sebastian — AI Engineer · 5+ years in the industry · Ex Nvidia · IIT Intern.**
He is the hero's right-hand panel: cut out, on a dark teal ground (his shirt is white, so
a light ground would have swallowed him), with the NVIDIA mark beside "Ex Nvidia" and
**AI Engineer set in mint** as the first thing read after his name. The same two marks,
in the same box treatment, repeat in the mentor section.

LinkedIn blocks automated reading, so nothing here was taken from his profile — the three
story paragraphs and the two claims under them were written from the facts supplied, and
**Robin should read them before launch** (`grep -n "NEEDS MENTOR SIGN-OFF" index.html`).

**The photo.** `assets/robin.png` was cut out locally with macOS Vision — the same model
Preview's "Remove Background" uses — so the image never left this machine. To use a
different cutout, save it over `assets/robin.png`; the panel sizes on height with
`object-fit:contain`, so square, portrait or tall all bottom-anchor without clipping his
head. It is **296 KB**, which is the heaviest thing on the page: run it through Squoosh or
export a WebP before the ads start. `assets/robin-photo.jpg` (92 KB, with its original
background) is the square used in the mentor rail and on the guarantee signature.

**One claim is still out.** *"Working at the 25+ LPA level today"* was in the original
brief and is **not** on the page, because it was never confirmed for Robin. A salary claim
under a real, named, findable person is the one thing here that cannot be approximate.
Put it back only if he says so. *"5+ years of industry experience"* **is** on the page,
since you confirmed it.

## 4 · Things deliberately left off the page

- **No seat cap, anywhere.** The brief asked for "limited seats" but gave no number and
  no cap, and a limit that does not exist is the fastest way to lose a reader's trust.
  Give a real number and a real reason and it can go back in.
- **No countdown, no "N people viewing".** The brief ruled these out and so do the rules.
- **No statistics section.** There are no sourced figures in the brief, and an invented
  one is a factual claim. If you want one, bring the source with it — the honest
  alternative already on the page is the mechanism: an empty profile beside a finished one.
- **No video section.** Nothing to put in it yet. If a 2-minute founder clip exists, it
  belongs directly under the hero, and it should load on tap rather than on page load.
- **No 60-Day Tracker mockup.** Removed on request; the hero's right-hand side is Robin.
  The LinkedIn before/after moved down into "what you leave with", beside that section's
  button, which is where the page actually describes it.

## 5 · Last checks

```bash
grep -c MOCK index.html                 # must be 0
grep -rn "NEEDS SELLER SIGN-OFF" *.html # must be empty
```

- Read the rendered text for `TBC`, `placeholder`, `TODO`, `before launch` → expect none.
- Open at 360×640, 375×812 and 1280 wide. Check the headline sits on three lines on
  desktop and that nothing scrolls sideways.
- Reload with JavaScript off: the page must read correctly and every FAQ answer stays open.
- Turn on reduced motion: motion stops, nothing disappears.
