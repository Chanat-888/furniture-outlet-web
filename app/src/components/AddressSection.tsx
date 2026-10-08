import { CONTACT } from '../data/contact'
import './AddressSection.css'

const mapSrc = 'https://www.google.com/maps?output=embed&q=' + CONTACT.mapCoords
const mapsSearch = (q: string) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q)

type Branch = { name: string; address: string; href: string; phone?: string; facebook?: string; website?: string }

// One entry per branch. Add the address and a direct Google Maps link (href) when they are known.
const branches: Branch[] = [
  { name: 'Koncept เฟอร์นิเจอร์ เอาท์เล็ท(เมืองจันทบุรี)', address: CONTACT.address, href: CONTACT.mapHref },
  {
    name: 'Koncept Furniture เขาไร่ยา,จันทบุรี',
    address: 'เลขที่ 230/1 ท่าช้าง เทศบาลเมืองท่าช้าง เมือง จันทบุรี 22000',
    href: mapsSearch('M38W+V2 ตำบลแสลง อำเภอเมืองจันทบุรี จันทบุรี'),
    phone: '039-471-234',
    website: 'https://www.furniture-outletshop.com/',
  },
  {
    name: 'Koncept Furniture สระแก้ว',
    address: 'เลขที่ 108 หมู่ 11 ตำบลผักขะ อำเภอวัฒนานคร สระแก้ว 27160',
    href: mapsSearch('PCGW+7X ตำบลผักขะ อำเภอวัฒนานคร สระแก้ว'),
    phone: '037-247-247',
    facebook: 'https://www.facebook.com/FURNITUREOUTLETSAKAEO/',
  },
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
              {(b.phone || b.website || b.facebook) && (
                <p className="branch-extra">
                  {b.phone && <a href={'tel:' + b.phone.replace(/-/g, '')}>โทร {b.phone}</a>}
                  {b.website && <a href={b.website} target="_blank" rel="noopener">เว็บไซต์ ↗</a>}
                  {b.facebook && <a href={b.facebook} target="_blank" rel="noopener">Facebook ↗</a>}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <iframe className="address-map" title="Shop location map" src={mapSrc}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </section>
  )
}
