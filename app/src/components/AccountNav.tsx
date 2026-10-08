import { Link } from 'react-router'
import { accountPath } from '../lib/accountPath'
import { account } from './contactLinks'

// Person icon for the room-page header; contact links live in the floating ContactFab there.
export function AccountNav() {
  return (
    <nav aria-label="บัญชี">
      <Link to={accountPath()} aria-label={account.label} title={account.label}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{account.icon}</svg>
      </Link>
    </nav>
  )
}
