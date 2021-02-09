<template>
  <ul v-if="!validatenull(data)">
    <li v-for="(item, i) in data.slice(0 , $isMobile?4:8)" :key="i">
      <div class="hot_li">
        <nuxt-link
          class="hot_li_link"
          :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: item.id},
          }"
        >
          <CcImage
            :src="item.attachUrls[0]?item.attachUrls[0]+SP180X180:''"
            :width="$isMobile?335:70"
            :height="$isMobile?335:70"
            :alt="item?item.productName:''"
            fit="cover"
          ></CcImage>
        </nuxt-link>
        <div class="info">
          <nuxt-link
            class="info_name ellipsis"
            :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: item.id},
          }"
          >{{item.productName}}</nuxt-link>
          <span class="info_price ellipsis">{{formatPrice(item.unitPrice)}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import { validatenull } from '@/utils/validate'
  import { formatPrice } from '@/utils'
  import { SP180X180 } from '~/assets/js/constants'
  export default {
    props: {
      data: Array
    },
    data() {
      return {
        SP180X180
      }
    },
    methods: {
      validatenull,
      formatPrice
    }
  }
</script>
<style lang="scss" scoped>
  li {
    height: 101px;
  }
  .hot_li{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
    border-bottom: 2px $borderColor dashed;
  }
  .hot_last_li{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
  }
  .info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 15px;
    height: 52px;
    width: 150px;
  }
  .info_name{
    width: 100%;
    font-weight: 500;

  }
  .info_price{
    font-weight: bold;
    color: $colorGreen;
    width: 100%;
  }
  .RootIsMobile {
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }
    li{
      height: 431px;
      width: 50%;
      margin-bottom: 15px;
    }
    .hot_li{
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-left: 0px;
      border-bottom: 0px $borderColor dashed;
    }
    .info{
      margin-left: 0px;
      height: auto;
      width: 90%;
      text-align: center;
    }
  }
</style>
