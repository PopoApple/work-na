<template>
  <div>
    <div class="box">
      <div>
        供应信息{{id}}标题、信息、正文内容、收藏按钮
      </div>
      <div>
        详细说明
      </div>
    </div>
    <div class="box sec">
      其他同类供应
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
