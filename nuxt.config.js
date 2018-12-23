/*
 * nuxt.config.js
 * Copyright (C) 2018 kevin olson <acidjazz@gmail.com>
 *
 * Distributed under terms of the APACHE license.
 * official NUXTJS front end configuration
 */

require('dotenv').config()
const pkg = require('./package')

module.exports = {

  env: {
    NUXT_ROOT: process.env.NUXT_ROOT,
    API_URL: process.env.APP_URL,
    ENV: process.env.APP_ENV,
  },

  srcDir: process.env.NUXT_ROOT,

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
      /* use realfavicongenerator and throw the contents in resources/static/
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/framework.css' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#01b5fa' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      */
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js', integrity: 'sha256-9YAuB2VnFZNJ+lKfpaQ3dKQT9/C0j3VUla76hHbiVF8=', crossorigin: 'anonymous' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js', integrity: 'sha256-LlHVI5rUauudM5ZcZaD6hHPHKrA7CSefHHnKgq+/AZc=', crossorigin: 'anonymous' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.0/js.cookie.min.js', integrity: 'sha256-9Nt2r+tJnSd2A2CRUvnjgsD+ES1ExvjbjBNqidm9doI=', crossorigin: 'anonymous' },
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
     // { src: 'assets/stylus/main.styl', lang: 'stylus' },
    // '~/assets/css/tailwind.css'
  ],
  extractCSS: true,

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/google-analytics',
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

  'google-analytics': {
    id: '',
  },

  /*
  ** Plugins to load before mounting the App
  plugins: [
    '@/plugins/ssl.js',
    '@/plugins/axios.js',
    '@/plugins/global-components.js',
  ],

  globals: {
    components: [
      '@/components/global/Modal',
      '@/components/global/Message',
    ],
  },
  */

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
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
