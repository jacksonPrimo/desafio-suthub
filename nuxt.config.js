import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Desafio Suthub',
    title: 'Desafio Suthub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'img/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/Vuelidate',
    '~/plugins/VMask'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/netlify-files',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'suthub',
      author: 'jackson aquino primo'
    },
    icon: {
      fileName: 'img/icon.png'
    },
    manifest: {
      name: 'Desafio Suthub',
      short_name: 'DSH',
      lang: 'pt-br',
      icons: [
        {
          src: 'img/icon.png',
          sizes: '500x500'
        }
      ],
      theme_color: '#fff',
      background_color: '#009688',
      display: 'fullscreen',
      useWebmanifestExtension: false
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    middleware: ['redirect-router']
  },
  env: {
    API_COUNTRIES: process.env.API_COUNTRIES,
    API_CEP: process.env.API_CEP
  }
}
