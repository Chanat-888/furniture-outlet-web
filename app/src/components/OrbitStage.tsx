import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import { categories } from '../data/categories'
import { Box } from './Box'
import './OrbitStage.css'

// motion: boxes spin one full lap at the centre while the circle grows to R -> slow orbit
const SLOW = 0.11 // rad/s (one lap per ~57s)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const inOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2)
const out = (p: number) => 1 - (1 - p) ** 3

export function OrbitStage() {
  const stageRef = useRef<HTMLElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const boxRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stage = stageRef.current!, ring = ringRef.current!
    const boxes = boxRefs.current.filter((b): b is HTMLAnchorElement => !!b)
    const N = boxes.length

    // layout: box size, orbit radius, logo width all follow the stage
    let W = 0, H = 0, R = 0, HS = 168
    const size = () => {
      W = stage.clientWidth; H = stage.clientHeight
      const m = Math.min(W, H), s = Math.max(72, Math.min(148, m * 0.17))
      R = Math.max(0, m / 2 - s / 2 - 6); HS = Math.max(168, s * 1.25)
      stage.style.setProperty('--s', s + 'px')
      stage.style.setProperty('--hs', HS + 'px')
      stage.style.setProperty('--lw', Math.min(380, Math.max(110, (R - s / 2) * 1.5)) + 'px')
      ring.style.width = ring.style.height = 2 * R + 'px'
    }
    const ro = new ResizeObserver(size)
    ro.observe(stage); size()

    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let t = still ? 9 : 0, th = 0, th0 = 0, // th0: slow-orbit angle
       k = 1, last = performance.now(), raf = 0

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1e3); last = now; t += dt
      const pr = inOut(clamp((t - 0.7) / 3.2)), sc = 0.3 + 0.7 * out(clamp((t - 0.7) / 2)), op = clamp(t / 0.5)
      const h = stage.querySelector('.box:hover,.box:focus-visible,.box.on') // pause orbit while a box is held
      k += ((h && t > 4.2 ? 0 : 1) - k) * Math.min(1, dt * 6)
      // intro: exactly one lap, easing out to a stop; then the slow orbit takes over
      if (!still && t > 4.2) th0 += SLOW * k * dt
      th = (still ? 0 : 2 * Math.PI * out(clamp(t / 4.2))) + th0
      ring.style.scale = String(pr); ring.style.opacity = String(op)
      const hw = HS / 2
      boxes.forEach((b, i) => {
        const a = th + (i * 2 * Math.PI) / N - Math.PI / 2, x = R * pr * Math.cos(a), y = R * pr * Math.sin(a)
        const f = (b.firstElementChild as HTMLElement).style
        b.style.transform = `translate(${x}px,${y}px) rotate(${th * (1 - pr)}rad) scale(${sc})`
        b.style.opacity = String(op)
        // keep the enlarged card inside the stage
        f.setProperty('--dx', (b === h ? clamp(x, -W / 2 + hw, W / 2 - hw) - x : 0) + 'px')
        f.setProperty('--dy', (b === h ? clamp(y, -H / 2 + hw, H / 2 - hw) - y : 0) + 'px')
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  // touch: first tap previews, second tap opens
  const onBoxClick = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return // let the browser open a new tab
    e.preventDefault()
    if (matchMedia('(hover: none)').matches && activeId !== id) { setActiveId(id); return }
    // the clicked card grows into the room hero (view transition)
    const face = e.currentTarget.firstElementChild as HTMLElement
    face.style.viewTransitionName = 'room-hero'
    navigate(`/category/${id}`, { viewTransition: true })
  }

  return (
    <main className="stage" ref={stageRef}
      onClick={(e) => { if (!(e.target as Element).closest('.box')) setActiveId(null) }}>
      {categories.map((c, i) => (
        <Box key={c.id} item={c} on={activeId === c.id} onClick={onBoxClick(c.id)}
          ref={(el) => { boxRefs.current[i] = el }} />
      ))}
      <div className="ring" ref={ringRef} />
      <div className="logo" role="img" aria-label="Furniture Outlet">
        <img className="logo-part logo-top" alt="" src="/logo.png" />
        <img className="logo-part logo-line" alt="" src="/logo.png" />
        <img className="logo-part logo-bottom" alt="" src="/logo.png" />
      </div>
    </main>
  )
}
