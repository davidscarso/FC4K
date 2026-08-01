# AGENTS.md

## Project

Family calendar for e-ink displays (Kindle/e-reader). Vanilla JS, no frameworks, no npm — just static files opened in a browser.

## Architecture

- `src/index.html` — structure
- `src/style.css` — LCD visual style
- `src/app.js` — clock, geolocation, weather API, render
- `spec/constitution/` — **source of truth** for mission, tech stack, roadmap

## Hard constraints (do not violate)

- No npm dependencies, no bundler, no build step
- No frameworks — vanilla JS only
- No server-side rendering
- Weather: Open-Meteo API (no key required), fetch every 10 min
- Geocoding: BigDataCloud (no key, client-side only)
- Text must strip accents with `stripAccents()` (NFD normalization) before display

## Visual style

- Dark background (#0a0a0a), LCD panel (#c8d0c0), burnt orange accent (#d4622a)
- Local font only: `fonts/alarm clock.ttf`
- No neon/glow effects. Subtle shadows or none.

## Testing

No test suite. Open `src/index.html` in browser and verify visually.

## Feature workflow

Each new feature goes in `spec/features/NNN-nombre-feature/` with:
1. `spec.md` — what and why
2. `plan.md` — implementation approach
3. `tasks.md` — step-by-step

Read `spec/constitution/tech-stack.md` and `spec/constitution/mission.md` before implementing any feature.

## Code conventions

- camelCase naming
- CSS custom properties for colors
