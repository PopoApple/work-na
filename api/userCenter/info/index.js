import { apiHost } from '~/api/config'
const prefix = !process.env.NUXT_ENV_MODE && process.client ?  '' : apiHost

// 获取用户基本信息，姓名，电话，生日，性别
export function getUserInfo( axios ) {
  return axios({
    method: 'get',
    url: 'user/basicInfo'
  })
}

// 修改个人数据
export function editUserInfo ( axios, params ) {
  return axios({
    method: 'post',
    url: '/user/updateBasicInfo',
    data: JSON.stringify(params),
  })
}


// 上传新头像
export function uploadAvatar ( axios, file ) {
  return axios({
    method: 'post',
    baseURL: '/',
    url: prefix + '/api/user/v1/user/updateUserAvatar',
    data: file,
    userDto: '234',
    // headers: {
    //    'Content-Type': 'multipart/form-data',
    // }
  })
}


// 验证用户昵称
export function nameIsCheck( axios, name) {
  return axios({
    method: 'get',
    baseURL: prefix + '/',
    url: '/api/user/v1/user/checkName',
    params: { 'name': name}
  })
}
