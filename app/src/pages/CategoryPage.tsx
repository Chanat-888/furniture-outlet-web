import { AccountNav } from '../components/AccountNav'
import { ContactFab } from '../components/ContactFab'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { categories } from '../data/categories'
import { filters as allFilters, products, PRICES_AS_OF } from '../data/products'
import { CONTACT } from '../data/contact'
import { fbPhotos, fbSrc } from '../data/fbPhotos'
import { Arrow } from '../components/Arrow'
import { ProductCard } from '../components/ProductCard'
import { RoomIcon } from '../components/RoomIcon'
import './CategoryPage.css'

const LINE = CONTACT.lineHref
const TEL = CONTACT.phoneHref
const photo = (base: string, w: number) => `${base}?w=${w}&q=72&auto=format&fit=crop`

export function CategoryPage() {
  const { id } = useParams()
  const i = categories.findIndex((c) => c.id === id)
  const c = categories[i]
  const [filter, setFilter] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const items = products[id ?? ''] ?? []
  const fb = fbPhotos[id ?? ''] ?? []
  // every sub-category from the home card, plus product-type filters; types with no product here link to the shop
  const chips = useMemo(() => {
    const defs = allFilters[id ?? ''] ?? []
    const all = [...defs, ...(c?.sub ?? []).filter((s) => !defs.some((f) => f.label === s)).map((s) => ({ label: s, match: [s] }))]
    return all.map((f) => ({ ...f, n: items.filter((p) => f.match.some((m) => p.name.includes(m))).length }))
  }, [id, items, c])
  const revealed = useRef(new Set<string>())
  const active = chips.find((f) => f.label === filter && f.n > 0)
  const shown = active ? items.filter((p) => active.match.some((m) => p.name.includes(m))) : items

  useEffect(() => { setFilter(null) }, [id])
  useEffect(() => { if (c) document.title = `${c.th} — Furniture Outlet` }, [c])

  // hide the scroll cue once the visitor starts scrolling
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // stroke-draw the room icon: normalise every shape to length 1
  useEffect(() => {
    heroRef.current?.querySelectorAll('.hero-icon :is(path,rect)').forEach((el) => el.setAttribute('pathLength', '1'))
  }, [id])

  // cards rise in once as they enter; content stays visible without JS
  useEffect(() => {
    const grid = gridRef.current
    if (!grid || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // only cards not yet seen; stagger follows the real column count
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length
    const cards = [...grid.querySelectorAll<HTMLAnchorElement>('.card')].filter((el) => !revealed.current.has(el.href))
    cards.forEach((el) => el.classList.add('pending'))
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLAnchorElement
      el.style.setProperty('--i', String([...grid.children].indexOf(el) % cols))
      el.classList.replace('pending', 'in'); revealed.current.add(el.href); io.unobserve(el)
    }), { rootMargin: '0px 0px -8% 0px' })
    cards.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [id, filter])

  if (!c) return <Navigate to="/" replace />
  const prev = categories[(i + categories.length - 1) % categories.length]
  const next = categories[(i + 1) % categories.length]

  return (
    <div className="room" key={c.id}>
      <section className="hero" ref={heroRef} aria-labelledby="room-title">
        <img className="hero-img" alt="" fetchPriority="high"
          src={photo(c.photo, 1600)}
          srcSet={[800, 1200, 1600, 2400].map((w) => `${photo(c.photo, w)} ${w}w`).join(', ')}
          sizes="100vw" />
        <div className="hero-scrim" />

        <header className="hero-bar">
          <Link to="/" viewTransition className="hero-back">
            <Arrow dir="left" />
            <span>ทุกห้อง<small>All rooms</small></span>
          </Link>
          <Link to="/" viewTransition className="hero-brand" aria-label="Furniture Outlet — หน้าแรก">
            <span lang="en">Furniture Outlet</span>
          </Link>
          <AccountNav />
        </header>

        <div className="hero-title">
          <RoomIcon icon={c.icon} className="hero-icon" />
          <h1 id="room-title">{c.th}</h1>
          <span className="hero-rule" />
          <p className="hero-en" lang="en">{c.en}</p>
        </div>

        <button type="button" className={scrolled ? 'hero-cue gone' : 'hero-cue'}
          onClick={() => listRef.current?.scrollIntoView({
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          })}>
          <span className="cue-ring"><Arrow dir="down" /></span>
          <span className="cue-text">เลื่อนดูสินค้า<small lang="en">Scroll</small></span>
        </button>

        <small className="hero-credit" lang="en">Photo: {c.credit} / Unsplash</small>
      </section>

      <section className="shelf" ref={listRef} aria-labelledby="shelf-title">
        <div className="shelf-head">
          <h2 id="shelf-title">สินค้าทั้งหมด</h2>
          {items.length > 0 && <p>{items.length} รายการ · ราคา ณ {PRICES_AS_OF} จากหน้าร้านออนไลน์</p>}
        </div>

        {items.length > 0 && chips.length > 0 && (
          <div className="chips" role="group" aria-label="กรองตามประเภท">
            <button type="button" aria-pressed={!active} onClick={() => setFilter(null)}>
              ทั้งหมด <span>{items.length}</span>
            </button>
            {chips.map((f) => f.n > 0 ? (
              <button type="button" key={f.label} aria-pressed={active?.label === f.label} onClick={() => setFilter(f.label)}>
                {f.label} <span>{f.n}</span>
              </button>
            ) : (
              <a key={f.label} href={c.href} target="_blank" rel="noopener" title="ดูที่เว็บไซต์ร้าน">
                {f.label} <Arrow dir="out" />
              </a>
            ))}
          </div>
        )}

        {items.length > 0 ? (
          <>
            <div className="grid" ref={gridRef}>
              {shown.map((p) => <ProductCard key={p.href} p={p} icon={c.icon} />)}
            </div>
            <a className="shelf-more" href={c.href} target="_blank" rel="noopener">
              ดู{c.th}ทั้งหมดที่ furniture-outletshop.com <Arrow dir="out" />
            </a>
          </>
        ) : (
          <div className="empty">
            <RoomIcon icon={c.icon} className="empty-icon" />
            <h3>ยังไม่มีสินค้าออนไลน์ในหมวดนี้</h3>
            <p>สินค้า{c.th}มีให้ดูที่หน้าร้าน ทักไลน์มาถามรุ่นและราคาได้เลย</p>
            <div className="chips empty-subs" role="group" aria-label="ประเภทสินค้าในหมวดนี้ (เปิดเว็บไซต์ร้าน)">
              {c.sub.map((s) => (
                <a key={s} href={c.href} target="_blank" rel="noopener" title="ดูที่เว็บไซต์ร้าน">{s} <Arrow dir="out" /></a>
              ))}
            </div>
          </div>
        )}

        {fb.length > 0 && (
          <div className="fb">
            <div className="shelf-head">
              <h2>ล่าสุดจาก Facebook</h2>
              <p>{fb.length} โปสเตอร์ · ตั้งแต่ 6 เม.ย. 2569 · ราคาและโปรโมชันตามโพสต์ ทักไลน์ถามราคาปัจจุบันได้</p>
            </div>
            <div className="fb-grid">
              {fb.map((n) => (
                <a key={n} className="fb-tile" href={CONTACT.facebook} target="_blank" rel="noopener" aria-label="ดูโพสต์บน Facebook">
                  <img src={fbSrc(n)} alt="" width="206" height="206" loading="lazy" decoding="async" />
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Furniture Outlet ครบจบที่เดียว</h2>
        <p lang="en">Ask about stock, delivery and today’s price</p>
        <div className="contact-actions">
          <a className="btn btn-white" href={LINE} target="_blank" rel="noopener">LINE {CONTACT.lineId}</a>
          <a className="btn btn-line" href={TEL}>โทร {CONTACT.phoneLabel}</a>
          <a className="btn btn-line" href={CONTACT.facebook} target="_blank" rel="noopener">Facebook</a>
        </div>
      </section>

      <nav className="rooms" aria-label="ห้องอื่น">
        <Link to={`/category/${prev.id}`} viewTransition className="rooms-prev" aria-label={`ห้องก่อนหน้า: ${prev.th}`}>
          <b><Arrow dir="left" />{prev.th}</b><i lang="en">{prev.en}</i>
        </Link>
        <Link to={`/category/${next.id}`} viewTransition className="rooms-next" aria-label={`ห้องถัดไป: ${next.th}`}>
          <b>{next.th}<Arrow dir="right" /></b><i lang="en">{next.en}</i>
        </Link>
      </nav>
      <ContactFab />
    </div>
  )
}
