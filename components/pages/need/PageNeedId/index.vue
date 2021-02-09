<template>
  <div>
    <div class="box">
     需求{{id}}标题、信息、详细介绍、收藏按钮
     <Button type="text" @click="modalShow=true">获取联系人/联系电话</Button>
    </div>
    <div class="box sec">
      需求完成情况
    </div>
    <div class="box sec">
      留言
    </div>
    <div class="box sec">
      其他同类需求
    </div>
    <PageNeedIdModal v-if="modalShow" @close="modalShow=false" @saveSuccess="handleSaveSuccess" />
    <PageNeedIdModalInfo v-if="infoModalShow" @close="infoModalShow=false" />
  </div>
</template>

<script>

export default {
  computed: {
    id() {
      return this.$nuxt.$route.params.id
    }
  },
  data() {
    return {
      modalShow: false,
      infoModalShow: false,
    }
  },
  methods: {
    handleSaveSuccess() {
      this.infoModalShow = true
    },
  },
}
</script>

<style scoped>
</style>
