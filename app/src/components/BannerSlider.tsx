import { useEffect, useRef, useState } from 'react'
import type { Product } from '../data/products'
import { Arrow } from './Arrow'

const AUTOPLAY_MS = 5000

export function BannerSlider({ slides, label }: { slides: Product[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches

  const go = (n: number) => {
    const el = track.current
    if (!el) return
    const to = (n + slides.length) % slides.length
    el.scrollTo({ left: to * el.clientWidth, behavior: reduce() ? 'auto' : 'smooth' })
  }

  // gentle autoplay; stops on hover, focus or touch, and never runs with reduced motion
  useEffect(() => {
    if (paused || slides.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => go(i + 1), AUTOPLAY_MS)
    return () => clearInterval(t)
  })

  return (
    <div className="slider" role="region" aria-roledescription="carousel" aria-label={label}
      onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
      <div className="slider-track" ref={track} tabIndex={0}
        onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) }
          if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) }
        }}>
        {slides.map((s, n) => (
          <div className="slide" key={s.img} role="group" aria-roledescription="สไลด์" aria-label={`${n + 1} จาก ${slides.length}`}>
            <img src={s.img} alt={s.name} loading={n ? 'lazy' : undefined} decoding="async" draggable={false} />
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <>
          <button type="button" className="slider-nav slider-prev" aria-label="ภาพก่อนหน้า" onClick={() => go(i - 1)}><Arrow dir="left" /></button>
          <button type="button" className="slider-nav slider-next" aria-label="ภาพถัดไป" onClick={() => go(i + 1)}><Arrow dir="right" /></button>
          <div className="slider-dots">
            {slides.map((s, n) => (
              <button type="button" key={s.img} aria-label={`ไปที่ภาพที่ ${n + 1}`} aria-current={n === i} onClick={() => go(n)} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
