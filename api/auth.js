import { apiHost } from '~/api/config'
const prefix = !process.env.NUXT_ENV_MODE && process.client ?  '' : apiHost

export function apiLoginByAccount(axios, params) {
  return axios({
    method: 'post',
    url: prefix + '/api/auth/oauth/token',
    params: { ...params, grant_type: 'password', scope: 'read', source_type: 'portal' },
    baseURL: '/',
    headers: {
      Authorization: 'Basic d2ViX2FwcDpzcHJpbmctbWljcm9zZXJ2aWNlLWV4YW0tc2VjcmV0',
    },
  })
}

export function apiLoginByPhoneNum(axios, params) {
  return axios({
    method: 'post',
    url: prefix + '/api/auth/api/v1/mobile/token',
    params: { ...params, grant_type: 'mobile', scope: 'read', source_type: 'portal' },
    baseURL: '/',
    headers: {
      'Authorization': 'Basic ' + btoa('web_app:spring-microservice-exam-secret'),
    },
  })
}

export function apiSendSms(axios, params) {
  const { mobile } = params
  return axios({
    method: 'get',
    url: prefix + `/api/user/v1/mobile/sendSmsForPortal?mobile=${mobile}&sourceType=portal`,
    baseURL: '/',
  })
}

export function apiRefreshToken(axios, params) {
  return axios({
    method: 'post',
    url: prefix + '/api/auth/oauth/token',
    params: { ...params, grant_type: 'refresh_token', scope: 'read' },
    baseURL: '/',
    headers: {
      'Authorization': 'Basic ' + 'd2ViX2FwcDpzcHJpbmctbWljcm9zZXJ2aWNlLWV4YW0tc2VjcmV0',
    },
  })
}

export function apiUserInfo(axios, token) {
  return axios({
    method: 'get',
    url: '/user/info',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
}


