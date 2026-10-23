# AIS Mobile App Release — Storyboard v1

**Format:** 1920×1080 | 30 seconds | 30fps
**Audio:** Music bed only (no VO for v1) — reused from `aisoc-hype/assets/music.mp3` (Epic Inspirational Hip-Hop, Infraction, No Copyright)
**Built with:** Hyperframes + HTML/CSS/GSAP

---

## Color & Style Direction

**Brand-locked palette, varied motion languages.** Unlike HeyGen's launch where each beat got its own palette, AIS brand is strict — navy `#07121c`, surface `#0d2031`, cyan accent `#37bdf8`, orange warn `#f09025`, white text. Typography is always Montserrat (display) + Roboto Mono (UI labels/numbers). What varies per beat is the **motion vocabulary** (grid pulse · kinetic type · 3D phone · floating triptych · card slam · CTA slam), not the color/font choice.

**Global guardrails:**
- Dark-mode default. Navy `#07121c` base, cyan `#37bdf8` for highlights, orange `#f09025` used sparingly for critical contrast only.
- Every scene has at least one localized radial glow around the focal element (contrast-first technique — see memory `feedback_contrast_technique.md`).
- Grain overlay runs top-layer throughout. No flat backgrounds.
- Kinetic-typography discipline: every headline enters via per-word stagger (0.06–0.1s per word), exits via transition, never `opacity: 0` set manually.
- Motion must be visible at 30fps — if it looks static on the first render, crank amplitude 2×.

---

## Underscore Direction

30s hip-hop/electronic bed with driving forward motion. Already playing when the video starts (no silence-to-sound transition). Full volume by 1s, ducks to ~0.55 during the X post and Instagram beats (18.0–26.5s) so the social-card animations breathe. Fades last 1.5s. Reuse: `aisoc-hype/assets/music.mp3` if the license permits; otherwise Nate sources a new track.

**Optional SFX beds (add if time allows):**
- 0.15s whoosh at t=5.7 (flash transition into reveal)
- 0.2s impact at t=9.0 (headline slam "AIS. NOW MOBILE.")
- 0.15s UI pop at t=20.2 (x-post like animation)
- 0.2s chime at t=28.5 (shimmer sweep on outro)

---

## Beat-by-Beat

---

### BEAT 1 — HOOK (0.0–3.0s)

**Concept:** System-boot energy. Telemetry comes alive. Member count lands as the authority statement.

