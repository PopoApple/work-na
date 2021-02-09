//查询用户系统消息列表
export function apiMyOpMessageList(axios, query) {
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
    url: '/csOpMessage/listByPage',
    data: JSON.stringify(params),
  })
}


//已读系统消息
export function apiMarkOpMessageRead(axios, params) {
  return axios({
    method: 'get',
    url: '/csOpMessage/markRead/' + params.id,
  })
}



//删除单条系统消息
export function apiDeleteOpMessage(axios, params) {
  return axios({
    method: 'delete',
    url: '/csOpMessage/' + params.id,
  })
}

//批量删除系统消息
export function apiBatchDeleteOpMessage(axios, params) {
  return axios({
    method: 'delete',
    url: '/csOpMessage/deleteBatch',
    // data: JSON.stringify(params)
    data: params
  })
}

//一键已读系统消息
export function apiMarkAllReadOpMessage(axios) {
  return axios({
    method: 'get',
    url: '/csOpMessage/markAllRead',
  })
}

//查询用户评论/回复消息列表
export function apiMyCMMessageList(axios, query) {
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
    url: '/csCommentMessage/listByPage',
    data: JSON.stringify(params),
  })
}


//已读评论/回复消息
export function apiMarkCMMessageRead(axios, params) {
  return axios({
    method: 'get',
    url: '/csCommentMessage/markRead/' + params.id,
  })
}



//删除单条评论/回复消息
export function apiDeleteCMMessage(axios, params) {
  return axios({
    method: 'delete',
    url: '/csCommentMessage/' + params.id,
  })
}

//批量删除评论/回复消息
export function apiBatchDeleteCMMessage(axios, params) {
  return axios({
    method: 'delete',
    url: '/csCommentMessage/deleteBatch',
    // data: JSON.stringify(params)
    data: params
  })
}

//一键已读评论消息
export function apiMarkAllReadCMMessage(axios) {
  return axios({
    method: 'get',
    url: '/csCommentMessage/markAllRead',
  })
}