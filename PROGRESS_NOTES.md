# Animator-Playback: Progress & Continuation Notes

## 📌 Project Overview
A browser extension (Manifest V3) designed for animators, dance analysts, and storyboard artists to turn YouTube into a high-precision animation reference workstation.

---

## 🎯 Current Status (As of Sep 15, 2026)

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
   - Added dedicated CSS class hooks across all elements.

3. **Core Interactive Engine (`content.js`)**:
   - **Play / Pause**: Toggles `video.play()` and `video.pause()` with synchronized `▶` and `❚❚` icons.
   - **Frame Stepper**: `stepFrames(frames, fps = 24)` nudges `video.currentTime` by $\pm 1\text{f}$ and $\pm 5\text{f}$ with auto-pause.
   - **Playback Speeds**: `setSpeed(rate)` adjusts `video.playbackRate` between `0.25x`, `0.5x`, and `1.0x`.
   - **Canvas Mirror (Flip X)**: Toggles `video.style.transform = "scaleX(-1)"` and dynamically toggles `.mirror-btn-active`.
   - **Rule of Thirds Grid Overlay**: Injected 9-cell `<div>` CSS grid (`.animator-grid-overlay`) toggled by `Grid [G]` with `.grid-btn-active` and `pointer-events: none;`.
   - **Live Frame Counter**: Updates `currentFrame` and `endFrame` in real time on `timeupdate` (calculated at 24fps).
   - **A-B Range Looper & State Machine**:
     - `loopStart` captures timestamp, turns gold (`.loop-btn-active`), unlocks `loopEnd.disabled = false`, and unlocks `loopClear.disabled = false`.
     - `loopEnd` captures timestamp, turns gold (`.loop-btn-active`), and activates bounded looping.
     - `loopClear` resets timestamps, restores label text, removes active classes, and disables itself and `loopEnd`.
   - **Dynamic Time Scrubber**: `<input type="range">` with 2-way sync that automatically constrains `min`/`max` when an A-B loop is active and expands to `video.duration` when cleared.

4. **Visual Design & CSS Layout (`style/style.css`)**:
   - Switched `.playback-hud` to `height: auto` and responsive 3-row grid.
   - Play button styled with a 40px circular amber accent (`#e9a42d`).
   - Grouped pill containers (`.frame-skip`, `.frame-count`, `.loop`, `.speed-control`) styled with `#202020` backgrounds and `#616161` buttons.
   - Scoped CSS rules (`.loop .loop-btn-active`) to maintain proper selector specificity.
   - Disabled states styled with `:disabled` and `:nth-child` / `:last-child` selectors (`opacity: 0.5`).
   - Reference mockup: `ref/Animator-Playback.png`.

---

## 🚀 Next Priority (For Next Session)

### 🎯 Primary Focus: Playback Speed Active Highlighting
- [ ] **Default Active State**: On page load, set `speedNormal` (`1.0x`) as the active highlighted button (amber `#e9a42d` background), since standard video playback runs at 1.0x by default.
- [ ] **Speed Button Group Toggling**:
  - When a speed button is clicked (`0.25x`, `0.5x`, or `1.0x`), set its class to active (or add an active class).
  - Remove the active class from the other two speed buttons so only the currently running speed is highlighted in gold.
- [ ] **CSS Styling for Speed Active**: Add `.speed-control .speed-btn-active` (or scoped equivalent) in `style/style.css` with `#e9a42d` background and transitions.

---

## 🔮 Future Milestones (Queued for Later)

### Phase 2: Keyboard Shortcuts (Hotkeys)
- [ ] Add global capture-phase `keydown` listener to `window` with focus guard (ignores input/textarea/contentEditable).
- [ ] Intercept:
  - `Space` / `K` $\rightarrow$ Play/Pause
  - `,` / `.` $\rightarrow$ Step $\pm 1\text{f}$ (with `Shift` for $\pm 5\text{f}$)
  - `M` $\rightarrow$ Toggle Mirror
  - `G` $\rightarrow$ Toggle Grid
  - `[` / `I` $\rightarrow$ Loop Start
  - `]` / `O` $\rightarrow$ Loop End

### Phase 3: YouTube Lifecycle & Ad Handling
- [ ] **SPA Navigation Re-binding**: Listen to `yt-navigate-finish` on `window` to re-fetch `document.querySelector("video")` when navigating between videos without a full page refresh.
- [ ] **Ad Stream Isolation**: Check if `#movie_player` contains `.ad-showing`. Disengage or pause HUD time calculations during pre-roll and mid-roll ads.

---

## ⚠️ Important Conversational Rule
> **Mentorship & Developer Peer Rule:** Treat the user as a fellow engineer. Do NOT write code directly into project files unless the user explicitly asks for code to be written. Prioritize explaining concepts, reviewing user-written code, suggesting architectural trade-offs, and guiding hands-on learning.
