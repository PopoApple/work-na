export function apiMockList(query) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let page = query && query.page ? query.page : 1
      let data = {
        data: {
          total: 125,
          code: 200,
          records: [
            {
              id: page + '1',
              title: '标题标题标题标题',
              content: '内容内容内容内容内容内容内容内容',
              status: '1',
              imgSrc: 'https://img14.360buyimg.com/n0/jfs/t1/146488/39/7536/146489/5f50ca9bE529dfc11/5a153da20b992c94.jpg',
              monthDate: '10.06',
              year: '2021',
              area: '安徽',
              author: '何向浪',
              type: '城市规划',
              time: '2020.11.11',
              viewCount: '999+',
              commendCount: 101,
            },
            {
              id: page + '2',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              status: '2',
              imgSrc: 'https://img14.360buyimg.com/n0/jfs/t1/146488/39/7536/146489/5f50ca9bE529dfc11/5a153da20b992c94.jpg',
              monthDate: '10.06',
              year: '2021',
              area: '安徽',
              author: '何向浪',
              type: '装修',
              time: '2020.11.11',
              viewCount: 1,
              commendCount: 101,
            },
            {
              id: page + '3',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              status: '3',
              imgSrc: 'https://img14.360buyimg.com/n0/jfs/t1/146488/39/7536/146489/5f50ca9bE529dfc11/5a153da20b992c94.jpg',
              monthDate: '10.06',
              year: '2021',
              area: '安徽',
              author: '何向浪',
              type: '城市规划',
              time: '2020.11.11',
              viewCount: 99,
              commendCount: 999,
            },
            {
              id: page + '4',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容',
              status: '4',
              imgSrc: 'https://img14.360buyimg.com/n0/jfs/t1/146488/39/7536/146489/5f50ca9bE529dfc11/5a153da20b992c94.jpg',
              monthDate: '10.06',
              year: '2021',
              area: '安徽',
              author: '何向浪',
              type: '建筑专业规范',
              time: '2020.11.11',
              viewCount: 0,
              commendCount: 0,
            },
          ]
        }
      }
      res(data)
    }, 500)
  })
}
