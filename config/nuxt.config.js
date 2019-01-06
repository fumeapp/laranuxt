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

  env: {
    NUXT_ROOT: process.env.NUXT_ROOT,
    API_URL: process.env.APP_URL,
    ENV: process.env.APP_ENV,
  },

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
      { rel: 'stylesheet', href: '/bulma.css' },
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
    '@/assets/css/tailwind.css',
    { src: '@/assets/stylus/main.styl', lang: 'stylus' },
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

  axios: {
    baseURL: process.env.NUXT_PROXY,
    credentials: true,
    init (axios, ctx) {
      axios.defaults.headers.common['Accept'] = 'application/json'
    },
  },

  proxy: {
    '/api': process.env.APP_URL,
  },

  plugins: [
    '@/plugins/ssl.js',
    // '@/plugins/axios.js',
    '@/plugins/global.js',
  ],

  globals: {
    components: [
      '@/components/global/Modal',
      '@/components/global/Toast',
    ],
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-url'),
        require('tailwindcss')('config/tailwind.config.js'),
        require('autoprefixer')({
          cascade: false,
          grid: true
        }),
        require('postcss-preset-env')({
          stage: 0
        }),
        require('cssnano')({
          preset: 'default',
          discardComments: { removeAll: true },
          zindex: false
        }),
      ],
    },
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }

}
