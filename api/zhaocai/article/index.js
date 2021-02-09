// 获取文章数据
export function getArticle(axios, id) {
  return axios({
    method: 'get',
    url: '/csBidInfo/' + id
  })
}

// 请求文章数据

export function getArticleContent(axios, url) {
  return axios({
    method: 'get',
    url: url,
    baseURL: '/'
  })
}

// 请求文章数据，服务端。只有在页面刷新时，或者直接通过url进入才会使用node进行服务端渲染；否则，还是要像正常的单页面应用一样，做代理请求跨域
export function getArticleContentNode (axios, url) {
  return axios({
    method: 'get',
    url: process.client ? url.slice(26) : url,
    baseURL: '/'
  })
}

// 添加文章收藏
export function addCollection( axios, sourceId ) {
  let params = {
      collectType : 5,
      sourceId : sourceId
  }
  return axios({
    method: 'post',
    url: '/csCollect/add',
    data: JSON.stringify(params)
  })
}

// 取消文章收藏
export function cancelCollection ( axios, sourceId ) {
  return axios({
    method: 'delete',
    url: '/csCollect/deleteBySourceId/' + sourceId
  })
}