//查询我发布的商品列表
export function apiPublishListPage(axios, query) {
  let { page, status } = query
  let params = {
    current: page ? page : 1,
    entity: {
      status: status ? status : null
    },
    size: 10
  }
  return axios({
    method: 'post',
    url: '/csProduct/publishListByPage',
    data: JSON.stringify(params),
  })
}

//查询商品明细
export function apiMyProductInfo(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'get',
    url: '/csProduct/' + id,
  })
}

//商品下架
export function apiOffShelves(axios, params) {
  return axios({
    method: 'get',
    url: '/csProduct/offShelves/' + params.id,
  })
}

//商品重新发布
export function apiRepublish(axios, params) {
  return axios({
    method: 'get',
    url: '/csProduct/republish/' + params.id,
  })
}

//商品删除
export function apiDeleteProduct(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'delete',
    url: '/csProduct/' + id,
  })
}

//商品编辑
export function apiUpdateProduct(axios, params) {
  return axios({
    method: 'post',
    url: '/csProduct/updateById',
    data: JSON.stringify(params)
  })
}