**Visual elements:**
- AIS logo fades in at center-ish (40% canvas), scale from 0.8 → 1.0 over 0.6s with `expo.out` ease. Cyan glow ramps `drop-shadow(0 0 20px → 0 0 80px rgba(55,189,248,0.8))` in parallel.
- Corner telemetry tickers stream in letter-by-letter (Roboto Mono 18px, dim #96a2b6):
  - TL: `SYS.INIT · READY`
  - TR: `UPTIME · 1,100/day`
  - BL: `v0.1.0-release`
  - BR: `MEMBERS · 332,600`
- Headline lands at t=1.2s: "332,600 BUILDERS." Montserrat 900, 140px, white, letter-spacing −0.02em. Per-word stagger (0.08s).
- Scan-beam SVG passes once left→right across canvas (t=1.8s, 0.8s duration, `power2.inOut`).

**Motion language:** Boot-up — sequential element initialization. Think Bloomberg terminal coming online.

**Eases used:** `expo.out`, `power4.out`, `power2.inOut`. (3 distinct)

**Exit:** No explicit exit — handled by scene transition in root (fade + scale 1.05).

---

### BEAT 2 — TEASE (2.7–6.0s) — overlaps Beat 1 by 0.3s

**Concept:** The hook evolves from "big community" to "something is coming." Tease without reveal.

**Visual elements:**
- Headline morphs (new text drops in, old fades up-out): "WE BUILT SOMETHING BIG." Montserrat 900, 120px. Centered.
- Below the headline, 4 data pills animate in sequence (Roboto Mono 24px, cyan border, navy fill, stagger 0.15s): `BUILD` · `SHIP` · `GET PAID` · `NOW PORTABLE`. The last pill glows when it lands (t=5.0s).
- Phone silhouette (SVG outline, 480px tall, 2px cyan stroke, 40% opacity) drifts in from the right edge toward center over 2s, `power1.out`. Stays semi-transparent — a hint, not the reveal.
- Grain overlay opacity pulses 8% → 12% → 8% over the scene.

**Motion language:** Editorial build — stacked pills reading like a headline sub-deck. Phone silhouette as visual foreshadowing.

**Eases used:** `power3.out` (headline), `back.out(1.4)` (pills), `power1.out` (phone drift). (3 distinct)

**Exit:** `flash-through-white` feel — an overlay white rect goes `0 → 1 → 0` over 0.6s centered on scene seam (5.7–6.3s), handled at root level.

---

### BEAT 3 — REVEAL (6.0–12.0s) ★ SIGNATURE MOMENT

**Concept:** The app arrives. Camera-like 3D phone rotation brings the AIS-branded dashboard into frame. Headline slams: "AIS. NOW MOBILE."

**Visual elements:**

*Phones stage:*
- A single stylized iPhone (360×780px portrait, 48px border-radius, 12px navy bezel, drop-shadow) rotates in from 3D space: start `{ rotationY: 85, rotationX: 18, scale: 0.4, opacity: 0 }`, end `{ rotationY: 0, rotationX: 0, scale: 1, opacity: 1 }` over 2s, `expo.out`.
- Phone positioned slightly right of center (x: +240px from center) to leave room for the incoming headline on the left.
- Phone screen content (all AIS-branded):
  - Top status bar: Roboto Mono 14px `9:41 · AIS`
  - App header: "AIS" wordmark (cyan), subtitle "Master AI Automation" Roboto Mono 14px dim.
  - Active tab indicator on `Calls` (cyan underline).
  - Pinned card: navy surface, cyan border-top 4px, text: "NEXT LIVE CALL" Roboto Mono 12px, then big "23:14" Montserrat 900 48px white, then "Workflow Design · Nate Herk" Roboto Mono 12px dim. Card has pulse-glow (cyan box-shadow 0 0 20px pulsing 3s sine).
  - Stat row (3 stats, Roboto Mono):
    - `DAILY ACTIVE · 1,100`
    - `WINS · 300+`
    - `LIVE CALLS/WK · 5`
  - Nav tabs bottom: Calls · Wins · Courses · Leaderboard (Roboto Mono 14px, active cyan).
- Phone gets a localized radial glow bed (cyan, 200px radius, opacity 0.4, behind phone).

*Headline:*
- At t=8.5s (phone settled ~6.5s), headline slams in from left:
  - "AIS." Montserrat 900, 200px, white (t=8.5s, `expo.out` 0.5s)
  - "NOW MOBILE." Montserrat 900, 140px, cyan (t=9.0s, `expo.out` 0.5s)
  - Two lines stacked on the left third of canvas.
- Chromatic-radial-split overlay burst at the slam instant (t=9.0s, 0.3s duration, subtle RGB split).

*Decorative:*
- Faint circuit-trace SVG lines emit from behind phone, animating `stroke-dasharray` reveal.
- Background drifts: subtle parallax shift of ambient grid (scene wrapper: `x: 0 → -20` over 6s linear).

**Motion language:** Cinematic 3D reveal — the camera "finds" the phone in space, then the headline punches in separately.

**Eases used:** `expo.out` (rotate), `power4.out` (headline), `sine.inOut` (pulse), `power2.out` (circuit stroke). (4 distinct)

**Exit:** Held — transition handled by the next scene's cross-in at t=12.0s.

---

### BEAT 4 — APP SHOWCASE (12.0–18.0s)

**Concept:** Three features, three phones, one triptych. Shows the depth of the app offering.

**Visual elements:**
- Three phones in a triptych, each 280×608 (smaller than Beat 3's hero phone):
  - **Left phone** (x: -520, rotationY: +15): screen shows **Live Calls grid** — 4 tiles with speaker names (Nate Herk, Julien D, Anne W, Luca R), cyan "● LIVE" pill pulsing on tile 1.
  - **Center phone** (x: 0, rotationY: 0, scale: 1.05 — slightly forward): screen shows **Community Wins feed** — 3 stacked cards with avatar placeholders + achievement chips: "$6K/mo client · Marcus", "First deploy · Ravi", "10→10 automated · Zoë".
  - **Right phone** (x: +520, rotationY: -15): screen shows **Leaderboard** — ranked list:
    - 1. Julien D · $50 ← gold pill (use `--ais-warn` orange)
    - 2. Jamie K · $25
    - 3. Ravi S · $15
    - 4–6. other names dim.
- Phones enter via rotationY stagger: start rotationY ±90, opacity 0. Settle to final rotationY, `expo.out`, 1.2s, stagger 0.15s.
- Continuous float: y oscillates ±8px over 3s sine loop (phase-offset 1s between phones so they don't move in sync).
- **Label toppers** above each phone (Roboto Mono 22px, cyan, uppercase):
  - `LIVE CALLS`
  - `COMMUNITY WINS`
  - `LEADERBOARD`
  - Enter: `y: -20 → 0, opacity: 0 → 1, power2.out` staggered with phones (offset +0.3s after phone).
- **Section headline top-center** at t=12.5s: "EVERYTHING. IN YOUR POCKET." Montserrat 700, 52px, white, letter-spacing 0.05em.

**Motion language:** Editorial triptych — multiple simultaneous elements, stagger discipline to prevent visual soup. The center phone reads as "hero," flankers support.

**Eases used:** `expo.out` (phones in), `power2.out` (labels), `sine.inOut` (float loop), `back.out(1.2)` (headline). (4 distinct)

**Exit:** `whip-pan` feel — whole scene translates `xPercent: -40` with motion blur filter rising 0 → 8px over 0.5s at t=17.7. Handled at root level.

---

### BEAT 5 — X POST (18.0–22.5s)

**Concept:** Social proof — the community is buzzing. Fake X post from Nate announcing the drop.

**Visual elements (from installed `x-post` block, customized):**
- Card centered via block's default positioning (880px wide on 1920 canvas).
- Display name: "Nate Herk"
- Handle: `@nateherk`
- Avatar: stylized AIS monogram glyph (replace the default SVG placeholder — use a cyan-filled circle with white "AIS" text inside)
- Post body: "The AIS app just dropped. 332K builders. Now in your pocket. 🚀 Master AI automation anywhere. → aiautomationsociety.ai"
- Timestamp: "3:00 PM · Apr 17, 2026"
- Engagement metrics (counts at card entry — bumped from defaults to feel more hype):
  - Replies: 482
  - Reposts: 2.3K (ticks to 2.4K during card stay)
  - Likes: 18.7K (ticks to 18.8K on like animation)
  - Views: 420K
- Host wrapper (scene5-xpost.html) applies a subtle navy-tinted gradient mask that dims ambient-bg to ~0.3 opacity behind the card for legibility.

**Motion language:** Social card slide-in with interactive element — leverages block's built-in slide + like animation.

**Eases used:** block-provided (`power3.out`, `elastic.out`).

**Exit:** block slides card out bottom at t=22.2; transitions-push (left) handled at root for scene seam.

---

### BEAT 6 — INSTAGRAM FOLLOW (22.5–26.5s)

**Concept:** Primary social CTA. "Follow @aiautomationsociety for updates." Instagram-styled card as phone-aspect inset on landscape canvas.

**Visual elements:**
- Scene6 host is 1920×1080 AIS-branded:
  - Left 55% of canvas: AIS content side.
    - Headline: "FOLLOW FOR UPDATES" Montserrat 900, 100px, white, letter-spacing 0.02em. Per-word stagger in at scene start.
    - Sub-line: "@aiautomationsociety" Roboto Mono 36px, cyan.
    - Cyan accent line drawing under sub-line (SVG stroke reveal, 0.6s).
  - Right 45% of canvas: Instagram block embedded.
- Instagram block: wrapped in a phone-aspect frame. The block is native 1080×1920 — we include it in scene6 as a sub-composition at scale ~0.42, positioned within a decorative phone bezel (navy 12px border, 48px border-radius, cyan 200px radial glow bed behind).
- Block customization (edit `compositions/instagram-follow.html`):
  - Display name: "AI Automation Society"
  - Handle: `@aiautomationsociety`
  - Follower count: "332K followers"
  - Avatar: replace `assets/avatar.jpg` → use `AIS Logo PNG.png` with object-fit: contain and a navy background so the italic AIS wordmark reads inside the circle.

**Motion language:** Split-screen editorial — headline on one side, interactive card on the other. Card animation provided by block.

**Eases used:** headline per-word `power4.out`, accent stroke `power2.inOut`, IG card block-provided. (3 distinct — counting block's internal ones)

**Exit:** handled by transition to outro (scene7 cross-in).

---

### BEAT 7 — OUTRO (26.5–30.0s)

**Concept:** Brand close. AIS logo lockup + "COMING SOON" + URL pill.

**Visual elements:**
- Full-bleed navy. Radial cyan glow (400px radius, opacity 0.35) centered behind logo.
- AIS logo slams to center: start `{ scale: 1.4, opacity: 0, filter: blur(8px) }`, end `{ scale: 1, opacity: 1, filter: blur(0) }` over 0.5s, `back.out(1.7)`. Logo is 320px tall.
- Heavy glow on logo: `drop-shadow(0 0 60px rgba(3, 7, 255, 0.75)) drop-shadow(0 0 120px rgba(55, 189, 248, 0.5))`.
- Below logo: "COMING SOON" Montserrat 900, 92px, white, letter-spacing 0.12em. Per-word stagger in (t=27.2s, 0.1s stagger, `power4.out`).
- Below "COMING SOON": Roboto Mono URL pill:
  - Container: 540px × 68px rounded pill, navy bg, 1px cyan border, cyan box-shadow glow.
  - Content: "▸ AIAUTOMATIONSOCIETY.AI" Roboto Mono 32px white, with a blinking cursor glyph (`|` at 1Hz).
  - Enters at t=27.8s: scale 0 → 1, `back.out(1.5)`.
- Shimmer-sweep component (inlined component markup) passes across logo+text at t=28.5s.
- Last 0.5s (29.5–30.0) holds — pure logo + URL composition for thumbnails.

**Motion language:** Punctuation. Slam + stagger + sweep. No drift, no oscillation — static authority.

**Eases used:** `back.out(1.7)` (logo), `power4.out` (headline), `back.out(1.5)` (pill), shimmer built-in. (4 distinct)

**Exit:** none — last scene.

---

## Timing Table

| # | Beat | Start | End | Dur | Composition file | Transition IN |
|---|------|-------|-----|-----|------------------|----|
| 0 | Ambient BG | 0.0 | 30.0 | 30.0s | `ambient-bg.html` | — (always on) |
| 1 | HOOK | 0.0 | 3.0 | 3.0s | `scene1-hook.html` | — (opens cold) |
| 2 | TEASE | 2.7 | 6.0 | 3.3s | `scene2-tease.html` | fade-up overlap with scene1 (0.3s) |
| 3 | REVEAL | 6.0 | 12.0 | 6.0s | `scene3-reveal.html` | flash-through-white (0.6s) at 5.7–6.3 |
| 4 | SHOWCASE | 12.0 | 18.0 | 6.0s | `scene4-showcase.html` | cross-in push (0.4s) at 11.8–12.2 |
| 5 | X POST | 18.0 | 22.5 | 4.5s | `scene5-xpost.html` (hosts `x-post`) | whip-pan (0.5s) at 17.7–18.2 |
| 6 | INSTAGRAM | 22.5 | 26.5 | 4.0s | `scene6-instagram.html` (hosts `instagram-follow`) | push-slide left (0.5s) at 22.2–22.7 |
| 7 | OUTRO | 26.5 | 30.0 | 3.5s | `scene7-outro.html` | blur-crossfade (0.4s) at 26.3–26.7 |

**Audio:**

| Track | Start | Duration | Volume | File |
|-------|-------|----------|--------|------|
| Music bed | 0.0 | 30.0 | 0.85 (fades in 0.5s, out 1.5s, ducks to 0.55 from 18.0–26.5) | `assets/music.mp3` |

---

## Asset Audit

| Asset | Location | Status |
|-------|----------|--------|
| AIS Logo PNG | `assets/AIS Logo PNG.png` | ✓ copied from workspace |
| Brand tokens CSS | `assets/brand-tokens.css` | ✓ copied |
| Music bed | `assets/music.mp3` | ✓ copied from aisoc-hype |
| Grain overlay | `compositions/components/grain-overlay.html` | ✓ copied |
| Shimmer sweep | `compositions/components/shimmer-sweep.html` | ✓ copied |
| x-post block | `compositions/x-post.html` | ✓ installed, needs customization |
| instagram-follow block | `compositions/instagram-follow.html` | ✓ installed, needs customization |
| app-showcase block | `compositions/app-showcase.html` | ✓ installed (reference only — not wired) |
| ui-3d-reveal block | `compositions/ui-3d-reveal.html` | ✓ installed (reference only — not wired) |
| AIS Avatar | inline SVG glyph | to be generated inside x-post and instagram-follow customizations |

---

## Open Questions / Risks

1. **Music license:** Assumes `aisoc-hype/assets/music.mp3` (Infraction, No Copyright Music) is cleared for reuse in this app-launch context. Nate can swap before final render.
2. **App UI placeholder copy:** "NEXT LIVE CALL · 23:14", "DAILY ACTIVE · 1,100", sample names in feed/leaderboard — representative fiction, sanity-check before standard render.
3. **X post engagement numbers:** aspirational figures (2.3K RT / 18.7K likes / 420K views). Adjust before final.
4. **30s pacing risk:** 7 beats in 30s is tight. Fallback if a beat feels rushed on draft render: drop Beat 2 (tease), give Beat 3 the extra 3 seconds.
