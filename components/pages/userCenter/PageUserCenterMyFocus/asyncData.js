import { apiMockList, apiMockGroupList } from './mock'
import { apiList, apiGroupList } from '~/api/userCenter/myFocus'

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
  let { groupId } = query
  return apiGroupList($axios).then(res => {
    // console.log('apiGroupList：', res, res.data.records[0])
    let groups = res.data.records
    if (!groupId && groups.length > 0) {
      // let defaultGroup = groups.find(d => d.isDefault === 1)
      // if (defaultGroup) {
      //   groupId = defaultGroup.id
      // } else {
        groupId = groups[0].id
      //}
    }
    if (groupId) {
      return apiList($axios, { followGroupId: groupId, page: query.page || 1 }).then(res => {
        // console.log('apiList：', res)
        return {
          list: res.data.records.map(d => {
            return {
              ...d,
              id: d.followId,
            }
          }),
          total: res.data.total, 
          groups,
        }
      })
    } else {
      return {
        list: [], 
        total: 0, 
        groups,
      }
    }
  })
  //.catch(e => {
  //   console.log('error：', e)
  //   error(e)
  // })
}