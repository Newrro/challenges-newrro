import { useEffect, useRef } from 'react'

// The radiating crop rows from the proposal cover, drawn in perspective.
// Cross-rows roll toward the viewer as if ARJUNA were driving down the field.
export function Furrows() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const vx = w / 2
      const rows = w < 640 ? 22 : 36
      const spread = w * 2.4

      // Crop rows fanning out from the vanishing point
      ctx.lineWidth = 1.25
      for (let i = 0; i <= rows; i++) {
        const x = vx - spread / 2 + (spread / rows) * i
        const grad = ctx.createLinearGradient(0, 0, 0, h)
        grad.addColorStop(0, 'rgba(185, 211, 188, 0)')
        grad.addColorStop(1, 'rgba(185, 211, 188, 0.32)')
        ctx.strokeStyle = grad
        ctx.beginPath()
        ctx.moveTo(vx + (x - vx) * 0.12, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }

      // Cross-rows: spaced by perspective, scrolling toward the viewer
      const speed = reduce ? 0 : t * 0.00009
      const count = 14
      for (let i = 0; i < count; i++) {
        const p = (i / count + speed) % 1
        const z = p * p // perspective easing: lines bunch near the horizon
        const y = z * h
        ctx.strokeStyle = `rgba(185, 211, 188, ${0.05 + z * 0.16})`
        ctx.lineWidth = 0.6 + z * 1.2
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }

    const loop = (t: number) => {
      if (visible) draw(t)
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    if (reduce) draw(0)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="furrows" aria-hidden="true" />
}
