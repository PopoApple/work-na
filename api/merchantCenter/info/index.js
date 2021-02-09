//查询商户信息
export function apiMyMerchantInfo(axios) {
  return axios({
    method: 'get',
    url: '/csMerchant/info',
  })
}


//商户信息编辑
export function apiUpdateMerchantInfo(axios, params) {
  return axios({
    method: 'post',
    url: '/csMerchant/updateById',
    data: JSON.stringify(params)
  })
}
