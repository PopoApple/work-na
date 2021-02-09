//查询用户浏览记录列表
export function apiMyBrowseRecordList(axios, query) {
  let { page } = query
  let params = {
    current: page ? page : 1,
    entity: {
    },
    size: 10
  }
  return axios({
    method: 'post',
    url: '/csBrowseRecord/listByPage',
    data: JSON.stringify(params),
  })
}


//删除商品浏览记录
export function apiDeleteBrowseRecord(axios, params) {
  return axios({
    method: 'delete',
    url: '/csBrowseRecord/deleteById/' + params.id,
  })
}