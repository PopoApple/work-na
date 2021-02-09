export function getMainData (axios) {
  return axios({
    method: 'get',
    url: '/index/info',
  })
}

export function apiSearch(axios, p = {}) {
  const { keyword, type, page } = p
  let params = {
    current: page || 1,
    entity: {
      keyword: keyword || '',
      type,
    },
    size: 10
  }
  return axios({
    method: 'post',
    url: '/index/search',
    data: JSON.stringify(params),
    // baseURL: 'xxx',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  })
}