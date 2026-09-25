// One entry per box — edit here to change text, order, links or icons.
export type Category = {
  id: string
  label: string // short Thai label on the card front
  th: string // full Thai name on the detail side
  en: string
  sub: string[]
  href: string
  icon: string // inner SVG markup, 64x64 viewBox
  photo: string // Unsplash photo base URL — stand-in until real showroom photos
  credit: string // photographer, shown on the hero
}

const BASE = 'https://www.furniture-outletshop.com/'
const fill = 'fill="currentColor"'
const link = (path: string) => BASE + encodeURI(path)

export const categories: Category[] = [
  { id: 'bedroom', label: 'ห้องนอน', th: 'ห้องนอน', en: 'Bedroom', sub: ['เตียง', 'ตู้เสื้อผ้า', 'โต๊ะเครื่องแป้ง'],
    photo: 'https://images.unsplash.com/photo-1600210491305-7396500b5b31', credit: 'Collov Home Design',
    href: link('ห้องนอน/64112a8fc6227700139b30c4'),
    icon: `<path d="M10 16v34M54 32v18"/><rect x="10" y="34" width="44" height="8"/><rect x="14" y="27" width="12" height="7" ${fill}/>` },
  { id: 'living', label: 'ห้องนั่งเล่น', th: 'ห้องนั่งเล่น', en: 'Living Room', sub: ['ตู้วางทีวี', 'ตู้โชว์', 'ชั้นวางหนังสือ'],
    photo: 'https://images.unsplash.com/photo-1636206508343-a6c955887476', credit: 'nuddle',
    href: link('ห้องนั่งเล่น/64112a96c6227700139b30d2'),
    icon: `<rect x="12" y="10" width="40" height="26"/><rect x="17" y="15" width="30" height="16" ${fill}/><path d="M32 36v6"/><rect x="8" y="42" width="48" height="10"/><path d="M14 52v6M50 52v6"/>` },
  { id: 'sofas', label: 'โซฟา', th: 'โซฟา', en: 'Sofas', sub: ['Living room sofas'],
    photo: 'https://images.unsplash.com/photo-1724582586529-62622e50c0b3', credit: 'Prydumano Design',
    href: link('โซฟา/644752ed02a0bd001a0fee36'),
    icon: `<rect x="16" y="14" width="32" height="16"/><rect x="16" y="30" width="32" height="10" ${fill}/><rect x="6" y="24" width="10" height="22"/><rect x="48" y="24" width="10" height="22"/><path d="M16 46h32M12 46v8M52 46v8"/>` },
  { id: 'office', label: 'ห้องทำงาน', th: 'ห้องทำงาน', en: 'Home Office', sub: ['โต๊ะทำงาน', 'เก้าอี้สำนักงาน', 'ชั้นวางหนังสือ'],
    photo: 'https://images.unsplash.com/photo-1596022326953-84f20bfebb77', credit: 'Sven Brandsma',
    href: link('ห้องทำงาน/64112a9c6202f50013e07db0'),
    icon: `<rect x="12" y="8" width="22" height="13"/><rect x="16" y="12" width="14" height="5" ${fill}/><path d="M23 21v4M6 26h52M10 26v28M54 26v28"/><rect x="40" y="26" width="14" height="18"/><path d="M44 35h6"/>` },
  { id: 'dining', label: 'ห้องอาหาร', th: 'ห้องอาหารและห้องครัว', en: 'Dining & Kitchen', sub: ['ชุดทานอาหาร', 'โต๊ะอาหาร', 'เก้าอี้ทานอาหาร'],
    photo: 'https://images.unsplash.com/photo-1745794621090-d856c53b0cc2', credit: 'Clay Banks',
    href: link('ห้องอาหารและห้องครัว/64112aa16202f50013e07dbe'),
    icon: `<rect x="12" y="26" width="40" height="6" ${fill}/><path d="M16 32v22M48 32v22M6 18v36M6 42h8M58 18v36M58 42h-8"/>` },
  { id: 'storage', label: 'ห้องเก็บของ', th: 'ห้องเก็บของ', en: 'Storage', sub: ['ตู้โชว์เอนกประสงค์', 'ตู้โชว์กระจก', 'KC-PLAY'],
    photo: 'https://images.unsplash.com/photo-1652517209166-f17a2742a5fe', credit: 'Allison Saeng',
    href: link('ห้องเก็บของ/64112aa76202f50013e07dcc'),
    icon: `<rect x="12" y="8" width="40" height="46"/><path d="M32 8v46M12 30h40M27 18v6M37 18v6"/><rect x="26" y="38" width="4" height="8" ${fill}/><rect x="34" y="38" width="4" height="8" ${fill}/><path d="M16 54v4M48 54v4"/>` },
  { id: 'outdoor', label: 'นอกบ้านและสวน', th: 'บริเวณนอกบ้านและสวน', en: 'Outdoor & Garden', sub: ['เฟอร์นิเจอร์นอกบ้าน', 'เฟอร์นิเจอร์สวน'],
    photo: 'https://images.unsplash.com/photo-1719324923613-ff0884b031ed', credit: 'Tile Merchant Ireland',
    href: link('บริเวณนอกบ้านและสวน/64112aac6202f50013e07de6'),
    icon: `<path d="M6 28C10 14 21 8 32 8s22 6 26 20z"/><path d="M32 8c-5 5-8 12-8 20h16c0-8-3-15-8-20z" ${fill}/><path d="M32 28v26M22 54h20"/>` },
  { id: 'other', label: 'อื่นๆ', th: 'อื่นๆ', en: 'Other', sub: ['สินค้าอื่นๆ'],
    photo: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89', credit: 'Virender Singh',
    href: link('อื่นๆ/64112ab26202f50013e07df5'),
    icon: `<rect x="12" y="20" width="40" height="7" ${fill}/><path d="M18 27l-5 27M46 27l5 27M32 27v27M16 42h32"/>` },
]
