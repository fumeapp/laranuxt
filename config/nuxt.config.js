/*
 * nuxt.config.js
 * Copyright (C) 2018 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 * official NUXTJS front end configuration
 */

require('dotenv').config()
const pkg = require('../package')

module.exports = {

  env: process.env,

  srcDir: '../' + process.env.NUXT_ROOT,

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },
    ],
    link: [
      { rel: 'stylesheet', href: '/mdi.css' },
    ],
    script: [
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#a3e3fd' },

  loadingIndicator: {
    name: 'folding-cube',
    color: '#a3e3fd',
    background: 'white',
  },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/stylus/main.styl',
  ],
  extractCSS: true,

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-purgecss',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  devModules: [
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {
    configPath: '../config/tailwind.config.js',
  },

  axios: {
    baseURL: process.env.APP_API,
    credentials: true,
    init (axios, ctx) {
      axios.defaults.headers.common['Accept'] = 'application/json'
    },
  },

  proxy: {
    '/api': { target: process.env.APP_PROXY, ws: true },
    '/_debugbar': process.env.APP_PROXY + '_debugbar',
  },

  plugins: [
  ],

  /*
  ** Build configuration
  */
  build: {
    extend(config, ctx) {
    }
  }
}
