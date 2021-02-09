<template>
  <li class="PageMaterialDetailGoodsListItemM">
    <nuxt-link
      :to="{
        name: 'material-goods-goodsDetail-id',
        params: { id: data.id}
        }"
    >
      <CcImage
        class="col col-img left bg-img"
        :src="!validatenull(data.attachUrls)?data.attachUrls[0]+SP147X100:''"
        :width="200"
        :height="150"
        :alt="data.productName"
      ></CcImage>
    </nuxt-link>
    <div class="col col-info">
      <div class="line line-title">
        <div class="name-type">
          <div class="name ellipsis">
            <nuxt-link
              :to="{
                name: 'material-goods-goodsDetail-id',
                params: { id: data.id}
                }"
            >{{ data.productName }}</nuxt-link>
          </div>
        </div>
      </div>
      <div
        class="line line-base ellipsis"
      >{{data.productSimpleIntro?'基本信息:':'&nbsp;'}}{{data.productSimpleIntro }}</div>
      <div class="col-bottom">
        <div class="price ellipsis">{{ formatPrice(data.unitPrice) }}</div>
        <nuxt-link
          class="col-link-choose"
          key="/goodsDetail/_id"
          :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: data.id},
          }"
        >商品详情</nuxt-link>
      </div>
    </div>
  </li>
</template>

<script>
  import { formatPrice } from '~/utils'
  import { validatenull } from '@/utils/validate'
  import { SP147X100 } from '~/assets/js/constants'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        SP147X100
      }
    },
    methods: {
      formatPrice,
      validatenull
    }
  }
</script>

<style lang="scss">
.PageMaterialDetailGoodsListItemM {
  display: flex;
  padding: 30px 30px;
  align-items: center;
   
  .col-img {
    width: 200px;
    height: 150px;
    min-width: 208px;
    border-radius: $borderRadius;
  }
  .col-info {
    width: 480px;
    margin-left: 15px;
  }
  .line-title {
    display: flex;
  }
  .name-type {
    width: 330px;
  }
  .name {
    max-width: 329px;
    color: $fontColorDark;
    display: inline-block;
    vertical-align: middle;
    // font-size: $fontSizeS;
  }
  .type {
    background: $bgColorGray;
    border-radius: $borderRadius;
    color: $fontColorDark;
    padding: 3px 10px;
    display: inline-block;
    font-size: $fontSizeS;
    vertical-align: middle;
  }
  .price {
    color: $colorGreen;
    width: 250px;
  }
  .line-base {
    color: $fontColorXLight;
    font-size: $fontSizeS;
  }
  .line-area {
    color: $fontColorXLight;
    font-size: $fontSizeS;
  }
  .col-bottom{
    width: 460px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .col-link-choose{
    width: 132px;
    height:32px;
    background: $bgColorGray;
    color: $colorGreen !important;
    text-align: center;
    box-shadow: $shadow;
    border-radius: $borderRadiusS;
    line-height: 32px;
    margin:10px 0 10px 20px;
    font-size: $fontSizeS;
  } 
}
</style>
