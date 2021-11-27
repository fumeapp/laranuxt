import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  srcDir: 'client/',
  meta: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/device.css',
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#buildmodules
  */
  buildModules: [
    '@vueuse/core/nuxt',
    'nuxt-windicss',
    '@tailvue/nuxt',
  ],

  publicRuntimeConfig: {
    apiURL: process.env.API_URL || 'http://localhost:8000',
  },

})
