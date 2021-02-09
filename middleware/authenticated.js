import Vue from 'vue'
import { errorTips } from '~/api/config'
// 登录状态才能访问的页面使用该中间件；如果未登录，则跳转登录页
export default function ({ store, redirect }) {
  if (!store.state.auth) {
    if (process.client) {
      Vue.prototype.$toast.fail(errorTips[401])
    }
    return redirect('/login')
  }
}