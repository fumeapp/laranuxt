export default class Utils {

  /**
   * Perform a sleep as a Promise
   * ex: await this.$sleep(200)
   * @param milliseconds
   */
  sleep (milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  /**
   * Generate a random integer similar to php's rand()
   * @see https://www.php.net/rand
   * @param min - The lowest value to return
   * @param max - The highest value to return
   */
  rand (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  ucFirst (string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  /**
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   */
  debounce (func: () => never, wait: number, immediate?: boolean) {
    let timeout: number | undefined = undefined
    return function () {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments
      const later = () => {
        timeout = undefined
        if (!immediate) func.apply(this, args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait) as unknown as number
      if (callNow) func.apply(this, args)
    }
  }

  properScroll (id: string, offset: number) {
    const el = document.getElementById(id)
    if (!el) return true
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo(0, y)
  }
}
