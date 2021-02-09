<template>
  <li class="PageMaterialDetailGoodsListItem float-wrap">
    <nuxt-link
      :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: data.id},
          }"
    >
      <CcImage
        class="col col-img left bg-img"
        :src="!validatenull(data.attachUrls)?data.attachUrls[0]+SP147X100:''"
        :width="160"
        :height="95"
        :alt="data.productName"
      ></CcImage>
    </nuxt-link>
    <div class="col-li">
      <div class="col col-info left">
        <div class="line line-name ellipsis">
          <nuxt-link
            :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: data.id },
          }"
          >{{ data.productName }}</nuxt-link>
        </div>
        <div class="line line-info ellipsis2">基本信息：{{ data.productSimpleIntro }}</div>
      </div>
      <div class="col col-price left">
        <div class="line line-price">{{ formatPrice(data.unitPrice) }}</div>
      </div>
      <div class="col col-area right">
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
.PageMaterialDetailGoodsListItem {
  box-sizing: border-box;
  padding: 30px 20px;
  .col {
    height: 100px;
    line-height: 100px;
  }
  .col + .col {
    margin-left: 30px;
  }
  border-bottom: 1px dashed $borderColorLight;
  .col-img {
    width: 160px;
    border-radius: $borderRadius;
  }
  .col-info.col {
    margin-left: 20px;
    width: 480px;
    line-height: 34px;
    .line-name {
      a {
        font-size: $fontSizeOdd;
        font-weight: bold;
      }
    }
  }
  .col-area {
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .col-price {
    width: 160px;
    font-size: $fontSize2XL;
    color: $colorGreen;
  }
  .col-li{
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
}
}
</style>
