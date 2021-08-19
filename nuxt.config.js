module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '{{ name }} - EasyAPI发票管理',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '{{escape description }}'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: []
  },
  css: [
    '@/assets/scss/common.scss',
    '@/assets/scss/element-variables.scss',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/echarts',
    '@/plugins/router',
    '@/plugins/is-chinese-phone-number',
    '@/plugins/is-email',
    { src: '@/plugins/common.js', ssr: false },
    { src: '@/plugins/v-distpiceker.js', ssr: false }
  ],
  /*
   ** Customize the progress bar color
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  axios: {},
  loading: {
    color: '#18c1d6',
    failedColor: '#18c1d6'
  },
  styleResources: {
    scss: './assets/scss/variables.scss'
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/, 'vue-quill-editor', 'v-distpicker'],
    extend(config, ctx) {
    },
    maxChunkSize: 300000, // 单个包最大尺寸
    extractCSS: true // 单独提取CSS
  },
  server: {
    port: 3000
  },
  env: {
    baseUrl: 'https://api2.easyapi.com',
    accountUrl: 'https://account-api.easyapi.com'
  }
}
