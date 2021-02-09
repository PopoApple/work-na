const devHost = 'http://192.168.0.222:9180'
const preHost = 'https://main.conschina.com'
const prdHost = 'https://sec.conschina.com'
let currentApiHost = devHost
if (process.env.NUXT_ENV_MODE === 'pre') {
  currentApiHost = preHost
} else if (process.env.NUXT_ENV_MODE === 'prd') {
  currentApiHost = prdHost
}
export const apiHost = currentApiHost
export const baseURL = apiHost + '/api/conschina/v1'
// console.log(process.env.NUXT_ENV_MODE, apiHost, baseURL)
export const tenantCode = 'gitee'
export const errorTips = {
  '401': '未登录，请登录后操作',
  '408': '请求超时，请稍后重试',
  '500': '服务器内部错误',
  '504': '网络超时，请稍后重试',
  '4015': '服务不可用',
  // 登录相关
  '400': '用户名不存在或密码错误',
  '4020': '验证码错误',
  '4026': '验证码已过期，请重新获取',
  '4010': '发送过于频繁，请稍后再试',
}
export const whiteList = ['/api/auth/oauth/token', '/index/info', '/index/productHeadIndex'] // 白名单