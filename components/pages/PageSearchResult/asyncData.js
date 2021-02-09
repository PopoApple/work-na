import { apiMockList } from './mock'
import { apiSearch } from '~/api/indexPage'

export default ({ $axios, query, error }) => {
  if (!query.keyword) {
    return new Promise(res => res({ list: [], total: 0 }))
  } else {
    return apiSearch($axios, query).then(res => {
      return { list: res.data.list || [], total: res.data.totalElements }
    }).catch(e => {
      // console.log(e)
    })
  }

  // return apiMockList($axios, query).then(res => {
  //   return { list: res.data.records, total: res.data.total }
  // })
}