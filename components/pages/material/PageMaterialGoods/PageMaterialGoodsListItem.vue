<template>
  <li class="PageMaterialGoodsListItem float-wrap">
    <nuxt-link
      :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: data.id },
          }"
    >
      <CcImage
        class="col col-img left bg-img"
        :src="!validatenull(data.attachUrls)?data.attachUrls[0]+SP147X100:''"
        :width="147"
        :height="100"
        :alt="data.productName"
        :title="data.productName"
      ></CcImage>
    </nuxt-link>
    <div class="col col-info left">
      <div class="line line-name ellipsis">
        <nuxt-link
          :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: data.id},
          }"
        >{{ data.productName }}</nuxt-link>
      </div>
      <div class="line line-info ellipsis" :title="data.merchantName">
        公司名称：
        <nuxt-link
          :title="data.merchantName"
          :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: data.merchantId },
          }"
        >{{ data.merchantName }}</nuxt-link>
      </div>
      <div
        class="line line-info ellipsis"
        :title="data.productTypeName"
      >类型：{{ data.productTypeName }}</div>
    </div>
    <div class="col col-area left">
      <div class="line line-info ellipsis" :title="data.region">所在区域：{{ data.region }}</div>
    </div>
    <div class="col col-price right">
      <div
        class="line line-price ellipsis"
        :title="formatPrice(data.unitPrice)"
      >{{ formatPrice(data.unitPrice) }}</div>
    </div>
  </li>
</template>

<script>
  import { SP147X100 } from '~/assets/js/constants'
  import { formatPrice } from '~/utils'
  import { validatenull } from '@/utils/validate'
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
.PageMaterialGoodsListItem {
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
    width: 147px;
    border-radius: $borderRadius;
  }
  .col-info.col {
    margin-left: 20px;
    width: 370px;
    line-height: 34px;
    .line-name {
      a {
        font-size: $fontSizeOdd;
        font-weight: bold;
      }
    }
  }
  .col-area {
    width: 370px;
  }
  .col-price {
    width: 160px;
    font-size: $fontSize2XL;
    color: $colorGreen;
  }
}
</style>
