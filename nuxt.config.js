// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  // Disable Telemetry (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-telemetry)
  dev: process.env.NODE_ENV !== 'production',
  telemetry: false, // 빌드시 물어볼지

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'SK텔레콤 공식 온라인 쇼핑몰 T월드 다이렉트',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,viewport-fit=cover'
      },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/favicon.ico' }]
  },

  loading: {
    color: '#f76252',
    height: '2px'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/css/seller.css', '~/assets/css/css_fix.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/zipkin.js' },
    { src: '~/plugins/disableLogs.js' },
    { src: '~/plugins/vue-awesome-swiper', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Server Middlewares
  serverMiddleware: ['~/middleware/logger'],

  publicRuntimeConfig: {
    // axios: {
    //   baseURL: 'https://api.nuxtjs.dev'
    // }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // '@nuxtjs/axios'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  env: {
    ZIPKIN_SERVER_URL: 'http://127.0.0.1:9411/',
    API_BASE_URL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/home' : 'http://naver.com',
    CND_WEB_RESOURCE_ROOT_PATH: 'https://cdnm.shop.tworld.co.kr'
  },

  server: {
    port: 3000,
    timing: false
  },

  generate: {
    fallback: '404.html'
  }
};

// export default options;
