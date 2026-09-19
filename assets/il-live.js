/* il-live.js - the brief bench for learn-ai-illustration-with-phoebe.
 *
 * An illustration brief goes in and every number the bench reports is computed from
 * the words of that brief. Nothing is generated: this course ships no raster images,
 * and the bench cannot see one. What it can see is the thing a generator sees, which
 * is the text, and the text is where the recurring failures live: style words that
 * contradict each other, lettering the model is asked to spell, a subject with nothing
 * concrete to anchor it, and no room left for the type that will be set by hand.
 *
 * Two kinds of number, and the widget labels each one:
 *   measured  - counted in the brief against a fixed lexicon you can read below
 *   heuristic - the one-line verdict, which is a rule of thumb and says so
 *
 * Public API (window.IL_LIVE) exists so the course map and the session pages can be
 * verified against a live browser rather than against my memory of one.
 */
(function () {
  "use strict";

  /* ---------- the lexicon --------------------------------------------- */
  /* Style words, grouped into families. Two families in the CONFLICTS list appearing
     in one brief count as a conflict. Multi-word entries are matched first. */
  var FAMILIES = {
    flat:    ["flat vector", "flat illustration", "flat design", "vector", "line art", "lineart", "minimalist", "minimal", "clean lines", "geometric", "corporate memphis", "isometric", "low poly", "pixel art", "voxel"],
    photo:   ["photorealistic", "photo-realistic", "hyperrealistic", "hyper-realistic", "photoreal", "8k", "4k", "16k", "hdr", "bokeh", "film grain", "35mm", "50mm", "dslr", "raw photo", "octane", "octane render", "unreal engine", "ray tracing", "ray-traced", "3d render", "cinematic"],
    paint:   ["watercolor", "watercolour", "gouache", "oil painting", "oil on canvas", "acrylic", "charcoal", "pencil sketch", "ink wash", "impressionist", "brush strokes", "painterly"],
    dense:   ["highly detailed", "ultra detailed", "ultra-detailed", "intricate", "maximalist", "ornate", "baroque", "busy"],
    quiet:   ["pastel", "muted", "soft palette", "understated", "calm", "airy"],
    loud:    ["neon", "vibrant", "saturated", "high contrast", "bold colours", "bold colors", "psychedelic"],
    vibe:    ["dreamy", "ethereal", "moody", "gritty", "whimsical", "playful", "elegant", "luxury", "premium", "surreal", "noir", "nostalgic", "epic"],
    hype:    ["trending on artstation", "artstation", "masterpiece", "award winning", "award-winning", "best quality", "highly aesthetic", "stunning", "beautiful", "gorgeous", "amazing"],
    era:     ["vintage", "retro", "mid-century", "art deco", "bauhaus", "swiss style", "y2k", "vaporwave", "cyberpunk", "steampunk", "futuristic"],
    medium:  ["risograph", "screen print", "screenprint", "woodcut", "linocut", "paper cut", "papercut", "collage", "halftone", "claymation", "storybook", "children's book", "comic", "cartoon", "anime", "manga", "ukiyo-e", "pixar", "ghibli", "disney", "hand drawn", "hand-drawn", "digital painting", "concept art", "matte painting", "editorial illustration", "illustration", "sketch"]
  };
  var CONFLICTS = [["flat", "photo"], ["flat", "paint"], ["paint", "photo"], ["dense", "quiet"], ["quiet", "loud"], ["flat", "dense"]];

  var ANCHORS = {
    colour:   ["amber", "burnt orange", "burnt-orange", "ochre", "cream", "ivory", "charcoal grey", "charcoal gray", "navy", "teal", "olive", "rust", "terracotta", "black", "white", "brown", "green", "red", "blue", "yellow", "grey", "gray", "orange", "pink", "purple", "gold", "copper"],
    light:    ["morning light", "window light", "side light", "backlit", "back-lit", "golden hour", "overcast", "soft shadow", "hard shadow", "from the left", "from the right", "from above", "top light", "rim light"],
    place:    ["foreground", "background", "left third", "right third", "upper third", "lower third", "centre", "center", "off-centre", "off-center", "beside", "in front of", "behind", "on the left", "on the right", "at the top", "at the bottom", "rule of thirds", "close-up", "close up", "wide shot", "eye level", "from above", "three-quarter", "three quarter"],
    material: ["ceramic", "oak", "walnut", "linen", "kraft paper", "kraft", "glass", "steel", "brass", "wool", "concrete", "marble", "paper grain", "grain of the paper"]
  };

  var LETTER_VERBS = /\b(text|title|headline|caption|label|logo text|wordmark|typography|lettering|letters|words|reads|reading|says|saying|written|write|spell|font|typeface|slogan|tagline|banner text|sign that says|signage)\b/gi;
  var REFUSAL = /\b(no (text|lettering|letters|words|typography|type|writing|logo|logos|labels|captions|signage)|without (any )?(text|lettering|words|typography|writing)|all lettering refused|lettering refused|text[- ]free|typeless|nothing written)\b/i;
  var ZONE = /\b(negative space|empty space|clear space|quiet space|copy space|type zone|room for (the )?(headline|type|text|copy|title)|leave .{0,30}(blank|empty|clear)|keep .{0,30}(blank|empty|clear))\b/i;
  var RATIO = /(\b\d{1,2}:\d{1,2}\b|--ar\b|aspect ratio|landscape format|portrait format|square format)/i;
  var REFS = /(--sref|--oref|--cref|--sw\b|style reference|style ref\b|reference image|reference set|ref set|reference kit|moodboard|mood board|match (the |our )?(reference|previous|earlier|first) |same (mug|counter|light|character|palette|style) as|as in asset|seed \d|--seed)/gi;

  /* ---------- the briefs ---------------------------------------------- */
  /* Daybreak, the coffee subscription company from the sibling courses. One asset: the
     hero image for the autumn roast launch email. Five briefs for it. */
  var PRESETS = [
    { id: "first", label: "The first prompt",
      note: "What most people type. Every word is about quality and none is about the picture.",
      text: "A beautiful coffee illustration, autumn vibes, trending on artstation, masterpiece, highly detailed, 8k, stunning" },

    { id: "concept", label: "Concept before art",
      note: "A subject, a setting, a light, a palette, one style, a ratio. The picture exists before the style words arrive.",
      text: "Daybreak autumn roast, hero image for the launch email. A ceramic mug of black coffee on a worn oak counter, steam rising. Three roasted beans and one green Guji bean beside the mug. Morning light from a window on the left. Palette: warm amber, burnt orange, cream. Flat vector illustration with the grain of the paper showing. 3:2 landscape format." },

    { id: "spelled", label: "With the title spelled in",
      note: "The concept brief plus the one request everybody makes. Eleven characters the model has to get right.",
      text: "Daybreak autumn roast, hero image for the launch email. A ceramic mug of black coffee on a worn oak counter, steam rising. Three roasted beans and one green Guji bean beside the mug. Morning light from a window on the left. Palette: warm amber, burnt orange, cream. Flat vector illustration with the grain of the paper showing. The title \"Autumn Roast\" in elegant lettering across the top. 3:2 landscape format." },

    { id: "refused", label: "Lettering refused, zone reserved",
      note: "The same picture, with the two lines that keep the type out of the model and make room for it in the layout.",
      text: "Daybreak autumn roast, hero image for the launch email. A ceramic mug of black coffee on a worn oak counter, steam rising. Three roasted beans and one green Guji bean beside the mug. Morning light from a window on the left. Palette: warm amber, burnt orange, cream. Flat vector illustration with the grain of the paper showing. 3:2 landscape format. No text, no lettering, no logo anywhere in the image. Keep the upper third as quiet negative space; the headline is set later in HTML." },

    { id: "stacked", label: "More style words", anti: true,
      note: "The concept brief with every word from the prompt guides bolted on. It feels safer. Watch the conflicts.",
      text: "Daybreak autumn roast, hero image for the launch email. A ceramic mug of black coffee on a worn oak counter, steam rising. Three roasted beans and one green Guji bean beside the mug. Morning light from a window on the left. Palette: warm amber, burnt orange, cream. Flat vector illustration with the grain of the paper showing, cinematic, photorealistic, hyperrealistic, watercolor, 8k, octane render, dreamy, gritty, minimalist, highly detailed, intricate, trending on artstation, award winning, masterpiece. 3:2 landscape format." },

    { id: "kit", label: "Wired to the reference kit",
      note: "The refused brief plus the handles that make the next nine assets match this one.",
      text: "Daybreak autumn roast, hero image for the launch email. A ceramic mug of black coffee on a worn oak counter, steam rising. Three roasted beans and one green Guji bean beside the mug. Morning light from a window on the left. Palette: warm amber, burnt orange, cream. Flat vector illustration with the grain of the paper showing. 3:2 landscape format. No text, no lettering, no logo anywhere in the image. Keep the upper third as quiet negative space; the headline is set later in HTML. Style reference: Daybreak reference set DB-01 to DB-04, style weight 100. Same mug, same counter, same light as in asset DB-01. Seed 4471 recorded; expect near-identical, not identical." }
  ];

  /* ---------- text tools ---------------------------------------------- */
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function norm(s) { return " " + s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9:'\-%\s"]+/g, " ").replace(/\s+/g, " ") + " "; }

  /* Count entries of a family in the text, longest entries first, consuming matches so
     "flat vector" is not also counted as "vector". Returns [count, remaining text]. */
  function countFamily(text, list) {
    var n = 0, t = text;
    list.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (w) {
      var re = new RegExp("(^|[^a-z0-9])" + w.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "(?=[^a-z0-9]|$)", "g");
      t = t.replace(re, function (m, pre) { n++; return pre + " #"; });
    });
    return [n, t];
  }

  function measure() {
    var raw = ta.value;
    var text = norm(raw);
    var words = raw.trim() ? raw.trim().split(/\s+/).length : 0;

    var styleCount = 0, present = {}, t = text;
    Object.keys(FAMILIES).forEach(function (f) {
      var r = countFamily(t, FAMILIES[f]); t = r[1];
      if (r[0]) { present[f] = r[0]; styleCount += r[0]; }
    });
    var conflicts = CONFLICTS.filter(function (p) { return present[p[0]] && present[p[1]]; });

    var anchors = 0, t2 = text, anchorKinds = 0;
    Object.keys(ANCHORS).forEach(function (k) {
      var r = countFamily(t2, ANCHORS[k]); t2 = r[1];
      if (r[0]) { anchors += r[0]; anchorKinds++; }
    });
    var numbers = (raw.match(/\b\d+(\.\d+)?\b/g) || []).filter(function (n) { return !/^(8|4|16)$/.test(n); }).length;
    var proper = (raw.match(/(?:^|[.!?]\s+|,\s+|\s)([A-Z][a-z]{2,})/g) || []).map(function (m) { return m.trim().replace(/^[.!?,]\s*/, ""); })
      .filter(function (w) { return !/^(The|And|But|With|For|From|Then|Keep|Same|Style|Seed|Palette|Flat|Morning|Three|Expect)$/.test(w); }).length;
    anchors += numbers + proper;

    var quoted = (raw.match(/"([^"]{1,80})"|“([^”]{1,80})”/g) || []).map(function (q) { return q.replace(/^["“]|["”]$/g, ""); });
    var letterChars = quoted.reduce(function (a, q) { return a + q.replace(/\s/g, "").length; }, 0);
    var letterVerbs = (raw.replace(REFUSAL, "").match(LETTER_VERBS) || []).length;
    var refused = REFUSAL.test(raw);
    var zone = ZONE.test(raw);
    var ratio = RATIO.test(raw);
    var refs = (raw.match(REFS) || []).length;

    out = {
      words: words, style: styleCount, families: Object.keys(present).length, conflicts: conflicts.length,
      conflictPairs: conflicts.map(function (p) { return p[0] + " vs " + p[1]; }),
      anchors: anchors, anchorKinds: anchorKinds,
      letterChars: letterChars, letterVerbs: letterVerbs, refused: refused, zone: zone, ratio: ratio, refs: refs,
      styleShare: words ? Math.round(100 * styleCount / words) : 0
    };
    render();
  }

  function grade() {
    if (out.words === 0) return ["bad", "Nothing briefed yet"];
    if (out.letterChars > 0 || (out.letterVerbs > 0 && !out.refused)) return ["bad", "Asks the model to spell: " + (out.letterChars ? out.letterChars + " characters" : out.letterVerbs + (out.letterVerbs === 1 ? " lettering word" : " lettering words")) + " it cannot be trusted with"];
    if (out.conflicts >= 2) return ["bad", "Style words at war: " + out.conflicts + " contradictions"];
    if (out.conflicts === 1) return ["ok", "One pair of style words contradicts itself"];
    if (out.anchors < 3) return ["bad", "Pretty, but whose? Nothing here is a picture yet"];
    if (out.style > 6) return ["ok", "Stacked: " + out.style + " style words is a mood board, not a brief"];
    if (out.anchors >= 5 && out.refused && out.zone) return ["good", out.refs ? "Concept before art, and wired to the kit" : "Concept before art, type kept out"];
    if (out.anchors >= 5 && !out.refused) return ["ok", "A real picture, with no plan for the type"];
    if (out.anchors >= 5) return ["ok", "Type kept out, no room made for it"];
    return ["ok", "Getting concrete"];
  }

  function metric(label, value, unit, kind) {
    return '<div class="mb-metric"><span class="mb-mlabel">' + label + "</span>" +
           '<span class="mb-mvalue">' + value + "</span>" +
           '<span class="mb-munit">' + unit + "</span>" +
           '<span class="mb-mkind is-' + kind + '">' + kind + "</span></div>";
  }
  function yn(b) { return b ? "yes" : "no"; }

  function render() {
    var g = grade();
    readout.innerHTML =
      '<div class="mb-verdict is-' + g[0] + '">' + esc(g[1]) + ' <span class="mb-mkind is-heuristic">heuristic</span></div>' +
      '<div class="mb-metrics">' +
        metric("Concrete anchors", out.anchors, out.anchorKinds + " kinds: colour, light, place, material, numbers, names", "measured") +
        metric("Style words", out.style, out.families + " families, " + out.styleShare + "% of the brief", "measured") +
        metric("Style conflicts", out.conflicts, out.conflictPairs.length ? out.conflictPairs.join(", ") : "families that contradict", "measured") +
        metric("Lettering requested", out.letterChars ? out.letterChars + " chars" : out.letterVerbs, out.letterChars ? "inside quotes, for the model to spell" : "lettering words, none quoted", "measured") +
        metric("Lettering refused", yn(out.refused), "an explicit no-text line", "measured") +
        metric("Type zone reserved", yn(out.zone), "room left for hand-set type", "measured") +
        metric("Ratio stated", yn(out.ratio), "the layout knows its shape", "measured") +
        metric("Reference handles", out.refs, "style refs, seeds, named assets", "measured") +
      "</div>";
  }

  /* ---------- wiring -------------------------------------------------- */
  var root, ta, readout, presetBtns = {}, current = null, timer = null, out = {};

  function setText(text, presetId) {
    ta.value = text;
    current = presetId || null;
    Object.keys(presetBtns).forEach(function (id) {
      presetBtns[id].classList.toggle("is-on", id === current);
      presetBtns[id].querySelector("input").checked = (id === current);
    });
    measure();
  }
  function setPreset(id) {
    var p = PRESETS.filter(function (x) { return x.id === id; })[0];
    if (p) setText(p.text, id);
  }

  function build() {
    var panel = document.createElement("div");
    panel.className = "mb-presets";
    PRESETS.forEach(function (p) {
      var lab = document.createElement("label");
      lab.className = "mb-preset" + (p.anti ? " is-anti" : "");
      lab.innerHTML = '<input type="radio" name="mb-preset" value="' + p.id + '">' +
        '<span class="mb-pname">' + esc(p.label) +
        (p.anti ? ' <em class="mb-anti">the one that feels safer</em>' : "") + "</span>" +
        '<span class="mb-pnote">' + esc(p.note) + "</span>";
      panel.appendChild(lab);
      presetBtns[p.id] = lab;
      lab.querySelector("input").addEventListener("change", function () { setPreset(p.id); });
    });

    var edit = document.createElement("div");
    edit.className = "mb-edit";
    edit.innerHTML = '<label for="il-brief">The brief - edit it, the numbers follow</label>' +
      '<textarea id="il-brief" spellcheck="false"></textarea>' +
      '<span class="mb-hint">Counted against a fixed lexicon of style families, anchors and lettering words. Paste any prompt you have actually used.</span>';
    ta = edit.querySelector("textarea");
    ta.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        current = null;
        Object.keys(presetBtns).forEach(function (id) {
          presetBtns[id].classList.remove("is-on");
          presetBtns[id].querySelector("input").checked = false;
        });
        measure();
      }, 160);
    });

    readout = document.createElement("div");
    readout.className = "mb-readout";

    root.appendChild(panel);
    root.appendChild(edit);
    root.appendChild(readout);
    setPreset("first");
  }

  function init() {
    root = document.getElementById("brief-bench");
    if (!root) return;
    build();
    window.IL_LIVE = {
      presets: PRESETS.map(function (p) { return p.id; }),
      preset: setPreset,
      set: function (text) { setText(text, null); },
      get text() { return ta.value; },
      get current() { return current; },
      get metrics() { return out; },
      families: Object.keys(FAMILIES),
      conflicts: CONFLICTS.map(function (p) { return p.join(" vs "); })
    };
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
