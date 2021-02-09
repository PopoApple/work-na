import { apiProductInfo } from '~/api/goodsDetail'
export default ({ $axios, query, error, params }) => {
  return apiProductInfo($axios, params).then(res => {
    return { data: res.data }
  })
}