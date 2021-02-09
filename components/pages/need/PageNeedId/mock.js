export function apiMockUploadImg() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let data = { data: { code: 0, url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' } }
      res(data)
    }, 500)
  })
}