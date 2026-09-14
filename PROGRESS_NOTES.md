# Animator-Playback: Progress & Continuation Notes

## 📌 Project Overview
A browser extension (Manifest V3) designed for animators, dance analysts, and storyboard artists to turn YouTube into a high-precision animation reference workstation.

---

## 🎯 Current Status (As of Sep 14, 2026)

### ✅ Completed & Fully Functional Features:

1. **Manifest V3 Architecture**:
   - `manifest.json` configured with content script matching `https://www.youtube.com/*`.
   - Injects `content.js` and modular stylesheet `style/style.css` at `document_idle`.

2. **DOM Structure & Injection (`content.js`)**:
   - Injected into YouTube's `#movie_player` container for fullscreen/theater mode inheritance.
   - Built full element hierarchy:
     - `container` (`.playback-hud`)
       - `timeline` (`<input type="range">`) with native `accent-color: #e9a42d`
       - `control1` (Row 1): `play`, `frameSkip` (`-5f`, `-1f`, `1f`, `5f`), `frameCount` (`currentFrame`, `endFrame`), `loop` (`loopStart`, `loopEnd`, `loopClear`)
       - `control2` (Row 2): `mirror`, `grid`, `speedControl` (`0.25x`, `0.5x`, `1.0x`)
   - Added dedicated CSS class hooks: `currentFrame.className = "current-frame"` and `endFrame.className = "end-frame"`.

3. **Core Interactive Engine (`content.js`)**:
   - **Play / Pause**: Toggles `video.play()` and `video.pause()` with synchronized `▶` and `❚❚` icons.
   - **Frame Stepper**: `stepFrames(frames, fps = 24)` nudges `video.currentTime` by $\pm 1\text{f}$ and $\pm 5\text{f}$ with auto-pause.
   - **Playback Speeds**: `setSpeed(rate)` adjusts `video.playbackRate` between `0.25x`, `0.5x`, and `1.0x`.
   - **Canvas Mirror (Flip X)**: Toggles `video.style.transform = "scaleX(-1)"` on first click and resets to `"none"`.
   - **Rule of Thirds Grid Overlay**: Injected 9-cell `<div>` CSS grid (`.animator-grid-overlay`) toggled by `Grid [G]` with `pointer-events: none;`.
   - **Live Frame Counter**: Updates `currentFrame` and `endFrame` in real time on `timeupdate` (calculated at 24fps).
   - **A-B Range Looper**: Captures `loopStartTime` and `loopEndTime`, continuously loops playback within boundary on `timeupdate`, and resets with `loopClear`.
   - **Dynamic Time Scrubber**: `<input type="range">` with 2-way sync that automatically constrains `min`/`max` when an A-B loop is active and expands to `video.duration` when cleared.

4. **Visual Design & CSS Layout (`style/style.css`)**:
   - Switched `.playback-hud` to `height: auto` to prevent vertical clipping of row 2 (`control2`).
   - Play button styled with a 45px circular amber accent (`#e9a42d`).
   - Grouped pill containers (`.frame-skip`, `.frame-count`, `.loop`, `.speed-control`) styled with `#202020` backgrounds and `#616161` buttons.
   - Button spacing handled via `:not(:last-child)` margins.
   - Two-tone frame counter readout styled: `.current-frame` in amber (`#e9a42d`) and `.end-frame` in muted grey (`#616161`).
   - `:active` click feedback added for `.mirror-btn` and `.grid-btn`.
   - Reference mockup: `ref/Animator-Playback.png`.

---

## 🚀 Next Steps (When Resuming on Other Device)

### Phase 1: CSS Quick Polish (Optional Finishing Touches)
- [ ] **`.loop` Alignment:** Add `display: flex; align-items: center;` to `.loop` in `style/style.css` so `gap: 5px` properly spaces the `"LOOP:"` text and buttons on the same baseline.
- [ ] **`.frame-skip button` Sizing:** Change fixed `width: 25px` to `min-width: 25px; width: auto; padding: 2px 6px;` if `-5f` / `+5f` text feels cramped.
- [ ] **Numeric Jitter Prevention:** Add `font-variant-numeric: tabular-nums;` to `.frame-count` so the counter doesn't vibrate horizontally during playback.
- [ ] **Icon Centering:** Add `display: flex; justify-content: center; align-items: center;` to `.play-btn` to keep `▶` perfectly centered.

### Phase 2: Keyboard Shortcuts (Hotkeys)
*Bite-sized implementation checklist to tackle without feeling overwhelmed:*
- [ ] **Step 1 — Global Listener & Focus Guard:** Add a single capture-phase listener to `window`:
  ```javascript
  window.addEventListener("keydown", (e) => {
      const tag = document.activeElement.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || document.activeElement.isContentEditable) return;
      // Shortcuts go here...
  }, true);
  ```
- [ ] **Step 2 — Play/Pause:** Intercept `Space` and `k`/`K` with `e.preventDefault()`, `e.stopImmediatePropagation()`, and trigger `play.click()`.
- [ ] **Step 3 — Frame Stepping:** Intercept `,` (Step -1f) and `.` (Step +1f); check `e.shiftKey` for $\pm 5\text{f}$.
- [ ] **Step 4 — Mirror & Grid:** Wire `m`/`M` to `mirror.click()` and `g`/`G` to `grid.click()`.
- [ ] **Step 5 — A-B Looper:** Wire `[` / `i` to `loopStart.click()` and `]` / `o` to `loopEnd.click()`.

### Phase 3: YouTube Lifecycle & Ad Handling
- [ ] **SPA Navigation Re-binding:** Listen to `yt-navigate-finish` on `window` to re-fetch `document.querySelector("video")` when navigating between videos without a full page refresh.
- [ ] **Ad Stream Isolation:** Check if `#movie_player` contains `.ad-showing`. Disengage or pause HUD time calculations during pre-roll and mid-roll ads.

### Phase 4: Local Testing & Deployment Verification
- Open `chrome://extensions/`, enable Developer Mode, click **"Load unpacked"**, and select this repo directory to test live on YouTube.
- Use the reload button on the extension card after saving changes.

---

## ⚠️ Important Conversational Rule
> **Mentorship & Developer Peer Rule:** Treat the user as a fellow engineer. Do NOT write code directly into project files unless the user explicitly asks for code to be written. Prioritize explaining concepts, reviewing user-written code, suggesting architectural trade-offs, and guiding hands-on learning.
