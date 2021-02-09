<template>
  <div>
    <div class="box_1_title">
      <nuxt-link
        class="box_1_link"
        key="/merchantDetail/_id/main"
        :to="{
            name: 'material-merchant-merchantDetail-id-main',
            params:{id:id}
          }"
      >商家详情</nuxt-link>

      <nuxt-link
        class="box_1_link"
        key="/merchantDetail/_id/goods"
        :to="{
            name: 'material-merchant-merchantDetail-id-goods',
            params:{id:id}
          }"
      >商品</nuxt-link>
      <nuxt-link
        class="box_1_link"
        key="/merchantDetail/_id/job"
        :to="{
            name: 'material-merchant-merchantDetail-id-job',
            params:{id:id}
          }"
      >职位</nuxt-link>
      <div class="box_1_link_choose">服务</div>
    </div>
    <div class="box_1_info"></div>
  </div>
</template>

<script>
  import { validatenull } from '@/utils/validate'
  export default {
    props: {
      data: Object
    },
    created() {},
    computed: {
      id() {
        return this.$nuxt.$route.params.id
      },
      merchantId() {
        return this.$nuxt.$route.params.merchantId
      }
    }
  }
</script>

<style lang="scss" scoped>
.box_1_title{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  width: 1200px;
  margin-bottom: 5px;
  min-height: 32px; 
  box-shadow:$shadow;
}
.box_1_link_choose{
  width: 132px;
  height:32px;
  background: $colorGreen;
  color: $colorWhite !important;
  text-align: center;
  box-shadow: $shadow;
  border-radius: $borderRadiusS;
  line-height: 32px;
  margin:10px 0 10px 20px;
}
.box_1_link{
  width: 132px;
  height:32px;
  text-align: center;
  line-height: 32px;
  margin:10px 0 10px 20px;
}
.box_1_info{
  margin: 30px;
}
.merchant-intro{
  margin-top: 20px;
}
.RootIsMobile {
  .box_1_title{
    padding: 0px;
    height: 106px;
    width: 100%;
    margin-bottom: 20px;
    min-height: 106px; 
    border-bottom: 1px $borderColorLight solid;
  }
  .box_1_link_choose{
    width: 150px;
    height:50px;
    margin-left: 20px;
    line-height: 50px;
  }
  .box_1_link{
    width: 150px;
    height:50px;
    margin-left: 20px;
    line-height: 50px;
  }
  .box_1_info{
    width: 100%;
    margin: 0px;
  }
}
</style>
