# Campbell · Blase Wedding Invitation

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/layout.tsx` — loads fonts (Cormorant Garamond + Mrs Saint Delafield) and global styles
- `app/globals.css` — Tailwind v4 `@theme` tokens (colors: cream, paper, ink, olive, olive-dark, rose, mauve, gold)
- `app/page.tsx` — assembles the sections in order
- `components/Hero.tsx` — full-bleed hero with the couple's names and date
- `components/Countdown.tsx` — client component, live countdown to Sept 23, 2026 4:00 PM (+08:00)
- `components/Details.tsx` — RSVP, attire, color palette, reminders
- `components/Entourage.tsx` — full entourage list
- `components/Gift.tsx` — the "Notes on Gift" poem
- `components/Footer.tsx`

`framer-motion` is already in `package.json` — not wired up yet, on purpose, since you're adding the transitions yourself. Good spots already flagged with comments in the code:

- `Hero.tsx` — wrap the overlay `div` in `motion.div` for a fade-in on load
- `Countdown.tsx` — each digit box is a natural `AnimatePresence`/scale target on tick
- `Details.tsx` / `Entourage.tsx` — each block/group is sized to be a scroll-triggered stagger item (`whileInView`)

## Image

`public/images/hero-bg.jpg` is the garden-arch background, referenced directly in `Hero.tsx`. Swap the file (keep the same name/path) to change it, or move it to `next/image` if you want built-in optimization.
