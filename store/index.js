import { apiUserInfo, apiRefreshToken } from '~/api/auth'
import { getDomain } from '~/utils/cookie'

const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  auth: null,
  authError: null,
  userInfo: {}, // isAuth: 1、未认证  2、已认证  3、认证成功；isCompleted 是否完善企业信息 1：未完成 2：已完成
  msgCountComment: 0,
  msgCountSys: 0,
  data: {
    provincePlatform: { businessList: [], platformList: [] }, 
    centralPlatform: { businessList: [], platformList: [] }, 
    chinaTree: [],
  },
})

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  setAuthError(state, authError) {
    state.authError = authError
  },
  setUserInfo(state, payload) {
    state.userInfo = { ...state.userInfo, ...payload }
  },
  setMsgCountComment(state, payload) {
    state.msgCountComment = payload
  },
  setMsgCountSys(state, payload) {
    state.msgCountSys = payload
  },
  setData(state, payload) {
    state.data = { ...state.data, ...payload }
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { app, req, $winstonLog }) {
    let host = req.headers.host
    let domain = getDomain()
    let options = { path: '/' }
    if (domain) {
      options['domain'] = domain
    }
    let optionsSet = { ...options, maxAge: 60 * 60 * 24 * 7 }

    let userInfo
    let token = null
    let refresh_token = null
    if (req.headers.cookie) {
      try {
        const parsed = cookieparser.parse(req.headers.cookie)
        token = parsed.token || null
        refresh_token = parsed.refresh_token || null
      } catch (e) {
      }
    }
    if (token) {
      try {
        const resUserInfo = await apiUserInfo(app.$axios, token)
        userInfo = resUserInfo.data
        // console.log(123, userInfo)
      } catch (e) {
        $winstonLog.info(`server remove cookie ------ ${JSON.stringify(options)}`)
        app.$cookies.remove('token', options)
        app.$cookies.remove('refresh_token', options)
        if (e.statusCode === 401) {
          try {
            const resRefreshToken = await apiRefreshToken(app.$axios, { refresh_token })
            token = resRefreshToken.access_token
            refresh_token = resRefreshToken.refresh_token
            const resUserInfo2 = await apiUserInfo(app.$axios, token)
            userInfo = resUserInfo2.data    
            $winstonLog.info(`server set cookie ------ ${JSON.stringify(optionsSet)}`)
            app.$cookies.set('token', token, optionsSet)
            app.$cookies.set('refresh_token', refresh_token, optionsSet)  
          } catch (e) {
          }
        } else {
          commit('setAuthError', '您的账号存在问题，请稍后重新登录') 
        }
      }
    }

    if (userInfo) {
      commit('setUserInfo', userInfo) 
      commit('setAuth', { token, refresh_token }) 
    }

  }
}