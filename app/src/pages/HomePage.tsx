import { OrbitStage } from '../components/OrbitStage'
import { ContactDock } from '../components/ContactDock'
import { SocialSection } from '../components/SocialSection'

export function HomePage() {
  return (
    <div className="home">
      <div className="home-screen">
        <header className="bar">
          <span className="tagline">Furniture for every room</span>
        </header>

        <OrbitStage />

        <footer className="bar">
          <span>
            <span className="mouse">Hover to preview · Click to shop</span>
            <span className="touch">Tap to preview · Tap again to shop</span>
            <span className="th">
              <span className="mouse">เลื่อนเมาส์ดูรายละเอียด · คลิกเพื่อเลือกซื้อ</span>
              <span className="touch">แตะเพื่อดูรายละเอียด · แตะอีกครั้งเพื่อเลือกซื้อ</span>
            </span>
          </span>
          <span>
            <a href="#social">Follow us ↓</a>
            <a className="site" href="https://www.furniture-outletshop.com/" target="_blank" rel="noopener">furniture-outletshop.com ↗</a>
          </span>
        </footer>
      </div>

      <SocialSection />
      <ContactDock />
    </div>
  )
}
