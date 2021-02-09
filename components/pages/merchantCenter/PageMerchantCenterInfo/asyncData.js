import { apiMyMerchantInfo } from '~/api/merchantCenter/info'

export default ({ $axios, query, error, store }) => {
  return apiMyMerchantInfo($axios).then(res => {
    return res.data
  })
}