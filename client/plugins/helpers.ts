/*
 * utils.js injected helpers
 * Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */

import type { Plugin } from '@nuxt/types'
const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

declare module 'vue/types/vue' {
  interface Vue {
    $sleep: typeof sleep
  }
}

const plugins: Plugin = (_context: Object, inject: Function) => {
  inject('sleep', sleep)
}

export default plugins
