// The shop data has no description field, so size and colour are read from the product name; anything missing is null.
const SIZE = /\d+(?:\.\d+)?(?:\s*[xX×*]\s*\d+(?:\.\d+)?)*\s*(?:ฟุต|ซม\.?|เมตร|ที่นั่ง)/
const COLOR = /สี[ก-๛]+/

export function productSpecs(name: string) {
  return {
    size: name.match(SIZE)?.[0].replace(/\s+/g, ' ') ?? null,
    color: name.match(COLOR)?.[0] ?? null,
  }
}
