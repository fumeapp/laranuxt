
/**
 * Perform a sleep as a Promise
 * ex: await this.$sleep(200)
 * @param milliseconds
 */
export function sleep (milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Generate a random integer similar to php's rand()
 * @see https://www.php.net/rand
 * @param min - The lowest value to return
 * @param max - The highest value to return
 */
export function rand (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce (func: (any) => void, wait: number, immediate?: boolean) {
  let timeout: NodeJS.Timeout|undefined
  return function (...args) {
    const later = function () {
      timeout = undefined
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

export function ucFirst (string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function properScroll (id: string, offset: number) {
  const el = document.getElementById(id)
  if (!el) return true
  const y = el.getBoundingClientRect().top + window.pageYOffset + offset
  window.scrollTo(0, y)
}
