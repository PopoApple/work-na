import { apiMockDetail } from './mock'
import { apiCheck, apiDetail } from '~/api/merchantCenter/ca'

export default ({ $axios, query, error, store }) => {
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
  //console.log('用户信息：', store.state.auth)


  return apiCheck($axios).then(resCheck => {
    let dataCheck = resCheck.data
    let isAuth = dataCheck ? dataCheck.isAuth : false
    let status = dataCheck ? dataCheck.status : null
    if (isAuth) {
      return apiDetail($axios).then(resDetail => {
        const { id, merchantName, creditCode, legalPerson, registerDate, licenseStartTime, licenseEndTime, contactName, contactPhone, recommendCode, licenseUrl, legalPersonCardAUrl, legalPersonCardBUrl } = resDetail.data
        return {
          isAuth,
          status,
          data: {
            id,
            merchantName,
            creditCode,
            legalPerson,
            createDate: registerDate,
            licenseStartTime, 
            licenseEndTime,
            contractPerson: contactName,
            phone: contactPhone,
            recommendCode,
            businessPic: licenseUrl,
            idCardPic: legalPersonCardAUrl,
            idCardPicBack: legalPersonCardBUrl,
          },
        }
      })
    } else {
      return {
        isAuth,
        status,
      }
    }    
  })
  .catch(e => {
    // console.log('eee', e)
    if (e.bussinessError && e.bussinessError.code === 9210) {
      return {
        isAuth: false,
        status: null,
      }
    } else {
      error(e)
    }
  })


  // return Promise.all([
  //   apiCheck($axios),
  //   apiDetail($axios),
  // ]).then(([resCheck, resDetail]) => {
  //   console.log(11111, resCheck, 22222, resDetail)
  //   let dataCheck = resCheck.data
  //   const { id, merchantName, creditCode, legalPerson, registerDate, licenseStartTime, licenseEndTime, contactName, contactPhone, recommendCode, licenseUrl, legalPersonCardAUrl, legalPersonCardBUrl } = resDetail.data
         
  //   return {
  //     isAuth: dataCheck.isAuth,
  //     status: dataCheck.status,
  //     data: {
  //       id,
  //       merchantName,
  //       creditCode,
  //       legalPerson,
  //       createDate: registerDate,
  //       licenseStartTime, 
  //       licenseEndTime,
  //       contractPerson: contactName,
  //       phone: contactPhone,
  //       recommendCode,
  //       businessPic: licenseUrl,
  //       idCardPic: legalPersonCardAUrl,
  //       idCardPicBack: legalPersonCardBUrl,
  //     },
  //   }
  // })
  // .catch(e => {
  //   console.log('eee', e)
  // })
}