# Nextjs Frontend - Quick Context

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS + PostCSS, Radix UI, shadcn/ui patterns
- tsParticles for animations, next-themes for dark/light mode
- Vercel Analytics

## Project Layout
- `app/` — Next.js App Router pages (home, about, dj-sets, projects, photography, gear, blog, broadcasts, 3d-models, links, metrics)
- `components/` — React components (page sections, widgets, theme-provider, light-control, metrics, etc.)
- `data/` — Static JSON files (dj-sets.json currently)
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets
- `app/api/` — API route handlers
- `styles/` — Additional CSS

## Key Patterns
- All pages use app router directory structure: `app/[page]/page.tsx`
- Components are in `components/` (not co-located)
- Theme setup via ThemeProvider (dark mode default)
- Global state (not React state) via GlobalStateMonitor component
- Light control widget talks to internal-api backend

## Before Starting
- Check `next.config.mjs` for current settings (TS errors ignored, images unoptimized)
- Pages usually need both layout + page files
- Use existing components as templates (light-control-widget.tsx, metrics-grid.tsx, color-picker.tsx are good refs)
