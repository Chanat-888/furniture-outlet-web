// The visitor's own clock drives both the house hero's scene and the site-wide light/dark theme.
// 05:00-06:30 dawn, 06:30-17:00 day, 17:00-18:30 evening, 18:30-05:00 night (dark theme).
// index.html runs the same rule inline before first paint, so keep the two in step.

export type Phase = 'dawn' | 'day' | 'eve' | 'night'

export const phaseAt = (d: Date): Phase => {
  const m = d.getHours() * 60 + d.getMinutes()
  return m < 300 ? 'night' : m < 390 ? 'dawn' : m < 1020 ? 'day' : m < 1110 ? 'eve' : 'night'
}

export const themeAt = (d: Date) => (phaseAt(d) === 'night' ? 'dark' : 'light')

const GROUND = { light: '#f6f2ee', dark: '#3c3d41' }

function apply() {
  const theme = themeAt(new Date())
  const root = document.documentElement
  if (root.dataset.theme !== theme) root.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', GROUND[theme])
}

/** Sets the theme now and re-checks every 30 s, so an open tab turns dark at 18:30 and light at 05:00. */
export function startThemeClock() {
  apply()
  setInterval(apply, 30_000)
  document.addEventListener('visibilitychange', () => { if (!document.hidden) apply() })
}
