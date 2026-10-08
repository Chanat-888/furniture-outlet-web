import { useState } from 'react'
import { links } from './contactLinks'
import './ContactDock.css'

export function ContactDock() {
  const [open, setOpen] = useState(true)
  return (
    <aside className="dock" aria-label="ติดต่อเรา">
      {open && links.map((l) => (
        <a key={l.key} className={`dock-btn dock-${l.key}`} href={l.href} aria-label={l.label} title={l.label}
          {...(l.key === 'phone' ? {} : { target: '_blank', rel: 'noopener' })}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{l.icon}</svg>
        </a>
      ))}
      <button type="button" className="dock-toggle" onClick={() => setOpen(!open)}
        aria-expanded={open} aria-label={open ? 'ซ่อนช่องทางติดต่อ' : 'แสดงช่องทางติดต่อ'}>
        <i><svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 5h16v11H9l-5 4z" />}
        </svg></i>
      </button>
    </aside>
  )
}
