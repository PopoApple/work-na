// 建材首页，该接口获取了整个页面的数据，
export function getHeaderMsg(axios) {
  // let params = {
  //   current: 1,
  //   entity: {   
  //   },
  //   size: 10
  // }
  return axios({
    method: 'get',
    url: '/index/productHeadIndex',
    // data: JSON.stringify(params),
  })
}


export function getProductList(axios, current, size) {
  let params = {
    current: current,
    size: size || '5'
  }
  return axios({
    method: 'post',
    url: '/index/productIndex',
    data: JSON.stringify(params)
  })
}