import { apiArticle } from '~/api/article'

export default ({ $axios, query, params, error, store }) => {
  // console.log(1234, params)
  return apiArticle($axios, params.id).then(res => {
    // console.log(456, res.data)
    return res.data
  })
  .catch(e => {
    // console.log('eee', e)
    error(e)
  })
}