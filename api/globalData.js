const prefix = !process.env.NUXT_ENV_MODE ?  '/apiBid' : 'https://bid.conschina.com'

export function apiDataProvincePlatform(axios) {
  return axios({
    method: 'get',
    url: prefix + '/filter/province_platform.json',
    baseURL: '/',
  })
}

export function apiDataCentralPlatform(axios) {
  return axios({
    method: 'get',
    url: prefix + '/filter/central_platform.json',
    baseURL: '/',
  })
}

export function apiDataPcaJson(axios) {
  return axios({
    method: 'get',
    url: prefix + '/region/pca-json.json',
    baseURL: '/',
  })
}
