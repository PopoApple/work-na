<template>
  <PageGoodsComments :data="data" />
</template>
<script>
  import asyncData from '~/components/pages/goodsDetail/PageGoodsComments/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return data
      })
    },
    watchQuery: true
  }
</script>