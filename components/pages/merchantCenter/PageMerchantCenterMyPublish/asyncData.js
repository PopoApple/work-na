import { apiPublishListPage } from '~/api/merchantCenter/myPublish'

export default ({ $axios, query, error }) => {
  //1.我的商品、2.我的需求、3.我的提供、4.我的招聘
  let type = query.type
  if (type && type === "1") {
    return apiPublishListPage($axios, query).then(res => {
      return { list: res.data.list, total: res.data.totalElements, totalPages: res.data.totalPages }
    })

  } else {
    return apiPublishListPage($axios, query).then(res => {
      return { list: res.data.list, total: res.data.totalElements, totalPages: res.data.totalPages }
    })
  }

}