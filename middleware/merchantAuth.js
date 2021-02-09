// import Vue from 'vue'

// 商户才能访问的页面使用该中间件；如果不是商户，则跳转商户认证页
export default function ({ store, redirect }) {
  if (store.state.userInfo.type !== 2 || store.state.userInfo.isAuth !== 3) {
    // if (process.client) {
    //   Vue.prototype.$toast.fail('您还不是商户，请先申请认证！')
    // }
    return redirect('/merchantCenter/ca')
  }
}