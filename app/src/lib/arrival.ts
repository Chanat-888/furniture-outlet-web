// Remembers whether the visitor is entering a room page from the home page (or landing on one directly),
// so the house hero plays its fog reveal only then, and not when hopping between rooms via the house.
let fromHome = true

export const arrival = {
  mark() { fromHome = true },
  peek() { return fromHome },
  clear() { fromHome = false },
}
