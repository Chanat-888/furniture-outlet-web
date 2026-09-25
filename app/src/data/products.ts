// Products from furniture-outletshop.com (first page of each category, captured 2026-09-25).
// Prices in THB as listed on the shop. Replace with a live feed when one exists.
export type Product = {
  name: string
  href: string // full shop URL
  img: string // full image URL
  price: number
  was?: number // original price when on promotion
}

export type Filter = { label: string; match: string[] }

const SHOP = 'https://www.furniture-outletshop.com'
const IMG = 'https://itp1.itopfile.com/ImageServer/z_itp_191120225g36/600/0/'

// [name, shop path, image file, price, was?]
type Row = [string, string, string, number, number?]
const rows = (list: Row[]): Product[] =>
  list.map(([name, path, file, price, was]) => ({
    name, price, was, href: SHOP + encodeURI(path), img: IMG + encodeURIComponent(file),
  }))

export const products: Record<string, Product[]> = {
  bedroom: rows([
    ['ชุดห้องนอน mavis ขนาด 6 ฟุต', '/ชุดห้องนอน_Und_mavis_Und_ขนาด_Und_6_Und_ฟุต_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_641422473c803c001344eb63/641442ecc6227700139bea8a', 'ชุดห้องนอน-ขนาด-6-ฟุต-รุ่น-(2)z-z221611088957.webp', 20900, 41800],
    ['เตียงนอน ขนาด 5 ฟุต สีขาว', '/เตียงนอน_Und_ขนาด_Und_5_Und_ฟุต_Und_สีขาว_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_641445b16202f50013e10b2a/641442ecc6227700139bea8a', 'เตียงนอนรุ่นKC-PLAYFANTASYขนาด5z-z210766008081.webp', 4390, 5490],
    ['เตียงนอน 3.5 ฟุต สีไม้อ่อน', '/เตียงนอน_Und_3_Dot_5_Und_ฟุต_Und_สีไม้อ่อน_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_641446bc3c803c001344f2d2/641442ecc6227700139bea8a', 'เตียงนอน-3z-z793349055357.webp', 18080, 22600],
    ['เตียง 2 ชั้น 3.5 ฟุต รุ่น Studeo', '/เตียง_Und_2_Und_ชั้น_Und_3_Dot_5_Und_ฟุต_Und_รุ่น_Und_Studeo_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_641448fac6227700139bec71/641442ecc6227700139bea8a', 'เตียง2ชั้น3z-z1181222427210.webp', 11400, 14300],
    ['ตู้เสื้อผ้า รุ่น Hanz สีโอ๊ค', '/ตู้เสื้อผ้า_Und_รุ่น_Und_Hanz_Und_สีโอ๊ค_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_6417c74d6202f50013e10fda/641442ecc6227700139bea8a', 'ตู้เสื้อผ้า-รุ่น-Hanz-สีโอ๊ค-(1)z-z1115627824025.webp', 5990, 12500],
    ['ตู้เสื้อผ้า รุ่น Whitie', '/ตู้เสื้อผ้า_Und_รุ่น_Und_Whitie_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_6417c9056202f50013e11083/641442ecc6227700139bea8a', 'ตู้เสื้อผ้า-รุ่น-Whitie(2)z-z702780453077.webp', 5290, 6620],
    ['ตู้เสื้อผ้า ขนาด 160 ซม. รุ่น Havin', '/ตู้เสื้อผ้า_Und_ขนาด_Und_160_Und_ซม_Dot__Und_รุ่น_Und_Havin_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_6417cac33c803c001344f689/641442ecc6227700139bea8a', 'ตู้เสื้อผ้าขนาด160ซมz-z110687708557.webp', 6590, 12600],
    ['เตียงพร้อมที่นอน ขนาด 5 ฟุต รุ่น Backus สีโอ๊ค', '/เตียงพร้อมที่นอน_Und_ขนาด_Und_5_Und_ฟุต_Und_รุ่น_Und_Backus_Und_สีโอ๊ค_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_663842f2b95cc900139578af/641442ecc6227700139bea8a', 'เตียงพร้อมที่นอนขนาด5ฟุตรุ่นBackusสีโอ๊คz-z1541066826659.webp', 12900, 22900],
    ['ชุดห้องนอน ขนาด 5 ฟุต รุ่น Tavern ตู้บานเปิด Blox 150 สีไม้เข้ม', '/ชุดห้องนอน_Und_ขนาด_Und_5_Und_ฟุต_Und_รุ่น_Und_Tavern_Und_ตู้บานเปิด_Und_Blox_Und_150_Und_สีไม้เข้ม_product/641423656202f50013e10419/641420fb3c803c001344eb05/Products_6629ee34692a78001374d76a/641442ecc6227700139bea8a', 'ชุดห้องนอนขนาด5ฟุตรุ่นTavernตู้บานเปิดBlox150สีไม้เข้มz-z875521528093.webp', 21900, 30400],
  ]),
  living: rows([
    ['ตู้โชว์วางทีวี GT-302A', '/ตู้โชว์วางทีวี_Und_GT-302A_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_686dfbed6341000013c0a1d3/6417f8366202f50013e11a77', 'ตู้โชว์-GT-302az-z1728163130424.png', 22900, 25900],
    ['ตู้โชว์วางทีวี ELLA', '/ตู้โชว์วางทีวี_Und_ELLA_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_686dfb6ed2132e001387e3d4/6417f8366202f50013e11a77', 'ตู้โชว์ellaz-z1303383461192.png', 19900, 23900],
    ['โซฟา STANLAY', '/โซฟา_Und_STANLAY_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_686dfa982d9c2f0013be7d46/6417f8366202f50013e11a77', '37900โซฟาstanlayz-z1613051483150.png', 37900, 40900],
    ['ตู้โชว์วางทีวี CENTURY', '/ตู้โชว์วางทีวี_Und_CENTURY_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_686c9e2a80fc77001a6f2956/6417f8366202f50013e11a77', 'ตู้โชว์centuryz-z1228598337416.png', 21900, 23900],
    ['ตู้โชว์วางทีวี ASTON', '/ตู้โชว์วางทีวี_Und_ASTON_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_686c9dbe654145001a31e64b/6417f8366202f50013e11a77', 'ตู้โชว์astonz-z29690700870.png', 17900, 20900],
    ['ตู้โชว์วางทีวี ADORA', '/ตู้โชว์วางทีวี_Und_ADORA_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_686c9cf8e78be3001363279b/6417f8366202f50013e11a77', 'ตู้โชว์adoraz-z1446329426149.png', 18900, 20900],
    ['โซฟา Osaka-Grey', '/โซฟา_Und_Osaka-Grey_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_685b8b13c26652001321a441/6417f8366202f50013e11a77', '5990โซฟาosaka-greyz-z67925233793.png', 5990, 7990],
    ['โซฟาHuns', '/โซฟาHuns_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_685b89de8bc601001364a475/6417f8366202f50013e11a77', '5900โซฟาhunsz-z833858370789.png', 5900, 9900],
  ]),
  sofas: rows([
    ['โซฟา STANLAY', '/โซฟา_Und_STANLAY_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_686dfa982d9c2f0013be7d46/6447590602a0bd001a0feeec', '37900โซฟาstanlayz-z1613051483150.png', 37900, 40900],
    ['โซฟา RAYMOND SOFA', '/โซฟา_Und_RAYMOND_Und_SOFA_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_67fdd27664e25a0013ea9907/6447590602a0bd001a0feeec', 'โซฟาเลย์ม่อน1z-z929258848832.webp', 15900, 17900],
    ['โซฟารุ่น ORGAN-THREE โซฟาเข้ามุม 3 เมตร', '/โซฟารุ่น_Und_ORGAN-THREE_Und_﻿โซฟาเข้ามุม_Und_﻿3_Und_เมตร_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_67b44e249c24920013417f71/6447590602a0bd001a0feeec', 'ออร์แกนz-z1390846431861.webp', 15900, 17900],
    ['โซฟารุ่น ALICE PLUS โซฟาเข้ามุม 2.55 เมตร', '/โซฟารุ่น_Und_ALICE_Und_PLUS_Und_﻿โซฟาเข้ามุม﻿_Und_2_Dot_55_Und_เมตร_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_67b44b4473baf800139e09e8/6447590602a0bd001a0feeec', 'อลิสพลัส1z-z1609648642706.webp', 14900, 16900],
    ['โซฟาเข้ามุมซ้าย รุ่น Riowa สีน้ำตาลอ่อน', '/โซฟาเข้ามุมซ้าย_Und_รุ่น_Und_Riowa_Und_สีน้ำตาลอ่อน_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_65cdcd67ee5c810013116704/6447590602a0bd001a0feeec', '2z-z783999351870.webp', 6960, 8700],
    ['โซฟาเข้ามุม รุ่น Zuzan', '/โซฟาเข้ามุม_Und_รุ่น_Und_Zuzan_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_64b65d8217bef300131870c2/6447590602a0bd001a0feeec', 'Zuzancopyz-z724171993317.webp', 5900],
    ['โซฟาอเนกประสงค์ รุ่น Tuxedo', '/โซฟาอเนกประสงค์_Und_รุ่น_Und_Tuxedo_product/641423656202f50013e10419/6417da3e3c803c001344fba2/Products_64b6559d0de721001a544dac/6447590602a0bd001a0feeec', 'Tuxedo2z-z715527718345.webp', 31900],
  ]),
  office: rows([
    ['ชั้นวางซีดี/หนังสือ รุ่น Lybrary สีดำ', '/ชั้นวางซีดี_Sla_หนังสือ_Und_รุ่น_Und_Lybrary_Und_สีดำ_product/641423656202f50013e10419/6417faa03c803c001345040a/Products_6533639163b49a001376f69b/64180422c6227700139c0050', 'AnyConvz-z530618226869.webp', 6320, 7900],
    ['ตู้สูง รุ่น Contini Plus สีไม้อ่อน', '/ตู้สูง_Und_รุ่น_Und_Contini_Und_Plus_Und_สีไม้อ่อน_product/641423656202f50013e10419/6417faa03c803c001345040a/Products_6533625963b49a001376f577/64180422c6227700139c0050', '19211721-fit-in-furniture-living-room-book-storage-312z-z12478967772.webp', 5760, 7200],
    ['ตู้สูง KC-PLAY รุ่น JOBIO สีขาว', '/ตู้สูง_Und_KC-PLAY_Und_รุ่น_Und_JOBIO_Und_สีขาว_product/641423656202f50013e10419/6417faa03c803c001345040a/Products_65335ec8c1a1340013f9de5a/64180422c6227700139c0050', '07jobio4019217397z-z1155859596115.webp', 2790, 3490],
    ['ตู้สูง KC-PLAY รุ่น JOBIO สีขาว', '/ตู้สูง_Und_KC-PLAY_Und_รุ่น_Und_JOBIO_Und_สีขาว_product/641423656202f50013e10419/6417faa03c803c001345040a/Products_65335c87c1a1340013f9dd29/64180422c6227700139c0050', 'AnyConvz-z113637082676.webp', 4490, 5620],
    ['ตู้สูง KC-PLAY รุ่น JOBIO สีขาว', '/ตู้สูง_Und_KC-PLAY_Und_รุ่น_Und_JOBIO_Und_สีขาว_product/641423656202f50013e10419/6417faa03c803c001345040a/Products_653358e46a8250001ade50f9/64180422c6227700139c0050', 'AnyConvz-z1573325046151.webp', 2890, 3620],
    ['ตู้เตี้ยบานเปิด KC-PLAY รุ่น JOBIO สีขาว', '/ตู้เตี้ยบานเปิด_Und_KC-PLAY_Und_รุ่น_Und_JOBIO_Und_สีขาว_product/641423656202f50013e10419/6417faa03c803c001345040a/Products_653357806a8250001ade4ea4/64180422c6227700139c0050', 'AnyConvz-z1365238709697.webp', 2190, 2740],
  ]),
  dining: rows([
    ['ชุดโต๊ะอาหาร 6 ที่นั่ง รุ่น "MONA"', '/ชุดโต๊ะอาหาร_Und_6_Und_ที่นั่ง_Und_รุ่น_Und__Dbq_MONA_Dbq__product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_67bd33a347528d0013f86c18/641808c66202f50013e125ae', 'ชุดอาหารmonaz-z1453827639944.webp', 11900, 13900],
    ['ชุดโต๊ะอาหาร 6 ที่นั่ง รุ่น "CHERRY"', '/ชุดโต๊ะอาหาร_Und_6_Und_ที่นั่ง_Und_รุ่น_Und__Dbq_CHERRY_Dbq__product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_67bd32012e2dbb00136cf824/641808c66202f50013e125ae', 'ชุดอาหารcherryz-z1575630817625.webp', 15900, 17900],
    ['ชุดโต๊ะอาหาร 6 ที่นั่ง รุ่นสตีฟ (STEVE)', '/ชุดโต๊ะอาหาร_Und_6_Und_ที่นั่ง_Und_รุ่นสตีฟ_Und_(STEVE)_product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_67bd309847b263001384e3db/641808c66202f50013e125ae', 'ชุดอาหารstevez-z107619645106.webp', 21900, 23900],
    ['ชุดโต๊ะอาหาร 6 ที่นั่ง รุ่นเทเรซ่า (TERESA)', '/ชุดโต๊ะอาหาร_Und_6_Und_ที่นั่ง_Und_รุ่นเทเรซ่า_Und_(TERESA)_product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_67bd302b6143a3001397ea2b/641808c66202f50013e125ae', 'ชุดอาหารteresaz-z1209985873521.webp', 21900, 23900],
    ['ชุดโต๊ะอาหาร 4 ที่นั่ง รุ่นแทมมาริน (TAMARIND)', '/ชุดโต๊ะอาหาร_Und_4_Und_ที่นั่ง_Und_รุ่นแทมมาริน_Und_(TAMARIND)_product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_67bd2f962e14ff0013079a57/641808c66202f50013e125ae', 'ชุดอาหารtamarindz-z1032183701684.webp', 9900, 11900],
    ['ชุดโต๊ะอาหารไม้จริง Stella', '/ชุดโต๊ะอาหารไม้จริง_Und_Stella_product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_64b3c91a17bef30013182a15/641808c66202f50013e125ae', 'Stellaz-z124970952240.webp', 19900],
    ['ชุดอาหารไม้จริง 4 ที่นั่ง Starter', '/ชุดอาหารไม้จริง_Und_4_Und_ที่นั่ง_Und_Starter_product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_64b3c4bdcc76df001abfb4ec/641808c66202f50013e125ae', 'StarterN1040z-z268919931840.webp', 2990],
    ['ชุดโต๊ะรับประทานอาหาร 4 ที่นั่ง Sofia', '/ชุดโต๊ะรับประทานอาหาร_Und_4_Und_ที่นั่ง_Und_Sofia_product/641423656202f50013e10419/641804d2c6227700139c00b5/Products_64b3b0ff092c79001a3741fe/641808c66202f50013e125ae', 'Sofiaz-z767474340696.webp', 2490],
  ]),
  storage: rows([
    ['ตู้โชว์เอนกประสงค์ CB-123', '/ตู้โชว์เอนกประสงค์_product/641423656202f50013e10419/641809fdc6227700139c03b1/Products_641812dd6202f50013e12a31/641813066202f50013e12b3a', 'ตู้โชว์เอนกประสงค์--CB-123-(2)z-z376238392321.webp', 3290],
    ['ตู้โชว์เอนกประสงค์ CB-809', '/ตู้โชว์เอนกประสงค์_product/641423656202f50013e10419/641809fdc6227700139c03b1/Products_641812663c803c0013450c44/641813066202f50013e12b3a', 'ตู้โชว์เอนกประสงค์--CB-809-(2)z-z1154286924330.webp', 3790],
    ['ตู้โชว์เอนกประสงค์ CB 8010', '/ตู้โชว์เอนกประสงค์_Und__Und_CB_Und_8010_product/641423656202f50013e10419/641809fdc6227700139c03b1/Products_641811533c803c0013450b39/641813066202f50013e12b3a', 'ตู้โชว์เอนกประสงค์--CB-8010-(2)z-z455708233348.webp', 3590],
    ['ตู้โชว์วินเทจ', '/ตู้โชว์วินเทจ_product/641423656202f50013e10419/641809fdc6227700139c03b1/Products_64181046c6227700139c0628/641813066202f50013e12b3a', 'ตู้โชว์เอนกประสงค์--CB-6009-(2)z-z918563754938.webp', 3990],
    ['ตู้โชว์กระจก', '/ตู้โชว์กระจก_product/641423656202f50013e10419/641809fdc6227700139c03b1/Products_64180f9e6202f50013e128e0/641813066202f50013e12b3a', 'ตู้โชว์กระจก-MOTIF--2-(2)z-z895616805590.webp', 6900],
    ['Partee ตู้เก็บของ', '/Partee_Und_ตู้เก็บของ_product/641423656202f50013e10419/641809fdc6227700139c03b1/Products_64180f046202f50013e127f0/641813066202f50013e12b3a', 'Partee-ตู้เก็บของ(2)z-z347928380887.webp', 7440, 9300],
    ['KC-PLAY ตู้รองเท้า ตู้เก็บของ', '/KC-PLAY_Und_ตู้รองเท้า_Und_ตู้เก็บของ_product/641423656202f50013e10419/641809fdc6227700139c03b1/Products_64180ceb3c803c0013450a22/641813066202f50013e12b3a', 'KC-PLAY-ตู้รองเท้า-ตู้เก็บของ(2)z-z417589538669.webp', 2890, 3620],
  ]),
  outdoor: [], // nothing listed on the shop yet
  other: [],
}

