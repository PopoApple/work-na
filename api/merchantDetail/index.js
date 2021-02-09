import { validatenull } from '@/utils/validate'
//查询拥有商家明细
export function apiMerchantInfo(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'get',
    url: '/csMerchant/detail/' + id,
  })
}
//查询拥有商品的顶级类别
export function apiProductTypeListExist(axios, merchantId) {
  return axios({
    method: 'get',
    url: '/csProduct/productTypeListExist/' + merchantId,
  })
}

//查询商家的商品列表
export function apiProductListPage(axios, query, sourceParams) {
  let { page, productTypeId, regionCode, unitPrice, createTime } = query
  let unitPriceOrder = {}
  if (unitPrice) {
    unitPriceOrder.column = 'unitPrice'
    unitPriceOrder.asc = unitPrice === 'asc' ? true : false
  }
  let createTimeOrder = {}
  if (createTime) {
    createTimeOrder.column = 'createTime'
    createTimeOrder.asc = createTime === 'asc' ? true : false
  }
  let orders = []
  !validatenull(unitPriceOrder) ? orders.push(unitPriceOrder) : null
  !validatenull(createTimeOrder) ? orders.push(createTimeOrder) : null

  let params = {
    current: page ? page : 1,
    entity: {
      merchantId: sourceParams.id,
      productTypeId: productTypeId,
      regionCode: regionCode,
    },
    size: 10,
    orders: orders
  }
  return axios({
    method: 'post',
    url: '/csProduct/getListByPageOfMerchant',
    data: JSON.stringify(params),
  })
}

//关注商家
export function apiAddFollow(axios, params) {
  return axios({
    method: 'post',
    url: '/csFollow/add',
    data: JSON.stringify(params)
  })
}

//取消关注商家
export function apiCancelFollow(axios, params) {
  let id = params ? params.id ? params.id : '' : ''
  return axios({
    method: 'delete',
    url: '/csFollow/deleteByMerchantId/' + id,
  })
}