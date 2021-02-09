import { apiMyCommentsList } from '~/api/comments'

export default ({ $axios, query, error }) => {
  return apiMyCommentsList($axios, query).then(res => {
    return { list: res.data.records, total: res.data.total }
  })
}