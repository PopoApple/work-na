//新增商品
export function apiAddProduct(axios, params) {
  return axios({
    method: 'post',
    url: '/csProduct/add',
    data: JSON.stringify(params)
  })
}

//获取商品所有类别
export function apiGetAllProductType(axios) {
  return axios({
    method: 'get',
    url: '/csProduct/treeList',
  })
}