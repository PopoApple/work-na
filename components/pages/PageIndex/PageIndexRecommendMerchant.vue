<template>
  <Card class="PageIndexRecommendMerchant" title="推荐商家" btnText="更多" btnRoute="/material/merchant" :type="$isMobile ? null : 'well'">
    <Row class="content">
      <Col v-for="item in data" :key="item.id" :span="$isMobile ? 8 : 24"  class="item flex-wrap" >
        <CcImage :src="item.imgSrc ? item.imgSrc + imgSufix : ''" :width="imgSize" :height="imgSize" />
        <div class="title ellipsis">
          <nuxt-link :to="{ name: 'material-merchant-merchantDetail-id', params: {id: item.id} }">
            {{item.title}}
          </nuxt-link>
        </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
import { SJTOU55 } from '~/assets/js/constants'

export default {
  props: {
    data: Array
  },
  computed: {
    imgSize() {
      return this.$isMobile ? 42 : 42
    },
    imgSufix() {
      return SJTOU55
    },
  },
}
</script>

<style lang="scss">
.PageIndexRecommendMerchant {
  .content {
    margin-top: 10px;
    margin-bottom: 8px;
  }
  .item {
    line-height: 42px;
    margin-bottom: 14px;
  }
  .title {
    width: 113px;
  }
  .ImagePc .image-slot {
    background-color: #fff;
  }
}
/*------------------------- 移动端 -------------------------*/
.RootIsMobile {
  .PageIndexRecommendMerchant {
    .title {
      width: 156px;
      padding-right: 10px;
    }
  }
}
</style>
