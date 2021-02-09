import { apiMockList } from './mock'

export default ({ query }) => {
  return apiMockList(query).then(res => {
    return { list: res.data.records, total: res.data.total }
  })
}