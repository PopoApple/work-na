export function apiGroupList(axios, p = {}) {
  let params = {
    current: 1,
    entity: {
    },
    size: 100000
  }
  return axios({
    method: 'post',
    url: '/csFollowGroup/listByPage',
    data: JSON.stringify(params),
    // baseURL: 'xxx',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  })
}

export function apiList(axios, p = {}) {
  const { followGroupId, page } = p
  let params = {
    current: page,
    entity: {
      followGroupId
    },
    size: 10
  }
  return axios({
    method: 'post',
    url: '/csFollow/listByPage',
    data: JSON.stringify(params),
    // baseURL: 'xxx',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  })
}

// export function apiFilter(axios) {
//   return axios({
//     method: 'get',
//     url: '/csProduct/filter',
//   })
// }

export function apiAddGroup(axios, params = {}) {
  return axios({
    method: 'post',
    url: '/csFollowGroup/add',
    data: JSON.stringify(params),
  })
}

export function apiEditGroup(axios, params = {}) {
  return axios({
    method: 'post',
    url: '/csFollowGroup/updateById',
    data: JSON.stringify(params),
  })
}

export function apiDeleteGroup(axios, id) {
  return axios({
    method: 'delete',
    url: '/csFollowGroup/' + id,
  })
}

// export function apiCancelFoucs(axios, id) {
//   return axios({
//     method: 'delete',
//     url: '/csFollow/' + id,
//   })
// }

export function apiCancelFoucsBatch(axios, params = []) {
  return axios({
    method: 'delete',
    url: '/csFollow/deleteBatch',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

// export function apiMove(axios, params = {}) {
//   return axios({
//     method: 'post',
//     url: '/csFollow/updateById',
//     data: JSON.stringify(params),
//   })
// }

export function apiMoveBatch(axios, params = []) {
  return axios({
    method: 'post',
    url: '/csFollow/updateBatch',
    data: JSON.stringify(params),
  })
}