# learn-ai-illustration-with-phoebe · source map

Every fact the pages state, where it came from, how far it was verified, and the honest
limits of the bench. by Phoebe Fu

Research date: 2026-09-18. Vendor documentation was read through a real browser session
(the Midjourney, Adobe and OpenAI policy pages return 403 to a plain fetcher); the US
Copyright Office report was extracted from the downloaded PDF. **This course ships no
generated raster image.** Every diagram is hand-authored SVG. Session 4 explains why, on
mechanism, and the rule is the course's spine rather than a limitation of it.

---

## The course in one line

An illustration made with a model is still art-directed by a person, or it is not
illustration. Six sessions on where control actually lives in the generation stack, how to
write a brief that is a picture before it is a style, why every character of type is set by
hand, why consistency is a pipeline and not a parameter, and when the honest answer is to
not use a model at all.

**Running situation:** Daybreak, the coffee subscription company from the sibling courses,
needs the autumn roast launch set: an email hero, a landing-page header, three social tiles
and the sleeve artwork. Six assets that must look like one hand made them. The sleeve
carries an origin claim that legal signs, which is why no lettering may come out of a model.

---

## Scope boundaries (decided before the first page was written)

Four live courses already teach parts of this ground. Each seam was checked against the
sibling's headings before a session title was locked.

| Question | Owning course |
|---|---|
| Copyright, prompts-are-not-authorship, indemnities, the court cases, C2PA as a signature | `learn-ai-design-with-phoebe` a4 "IP, provenance and risk" |
| Writing a constraint brief for UI; `--sref` / `--sw` as reference discipline for product design | `learn-ai-design-with-phoebe` b2 and b7 |
| Disclosure duties, EU AI Act Article 50 dates, watermarks that survive and metadata that does not | `learn-ai-media-with-phoebe` session 6 |
| On-brand image recipes for marketing volume, likeness and trademark risk | `learn-ai-marketing-with-phoebe` b8, `learn-ai-content-with-phoebe` b6 |
| **Illustration craft: concept before style, the lettering law with its mechanism, consistency as a system, and the judgement call** | **here** |

Session 5 carries **one card** on rights, pointing at the two owning pages, and states the
one fact this course needs from that ground: the Copyright Office's line on arrangement and
modification, because it is the reason the hybrid pipeline is protectable and the pure
prompt is not. Nothing else from that territory is restated.

---

## Sessions

| # | Title | Signature thing |
|---|---|---|
| 1 | Where control lives | The generation stack as a control surface: which knobs bind and which persuade |
| 2 | Style DNA, written down | A style described in words that survive the person who wrote them; the reference kit |
| 3 | Composition and the type zone | The picture as layout: subject, light, ratio, and the empty third that type will own |
| 4 | **The lettering law** | **Why models cannot spell, on mechanism; the brief bench and the "more style words" trap** |
| 5 | Consistency is a pipeline | Seeds at 99%, style references, the Edit Model, LoRA's cost ceiling; one card on rights |
| 6 | When it earns its place | The trust evidence and the click evidence side by side; a rule for saying no |

---

## Verified facts, by verification tier

Tier A: read from the vendor page, the paper, the court page or the PDF. Tier B: a reliable
secondary that cites the source. Tier C: search snippet or trade press only - hedged or not
stated. **All model ids and version numbers are volatile; the pages carry them in dated
footnotes, never in headlines.**

### Where control lives (sessions 1-3)

