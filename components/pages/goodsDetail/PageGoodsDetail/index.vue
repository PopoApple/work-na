<template>
  <div>
    <div class="box_1_title">
      <div class="box_1_link_total">
        <span class="box_1_link_choose">商品详情</span>
        <nuxt-link
          class="box_1_link"
          key="/material/goods/goodsDetail/:id?/comments"
          :to="{
            name: 'material-goods-goodsDetail-id-comments',
            params:{id:id}
          }"
        >评论</nuxt-link>
      </div>
      <Button type="text" class="button_1" icon="iconfont icon-jubao" @click="modalShow=true"></Button>
    </div>
    <div class="box_1_info">
      <div class="box_main_param_info">{{productParam}}</div>
      <div class="box_main_info" v-dompurify-html="productIntro"></div>
      <div class="empty" v-if="validatenull(productParam)&&validatenull(productIntro)">
        <Empty centerMiddle waringText="暂无数据!" />
      </div>
    </div>
    <UserReportModal v-if="modalShow" @close="modalShow=false" />
  </div>
</template>

<script>
  import { validatenull } from '@/utils/validate'
  export default {
    props: {
      data: Object,
      productIntro: String,
      productParam: String
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
    },
    methods: {
      validatenull
    }
  }
</script>

<style lang="scss" scoped>
.empty{
  position:relative;
  height: 400px;
  width: 100%;
}
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
  width: 840px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
}

.button_1{
  color: $fontColorLight;
  margin-right: 20px;
}
.box_main_param_info{
  max-width: 100%;
  word-break: break-all;
}
.box_main_info{
  width: 100%;
  overflow: hidden;
  /deep/ img{
    max-width: 99% !important;
    height: auto !important;
  }
  /deep/ p{
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-width: 100%;
  }
  word-break: break-all;
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
    width: 690px;
  }
}
</style>