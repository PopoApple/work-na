export function apiCommentsList(axios, query) {
  let params = {
    current: query.page,
    entity: {
      originId: query.originId,
      parentId: query.parentId ? query.parentId : -1,
      sourceId: query.sourceId
    },
    size: 10
  }
  return axios({
    method: 'post',
    url: '/csComment/listByPage',
    data: JSON.stringify(params),
  })
}

//添加评论
export function apiAddComments(axios, send) {
  let params = {
    commentContent: send.commentContent,
    originId: send.originId,
    originType: send.originType,
    parentId: -1,
  }
  return axios({
    method: 'post',
    url: '/csComment/addComment',
    data: JSON.stringify(params),
  })
}

//添加回复
export function apiAddReply(axios, send) {
  let params = {
    commentContent: send.commentContent,
    originId: send.originId,
    originType: send.originType,
    sourceId: send.sourceId,
    parentId: send.parentId,
    respondent: "766268836431048704"
  }
  return axios({
    method: 'post',
    url: '/csComment/addReply',
    data: JSON.stringify(params),
  })
}

//查询用户评论列表
export function apiMyCommentsList(axios, query) {
  let { page, status } = query
  let params = {
    current: page ? page : 1,
    entity: {
      status: status ? status : null
    },
    size: 10
  }
  return axios({
    method: 'post',
    url: '/csComment/myListByPage',
    data: JSON.stringify(params),
  })
}


//用户关闭评论
export function apiCloseComments(axios, params) {
  return axios({
    method: 'get',
    url: '/csComment/close/' + params.id,
  })
}