| Fact | Tier | Source |
|---|---|---|
| Midjourney's default is **V8.2, since 2026-07-24**; the Edit Model "replaces Omni Reference, Character Reference, and the Retexture tool". V8.1 default 2026-06-10 to 07-23; V7 default 2025-06-17 to 2026-06-09 | A | docs.midjourney.com Version page |
| Live parameter set includes `--ar`, `--chaos`, `--no`, `--seed`, `--stylize`, `--sref`, `--sw`, `--sv`, `--weird`, `--raw`, `--edit`, `--hd/--sd`; `--oref` is annotated "replaced by the Edit Model in V8.X". Formatting: parameters at the end, a space before the dashes, no punctuation inside them | A | Parameter List page |
| **Seed reproducibility is "(99% identical)"** on V8.1 and V8.2, per the vendor's own compatibility chart | A | Version page |
| `--sw` runs 0 to 1000, default 100; style references work on V6 and later; a style code cannot be made from an uploaded image; `--sw` is incompatible with Moodboards | A | Style Reference page |
| The Edit Model takes up to 4 reference images, V8.1 and V8.2 only, not compatible with `--tile`; vendor craft note: combine characters into one reference image when features mix | A | the page at the old Character-Reference slug, now titled Edit Model |
| Omni Reference (V7 only): `--ow` 1 to 1000, default 100, keep below 400 unless stylize is very high; one image; **2x GPU time**; incompatible with Fast, Draft and Conversational modes | A | Omni Reference page |
| Max aspect ratio 14:1 (4:1 for HD); "aspect ratio isn't the same as image dimensions"; HD costs 1.3 GPU minutes vs 0.8 for SD | A | Version and Aspect Ratio pages |
| OpenAI image models `gpt-image-2.5-sunburst` (editing precision) and `-flare` (fast); sizes 1024x1024, 1536x1024, 1024x1536, or custom multiples of 16 between 1:3 and 3:1, no edge over 3840 | A | developers.openai.com image guide |
| Google Gemini image models `gemini-3.1-flash-lite-image`, `gemini-3.1-flash-image`, `gemini-3-pro-image`; reference ceilings differ per model (up to 14 total on Flash Lite; 6 object / 5 character / 3 style on Pro); every output carries a SynthID watermark | A | ai.google.dev image generation docs |
| Adobe Firefly: Composition reference matches "outline and depth" with a Strength slider; Style reference guides "look and feel" for brand consistency (pages updated 2026-06-16) | A | helpx.adobe.com, both pages |
| Adobe's "commercially safe" training-data and indemnification wording | **C** | search snippets only; FAQ answers JS-gated. **Not stated on the pages** |

### The lettering law (session 4)

| Fact | Tier | Source |
|---|---|---|
| **The cause is representational.** "Popular text-to-image models lack character-level input features, making it much harder to predict a word's visual makeup as a series of glyphs." Character-aware encoders gain "30+ point accuracy" on rare words | A | Liu et al., *Character-Aware Models Improve Visual Text Rendering*, arXiv 2212.10562, ACL 2023 |
| **Fixing it means changing the text encoder.** Glyph-ByT5 raised design-benchmark text accuracy "from less than 20% to nearly 90%" only after fine-tuning a byte-level encoder on glyph-aligned data; the two requirements are "character awareness and alignment with glyphs" | A | arXiv 2403.09622, ECCV 2024 |
| OpenAI: the model "can still struggle with precise text placement and clarity" and with "placing elements precisely in structured or layout-sensitive compositions"; and "may occasionally struggle to maintain visual consistency for recurring characters or brand elements" | A | OpenAI image guide |
| Ideogram, whose pitch is typography: accuracy is best in English, non-Latin scripts "often produce unpredictable results", longer text raises "spelling errors, distortions, or incomplete words", and: "consider using Ideogram to generate the visual concept and then **add the text manually using graphic editing tools afterward**" | A | docs.ideogram.ai text-and-typography page |
| Google claims "legible, stylized text for infographics, menus, diagrams, and marketing assets" - the one vendor asserting typographic competence; the claim is about legibility, not kerning, brand fonts, exact strings or editability | A | Gemini image docs |
| Midjourney's docs make **no claim** about rendering type and list no text parameter. Taught as an absence, not a quote | A (absence) | Parameter List, Version, Style Reference, Edit Model, Omni Reference, ToS all read |
| "Ideogram renders text at 90-95% vs 30-40% for Midjourney" | **C** | no primary benchmark located. **Not stated** |

