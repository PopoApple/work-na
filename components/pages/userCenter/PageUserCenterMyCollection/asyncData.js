import { getCollectionList } from '~/api/userCenter/collection'
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
  // return apiMockList(query).then(res => {
  //   return { list: res.data.records, total: res.data.total }
  // })
  let type = query.type || 1
  return getCollectionList($axios, type, query.page).then(res => {
    let list = res.data.records,
      total = res.data.total
    return { list, total }
  })
}
