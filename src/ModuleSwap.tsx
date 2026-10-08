import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { KIT_LABEL, MODULES, type Module } from './data'
import { ModuleIcon } from './ModuleIcon'

const ease = [0.22, 1, 0.36, 1] as const

function idFromHash() {
  const h = window.location.hash.replace('#', '')
  return MODULES.some((m) => m.id === h) ? h : null
}

export function ModuleSwap() {
  const [activeId, setActiveId] = useState(() => idFromHash() ?? 'k1')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = MODULES.find((m) => m.id === activeId)!
  const index = MODULES.indexOf(active)

  useEffect(() => {
    const onHash = () => {
      const id = idFromHash()
      if (id) {
        setActiveId(id)
        document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const select = (i: number, focus = false) => {
    const m = MODULES[(i + MODULES.length) % MODULES.length]
    setActiveId(m.id)
    history.replaceState(null, '', `#${m.id}`)
    if (focus) tabRefs.current[MODULES.indexOf(m)]?.focus()
  }

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    if (e.key in keys) {
      e.preventDefault()
      select(index + keys[e.key], true)
    } else if (e.key === 'Home') {
      e.preventDefault()
      select(0, true)
    } else if (e.key === 'End') {
      e.preventDefault()
      select(MODULES.length - 1, true)
    }
  }

  return (
    <div className="swap">
      <div className="swap-rail" role="tablist" aria-label="Krishi modules" aria-orientation="vertical" onKeyDown={onKey}>
        {MODULES.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            role="tab"
            id={`tab-${m.id}`}
            aria-selected={m.id === activeId}
            aria-controls="module-panel"
            tabIndex={m.id === activeId ? 0 : -1}
            className={`swap-tab kit-${m.kit}`}
            onClick={() => select(i)}
          >
            <span className="swap-tab-code">{m.code}</span>
            <span className="swap-tab-text">
              <span className="swap-tab-name">{m.name}</span>
              <span className="swap-tab-title">{m.title}</span>
            </span>
            {m.id === activeId && <motion.span layoutId="rail-indicator" className="swap-tab-indicator" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
          </button>
        ))}
        <p className="swap-legend">
          <span className="dot kit-kit1" /> Kit 1 ARJUNA
          <span className="dot kit-mixed" /> Kit 1 tool or Kit 2
          <span className="dot kit-kit2" /> Kit 2 Jetrick build
        </p>
      </div>

      <div className="swap-bay" id="module-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <ModulePanel key={active.id} m={active} />
        </AnimatePresence>
      </div>
    </div>
  )
}

function ModulePanel({ m }: { m: Module }) {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)
  const base = m.scoring.filter((s) => !s.bonus)
  const bonus = m.scoring.find((s) => s.bonus)

  return (
    <motion.article
      className={`panel kit-${m.kit}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -28, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 36, transition: { duration: 0.18, ease: 'easeIn' } }}
      transition={reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 380, damping: 30, mass: 0.9 }}
    >
      <div className="panel-status" role="status">
        <motion.span
          className="panel-status-light"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: 'spring', stiffness: 600, damping: 14 }}
        />
        {m.code} detected. {m.name} behaviour loaded.
      </div>

      <header className="panel-head">
        <div>
          <p className="panel-kit">
            {KIT_LABEL[m.kit]}, {m.league}
          </p>
          <h3 className="panel-name">
            <span className="panel-code">{m.code}</span> {m.name}
          </h3>
          <p className="panel-title">{m.title}</p>
        </div>
        <ModuleIcon id={m.id} className="panel-icon" />
      </header>

      <p className="panel-problem">
        <strong>The problem:</strong> {m.problem.charAt(0).toLowerCase() + m.problem.slice(1)}.
      </p>
      <p className="panel-brief">{m.brief}</p>

      <div className="panel-grid">
        <section>
          <h4>Arena</h4>
          <p>{m.arena}</p>
          {m.twists && (
            <div className="panel-twists">
              <h4>Twists</h4>
              <p>{m.twists}</p>
            </div>
          )}
        </section>
        <section>
          <h4>{m.tasksLabel}</h4>
          <ul className="panel-tasks">
            {m.tasks.map((t, i) => (
              <motion.li
                key={t}
                initial={reduce ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.35, ease }}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </section>
      </div>

      {m.tiers && (
        <div className="panel-tiers">
          <h4>Difficulty tiers</h4>
          <dl>
            <div className="tier tier-bronze">
              <dt>Bronze</dt>
              <dd>{m.tiers.bronze}</dd>
            </div>
            <div className="tier tier-silver">
              <dt>Silver</dt>
              <dd>{m.tiers.silver}</dd>
            </div>
            <div className="tier tier-gold">
              <dt>Gold</dt>
              <dd>{m.tiers.gold}</dd>
            </div>
          </dl>
        </div>
      )}

      <div className="panel-score">
        <h4>
          How it’s scored <span>out of 100{bonus ? `, plus ${bonus.points} bonus` : ''}</span>
        </h4>
        <div className="scorebar" aria-hidden="true">
          {base.map((s, i) => (
            <motion.span
              key={s.label}
              className={`scorebar-seg${hover === i ? ' is-hot' : ''}`}
              style={{ flexBasis: `${s.points}%`, opacity: hover === null || hover === i ? 1 : 0.35 }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease }}
            >
              {s.points >= 10 && s.points}
            </motion.span>
          ))}
        </div>
        <ul className="score-list">
          {m.scoring.map((s, i) => (
            <li
              key={s.label}
              className={s.bonus ? 'is-bonus' : undefined}
              onMouseEnter={() => !s.bonus && setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span>{s.label}</span>
              <span className="score-pts">{s.bonus ? `+${s.points}` : s.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}
