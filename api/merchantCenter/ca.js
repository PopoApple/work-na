export function apiAdd(axios, params = {}) {
  // let params = {
  //   merchantName, creditCode, legalPerson, registerDate, licenseEndTime, contactName, contactPhone, recommendCode, 
  //   licenseUrl, legalPersonCardAUrl, legalPersonCardBUrl 
  // }
  return axios({
    method: 'post',
    url: '/csMerchantAuth/add',
    data: JSON.stringify(params),
    // baseURL: 'xxx',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  })
}

export function apiEdit(axios, params = {}) {
  return axios({
    method: 'post',
    url: '/csMerchantAuth/updateById',
    data: JSON.stringify(params),
  })
}

export function apiCheck(axios) {
  return axios({
    method: 'get',
    url: '/csMerchantAuth/check',
  })
}

export function apiDetail(axios) {
  return axios({
    method: 'get',
    url: '/csMerchantAuth/info',
  })
}