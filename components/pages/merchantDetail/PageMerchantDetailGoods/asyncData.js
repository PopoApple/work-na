import { apiProductListPage } from '~/api/merchantDetail'
export default ({ $axios, query, error, params }) => {
  return apiProductListPage($axios, query, params).then(res => {
    return { list: res.data.list, totalElements: res.data.totalElements, totalPages: res.data.totalPages }
  })
}