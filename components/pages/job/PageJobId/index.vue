<template>
  <div>
    <div class="float-wrap box">
      <div class="left" style="width: 1000px">
        职位标题、薪资、关键词、标签
      </div>
      <div class="right" style="width: 180px">
        工具按钮
      </div>
    </div>
    <div class="sec float-wrap layout-main-right">
      <div class="left">
        <div class="box">
          <div>联系方式</div>
          <div>职位描述</div>
          <div>公司介绍</div>
          <div>评价标签</div>
        </div>
        <div class="box sec">
          <div>评论列表</div>
          <div>评论框</div>
        </div>
      </div>
      <aside class="right box">
        推荐职位
      </aside>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    id() {
      return this.$nuxt.$route.params.id
    }
  },
}
</script>

<style scoped>
</style>
