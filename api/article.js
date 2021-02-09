export function apiArticle(axios, id) {
  return axios({
    method: 'get',
    url: '/esNotice/' + id,
  })
}