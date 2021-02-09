import { getMainData } from '~/api/indexPage'
//import { apiMockList  } from './mock'
import transLastTime from '~/utils/transLastTime'

export default ({ $axios, query, error }) => {
  return Promise.all([
    getMainData($axios, query),
  ]).then(([resMainData, dict]) => {
    const { bidInfoList, provideList, hotNewsList, spreadProductList, latestNotice, portalList, productTypeList, jobList, carouselList, recommendMerchantList, demandList } = resMainData.data
    const hotArticleList = portalList ? portalList.hotArticleList : []
    const standardArticleList = portalList ? portalList.standardArticleList : []
    const userRankList = portalList ? portalList.userRankList : []

    return { 
      productTypeList: productTypeList.map((current) => {
        return {  id: current.id, icon: current.icon, name: current.productTypeName, expand: current.children }
      }) || [],
      carouselList: carouselList ? carouselList.map(d => {
        return {
          id: d.id,
          title: d.noticeTitle,
          imgSrc: d.titleImageUrl,
          type: '热点资讯', 
          time: d.createTime.slice(0, 10),
          linkUrl: d.linkUrl,
        }
      }) : [], 
      hotNewsList: hotNewsList ? hotNewsList.slice(0, 4).map(d => {
        return {
          id: d.id, 
          type: '热点资讯', 
          time: d.createTime.slice(0, 10), 
          title: d.noticeTitle,
          linkUrl: d.linkUrl,
        }
      }) : [],
      latestNotice: latestNotice && latestNotice[0] ? {
        id: latestNotice[0].id,
        title: latestNotice[0].noticeTitle, 
        time: transLastTime(new Date(latestNotice[0].createTime).getTime()),
      } : {},
      spreadProductList: spreadProductList ? spreadProductList.slice(0, 8).map(d => {
        return { 
          id: d.id, 
          url: d.attachUrls ? d.attachUrls[0] : null, 
          name: d.productName, 
          price: d.unitPrice, 
        }
      }) : [], 
      recommendMerchantList: recommendMerchantList ? recommendMerchantList.slice(0, 7).map(d => {
        return {
          id: d.merchantId,
          title: d.merchantName,
          imgSrc: d.logoUrl,
        }
      }) : [], 
      zhaocaiList: bidInfoList ? bidInfoList.slice(0, 10).map(d => {
        let time = d.publishTime
        let a = time.split('-')
        return {
          time: d.publishTime,
          year: a[0],
          month: a[1],
          date: a[2],
          title: d.bidTitle,
          area: d.region,
          id: d.id,
          tag: d.bidBusiness,
        }
      }) : [], 
      shequArticleList: hotArticleList ? hotArticleList.slice(0, 5).map(d => {
        return {
          id: d.id,
          type: d.cmsChannelName,
          title: d.title,
          imgSrc: d.coverImageUrl,
          time: d.createTime ? d.createTime.slice(0, 10) : null,
          viewCount: d.readCount || 0,
          commendCount: d.applyCount || 0,
          author: d.createUserName,
        }
      }) : [], 
      shequRulesList: standardArticleList ? standardArticleList.slice(0, 8).map(d => {
        return {
          id: d.id,
          type: d.cmsChannelName,
          title: d.title,
        }
      }) : [], 
      shequUserList: userRankList ? userRankList.slice(0, 9).map((d, idx) => {
        let i = idx + 1
        return {
          no: i < 10 ? '0' + i : '' + i,
          id: d.id,
          viewCount: d.commentCount,
          title: d.nikeName,
          imgSrc: d.avatar,
        }
      }) : [], 
    }
  })
  .catch(e => {
    // console.log('eee:', e)
    error({statusCode: 500, message: '内部服务器错误'})
  })
}