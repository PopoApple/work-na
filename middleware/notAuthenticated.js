// 未登录状态才能访问的页面使用该中间件；如果已登录，则跳转首页
export default function ({ store, redirect }) {
  if (store.state.auth) {
    return redirect('/')
  }
}