const hostTest = 'http://community.computer.com'
const hostPre = 'https://www.conschina.com'
const hostProduction = 'https://bbs.conschina.com'

let host = hostTest
if (process.env.NUXT_ENV_MODE === 'pre') {
    host = hostPre
} else if (process.env.NUXT_ENV_MODE === 'prd') {
    host = hostProduction
}

//二期访问地址常量
export const conschinaCommunityArticle = host + '/portal/zyArticle/detailAnon/'
export const conschinaCommunityUser = host + '/user/homes.html?username='

export const conschinaCommunityArticleMore = host + '/portal/zyArticle/ArticleAnon/1/1'
export const conschinaCommunityRulesMore = host + '/portal/zyArticle/ArticleAnon/8/1'
export const conschinaCommunityUserMore = host + '/ranking.html#type=user'

export const conschinaCommunity = host

//默认图片地址常量
//大小147*100
export const defaultMerchant01 = 'https://bid.conschina.com/conschina/defaultImage/merchants-01.png'
export const defaultMerchant02 = 'https://bid.conschina.com/conschina/defaultImage/merchants-02.png'
//大小147*100
export const defaultProduct01 = 'https://bid.conschina.com/conschina/defaultImage/product-01.png'
//大小181*181
export const defaultProduct02 = 'https://bid.conschina.com/conschina/defaultImage/product-02.png'
//大小587*319
export const defaultProduct03 = 'https://bid.conschina.com/conschina/defaultImage/product-03.png'
//大小60*60
export const defaultUser01 = 'https://bid.conschina.com/conschina/defaultImage/user-min.png'
//大小120*120
export const defaultUser02 = 'https://bid.conschina.com/conschina/defaultImage/user-max.png'

//oss图片后缀常量
export const TOU90 = '?x-oss-process=style/tou90'
export const HOMETITLE = '?x-oss-process=style/home-title'
export const WENZHANGBIAOTI = '?x-oss-process=style/1220'
export const WENZHANG = '?x-oss-process=style/800x'
export const FENLEI = '?x-oss-process=style/fenlei'
export const SP147X100 = '?x-oss-process=style/sp-147x100'
export const SP180X180 = '?x-oss-process=style/sp-180x180'
export const SP587X319 = '?x-oss-process=style/sp-587x319'
export const SJTOU55 = '?x-oss-process=style/sjtou-55x55'
export const SHEQU100 = '?x-oss-process=style/shequ-100x100'
export const SEARCHSHEQU260X150 = '?x-oss-process=style/seach-shequ-260x150'
export const SHEQUTOU42 = '?x-oss-process=style/shequtou-42x42'
export const QIYELOGO180X110 = '?x-oss-process=style/qiyelogo-180x110'
export const QIYEHUANJING280X220 = '?x-oss-process=style/qiye-huanjing-280x220'
export const QIYEHUANJING290X180 = '?x-oss-process=style/qiye-huangjing-290x180'
export const QIYEXC720X600 = '?x-oss-process=style/qiye-xc-720x600'
export const QIYEXC290X180 = '?x-oss-process=style/qiye-xc-290x180'
export const ZHENGJIAN290X180 = '?x-oss-process=style/zhengjian-290x180'

