
import { baseURL, tenantCode, errorTips } from '~/api/config'
import { isSuccess } from '~/api/utils'
import { whiteList } from '~/api/config'
import { removeCookie } from '~/utils/cookie'
// import { apiHost } from '~/api/config'

// const whiteList401 = [apiHost + '/api/auth/oauth/token', '/user/info']

export default function (ctx) {

  const { $axios, store } = ctx

  $axios.defaults.timeout = 30000

  $axios.setBaseURL(baseURL)
  $axios.setHeader('Tenant-Code', tenantCode)
  $axios.setHeader('Content-Type', 'application/json', ['post'])

  $axios.onRequest(config => {
    if (whiteList.indexOf(config.url) === -1 && store.state.auth) {
      config.headers['Authorization'] = 'Bearer ' + store.state.auth.token
    }
  })

  $axios.onResponse(response => {
    if (ctx.$winstonLog) {
      ctx.$winstonLog.info(`--------[${response.status}] ${response.config.baseURL} | ${response.config.url}`)
    }
    if (!isSuccess(response.data)) {
      return Promise.reject({ statusCode: 500, message: null, response, bussinessError: response.data })
    } else {
      return Promise.resolve(response.data)
    }
  })

  $axios.onError(error => {
    if (ctx.$winstonLog) {
      if (error.response) {
        ctx.$winstonLog.error(`--------[${error.response.status}] ${error.response.config.baseURL} | ${error.response.config.url} | ${ error.bussinessError ? error.bussinessError.code + ':' + error.bussinessError.msg : error.message}`)
      } else {
        // console.log('-------------error:', error)
        ctx.$winstonLog.error(`--------${JSON.stringify(error)}`)
      }
    }
    let statusCode
    if (error.statusCode !== undefined) {
      statusCode = error.statusCode
    } else if (error.message && error.message.indexOf('timeout') >= 0) {
      statusCode = 408
    } else {
      statusCode = parseInt(error.response && error.response.status)
    }
    if (statusCode === 401 
      // && whiteList401.indexOf(error.response.config.url) === -1
      ) {
      if (store.state.auth) {
        store.commit('setAuth', null)
        if (process.client) {
          removeCookie('token')
          removeCookie('refresh_token')
        }
      }
      // ctx.redirect('/login')
      // Vue.prototype.$toast.fail(errorTips[statusCode])
      // return Promise.resolve(false)
    } 
    // else {
      return Promise.reject({ statusCode, message: errorTips[statusCode] || null, bussinessError: error.bussinessError })
    // }
  })
}