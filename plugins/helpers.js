/*
 * utils.js injected helpers
 * Copyright (C) 2019 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 */
import Vue from 'vue'
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
Vue.prototype.$sleep = sleep
