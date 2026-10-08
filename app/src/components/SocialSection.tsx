import { useEffect } from 'react'
import { CONTACT } from '../data/contact'
import './SocialSection.css'

const tiktokUser = CONTACT.tiktok.split('/@')[1]
const fbSrc = 'https://www.facebook.com/plugins/page.php?' + new URLSearchParams({
  href: CONTACT.facebook, tabs: 'timeline', width: '340', height: '560',
  small_header: 'false', adapt_container_width: 'true', hide_cover: 'false', show_facepile: 'false',
})

export function SocialSection() {
  // TikTok's embed.js only scans the page once when it loads, so re-add it on every mount
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://www.tiktok.com/embed.js'; s.async = true
    document.body.appendChild(s)
    return () => { s.remove() }
  }, [])

  return (
    <section className="social" id="social" aria-label="Social">
      <div className="social-tiktok">
        <blockquote className="tiktok-embed" cite={CONTACT.tiktok} data-unique-id={tiktokUser} data-embed-type="creator">
          <section><a target="_blank" rel="noopener" href={CONTACT.tiktok}>@{tiktokUser}</a></section>
        </blockquote>
      </div>
      <iframe className="social-fb" title="Furniture Outlet on Facebook" src={fbSrc}
        loading="lazy" allow="encrypted-media" />
    </section>
  )
}
