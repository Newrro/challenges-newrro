# Sapta Krishi Modular Grand Challenge: launch site

Launch website for the ARJUNA × NMIT Sapta Krishi Modular Grand Challenge 2026–27.
It presents the seven Krishi modules (K1–K7), the two kits and the KMI, the leagues, Farm Day, the timeline and the awards, and links to the proposal PDF.

## Run

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check and build to dist/
npm run preview   # serve the production build
```

`dist/` is a static site and can be hosted on any static host (Netlify, Vercel, GitHub Pages, Nginx).

## Where things live

| Path | What |
| --- | --- |
| `public/Arjuna_Sapta_Krishi_Modular_Challenge.pdf` | The proposal served for download. Replace this file to ship a new version. |
| `src/data.ts` | All copy: modules, scoring, leagues, timeline, awards, the launch date and the PDF size. Edit content here. |
| `src/ModuleSwap.tsx` | The module explorer. Supports deep links such as `/#k5` and arrow-key navigation. |
| `src/ModuleIcon.tsx` | Line drawings for each module. |
| `src/Furrows.tsx` | The animated field in the hero. |
| `src/index.css` | Design tokens (colours sampled from the PDF) and all styles. |

## Before going public

- The countdown targets `LAUNCH_AT` in `src/data.ts` (9 Oct 2026, 09:30 IST). Set the real start time.
- If you replace the PDF, update `PDF_SIZE` and `PDF_PAGES` in `src/data.ts`.
- The footer still says the email and portal will be announced at launch. Add them once they exist.