**Consequence taught as the professional norm:** hand-set HTML or SVG type is the only
version that is spell-correct by construction, re-editable, translatable, selectable,
searchable and accessible. Raster lettering is none of those even when it looks right. So:
generate the picture with all lettering refused, reserve the zone, set every character
yourself.

### Consistency (session 5)

| Technique | What the docs support | The stated limit |
|---|---|---|
| Seed reuse | `--seed` on V8.x | "(99% identical)", not exact |
| Style reference | `--sref` + `--sw 0-1000`, default 100 | style only, "not objects or people" |
| Style codes | `--sref <code>`, `--sref random` | cannot be made from an uploaded image |
| Subject continuity | Edit Model, up to 4 references (V8.1+); `--oref` + `--ow` on V7 | 2x GPU on V7; fine details "may not perfectly match" |
| Other vendors | Gemini per-model reference ceilings; Firefly Strength sliders | OpenAI documents the consistency gap in its own guide |
| LoRA | Diffusers: small adapters "a few hundred MBs" targeting attention projections via PEFT | page flagged "experimental and the API may change"; reference run "~5 hours on a 2080 Ti with 11GB" (Tier A, huggingface.co/docs/diffusers) |

Conclusion the docs support: consistency is a pipeline property (locked reference set, a
named style handle, a recorded seed, a human comparing outputs), not a parameter. No vendor
promises identity-level repeatability and two document the gap.

**The one rights card (session 5).** US Copyright Office, Part 2, 2025-01-29, verbatim:
"prompts do not alone provide sufficient control"; and human authors hold copyright in "the
creative selection, coordination, or arrangement of material in the outputs, or creative
modifications of the outputs." Tier A, the report PDF. Everything else in that territory:
`learn-ai-design` a4 and `learn-ai-media` 06.

### The judgement (session 6)

Performance evidence and trust evidence point in opposite directions, and the course teaches
both without resolving what they have not resolved.

| Finding | Numbers | Tier | Source |
|---|---|---|---|
| NYU and Emory field experiment on the Google Display Network (Lee, Todri, Adamopoulos, Ghose; SSRN 5638311, Oct 2025) | Fully AI-created ads **~19% higher CTR** than expert human ads; AI-modified human ads no better and sometimes worse; **disclosing AI involvement cut CTR by about 31.5%** vs unlabelled human ads | B | the-decoder write-up and SSRN listing; the SSRN PDF 403'd; the 19% is corroborated on the author's NYU Stern page |
| Taboola with Columbia, Harvard, TU Munich, Carnegie Mellon (Jan 2026) | 500M+ impressions, 3M clicks; raw CTR **0.76% vs 0.65%**, "performed comparably when researchers applied the tightest statistical controls"; **AI ads that "did not look like AI" achieved the highest engagement of all groups** | A | taboola.com press release |
| TBWA Australia and Ideally, "The synthetic authorship penalty" (Feb 2026) | ~2,500 respondents, ~3,500 evaluations; fully AI-executed work carries "a clear trust penalty", hybrid "reduces but does not remove" it; **adding an AI watermark "actively erodes trust further"**; video worse than static; high-trust sectors hit hardest; younger consumers equally or more sensitive; one in two suspected AI in human-made ads | A | mi-3.com.au (read in a browser) |
| Nuremberg Institute for Market Decisions, "Transparency without trust" | 1,000 respondents each in US, UK, Germany; 44% aware AI can make marketing content, 25% think they can spot it, 21% trust AI companies, 20% trust AI; labelled ads rated more negatively, especially on emotional appeal; **more accepted for innovative, high-tech products** | A | nim.org |
| Getty Images VisualGPS | ~90% want to know if an image is AI-made; 98% say authentic imagery is pivotal to trust; 76% "can't tell if an image is real"; 7,500 adults per survey, 25 countries, **fielded July 2022 to September 2023**; Getty sells licensed imagery and is litigating against Stability | A | newsroom.gettyimages.com |
| Klaviyo, Fractl, Emplifi, Omneky survey numbers | - | **C** | single snippets; **not stated** |

