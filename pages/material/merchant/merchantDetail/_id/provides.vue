<template>
  <PageMerchantDetailProvide :data="data" />
</template>
<script>
  import asyncData from '~/components/pages/goodsDetail/PageGoodsDetailId/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return data
      })
    },
    watchQuery: true
  }
</script>