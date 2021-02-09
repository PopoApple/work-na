<template>
  <LayoutLeftMain>
    <TabBtnV :links="links" slot="left" />
    <nuxt-child />
  </LayoutLeftMain>
</template>

<script>
  export default {
    data() {
      return {
        links: [
          // { name: '我的发布', path: '/userCenter/myPublish', icon: 'i-myPublish' },
          // { name: '我要发布', path: '/userCenter/wantPublish', icon: 'i-publish' },
          { name: '我的关注', path: '/userCenter/myFocus', icon: 'i-focus' },
          { name: '我的收藏', path: '/userCenter/myCollection', icon: 'i-collect' },
          // { name: '我的意向承接', path: '/userCenter/wantGet', icon: 'i-filterUser' },
          { name: '我的评论', path: '/userCenter/myComment', icon: 'i-comment' },
          { name: '个人信息', path: '/userCenter/myInfo', isIndex: true, icon: 'i-userInfo' },
          { name: '我的消息', path: '/userCenter/myMessage', icon: 'i-userMessage' }
        ]
      }
    }
  }
</script>
