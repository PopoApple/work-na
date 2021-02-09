<template>
  <div class="meterial-section">
    <SectionTitle :btnRoute="'/material/goods?productTypeId=' + id">{{meterialSection}}</SectionTitle>
    <div class="bottom">
      <div class="show-bar">
        <div class="show-bar-item" v-for="item in list" :key="item.id">
          <nuxt-link :to="'/material/goods/goodsDetail/' + item.id ">
            <CcImage :src="item[url][0]" alt="图片展示无法加载" :height="336" class="img"></CcImage>
            <p class="ellipsis">{{item[name]}}</p>
            <p class="ellipsis">{{ formatPrice(item[price]) }}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '~/utils'
export default {
  props: {
    id: String,
    meterialSection: String,
    list: Array
  },
  data() {
    return {
      // 商品展示区别名，防止键名变更，使用方括号运算符的方式读取键值, 通过别名来代替
      url: 'attachUrls',
      name: 'productName',
      price: 'unitPrice'
    }
  },
  methods: {
    formatPrice,
  }
}
</script>



<style lang="scss" scoped>
// 移动端
.RootIsMobile {
  .meterial-section{
    overflow: hidden;
    padding: 40px 30px;
    height: 1483px;
    background-color: $colorWhite;
    .bottom {
      .show-bar {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;
        height: 1400px;
        .show-bar-item {
          width: 49%;
          .img {
            vertical-align: bottom;
          }
          p {
            width: 80%;
            margin: 10px auto;
            text-align: center;
            font-size: $fontSize;
            line-height: 30px;
            color: $fontColorDark;
          }
          & p:last-child {
            color: $colorGreen;
          }
        }
      }
    }
  }
}
</style>