<template>
  <div>
    <div class="box_1_title">
      <div class="box_1_link_choose">商家详情</div>
      <nuxt-link
        class="box_1_link"
        key="/material/merchant/merchantDetail/:id?/goods"
        :to="{
            name: 'material-merchant-merchantDetail-id-goods',
            params:{id:id}
          }"
      >商品</nuxt-link>
      <!-- <nuxt-link
        class="box_1_link"
        key="/merchantDetail/_id/job"
        :to="{
            name: 'material-merchant-merchantDetail-id-job',
            params:{id:id}
          }"
      >职位</nuxt-link>
      <nuxt-link
        class="box_1_link"
        key="/merchantDetail/_id/provides"
        :to="{
            name: 'material-merchant-merchantDetail-id-provides',
            params:{id:id}
          }"
      >服务</nuxt-link>-->
    </div>
    <div class="box_1_info">
      <div class="image-list">
        <CcImage
          v-for="(img,index) in companyAttachmentDtoList"
          :key="index"
          :width="720"
          :height="600"
          :src="img.attachUrl?img.attachUrl+QIYEXC720X600:''"
          class="image-item"
        ></CcImage>
      </div>
      <div class="merchant-intro">{{merchantIntro}}</div>
      <div class="empty" v-if="validatenull(companyAttachmentDtoList)&&validatenull(merchantIntro)">
        <Empty centerMiddle waringText="暂无数据!" />
      </div>
    </div>
  </div>
</template>

<script>
  import { validatenull } from '@/utils/validate'
  import { QIYEXC720X600 } from '~/assets/js/constants'
  export default {
    props: {
      data: Object,
      merchantIntro: String,
      companyAttachmentDtoList: Array
    },
    computed: {
      id() {
        return this.$nuxt.$route.params.id
      },
      merchantId() {
        return this.$nuxt.$route.params.merchantId
      }
    },
    data() {
      return {
        QIYEXC720X600
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
.image-list{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.image-item{
  margin-top: 20px;
}
.merchant-intro{
  margin-top: 20px;
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
  .merchant-intro{
    margin: 20px;
  }
}
</style>
