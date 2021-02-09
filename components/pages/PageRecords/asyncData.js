import { apiMyBrowseRecordList } from '~/api/record'

export default ({ $axios, query, error }) => {
  return apiMyBrowseRecordList($axios, query).then(res => {
    return { list: res.data.records, total: res.data.total }
  })
}