import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../lib/supabase'
import './SignupPage.css'

export function ProfilePage() {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [busy, setBusy] = useState(false)

  // Only signed-in, finished accounts belong here; everyone else goes back to the wizard.
  useEffect(() => {
    ;(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return navigate('/signup', { replace: true })
      const { data } = await supabase.from('profiles').select('onboarded_at').eq('id', session.user.id).single()
      if (!data?.onboarded_at) return navigate('/signup', { replace: true })
      setReady(true)
    })()
  }, [navigate])

  const logout = async () => {
    setBusy(true)
    await supabase.auth.signOut()
    navigate('/', { replace: true })
  }

  if (!ready) return <main className="signup"><p className="signup-loading">…</p></main>

  return (
    <main className="signup">
      <header className="signup-top">
        <Link to="/" className="signup-back">← หน้าแรก <small>Home</small></Link>
      </header>
      <section className="signup-card">
        <h1>บัญชีของฉัน <small>My account</small></h1>
        <div className="actions">
          <button className="btn" disabled={busy} onClick={logout}>ออกจากระบบ <small>Log out</small></button>
        </div>
      </section>
    </main>
  )
}
