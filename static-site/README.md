# DevQuest — Static HTML/CSS/JS Version

Plain HTML/CSS/JS port of the RPG-themed developer portfolio. No build step, no framework.

## Files
- `index.html` — markup + section structure
- `styles.css` — full theme (tokens, animations, components)
- `script.js` — data, rendering, interactions (modals, observers, konami, confetti, idle, contact form)

## Run
Just open `index.html` in a browser, or serve the folder:

```bash
cd static-site
python3 -m http.server 8000
# visit http://localhost:8000
```

## Features
- HUD-style sticky nav with active-section highlighting
- Animated XP bars (triggered on scroll via IntersectionObserver)
- Quest log with modal details
- SVG skill tree with hover tooltips
- Inventory grid with rarity-colored borders + modals
- Vertical journey timeline with reveal animation
- Achievements with shimmer hover
- NPC contact form with toast reward
- Konami code easter egg (↑↑↓↓←→←→BA) — confetti + achievement overlay
- Idle detection (60s) and bottom-of-page achievement
