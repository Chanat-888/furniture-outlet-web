import { links } from './contactLinks'

export function ContactNav() {
  return (
    <nav className="contact-nav" aria-label="ติดต่อ">
      {links.map((l) => (
        <a key={l.key} href={l.href} aria-label={l.label} title={l.label}
          {...(l.key === 'phone' ? {} : { target: '_blank', rel: 'noopener' })}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{l.icon}</svg>
        </a>
      ))}
    </nav>
  )
}
