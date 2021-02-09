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

export function apiMockDetail() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let data = { data: { code: 0, data: {
        status: '1',
        merchantName: '广新纳科技有限公司',
        industryType: '1',
        mainProduct: '电脑、鼠标、主机、耳麦、键盘、显示屏',
        area: ['13', '1302', '130202'],
        address: '香港中路1258号',
        website: 'http://gaungxinna.com',
        introduce: '另外，公开报道显示，由于疫情反弹，美国多地恢复更严格营业规定；法国总统马克龙宣布，包括海外领土在内，法国全境从30日起再度封城，以应对疫情的迅猛反弹；德国将从11月2日起实施较现行措施更加严格的社交接触禁令，暂定实施期限为整个11月份。更严格营业规定；法国总统马克龙宣布包括海外领。',
        logo: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
        office: [{ uid: '1', url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }],
        propaganda: [{ uid: '1', url: 'https://img.yzcdn.cn/vant/apple-1.jpg' }, { uid: '2', url: 'https://img.yzcdn.cn/vant/apple-3.jpg' }, { uid: '3', url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }, { uid: '4', url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' } ],
        industryTypeText: '电子机械',
        areaText: '山东省青岛市市南区',
        date: '2020-02-02',
        creditCode: '123123',
        legalPerson: '张三',
        createDate: '2020-02-02',
        businessTerm: ['2020-02-02', '2021-02-02'],
        contractPerson: '崭新那',
        phone: '13399949494',
        code: '8234234',
        recommendCode: 'KDKLLS',
        businessPic: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        idCardPic: 'https://img.yzcdn.cn/vant/apple-2.jpg',
        idCardPicBack: 'https://img.yzcdn.cn/vant/apple-3.jpg',
      } } }
      res(data)
    }, 1000)
  })
}

export function apiMockUploadImg() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let data = { data: { code: 0, url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' } }
      res(data)
    }, 1000)
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