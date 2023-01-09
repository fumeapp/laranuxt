export default defineNuxtConfig({
  srcDir: 'client/',
  app: {
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.8.1/lottie.min.js' },
      ],
    },
  },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/device.css',
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: [
    '~/components',
    '~/components/contact',
    '~/components/layout',
    '~/components/header',
    '~/components/transition',
  ],

  /**
   * @see https://v3.nuxtjs.org/api/configuration/nuxt.config#modules
   */
  modules: [
    '@vueuse/nuxt',
    'nuxt-windicss',
    '@tailvue/nuxt',
  ],

  /**
   * @see https://v3.nuxtjs.org/guide/features/runtime-config#exposing-runtime-config
   */
  runtimeConfig: {
    public: {
      webURL: process.env.WEB_URL || 'http://localhost:3000',
      apiURL: process.env.API_URL || 'http://localhost:8000',
    },
  },

  /**
   * WindiCSS configuration
   * @see https://github.com/windicss/nuxt-windicss
   */
  windicss: {
    analyze: false,
  },

})
