import { Link } from 'react-router'
import { accountPath } from '../lib/accountPath'
import { account } from './contactLinks'
import { ThemeToggle } from './ThemeToggle'
import './ContactDock.css'

// Home page: only the account (login) icon stays top-right; contact links live in the floating ContactFab, as on the room pages.
export function ContactDock() {
  return (
    <aside className="dock" aria-label="บัญชี">
      <ThemeToggle className="dock-btn" />
      <Link className="dock-btn dock-account" to={accountPath()} aria-label={account.label} title={account.label}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{account.icon}</svg>
      </Link>
    </aside>
  )
}
