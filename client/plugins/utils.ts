/*
 * utils.js injected helpers
 * Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */
import type { Plugin } from '@nuxt/types'
import { sleep, rand, debounce, properScroll, ucFirst } from '@/lib/utils'

declare module '@nuxt/types' {
  interface Context {
    $sleep: typeof sleep
    $rand: typeof rand
    $debounce: typeof debounce
    $scroll: typeof properScroll
    $ucFirst: typeof ucFirst
  }
}

const plugins: Plugin = (_, inject: Function) => {
  inject('sleep', sleep)
  inject('rand', rand)
  inject('debounce', debounce)
  inject('scroll', properScroll)
  inject('ucFirst', ucFirst)
}

export default plugins
