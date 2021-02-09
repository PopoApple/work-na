export function apiMockList(query) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let page = query && query.page ? query.page : 1
      let data = {
        data: {
          total: 3,
          code: 200,
          records: [
            {
              id: '801385999119814656',
              region: '江西省上饶市',
              attachUrls: [
                'https://conschina-bid-bucket.oss-cn-shenzhen.aliyuncs.com/conschina-test/2021/01/20/a3420d3e09ee4e3296008f224499b4f8.png'
              ],
              merchantName: null,
              merchantId: '796388906089189384',
              productIntro: "品尊工匠坐落于江西省上饶市广信区饶商回归创业园，坐拥逾5万多平方米智能化生产基地，并打通整木定制家居系统全产业链，主营原木护墙板、原木门、实木门、橱柜、衣帽间、书柜、酒柜、浴室柜、酒窖、吊顶、原木楼梯等固<font style='color:red'>装</font>产品，包括欧式、美式、法式、现代轻奢、禅意新中式、地中海、新古典等七大风格体系。",
              productTypeName: '门窗-实木门-实木豪华系列',
              productName: '全屋定制品牌，整木定制厂家',
              unitName: null,
              unitPrice: '面议',
              createTime: '2021-01-20 09:42:41',
              status: 2,
              type: 1,
            },
            {
              id: '801386001296658432',
              region: '江西省南昌市',
              attachUrls: [
                'https://conschina-bid-bucket.oss-cn-shenzhen.aliyuncs.com/conschina-test/2021/01/20/30d4b67aee8e47908dc3a300f870e73e.png'
              ],
              merchantName: null,
              merchantId: '796388906089189386',
              productIntro: "是一家专业生产销售家<font style='color:red'>装</font>材料的厂家。",
              productTypeName: '门窗-实木门-实木豪华系列',
              productName: 'sy2026',
              unitName: null,
              unitPrice: '面议',
              createTime: '2021-01-20 09:42:41',
              status: 2,
              type: 1,
            },
            {
              id: '801517758301999104',
              bidTitle: "日照东方摩玛梦想城室内软<font style='color:red'>装</font>道具采购工程招标公告",
              region: '山东',
              sourcePlatform: '日照市公共资源电子交易平台',
              bidBusiness: '政府采购',
              bidBusinessType: '采购/资审公告',
              trade: '',
              publishTime: '2021-01-20',
              type: 5,
            },
            {
              id: '801521717422985216',
              bidTitle: "北京按摩医院,消痛贴膏(无,贴膏剂,药芯袋每贴<font style='color:red'>装</font>1.2g,润湿剂每袋装2.5ml)采购结果",
              region: '北京',
              sourcePlatform: '北京市医药阳光采购综合管理平台',
              bidBusiness: '药品采购',
              bidBusinessType: '交易公告',
              trade: '',
              publishTime: '2021-01-20',
              type: 5,
            },
            {
              id: 1559,
              title: "建筑<font style='color:red'>装</font>修<font style='color:red'>装</font>饰工程造价存在问题",
              intro: '本刊主要刊登中医药学术、科技成果情报、信息、动态方面的论文，可从中药、调查、发展论坛、临床、规律、针推、分析、医案、综述、教育、诊断、医史、体质、管理等栏目选取文稿方向，论文要论点明确、论据充分、设计合理、结构严谨。本刊主要刊登中医药学术、科技成果情报、信息、动态方面的论文，可从中药、调查、发展论坛、临床、规律、针推、分析、医案、综述、教育、诊断、医史、体质、管理等栏目选取文稿方向，论文要论点明确、论据充分、设计合理、结构严谨。',
              coverImageUrl: 'https://img.conschina.com/file/coverimage/upload/2019/09/23/2373d799687cde0ba561bc88191e4cc2.jpg',
              coverImageUrl2: null,
              coverImageUrl3: null,
              tags: null,
              isOriginal: null,
              createUserName: 'yanbo',
              cmsChannelName: null,
              createTime: '2019-07-12 17:09:38',
              readCount: 13,
              applyCount: 0,
              type: 8,
            },
            {
              id: 1624,
              title: "<font style='color:red'>装</font>饰<font style='color:red'>装</font>修工程验收项目",
              intro: null,
              coverImageUrl: 'https://img.conschina.com/file/coverimage/upload/2019/10/10/59efea1a45c6eb3662ed61006d11ef52.jpg',
              coverImageUrl2: null,
              coverImageUrl3: null,
              tags: null,
              isOriginal: null,
              createUserName: '活雷锋',
              cmsChannelName: null,
              createTime: '2019-07-12 17:09:38',
              readCount: 11,
              applyCount: 0,
              type: 8,
            }
          ]
        }
      }
      res(data)
    }, 500)
  })
}

