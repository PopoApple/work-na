<template>
  <Button round @click="$router.push(btnInfo.path)">
    <i class="iconimg i-publish" />
    {{btnInfo.name}}
  </Button>
</template>

<script>
  const btnInfoArry = [
    { path: '/publishGoods', name: '发布商品信息', forPaths: ['/material'] },
    { path: '/publishJob', name: '发布招聘信息', forPaths: [/\/job(\/\*)*/] },
    {
      path: '/publishNeed',
      name: '发布需求信息',
      forPaths: ['/need', '/publishNeed', /\/need(\/\*)*/],
    },
    {
      path: '/publishProvide',
      name: '发布供应信息',
      forPaths: ['/provide', '/publishProvide', /\/provide(\/\*)*/],
    },
  ]
  
export default {
  computed: {
    btnInfo() {
      let btnInfo = {}
      let path = this.$nuxt.$route.path
      for (let i = 0; i < btnInfoArry.length; i++) {
        let bi = btnInfoArry[i]
        if (
          bi.forPaths.findIndex((d) => {
            return (typeof d === 'string' && d === path) || (typeof d === 'object' && d.test(path))
          }) >= 0
        ) {
          btnInfo = bi
        }
      }
      btnInfo = { path: this.$store.state.userInfo.type === 2 ? '/merchantCenter/wantPublish' : '/userCenter/wantPublish', name: '发布信息' }
      return btnInfo
    },
  },
}
</script>

<style lang="scss" scoped>
.i-publish {
  margin-right: 5px;
  background-image: url('~static/img/icon/publish.png');
  width: 14PX;
  height: 13PX;
  top: 2PX;
}
.el-button:hover, .el-button:focus {
  .i-publish {
    background-image: url('~static/img/icon/publish_a.png');
  }
}
/*---------------以下是移动端---------------*/
.RootIsMobile { 
  .i-publish {
    margin-right: 5px;
    width: 14PX;
    height: 13PX;
    top: 3PX;
  }
}
</style>
