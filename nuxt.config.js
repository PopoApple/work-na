import { extendRoutes } from './static/js/routeInfo'
import path from 'path'
import { format, transports } from 'winston'
const { combine, timestamp, printf } = format

// 日志存放路径
const infoLogPath = path.resolve(process.cwd(), './logs', `info.log`)
const errorLogPath = path.resolve(process.cwd(), './logs', `error.log`)

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '广新纳-找建材，找服务，招采信息，建筑规范，国内领先建筑交流平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '广新纳，建材信息，招采信息，我需要服务，我提供服务，建筑社区，找工作' },
      { hid: 'description', name: 'description', content: '广新纳建筑信息交流平台，国内专业的本地、真实、高效服务平台！找建材，找招采信息，找服务，找工作，建筑规范，建筑资讯，广新纳一站解决！为你提海量建筑信息，充分满足您查看/发布信息的需求。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_2272077_9s7njp71r4u.css' }
    ],
    script: [
      { src: 'https://hm.baidu.com/hm.js?1949574a72cdad90fbe70a5e10552526' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css',
    './assets/style/theme/pagination.css',
    './assets/style/theme/carousel.css',
    './assets/style/theme/carousel-item.css',
    './assets/style/global.scss',
    './assets/style/iconimg.scss',
    './assets/style/tips.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/axiosClient',
    '~/plugins/utils',
    {
      src: '@/plugins/amfe-flexible',
      ssr: false
    },
    {
      src: '@/plugins/isMobile',
      ssr: false
    },
    {
      src: '@/plugins/tips',
      ssr: false
    },
    // {
    //   src: '~/plugins/vue-quill-editor',
    //   ssr: false
    // },
    {
      src: '~/plugins/vue-dompurify-html',
      ssr: true
    },
    {
      src: '~/plugins/baidu',
      ssr: false
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    'nuxt-winston-log',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'http://192.168.0.222:9180',
    },
    '/apiBid/': {
      target: 'http://bid.conschina.com',
      pathRewrite: {
        '^/apiBid/': '/'
      }
    },
  },
  styleResources: {
    scss: [
      'assets/style/vars.scss',
    ]
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: process.env.NUXT_ENV_MODE === 'prd' ? 'https://main.conschina.com/static' : '/_nuxt/',
    extractCSS: { allChunks: true, ignoreOrder: true },
    // analyze: true,
    transpile: [/^element-ui/, /vant.*?less/],
    babel: {
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "~assets/style/theme"
          }
        ],
        [
          'import',
          {
            libraryName: 'vant',
            style: (name) => {
              return `${name}/style/less.js`
            }
          },
          'vant'
        ],
      ]
    },
    postcss: [
      require('postcss-pxtorem')({
        rootValue: input => input.file.match(/\\node_modules\\vant/) ? 37.5 : 75,
        propList: ['*', '!font-size'],
        //exclude: /(\\node_modules\\element-ui)|(\\node_modules\\vant)|(element-variables)/,
      }),
      // require('autoprefixer')({
      //   browsers: ['Android >= 4.0', 'iOS >= 7']
      // }),
    ],
  },
  router: {
    // prefetchLinks: false,
    middleware: 'redirect',
    extendRoutes,
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  winstonLog: {
    loggerOptions: {
      format: combine(
        //format.colorize(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        printf(info => JSON.stringify(info)),
      ),
      transports: [
        new transports.File({
          level: 'info',
          filename: infoLogPath,
          maxsize: 5 * 1024 * 1024  // 这个是限制日志文件的大小
        }),
        new transports.File({
          level: 'error',
          filename: errorLogPath,
          maxsize: 5 * 1024 * 1024
        })
      ]
    }
  },
}
