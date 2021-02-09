<template>
  <ul v-if="!validatenull(data)">
    <li v-for="(item, i) in data.slice(0 , $isMobile?2:4)" :key="i">
      <div class="hot_li">
        <nuxt-link
          class="hot_li_link"
          :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: item.id}
          }"
        >
          <CcImage
            :src="item.attachUrls[0]?item.attachUrls[0]+SP180X180:''"
            :width="$isMobile?335:180"
            :height="$isMobile?335:180"
            :alt="item?item.productName:''"
            fit="cover"
          ></CcImage>
        </nuxt-link>
        <div class="info">
          <nuxt-link
            class="info_name ellipsis2"
            :to="{
            name: 'material-goods-goodsDetail-id',
            params: { id: data.id},
          }"
          >{{item.productName}}</nuxt-link>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import { validatenull } from '@/utils/validate'
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
      validatenull
    }
  }
</script>
<style lang="scss" scoped>
ul{
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
}
.hot_li{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  flex-direction: column;
}
.info{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 170px;
}
.info_name{
  width: 100%;
  font-weight: 500;
}
.RootIsMobile {
  ul{
    margin-top: 0px;
    width: 100%;
  }
  li{
    width: 50%;
    height: 425px;
  }
  .info{
    width: 100%;
  }

}
</style>
