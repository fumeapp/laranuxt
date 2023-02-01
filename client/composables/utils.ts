export const useUtils = () => {
  /**
   * Perform a sleep as a Promise
   * ex: await this.$sleep(200)
   * @param milliseconds
   */
  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  /**
   * Generate a random integer similar to php's rand()
   * @see https://www.php.net/rand
   * @param min - The lowest value to return
   * @param max - The highest value to return
   */
  const rand = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  /**
   * Capitalize the first letter of a string
   * @param string
   */
  const ucFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  /**
   * Scroll to an element on the page
   * @param id
   * @param offset
   */
  const properScroll = (id: string, offset: number) => {
    const el = document.getElementById(id)
    if (!el)
      return true
    const y = el.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo(0, y)
  }

  return { sleep, rand, ucFirst, properScroll }
}
