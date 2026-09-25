import { useState } from 'react'
import type { Product } from '../data/products'
import { Arrow } from './Arrow'
import { RoomIcon } from './RoomIcon'

const baht = (n: number) => n.toLocaleString('th-TH')

export function ProductCard({ p, icon }: { p: Product; icon: string }) {
  const [broken, setBroken] = useState(false)
  const off = p.was ? Math.round((1 - p.price / p.was) * 100) : 0
  return (
    <a className="card" href={p.href} target="_blank" rel="noopener">
      <span className="card-pic">
        {broken
          ? <RoomIcon icon={icon} className="card-fallback" />
          : <img src={p.img} alt="" width="600" height="600" loading="lazy" decoding="async" onError={() => setBroken(true)} />}
        {off > 0 && <span className="card-off">-{off}%</span>}
      </span>
      <span className="card-body">
        <span className="card-name">{p.name}</span>
        <span className="card-price">
          <b>{baht(p.price)} ฿</b>
          {p.was && <s aria-label={`ราคาปกติ ${baht(p.was)} บาท`}>{baht(p.was)} ฿</s>}
        </span>
        <span className="card-go">ดูสินค้า <Arrow dir="out" /></span>
      </span>
    </a>
  )
}
