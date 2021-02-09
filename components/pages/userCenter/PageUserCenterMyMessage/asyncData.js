import {
  apiMyOpMessageList,
  apiMyCMMessageList,
} from '~/api/userCenter/message'

export default ({ $axios, query, error }) => {
  let type = query.type
  if (type) {
    type = parseInt(type)
  }
  if (type === 2) {
    return apiMyCMMessageList($axios, query).then(res => {
      return { list: res.data.records, total: res.data.total }
    })
  } else {
    return apiMyOpMessageList($axios, query).then(res => {
      return { list: res.data.records, total: res.data.total }
    })
  }

}