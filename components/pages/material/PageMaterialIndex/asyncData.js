import { getHeaderMsg, getProductList } from '~/api/material/materialIndex'

export default ({ $axios, query, error }) => {
  // return Promise.all([
  //   apiList($axios, query), apiFilter($axios)
  // ]).then(([resList, resFilter]) => {
  //   return { list: resList.data.list, total: resList.data.totalPages, filter: resFilter.data }
  // })
  // .catch(e => {
  //   // 网络错误或者业务错误都进这里，错误对象格式为：{statusCode, message}
  //   console.log('asyncData apiGoodsList 错误:', e)
  //  使用 error({statusCode: 123, message: 'xxx'})跳到错误页面：layout/error.vue
  // })

  // return apiListPage($axios, query).then(res => {
  //   return { list: res.data.list, total: res.data.totalElements, totalPages: res.data.totalPages }
  // })
  return Promise.all( [getHeaderMsg($axios), getProductList($axios, 1, 5)] ).then(([resA, resB])=> {

    const carouselData = resA.data.carouselList.slice(0, 5).map((current) => {
      return { id: current.id, title: current.noticeTitle, imgSrc: current.titleImageUrl, time: current.createTime.slice(0, 10), type: '热点资讯', linkUrl: current.linkUrl }
    })
    const hotNews = resA.data.hotNewsList.slice(0, 5).map((current) => {
      return { id: current.id, type:'热门咨讯', time: current.createTime.slice(0,10).replace(/-/g, '.'), title: current.noticeTitle, linkUrl: current.linkUrl}
    })
    // 头部导航栏数据
    const menuList = resA.data.productTypeList.map((current) => {
      return {  id: current.id, icon: current.icon, name: current.productTypeName, expand: current.children }
    })


    // 将resB中提取id，name，children，并将键名children改为list。
    let sectionList = resB.data.records.map((sec) => {
      let newList = sec.productTypeTreeDto.children.map((current) => {
        let childrenList = []
        // 共三层，如果没有第三层数据，第二层没有children属性，需判断
        if(current.hasOwnProperty('children')) {
          childrenList = current.children.map((current) => {
            return { id: current.id, name: current.productTypeName }
          })
        }
        return { id: current.id, name: current.productTypeName, list: childrenList }
      })
      // productList中键值对，通过组件中通过别名的方式来使用
      let productList = sec.spreadProductDtoList
      return { id: sec.productTypeTreeDto.id, name: sec.productTypeTreeDto.productTypeName, list: newList, productList: productList}
    })
    const navList = sectionList
    const total = resB.data.total
    return { carouselData, hotNews, menuList, navList, total }
  })
}