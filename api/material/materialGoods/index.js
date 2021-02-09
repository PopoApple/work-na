import { validatenull } from '@/utils/validate'
//查询商品列表
export function apiListPage(axios, query) {
  let { page, productTypeId, regionCode, price, merchantId, sortUnitPrice } = query
  let unitPriceOrder = {}
  if (sortUnitPrice) {
    unitPriceOrder.column = 'unitPrice'
    unitPriceOrder.asc = sortUnitPrice === 'asc' ? true : false
  }
  let orders = []
  !validatenull(unitPriceOrder) ? orders.push(unitPriceOrder) : null
  let params = {
    current: page ? page : 1,
    entity: {
      merchantId: merchantId,
      productTypeId: productTypeId,
      regionCode: regionCode,
      price: price
    },
    size: 10,
    orders: orders
  }
  return axios({
    method: 'post',
    url: '/csProduct/listByPage',
    data: JSON.stringify(params),
  })
}

//获取查询条件
export function apiGetfilter(axios) {
  return axios({
    method: 'get',
    url: '/csProduct/filter',
  })
}