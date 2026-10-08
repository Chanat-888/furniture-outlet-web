import { CONTACT } from '../data/contact'
import './AddressSection.css'

const mapSrc = 'https://www.google.com/maps?output=embed&q=' + CONTACT.mapCoords
const mapsSearch = (q: string) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q)

// One entry per branch. Add the address and a direct Google Maps link (href) when they are known.
const branches = [
  { name: 'Koncept เฟอร์นิเจอร์ เอาท์เล็ท(เมืองจันทบุรี)', address: CONTACT.address, href: CONTACT.mapHref },
  { name: 'Koncept เฟอร์นิเจอร์ เอาท์เล็ท(เขาไร่ยา)', address: '', href: mapsSearch('Koncept เฟอร์นิเจอร์ เอาท์เล็ท เขาไร่ยา') },
  { name: 'Koncept Furniture Outlet(สระแก้ว,อรัญประเทศ)', address: '', href: mapsSearch('Koncept Furniture Outlet อรัญประเทศ สระแก้ว') },
]

export function AddressSection() {
  return (
    <section className="address" aria-label="Find us">
      <div className="address-text">
        <h2>Find Us</h2>
        <ul className="branch-list">
          {branches.map((b) => (
            <li key={b.name}>
              <a className="address-cta" href={b.href} target="_blank" rel="noopener"
                aria-label={b.name + ' (เปิดใน Google Maps)'}>
                <span className="cta-name">{b.name}</span>
                <span className="cta-open" aria-hidden="true">(เปิดใน Google Maps) ↗</span>
              </a>
              {b.address && <p lang="th">{b.address}</p>}
            </li>
          ))}
        </ul>
      </div>
      <iframe className="address-map" title="Shop location map" src={mapSrc}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </section>
  )
}
