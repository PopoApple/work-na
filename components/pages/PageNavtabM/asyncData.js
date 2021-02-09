import { getHeaderMsg } from '~/api/material/materialIndex'

export default ({ $axios, query, error }) => {
  // return apiMyBrowseRecordList($axios, query).then(res => {
  //   return { list: res.data.records, total: res.data.total }
  // })
  return getHeaderMsg($axios).then(res => {
    let tabList = {}
    tabList = res.data.productTypeList.map((current) => {
      return {  id: current.id, icon: "icon-other", name: current.productTypeName, expand: current.children }
    })
    // console.log(tabList)
    return  { tabList }
  }).catch(e => {
    // console.log(e)
  })
}