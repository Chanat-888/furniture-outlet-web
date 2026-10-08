import { Link } from 'react-router'
import { account, links } from './contactLinks'

export function ContactNav() {
  return (
    <nav className="contact-nav" aria-label="ติดต่อ">
      {links.map((l) => (
        <a key={l.key} href={l.href} aria-label={l.label} title={l.label}
          {...(l.key === 'phone' ? {} : { target: '_blank', rel: 'noopener' })}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{l.icon}</svg>
        </a>
      ))}
      <Link to={account.to} aria-label={account.label} title={account.label}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{account.icon}</svg>
      </Link>
    </nav>
  )
}
