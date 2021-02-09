import Vue from 'vue'
import { baseURL, tenantCode, errorTips } from '~/api/config'
import { removeCookie } from '~/utils/cookie'
import { whiteList } from '~/api/config'

export default function ({ $axios, store, redirect }, inject) {
  const axiosClient = $axios.create({
    baseURL,
    headers: {
      common: {
        'Tenant-Code': tenantCode,
      },
      post: {
        'Content-Type': 'application/json',
      }
    },
  })

  axiosClient.onRequest(config => {
    if (whiteList.indexOf(config.url) === -1 && store.state.auth) {
      config.headers['Authorization'] = 'Bearer ' + store.state.auth.token
    }
  })

  axiosClient.onResponse(response => {
    // if (!isSuccess(response.data)) {
    //   return Promise.reject({ statusCode: response.data.code, message: response.data.msg })
    // }
    return Promise.resolve(response.data)
  })

  axiosClient.onError(error => {
    let statusCode
    // if (error.statusCode !== undefined) {
    //   statusCode = error.statusCode
    // } else 
    if (error.message && error.message.indexOf('timeout') >= 0) {
      statusCode = 408
    } else {
      statusCode = parseInt(error.response && error.response.status)
    }

    if (statusCode === 401) {
      // let code = error.response && error.response.data && error.response.data.code
      // if (code === 4088) {
      //   refreshToken()
      // } else {
        gotoLoLogin()
      // }
    } 
    // else {
      return Promise.reject({ statusCode, message: errorTips[statusCode] || null })
    // }
  })

  // const refreshToken = () => {
  //   apiRefreshToken(axiosClient, { refresh_token: store.state.auth.refreshToken }).then(res => {
  //     if (res.access_token) {
  //       const auth = {
  //         token: res.access_token,
  //         refresh_token: res.refresh_token,
  //       }
  //       this.$store.commit('setAuth', auth) 
  //       setCookies(auth)
  //     } else {
  //       gotoLoLogin()
  //     }
  //   }).catch(e => {
  //     gotoLoLogin()
  //   })
  // }

  const gotoLoLogin = () => {
    if (store.state.auth) {
      removeCookie('token')
      removeCookie('refresh_token')
      store.commit('setAuth', null)
    }
    redirect('/login')
  }

  // Inject to context as $api
  inject('axiosClient', axiosClient)
}