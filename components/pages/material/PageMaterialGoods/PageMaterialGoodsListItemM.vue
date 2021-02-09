<template>
  <li class="PageMaterialGoodsListItemM">
    <nuxt-link
      :to="{
        name: 'material-goods-goodsDetail-id',
        params: { id: data.id},
      }"
    >
      <!-- <div class="col col-img bg-img" :style="{ backgroundImage: `url(${data.imgSrc})` }" /> -->
      <CcImage
        class="col col-img left"
        :src="!validatenull(data.attachUrls)?data.attachUrls[0]+SP147X100:''"
        :width="300"
        :height="290"
        :alt="data.productName"
      ></CcImage>
      <div class="col col-info">
        <div class="line line-title">
          <div class="name-type">
            <div class="name ellipsis2">{{ data.productName }}</div>
          </div>
          <!-- 记录价格 -->
        </div>
        <!-- <div class="type">{{ getLastType(data.productTypeName) }}</div> -->
        <div class="type ellipsis">
          <span>{{ data.productTypeName }}</span>
        </div>
        <div class="price ellipsis">{{ formatPrice(data.unitPrice) }}</div>
        <!-- <div class="line line-base ellipsis2">基本信息：{{ data.productIntro }}</div> -->
        <div class="line line-area ellipsis" v-if="data.region">所在区域：{{ data.region }}</div>
      </div>
    </nuxt-link>
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
      validatenull,
      getLastType(data) {
        let nameArray = !validatenull(data) ? data.split('-') : []
        let lastName = !validatenull(nameArray) ? nameArray.pop() : ''
        return lastName
      }
    }
  }
</script>


<style lang="scss">
.PageMaterialGoodsListItemM {
  a {
    display: flex;
    padding: 10px 10px;
    margin-bottom: 10px;
    &:active {
      background: $bgColorGray;
      color: initial;
    }
  }
  .col-img {
    border-radius: $borderRadius;
  }
  .col-info {
    width: 420px;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
  }
  .name-type {
    width: 420px;
    height: 118px;
  }
  .name {
    max-width: 420px;
    color: $fontColorDark;
    font-size: $fontSizeXL;
  }
  .type {
    color: $fontColorLight;
    font-size: $fontSize;
  }
  .type span{
    background: $bgColorGray;
    border-radius: $borderRadius;
    padding: 3px 3px;
  }
  .price {
    color: $colorGreen;
    text-align: right;
    width: 420px;
    font-size: $fontSizeXL;
  }
  .line-base {
    color: $fontColorXLight;
    font-size: $fontSizeS;
  }
  .line-area {
    color: $fontColorXLight;
    font-size: $fontSize;
  }
}
</style>
