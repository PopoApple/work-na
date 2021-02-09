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
              id: page + '1',
              title: '标题标题标题标题',
              content: '内容内容内容内容内容内容内容内容',
              status: '1',
              price: 200,
              time: '2020-01-01',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
              type: '1',
              area: '安徽',
              usableTime: '2小时',
              goodsType: '工程测量机',
            },
            {
              id: page + '2',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              status: '2',
              price: 20000,
              time: '2020-01-01',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
              type: '1',
              area: '安徽',
              usableTime: '2小时',
              goodsType: '工程测量机',
            },
            {
              id: page + '3',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              status: '3',
              price: 12.7492872389,
              time: '2020-01-01',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
              type: '1',
              area: '安徽',
              usableTime: '2小时',
              goodsType: '工程测量机',
            },
            {
              id: page + '4',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容',
              status: '4',
              price: 0,
              time: '2020-01-01',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
              type: '1',
              area: '安徽',
              usableTime: '2小时',
              goodsType: '工程测量机',
            },
          ]
        }
      }
      res(data)
    }, 500)
  })
}
