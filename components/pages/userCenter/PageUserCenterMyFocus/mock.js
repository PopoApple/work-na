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
              title: query.groupId + '标题标题标题标题',
              content: '内容内容内容内容内容内容内容内容',
              status: '1',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            },
            {
              id: page + '2',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              status: '2',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            },
            {
              id: page + '3',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              status: '3',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            },
            {
              id: page + '4',
              title: '标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长标题标题标题标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
              content: '内容内容内容内容内容内容内容内容',
              status: '4',
              imgSrc: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
            },
          ]
        }
      }
      res(data)
    }, 500)
  })
}

export function apiMockGroupList(query) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let data = {
        data: {
          total: 3,
          code: 200,
          records: [
            {
              id: '1',
              name: '默认分组',
            },
            {
              id: '2',
              name: '建材小分队',
            },
            {
              id: '3',
              name: '市场大大大大大大大大大大大大大部队',
            },
            {
              id: '4',
              name: '小分队',
            },
            {
              id: '5',
              name: '大大大大大大大大大大大大大部队',
            },
          ]
        }
      }
      res(data)
    }, 500)
  })
}

export function apiMockEdit() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let data = { data: { code: 0 } }
      res(data)
    }, 1000)
  })
}