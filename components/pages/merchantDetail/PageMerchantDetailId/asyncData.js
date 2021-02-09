import { apiMerchantInfo } from '~/api/merchantDetail'
export default ({ $axios, query, error, params }) => {
  return apiMerchantInfo($axios, params).then(res => {
    return { data: res.data }
  })
}