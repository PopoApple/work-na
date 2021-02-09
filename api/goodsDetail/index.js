//查询商品明细
export function apiProductInfo(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'get',
    url: '/csProduct/' + id,
  })
}

//预览商品明细
export function apiPreviewProductInfo(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'get',
    url: '/csProduct/owner/' + id,
  })
}

//编辑查看商品明细
export function apiEditProductInfo(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'get',
    url: '/csProduct/ownerEdit/' + id,
  })
}

//商品收藏
export function apiAddCollect(axios, params) {
  return axios({
    method: 'post',
    url: '/csCollect/add',
    data: JSON.stringify(params)
  })
}

//商品取消收藏
export function apiCancelCollect(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'delete',
    url: '/csCollect/deleteBySourceId/' + id,
  })
}