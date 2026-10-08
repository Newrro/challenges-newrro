import { useEffect, useRef, useState } from 'react'

// A shower of marigold petals over the site at the moment of launch.
const COLORS = ['#f5a524', '#e8892b', '#f7c948', '#d9661f', '#fbd06b']
const DURATION = 7000

type Petal = { x: number; y: number; vy: number; sway: number; phase: number; rot: number; vr: number; size: number; color: string }

export function Petals() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [done, setDone] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = w < 640 ? 70 : 150
    const petals: Petal[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h * 0.9, // staggered so they arrive in a stream
      vy: 1.4 + Math.random() * 2.2,
      sway: 0.6 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.12,
      size: 5 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const elapsed = t - start
      ctx.clearRect(0, 0, w, h)
      // Fade the whole shower out over the last second
      ctx.globalAlpha = Math.min(1, Math.max(0, (DURATION - elapsed) / 1000))
      for (const p of petals) {
        p.y += p.vy
        p.phase += 0.03
        p.x += Math.sin(p.phase) * p.sway
        p.rot += p.vr
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      if (elapsed < DURATION) raf = requestAnimationFrame(tick)
      else setDone(true)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (done) return null
  return <canvas ref={ref} className="petals" aria-hidden="true" />
}
