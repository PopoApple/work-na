<template>
  <LayoutLeftMain>
    <TabBtnV :links="links" slot="left" :cols="4" />
    <nuxt-child />
  </LayoutLeftMain>
</template>

<script>
  export default {
    computed: {
      links() {
        let links = this.$store.state.userInfo.type === 2 && this.$store.state.userInfo.isAuth === 3 ? [
          { name: '我的发布', path: '/merchantCenter/myPublish', isIndex: true, icon: 'i-myPublish' },
          { name: '我要发布', path: '/merchantCenter/wantPublish', icon: 'i-publish' },
          { name: '企业信息', path: '/merchantCenter/info', icon: 'i-merchant', dot: this.$store.state.userInfo.isAuth === 3 && this.$store.state.userInfo.isCompleted !== 2 },
        ] : []
        links.push({ name: '商户认证', path: '/merchantCenter/ca', icon: 'i-ca' })
        return links
      },
    },
  }
</script>