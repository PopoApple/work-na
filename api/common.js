import { apiHost } from '~/api/config'

export function fetchDict(axios, dictType) {
  let data = {
    current: 1,
    size: 1000,
    entity: {
      dictType,
    }
  }
  return axios({
    method: 'post',
    url: apiHost + '/api/user/v1/dictData/list',
    data: JSON.stringify(data),
    baseURL: '/',
  })
}

export function apiUpload (axios, file) {
  let formData = new FormData()
  formData.append('file', file)
  return axios({
    method: 'post',
    url: '/csAttachment/upload',
    data: formData,
  })
}

export function apiUnreadMsgCount (axios) {
  return axios({
    method: 'post',
    url: '/index/getUnreadCount ',
  })
}