**How the pages state it.** The measured click premium exists only while the audience does
not know. The measured trust penalty exists once they do, and the watermark makes it worse.
Regulation (`learn-ai-media` 06 owns the dates) is pushing detection toward default. So a
strategy built on the premium has an expiry date, and the pro-AI evidence arrives at the
same conclusion from its own side: the work that wins is work that does not read as AI
because it was art-directed and finished by a person. That is a case for craft, not volume.

---

## The bench (`assets/il-live.js`)

An illustration brief goes in. Every number is counted in the text against a fixed lexicon
the learner can read in the source. Nothing is generated; the bench sees what the model
sees, which is the words.

### What is measured

| Metric | How |
|---|---|
| Concrete anchors | Colour words, light words, placement words, material words from four lists, plus numbers (8, 4 and 16 excluded as resolution tokens) and capitalised proper nouns |
| Style words, families | Matches against ten style families (flat, photo, paint, dense, quiet, loud, vibe, hype, era, medium), longest entries first, each match consumed once |
| Style conflicts | Pairs of present families on a fixed list of six contradictions (flat vs photo, flat vs paint, paint vs photo, dense vs quiet, quiet vs loud, flat vs dense) |
| Lettering requested | Characters inside quotation marks, plus a count of lettering words (title, headline, says, typography...) outside any refusal clause |
| Lettering refused | An explicit no-text clause present |
| Type zone reserved | A negative-space or room-for-the-headline clause present |
| Ratio stated | An aspect ratio, `--ar`, or a format word |
| Reference handles | `--sref`, style reference, reference set, named assets, seeds |

### What is a heuristic

The verdict, labelled "heuristic". Rules, in order: nothing briefed; lettering requested
(quoted characters, or lettering words with no refusal); two or more conflicts; one
conflict; under three anchors; more than six style words; five or more anchors with refusal
and zone (good, "wired to the kit" if references present); five or more anchors otherwise.

### The six presets

| id | Label | What it is |
|---|---|---|
| `first` | The first prompt | Quality words and nothing about the picture |
| `concept` | Concept before art | Subject, setting, light, palette, one style, a ratio |
| `spelled` | With the title spelled in | The concept brief plus "Autumn Roast" in lettering |
| `refused` | Lettering refused, zone reserved | The concept brief plus the two lines that keep type out and make room for it |
| `stacked` | **ANTI** More style words | The concept brief with fourteen style words bolted on |
| `kit` | Wired to the reference kit | The refused brief plus reference set, style weight, named asset, recorded seed |

### Verified ladder

Derived headlessly (Playwright) on 2026-09-19 via `window.IL_LIVE`, before any page quoted
it.

| Preset | Words | Anchors | Style words | Conflicts | Lettering | Refused | Zone | Refs | Verdict (heuristic) |
|---|---|---|---|---|---|---|---|---|---|
| The first prompt | 14 | **0** | 7 | 0 | 0 | no | no | 0 | Pretty, but whose? Nothing here is a picture yet |
| Concept before art | 60 | **15** | 2 | 0 | 0 | no | no | 0 | A real picture, with no plan for the type |
| With the title spelled in | 70 | 16 | 3 | 0 | **11 chars** | no | no | 0 | Asks the model to spell: 11 characters it cannot be trusted with |
| Lettering refused, zone reserved | 85 | 16 | 2 | 0 | 0 | **yes** | **yes** | 0 | Concept before art, type kept out |
| **ANTI** More style words | 79 | 15 | **16** | **4** | 0 | no | no | 0 | Style words at war: 4 contradictions |
| Wired to the reference kit | 113 | 22 | 2 | 0 | 0 | yes | yes | **4** | Concept before art, and wired to the kit |

Three rows carry the session's hardest lessons:

- **Seven style words and zero anchors is not a brief.** The first prompt has more quality
  words than the kit brief and describes no object, no light, no place.
- **Eleven characters is enough to fail.** The title request adds one line and turns a good
  brief into the one thing the encoder cannot do.
- **More style words made it worse, measurably.** The anti-preset keeps every anchor from
  the concept brief and adds fourteen adjectives; four of them contradict each other
  (flat against photo, flat against paint, paint against photo, flat against dense). The
  picture did not get richer. The instruction got incoherent.

