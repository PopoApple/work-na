//上传单个文件
export function apiAddAttachment(axios, obj) {
  let formData = new FormData()
  formData.append('file', obj)
  return axios({
    url: '/csAttachment/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

//富文本编辑器上传图片
export function apiAttachmentUrlForEditor(axios, obj) {
  let formData = new FormData()
  formData.append('file', obj)
  return axios({
    url: '/csAttachment/getAttachmentUrlForEditor',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}