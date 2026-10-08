import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { MODULES } from './data'
import { Furrows } from './Furrows'

const ease = [0.22, 1, 0.36, 1] as const

// Ring geometry: seven arcs around the button, one per Krishi module.
const R = 150
const GAP = 7 // degrees between arcs
const SPAN = 360 / MODULES.length

function arcPath(i: number) {
  const a0 = ((i * SPAN + GAP / 2 - 90) * Math.PI) / 180
  const a1 = (((i + 1) * SPAN - GAP / 2 - 90) * Math.PI) / 180
  const p = (a: number) => `${(170 + R * Math.cos(a)).toFixed(2)} ${(170 + R * Math.sin(a)).toFixed(2)}`
  return `M${p(a0)} A${R} ${R} 0 0 1 ${p(a1)}`
}

function labelPos(i: number) {
  const a = (((i + 0.5) * SPAN - 90) * Math.PI) / 180
  return { x: 170 + (R + 6) * Math.cos(a), y: 170 + (R + 6) * Math.sin(a) }
}

type Phase = 'ready' | 'igniting' | 'leaving'

const STEP = 0.16 // seconds between modules lighting up

export function LaunchGate({ onLaunched, onGone }: { onLaunched: () => void; onGone: () => void }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('ready')
  const buttonRef = useRef<HTMLButtonElement>(null)

  const launch = () => {
    if (phase !== 'ready') return
    setPhase('igniting')
  }

  // Ignite the seven modules, then hand over to the site.
  useEffect(() => {
    if (phase !== 'igniting') return
    const t = setTimeout(
      () => {
        onLaunched()
        setPhase('leaving')
      },
      reduce ? 300 : (MODULES.length * STEP + 0.7) * 1000,
    )
    return () => clearTimeout(t)
  }, [phase, reduce, onLaunched])

  useEffect(() => {
    buttonRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  // Stage-friendly controls: Enter, Space and presenter clickers launch; F toggles full screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Enter', ' ', 'PageDown', 'ArrowRight', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
        launch()
      }
      if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen?.().catch(() => {})
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const lit = phase !== 'ready'

  return (
    <motion.div
      className="gate"
      role="dialog"
      aria-modal="true"
      aria-label="Launch the Sapta Krishi Modular Grand Challenge"
      initial={false}
      animate={phase === 'leaving' ? (reduce ? { opacity: 0 } : { y: '-100%' }) : { y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0.3 : 1.05, ease: [0.76, 0, 0.24, 1], delay: reduce ? 0 : 0.15 }}
      onAnimationComplete={() => phase === 'leaving' && onGone()}
    >
      <div className="gate-top">
        <p className="gate-brand">
          ARJUNA <span>×</span> NMIT
        </p>
        <p className="gate-sub">Nitte Meenakshi Institute of Technology, Bengaluru</p>
      </div>

      <div className="gate-center">
        <h1 className="gate-title">
          <span>Sapta Krishi</span>
          <span className="gate-title-sub">Modular Grand Challenge 2026–27</span>
        </h1>

        <div className="gate-dial">
          <svg viewBox="0 0 340 340" className="gate-ring" aria-hidden="true">
            {MODULES.map((m, i) => {
              const pos = labelPos(i)
              return (
                <g key={m.id}>
                  <path d={arcPath(i)} className="gate-arc-base" />
                  <motion.path
                    d={arcPath(i)}
                    className="gate-arc-lit"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: lit ? 1 : 0 }}
                    transition={{ delay: lit && !reduce ? i * STEP : 0, duration: reduce ? 0 : 0.22, ease: 'easeOut' }}
                  />
                  <motion.text
                    x={pos.x}
                    y={pos.y}
                    className="gate-arc-label"
                    textAnchor="middle"
                    dominantBaseline="central"
                    animate={{ fill: lit ? '#fff6e8' : '#b9d3bc', opacity: lit ? 1 : 0.7 }}
                    transition={{ delay: lit && !reduce ? i * STEP + 0.1 : 0 }}
                  >
                    {m.code}
                  </motion.text>
                </g>
              )
            })}
          </svg>

          <motion.button
            ref={buttonRef}
            type="button"
            className="gate-button"
            onClick={launch}
            disabled={phase !== 'ready'}
            whileHover={reduce || lit ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.92 }}
            animate={lit && !reduce ? { scale: [1, 0.9, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            {!lit && !reduce && <span className="gate-pulse" aria-hidden="true" />}
            <span className="gate-button-label">{lit ? 'Launched' : 'Launch'}</span>
          </motion.button>
        </div>

        <motion.p className="gate-hint" animate={{ opacity: lit ? 0 : 1 }}>
          Press to launch the challenge
        </motion.p>
      </div>

      <div className="gate-field">
        <div className="horizon" />
        <Furrows />
      </div>

      <p className="gate-keys">Enter or Space to launch. F for full screen.</p>
    </motion.div>
  )
}
