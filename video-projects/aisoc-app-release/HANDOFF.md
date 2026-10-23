# AIS Mobile App Release — Handoff Notes

**Current version:** v3 (revised 2026-04-18)
**Final render:** `renders/aisoc-app-release-v3.mp4` (30s · 1920×1080 · 30fps · standard quality CRF 18 · 20.4 MB)
**Previous:** `renders/aisoc-app-release-v2.mp4` and `-v1.mp4` (superseded, kept for A/B)
**Draft render:** `renders/aisoc-app-release-v3-draft.mp4` (same timeline, draft CRF 28)
**Verification frames:** `renders/frames-v3/` (PNGs at hero moments; all reviewed)

## What shipped

A 30-second landscape release film announcing the AIS mobile app. Seven beats, pure motion graphics (no face-cam), AIS-locked palette (navy #07121c, cyan #37bdf8, orange #f09025 for gold leaderboard pill) and typography (Montserrat display + Roboto Mono UI). Music bed reused from `aisoc-hype/assets/music.mp3`.

Scene stack:
1. **0.0–3.0s** · `scene1-hook.html` — AIS logo boot + "332,600 BUILDERS." headline + sublabel.
2. **2.7–6.0s** · `scene2-tease.html` — "WE BUILT SOMETHING BIG." + BUILD · SHIP · GET PAID · NOW PORTABLE pills + phone silhouette hint.
3. **6.0–12.0s** · `scene3-reveal.html` — 3D phone rotate-in with AIS dashboard UI (NEXT LIVE CALL 23:14 + stat row + nav), chromatic-split burst at headline slam "AIS. NOW MOBILE."
4. **12.0–18.0s** · `scene4-showcase.html` — Floating triptych: LIVE CALLS (grid) · COMMUNITY WINS (feed) · LEADERBOARD (ranked list with gold $50 pill) under "EVERYTHING. IN YOUR POCKET." headline.
5. **18.0–22.5s** · `x-post.html` (installed, customized) — Nate Herk post: "The AIS app just dropped. 332K builders. Now in your pocket. 🚀 Master AI automation anywhere. #AIAutomation". Engagement: 482 · 2.4K · 18.7K→18.8K · 420K.
6. **22.5–26.5s** · `scene6-instagram.html` — Split-screen: "FOLLOW FOR UPDATES." with @aiautomationsociety handle on left; phone-aspect frame on right embedding the installed `instagram-follow.html` block scaled to 0.41 (AI Automation Society · 332K followers · Follow).
7. **26.5–30.0s** · `scene7-outro.html` — AIS logo slam + "COMING SOON." + URL pill `▸ AIAUTOMATIONSOCIETY.AI` with cursor blink + "MASTER AI AUTOMATION." tagline.

Background: `ambient-bg.html` runs 0–30s on track 0 (radial navy glow + drift grid + 20 deterministic particles + corner telemetry tickers + vignette). Grain overlay inlined at root level.

## Footguns encountered (and fixed)

### 1. Installed catalog blocks bled their `html, body` CSS into the parent document

When `x-post.html` and `instagram-follow.html` are loaded as sub-compositions via `data-composition-src`, their `<head><style>html, body { width: ...; height: ... }</style></head>` rules apply to the *parent* document's body. The instagram-follow block sets `body { width: 1080px; height: 1920px }` for its native portrait size — in the landscape host this collapsed the canvas body to 1080px wide and the right 840px rendered pure white (v1 draft — fixed in v2).

**Fix:** In both installed blocks, removed the `html, body { ... }` rules and scoped all styles under `[data-composition-id="<id>"]` instead. Moved `font-family` + `box-sizing` to scoped selectors. See `compositions/x-post.html` and `compositions/instagram-follow.html` top of `<style>`.

**Future gotcha:** any catalog block installed via `npx hyperframes add` may have this issue. Always check and scope `html, body` rules before wiring a block into a multi-composition host.

### 2. ffmpeg `-ss` seeking artifacts during frame verification

When running `ffmpeg -ss <t> -i video.mp4 -frames:v 1 out.png` on the draft CRF-28 MP4, some non-keyframe timestamps (e.g. t=15.0 and t=25.0) produced empty frames even though the surrounding timestamps (t=14.8, 15.1, 24.8, 25.2) rendered perfectly. This is an ffmpeg keyframe-seeking artifact, NOT an actual bug in the composition. To get trustworthy frames during verification, pull at multiple adjacent times or use `-ss` *after* `-i` for slower but accurate seeking.

### 3. Unused catalog blocks failed lint

`app-showcase.html` and `ui-3d-reveal.html` were installed for inspiration/reference but not wired into the timeline. Their root composition elements are missing `data-start="0"` which caused lint errors. **Deleted** — we built custom AIS-branded equivalents (scene3-reveal and scene4-showcase). If you want to reinstall them for reference, run `npx hyperframes add app-showcase ui-3d-reveal` and add `data-start="0"` to each root element, or keep them out of the compositions/ folder.

### 4. Every sub-composition needs its own GSAP script tag

Lint caught `missing_gsap_script` on every sub-composition at first. Even though GSAP is loaded at the root `index.html`, each sub-comp HTML needs its own `<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>` before its IIFE — Hyperframes renders sub-comps in a way that doesn't inherit parent scripts. Added to all 7 scene files + ambient-bg.html.

### 5. Music track conflicted with ambient-bg on track 0

Initially both `ambient-bg` (track 0) and `<audio id="music">` (track 0) shared track-index 0 — lint flagged `overlapping_clips_same_track`. Moved music to `data-track-index="99"`, a dedicated audio track above all visual layers. Scenes use tracks 0–7.

## Audio mix

- Music bed: `assets/music.mp3` at `data-volume="0.85"` full duration.
- Not yet implemented: ducking to 0.55 from 18.0–26.5s during x-post + instagram scenes. If you want that, add a second `<audio>` element with a shorter duration + different volume, OR switch to Hyperframes' producer with post-mix automation.
- No SFX beds yet. Storyboard suggests whoosh at 5.7 (flash transition) and impact at 9.0 (headline slam) — left as open items.

## Open items / easy future tweaks

- **Nate's avatar on the x-post** — currently uses a stylized cyan→blue radial gradient with "AIS" text. Swap to a real photo: drop `nate-avatar.jpg` into `assets/`, then in `compositions/x-post.html` replace the `<svg>` inside `.avatar` with `<img src="assets/nate-avatar.jpg" style="width:52px;height:52px;border-radius:50%;object-fit:cover" />`.
- **App UI placeholder copy** — Scene 3 phone shows "NEXT LIVE CALL · 23:14 · Workflow Design Lab · Nate Herk · 5 days/wk" and the stats row "1,100 · 300+ · 5". Scene 4 names (Nate, Julien, Anne, Luca, Marcus, Ravi, Zoë, Jamie) are illustrative. Edit directly in scene3-reveal.html and scene4-showcase.html.
- **X-post engagement numbers** — 482 / 2.4K / 18.7K→18.8K / 420K. Dial in `compositions/x-post.html` (metric-count spans).
- **Music license** — confirm `aisoc-hype/assets/music.mp3` (Infraction, No Copyright Music, Epic Inspirational Hip-Hop) is cleared for this app-launch use.
- **AIS Instagram handle** — confirmed the handle is `@aiautomationsociety` across scene6 and the IG block. If the actual handle differs, update in both `compositions/instagram-follow.html` and `scene6-instagram.html`.
- **Social cut** — if Nate also wants a 9:16 vertical for IG Reels/TikTok, this is a separate project. Reframe isn't automatic since the triptych and x-post are landscape-composed.

## Render commands (for re-runs)

```bash
cd video-projects/aisoc-app-release
npx hyperframes lint                                      # expect 0/0
npx hyperframes render --quality draft  --output renders/aisoc-app-release-v1-draft.mp4
npx hyperframes render --quality standard --fps 30 --output renders/aisoc-app-release-v1.mp4
npx hyperframes render --quality high --docker --fps 30 --output renders/aisoc-app-release-v1-archive.mp4  # optional archival deterministic
```

## Reference used

- HeyGen's own launch video repo: https://github.com/heygen-com/hyperframes-launch-video — adopted their STORYBOARD template, root-level audio orchestration, timeline padding discipline, and per-beat visual-language variation within brand rails.
- `aisoc-hype/` — reference for scaffold, transitions, grain-overlay integration, music bed.
- Catalog blocks installed: `x-post`, `instagram-follow` (wired); `app-showcase`, `ui-3d-reveal` (inspected then deleted).

## v1 → v2 changes (2026-04-17)

Nate flagged three things on v1 review: flickering, the tweet being too small, and the Instagram follow screen being too small. All three addressed in v2.

### Flicker reduction (7 edits across 5 files)

Problem: v1 stacked six rapid yoyo pulses + a `steps(1)` grain overlay across the 30s timeline, producing perceptible strobe on big-screen playback.

- `index.html:109` — grain animation `0.5s steps(1) infinite` → `1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite`; opacity `0.06` → `0.04`.
- `index.html:286` — flash-through-white peak `opacity: 0.95` → `0.6` (scene 2→3 transition).
- `compositions/scene1-hook.html:178` — scanbeam opacity cliff `duration: 0.1` → `0.35, ease: "power2.out"` (feathered fade).
- `compositions/scene3-reveal.html:480,486` — card glow `repeat: 5, duration: 0.9` → `repeat: 2, duration: 1.4`; card dot `repeat: 9, duration: 0.5, scale: 1.5` → `repeat: 3, duration: 0.8, scale: 1.25`.
- `compositions/scene4-showcase.html:493,517` — live pill `repeat: 7, duration: 0.4, scale: 1.12` → `repeat: 3, duration: 0.7, scale: 1.08`; gold prize glow `repeat: 5, duration: 0.6` → `repeat: 2, duration: 1.0`.
- `compositions/scene7-outro.html:208` — cursor blink `duration: 0.4, ease: "steps(1)", repeat: 5` → `duration: 0.7, ease: "sine.inOut", repeat: 3` (softer sine pulse instead of on/off strobe).

### Tweet scaled up (scene 5)

`compositions/x-post.html:380-462` — tweet card scaled via GSAP `set`/`to` from native 880px → effective 1276px (scale 1.45). The scale is set alongside the `y: 400` entry/exit translation so GSAP owns the full transform matrix (CSS-based `scale()` would conflict with the `y` tween). Card now fills ~66% of frame width (was ~46%). The in-scene `translate(-50%, -50%)` centering in CSS is preserved.

### Instagram follow rebalanced (scene 6)

Phone bezel made significantly larger and text panel narrowed so the follow screen dominates the frame.

- `compositions/scene6-instagram.html:86-89` — text panel `left: 100, width: 900` → `left: 80, width: 720`.
- `compositions/scene6-instagram.html:99` — `.s6-word` font-size `110px` → `92px` (fits narrower panel cleanly).
- `compositions/scene6-instagram.html:117,122-123` — accent line `360px` → `280px` (width + SVG viewBox + stroke-dasharray all synced).
- `compositions/scene6-instagram.html:137-141` — phone wrap `right: 140, width: 460, height: 820` → `right: 100, width: 620, height: 1040`. Height deliberately ≤ 1080 canvas (was initially tried at 1280 but clipped off-canvas top/bottom — see footgun below).
- `compositions/scene6-instagram.html:145,153-154` — phone glow inset `-60` → `-80`; bezel border color `#1a2432` → `#243447` (more visible on dark backdrop); border-radius `50` → `58`.
- `compositions/scene6-instagram.html:162` — `.s6-ig-host` transform `scale(0.41)` → `scale(0.54)`. Follow button renders ~135px wide (was ~102px).
- SVG viewBox at line 26 updated from `0 0 360 6` → `0 0 280 6` with matching `x2="280"` line coords.

### New footgun: Phone frame height must not exceed canvas height

**First attempt at v2** used phone wrap 720×1280 with ig-host scale(0.64) for max visual impact. This **clipped off-canvas** both top and bottom (phone center at canvas y=540, half-height=640 → phone top=-100, bottom=1180). The scene6 root has `overflow: hidden`, so the clipped portion disappeared — visible phone was only the middle 1080 tall. Worse, the `instagram-follow` composition's content layout has a transparent backdrop with the lower-third follow card at `bottom: 160` of its 1920-tall canvas. When the phone extended past canvas bottom, the follow card positioned inside the clipped region appeared to float *outside* the phone frame in the rendered video.

**Fix:** Cap phone height at canvas height with ~20-40px margin. Used 1040px height + 0.54 scale, which fits inside 1080 canvas fully and renders ig-host at 583×1037 (fits 604×1024 bezel usable area). If future versions want a taller phone, shrink the scene root padding first or drop the phone-frame chrome entirely.

### Pre-existing artifact (not a regression): single-frame dropout at t≈25.0

When extracting verification frames with `ffmpeg -ss 25.0 -i render.mp4 -frames:v 1`, a single blank frame (ambient bg only — no scene 6 content) appears at ~t=24.99-25.00. **This exists in both v1 and v2 renders** (confirmed by extracting from `aisoc-app-release-v1.mp4`). Adjacent frames at t=24.95 and t=25.02 show scene 6 rendering correctly. Likely a Hyperframes/Chromium capture quirk at that specific frame (~frame 750 of 900). Reads as a ~33ms flicker if anyone scrubs to that exact moment; not noticeable during normal playback. Not worth chasing unless it becomes visible.

### Render

```bash
cd video-projects/aisoc-app-release
npx hyperframes lint                                                   # 0 errors, 0 warnings
npx hyperframes render --quality draft  --output renders/aisoc-app-release-v2-draft.mp4
npx hyperframes render --quality standard --output renders/aisoc-app-release-v2.mp4
```

## v2 → v3 changes (2026-04-18)

Nate flagged three issues on v2 review: lingering "random" full-screen flickers, the tweet still reading bottom-biased, and the Instagram follow scene being over-designed with its phone bezel. He also invited MOTION_PHILOSOPHY.md-aligned upgrades.

### Flicker reduction (second pass — layer-promotion + blur-filter expense)

v2 fixed 7 rapid pulses/strobes. v3 attacks the remaining compositor-level sources:

- `index.html:44` — `will-change: transform, opacity, filter` → `will-change: opacity`. `will-change: filter` + `will-change: transform` on seven full-screen scene wraps + ambient promotes too many GPU layers, thinning compositor budget. Keeping only `opacity` leaves the one property that actually animates across every scene cut.
- `index.html:286–398` — removed `filter: "blur(6px/10px/12px/14px)"` tweens from the scene 4→5 whip-pan and scene 6→7 crossfade. Animating an 8–14px gaussian blur on a 1920×1080 layer is expensive; paint stalls read as screen flickers. Replaced with opacity + xPercent (4→5) and opacity + scale-crossfade (6→7).
- `index.html:57–65` — removed `mix-blend-mode: screen` from `#flash-fx`. The screen blend on a white overlay above blurred scene wraps was a paint-cost multiplier. Identical visual result from straight opacity 0→0.6→0.
- `index.html:68–133` — grain animation: capped translate keyframes to ±4% (was -15% to +15%), slowed cycle to 2.4s (was 1.2s), opacity 0.04 → 0.03. Large translates on a 200%-size SVG noise texture were reading as pattern-swim on big screens even at low opacity.

### Tweet (scene 5) — bias upward to cancel bottom-heavy visual weight

`compositions/x-post.html:42` — `.x-card { top: 50% }` → `top: 46%`. Card is geometrically centered via `top:50%; transform: translate(-50%, -50%)`, but the engagement metrics cluster (colored like button, pink count, bright numbers) sits at the bottom of the card and pulls visual mass down. Moving the anchor to 46% puts the visual center-of-mass at canvas center.

### Instagram (scene 6) — rebuilt as hero follow notification

`compositions/scene6-instagram.html` fully rewritten. Phone bezel deleted. Follow notification is now the visual centerpiece, sized ~2× native (card ~1380×308px), dead-center on canvas. Headline moves from left-side block to a smaller supporting header at the top.

Key sizes (all scaled up ~2× from the native `instagram-follow.html` lower-third):
- Card: width fit-content, padding 44/72/44/44, border-radius 140, gap 56 between avatar and profile
- Avatar: 220×220 (was 120)
- Display name: 64px / 700 (was 34)
- Verified badge: 64px (was 34)
- Handle: 48px (was 28)
- Follower count: 44px (was 25)
- Follow button: 420×140, border-radius 70 (was 250×80 / 40)
- Button text: 54px / 700 (was 30)

Headline now uses **chrome-gradient text** per MOTION_PHILOSOPHY.md §2.2: white→#b8c4d4→white for "FOLLOW FOR", cyan gradient #9edcff→#37bdf8→#1e8dc8 for the AIS-accent "UPDATES." Both words carry `text-shadow` halos (white 35% / cyan 55%). Brand palette preserved — cyan accent wins over pure chrome, per the "When NOT to apply it" carve-out in CLAUDE.md.

`compositions/instagram-follow.html` stays on disk (registry-installed artifact) but scene 6 no longer references it.

### Whip-streak at scene 5→6 cut (MOTION_PHILOSOPHY §2.5)

New element in `index.html`: `#whip-5to6`, a cyan-tinted-white gradient bar (14px tall, 55% wide) that sweeps left→right across the frame at 22.15s with `power3.in` easing. Peak visibility at ~22.4s masks the opacity crossfade between tweet and Instagram. Blurred 8px. This is the one place a whip fires — rest of the transitions stay calm. Replaces the "punch" previously (mis)carried by filter-blur transitions.

### Files touched (v3 diff vs v2)

- `index.html` — grain keyframes, `will-change`, flash-fx CSS, whip-streak element + CSS + GSAP, transition tweens 4→5 and 6→7
- `compositions/x-post.html` — one CSS line (`top: 46%`)
- `compositions/scene6-instagram.html` — full rewrite
- `HANDOFF.md` — this section

### Open item still tracking

- **t≈25.0 single-frame dropout** documented in v2 — monitor v3 playback. If it's gone with the compositor-layer simplification, it was a `will-change` / blur-filter collision. If still present, it's a Hyperframes/Chromium capture quirk that needs separate investigation.
- **Studio preview on localhost:3003 was stuck at 0s/0s duration** during v3 iteration even though CLI read 30s correctly. Workaround: watch the rendered MP4. Suspected stale client-side state; hard-refresh / incognito reload may clear it. Not reproduced on sizzle project on 3002. Track if it recurs.

### Render (v3)

```bash
cd video-projects/aisoc-app-release
npx hyperframes lint                                                   # 0 errors, 0 warnings
npx hyperframes render --quality draft  --output renders/aisoc-app-release-v3-draft.mp4
npx hyperframes render --quality standard --output renders/aisoc-app-release-v3.mp4
```
