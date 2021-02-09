<template>
  <div>
    <div class="box_1_title">
      <div class="box_1_link_total">
        <nuxt-link
          class="box_1_link"
          key="/material/goods/goodsDetail/:id?/detail"
          :to="{
            name: 'material-goods-goodsDetail-id-detail',
            params:{id:id}
          }"
        >商品详情</nuxt-link>
        <!-- <nuxt-link
        class="box_1_link_choose"
        key="/goodsDetail/_id/comments"
        :to="{
            name: 'material-goods-goodsDetail-id-comments',
            params:{id:id}
          }"
        >评论</nuxt-link>-->
        <span class="box_1_link_choose">评论</span>
      </div>
      <Button type="text" class="button_1" icon="iconfont icon-jubao" @click="modalShow=true"></Button>
    </div>
    <div class="box_1_info">
      <Comments :data="data"></Comments>
    </div>
    <UserReportModal v-if="modalShow" @close="modalShow=false" />
  </div>
</template>

<script>
  import { validatenull } from '@/utils/validate'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        modalShow: false
      }
    },
    computed: {
      id() {
        return this.$nuxt.$route.params.id
      }
    }
  }
</script>


<style lang="scss" scoped>
.box_1_title{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 32px;
  overflow: hidden;
  width: 880px;
  margin-bottom: 5px;
  min-height: 32px; 
  border-bottom: 1px $borderColorLight solid;
}
.box_1_link_total{
  display: flex;
  width: 600px;
}
.button_1{
  color: $fontColorLight;
  margin-right: 20px;
}
.box_1_link_choose{
  width: 132px;
  height:32px;
  background: $colorGreen;
  color: $colorWhite !important;
  margin-left: 20px;
  text-align: center;
  box-shadow: $shadow;
  border-radius: $borderRadiusS;
  line-height: 32px;
}
.box_1_link{
  width: 132px;
  height:32px;
  margin-left: 20px;
  text-align: center;
  line-height: 32px;
}
.box_1_info{
  margin: 30px;
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
  .box_1_link_total{
    width: 50%;
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
