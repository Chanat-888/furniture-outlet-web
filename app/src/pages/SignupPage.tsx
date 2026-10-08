import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import './SignupPage.css'

const POLICY_VERSION = '2026-10-08'
const PENDING_KEY = 'signup-pending-consent' // consent ticked before the Google redirect
const STEP_KEY = 'signup-step' // lets LINE / Facebook redirects resume at step 4

type Step = 1 | 2 | 3 | 4
type Provider = 'google' | 'facebook' | 'custom:line'
// [province, [[district, [[subdistrict, postcode], …]], …]]
type Tree = [string, [string, [string, string][]][]][]
const STEPS: [string, string][] = [
  ['อีเมล', 'Gmail'],
  ['ข้อมูลติดต่อ', 'Contact'],
  ['ที่อยู่', 'Address'],
  ['บัญชีอื่น', 'LINE · Facebook'],
]

type Profile = { username: string | null; phone: string | null; privacy_consent_at: string | null; onboarded_at: string | null }
type Address = { address_line: string; subdistrict: string; district: string; province: string; postcode: string; note: string }
const EMPTY_ADDRESS: Address = { address_line: '', subdistrict: '', district: '', province: '', postcode: '', note: '' }

const redirectTo = () => window.location.origin + '/signup'

export function SignupPage() {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [addressId, setAddressId] = useState<string | null>(null)
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS)
  const [tree, setTree] = useState<Tree>([])
  const [step, setStep] = useState<Step | null>(null)
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [linked, setLinked] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    return () => subscription.unsubscribe()
  }, [])

  const userId = session?.user.id

  // Coming back from a provider page without logging in (back button, closed tab) restores
  // this page with the buttons still disabled; turn them back on.
  useEffect(() => {
    const reset = () => setBusy(false)
    const onVisible = () => { if (document.visibilityState === 'visible') reset() }
    window.addEventListener('pageshow', reset)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('pageshow', reset)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  // ~290 KB of Thai province data, fetched only when someone reaches the address step.
  useEffect(() => {
    if (step === 3 && !tree.length) import('../data/thaiAddress.json').then((m) => setTree(m.default as Tree))
  }, [step, tree.length])

  // Load the profile (and any saved address); apply consent ticked before the Google redirect.
  useEffect(() => {
    if (session === undefined) return
    if (!userId) { setProfile(null); setStep(1); return }
    let cancelled = false
    ;(async () => {
      const { data } = await supabase.from('profiles')
        .select('username, phone, privacy_consent_at, onboarded_at').eq('id', userId).single()
      let p = data as Profile | null
      if (cancelled || !p) return
      const pending = localStorage.getItem(PENDING_KEY)
      if (pending && !p.privacy_consent_at) {
        const fields = JSON.parse(pending)
        const { error: e } = await supabase.from('profiles').update(fields).eq('id', userId)
        if (!e) { localStorage.removeItem(PENDING_KEY); p = { ...p, privacy_consent_at: fields.privacy_consent_at } }
      }
      if (p.onboarded_at) { navigate('/', { replace: true }); return }

      const { data: addr } = await supabase.from('addresses').select('*').eq('user_id', userId)
        .order('created_at').limit(1).maybeSingle()
      const { data: ids } = await supabase.auth.getUserIdentities()
      if (cancelled) return
      if (addr) { setAddressId(addr.id); setAddress({ ...EMPTY_ADDRESS, ...addr, note: addr.note ?? '' }) }
      setLinked(ids?.identities.map((i) => i.provider) ?? [])
      setUsername(p.username ?? '')
      setPhone(p.phone ?? '')
      setProfile(p)
      const saved = Number(localStorage.getItem(STEP_KEY)) as Step
      setStep(!p.privacy_consent_at || !session?.user.email ? 1 : !p.username || !p.phone ? 2 : saved >= 3 ? saved : 3)
    })()
    return () => { cancelled = true }
  }, [session, userId, navigate])

  const go = (s: Step) => { localStorage.setItem(STEP_KEY, String(s)); setError(''); setStep(s) }

  // Runs a save; moves on only if it succeeds.
  const save = async (work: () => Promise<{ message: string } | null | void>, next: Step) => {
    setBusy(true); setError('')
    const e = await work()
    setBusy(false)
    if (e) setError('บันทึกไม่สำเร็จ ลองอีกครั้ง · Could not save, please try again.')
    else go(next)
  }

  const consentFields = () => {
    const now = new Date().toISOString()
    return {
      privacy_consent_at: now, privacy_policy_version: POLICY_VERSION,
      marketing_opt_in: marketing, marketing_opt_in_at: marketing ? now : null,
    }
  }

  const startOAuth = async (provider: Provider) => {
    localStorage.setItem(PENDING_KEY, JSON.stringify(consentFields()))
    setBusy(true)
    const { error: e } = await supabase.auth.signInWithOAuth({ provider: provider as 'google', options: { redirectTo: redirectTo() } })
    if (e) { setBusy(false); setError('เข้าสู่ระบบไม่สำเร็จ ลองวิธีอื่น · Could not start sign-in with this method.') }
  }

  const saveConsent = async () => {
    setBusy(true); setError('')
    const fields = consentFields()
    const { error: e } = await supabase.from('profiles').update(fields).eq('id', userId!)
    setBusy(false)
    if (e) return setError('บันทึกไม่สำเร็จ ลองอีกครั้ง · Could not save, please try again.')
    setProfile({ ...profile!, privacy_consent_at: fields.privacy_consent_at })
    if (session?.user.email) go(2)
  }

  // LINE / Facebook accounts can arrive without an email: attach Gmail to that same account.
  const linkGmail = async () => {
    const { error: e } = await supabase.auth.linkIdentity({ provider: 'google', options: { redirectTo: redirectTo() } })
    if (e) setError('เชื่อมต่อ Gmail ไม่สำเร็จ อาจมีบัญชีนี้อยู่แล้ว · Could not link Gmail; it may already belong to another account.')
  }

  const submitContact = (e: FormEvent) => {
    e.preventDefault()
    const phoneDigits = phone.replace(/[\s-]/g, '')
    if (username.trim().length < 2) return setError('กรอกชื่อผู้ใช้อย่างน้อย 2 ตัวอักษร · Username needs at least 2 characters.')
    if (!/^0\d{8,9}$/.test(phoneDigits)) return setError('เบอร์โทรไม่ถูกต้อง เช่น 0812345678 · Enter a Thai phone number, e.g. 0812345678.')
    save(async () => {
      const { error: e } = await supabase.from('profiles').update({ username: username.trim(), phone: phoneDigits }).eq('id', userId!)
      return e
    }, 3)
  }

  const addressBlank = Object.values({ ...address, note: '' }).every((v) => !v.trim())
  const submitAddress = (e: FormEvent) => {
    e.preventDefault()
    if (addressBlank) return go(4) // optional: skipping is fine
    const { address_line, subdistrict, district, province, postcode } = address
    if (![address_line, subdistrict, district, province].every((v) => v.trim())) return setError('กรอกที่อยู่ให้ครบ · Please fill in every address field.')
    if (!/^\d{5}$/.test(postcode.trim())) return setError('รหัสไปรษณีย์ 5 หลัก · Postcode must be 5 digits.')
    const row = {
      address_line: address_line.trim(), subdistrict: subdistrict.trim(), district: district.trim(),
      province: province.trim(), postcode: postcode.trim(), note: address.note.trim() || null,
    }
    save(async () => {
      const q = addressId
        ? supabase.from('addresses').update(row).eq('id', addressId)
        : supabase.from('addresses').insert({ ...row, user_id: userId, is_default: true })
      const { error: e } = await q
      return e
    }, 4)
  }

  const link = async (provider: 'facebook' | 'custom:line') => {
    localStorage.setItem(STEP_KEY, '4')
    const { error: e } = await supabase.auth.linkIdentity({ provider: provider as 'facebook', options: { redirectTo: redirectTo() } })
    if (e) setError('ยังเชื่อมต่อไม่ได้ในตอนนี้ · This sign-in method is not available yet.')
  }

  const finish = () => save(async () => {
    const { error: e } = await supabase.from('profiles').update({ onboarded_at: new Date().toISOString() }).eq('id', userId!)
    if (!e) navigate('/', { replace: true })
    return e
  }, 4)

  const addrInput = (key: keyof Address, th: string, en: string, props: Record<string, unknown> = {}) => (
    <label className="field">
      <span>{th} <small>{en}</small></span>
      <input value={address[key]} onChange={(e) => setAddress({ ...address, [key]: e.target.value })} {...props} />
    </label>
  )

  // Province → district → subdistrict: each list shows only what belongs to the choice above.
  const provinceRow = tree.find((p) => p[0] === address.province)
  const districtRow = provinceRow?.[1].find((d) => d[0] === address.district)
  const addrSelect = (key: 'province' | 'district' | 'subdistrict', th: string, en: string, options: string[], disabled: boolean,
    onPick: (v: string) => Address) => (
    <label className="field">
      <span>{th} <small>{en}</small></span>
      <select value={address[key]} disabled={disabled} onChange={(e) => setAddress(onPick(e.target.value))}>
        <option value="">เลือก · Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )

  if (step === null) return <main className="signup"><p className="signup-loading">…</p></main>

  const hasConsent = !!profile?.privacy_consent_at

  return (
    <main className="signup">
      <header className="signup-top">
        <Link to="/" className="signup-back">← หน้าแรก <small>Home</small></Link>
      </header>

      <ol className="stepper" aria-label="ขั้นตอน">
        {STEPS.map(([th, en], i) => (
          <li key={en} aria-current={step === i + 1 ? 'step' : undefined} className={step > i + 1 ? 'done' : ''}>
            <b>{i + 1}</b><span>{th}<small>{en}</small></span>
          </li>
        ))}
      </ol>

      <section className="signup-card">
        {step === 1 && (
          <>
            <h1>สมัครสมาชิก <small>Create your account</small></h1>
            {hasConsent && session?.user.email ? (
              <p className="lead">เข้าสู่ระบบด้วย <b>{session.user.email}</b><br /><small>Signed in</small></p>
            ) : hasConsent ? (
              <p className="notice">บัญชีนี้ยังไม่มีอีเมล กรุณาเชื่อมต่อ Gmail เพื่อดำเนินการต่อ<br /><small>This account has no email yet. Link your Gmail to continue.</small></p>
            ) : (
              <>
                <p className="lead">ใช้บัญชี Gmail ของคุณ อีเมลนี้จะใช้ส่งรายละเอียดคำสั่งซื้อ<br /><small>Use your Gmail. We send order details to this address.</small></p>
                <label className="check">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span>ฉันยอมรับนโยบายความเป็นส่วนตัว และยินยอมให้เก็บและใช้ข้อมูลส่วนบุคคลเพื่อการให้บริการ
                    <small>I accept the privacy policy and consent to my personal data being collected and used to provide the service.</small></span>
                </label>
                <label className="check">
                  <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                  <span>รับโปรโมชั่นและข่าวสารทางอีเมล (ไม่บังคับ)<small>Email me promotions and news (optional)</small></span>
                </label>
              </>
            )}
            {error && <p className="error" role="alert">{error}</p>}
            <div className="actions">
              {hasConsent && session?.user.email ? (
                <button className="btn" onClick={() => go(2)}>ถัดไป <small>Next</small></button>
              ) : hasConsent ? (
                <button className="btn" onClick={linkGmail}>เชื่อมต่อ Gmail <small>Link Gmail</small></button>
              ) : userId ? (
                <button className="btn" disabled={!consent || busy} onClick={saveConsent}>
                  ถัดไป <small>Next</small>
                </button>
              ) : (
                <div className="sign-in-list">
                  <button className="btn" disabled={!consent || busy} onClick={() => startOAuth('google')}>
                    ดำเนินการต่อด้วย Google <small>Continue with Google</small>
                  </button>
                  <p className="or">หรือเข้าสู่ระบบด้วยบัญชีที่เชื่อมต่อไว้ · or sign in with a linked account</p>
                  <div className="row">
                    <button className="btn ghost" disabled={!consent || busy} onClick={() => startOAuth('custom:line')}>LINE</button>
                    <button className="btn ghost" disabled={!consent || busy} onClick={() => startOAuth('facebook')}>Facebook</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <form onSubmit={submitContact} noValidate>
            <h1>ข้อมูลติดต่อ <small>Contact details</small></h1>
            <label className="field">
              <span>ชื่อผู้ใช้ <small>Username</small></span>
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="name" required />
            </label>
            <label className="field">
              <span>เบอร์โทรศัพท์ <small>Phone</small></span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="0812345678" required />
              <em>ใช้สำหรับโทรติดต่อเรื่องคำสั่งซื้อเท่านั้น · Only used to call you about orders.</em>
            </label>
            {error && <p className="error" role="alert">{error}</p>}
            <div className="actions">
              <button type="button" className="btn ghost" onClick={() => go(1)}>ย้อนกลับ <small>Back</small></button>
              <button className="btn" disabled={busy}>ถัดไป <small>Next</small></button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={submitAddress} noValidate>
            <h1>ที่อยู่จัดส่ง <small>Delivery address · optional</small></h1>
            <p className="notice">ข้ามได้ แต่ต้องมีที่อยู่ก่อนสั่งซื้อสินค้า<br /><small>You can skip this, but an address is required when you place an order.</small></p>
            {addrInput('address_line', 'บ้านเลขที่ ถนน อาคาร', 'Street address', { autoComplete: 'address-line1' })}
            <div className="row">
              {addrSelect('province', 'จังหวัด', 'Province', tree.map((p) => p[0]), !tree.length,
                (v) => ({ ...address, province: v, district: '', subdistrict: '', postcode: '' }))}
              {addrSelect('district', 'เขต/อำเภอ', 'District', provinceRow?.[1].map((d) => d[0]) ?? [], !provinceRow,
                (v) => ({ ...address, district: v, subdistrict: '', postcode: '' }))}
            </div>
            <div className="row">
              {addrSelect('subdistrict', 'แขวง/ตำบล', 'Subdistrict', districtRow?.[1].map((t) => t[0]) ?? [], !districtRow,
                (v) => ({ ...address, subdistrict: v, postcode: districtRow?.[1].find((t) => t[0] === v)?.[1] ?? '' }))}
              {addrInput('postcode', 'รหัสไปรษณีย์', 'Postcode', { inputMode: 'numeric', maxLength: 5, autoComplete: 'postal-code' })}
            </div>
            {addrInput('note', 'หมายเหตุการจัดส่ง (ไม่บังคับ)', 'Delivery note, landmarks')}
            {error && <p className="error" role="alert">{error}</p>}
            <div className="actions">
              <button type="button" className="btn ghost" onClick={() => go(2)}>ย้อนกลับ <small>Back</small></button>
              <button className="btn" disabled={busy}>
                {addressBlank ? 'ข้ามไปก่อน' : 'ถัดไป'} <small>{addressBlank ? 'Skip for now' : 'Next'}</small>
              </button>
            </div>
          </form>
        )}

        {step === 4 && (
          <>
            <h1>เชื่อมต่อบัญชีอื่น <small>Link LINE or Facebook · optional</small></h1>
            <p className="lead">เชื่อมต่อแล้วเข้าสู่ระบบด้วย LINE หรือ Facebook ได้ในครั้งต่อไป<br /><small>Once linked, you can sign in with either next time.</small></p>
            <div className="link-list">
              {([['custom:line', 'LINE'], ['facebook', 'Facebook']] as const).map(([provider, name]) => (
                <button key={provider} className="btn ghost" disabled={linked.includes(provider)} onClick={() => link(provider)}>
                  {linked.includes(provider) ? `${name} เชื่อมต่อแล้ว ✓` : `เชื่อมต่อ ${name}`}
                </button>
              ))}
            </div>
            {error && <p className="error" role="alert">{error}</p>}
            <div className="actions">
              <button type="button" className="btn ghost" onClick={() => go(3)}>ย้อนกลับ <small>Back</small></button>
              <button className="btn" disabled={busy} onClick={finish}>เสร็จสิ้น <small>Finish</small></button>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
