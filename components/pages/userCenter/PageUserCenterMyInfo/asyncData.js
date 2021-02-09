import { getUserInfo } from '~/api/userCenter/info'

export default ({ $axios, query, error }) => {
  // return Promise.all([
  //   apiList($axios, query), apiFilter($axios)
  // ]).then(([resList, resFilter]) => {
  //   return { list: resList.data.list, total: resList.data.totalPages, filter: resFilter.data }
  // })
  // .catch(e => {
  //   // 网络错误或者业务错误都进这里，错误对象格式为：{statusCode, message}
  //   console.log('asyncData apiGoodsList 错误:', e)
  //  使用 error({statusCode: 123, message: 'xxx'})跳到错误页面：layout/error.vue
  // })
  return getUserInfo($axios).then(res => {
      const form = {}
      form.avatarUrl = res.data.avatarUrl || 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1441836571,2166773131&fm=26&gp=0.jpg'
      form.name = res.data.name
      form.phone = res.data.phone
      form.born = res.data.born
      form.sex = res.data.sex
    return { form }
  })
}