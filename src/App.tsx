import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  AUTONOMY,
  AWARDS,
  CHAMPION_SCORING,
  FARM_DAY,
  KMI_LAYERS,
  LAUNCH_AT,
  LEAGUES,
  MODULES,
  PDF_PAGES,
  PDF_SIZE,
  PDF_URL,
  STAGES,
  TEAMS,
} from './data'
import { Furrows } from './Furrows'
import { ModuleSwap } from './ModuleSwap'

const ease = [0.22, 1, 0.36, 1] as const
const PDF_NAME = 'Sapta-Krishi-Modular-Challenge-2026-27.pdf'

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <path d="M10 3v10m0 0-4-4m4 4 4-4M4 16h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DownloadButton({ variant = 'solid', children }: { variant?: 'solid' | 'ghost'; children: React.ReactNode }) {
  return (
    <a className={`btn btn-${variant}`} href={PDF_URL} download={PDF_NAME}>
      <DownloadIcon />
      {children}
    </a>
  )
}

/* ------------------------------------------------------------------ */

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  return now
}

function Countdown() {
  const now = useNow()
  const diff = LAUNCH_AT.getTime() - now
  const launchEnd = LAUNCH_AT.getTime() + 2 * 24 * 3600 * 1000

  if (diff <= 0) {
    return (
      <p className="countdown countdown-live">
        <span className="live-dot" />
        {now < launchEnd ? 'Launching now at NMIT, Bengaluru. Registration is open.' : 'Registration is open for the 2026–27 cycle.'}
      </p>
    )
  }

  const s = Math.floor(diff / 1000)
  const parts = [
    { v: Math.floor(s / 86400), l: 'days' },
    { v: Math.floor((s % 86400) / 3600), l: 'hours' },
    { v: Math.floor((s % 3600) / 60), l: 'min' },
    { v: s % 60, l: 'sec' },
  ]
  return (
    <div className="countdown" role="timer" aria-label="Time until launch">
      <p className="countdown-label">Launch at NMIT, Bengaluru, 9–10 October 2026</p>
      <div className="countdown-digits">
        {parts.map((p) => (
          <span key={p.l} className="countdown-unit">
            <span className="countdown-num">{String(p.v).padStart(2, '0')}</span>
            <span className="countdown-l">{p.l}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Header() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`site-header${solid ? ' is-solid' : ''}`}>
      <a href="#top" className="brand">
        ARJUNA <span className="brand-x">×</span> NMIT
      </a>
      <nav aria-label="Sections">
        <a href="#modules">Modules</a>
        <a href="#leagues">Leagues</a>
        <a href="#farm-day">Farm Day</a>
        <a href="#timeline">Timeline</a>
        <a href="#awards">Awards</a>
      </nav>
      <a className="header-dl" href={PDF_URL} download={PDF_NAME}>
        <DownloadIcon />
        <span>Proposal PDF</span>
      </a>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 90])
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: '105%' },
          animate: { y: '0%' },
          transition: { duration: 0.9, delay, ease },
        }
  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } }

  return (
    <section className="hero" id="top">
      <motion.div className="hero-inner" style={{ y: titleY }}>
        <motion.p className="hero-kicker" {...fade(0.1)}>
          Bharat Agri-Robotics Modular Challenge 2026–27
        </motion.p>
        <h1 className="hero-title">
          <span className="line">
            <motion.span {...rise(0.15)}>Sapta Krishi</motion.span>
          </span>
          <span className="line line-sub">
            <motion.span {...rise(0.28)}>Modular Grand Challenge</motion.span>
          </span>
        </h1>
        <motion.p className="hero-motto" {...fade(0.55)}>
          Design. Swap. Deploy. Feed Bharat.
        </motion.p>
        <motion.p className="hero-lede" {...fade(0.65)}>
          Seven farm robot missions, from plant health to coconut climbing to clearing river weed, built on one modular system: the ARJUNA
          autonomous mobile robot and the Jetrick reconfigurable controller.
        </motion.p>
        <motion.div className="hero-ctas" {...fade(0.75)}>
          <DownloadButton>
            Download the proposal <small>PDF, {PDF_SIZE}</small>
          </DownloadButton>
          <a className="btn btn-ghost" href="#modules">
            See the seven missions
          </a>
        </motion.div>
      </motion.div>

      <div className="hero-field">
        <motion.div
          className="horizon"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease }}
        />
        <Furrows />
        <Countdown />
        <ul className="hero-modules" aria-label="The seven modules">
          {MODULES.map((m, i) => (
            <motion.li
              key={m.id}
              className={`kit-${m.kit}`}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.07, duration: 0.5, ease }}
            >
              <a href={`#${m.id}`}>
                <span className="hm-code">{m.code}</span>
                <span className="hm-name">{m.name}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Question() {
  const flow = ['Design', 'Build', 'Simulate', 'Swap', 'Deploy', 'Collaborate']
  return (
    <section className="question">
      <div className="wrap question-grid">
        <div>
          <p className="section-note">
            Indian agriculture does not have one robotics problem. It has many. A separate expensive machine for every job is not affordable for most
            farms. <em>Sapta</em> means seven, and the challenge asks:
          </p>
          <blockquote className="big-quote">
            Can one modular robotics system, a common intelligent brain with interchangeable bodies and tools, solve seven real Indian farm problems,
            affordably and autonomously?
          </blockquote>
        </div>
        <ol className="flow" aria-label="Challenge flow">
          {flow.map((f, i) => (
            <li key={f} style={{ ['--i' as string]: i }}>
              {f}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Kits() {
  const reduce = useReducedMotion()
  return (
    <section className="kits" id="kits">
      <div className="wrap">
        <h2 className="section-title">One brain, many bodies</h2>
        <p className="section-intro">
          Teams compete with two kits that connect through the Krishi Module Interface (KMI), so a tool built on Jetrick can be mounted on ARJUNA and
          recognised automatically. Like one tractor carrying many implements.
        </p>

        <div className="kit-diagram">
          <article className="kit-card kit-one">
            <p className="kit-tag">Kit 1</p>
            <h3>ARJUNA autonomous mobile robot</h3>
            <p>Fully assembled, the same hardware for every team. The contest is about intelligence.</p>
            <dl className="spec">
              <div>
                <dt>Compute</dt>
                <dd>NVIDIA Jetson Orin Nano Super, 8 GB</dd>
              </div>
              <div>
                <dt>Vision</dt>
                <dd>OAK-D 3D stereo depth camera with on-device AI</dd>
              </div>
              <div>
                <dt>Ranging</dt>
                <dd>2D LiDAR for mapping, localisation, obstacle avoidance</dd>
              </div>
              <div>
                <dt>Software</dt>
                <dd>ROS 2, with common interfaces for every module</dd>
              </div>
              <div>
                <dt>Expansion</dt>
                <dd>Top-plate KMI mount carries tools for K2, K3 and K4</dd>
              </div>
            </dl>
          </article>

          <div className="kmi" aria-label="Krishi Module Interface layers">
            <p className="kmi-title">KMI standard</p>
            <ol>
              {KMI_LAYERS.map((l, i) => (
                <motion.li
                  key={l.name}
                  initial={reduce ? false : { opacity: 0.25, x: i % 2 ? 14 : -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: i * 0.12, type: 'spring', stiffness: 420, damping: 26 }}
                >
                  <strong>{l.name}</strong>
                  <span>{l.text}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <article className="kit-card kit-two">
            <p className="kit-tag">Kit 2</p>
            <h3>Jetrick robot controller</h3>
            <p>Reconfigurable. Teams design and build their own robot body for the task.</p>
            <dl className="spec">
              <div>
                <dt>Control</dt>
                <dd>Drives team-chosen motors, servos and actuators; reads team-chosen sensors</dd>
              </div>
              <div>
                <dt>Freedom</dt>
                <dd>Build a climber, a boat, a weeder or a seeder</dd>
              </div>
              <div>
                <dt>Connection</dt>
                <dd>Mounts on ARJUNA as a tool module, or runs standalone</dd>
              </div>
              <div>
                <dt>Budget</dt>
                <dd>Add parts up to a published cost cap, with a declared bill of materials</dd>
              </div>
            </dl>
          </article>
        </div>

        <blockquote className="farmer-quote">
          A farmer should be able to change ARJUNA from a transport robot into a weeding robot in minutes, without a laptop.
        </blockquote>
      </div>
    </section>
  )
}

function Modules() {
  return (
    <section className="modules" id="modules">
      <div className="wrap">
        <h2 className="section-title">Seven missions</h2>
        <p className="section-intro">
          Enter one module or many. Each module crowns its own champion; the overall Sapta Krishi Champion shows breadth, modularity and integration.
          Pick a module to swap it in.
        </p>
        <ModuleSwap />
      </div>
    </section>
  )
}

function Leagues() {
  const reduce = useReducedMotion()
  return (
    <section className="leagues" id="leagues">
      <div className="wrap">
        <h2 className="section-title">Three leagues</h2>
        <div className="league-grid">
          {LEAGUES.map((l, i) => (
            <article key={l.name} className={`league league-${i}`}>
              <h3>{l.name}</h3>
              <p className="league-kit">{l.kit}</p>
              <ul>
                {l.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="league-for">{l.for}</p>
            </article>
          ))}
        </div>

        <div className="autonomy">
          <div className="autonomy-copy">
            <h3>The autonomy multiplier</h3>
            <p>
              Autonomy is the goal, but some modules are very hard. To keep participation open, every run’s score is multiplied by the level of
              autonomy achieved.
            </p>
          </div>
          {/* The observer sits on the list: a scaleX(0) bar has no area, so it would never intersect. */}
          <motion.ul className="autonomy-bars" initial={reduce ? 'on' : 'off'} whileInView="on" viewport={{ once: true, amount: 0.5 }}>
            {AUTONOMY.map((a, i) => (
              <li key={a.level}>
                <div className="ab-head">
                  <strong>{a.level}</strong>
                  <span className="ab-mult">×{a.mult.toFixed(1)}</span>
                </div>
                <div className="ab-track">
                  <motion.div
                    className="ab-fill"
                    variants={{ off: { scaleX: 0 }, on: { scaleX: a.mult } }}
                    transition={{ delay: i * 0.12, duration: 0.8, ease }}
                  />
                </div>
                <p>{a.text}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function FarmDay() {
  return (
    <section className="farmday" id="farm-day">
      <div className="wrap">
        <h2 className="section-title">Krishi Mela Farm Day</h2>
        <p className="section-intro">
          The grand finale puts every module on one farm in one integrated mission. Robots sow, scout, weed, climb, clean and carry, and hand work to
          each other. Modules a Grand League team hasn’t built are filled by reference robots, so every team runs a complete day.
        </p>

        <div className="farmday-grid">
          <ol className="day">
            {FARM_DAY.map((d) => (
              <li key={d.time}>
                <span className="day-time">{d.time}</span>
                <p>{d.what}</p>
                <span className="day-handoff">{d.handoff}</span>
              </li>
            ))}
          </ol>

          <aside className="pitstop">
            <h3>The KMI Pit Stop</h3>
            <p>ARJUNA arrives carrying the K2 transport tray. Against the clock, the team must:</p>
            <ol>
              <li>Remove the tray and fit their K3 weeding or K4 seeding module</li>
              <li>Let ARJUNA detect the module and load the right behaviour on its own</li>
              <li>Pass the safety check, where E-stop stops the tool, and start the new task</li>
            </ol>
            <dl className="pit-points">
              <div>
                <dt>Swap time, hands-on</dt>
                <dd>10</dd>
              </div>
              <div>
                <dt>Recognition with no laptop or code change</dt>
                <dd>10</dd>
              </div>
              <div>
                <dt>Safety chain passed</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>Task started correctly</dt>
                <dd>5</dd>
              </div>
            </dl>
            <p className="pit-note">The fastest swap with perfect safety wins the Pit Stop Award.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  const reduce = useReducedMotion()
  // Stage 0 is launch; stage 1 runs from launch to the end of November.
  const now = useNow(60_000)
  const current = now < LAUNCH_AT.getTime() ? 0 : now < new Date('2026-12-01').getTime() ? 1 : -1
  return (
    <section className="timeline" id="timeline">
      <div className="wrap">
        <h2 className="section-title">October 2026 to April 2027</h2>
        <p className="section-intro">
          Kit 1 teams start in a digital twin with LiDAR and OAK-D models in Gazebo or Isaac Sim. Kit 2 teams start with a design review. Teams train
          on public scenarios and are scored on hidden ones.
        </p>
        <ol className="stages">
          {STAGES.map((s, i) => (
            <motion.li
              key={s.name}
              className={i === current ? 'is-now' : undefined}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.45, ease }}
            >
              <span className="stage-n">{i}</span>
              <div>
                <p className="stage-when">
                  {s.when}
                  {i === current && <span className="now-tag">{i === 0 ? 'Up next' : 'Now'}</span>}
                </p>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
        <p className="fine">Final dates will be published on the Challenge Portal. Plantation and water rounds are scheduled with partners around weather and crops.</p>
      </div>
    </section>
  )
}

function Awards() {
  return (
    <section className="awards" id="awards">
      <div className="wrap">
        <h2 className="section-title">Becoming Sapta Krishi Champion</h2>
        <div className="champ">
          <div className="scorebar champ-bar" aria-hidden="true">
            {CHAMPION_SCORING.map((s) => (
              <span key={s.label} className="scorebar-seg" style={{ flexBasis: `${s.points}%` }}>
                {s.points}
              </span>
            ))}
          </div>
          <ul className="score-list champ-list">
            {CHAMPION_SCORING.map((s) => (
              <li key={s.label}>
                <span>{s.label}</span>
                <span className="score-pts">{s.points}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="awards-sub">Ten awards</h3>
        <ul className="award-list">
          {AWARDS.map((a) => (
            <li key={a.name}>
              <strong>{a.name}</strong>
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
        <p className="fine">
          Prize amounts and non-cash benefits, including kits for winning institutions, plantation pilots, incubation, internships and mentorship, will
          be announced separately.
        </p>
      </div>
    </section>
  )
}

function Enter() {
  return (
    <section className="enter" id="enter">
      <div className="wrap enter-grid">
        <div>
          <h2 className="section-title">Who can enter</h2>
          <ul className="teams">
            {TEAMS.map((t) => (
              <li key={t.name}>
                <strong>{t.name}</strong>
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
          <p className="enter-note">
            Teams of 3 to 8 are recommended. Kit 2 builds need mechanical, electronics and software skills, and climbing or water teams must include a
            member responsible for safety. International teams may join the simulation and design stages.
          </p>
        </div>
        <div className="submit">
          <h3>What you’ll submit</h3>
          <dl>
            <div>
              <dt>Software</dt>
              <dd>Containerised ROS 2 package, or controller code and ROS 2 nodes</dd>
            </div>
            <div>
              <dt>Design dossier</dt>
              <dd>CAD, mechanism calculations, safety analysis and costed bill of materials (Kit 2)</dd>
            </div>
            <div>
              <dt>KMI declaration</dt>
              <dd>Module descriptor and interface compliance checklist</dd>
            </div>
            <div>
              <dt>Technical report</dt>
              <dd>5 to 10 pages per module</dd>
            </div>
            <div>
              <dt>Demo video</dt>
              <dd>3 to 5 minutes per module</dd>
            </div>
            <div>
              <dt>Farmer pitch</dt>
              <dd>Finalists explain cost, use and value in 2 minutes of plain language</dd>
            </div>
          </dl>
          <p className="enter-note">
            Your background IP stays yours. The KMI specification will be published openly so anyone can build compatible modules.
          </p>
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="closing">
      <div className="closing-field" aria-hidden="true" />
      <div className="wrap closing-inner">
        <p className="closing-line">
          <span>Seven modules.</span> <span>One platform.</span> <span className="closing-small">A farmer-owned robot toolkit for Bharat.</span>
        </p>
        <div className="closing-cta">
          <DownloadButton>
            Download the PDF <small>{PDF_PAGES} pages, {PDF_SIZE}</small>
          </DownloadButton>
          <a className="btn btn-ghost" href={PDF_URL} target="_blank" rel="noopener">
            Open in browser
          </a>
        </div>
        <p className="closing-fine">
          Kit specifications, the KMI standard, arena dimensions, scoring values, safety procedures, prizes and IP terms will be published in the
          official Technical Rulebook before the competition begins.
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">Sapta Krishi Modular Challenge Secretariat</p>
          <p>
            Nitte Meenakshi Institute of Technology, Nitte (Deemed to be University), Bengaluru
            <br />
            Department of Robotics and Artificial Intelligence, Centre for Robotics Research
          </p>
        </div>
        <div>
          <p>Email and portal to be announced at launch.</p>
          <p className="footer-status">Proposal version 1.0, draft for partner review</p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#modules">
        Skip to the modules
      </a>
      <Header />
      <main>
        <Hero />
        <Question />
        <Kits />
        <Modules />
        <Leagues />
        <FarmDay />
        <Timeline />
        <Awards />
        <Enter />
        <Closing />
      </main>
      <Footer />
    </>
  )
}
