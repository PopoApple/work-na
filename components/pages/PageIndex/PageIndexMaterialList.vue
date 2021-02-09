<template>
  <Card class="PageIndexMaterialList" title="建材商品信息" :showTitle="$isMobile" :type="$isMobile ? null : 'simple'" btnRoute="/material/goods">
    <ImgList :value="list" :width="size" :height="size" :showActions="false">
      <div class="material-item-bottom" slot="item-bottom" slot-scope="scope">
        <p class="material-item-name ellipsis" :style="{ maxWidth: $pxtorem(size) }">
          <nuxt-link :to="scope.data.route">
            {{scope.data.name}}
          </nuxt-link>
        </p>
        <p class="material-item-price ellipsis" :style="{ maxWidth: $pxtorem(size) }">{{formatPrice(scope.data.price)}}</p>
      </div>
    </ImgList>
  </Card>
</template>

<script>
import { formatPrice } from '~/utils'
import { SP180X180 } from '~/assets/js/constants'

export default {
  props: {
    data: Array
  },
  methods: {
    formatPrice
  },
  computed: {
    size() {
      return this.$isMobile ? 335 : 170
    },
    list() {
      return this.data.map(d => {
        return {
          ...d,
          uid: d.id,
          route: { name: 'material-goods-goodsDetail-id', params: { id: d.id } },
          url: d.url ? d.url + this.imgSufix : ''
        }
      })
    },
    imgSufix() {
      return SP180X180
    },
  },
}
</script>

<style lang="scss" scoped>
.PageIndexMaterialList {
  .material-item-name {
    margin: 10px 0 0;
    text-align: center;
  }
  .material-item-price {
    color: $colorGreen;
    text-align: center;
    margin: 0;
    line-height: 20PX;
  }
}
/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  
}
</style>
