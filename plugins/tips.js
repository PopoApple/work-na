import Vue from 'vue'
import { Message, MessageBox, Loading } from 'element-ui'
import { Toast } from 'vant'
import { isMobileByUrl } from '~/utils'

let toast = {}
if (isMobileByUrl()) {
  toast.success = Toast.success
  toast.fail = Toast.fail
} else {
  toast.success = message => Message({ message, type: 'success' })
  toast.fail = message => Message({ message, type: 'error' })
}
Vue.prototype.$toast = toast

Vue.prototype.$alert = message => MessageBox.alert(message, '提示', {
  confirmButtonText: '确定',
  type: 'warning'
})
Vue.prototype.$confirm = message => MessageBox.confirm(message, '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
  customClass: 'Confirm',
})

let loadingInstance 
Vue.prototype.$showLoading = text => {
  text = text || '加载中...'
  if (isMobileByUrl()) {
    loadingInstance = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: text,
    })
  } else {
    loadingInstance = Loading.service({lock: true, text})
  }
} 
Vue.prototype.$hideLoading = () => {
  if (isMobileByUrl()) {
    loadingInstance && loadingInstance.clear()
  } else {
    loadingInstance && loadingInstance.close()
  }
}

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service