// Filter chips per room; a chip shows only when it matches at least one product.
export const filters: Record<string, Filter[]> = {
  bedroom: [
    { label: 'ชุดห้องนอน', match: ['ชุดห้องนอน'] },
    { label: 'เตียง', match: ['เตียง'] },
    { label: 'ตู้เสื้อผ้า', match: ['ตู้เสื้อผ้า'] },
  ],
  living: [
    { label: 'ตู้วางทีวี', match: ['วางทีวี'] },
    { label: 'โซฟา', match: ['โซฟา'] },
  ],
  sofas: [
    { label: 'โซฟาเข้ามุม', match: ['เข้ามุม'] },
  ],
  office: [
    { label: 'ชั้นวางหนังสือ', match: ['ชั้นวาง'] },
    { label: 'ตู้', match: ['ตู้'] },
  ],
  dining: [
    { label: '6 ที่นั่ง', match: ['6 ที่นั่ง'] },
    { label: '4 ที่นั่ง', match: ['4 ที่นั่ง'] },
  ],
  storage: [
    { label: 'ตู้โชว์', match: ['ตู้โชว์'] },
    { label: 'ตู้เก็บของ', match: ['ตู้เก็บของ', 'ตู้รองเท้า'] },
  ],
}

// Date the product list above was captured; shown next to prices so they don't read as live.
export const PRICES_AS_OF = '25 ก.ย. 2569'
