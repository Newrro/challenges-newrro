import { motion, useReducedMotion } from 'motion/react'

// Line drawings for each Krishi module, drawn on a 120×120 grid.
// Each is a list of path strings; they draw in sequence when the module is swapped in.
const PATHS: Record<string, string[]> = {
  // Drishti: a plant inside a camera's scan frame
  k1: [
    'M20 34V20h14M86 20h14v14M100 86v14H86M34 100H20V86',
    'M60 92V52',
    'M60 64c-14 0-22-8-22-20 14 0 22 8 22 20z',
    'M60 56c0-14 8-22 22-22 0 14-8 22-22 22z',
    'M28 60h64',
  ],
  // Vahan: a carrier with a crate on its deck
  k2: [
    'M22 78h76v-10H22z',
    'M38 68V44h44v24',
    'M38 56h44M60 44v24',
    'M36 92a8 8 0 1 0 0-.1M84 92a8 8 0 1 0 0-.1',
    'M14 102h92',
  ],
  // Nirai: weeding tines lifting a weed by the root
  k3: [
    'M14 96h92',
    'M30 40h40v14H30z',
    'M38 54v26M50 54v30M62 54v26',
    'M86 62v20M86 72c-8-2-12-8-12-14M86 68c8-2 12-8 12-14',
    'M82 92l4-10 4 10M80 88l6-6 6 6',
  ],
  // Buvai: a seed drill dropping evenly spaced seeds
  k4: [
    'M14 74h92',
    'M44 18h32l-8 22H52z',
    'M60 40v14',
    'M60 62a3 3 0 1 0 0-.1',
    'M28 88a3 3 0 1 0 0-.1M60 88a3 3 0 1 0 0-.1M92 88a3 3 0 1 0 0-.1',
  ],
  // Adike Aarohi: slender palm with a clamp climbing it
  k5: [
    'M60 106V30',
    'M60 30c-10-6-22-6-32 2M60 30c10-6 22-6 32 2M60 30c-4-8-12-14-22-16M60 30c4-8 12-14 22-16',
    'M43 44a4 4 0 1 0 8 0a4 4 0 1 0-8 0M69 44a4 4 0 1 0 8 0a4 4 0 1 0-8 0M47 53a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
    'M48 66h24v14H48z',
    'M44 70v6M76 70v6',
  ],
  // Kalpa Aarohi: a curved, ringed coconut trunk with nuts
  k6: [
    'M48 108c6-28 6-52 18-78',
    'M50 92h10M52 78h10M55 64h10M59 50h9',
    'M66 30c-14-8-30-4-40 8M66 30c12-10 28-10 38 0M66 30c-2-12-10-20-22-22M66 30c8-10 18-14 30-12',
    'M62 40a5 5 0 1 0 0-.1M74 40a5 5 0 1 0 0-.1',
  ],
  // Jal Mitra: a floating collector boat with weed on the water
  k7: [
    'M14 76c8-5 14-5 22 0s14 5 22 0 14-5 22 0 14 5 22 0',
    'M14 94c8-5 14-5 22 0s14 5 22 0 14-5 22 0 14 5 22 0',
    'M34 64h52l-8 12H42z',
    'M44 64l-10-14h22l6 14',
    'M90 70c4-4 8-4 10 0M96 66c2-6 6-8 10-6',
  ],
}

export function ModuleIcon({ id, className }: { id: string; className?: string }) {
  const reduce = useReducedMotion()
  const paths = PATHS[id] ?? []
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {paths.map((d, i) => (
        <motion.path
          key={`${id}-${i}`}
          d={d}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  )
}
