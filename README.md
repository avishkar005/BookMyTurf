# BookMyTurf

Premium sports venue booking platform — landing page built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Adding real photography

This project ships with graceful placeholders for every image. To use real
sports photography, add the files listed in `public/images/README.md` to
`public/images/` using the exact filenames given — no code changes needed.

## Project Structure

```
src/
  components/   Navbar, Hero, SportsEcosystem, ForPlayers, ForVenueOwners,
                 HowItWorks, About, Testimonials, FAQ, Contact, Footer,
                 plus shared FadeUp + SmartImage helpers
  data/          content.js — all copy & data for sports, steps, testimonials, FAQs
  index.css      Tailwind layers + design tokens (deep green / black / white)
  App.jsx        Page composition (matches the required section order)
public/
  images/        Drop real photography here (see README.md inside)
```
