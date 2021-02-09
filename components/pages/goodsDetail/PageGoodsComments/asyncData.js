import { apiCommentsList } from '~/api/comments'
export default ({ $axios, query, error, params }) => {
  let searchParams = {
    page: 1,
    originId: params.id
  }
  return apiCommentsList($axios, searchParams).then(res => {
    return { data: res.data }
  })
}