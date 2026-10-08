import { CONTACT } from '../data/contact'
import './AddressSection.css'

const mapSrc = 'https://www.google.com/maps?output=embed&q=' + CONTACT.mapCoords

export function AddressSection() {
  return (
    <section className="address" aria-label="Visit us">
      <div className="address-text">
        <h2>Visit our shop</h2>
        <p lang="th">{CONTACT.address}</p>
        <a className="address-cta" href={CONTACT.mapHref} target="_blank" rel="noopener">
          เปิดใน Google Maps ↗
        </a>
      </div>
      <iframe className="address-map" title="Shop location map" src={mapSrc}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </section>
  )
}
