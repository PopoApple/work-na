import { apiPreviewProductInfo } from '~/api/goodsDetail'
export default ({ $axios, query, error, params }) => {
  return apiPreviewProductInfo($axios, params).then(res => {
    return { data: res.data }
  })
}