# Mantra Lab V3.2

## What's new
- Interactive formation builder with drag & drop and mobile tap-to-place.
- Combinatorial squad analyzer: tests every supported module instead of relying on greedy assignment.
- Automatic formation generation with coverage percentage and missing-role hints.
- Formation result cards integrated into the dark sport-tech UI.
- Visual gallery of all 11 Mantra modules with mini-pitch role slots inspired by the official tactical layout.
- Player selection/deselection with a hard maximum of 30 players in the virtual squad.
- Squad counter `X/30`, listone counter, selected-only filter and bulk selection of visible players.
- PWA/offline shell (manifest + service worker).
- Data-provider abstraction for a future authorized online listone source.
- Local CSV/JSON workflows remain the fallback.
- Static hosting ready for Cloudflare Pages / Workers and GitHub Pages.

## Current product flow
**LISTONE → ROSA → MODULO → FORMAZIONE**

The core experience is designed to remain free and mobile-first: select a squad, ask Mantra Lab to analyze it, compare compatible modules and open any result directly on the pitch.

## Hosting
The production repository is connected to Cloudflare. New commits on `main` are intended to trigger the connected deployment automatically.

## Data and legal
The demo data is local sample data. The online listone layer must only be connected to a source/API whose terms authorize automated retrieval and reuse of the relevant data and images.

The official Fantacalcio 2026/27 listone and Mantra roles are published by Fantacalcio.it; Mantra role assignments can receive an end-of-market check during the season, so the provider layer should remain updateable rather than hard-coded forever.
