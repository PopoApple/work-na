//新增投诉与建议
export function apiAddSuggest(axios, params) {
  return axios({
    method: 'post',
    url: '/csSuggest/add',
    data: JSON.stringify(params)
  })
}
