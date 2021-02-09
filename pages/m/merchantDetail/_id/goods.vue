<template>
  <PageMerchantDetailGoods :data="data" />
</template>
<script>
  import asyncData from '~/components/pages/merchantDetail/PageMerchantDetailGoods/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then(data => {
        return { data }
      })
    },
    watchQuery: true
  }
</script>