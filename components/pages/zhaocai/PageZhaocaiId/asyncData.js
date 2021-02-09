import { apiMockList } from './mock'
import { getArticle, getArticleContent, getArticleContentNode } from '~/api/zhaocai/article'

export default ({ $axios, query, error, params }) => {
  return getArticle($axios, params.id).then( res => {
    let title = res.data.bidTitle || ''
    let date = res.data.publishTime || ''
    let contentUrl =  res.data.bidContentUrl || ''
    let isCollect = res.data.isCollect || false
    let projectNumber = res.data.projectNumber || ''
    let source = res.data.source || ''
    let bidBusiness = res.data.bidBusiness || ''
    let bidBusinessType = res.data.bidBusinessType || ''
    let sourcePlatform = res.data.sourcePlatform || ''
    let trade = res.data.trade ||''
    let attachmentDtoList = res.data.attachmentDtoList || []
    return { title, date, contentUrl, isCollect, projectNumber, source, bidBusiness, bidBusinessType, sourcePlatform, trade, attachmentDtoList }
  }).then( async ({ title, date, contentUrl, isCollect, projectNumber, source,  bidBusiness, bidBusinessType, sourcePlatform, trade, attachmentDtoList }) => {
    let res1 = await getArticleContent( $axios, contentUrl)
    let rawhtml = res1.content
    return { title, date, rawhtml, isCollect, projectNumber, source,  bidBusiness, bidBusinessType, sourcePlatform, trade, attachmentDtoList }
  })
  .catch(e => {
    error(e)
  }) 
}