### Honest limits

- **The brief, not the image.** A perfect brief can still produce a bad picture, and the
  bench will not know. It measures the one input a person fully controls.
- **Lexicon-based.** A style word not on the list is not counted; a colour not on the list is
  not an anchor. The lists are in the source and the learner can read them.
- **Anchors are counted, not judged.** Twenty anchors that contradict each other still count
  as twenty.
- **The verdict is a rule of thumb** and says so.

---

## Design system

| Token | Value | Role |
|---|---|---|
| `--indigo` | `#4C3F91` | Violet accent, page chrome |
| `--indigo-deep` | `#352B6B` | Headings |
| `--indigo-mid` | `#5F52A8` | Agenda band 2 (white text, 6.44:1) |
| `--amber` | `#C2492F` | Coral flagship: measured badges, agenda band 3 (white text, 4.90:1) |
| `--ink` | `#1F1B33` | Body text |
| `--paper` | `#FBFAFD` | Surface |

Every colour recomputed against this palette on scaffold day from the mind-mapping donor.
Body line-height 1.85. Attribution "by Phoebe Fu". Hyphens only. `?v=` bumped on every
css/js change. **No raster anywhere in the repo except the generated social card**, which
is drawn from this palette by the estate's card script.

---

## Volatile facts (re-verify before delivery)

Midjourney's default version and parameter set (three defaults in fifteen months); every
model id named above; Google's text-rendering claim; both ToS effective dates (Midjourney
2026-05-27, OpenAI 2026-01-01); the Andersen v Stability trial reportedly under way from
2026-09-08; Getty v Stability in both jurisdictions; USCO Part 3 still pre-publication;
C2PA 2.4 (April 2026). The pages carry dates on every one of these.

## Not covered, by design

- Tool tutorials, UI tours, subscription-tier shopping. Parameters appear only as evidence
  about where control lives.
- Raster generation in the course artefacts. No generated images, no prompt gallery.
- A LoRA or fine-tuning lab. LoRA is a decision with a cost, not a workshop.
- Video, animation, 3D. `--motion`, `--loop` and every video model are out of scope.
- Editing-suite craft (Photoshop, Illustrator, Figma technique).
- Legal advice, disclosure regimes beyond the pointer, non-US/UK/EU jurisdictions. Owned by
  the sibling pages named above.
- Model benchmarking and text-accuracy leaderboards. The one widely quoted comparison could
  not be verified and is excluded rather than repeated.
- Accessibility beyond the one-line consequence of hand-set type.

## Fetched sources appendix

Vendor docs: Midjourney Parameter List, Version, Style Reference, Edit Model (old
Character-Reference slug), Omni Reference, Aspect Ratio, Terms of Service; Google Gemini
image generation; OpenAI image guide, content provenance guide, Terms of Use; Ideogram
text-and-typography, available models, licensing; Adobe Firefly style reference and
composition reference pages; Adobe Firefly FAQ (questions visible, answers gated).

Research: arXiv 2212.10562; arXiv 2403.09622; huggingface.co/docs/diffusers LoRA training.

Policy: copyright.gov/ai and the Part 2 report PDF; scotusblog.com Thaler v Perlmutter;
judiciary.uk Getty v Stability; bakerlaw.com Andersen tracker; the Commission's Article 50
FAQ; artificialintelligenceact.eu Article 50; spec.c2pa.org 2.4.

Evidence: taboola.com press release; the-decoder.com on the NYU/Emory study; mi-3.com.au on
TBWA/Ideally; nim.org "Transparency without trust"; newsroom.gettyimages.com VisualGPS.

Failed and not retried blind: plain fetches of docs.midjourney.com, helpx.adobe.com and
openai.com/policies (browser works); business.adobe.com (timeout); the SSRN PDF (403);
emarketer (503); the old Midjourney Style Reference article id 32084119602317 (dead; the
live id is 32180011136653 - old Midjourney doc URLs rot).
