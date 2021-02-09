// 收藏类别 1商品收藏 2需求收藏 3提供收藏 4职位收藏 5招采收藏
export function getCollectionList ( axios, collectType, page ) {
  let params = {
    current: page,
    entity: {
      collectType: collectType
    },
    size: 10
  }
  return axios({
    method: 'post',
    url: '/csCollect/listByPage',
    data: JSON.stringify(params),
  })
}


// 删除收藏

export function postDeleteArray ( axios, arr ) {
  return axios({
    method: 'delete',
    url: '/csCollect/deleteBatchBySourceId',
    data: arr
  })
}