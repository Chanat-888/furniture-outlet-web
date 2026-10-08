import { OrbitStage } from '../components/OrbitStage'
import { ContactDock } from '../components/ContactDock'

export function HomePage() {
  return (
    <div className="home">
      <header className="bar">
        <span className="tagline">Furniture for every room</span>
      </header>

      <OrbitStage />
      <ContactDock />

      <footer className="bar">
        <span>
          <span className="mouse">Hover to preview · Click to shop</span>
          <span className="touch">Tap to preview · Tap again to shop</span>
          <span className="th">
            <span className="mouse">เลื่อนเมาส์ดูรายละเอียด · คลิกเพื่อเลือกซื้อ</span>
            <span className="touch">แตะเพื่อดูรายละเอียด · แตะอีกครั้งเพื่อเลือกซื้อ</span>
          </span>
        </span>
        <a className="site" href="https://www.furniture-outletshop.com/" target="_blank" rel="noopener">furniture-outletshop.com ↗</a>
      </footer>
    </div>
  )
}
